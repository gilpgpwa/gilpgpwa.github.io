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
   "/m01notificaciones/mAejemplo.html",
   "/m01notificaciones/mBresumen.html",
   "/m01notificaciones/print.html",
   "/m02push/index.html",
   "/m02push/m01instrucciones.html",
   "/m02push/m02archivos.html",
   "/m02push/m03mensajes.html",
   "/m02push/m04msgFaltaElIdPhp.html",
   "/m02push/m05msgFaltaElNombrePhp.html",
   "/m02push/m06bd.html",
   "/m02push/m07PasatiempoPhp.html",
   "/m02push/m08pasatiempoCreaPhp.html",
   "/m02push/m09AccesoBdPhp.html",
   "/m02push/m10listado.html",
   "/m02push/m11pasatiempoConsultaPhp.html",
   "/m02push/m12SrvPasatiempos.html",
   "/m02push/m13indexHtml.html",
   "/m02push/m14agrega.html",
   "/m02push/m15pasatiempoAgregaPhp.html",
   "/m02push/m16SrvPasatiempoAgrega.html",
   "/m02push/m17agregaHtml.html",
   "/m02push/m18modifica.html",
   "/m02push/m19pasatiempoBuscaPhp.html",
   "/m02push/m20SrvPasatiempoBusca.html",
   "/m02push/m21pasatiempoEliminaPhp.html",
   "/m02push/m22SrvPasatiempoElimina.html",
   "/m02push/m23pasatiempoModificaPhp.html",
   "/m02push/m24SrvPasatiempoModifica.html",
   "/m02push/m25modificaHtml.html",
   "/m02push/m26frecuentes.html",
   "/m02push/m27jsconfigJson.html",
   "/m02push/m28ejecutaJs.html",
   "/m02push/m29muestraErrorJs.html",
   "/m02push/m30submitJs.html",
   "/m02push/m31leeValorPhp.html",
   "/m02push/m32ServicioPhp.html",
   "/m02push/print.html",
   "/m03sincronizacion/index.html",
   "/m03sincronizacion/m01instrucciones.html",
   "/m03sincronizacion/m02archivos.html",
   "/m03sincronizacion/m03mensajes.html",
   "/m03sincronizacion/m04msgFaltaElIdPhp.html",
   "/m03sincronizacion/m05msgFaltaElNombrePhp.html",
   "/m03sincronizacion/m06bd.html",
   "/m03sincronizacion/m07PasatiempoPhp.html",
   "/m03sincronizacion/m08pasatiempoCreaPhp.html",
   "/m03sincronizacion/m09AccesoBdPhp.html",
   "/m03sincronizacion/m10listado.html",
   "/m03sincronizacion/m11pasatiempoConsultaPhp.html",
   "/m03sincronizacion/m12SrvPasatiempos.html",
   "/m03sincronizacion/m13indexHtml.html",
   "/m03sincronizacion/m14agrega.html",
   "/m03sincronizacion/m15pasatiempoAgregaPhp.html",
   "/m03sincronizacion/m16SrvPasatiempoAgrega.html",
   "/m03sincronizacion/m17agregaHtml.html",
   "/m03sincronizacion/m18modifica.html",
   "/m03sincronizacion/m19pasatiempoBuscaPhp.html",
   "/m03sincronizacion/m20SrvPasatiempoBusca.html",
   "/m03sincronizacion/m21pasatiempoEliminaPhp.html",
   "/m03sincronizacion/m22SrvPasatiempoElimina.html",
   "/m03sincronizacion/m23pasatiempoModificaPhp.html",
   "/m03sincronizacion/m24SrvPasatiempoModifica.html",
   "/m03sincronizacion/m25modificaHtml.html",
   "/m03sincronizacion/m26frecuentes.html",
   "/m03sincronizacion/m27jsconfigJson.html",
   "/m03sincronizacion/m28ejecutaJs.html",
   "/m03sincronizacion/m29muestraErrorJs.html",
   "/m03sincronizacion/m30submitJs.html",
   "/m03sincronizacion/m31leeValorPhp.html",
   "/m03sincronizacion/m32ServicioPhp.html",
   "/m03sincronizacion/print.html",
   "/print.html",
   "/site.webmanifest",
   "/src/m01notificaciones/index.html",
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