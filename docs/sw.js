/// <reference lib="webworker" />

/* Espera 11 minutos después de hacer los cambios en tu sitio, para depués
 * actualizar este archivo. */

const CACHE = "cache"

const VERSION = "1.1"

const ARCHIVOS = [
  "/favicon.ico",
   "/img/icono/160x30.png",
   "/img/icono/160x30.webp",
   "/img/icono/80x15.png",
   "/img/icono/icono1024.png",
   "/img/icono/icono2048.png",
   "/img/icono/icono256.png",
   "/img/icono/maskable_icon.png",
   "/img/icono/maskable_icon_x128.png",
   "/img/icono/maskable_icon_x192.png",
   "/img/icono/maskable_icon_x384.png",
   "/img/icono/maskable_icon_x48.png",
   "/img/icono/maskable_icon_x512.png",
   "/img/icono/maskable_icon_x72.png",
   "/img/icono/maskable_icon_x96.png",
   "/img/m03base/favicon.ico",
   "/img/m03base/icono2048.png",
   "/img/m03base/maskable_icon.png",
   "/img/m03base/maskable_icon_x128.png",
   "/img/m03base/maskable_icon_x192.png",
   "/img/m03base/maskable_icon_x384.png",
   "/img/m03base/maskable_icon_x48.png",
   "/img/m03base/maskable_icon_x512.png",
   "/img/m03base/maskable_icon_x72.png",
   "/img/m03base/maskable_icon_x96.png",
   "/index.html",
   "/js/muestra-codigo.js",
   "/m01notificaciones/index.html",
   "/m01notificaciones/mAblink.html",
   "/m01notificaciones/mBbutton.html",
   "/m01notificaciones/mCdispositivo.html",
   "/m01notificaciones/mDresumen.html",
   "/m01notificaciones/print.html",
   "/m02push/index.html",
   "/m02push/mAblink.html",
   "/m02push/mBbutton.html",
   "/m02push/mCdispositivo.html",
   "/m02push/mDresumen.html",
   "/m02push/print.html",
   "/m03sincronizacion/index.html",
   "/m03sincronizacion/mAblink.html",
   "/m03sincronizacion/mBbutton.html",
   "/m03sincronizacion/mCdispositivo.html",
   "/m03sincronizacion/mDresumen.html",
   "/m03sincronizacion/print.html",
   "/m04distribucion/index.html",
   "/m04distribucion/mAcasos.html",
   "/m04distribucion/mBdespliegue.html",
   "/m04distribucion/mCer.html",
   "/m04distribucion/mDnoRel.html",
   "/m04distribucion/mEinstrucciones.html",
   "/m04distribucion/mFarchivos.html",
   "/m04distribucion/mGtipos.html",
   "/m04distribucion/mHcliente.html",
   "/m04distribucion/mIgetValor.html",
   "/m04distribucion/mJsetValor.html",
   "/m04distribucion/mKindexJs.html",
   "/m04distribucion/mLindexHtml.html",
   "/m04distribucion/mMresumen.html",
   "/m04distribucion/print.html",
   "/print.html",
   "/site.webmanifest",
   "/src/m03vistas/Aformulario.html",
   "/src/m03vistas/Bapp.html",
   "/src/m03vistas/Ccampos.html",
   "/src/m03vistas/Dbotones.html",
   "/src/m03vistas/Einterruptor.html",
   "/src/m03vistas/Fgps.html",
   "/src/m03vistas/Garchivos.html",
    "/"]

if (self instanceof ServiceWorkerGlobalScope) {
 self.addEventListener("install", installListener)
 self.addEventListener("fetch", fetchListener)
 self.addEventListener("activate", () => console.log("Service Worker activo."))
}

/**
 * @param {ExtendableEvent} evt
 */
function installListener(evt) {
 console.log("Service Worker instalando.")
 evt.waitUntil(cargaCache());
}

/**
 * @param {FetchEvent} evt
 */
function fetchListener(evt) {
 if (evt.request.method === "GET") {
  evt.respondWith(usaCache(evt))
 }
}

async function cargaCache() {
 console.log("Intentando cargar cache:", CACHE)
 const keys = await caches.keys()
 for (const key of keys) {
  await caches.delete(key)
 }
 const cache = await caches.open(CACHE)
 await cache.addAll(ARCHIVOS)
 console.log("Cache cargado:", CACHE)
 console.log("Versión:", VERSION)
}

/**
 * @param {FetchEvent} evt
 */
async function usaCache(evt) {
 const cache = await caches.open(CACHE)
 const response = await cache.match(evt.request, { ignoreSearch: true })
 if (response) {
  return response
 } else {
  return fetch(evt.request)
 }
}