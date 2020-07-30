'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "favicon.png": "5dcef449791fa27946b3d35ad8803796",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"assets/NOTICES": "f32c583a25c0f532bb64ba8478086d0e",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/assets/Boy.flr": "e952f57ebe5afe32d4727e31e2e5030e",
"assets/assets/images/instagram.png": "bb952b3e5c9b726196de8ee34227edb6",
"assets/assets/images/dart.png": "9271c5feaa7176d4bc87467c11eaa8c0",
"assets/assets/images/nodejs.png": "b73453c62371ffa61b16dce4dd72ae65",
"assets/assets/images/flutter.png": "67642a0b80f3d50277c44cde8f450e50",
"assets/assets/images/codeforces.png": "1d395ff8bedd2848730fac2ddcf6333b",
"assets/assets/images/cpp.png": "fbc85d8dbc00b63fab032f19dba650d2",
"assets/assets/images/android.png": "bd2a6f71b226d38ccdbaff124b727080",
"assets/assets/images/twitter.png": "312082f64163590d6cdf6f2929bf7612",
"assets/assets/images/codechef.png": "2fb8bd067a890e6e6e6c438cc940d629",
"assets/assets/images/javascript.png": "2e5de0a7d635b437db088d43f847d39c",
"assets/assets/images/java.png": "458aa8023c52e48ce5b87d0c764fb414",
"assets/assets/images/github.png": "9bd526d73178fa9d0331801a0b6ba056",
"assets/assets/images/hackerrank.png": "50538e10603eaa930182af1fbec8978f",
"assets/assets/images/mongodb.png": "8d95890abc0bd2749be918a3be47d4df",
"assets/assets/images/c.png": "1c1888a3eb2f04360763c1a95257b726",
"assets/assets/images/linkedin.png": "7c2ddc7b8b6595f6d71db4534f0bb098",
"assets/assets/images/git.png": "cca1d72813c340797640c2975925a315",
"assets/assets/images/python.png": "5a53234c474a06637f4176381249534f",
"assets/assets/images/firebase.png": "ae20121b3839466faef58c1971b8d7e5",
"assets/assets/images/sql.png": "7a76cff597d8b80b3f1dc36a28bdd39d",
"assets/fonts/MaterialIcons-Regular.otf": "a68d2a28c526b3b070aefca4bac93d25",
"assets/AssetManifest.json": "a19df4e1347ff310a121a74ef6ad5daf",
"main.dart.js": "98c194543798f9b7a892adc887b803e4",
"index.html": "81bf5717b48921ef11cea1b0e583541a",
"/": "81bf5717b48921ef11cea1b0e583541a",
"manifest.json": "87cbfa90b53c626685290282da5c542e",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      // Provide a no-cache param to ensure the latest version is downloaded.
      return cache.addAll(CORE.map((value) => new Request(value, {'cache': 'no-cache'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');

      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }

      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#')) {
    key = '/';
  }
  // If the URL is not the RESOURCE list, skip the cache.
  if (!RESOURCES[key]) {
    return event.respondWith(fetch(event.request));
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache. Ensure the resources are not cached
        // by the browser for longer than the service worker expects.
        var modifiedRequest = new Request(event.request, {'cache': 'no-cache'});
        return response || fetch(modifiedRequest).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    return self.skipWaiting();
  }

  if (event.message === 'downloadOffline') {
    downloadOffline();
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey in Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
