import { registerRoute } from 'workbox-routing'
import { NetworkFirst } from 'workbox-strategies'
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'

declare let self: ServiceWorkerGlobalScope

cleanupOutdatedCaches()

precacheAndRoute(self.__WB_MANIFEST)

registerRoute('https://live.railingcorners.com/deaths.json', new NetworkFirst())
