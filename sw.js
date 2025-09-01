self.addEventListener('install', event => {
    console.log('Service Worker instalado');
    event.waitUntil(
        caches.open('v1')
            .then(cache => {
                return cache.addAll([
                    '/',
                    '/index.html',
                    '/css/style.css',
                    '/js/main.js',
                    '/img/about-1.jpg',
                    '/img/about-2.jpg',
                    '/img/carousel-1.jpg',
                    '/img/carousel-2.jpg',
                    '/img/product-1.jpg',
                    '/img/product-2.jpg',
                    '/img/product-3.jpg',
                    '/img/service-1.jpg',
                    '/img/service-2.jpg',
                    '/img/team-1.jpg',
                    '/img/team-2.jpg',
                    '/img/team-3.jpg',
                    '/img/team-4.jpg',
                    '/img/testimonial-1.jpg',
                    '/img/testimonial-2.jpg',
                    '/img/testimonial-3.jpg',
                    '/img/testimonial-4.jpg',
                    '/about.html',                   
                    '/service.html',
                    '/product.html',
                    '/contact.html',
                    '/404.html',
                    '/team.html',
                    '/testimonial.html',
                                   
                    






                ]);
            })
    );
});

self.addEventListener('activate', event => {
    console.log('Service Worker activado');
    const cacheWhitelist = ['v1'];
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheWhitelist.indexOf(cacheName) === -1) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', event => {
    console.log('Service Worker fetch');
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            }).catch(() => caches.match('/offline.html'))
    );
});

