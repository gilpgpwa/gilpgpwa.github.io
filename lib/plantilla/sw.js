/* Espera 11 minutos después de hacer los cambios en tu sitio, para depués
 * actualizar este archivo. */

/**
 * @typedef {Object} ExtendableEvent
 * @property {(promise: Promise) => any} waitUntil
 */

/**
 * @typedef {Object} FetchEvent
 * @property {Request} request
 * @property {(promise: Promise) => any} respondWith
 */

const CACHE = "cache"

const VERSION = "$$version"

const ARCHIVOS = []

// @ts-ignore
addEventListener("install", installListener)
// @ts-ignore
addEventListener("fetch", fetchListener)
addEventListener("activate", () => console.log("Service Worker activo."))

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