/* 企业基本信息备案上部切换部分 */
<template>
  <div class="fillingTab boxShadow boxSizing">
    <div class="back"><span @click="routerBack">返回</span></div>
    <div class="tabMain">
      <div
        v-for="(item, index) in fillTab"
        :key="index"
        class="tabMainItem"
        :class="item.id == selected ? 'selected' : ''"
        @click="handleSelect(item)"
      >
        <div>{{ item.name }}</div>
        <i class="el-icon-success" v-if="item.state"></i>
        <div class="stateFalse" v-else>未填写</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    fillTab: Array,
    select: Function,
    selected: String,
    recordYear: String,
  },
  methods: {
    handleSelect(item) {
      // console.log('handleSelectTab item:', item);
      // this.select(item.id);
      this.$emit('select', item)
    },
    routerBack() {
        this.$router.push(
        `/applicationRegistration/?year=${this.recordYear}`
      );
    },
  },
};
</script>
<style>
/* 切换样式 */
.fillingTab {
  width: 100%;
  padding: 11px 19px;
  border-radius: 2px;
  display: flex;
  align-items: center;
}
.back {
  width: 8%;
  text-align: center;
}
.fillingTab .tabMain {
  width: 92%;
  border-left: 1px solid rgba(151, 151, 151, 0.2);
  display: flex;
  flex-wrap: wrap;
}
.fillingTab .tabMainItem {
  border: 1px solid rgba(151, 151, 151, 0.46);
  padding: 0 10px;
  line-height: 36px;
  border-radius: 2px;
  margin-left: 14px;
  margin-bottom: 9px;
  cursor: pointer;
  display: flex;
  align-items: center;
  background: #fff;
}
.fillingTab .tabMainItem:hover {
  background: #d8d8d8;
  transition: all 0.2s;
}
.fillingTab .tabMain .stateFalse {
  line-height: 16px;
  height: 16px;
  padding: 0 5px;
  text-align: center;
  background: #fa6400;
  border-radius: 8px;
  font-size: 10px;
  color: #fff;
  margin-left: 3px;
}
.fillingTab .tabMainItem.selected {
  background-color: rgba(216, 216, 216, 0.46);
}
.fillingTab .el-icon-success {
  margin-left: 7px;
  color: #6dd400;
}
</style>
