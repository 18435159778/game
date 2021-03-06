let modules={
    namespaced:true,
    state:{
        username:localStorage['username']?localStorage['username']:"",
        isLogin:localStorage['isLogin']?Boolean(localStorage['isLogin']):false
    },
    mutations:{
        login(state,payload){
            //state=payload;
            state.username=payload.username;
            state.isLogin=Boolean(payload.isLogin)
            localStorage['username']=payload.username;
            localStorage['isLogin']=payload.isLogin
        },
        outLogin(state){
            state.username="";
            state.isLogin=false;
            localStorage.removeItem("username");
            localStorage.removeItem("isLogin")
        }
    }
};

export default modules;
