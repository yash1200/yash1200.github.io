'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"manifest.json": "9ec2449e8869aafcd2690e6fb1c92f19",
"favicon.png": "c27515ae2d3826b68b042d56f23661ed",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/assets/images/c.png": "1c1888a3eb2f04360763c1a95257b726",
"assets/assets/images/hackerrank.png": "50538e10603eaa930182af1fbec8978f",
"assets/assets/images/firebase.png": "ae20121b3839466faef58c1971b8d7e5",
"assets/assets/images/javascript.png": "2e5de0a7d635b437db088d43f847d39c",
"assets/assets/images/typescript.png": "14c6ebf34f313e9cc7350f4f5ad44c0c",
"assets/assets/images/codeforces.png": "1d395ff8bedd2848730fac2ddcf6333b",
"assets/assets/images/instagram.png": "bb952b3e5c9b726196de8ee34227edb6",
"assets/assets/images/boy1.png": "766f2286f0de86cd771e6cc29b5135d3",
"assets/assets/images/react.png": "bdeee86157327229ad90c7227c2ad891",
"assets/assets/images/mongodb.png": "8d95890abc0bd2749be918a3be47d4df",
"assets/assets/images/electron.png": "2464a81dcf2df8ab50e0d7d716253243",
"assets/assets/images/twitter.png": "312082f64163590d6cdf6f2929bf7612",
"assets/assets/images/kotlin.png": "e949af3fd296c54dab5f06e9359cac1e",
"assets/assets/images/linkedin.png": "7c2ddc7b8b6595f6d71db4534f0bb098",
"assets/assets/images/python.png": "5a53234c474a06637f4176381249534f",
"assets/assets/images/android.png": "bd2a6f71b226d38ccdbaff124b727080",
"assets/assets/images/nodejs.png": "b73453c62371ffa61b16dce4dd72ae65",
"assets/assets/images/sql.png": "7a76cff597d8b80b3f1dc36a28bdd39d",
"assets/assets/images/vue.png": "bd1e621275f836e4a908a09ff4c0e28e",
"assets/assets/images/git.png": "cca1d72813c340797640c2975925a315",
"assets/assets/images/codechef.png": "2fb8bd067a890e6e6e6c438cc940d629",
"assets/assets/images/java.png": "458aa8023c52e48ce5b87d0c764fb414",
"assets/assets/images/dart.png": "9271c5feaa7176d4bc87467c11eaa8c0",
"assets/assets/images/flutter.png": "67642a0b80f3d50277c44cde8f450e50",
"assets/assets/images/bash.png": "1e78ac2b1ce83842d47de985c9be4775",
"assets/assets/images/cpp.png": "fbc85d8dbc00b63fab032f19dba650d2",
"assets/assets/images/github.png": "9bd526d73178fa9d0331801a0b6ba056",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/packages/fluttertoast/assets/toastify.css": "a85675050054f179444bc5ad70ffc635",
"assets/packages/fluttertoast/assets/toastify.js": "e7006a0a033d834ef9414d48db3be6fc",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/AssetManifest.json": "c2f65c9a70263e35ec7ffcf7baea0bc5",
"assets/NOTICES": "d75bc3d4d85bead93dbb91ef66311081",
"version.json": "408798af188378b64d27faac697a675e",
"main.dart.js": "ea8a2f6da3cf62d2c79a402ba9454ff3",
"index.html": "b575a20136b7839f4b47a0dc395689e9",
"/": "b575a20136b7839f4b47a0dc395689e9"
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
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
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
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
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
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
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
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
