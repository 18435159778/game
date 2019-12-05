<template>
  <div>
    <div class="header">开奖设置</div>
    <div style="width:100%;">
      <div class="oTime">参与时间</div>
      <van-field
        style="text-align:center;font-size:20px;font-weight:bloder;"
        v-model="timeValue"
        placeholder="选择参与日期"
        readonly
        @click="showPopFn()"
      />
      <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
          v-model="currentDate"
          type="datetime"
          @change="changeFn()"
          @confirm="confirmFn()"
          @cancel="cancelFn()"
        />
      </van-popup>
    </div>
    <div style="width:100%;">
      <div class="oTime">开奖时间</div>
      <van-field
        style="text-align:center;font-size:20px;font-weight:bloder;"
        v-model="lotteryValue"
        placeholder="选择开奖日期"
        readonly
        @click="showPopFn1()"
      />
      <van-popup v-model="show1" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
          v-model="currentDate1"
          type="datetime"
          @change="changeFn1()"
          @confirm="confirmFn1()"
          @cancel="cancelFn1()"
        />
      </van-popup>
    </div>
    <div class="oRadio">
      <van-radio-group
        @change="changeRadio(radio)"
        v-model="radio"
        style="display:flex;padding-left:11%;box-szing:boder-box;line-height:1rem;height:1rem;"
      >
        <van-radio style="padding-left:10%;" name="1">ww</van-radio>
        <van-radio style="padding-left:10%;" name="2">aa</van-radio>
        <van-radio style="padding-left:10%;" name="3">cc</van-radio>
      </van-radio-group>
    </div>
    <div style="width:100%;height:300px;overflow:hidden;overflow:auto;">
      <van-checkbox-group v-model="result" @change="change($event)">
        <van-cell-group>
          <van-cell v-for="(item, index) in list" clickable :key="index" :title="`${item.mapName}`">
            <van-checkbox :name="item.mapName" ref="checkboxes" slot="right-icon" />
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </div>
    <div style="width:100%;background:#fff;margin-top:10px;">
      <van-button @click="sureBtn()" style="margin-left:25%;" plain type="primary">确认</van-button>
      <van-button @click="returnBtn()" style="margin-left:20%;" plain type="info">返回</van-button>
    </div>
    <div style="margin-top:10px;background:#fff;">
      <van-button @click="historyBtn()" style="margin-left:35%;" plain type="primary">历史开奖记录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      result: [],
      radio: "",
      msg: "",
      currentDate: new Date(),
      currentDate1: new Date(),
      changeDate: new Date(),
      changeDate1: new Date(),
      show: false, // 用来显示弹出层
      show1: false,
      timeValue: "",
      lotteryValue: ""
    };
  },
  mounted() {
    this.timeFormat(new Date());
  },

  methods: {
    historyBtn(){
      this.$router.push("/recoredlist")
    },
    retuenBtn(){
      this.$router.go(-1);
    },
    sureBtn() {
      // console.log();
      this.$request(this.$config.baseApi + `/game/autoLottery`, "post", {
        inTime: this.timeValue,
        lotteryTime: this.lotteryValue,
        mapIds: this.result
      }).then(res => {
        console.log(res);
        if (res.code == "0000") {
          this.$toast(`${res.msg}`)
        } else if(res.code=='9999') {
          this.$toast(`${res.msg}`)
        }
      });
    },
    change(result) {
      console.log(result);
      this.result = result;
      console.log(this.result);
    },
    //单选框改变内容是
    changeRadio(name) {
      this.$request(
        this.$config.baseApi + `/game/worldList?worldId=W${name}`
      ).then(res => {
        this.list = res;
      });
    },
    //点击显示时间
    showPopFn() {
      this.show = true;
    },
    showPopFn1() {
      this.show1 = true;
    },
    //改变dateTime时间发生变化
    changeFn() {
      this.changeDate = this.currentDate; // Tue Sep 08 2020 00:00:00 GMT+0800 (中国标准时间)
    },
    changeFn1() {
      this.changeDate1 = this.currentDate1; // Tue Sep 08 2020 00:00:00 GMT+0800 (中国标准时间)
    },
    //点击确定按钮
    confirmFn() {
      this.timeValue = this.timeFormat(this.currentDate);
      this.show = false;
    },
    confirmFn1() {
      this.lotteryValue = this.timeFormat(this.currentDate1);
      this.show1 = false;
    },
    //点击取消按钮
    cancelFn() {
      this.show = true;
    },
    cancelFn1() {
      this.show = true;
    },
    //小于10前面加0
    add0(m) {
      return m < 10 ? "0" + m : m;
    },
    //格式化时间
    timeFormat(time) {
      var timeY = time.getFullYear();
      var timeM = time.getMonth() + 1;
      var timeD = time.getDate();
      var timeHours = time.getHours();
      var timeMin = time.getMinutes();
      var timeSen = time.getSeconds();
      var thisDate =
        timeY +
        "-" +
        this.add0(timeM) +
        "-" +
        this.add0(timeD) +
        " " +
        this.add0(timeHours) +
        ":" +
        this.add0(timeMin)+":"+this.add0(timeSen);
      return thisDate;
    }
  }
};
</script>
<style scope>
.van-field__control {
  text-align: center;
}
</style>
<style scope>
.header {
  width: 100%;
  height: 1rem;
  background: blue;
  text-align: center;
  line-height: 1rem;
  color: white;
}
.oTime {
  width: 100%;
  text-align: center;
  height: 0.5rem;
  line-height: 0.5rem;
  background: #66ccff;
  color: white;
}
.oRadio {
  width: 100%;
  height: 1rem;
  background: #eee;
}
</style>