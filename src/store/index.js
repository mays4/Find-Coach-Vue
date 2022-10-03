import { createStore } from "vuex";

import coachesModule from './Modules/coaches/index.js'
import requestsModule from './Modules/requests/index.js'
import authModule from './Modules/auth/index'
const store = createStore({
  modules:{
    coaches:coachesModule,
    requests:requestsModule,
    auth:authModule
  },
  // state(){
  //   return{
  //     userId:'c3'
  //   };
  // },
  // getters:{
  //   userId(state){
  //     return state.userId;
  //   }
  // }
})
export default store;