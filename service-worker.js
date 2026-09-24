const CACHE_NAME='nutriplan-shell-v9';
const SHELL=[
  './','./index.html','./nutriplan.html','./app.css','./app.js','./nutrition-engine.js',
  './nutriplan-data.js','./nutriplan-entrenamientos-data.js','./manifest.webmanifest',
  './icons/icon-192.png','./icons/icon-512.png','./icons/maskable-512.png',
  './images/REC-011.webp','./images/REC-015.webp','./images/REC-018.webp'
];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

async function networkFirst(request){
  const cache=await caches.open(CACHE_NAME);
  try{
    const response=await fetch(request,{cache:'no-store'});
    if(response && response.ok) await cache.put(request,response.clone());
    return response;
  }catch(_){
    return (await cache.match(request)) || Response.error();
  }
}
async function cacheFirst(request){
  const cache=await caches.open(CACHE_NAME);
  const hit=await cache.match(request);
  if(hit)return hit;
  const response=await fetch(request);
  if(response && response.ok) await cache.put(request,response.clone());
  return response;
}

self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin)return;
  if(url.pathname.endsWith('/nutriplan-data.js') || url.pathname.endsWith('/nutriplan-entrenamientos-data.js')){
    event.respondWith(networkFirst(request));return;
  }
  if(request.mode==='navigate'){
    event.respondWith(networkFirst(request).catch(()=>caches.match('./index.html')));return;
  }
  event.respondWith(cacheFirst(request));
});
