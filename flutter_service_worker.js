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
"/manifest.json": "87cbfa90b53c626685290282da5c542e",
"/.git/hooks/update.sample": "517f14b9239689dff8bda3022ebd9004",
"/.git/hooks/prepare-commit-msg.sample": "2b5c047bdb474555e1787db32b2d2fc5",
"/.git/hooks/commit-msg.sample": "579a3c1e12a1e74a98169175fb913012",
"/.git/hooks/pre-receive.sample": "2ad18ec82c20af7b5926ed9cea6aeedd",
"/.git/hooks/pre-push.sample": "3c5989301dd4b949dfa1f43738a22819",
"/.git/hooks/post-update.sample": "2b7ea5cee3c49ff53d41e00785eb974c",
"/.git/hooks/pre-commit.sample": "e4db8c12ee125a8a085907b757359ef0",
"/.git/hooks/pre-rebase.sample": "56e45f2bcbc8226d2b4200f7c46371bf",
"/.git/hooks/applypatch-msg.sample": "ce562e08d8098926a3862fc6e7905199",
"/.git/hooks/fsmonitor-watchman.sample": "db4d62db2039e4bec38baa7567788284",
"/.git/hooks/pre-applypatch.sample": "054f9ffb8bfe04a599751cc757226dda",
"/.git/hooks/pre-merge-commit.sample": "39cb268e2a85d436b9eb6f47614c3cbc",
"/.git/COMMIT_EDITMSG": "a8297d555dd34879e8e48e1cf12acefa",
"/.git/objects/03/8025104df226f9eb9fe6031caa50d63229e473": "342ca96310c72aece136ee07fab6fe78",
"/.git/objects/1a/ce929e6748c97d13dc78641c31b6f49eae4054": "bfe32d6b7a89bc7b2e7a4ea21426ca05",
"/.git/objects/7e/2993afbff50a007d97631ee59d6aebd07ce616": "5dd31a8e013667fbaa2978cc80f5e144",
"/.git/objects/7e/c75391112930b182ce2ecb757fe897cce781d3": "652ed7d0c556c62cc19bd724230661f1",
"/.git/objects/b7/49bfef07473333cf1dd31e9eed89862a5d52aa": "36b4020dca303986cad10924774fb5dc",
"/.git/objects/d0/91c28f04211f6ea515ecdd907ecf6e16ed0d85": "f9f4b973fcb52d2080a3abfd4b71e50a",
"/.git/objects/d0/23e6b1c0c1f07497906cd404a0223b262bd346": "babdc936ccedc99d93fe786727bc1e55",
"/.git/objects/01/9f1fa9f5b2735b3d60b1faabfc8481c9a99d56": "13f432fd15c232617443f5b15464b9ee",
"/.git/objects/15/9b15011009e1e691b0761e5627dc3f3aa452ad": "822c0ced8e90203ed87ff7e0082d7945",
"/.git/objects/47/56ee2ab3b4ba12f3661b0b7433199b4e6239b8": "082dd5a98ee45e56fcdec1260e52cf87",
"/.git/objects/8a/aa46ac1ae21512746f852a42ba87e4165dfdd1": "1d8820d345e38b30de033aa4b5a23e7b",
"/.git/objects/dd/56eabbf298449db91bfa8644c6fbb20b8e6dda": "3fa6bb294070401dbba0b01792b84ce0",
"/.git/objects/6f/ef50ebb1ec96129b120cdc011ef93f5ea77cd7": "ca48cb455a2960fbd909f4a58978fc47",
"/.git/objects/f8/2002dc0d68d577fb2b97710f6cbe7bd5d01800": "027ca13ac9033675ff99c4a1f88ac208",
"/.git/objects/14/d1ad0c31f862e7f25cba3a5712c81062e5df6c": "23b4452f2cc30e0505982ada9a8ebe95",
"/.git/objects/56/1037ecd7f642e482c8e5f9c1fd9e0200771079": "03465e5233766b56d65c29dedf019f30",
"/.git/objects/3b/759ec4c4fde735dae559e0dfbcbf50641c1f3d": "2dae85bd3b07db15d85ef404ffa2483f",
"/.git/objects/0f/816fb5068fb5d0dc1623718a94d7a34c5edfe4": "48392ce692d6328aef69a753fa305233",
"/.git/objects/1c/8e5a18e016bbd18c70f07538a7622eaad0ef3c": "1be3988f9a61cafa51dcf5ed91242acb",
"/.git/objects/13/cd698afa86edb334bec59991cd113491a5a4f1": "01d69635e49925db17e7c32e26fc974f",
"/.git/objects/f7/c8650826072364add33b84d6fb4997ce0ee8d6": "e8209c1701cc60abc51d8e3689e836a9",
"/.git/objects/93/7983be6b0678b56b93d376b81c056e748b81db": "90c8aa85fdb1d160ab57d9bab262a1a7",
"/.git/objects/67/d7316a68d8371a545c52dce0a2e45236f157bc": "3ea2f9c8a85db3a361790398ebb63cbf",
"/.git/objects/67/ba76ac9d22bf2ab8524839d7b3eb9f849fb018": "b99b23922154d3843a9ed10ba98a7301",
"/.git/objects/fc/565ec170b7fd55cbf422b8188a6f64eddda60e": "c1d5b622c8e63d1865785872c9d4a21d",
"/.git/objects/81/0337fcab9374ea7916511a5b9b59c1fe38c5fd": "cc99e87ef5a5ad26f76eb93e555d98fa",
"/.git/objects/cb/cd74909c42b85bd8d42f8a9985f2c5f51c2418": "8240d152ed850d9d70e06b6742df0845",
"/.git/objects/3e/758e72053c3e36fb60818f3761ebf8cbfd1090": "95009582a31945ba9667f7fc6de28733",
"/.git/objects/20/5bb5db271c6d8de8399864c7bb9b917f638893": "c993b22f115d7f3ae6d5b7b212806539",
"/.git/objects/72/a41fdfac7d4c54fc41895a5fa972fdb41d864c": "3d371b1de6ace65672688444d7c5a159",
"/.git/objects/f5/08889a734dcb95d2a69139365fba4dbbb03e3a": "bc79fb2e88e469ddc53c39bf7c9d28b1",
"/.git/objects/88/cfd48dff1169879ba46840804b412fe02fefd6": "e42aaae6a4cbfbc9f6326f1fa9e3380c",
"/.git/objects/c8/97a1186b8762c46d5458f1103d31290ad7992c": "d4070bce71bfebbfc23b2d5e32ab0fbc",
"/.git/objects/eb/41f4fa285f7d839dbb66f2fe8cb5f84a3c3548": "b07474da70102b1027fa09f163beafe6",
"/.git/objects/aa/c83bf8bbec441ff5051f89b9d541c21e1b90d7": "d37106fc9bf55ed374819cf4cff19b40",
"/.git/objects/00/357cb9c97408f7904bdc0a73bb937b2a4041e4": "2affc5f764f2b8ab79c72f94c283b42c",
"/.git/objects/95/19e1d75e8e60fc461d42dceff7162076484747": "87166efde232eca9c4f1ad4118b6d046",
"/.git/objects/28/020ffcb7b960c67d43a6b486c7c0d72aabd7ae": "ea29401905cbeda7dd383be581f787e8",
"/.git/objects/fe/2e9b1c9b201d87db53817e86e388f141417cac": "9166a26661c035b0704dafd553525e67",
"/.git/objects/fe/c3dff25570368cedec0017f0fb16257840cecf": "fede3e4e6f6616b28559bba5187b5684",
"/.git/objects/a5/b291c1aa0bfa57fcb342e5c586b8b49273760e": "d06bfa4618527e0463eae3a76d59d9ff",
"/.git/refs/heads/master": "a957e92040e805cd77daa2720b9b3444",
"/.git/refs/remotes/origin/master": "a957e92040e805cd77daa2720b9b3444",
"/.git/HEAD": "4cf2d64e44205fe628ddd534e1151b58",
"/.git/config": "a2e63c7e3f72d527ba7bae69e055182b",
"/.git/logs/refs/heads/master": "49401390487801c0ac02b7a99a661dc4",
"/.git/logs/refs/remotes/origin/master": "74554cc4093c5c99cbfccefd6c6a34cc",
"/.git/logs/HEAD": "49401390487801c0ac02b7a99a661dc4",
"/.git/description": "a0a7c3fff21f2aea3cfa1d0316dd816c",
"/.git/index": "f90793a1e8b39f6fbd779aee3e0802bb",
"/.git/info/exclude": "036208b4a1ab4a235d75c181e685e5a3"
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
