<template>
  <div>
    <div class="header">
      <van-button @click="goPage('/login')" type="info" round>登录</van-button>
      <van-button @click="goPage('/lottery')" type="info" round>抽奖活动</van-button>
      <van-button type="info" round>公告</van-button>
    </div>
    <van-tabs  @click="onClick">
      <van-tab title="仙界" ></van-tab>
      <van-tab title="冥界" ></van-tab>
      <van-tab title="魔界" ></van-tab>
    </van-tabs>
    <div class="main">
      <div class="left">
          <ul>
            <li v-for="(item,index) in listData" :key="index">
                <span @click="spanShow(index)">{{item.mapName}}</span><span><input type="text" v-model="item.masterName" ></span><span><button type="button" @click="saveBtn1()">保存</button></span>
            </li>
          </ul>
      </div>
      <div class="right">
          <ul>
            <li v-for="(item,index) in listDataRight" :key="index">
                <span>{{item.placeName}}</span><span><input type="text" v-model="item.userName"/></span><span><button type="button" @click="saveBtn()">保存</button></span>
            </li>
            <li class="clearBtn"><button type="button" @click="clearBtn">一键清除</button></li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        active:"1",
        cid:1,
        listData:[],
        close:false,
        listDataRight:[],
        nCid:"MAP1",
        close:false
    };
  },
  created() {
    this.getInfo();
    this.getInfoRight();
  },
  methods: {
    goPage(url){
      this.$router.push(url)
    },
    getInfo() {
      this.$request(this.$config.baseApi + `/game/worldList?worldId=W${this.cid}`).then(
        (res) => {
          console.log(res);
          this.listData=res;
        }
      );
    },
    getInfoRight(){
        this.$request(this.$config.baseApi + `/game/mapList?mapId=${this.nCid}`).then(
            (res)=>{
                console.log(res);
                this.listDataRight=res;
            }
        )
    },
    onClick(name,title){
        console.log(name,title);
        this.listDataRight=[];
        this.cid=name+1;
        this.getInfo();
    },
    spanShow(index){
        this.nCid=this.listData[index].mapId;
        console.log(this.nCid)
        this.getInfoRight();
    },
    clearBtn(){
        this.$request(this.$config.baseApi + `/game/emptyMapPlaceUserName?mapId=${this.nCid}`).then((res)=>{
                console.log(res);
        })
    }
  }
};
</script>
<style>
.van-button {
  margin-left: 7px;
}
.van-button--normal {
  font-size: 16px;
}
</style>
<style scoped>
.clearBtn{
    width:100%;
    text-align: center;
}
.header {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  background: #ffffff;
}
.main {
  width: 100%;
  background: #ffffff;
  display: flex;
  justify-content: space-between;
}
.left {
  width: 50%;
}
.left ul{
    width:100%;
}
.left ul li{
    width:100%;
    padding-top:5px;
}
.left ul li span:nth-child(1),.left ul li span:nth-child(2){
    display: inline-block;
    width:40%;
    font-size:30%;
}
.left ul li span:nth-child(2) input{
    width:100%;
}
.left ul li span:nth-child(3){
    display: inline-block;
    width:14%;
    
}
.left ul li span:nth-child(3) button{
    padding:0;
    width:100%;
    font-size:9%;
}
.right {
  width: 50%;
}
.right ul{
    width:100%;
}
.right ul li{
    width:100%;
    padding-top:5px;
}
.right ul li span:nth-child(1),.right ul li span:nth-child(2){
    display: inline-block;
    width:40%;
    font-size:30%;
}
.right ul li span:nth-child(2) input{
    width:100%;
}
.right ul li span:nth-child(3){
    display: inline-block;
    width:14%;
    
}
.right ul li span:nth-child(3) button{
    padding:0;
    width:100%;
    font-size:9%;
}
</style>>

