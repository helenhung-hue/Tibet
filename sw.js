const prefix = `tibet-guide:${self.registration.scope}:`;
const cacheName = `${prefix}v1`;
const shell = new URL('./', self.registration.scope).href;
const index = new URL('index.html', shell).href;
const files = [
  'styles.css', 'trip-data.js', 'app.js',
  'assets/photos/namcha.webp', 'assets/photos/basum.webp', 'assets/photos/yamdrok.webp',
  'assets/photos/namtso.webp', 'assets/photos/potala.webp',
  'assets/photos/monastery.webp', 'assets/photos/jokhang.webp'
].map(path => new URL(path, shell).href);

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    await cache.addAll([shell, ...files].map(url => new Request(url, { cache: 'reload' })));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith(prefix) && name !== cacheName).map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

async function onlineOrCached(request, key, cache) {
  try {
    const response = await fetch(request);
    if (response.ok) return response;
    return (await cache.match(key)) || response;
  } catch {
    return (await cache.match(key)) || Response.error();
  }
}

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  url.search = '';
  const isHome = request.mode === 'navigate' && [shell, index].includes(url.href);
  if (!isHome && !files.includes(url.href)) return;
  event.respondWith((async () => {
    const cache = await caches.open(cacheName);
    return onlineOrCached(request, isHome ? shell : url.href, cache);
  })());
});
