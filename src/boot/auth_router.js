import {LocalStorage} from "quasar";
export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    let token = LocalStorage.getItem("userInfo") || '';
    if (!token && to.path!=='/login' && to.path!=='/register') {
      next('/login');
    }else {
      next()
    }
    if (token && to.path === '/login') {
      next('/');
    }
  });
}
