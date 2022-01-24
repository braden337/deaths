import { registerRoute } from 'workbox-routing'
import { CacheFirst, NetworkFirst } from 'workbox-strategies'
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'

declare let self: ServiceWorkerGlobalScope

cleanupOutdatedCaches()

precacheAndRoute(self.__WB_MANIFEST)

registerRoute('https://live.railingcorners.com/deaths.json', new NetworkFirst())
registerRoute(
  'https://fonts.googleapis.com/css2?family=Source+Code+Pro&family=Source+Sans+Pro:wght@400;700&display=swap',
  new CacheFirst()
)
