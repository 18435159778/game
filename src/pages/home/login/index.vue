<template>
    <div class="page">
        <div class="sub-header">登录中心</div>
        <div class='main login-main'>
            <div class='code-wrap' style="margin-top:0px"><input type="text" placeholder="账号" v-model="cellphone" /></div>
            <div class='password-wrap'>
                <div class='password'><input :type="isOpenPwd?'text':'password'" placeholder="密码" v-model="password"/></div>
            </div>
            <div class='sure-btn' @click="login()" >登录</div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            isOpenPwd:false,
            cellphone:"",
            password:"",
            password1:"",

        }
    },
    activated(){
        document.title=this.$route.meta.title
    },
    methods:{
        login(){
            this.password1=this.$md5(this.password)
            this.$request(this.$config.baseApi+`/login?username=${this.cellphone}&password=${this.password1}`).then((res)=>{
                console.log(res);
                if(res){
                    this.$toast('登录成功')
                    setTimeout(()=>{
                        this.$router.push("/index");
                    },2000)
                }else{
                    this.$toast('登录失败')
                }
            })
        }
    }
}
</script>

<style scope>
.sub-header{
    width:100%;height:1rem;background-color:#FFFFFF;border-bottom: 1px solid #EFEFEF;position: fixed;z-index: 10;left:0;top:0;text-align: center;font-size: .38rem; line-height: 1rem;
}
.page{width:100%;height:100vh;background-color: #ffffff;}
    .main{width:100%;padding-top:1.4rem;}
    .cellphone-wrap{width:90%;height:0.84rem;margin:0 auto;display: flex;display: -webkit-flex;justify-content: space-between;-webkit-justify-content: space-between;}
    .cellphone-wrap .cellphone{width:62%;height:100%;border:#EFEFEF solid 1px;border-radius: 2px;}
    .cellphone-wrap .cellphone input,.code-wrap input,.password-wrap .password input{width:92%;height:100%;font-size:0.28rem;padding-left:0.2rem;}
    .cellphone-wrap .code-btn{width:35%;height:0.82rem;background:#EAEAEA;color:#717376;border:#EAEAEA solid 1px;border-radius: 2px;font-size:0.28rem;text-align:center;line-height:0.82rem;}
    .cellphone-wrap .code-btn.success{background:#FFFFFF;border:1px solid #EB1625;color:#EB1625}
    .code-wrap{width:90%;height:0.84rem;margin:0 auto;border-radius: 2px;border:#EFEFEF solid 1px;margin-top:0.4rem;}
    .password-wrap{width:90%;height:0.84rem;margin:0 auto;border-radius: 2px;border:#EFEFEF solid 1px;margin-top:0.4rem;display:flex;display: -webkit-flex;}
    .password-wrap .password{width:80%;height:100%;}
    .password-wrap .switch-wrap{width:20%;margin-top:0.1rem;}
    .sure-btn{width:85%;height:0.8rem;margin:0 auto;background:#EB1625;font-size:0.36rem;color:#FFFFFF;line-height:0.8rem;text-align: center;margin-top:0.4rem;border-radius: 4px;}
    .fastreg-wrap{width:85%;display:flex;display:-webkit-flex;justify-content: space-between;-webkit-justify-content: space-between;font-size:0.24rem;margin:0 auto;margin-top:0.3rem;}
    .fastreg-wrap img{width:0.32rem;height:0.32rem;vertical-align: middle;}
</style>