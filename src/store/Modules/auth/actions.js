let timer;
export default{
  async login(context,payload){
  return context.dispatch('auth',{
    ...payload ,
    mode:'login'
  })       
  },
  async signup(context,payload){
    return context.dispatch('auth',{
      ...payload ,
      mode:'signup'
    })
           
  },
 async auth(context,payload){
    const mode = payload.mode;
    let url =`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_firebaseAPIKey}`
    if(mode === 'signup'){
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_firebaseAPIKey}`;
    }
      const response =  await fetch(url,{
      method:'POST',
      body:JSON.stringify({
        email:payload.email,
        password:payload.password,
        returnSecureToken: true,
      })
    });
  
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to authenticate. Check your login data.'
      );
      throw error;
    }
     const expiresIn = +responseData.expiresIn * 1000;
    // const expiresIn = 5000;
    const experationDate= new Date().getTime()+ expiresIn ;
    localStorage.setItem('token',responseData.idToken);
    localStorage.setItem('userId',responseData.localId);
    localStorage.setItem('tokenExpiration',experationDate)
    //if token expires logout 
   timer = setTimeout(()=>{
    context.dispatch('autoLogut')
   },expiresIn);
    context.commit('setUser',{ token:responseData.idToken ,userId : responseData.localId,
    });
    
   
  },
  autoLogin(context){
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const  expiresIn = +tokenExpiration - new Date().getTime();
    if(expiresIn< 0){
      // if less than zero token expires no need to continue
      return;
    }
    timer = setTimeout(()=>{
       context.dispatch('autoLogut') 
    },expiresIn)
    if(token && userId){
      context.commit('setUser',{
        token :token,
        userId : userId,
       
      })
    }
  },
  logout(context){
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration')
    context.commit('setUser',{
      token : null,
      userId : null,

    })
    // clear timeout
    clearTimeout(timer)
  
  },
  autoLogut(context){
    context.dispatch('logout');
    context.dispatch('setAutoLogout')
  }
}