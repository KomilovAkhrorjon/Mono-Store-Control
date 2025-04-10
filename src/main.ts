import {createApp} from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import {Quasar} from 'quasar'
import quasarUserOptions from "./quasar-user-options"
import './style.scss'
import './axios.js'
import './styles.css'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import '@sweetalert2/theme-dark/dark.css';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

createApp(App)
.use(Quasar, quasarUserOptions)
.use(store)
.use(router)
.use(VueSweetalert2)
.mount('#app')
