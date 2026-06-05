const CACHE = 'concert-ready-v2';
const FILES = ['/index.html'];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); });
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));
self.addEventListener('notificationclick', e => { e.notification.close(); e.waitUntil(clients.matchAll({type:'window'}).then(cs => { if(cs.length) cs[0].focus(); else clients.openWindow('/'); })); });
self.addEventListener('message', e => {
  if(e.data && e.data.type === 'SCHEDULE_NOTIF') {
    const {title, body, delay} = e.data;
    setTimeout(() => self.registration.showNotification(title, {body, icon:'/icons/icon-192.png', badge:'/icons/icon-192.png', vibrate:[200,100,200]}), delay);
  }
});
