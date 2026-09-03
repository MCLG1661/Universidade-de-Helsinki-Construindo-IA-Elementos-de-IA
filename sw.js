const CACHE_NAME = "healthguardian-nlp-lab-v1";

const CORE_ASSETS = [
    "/",
    "/index.html",
    "/style.css",
    "/script.js",
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
                    .filter((cacheName) => cacheName !== CACHE_NAME)
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
