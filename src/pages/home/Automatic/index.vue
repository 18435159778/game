<template>
  <div>
    <div>开奖设置</div>
    <div>
      参与时间
      <van-datetime-picker type="datetime"/>
    </div>
    <div>
      <van-radio-group v-model="radio" style="display:flex;">
        <van-radio name="1">仙</van-radio>
        <van-radio name="2">冥</van-radio>
        <van-radio name="3">魔</van-radio>
      </van-radio-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "1"
    };
  }
};
</script>

<style>
</style>