const CACHE_NAME = "healthguardian-nlp-lab-v1-evolution-8";

const CORE_ASSETS = [
    "/",
    "/index.html",
    "/style.css",
    "/style.css?v=8",
    "/script.js",
    "/script.js?v=8",
    "/core/legacy-engine.mjs",
    "/core/lexical-engine.mjs",
    "/core/context.mjs",
    "/core/i18n.mjs",
    "/core/validator.mjs",
    "/data.json",
    "/manifest.json"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(CORE_ASSETS);
        })
    );

    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((cacheName) => cacheName.startsWith('healthguardian-nlp-lab-') && cacheName !== CACHE_NAME)
                    .map((cacheName) => caches.delete(cacheName))
            );
        })
    );

    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    const request = event.request;

    if (request.method !== "GET") {
        return;
    }

    const requestUrl = new URL(request.url);

    if (requestUrl.origin === self.location.origin && request.mode === "navigate") {
        event.respondWith(fetch(request).catch(async () => (await caches.open(CACHE_NAME)).match("/index.html")));
        return;
    }
    if (requestUrl.origin === self.location.origin) {
        event.respondWith(
            caches.match(request).then((cachedResponse) => {
                const networkResponse = fetch(request)
                    .then((response) => {
                        if (
                            response &&
                            response.status === 200 &&
                            response.type === "basic"
                        ) {
                            const responseClone = response.clone();

                            caches.open(CACHE_NAME).then((cache) => {
                                cache.put(request, responseClone);
                            });
                        }

                        return response;
                    })
                    .catch(() => cachedResponse);

                return cachedResponse || networkResponse;
            })
        );

        return;
    }

    event.respondWith(
        fetch(request).catch(() => caches.match(request))
    );
});
