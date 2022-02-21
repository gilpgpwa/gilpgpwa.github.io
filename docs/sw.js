/// <reference lib="webworker" />

/* Espera 11 minutos después de hacer los cambios en tu sitio, para depués
 * actualizar este archivo. */

const CACHE = "cache"

const VERSION = "1.7"

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
   "/",
   "/index.html",
   "/js/muestra-codigo.js",
   "/m01notificaciones/",
   "/m01notificaciones/index.html",
   "/m01notificaciones/mAejemplo.html",
   "/m01notificaciones/mBresumen.html",
   "/m01notificaciones/print.html",
   "/m02push/",
   "/m02push/index.html",
   "/m02push/m01instrucciones.html",
   "/m02push/m02archivos.html",
   "/m02push/m03bd.html",
   "/m02push/m04SuscripcionPhp.html",
   "/m02push/m05bdCreaPhp.html",
   "/m02push/m06AccesoBdPhp.html",
   "/m02push/m07suscripcionAgregaPhp.html",
   "/m02push/m08suscripcionBuscaPhp.html",
   "/m02push/m09suscripcionConsultaPhp.html",
   "/m02push/m10suscripcionEliminaPhp.html",
   "/m02push/m11suscripcionModificaPhp.html",
   "/m02push/m12funcionalidad.html",
   "/m02push/m13SrvSuscripcionPhp.html",
   "/m02push/m14SrvNotificaPhp.html",
   "/m02push/m15indexHtml.html",
   "/m02push/m16indexJs.html",
   "/m02push/m17srvSuscripcionProxyJs.html",
   "/m02push/m18notificaJs.html",
   "/m02push/m19swJs.html",
   "/m02push/m20frecuentes.html",
   "/m02push/m21jsconfigJson.html",
   "/m02push/m22habilitaNotificacionesJs.html",
   "/m02push/m23detectaJs.html",
   "/m02push/m24ejecutaJs.html",
   "/m02push/m25getSuscripcionJs.html",
   "/m02push/m26Method.html",
   "/m02push/m27muestraErrorJs.html",
   "/m02push/m28submitJs.html",
   "/m02push/m29urlBase64ToUint8ArrayJs.html",
   "/m02push/m30copiaCamposPhp.html",
   "/m02push/m31leeJsonPhp.html",
   "/m02push/m32ServicioPhp.html",
   "/m02push/print.html",
   "/m03sincronizacion/",
   "/m03sincronizacion/index.html",
   "/m03sincronizacion/m01instrucciones.html",
   "/m03sincronizacion/m02archivos.html",
   "/m03sincronizacion/m03servidor.html",
   "/m03sincronizacion/m04PasatiempoPhp.html",
   "/m03sincronizacion/m05SrvSincroPhp.html",
   "/m03sincronizacion/m06bdCreaPhp.html",
   "/m03sincronizacion/m07AccesoBdPhp.html",
   "/m03sincronizacion/m08pasatiempoAgregaPhp.html",
   "/m03sincronizacion/m09pasatiempoBuscaPhp.html",
   "/m03sincronizacion/m10pasatiempoConsultaPhp.html",
   "/m03sincronizacion/m11pasatiempoModificaPhp.html",
   "/m03sincronizacion/m12bdCli.html",
   "/m03sincronizacion/m13connJs.html",
   "/m03sincronizacion/m14pasatiempoAgregaJs.html",
   "/m03sincronizacion/m15pasatiempoBuscaJs.html",
   "/m03sincronizacion/m16pasatiempoConsultaJs.html",
   "/m03sincronizacion/m17pasatiempoConsultaTodosJs.html",
   "/m03sincronizacion/m18pasatiempoEliminaJs.html",
   "/m03sincronizacion/m19pasatiempoModificaJs.html",
   "/m03sincronizacion/m20reemplazaJs.html",
   "/m03sincronizacion/m21funcionalidad.html",
   "/m03sincronizacion/m22indexHtml.html",
   "/m03sincronizacion/m23indexJs.html",
   "/m03sincronizacion/m24agregaHtml.html",
   "/m03sincronizacion/m25agregaJs.html",
   "/m03sincronizacion/m26modificaHtml.html",
   "/m03sincronizacion/m27modificaJs.html",
   "/m03sincronizacion/m28frecuentes.html",
   "/m03sincronizacion/m29jsconfigJson.html",
   "/m03sincronizacion/m30codJs.html",
   "/m03sincronizacion/m31ejecutaJs.html",
   "/m03sincronizacion/m32idbExecuteJs.html",
   "/m03sincronizacion/m33Method.html",
   "/m03sincronizacion/m34muestraErrorJs.html",
   "/m03sincronizacion/m35idbQueryJs.html",
   "/m03sincronizacion/m36leeJsonPhp.html",
   "/m03sincronizacion/m37ServicioPhp.html",
   "/m03sincronizacion/m38configJs.html",
   "/m03sincronizacion/m39regSwJs.html",
   "/m03sincronizacion/m41swJs.html",
   "/m03sincronizacion/m53listaCss.html",
   "/m03sincronizacion/print.html",
   "/print.html",
   "/site.webmanifest",
   "/src/m01notificaciones/",
   "/src/m01notificaciones/index.html" ]

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