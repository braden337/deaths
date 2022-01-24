import App from './App.svelte'
import { registerSW } from 'virtual:pwa-register'

document.head
  .append(`<link rel="preconnect" href="https://fonts.googleapis.com"> 
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> 
<link href="${import.meta.env.VITE_GOOGLE_FONT}" rel="stylesheet">`)

if ('serviceWorker' in navigator) {
  // && !/localhost/.test(window.location)) {
  registerSW()
}

const app = new App({
  target: document.getElementById('app'),
})

export default app
