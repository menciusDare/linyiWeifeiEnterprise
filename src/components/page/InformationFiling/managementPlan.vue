// 管理计划详情页 企业基本信息 产品生产情况 危险废物生产情况。。。。
<template>
  <div class="main">
    <div class="main-top">
      <div class="breadcrumb">
        <a href=" ">申报登记 ></a><a href="#">管理计划申报 ></a
        ><a href="#" class="selected" v-if="view == 1">详情</a>
        <a href="#" class="selected" v-if="view == 2">编辑</a>
      </div>
    </div>
    <FillingTab
      @select="handleSelectTab"
      :fillTab="fillTab"
      :selected="selected"
      :recordYear="recordYear"
    ></FillingTab>
    <div>
      <EnterpriseInform
        v-if="selected === 'enterpriseInform'"
      ></EnterpriseInform>
      <ProductionSituation
        v-if="selected === 'productionSituation'"
      ></ProductionSituation>
      <WasteProduction v-if="selected === 'wasteProduction'"></WasteProduction>
      <WasteReduction v-if="selected === 'wasteReduction'"> </WasteReduction>
      <WasteTransfer v-if="selected === 'wasteTransfer'"> </WasteTransfer>
      <SelfDisposal v-if="selected === 'selfDisposal'"></SelfDisposal>
      <EnvironmentalTesting v-if="selected === 'environmentalTesting'">
      </EnvironmentalTesting>
      <EntrustedProcessing v-if="selected === 'entrustedProcessing'">
      </EntrustedProcessing>
      <PlanReview v-if="selected === 'planReview'"> </PlanReview>
    </div>
  </div>
</template>
<script>
import FillingTab from "./components/FillingTab";
import EnterpriseInform from "./components/EnterpriseInform";
import ProductionSituation from "./components/ProductionSituation";
import WasteProduction from "./components/WasteProduction";
import WasteReduction from "./components/WasteReduction";
import WasteTransfer from "./components/WasteTransfer";
import EnvironmentalTesting from "./components/EnvironmentalTesting";
import SelfDisposal from "./components/SelfDisposal";
import EntrustedProcessing from "./components/EntrustedProcessing";
import PlanReview from "./components/PlanReview";
export default {
  data() {
    return {
      view:'',
      recordYear: "",
      fillTab: [
        // {
        //   id: "enterpriseInform",
        //   name: "企业基本信息",
        //   state: false,
        // },
        // {
        //   id: "productionSituation",
        //   name: "产品生产情况",
        //   state: true,
        // },
        // {
        //   id: "wasteProduction",
        //   name: "危险废物生产情况",
        //   state: true,
        // },
        // {
        //   id: "wasteReduction",
        //   name: "危险废物减量化计划",
        //   state: false,
        // },
        // {
        //   id: "wasteTransfer",
        //   name: "危险废物转移情况",
        //   state: true,
        // },
        // {
        //   id: "selfDisposal",
        //   name: "危险废物自行利用处置情况",
        //   state: true,
        // },
        // {
        //   id: "entrustedProcessing",
        //   name: "危险废物委托利用处置情况",
        //   state: true,
        // },
        // {
        //   id: "environmentalTesting",
        //   name: "环境监测状况",
        //   state: true,
        // },
        // {
        //   id: "planReview",
        //   name: "上年度管理计划回顾",
        //   state: true,
        // },
      ],
      selected: "enterpriseInform",
    };
  },
  components: {
    FillingTab,
    EnterpriseInform,
    ProductionSituation,
    WasteProduction,
    WasteReduction,
    WasteTransfer,
    EnvironmentalTesting,
    SelfDisposal,
    EntrustedProcessing,
    PlanReview,
  },
  created() {
    const id = this.$route.params.id;
    this.selected = id;
    this.recordYear = this.$route.query.year;
    this.view = this.$route.query.view;
    this.getManangementState();
  },
  methods: {
    handleSelectTab(key) {
      this.selected = key.id;
    },
    getManangementState() {
      let self = this;
      self.$axios
        .get("/api/regulatory/ReportAndRegister/getManagementState")
        .then((res) => {
          if (res.code == 0 && res.data != null) {
            if (res.data != null && res.data.length > 0) {
              for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].year == this.recordYear) {
                  self.fillTab = res.data[i].listItem;
                }
              }
            }
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },

  mounted() {
    // 改变当前路由组件参数数据时, 不会重新创建组件对象, mounted不会重新执行
  },
};
</script>
