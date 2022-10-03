import {defineAsyncComponent} from'vue'
import { createRouter,createWebHistory} from 'vue-router'
import CoachesList from './pages/coaches/CoachesList.vue'
// import CoachDetails from './pages/coaches/CoachDetails.vue'
// import CoachRegistration from './pages/coaches/CoachRegistration.vue'
// import ContactCoach from './pages/requests/ContactCoach.vue'
// import RequestRecived from './pages/requests/RequestRecived.vue'
// import  NotFound from './pages/NotFound.vue'
// import UserAuth from './pages/auth/UserAuth.vue'
import store from'./store/index.js';

const CoachDetails = defineAsyncComponent(()=> import(
  './pages/coaches/CoachDetails.vue'
))
const CoachRegistration = defineAsyncComponent(()=> import(
  './pages/coaches/CoachRegistration.vue'
))
const ContactCoach=defineAsyncComponent(()=> import(
  './pages/requests/ContactCoach.vue'
))
const RequestRecived = defineAsyncComponent(()=> import(
  './pages/requests/RequestRecived.vue'))
const UserAuth = defineAsyncComponent(()=> import(
  './pages/auth/UserAuth.vue'
))
const NotFound = defineAsyncComponent(()=> import(
'./pages/NotFound.vue'
))

const router = createRouter({
  history:createWebHistory(),
  routes:[
    {path:'/',  redirect:'/coaches'

  },
    {path:'/coaches',component:CoachesList

    },
    {path:'/coaches/:id',component: CoachDetails,
    props:true,
    children:[
      {
        path:'contact',component:ContactCoach
      }
    ]

    },
    {path:'/register',component:CoachRegistration,meta:{
      requiredsAuth:true
    }

    },
    {path:'/requests',component:RequestRecived,meta:{
      requiredsAuth:true
    }

  },
  {path:'/auth',component:UserAuth,meta:{
    requiredsUnauth:true
  }},
  {path:'/:notfound(.*)',component:NotFound

  },
  ]
});
router.beforeEach((to,_,next)=>{
 if(to.meta.requiredsAuth && !store.getters.isAuthenticated){
  next('/auth');
 }else if (to.meta.requiredsUnauth &&store.getters.isAuthenticated){
  next('/coaches')
 }else{
  next();
 }
})

export default router;