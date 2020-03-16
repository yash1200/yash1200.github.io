'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "/favicon.png": "5dcef449791fa27946b3d35ad8803796",
"/icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"/icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"/assets/assets/Boy.flr": "e952f57ebe5afe32d4727e31e2e5030e",
"/assets/assets/images/android.png": "bd2a6f71b226d38ccdbaff124b727080",
"/assets/assets/images/github.png": "9bd526d73178fa9d0331801a0b6ba056",
"/assets/assets/images/git.png": "cca1d72813c340797640c2975925a315",
"/assets/assets/images/dart.png": "9271c5feaa7176d4bc87467c11eaa8c0",
"/assets/assets/images/firebase.png": "ae20121b3839466faef58c1971b8d7e5",
"/assets/assets/images/twitter.png": "312082f64163590d6cdf6f2929bf7612",
"/assets/assets/images/flutter.png": "67642a0b80f3d50277c44cde8f450e50",
"/assets/assets/images/python.png": "5a53234c474a06637f4176381249534f",
"/assets/assets/images/linkedin.png": "7c2ddc7b8b6595f6d71db4534f0bb098",
"/assets/assets/images/java.png": "458aa8023c52e48ce5b87d0c764fb414",
"/assets/assets/images/codechef.png": "2fb8bd067a890e6e6e6c438cc940d629",
"/assets/assets/images/codeforces.png": "1d395ff8bedd2848730fac2ddcf6333b",
"/assets/assets/images/cpp.png": "fbc85d8dbc00b63fab032f19dba650d2",
"/assets/assets/images/c.png": "1c1888a3eb2f04360763c1a95257b726",
"/assets/assets/images/hackerrank.png": "50538e10603eaa930182af1fbec8978f",
"/assets/assets/images/sql.png": "7a76cff597d8b80b3f1dc36a28bdd39d",
"/assets/assets/images/instagram.png": "bb952b3e5c9b726196de8ee34227edb6",
"/assets/AssetManifest.json": "6d893c4307de8f23e6963094950e566a",
"/assets/FontManifest.json": "01700ba55b08a6141f33e168c4a6c22f",
"/assets/LICENSE": "89e061ec9ac961fd64664afd0f60f957",
"/assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"/assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"/main.dart.js": "de431036c27da982800b3662650c63d6",
"/index.html": "81bf5717b48921ef11cea1b0e583541a",
"/manifest.json": "87cbfa90b53c626685290282da5c542e"
};

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheName) {
      return caches.delete(cacheName);
    }).then(function (_) {
      return caches.open(CACHE_NAME);
    }).then(function (cache) {
      return cache.addAll(Object.keys(RESOURCES));
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
