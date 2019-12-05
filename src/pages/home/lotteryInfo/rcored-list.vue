<template>
  <div>
      <div></div>
      <div>
          <ul>
              <li>
                  <span>1</span><span>1</span>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            infoItem:[],
        }
    },
    create(){
        this.getInfo();
    },
    methods:{
        getInfo(){
            this.$request(this.$config.baseApi+`/game/getLotteryLog`).then((res)=>{
                console.log(res);
            })
        }
    }
}
</script>

<style>

</style>