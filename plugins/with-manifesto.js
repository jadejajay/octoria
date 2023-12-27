const { withAndroidManifest } = require('@expo/config-plugins');

/**
 * @param {{ manifest: any; }} androidManifest
 * @param {any} attributes
 */
function addAttributesToMainActivity(androidManifest, attributes) {
  const { manifest } = androidManifest;

  if (!Array.isArray(manifest.application)) {
    console.warn(
      'withAndroidMainActivityAttributes: No application array in manifest?'
    );
    return androidManifest;
  }

  const application = manifest.application.find(
    (/** @type {{ $: { [x: string]: string; }; }} */ item) =>
      item.$['android:name'] === '.MainApplication'
  );
  if (!application) {
    console.warn('withAndroidMainActivityAttributes: No .MainApplication?');
    return androidManifest;
  }

  if (!Array.isArray(application.activity)) {
    console.warn(
      'withAndroidMainActivityAttributes: No activity array in .MainApplication?'
    );
    return androidManifest;
  }

  const activity = application.activity.find(
    (/** @type {{ $: { [x: string]: string; }; }} */ item) =>
      item.$['android:name'] === '.MainActivity'
  );
  if (!activity) {
    console.warn('withAndroidMainActivityAttributes: No .MainActivity?');
    return androidManifest;
  }

  activity.$ = { ...activity.$, ...attributes };

  return androidManifest;
}

module.exports = function withAndroidMainActivityAttributes(
  /** @type {import("@expo/config-types").ExpoConfig} */ config,
  /** @type {any} */ attributes
) {
  return withAndroidManifest(config, (config2) => {
    config2.modResults = addAttributesToMainActivity(
      config2.modResults,
      attributes
    );
    return config2;
  });
};
