package com.optimove.reactnative.events;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.optimove.android.optimobile.DeferredDeepLinkHelper;

public class DDLEvent implements ReactEvent {

  private final DeferredDeepLinkHelper.DeepLinkResolution resolution;
  private final String link;
  @Nullable
  private final DeferredDeepLinkHelper.DeepLink data;

  public DDLEvent(DeferredDeepLinkHelper.DeepLinkResolution resolution, String link, @Nullable DeferredDeepLinkHelper.DeepLink data) {
    this.resolution = resolution;
    this.link = link;
    this.data = data;
  }

  @NonNull
  @Override
  public String getEventType() {
    return "deep-linking.linkResolved";
  }

  @Override
  public WritableMap getData() {
    WritableMap params = new WritableNativeMap();
    params.putString("url", link);

    String mappedResolution;
    WritableMap linkData = null;
    switch (resolution) {
      case LINK_MATCHED:
        mappedResolution = "LINK_MATCHED";
        linkData = new WritableNativeMap();

        assert data != null;
        linkData.putString("url", data.url);

        WritableMap content = new WritableNativeMap();
        content.putString("title", data.content.title);
        content.putString("description", data.content.description);
        linkData.putMap("content", content);

        linkData.putString("data", data.data.toString());
        break;
      case LINK_NOT_FOUND:
        mappedResolution = "LINK_NOT_FOUND";
        break;
      case LINK_EXPIRED:
        mappedResolution = "LINK_EXPIRED";
        break;
      case LINK_LIMIT_EXCEEDED:
        mappedResolution = "LINK_LIMIT_EXCEEDED";
        break;
      case LOOKUP_FAILED:
      default:
        mappedResolution = "LOOKUP_FAILED";
        break;
    }

    params.putString("resolution", mappedResolution);
    params.putMap("link", linkData);

    return params;
  }

  @Override
  public boolean canArriveBeforeBeingListenedTo() {
    return true;
  }
}
