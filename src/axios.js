import axios from "axios";

axios.defaults.baseURL = 'https://v-back.herokuapp.com'
// axios.defaults.baseURL = 'http://localhost:4407'
axios.defaults.baseURL = 'https://mapi.monostore.uz'
// axios.defaults.baseURL = 'http://videokurs.uz:5050'

axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
