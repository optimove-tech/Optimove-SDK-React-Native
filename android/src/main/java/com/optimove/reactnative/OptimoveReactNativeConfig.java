package com.optimove.reactnative;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.optimove.android.OptimoveConfig;

public class OptimoveReactNativeConfig {

  @NonNull
  private final String optimoveCredentials;
  @NonNull
  private final String optimobileCredentials;
  @NonNull
  private final boolean deeplinkEnabled;
  @Nullable
  private final OptimoveConfig.InAppConsentStrategy inAppConsentStrategy;


  private OptimoveReactNativeConfig(@NonNull String optimoveCredentials, @NonNull String optimobileCredentials, boolean deeplinkEnabled,
                                    @Nullable OptimoveConfig.InAppConsentStrategy inAppConsentStrategy) {
    this.optimoveCredentials = optimoveCredentials;
    this.optimobileCredentials = optimobileCredentials;
    this.deeplinkEnabled = deeplinkEnabled;
    this.inAppConsentStrategy = inAppConsentStrategy;
  }

  public static OptimoveCredentialsStep newInstance() {
    return new Builder();
  }

  @NonNull
  public String getOptimoveCredentials() {
    return optimoveCredentials;
  }

  @NonNull
  public String getOptimobileCredentials() {
    return optimobileCredentials;
  }

  public boolean getDeeplinkEnabled() {
    return deeplinkEnabled;
  }

  @Nullable
  public OptimoveConfig.InAppConsentStrategy getInAppConsentStrategy() {
    return inAppConsentStrategy;
  }

  public interface OptimoveCredentialsStep {
    OptimobileCredentialsStep optimoveCredentials(String optimoveCredentials);
  }

  public interface OptimobileCredentialsStep {
    DeeplinkEnabledStep optimobileCredentials(String optimobileCredentials);
  }

  public interface DeeplinkEnabledStep {
    InAppConsentStrategyStep deeplinkEnabled(boolean deeplinkEnabled);
  }

  public interface InAppConsentStrategyStep {
    FinalStep enableInAppWithConsentStrategy(OptimoveConfig.InAppConsentStrategy inAppConsentStrategy);
    OptimoveReactNativeConfig build();
  }

  public interface FinalStep {
    OptimoveReactNativeConfig build();
  }

  private static final class Builder implements OptimoveCredentialsStep, OptimobileCredentialsStep, DeeplinkEnabledStep, InAppConsentStrategyStep, FinalStep {
    private String optimoveCredentials;
    private String optimobileCredentials;
    private boolean deeplinkEnabled;

    @Nullable
    private OptimoveConfig.InAppConsentStrategy inAppConsentStrategy;

    public OptimobileCredentialsStep optimoveCredentials(String optimoveCredentials) {
      this.optimoveCredentials = optimoveCredentials;
      return this;
    }

    public DeeplinkEnabledStep optimobileCredentials(String optimobileCredentials) {
      this.optimobileCredentials = optimobileCredentials;
      return this;
    }

    public InAppConsentStrategyStep deeplinkEnabled(boolean deeplinkEnabled) {
      this.deeplinkEnabled = deeplinkEnabled;
      return this;
    }

    public FinalStep enableInAppWithConsentStrategy(OptimoveConfig.InAppConsentStrategy inAppConsentStrategy) {
      this.inAppConsentStrategy = inAppConsentStrategy;
      return this;
    }

    public OptimoveReactNativeConfig build() {
      return new OptimoveReactNativeConfig(optimoveCredentials, optimobileCredentials, deeplinkEnabled, inAppConsentStrategy);
    }
  }
}
