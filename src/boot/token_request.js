import { LocalStorage } from 'quasar'
import axios from 'axios'
let $http = axios.create({
  baseURL: 'http://localhost:3000/'
});
let token = LocalStorage.getItem("userInfo");
if (token) {
  $http.defaults.headers.common['Authorization'] = `Bearer ${token.access_token}`;
}
export default $http;
