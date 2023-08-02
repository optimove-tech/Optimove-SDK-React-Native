package com.optimove.reactnative;

import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Iterator;

public class JSONtoMapMapper {

  public static WritableArray jsonToReact(final JSONArray jsonArray) throws JSONException {
    final WritableArray writableArray = new WritableNativeArray();
    for (int i = 0; i < jsonArray.length(); i++) {
      final Object value = jsonArray.get(i);
      if (value instanceof Float || value instanceof Double) {
        writableArray.pushDouble(jsonArray.getDouble(i));
      } else if (value instanceof Number) {
        writableArray.pushInt(jsonArray.getInt(i));
      } else if (value instanceof String) {
        writableArray.pushString(jsonArray.getString(i));
      } else if (value instanceof Boolean) {
        writableArray.pushBoolean(jsonArray.getBoolean(i));
      } else if (value instanceof JSONObject) {
        writableArray.pushMap(jsonToReact(jsonArray.getJSONObject(i)));
      } else if (value instanceof JSONArray) {
        writableArray.pushArray(jsonToReact(jsonArray.getJSONArray(i)));
      } else if (value == JSONObject.NULL) {
        writableArray.pushNull();
      }
    }
    return writableArray;
  }

  public static WritableMap jsonToReact(final JSONObject jsonObject) throws JSONException {
    final WritableMap writableMap = new WritableNativeMap();
    final Iterator<String> iterator = jsonObject.keys();
    while (iterator.hasNext()) {
      final String key = (String) iterator.next();
      final Object value = jsonObject.get(key);
      if (value instanceof Float || value instanceof Double) {
        writableMap.putDouble(key, jsonObject.getDouble(key));
      } else if (value instanceof Number) {
        writableMap.putInt(key, jsonObject.getInt(key));
      } else if (value instanceof String) {
        writableMap.putString(key, jsonObject.getString(key));
      } else if (value instanceof JSONObject) {
        writableMap.putMap(key, jsonToReact(jsonObject.getJSONObject(key)));
      } else if (value instanceof JSONArray) {
        writableMap.putArray(key, jsonToReact(jsonObject.getJSONArray(key)));
      } else if (value instanceof Boolean) {
        writableMap.putBoolean(key, jsonObject.getBoolean(key));
      } else if (value == JSONObject.NULL) {
        writableMap.putNull(key);
      }
    }
    return writableMap;
  }

}
