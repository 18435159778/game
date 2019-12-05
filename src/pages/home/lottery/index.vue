<template>
<div>
  <van-dropdown-menu>
    <van-dropdown-item @change="change" v-model="value1" :options="option1" />
    <van-dropdown-item @change="change1" v-model="value2" :options="option2" />
    <van-dropdown-item v-model="value3" :options="option3" />
  </van-dropdown-menu>
  <div class="main">
      <div class="main-left">
        <ul>
          <li style="padding-top:3px;overflow:auto;padding-left:1px;box-sizing:border-box;" v-for="
          (item,index) in Participants" :key="index">
            {{item.actorName}} <span style="display:inline-block;float:right"><button @click="clear(index)" type="button">删除</button></span>
          </li>
        </ul>
      </div>

      <div class="main-middle">
        <div>剩余官位{{num}}个</div>
        <div>参与时间<p>{{date}}</p></div>
        <div><button type="button" @click="lotteryBtn()">开奖</button></div>
        <div><button @click="goPage('/Automatic')" type="button">自动开奖</button></div>
      </div>
      <div class="main-right">
        <ul>
          <li v-for="(item,index) in lottery" :key="index">{{item.actorName}}</li>
        </ul>
      </div>
      
  </div>
  <div style="padding-top:10px;">
    <button type="button" @click="clearChange">管理者一键清除</button>
    <button type="button" @click="giveLottey">管理者一键官职</button>
  </div>
  <div style="padding-top:10px;">
    <input type="text" style="border: 1px solid #eee;background:#00ffff;" v-model="name">
    <button type="button" style="margin-left:10px;" @click="ParticipantMap">参与</button>
    <button type="button" style="margin-left:10px;">返回</button>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      name:"",
      Participants:[],
      lottery:[],
      num:"",
      date:'',
      value1: "W1",
      value2: "MAP1",
      value3: 0,
      wordId: "W1",
      mapId: "MAP1",
      option1: [
        { text: "仙界", value: "W1" },
        { text: "冥界", value: "W2" },
        { text: "魔界", value: "W3" }
      ],
      option2: [],
      option3: []
    };
  },
  created() {
    this.init();
    this.initSelect();
    this.dateTime();
    this.Participant();
  },
  methods: {
    //开奖按钮
    lotteryBtn(){
      this.$request(this.$config.baseApi+`/game/bingo?num=${this.num}`).then((res)=>{
        console.log(res);
      })
    },
    goPage(url){
      this.$router.push(url);
    },
    //参与
    ParticipantMap(){
      this.$request(this.$config.baseApi+`/game/addActor?actorName=${this.name}`).then((res)=>{
          console.log(res);
          this.Participant(); 
          this.name="";
      })
    },   
    //管理者一键官职
    giveLottey(){
      this.$request(this.$config.baseApi+`/game/allotPlace?mapId=${this.mapId}`).then((res)=>{
        console.log(res);
      })
    },
    //一键清除
    clearChange(){
      this.$request(this.$config.baseApi+`/game/emptyAllActors`).then((res)=>{
        console.log(res);
      })
    },
    //清除某个参与者名单
    clear(index){
      this.$reqest(this.$config.baseApi+`/game/removeActor?id=${this.Participants[index].id}`).then(()=>{
        this.$toast('删除成功')
        this.Participants();
      })
    },
    //调取参与者接口和中奖的名单
    Participant(){
      this.$request(this.$config.baseApi+`/game/getActors`).then((res)=>{
        console.log(res);
        this.Participants=res.allActors.length?res.allActors:[];
        this.lottery=res.allLotteryActors.length?res.allLotteryActors:[];
        // console.log(this.Participants);
      })
    },
    //参与时间
    dateTime(){
      this.$request(this.$config.baseApi+`/game/getInTime`).then((res)=>{
        console.log(res);
        this.date=res.data;
      })
    },
    //初始化第二个下拉菜单
    init() {
      this.$request(this.$config.baseApi + `/game/worldList?worldId=${this.wordId}`).then(res => {
          this.option2=[];
          if (res.length > 0) {
            for (var i = 0; i < res.length; i++) {
              this.option2.push({
                text: res[i].mapName,
                value: res[i].mapId
              });
            }
          } else {
            this.option2.push({
              text: "空",
              value: 0
            });
            this.value2=0;
          }

          // console.log(this.option2);
      });
    },
    //初始化第三个下拉菜单
    initSelect() {
      this.$request(this.$config.baseApi + `/game/remainPlaces?mapId=${this.mapId}`).then(res => {
        this.option3=[];
        this.num=res.length?res.length:0;
        var a = 0;
        if (res.length > 0) {
          for (var i = 0; i < res.length; i++) {
            this.option3.push({
              text: res[i].placeName,
              value: a++
            });
          }
        } else {
          this.option3.push({
            text: "空",
            value: 0
          });
        }
        // console.log(this.option3)
      });
    },
    //改变1改变第二个下拉菜单
    change(value) {
        console.log(value);
        this.wordId = value;
        this.init();
    },
    //改变2改变第三个下拉菜单的内容
    change1(value) {
        this.mapId = value;
        this.initSelect();
    },
  
  },
  //标题栏的title
  activated() {
    document.title = this.$route.meta.title;
  }
};
</script>

<style scoped>
.main{
    width:100%;
    height:10rem;
    display: flex;
    background:#ff00ff;
    justify-content: space-around;
}
.main-left,.main-right{
  width:30%;
  overflow: auto;
}
.main-left ul li {
  font-size:12px;
}
.main-middle{
  text-align: center;
  width:40%;
  /* background:#00ff00; */
  display:flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>