import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

let router=new Router({
    mode:"history", //1、hash哈希：有#号。2、history历史：没有#号
    base:process.env.BASE_URL,
    //记录滚动的位置解决白屏问题，必须配合keep-alive
    scrollBehavior(to,from,position){
        if(position){
            return position
        }else{
            return {x:0,y:0}
        }
    },
    routes:[
        {
            path:"/",
            name:"main",
            component:()=>import("./pages/home/main/index"),
            redirect:'/index',
            children:[
                {
                path:"/index",
                name:"index",
                component:()=>import("./pages/home/index/index"),
                meta:{title:"首页"}
                },
               
            ]
        },
        {
            path:"/login",
            name:"login",
            component:()=>import("./pages/home/login/index"),
            meta:{title:"登录页面"}
        },
        {
            path:"/lottery",
            name:"lottery",
            component:()=>import("./pages/home/lottery/index"),
            meta:{title:"开奖页面"}
        },
        {
            path:"/Automatic",
            name:"Automatic",
            component:()=>import("./pages/home/Automatic/index"),
            meta:{title:"自动开奖"}
        },
        {
            path:"/recoredlist",
            name:"recoredlist",
            component:()=>import("./pages/home/lotteryInfo/rcored-list.vue"),
            meta:{title:"开奖记录"}
        },
        {
            path:"/recoreditem",
            name:"recoreditem",
            component:()=>import("./pages/home/lotteryInfo/recored-item.vue"),
            meta:{title:"开奖详情"}

        }

        
    ]
});

// router.beforeEach((to,from,next)=>{
//     if(to.meta.auth){
//         if(Boolean(localStorage['isLogin'])){
//             next();
//         }else{
//             next("/login");
//         }
//     }else {
//         next();
//     }
// });

export default router;
