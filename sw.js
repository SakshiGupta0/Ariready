const CACHE = 'concert-ready-v3';
const BASE = 'https://sakshigupta0.github.io/Ariready/';
const FILES = [BASE, BASE + 'index.html'];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES).catch(()=>{}))); });
self.addEventListener('activate', e => { self.clients.claim(); e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))); });
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => { const clone = res.clone(); caches.open(CACHE).then(c=>c.put(e.request,clone)); return res; }).catch(()=>caches.match(BASE+'index.html')))));
self.addEventListener('notificationclick', e => { e.notification.close(); e.waitUntil(clients.matchAll({type:'window'}).then(cs => { if(cs.length) cs[0].focus(); else clients.openWindow(BASE); })); });
