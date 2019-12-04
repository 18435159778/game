<template>
    <div>
        <router-view></router-view>    
    </div>
</template>

<script>
    export default {
        data(){
            return {
               
            }
        },
        methods:{
            
        },    
        created(){
            
        },
        //消除keep-alive数据缓存
        activated(){
            document.title=this.$route.meta.title
            
        }
    }
</script>

<style scoped>
@import "../../../assets/css/home/main/index.css";
</style>
