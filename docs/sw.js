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
   "/m01conceptos/index.html",
   "/m01conceptos/mAaw.html",
   "/m01conceptos/mBawoas.html",
   "/m01conceptos/mCamn.html",
   "/m01conceptos/mDpwa.html",
   "/m01conceptos/mEresumen.html",
   "/m01conceptos/print.html",
   "/m02herramientas/index.html",
   "/m02herramientas/mArequerimientos.html",
   "/m02herramientas/mBnavegadores.html",
   "/m02herramientas/mCdesarrollo.html",
   "/m02herramientas/mDresumen.html",
   "/m02herramientas/print.html",
   "/m03base/index.html",
   "/m03base/mAinstrucciones.html",
   "/m03base/mBarchivos.html",
   "/m03base/mCjsconfigJson.html",
   "/m03base/mDsiteWebmanifest.html",
   "/m03base/mEswJs.html",
   "/m03base/mFregSwJs.html",
   "/m03base/mGconfigJs.html",
   "/m03base/mHindexHtml.html",
   "/m03base/mIestilosCss.html",
   "/m03base/mJfaviconIco.html",
   "/m03base/mKicono2048png.html",
   "/m03base/mLmaskable_icon_x48png.html",
   "/m03base/mMmaskable_icon_x72png.html",
   "/m03base/mNmaskable_icon_x96png.html",
   "/m03base/mOmaskable_icon_x128png.html",
   "/m03base/mPmaskable_icon_x192png.html",
   "/m03base/mQmaskable_icon_x384png.html",
   "/m03base/mRmaskable_icon_x512png.html",
   "/m03base/mSmaskable_iconPng.html",
   "/m03base/mTresumen.html",
   "/m03base/print.html",
   "/m04renderCliente/index.html",
   "/m04renderCliente/mAcasos.html",
   "/m04renderCliente/mBdespliegue.html",
   "/m04renderCliente/mCer.html",
   "/m04renderCliente/mDnoRel.html",
   "/m04renderCliente/mEinstrucciones.html",
   "/m04renderCliente/mFarchivos.html",
   "/m04renderCliente/mGtipos.html",
   "/m04renderCliente/mHcliente.html",
   "/m04renderCliente/mIgetValor.html",
   "/m04renderCliente/mJsetValor.html",
   "/m04renderCliente/mKindexJs.html",
   "/m04renderCliente/mLindexHtml.html",
   "/m04renderCliente/mMresumen.html",
   "/m04renderCliente/print.html",
   "/m05renderServidor/index.html",
   "/m05renderServidor/mAblink.html",
   "/m05renderServidor/mBbutton.html",
   "/m05renderServidor/mCdispositivo.html",
   "/m05renderServidor/mDresumen.html",
   "/m05renderServidor/print.html",
   "/m06sincronizacion/index.html",
   "/m06sincronizacion/mAblink.html",
   "/m06sincronizacion/mBbutton.html",
   "/m06sincronizacion/mCdispositivo.html",
   "/m06sincronizacion/mDresumen.html",
   "/m06sincronizacion/print.html",
   "/m07notificaciones/index.html",
   "/m07notificaciones/mAblink.html",
   "/m07notificaciones/mBbutton.html",
   "/m07notificaciones/mCdispositivo.html",
   "/m07notificaciones/mDresumen.html",
   "/m07notificaciones/print.html",
   "/m08distribucion/index.html",
   "/m08distribucion/mAcasos.html",
   "/m08distribucion/mBdespliegue.html",
   "/m08distribucion/mCer.html",
   "/m08distribucion/mDnoRel.html",
   "/m08distribucion/mEinstrucciones.html",
   "/m08distribucion/mFarchivos.html",
   "/m08distribucion/mGtipos.html",
   "/m08distribucion/mHcliente.html",
   "/m08distribucion/mIgetValor.html",
   "/m08distribucion/mJsetValor.html",
   "/m08distribucion/mKindexJs.html",
   "/m08distribucion/mLindexHtml.html",
   "/m08distribucion/mMresumen.html",
   "/m08distribucion/print.html",
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