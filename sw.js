const CACHE_NAME = 'avalia-ai-cache-v1';
// Ajuste a URL da sua página principal aqui
const urlsToCache = [
  '/', 
  '/avalia-ai/',
  '/avalia-ai/index.html',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap'
];

// Evento de instalação: abre o cache e armazena os arquivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de fetch: intercepta as requisições
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Se encontrar no cache, retorna do cache. Senão, busca na rede.
        return response || fetch(event.request);
      })
  );
});
