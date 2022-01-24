import { registerRoute } from 'workbox-routing'
import { CacheFirst, NetworkFirst } from 'workbox-strategies'
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'

declare let self: ServiceWorkerGlobalScope

cleanupOutdatedCaches()

precacheAndRoute(self.__WB_MANIFEST)

registerRoute(
  `${import.meta.env.VITE_API_BASE}/deaths.json`,
  new NetworkFirst()
)
registerRoute(`${import.meta.env.VITE_GOOGLE_FONT}`, new CacheFirst())
