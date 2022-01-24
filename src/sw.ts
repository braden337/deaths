import { registerRoute } from 'workbox-routing'
import { CacheFirst } from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'

declare let self: ServiceWorkerGlobalScope

cleanupOutdatedCaches()

precacheAndRoute(self.__WB_MANIFEST)

registerRoute(
  'https://live.railingcorners.com/deaths.json',
  new CacheFirst({
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  })
)
