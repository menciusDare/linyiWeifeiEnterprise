<template>
  <!-- 主体 -->
  <div class="main">
    <div class="main-top">
      <div class="breadcrumb">
        <a href="#">
          <i class="icon icon-jianguan"></i>企业监管
        </a>
        <span class="sep">&gt;</span>
        <span class="text-primary">贮存设施监控</span>
      </div>
    </div>

    <div style="height: 670px;">
      <el-tabs
        :tab-position="tabPosition"
        :stretch="true"
        v-model="productionName"
        @tab-click="groupClick"
      >
        <el-tab-pane
          v-for="item in containeGroupDataList"
          :key="item.name"
          :label="item.name"
          :name="item.name"
        ></el-tab-pane>
      </el-tabs>
      <div style="height: 600px;overflow: auto">
        <table class="table-default table-full" style=" color: #222;">
          <thead>
            <tr>
              <th style="text-align:center;width: 6%">序号</th>
              <th style="text-align:center;width: 20%">危废名称</th>
              <th style="text-align:center;width: 10%">危废类别</th>
              <th style="text-align:center;width: 20%">危废编码</th>
              <th style="text-align:center;width: 15%">存量(KG)</th>
              <!--  <th style="text-align:center;width: 15%">贮存能力(%)</th>-->
              <th style="text-align:center;width: 15%">最久已贮存时(天)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in containeGroupItemDataList.containeInfoList">
              <td
                style="text-align:center;width: 6%"
                v-if="item.dictDetailName!=null && item.dictDetailCode!=null"
              >{{(cur_page-1)*pageSize+index+1}}</td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 20%"
                v-if="item.dictDetailName!=null && item.dictDetailCode!=null"
                :title="item.dictDetailName"
              >{{item.dictDetailName}}</td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                v-if="item.dictDetailName!=null && item.dictDetailCode!=null"
                :title="item.typeName"
              >{{item.typeName}}</td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 20%"
                v-if="item.dictDetailName!=null && item.dictDetailCode!=null"
                :title="item.dictDetailCode"
              >{{item.dictDetailCode}}</td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                v-if="item.dictDetailName!=null && item.dictDetailCode!=null"
                :title="item.currentAmount"
              >
                <span v-if="item.currentAmount!=null">{{item.currentAmount}}</span>
              </td>
              <!--     <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%" v-if="item.dictDetailName!=null && item.dictDetailCode!=null" :title="item.storageAbility">
                                    <el-progress v-if="item.storageAbility!=null" :text-inside="true" :stroke-width="26" :percentage="item.storageAbility"></el-progress>
              </td>-->
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                v-if="item.dictDetailName!=null && item.dictDetailCode!=null"
                :title="item.storageDay"
              >{{item.storageDay}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "storageFacilityMonitoring",
  data() {
    return {
      isDisabled: false,
      dialogVisible: false,
      total: 0,
      totalPage: 0,
      cur_page: 1,
      pageSizes: this.AppConfig.appInfo.pageSizes,
      pageSize: this.AppConfig.appInfo.pageSize,
      regionCode: sessionStorage.getItem("regionCode"),
      regionLevel: this.AppConfig.appInfo.regionLevel,
      parentCode: this.AppConfig.appInfo.parentCode,
      regionName: this.AppConfig.appInfo.regionName,
      entTypeOptions: [
        {
          value: "",
          label: "全部企业",
        },
        {
          value: "1",
          label: "重点企业",
        },
        {
          value: "2",
          label: "一般企业",
        },
        { value: 3, label: "收集企业" },
        { value: 4, label: "经营企业" },
      ],
      warningOptions: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "1",
          label: "企业连续5天未更新企业台账",
        },
        {
          value: "2",
          label: "企业储藏设施变动异常",
        },
        {
          value: "3",
          label: "企业危费储存即将超时",
        },
      ],
      standardSituationOptions: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "1",
          label: "达标",
        },
        {
          value: "2",
          label: "基本达标",
        },
        {
          value: "3",
          label: "不达标",
        },
      ],
      storageStatusStrOptions: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "1",
          label: "正常",
        },
        {
          value: "2",
          label: "有超期",
        },
        {
          value: "3",
          label: "储量预警",
        },
      ],
      search: {
        regionCode: sessionStorage.getItem("regionCode"),
        entType: "",
        standardSituation: "",
        entName: "",
        regionName: this.AppConfig.appInfo.regionName,
        regionLevel: sessionStorage.getItem("regionLevel"),
        regionParentCode: "",
        endTime: "",
        startime: "",
        warningType: "",
        timeValue: "",
        storageStatusStr: "",
      },
      dataList: [],
      productionName: "",
      count: {
        all: 0,
        one: 0,
        two: 1,
        three: 0,
      },
      regionOptions: [],
      tabPosition: "top",
      containeGroupDataList: [],
      containeGroupItemDataList: [],
      entName: "",
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo(){
      let self = this;
      self.$axios
        .get("/api/regulatory/tVideocamera/getEntIdAndCompanyName")
        .then((res) => {
          if (res.code == 0 && res.data != null) {           
              var entId =res.data.id;
              var entName =res.data.name;
              // self.regionName=res.data.name         
            this.lookInfo(entId,entName);
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.pageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.cur_page = 1;
      this.pageList();
    },
    handleCurrentChange(val) {
      this.cur_page = val;
      this.pageList();
    },
    getIndex(index) {
      let curPage = this.cur_page;
      let limitPage = this.pageSize;
      return index + 1 + (curPage - 1) * limitPage;
    },
    timeChange() {
      var timeValueArr = this.search.timeValue;
      if (timeValueArr != null) {
        this.search.startime = timeValueArr[0];
        this.search.endTime = timeValueArr[1];
      } else {
        this.search.startime = "";
        this.search.endTime = "";
      }
    },
    getRegionChildrenList() {
      var _this = this;
      _this.$axios
        .get("/api/regulatory/regionInfo/getRegionChildrenList", {
          params: {
            regionCode: _this.regionCode,
          },
        })
        .then(function (res) {
          if (res.code == 0) {
            _this.regionOptions = res.data;
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          console.log(error);
        });
    },
    searchEntEarlyWarn() {
      this.selectStorageFacilitiesCountEnt();
      this.pageList();
    },
    selectStorageFacilitiesCountEnt() {
      var _this = this;
      var params = new URLSearchParams();
      params.append("page", _this.cur_page);
      params.append("limit", _this.pageSize);
      params.append("regionCode", _this.search.regionCode);
      params.append("entType", _this.search.entType);
      params.append("storageStatusStr", _this.search.storageStatusStr);
      params.append("entName", _this.search.entName);
      _this.$axios
        .get("/api/regulatory/index/selectStorageFacilitiesCountEnt", {
          params,
        })
        .then(function (res) {
          if (res.code == 0) {
            let data = res.data;
            // _this.count.all = data.all;
            // _this.count.one = data.one;
            //_this.count.two = data.two;
            //_this.count.three = data.three;
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          console.log(error);
        });
    },
    pageList() {
      var _this = this;
      var params = new URLSearchParams();
      params.append("page", _this.cur_page);
      params.append("limit", _this.pageSize);
      params.append("regionCode", _this.search.regionCode);
      params.append("entType", _this.search.entType);
      params.append("storageStatusStr", _this.search.storageStatusStr);
      params.append("entName", _this.search.entName);
      _this.$axios
        .get("/api/regulatory/index/selectStorageFacilitiesList", { params })
        .then(function (res) {
          if (res.code == 0) {
            _this.dataList = res.data.records;
            _this.totalPage = res.data.pages;
            _this.total = res.data.total;
            _this.count.all = res.data.all;
            _this.count.one = res.data.one;
            _this.count.two = res.data.two;
            _this.count.three = res.data.three;
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          console.log(error);
        });
    },
    searchRegionChange() {
      let regionInfo = this.$refs.regionElCascader.getCheckedNodes();
      if (regionInfo.length > 0) {
        this.search.regionName = regionInfo[0].label;
        this.search.regionLevel = regionInfo[0].level + 1;
        this.search.regionCode = regionInfo[0].value;
        let parentRegionInfo = regionInfo[0].parent;
        if (parentRegionInfo != null) {
          this.search.regionParentCode = parentRegionInfo.value;
        } else {
          this.search.regionName = this.regionName;
          this.search.regionLevel = this.regionLevel;
          this.search.regionCode = this.regionCode;
          this.search.regionParentCode = this.parentCode;
        }
      } else {
        this.search.regionName = this.regionName;
        this.search.regionLevel = this.regionLevel;
        this.search.regionCode = this.regionCode;
        this.search.regionParentCode = this.parentCode;
      }
      /*console.log(this.search.regionCode+"<<<当前省/市/区");*/
    },
    lookInfo(entId, entName) {
      this.entName = entName;
      this.getEntContaineGroup(entId);
    },
    getEntContaineGroup(entId) {
      var _this = this;
      _this.$axios
        .get("/api/regulatory/index/getEntContaineGroup/" + entId)
        .then(function (res) {
          if (res.code == 0) {
            _this.containeGroupDataList = res.data;
            if (res.data != null && res.data.length > 0) {
              _this.productionName = _this.containeGroupDataList[0].name;
              _this.containeGroupItemDataList = _this.containeGroupDataList[0];
            } else {
              _this.containeGroupItemDataList = [];
            }
          }
          _this.dialogVisible = true;
        })
        .catch((error) => {
          // catch 指请求出错的处理
          console.log(error);
        });
    },
    groupClick(tab, event) {
      this.containeGroupItemDataList = this.containeGroupDataList[tab.index];
    },
    dialogVisibleClose() {
      this.productionName = "";
      this.dialogVisible = false;
      this.containeGroupItemDataList = [];
    },
    formatStorageScale(value) {
      return value + "%";
    },
  },
};
</script>

<style>
.el-progress-bar__innerText {
  display: inline-block;
  vertical-align: middle;
  color: #303133;
  font-size: 12px;
  margin: 0 5px;
}
.filter-more {
  padding: 20px 0px 0 20px;
}
</style>
