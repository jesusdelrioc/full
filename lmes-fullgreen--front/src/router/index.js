import Vue from 'vue'
import Router from 'vue-router'
import store from "../store/store";
import Tiendas from '@/components/views/Tiendas'
import Secciones from '@/components/views/Secciones'
import Acciones from '@/components/views/Acciones'

const Login = () => import('../components/views/Login');
const Frame = () =>  import('../components/views/Frame.vue');
const Home=()=> import('../components/views/frame/Home');
const NotFound=()=> import('../components/views/NotFound');

Vue.use(Router)

const router=new Router({
  routes: [
    {
      path: '/',
      name: 'Tiendas',
      component: Tiendas
    },
    {
      path: '/tiendas/:id '+' :id1',
      name: 'secciones',
      component: Secciones,
      props: true
    },
    {
      path: '/tiendas/:id '+' :id1/secciones/:id2 '+' :id3',
      name: 'acciones',
      component: Acciones,
      props: true
    },
      {path: '/login', name: 'Login', component: Login},
      {path: '', component: Frame, children:[
        {path: '', name: 'Home', component: Home},
        {path: '/home', redirect: {name: 'Home'}}
      ]}
      ,{path: '*', name: 'NotFound', component: NotFound}
  ],
  //router config
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return {x: 0, y: 0};
  }
})


// router.beforeEach((to, from, next) => {
//   // function to load login
//   const loadLogin=()=>{
//     let login=sessionStorage.getItem("fullgreen_login");
//     let logged=login?JSON.parse(atob(login)).logged:false;
//     if (to.name=="Login") {
//       if (login&&logged) next({name: 'CV'});
//       else next();
//     }
//     else {
//       if (login&&logged) next();
//       else next({name:"Login"});
//     }
//   }

//   // loading config file
//   if (store.state.config){
//     const promiseCfg = async () => {
//       if (store.getters.getConfig==null) {
//         await store.dispatch("loadConfig");
//       } else {
//         await store.getters.getConfig;
//       }
//       loadLogin();
//     };

//     promiseCfg();
//   }
// });

export default router;