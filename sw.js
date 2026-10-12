// Service worker ของหน้าแอป Portable X-ray (GitHub Pages)
// เก็บเฉพาะ "เปลือก" ของแอป (หน้าเริ่ม โลโก้ ไอคอน) ไว้ในเครื่อง เพื่อให้ติดตั้งเป็นแอปได้และเปิดหน้ารอโหลดได้เร็ว
// ข้อมูลระบบจริงมาจาก Apps Script (script.google.com) เสมอ ไม่ถูกเก็บในแคช
// เปลี่ยนไฟล์ไอคอน/โลโก้แล้ว ให้เพิ่มเลขเวอร์ชันด้านล่าง เพื่อให้เครื่องผู้ใช้โหลดของใหม่
const CACHE_NAME = 'pxr-shell-v1';
const SHELL = [
  './', 'index.html', 'config.js', 'manifest.webmanifest', 'favicon.ico', 'favicon.svg', 'apple-touch-icon.png',
  'logo/logo-light.png', 'logo/logo-dark.png', 'icons/icon-192x192.png', 'icons/icon-512x512.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL)).catch(() => {}));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return; // ไม่ยุ่งกับ Apps Script / Google
  // ดึงจากเครือข่ายก่อน (ได้ของล่าสุดเสมอ) ถ้าออฟไลน์ค่อยใช้ของในแคช
  event.respondWith(
    fetch(req).then((res) => {
      if (res && res.ok) { const copy = res.clone(); caches.open(CACHE_NAME).then((c) => c.put(req, copy)).catch(() => {}); }
      return res;
    }).catch(() => caches.match(req).then((hit) => hit || caches.match('index.html')))
  );
});
