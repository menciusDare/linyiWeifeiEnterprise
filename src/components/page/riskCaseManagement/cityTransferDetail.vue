<template>
  <div class="main">
    <div class="main-top">
      <div class="breadcrumb">
        <i class="icon icon-wuliandan"></i
        ><span class="sep"></span>转移联单<span class="sep">&gt;</span
        ><a href="#/cityFiveLinkedList">市内转移联单查询</a
        ><span class="sep">&gt;</span><span class="text-primary">详情</span>
      </div>
    </div>
    <div class="panel">
      <div class="panel-top">
        <div class="top-text">
          <el-link @click="goBack"><i class="icon icon-fanhui"></i>返回</el-link
          ><span class="line"></span>五联单编号：<span class="text-default">{{
            linkedId
          }}</span>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <el-button
            size="mini"
            style="background-color: rgb(56, 158, 13); color: #fff"
            disabled
            >{{ filterStatus(detailObj.status) }}</el-button
          >
        </div>
      </div>
      <div class="panel-bd">
        <div class="step-box step04">
          <ol class="step-list">
            <li class="is-active">
              <div class="step-time">
                <span class="step-text">申请转移</span>
                <span class="time-tit">计划转移时间</span>
                <span class="time-text">{{
                  formatterDate(
                    detailObj.plannedTransferTime,
                    "yyyy-MM-dd hh:mm:ss"
                  )
                }}</span>
              </div>
              <div class="step-icon">
                <span class="step-num"><i class="icon icon-wancheng"></i></span>
                <div class="step-line"></div>
              </div>
              <div class="qiye-wf">
                <div class="qiye-hd">
                  <div class="qiye-logo">
                    <img :src="headImg1" class="logo-sub" />
                  </div>
                  <div class="qiye-title">
                    <h2>{{ detailObj.outEntName }}</h2>
                    <div class="qiye-text">
                      <span class="label-text label01">产废企业</span>
                    </div>
                  </div>
                </div>

                <div class="qiye-bd">
                  <div class="row-tip1">
                    <el-row
                      type="flex"
                      class="content-bottom"
                      justify="space-around"
                    >
                      <el-col>危废名称：{{ detailObj.name }}</el-col>
                      <el-col>危废类别：{{ detailObj.typeName }}</el-col>
                      <el-col>危废代码：<span v-if="detailObj.dictDetailCode">{{ detailObj.dictDetailCode.split('#')[0] }}</span></el-col>
                    </el-row>
                    <el-row
                      type="flex"
                      class="content-bottom"
                      justify="space-around"
                    >
                      <el-col>申请数量：<span v-if="detailObj.number">{{ detailObj.number }}kg</span></el-col>
                      <el-col>包装方式：{{ detailObj.packMethod }}</el-col>
                      <el-col></el-col>
                    </el-row>
                  </div>
                  <div class="line-lgs"></div>
                  <div class="row-tip2">
                    <el-row>
                      <el-col class="content-bottom"
                        >经办人：{{ detailObj.outEntLinkName }}</el-col
                      >
                      <el-col class="content-bottom"
                        >联系电话：{{ detailObj.outEntLinkPhone }}</el-col
                      >
                    </el-row>
                  </div>
                </div>
              </div>
            </li>
            <li
              class="is-active"
              v-if="[2,4,6].includes(detailObj.status)"
            >
              <div class="step-time">
                <span class="step-text">转移中</span>
                <span class="time-tit">实际收集时间</span>
                <span class="time-text">{{
                  formatterDate(
                    detailObj.transportationTime,
                    "yyyy-MM-dd hh:mm:ss"
                  )
                }}</span>
              </div>
              <div class="step-icon">
                <span class="step-num"><i class="icon icon-wancheng"></i></span>
                <div class="step-line"></div>
              </div>
              <div class="qiye-wf">
                <div class="qiye-hd">
                  <div class="qiye-logo">
                    <img :src="headImg1" class="logo-sub" />
                  </div>
                  <div class="qiye-title">
                    <h2>{{ detailObj.transEntName }}</h2>
                    <div class="qiye-text">
                      <span class="label-text label01">转运企业</span>
                    </div>
                  </div>
                </div>
                <div class="qiye-bd">
                  <div class="row-tip1">
                    <el-row
                      type="flex"
                      class="content-bottom"
                      justify="space-around"
                    >
                      <el-col>车辆型号：{{ detailObj.vehicleModel }}</el-col>
                      <el-col>车牌号：{{ detailObj.carNo }}</el-col>
                      <el-col>准运种类：{{ detailObj.transportationType }}</el-col>
                    </el-row>
                    <el-row
                      type="flex"
                      class="content-bottom"
                      justify="space-around"
                    >
                      <el-col>有效荷载：{{ detailObj.effectiveLoad }}</el-col>
                      <el-col>实际收集数量：<span v-if="detailObj.actualAmount">{{ detailObj.actualAmount }}kg</span></el-col>
                      <el-col></el-col>
                    </el-row>
                  </div>
                  <div class="line-lgs"></div>
                  <div class="row-tip2">
                    <el-row>
                      <el-col class="content-bottom"
                        >经办人：{{ detailObj.transEntLinkName }}</el-col
                      >
                      <el-col class="content-bottom"
                        >联系电话：{{ detailObj.transEntLinkPhone }}</el-col
                      >
                    </el-row>
                  </div>
                </div>
              </div>
            </li>
            <li class="is-active">
              <div class="step-time">
                <span class="step-text">危废接收</span>
                <span class="time-tit">实际接收时间</span>
                <span class="time-text">{{
                  formatterDate(detailObj.completionTime, "yyyy-MM-dd hh:mm:ss")
                }}</span>
              </div>
              <div class="step-icon">
                <span class="step-num"><i class="icon icon-wancheng"></i></span>
                <div class="step-line"></div>
              </div>
              <div class="qiye-wf">
                <div class="qiye-hd">
                  <div class="qiye-logo">
                    <img :src="headImg1" class="logo-sub" />
                  </div>
                  <div class="qiye-title">
                    <h2>{{ detailObj.acceptEntName }}</h2>
                    <div class="qiye-text">
                      <span class="label-text label02">接收企业</span>
                    </div>
                  </div>
                </div>
                <div class="qiye-bd">
                   <div class="row-tip1">
                    <el-row
                      type="flex"
                      class="content-bottom"
                      justify="space-around"
                    >
                      <el-col>接收数量：<span v-if="detailObj.acceptAmount">{{ detailObj.acceptAmount }}kg</span></el-col>
                      <el-col>危废经营许可证编号：{{ detailObj.licenceNo }}</el-col>
                    </el-row>
                    <el-row
                      type="flex"
                      class="content-bottom"
                      justify="space-around"
                    >
                      <el-col>处理方式：{{ detailObj.disposalMethod }}</el-col>
                      <el-col></el-col>
                    </el-row>
                  </div>
                  <div class="line-lgs"></div>
                  <div class="row-tip2">
                    <el-row>
                      <el-col class="content-bottom"
                        >经办人：{{ detailObj.acceptEntLinkName }}</el-col
                      >
                      <el-col class="content-bottom"
                        >联系电话：{{ detailObj.acceptEntLinkPhone }}</el-col
                      >
                    </el-row>
                  </div>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cityTransferDetail",
  data() {
    return {
      linkedId: "",
      path: "/api/enterprise/",
      headImg1: "../../../../static/css/images/pic/logo01.png",
      detailObj: {},
    };
  },
  created: function () {
    this.linkedId = this.$route.query && this.$route.query.linkedId;
    this.detailData();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    detailData() {
      let url =
        this.path +
        `/tFiveLinked/getTransferLinkedInfo?linkedId=${this.linkedId}`;
      this.$axios.get(url).then((response) => {
        if (response.code == 0) {
          this.detailObj = response.data;
        }
      });
    },
    formatterDate(value, str) {
      if (value != null) {
        let val = new Date(value).format(str);
        return val;
      } else {
        return "--";
      }
    },
    filterStatus(status) {
      switch (status) {
        case 2:
          return "待经营签收";
        case 4:
          return "已签收";
        case 5:
          return "待经营确认";
        case 6:
          return "待运输出厂";
        case 7:
          return "已作废";
      }
    },
  },
};
</script>

<style>
.qiye-bds {
  background-color: #fff;
  padding: 20px;
}
.row-tip1 {
  width: 70%;
}
.content-bottom {
  margin-bottom: 10px;
}
.row-tips {
  width: 30%;
}
.line-lgs {
  height: 48px;
  width: 1px;
  border-left: 1px solid rgba(204, 204, 204, 0.4);
  display: inline-block;
  vertical-align: top;
  margin: 3px 3% 0;
}
.subClass-name {
  display: inline-block;
  height: 30px;
  padding: 5px;
  background-color: red;
}
.text-state.state-off1 {
  background-color: #ffd306;
}
.text-state.state-off2 {
  background-color: #ff7575;
}
.text-state.state-off3 {
  background-color: #bbffbb;
}
</style>
