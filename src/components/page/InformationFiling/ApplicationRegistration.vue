//申报登记
<template>
  <div class="main">
    <div class="main-top">
      <div class="breadcrumb">
        <a href="#"><i class="icon icon-shenbaodengji menu-icon"></i>申报登记</a><span class="sep">&gt;</span><span
              class="text-primary">管理计划申报</span>
      </div>
    </div>
    <div class="planDetail application boxSizing boxShadow rowFlex">
      <div class="rowFlex">
        <span>时间</span>
        <el-select v-model="queryYear" clearable placeholder="请选择">
          <el-option
            v-for="item in yearList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <!-- <div class="rowFlex">
        <span>提交状态</span>
        <el-select v-model="stateValue" clearable placeholder="请选择">
          <el-option
            v-for="item in stataList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div> -->
      <!-- <div class="queryButton" @click="queryButton">查询</div> -->
    </div>
    <div class="boxSizing boxShadow redistrationMain">
      <div
        v-for="(item, index) in dataList"
        :key="index"
        class="rowFlex mainList"
      >
        <div class="time">
          <div class="year">{{ item.year }}</div>
          <div>{{ item.time }}</div>
        </div>
        <div class="centerMain">
          <div class="xian"></div>
          <div v-if="item.state">
            <i class="el-icon-success"></i>
          </div>
          <div v-else>
            <i class="circular"></i>
          </div>
        </div>
        <div class="mianLeft boxSizing">
          <div class="rowFlex state" @click="blockShow(index)">
            <span v-if="item.state">
              <i class="el-icon-warning-outline"></i>
              已填报（{{
                item.listItem.reduce(
                  (pre, item) => pre + (item.state ? 1 : 0),
                  0
                )
              }}/9）审核状态：{{ item.auditStatus==null?"未提交":item.auditStatus }}
            </span>
            <span v-else>
              <i class="el-icon-warning-outline"></i>
              已填报（{{
                item.listItem.reduce(
                  (pre, item) => pre + (item.state ? 1 : 0),
                  0
                )
              }}/9）
            </span>
            <div v-if="item.show">
              <i class="el-icon-arrow-down"></i>
            </div>
            <div v-else>
              <i class="el-icon-arrow-up"></i>
            </div>
          </div>
          <div class="listCon" :class="item.show ? ' ' : 'none'">
            <div class="tips">
              <div v-if="item.state && item.auditStatus == '已审核'">
                <div>最后提交时间：{{ item.time }}</div>
              </div>
              <div
                v-if="item.auditStatus != '已审核'"
                class="rowFlex"
                style="justify-content: space-between"
              >
                <span>
                  <i class="el-icon-warning"></i
                  >温馨提示：请在12月30日0点前完成所有信息提交，否则将给予相关处罚
                </span>
                <div class="rowFlex">
                  <span class="zhushi">*所有内容全部填写完成后才可提交！</span>
                  <div class="applyButton" @click="applyButton(item)">提交</div>
                </div>
              </div>
            </div>
            <div class="mainIntroduce rowFlex">
              <div
                v-for="(mainItem, mainIndex) in item.listItem"
                :key="mainIndex"
                class="itemMain boxShadow"
                :class="mainItem.state ? '' : 'selected'"
                @mouseover="enter(index, mainIndex)"
                @mouseout="leave(index, mainIndex)"
              >
                <div class="itemName">{{ mainItem.name }}</div>
                <div class="bottomMain boxSizing">
                  <div v-if="mainItem.state" class="stateMain">
                    <i class="el-icon-success"></i>已填写
                  </div>
                  <div v-else class="stateMain">
                    <i class="el-icon-warning"></i>未填写
                  </div>
                  <div class="fillingTime">{{ mainItem.time }}</div>
                </div>
                <div class="itemMainCover" v-show="mainItem.senn">
                  <div>
                    <div
                      class="viewButton"
                      @click="pushShow(item.listItem, mainItem.id, item.year)"
                    >
                      查看
                    </div>
                    <div
                      v-if="(item.auditStatus == '审核拒绝'|| item.auditStatus == '未审核'|| item.auditStatus== null )&& mainItem.openWrite == true"
                      class="viewButton"
                      @click="updateShow(item.listItem, mainItem.id, item.year)"
                    >
                      修改
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import recentYears from '../../common/unit/recentYearsOptions'
export default {
  data() {
    return {
      dataList: [
       /* {
          year: "2020",
          state: false,
          time: "",
          show: true,
          listItem: [
            {
              id: "enterpriseInform",
              state: false,
              name: "企业基本信息",
              time: "",
              senn: false,
              openWrite: false
            },
            {
              id: "productionSituation",
              state: false,
              name: "产品生产情况",
              time: "",
              senn: false,
              openWrite: false
            },
            {
              id: "wasteProduction",
              state: false,
              name: "危险废物生产情况",
              time: "",
              senn: false,
              openWrite: false
            },
            {
              id: "wasteReduction",
              state: false,
              name: "危险废物减量化计划",
              time: "",
              senn: false,
              openWrite: false
            },
            {
              id: "wasteTransfer",
              state: false,
              name: "危险废物转移情况",
              time: "",
              senn: false,
              openWrite: false
            },
            {
              id: "selfDisposal",
              state: false,
              name: "危险废物自行利用处置情况",
              time: "",
              senn: false,
              openWrite: false
            },
            {
              id: "entrustedProcessing",
              state: false,
              name: "危险废物委托利用处置情况",
              time: "",
              senn: false,
              openWrite: false
            },
            {
              id: "environmentalTesting",
              state: false,
              name: "环境监测状况",
              time: "",
              senn: false,
              openWrite: false
            },
            {
              id: "planReview",
              state: false,
              name: "上年度管理计划回顾",
              time: "",
              senn: false,
              openWrite: false
            },
          ],
        },
*/
      ],
      yearList: [
        // {
        //   value: "2020",
        //   label: "2020",
        // },
        // {
        //   value: "2019",
        //   label: "2019",
        // },
        // {
        //   value: "2018",
        //   label: "2018",
        // },
      ],
      queryYear: '',
      stataList: [
        {
          value: true,
          label: "提交",
        },
        {
          value: false,
          label: "未提交",
        },
      ],
      stateValue: "",
      show: true,

    };

  },
  created() {
    // this.getManangementState();
    // this.getQueryYear();
    // this.initYearList();
    this.getEntReportYearList().then(val => {
      if(val.code == 0){
        this.queryYear = val.data[0];
        for (let i = 0; i < val.data.length; i++) {
          let obj = {};
          obj.value = val.data[i];
          obj.label = val.data[i];
          this.yearList.push(obj);
        }
        this.queryButton();
      }else{
        this.$message.warning(res.msg)
      }
    });
  },
  components:{
    recentYears
  },
  methods: {
    getEntReportYearList(){
      return new Promise((resolve, reject) => {
        let self = this;
        self.$axios.get("/api/regulatory/ReportAndRegister/getEntReportYearList").then((res) => {
          resolve(res);
        }).catch(function (err) {
          resolve(err);
        });

      })
    },
    initYearList(){
      this.yearList=recentYears(this,3);
    },
    getQueryYear(){
      var queryYear = this.$route.query.year
      if (queryYear != undefined) {
        this.queryYear = queryYear;
      }
      this.queryButton();
    },
    getManangementState() {
      let self = this;
      self.$axios
        .get("/api/regulatory/ReportAndRegister/getManagementState")
        .then((res) => {
          if (res.code == 0) {
            self.dataList = res.data;
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    enter: function (index, childIndex) {
      this.dataList[index].listItem[childIndex].senn = true;
    },
    leave: function (index, childIndex) {
      this.dataList[index].listItem[childIndex].senn = false;
    },
    pushShow(item, id, year) {
      console.log(id)
      let jsonData = JSON.stringify(item);
      //view = 1是查看，查看页面不显示按钮,view=2是修改，支持用户修改数据
      this.$router.push(

        `/managementPlan/${id}?year=${year}&view=1`
      );
    },
    updateShow(item, id, year) {
      console.log(item,id,year);
      let jsonData = JSON.stringify(item);
      //view = 1是查看，查看页面不显示按钮,view=2是修改，支持用户修改数据
      this.$router.push(
        {
        path:`/managementPlan/${id}`,
        query:{
        year,
        view:2}
        }
        // `/managementPlan/${id}?year=${year}&view=2`
      );
    },
    applyButton(item) {
      let self = this;
      if (item.state) {
        //提交申请的代码
        this.$confirm("此操作将提交填报信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          closeOnClickModal: false,
          type: "warning",
        })
          .then(() => {
            var params = new URLSearchParams();
            params.append("recordYear", item.year);
            self.$axios
              .post("/api/regulatory/ReportAndRegister/commitDeclare", params)
              .then((res) => {
                if (res.code == 0) {
                  this.getQueryYear();
                  this.$message({
                    type: "success",
                    message: "提交成功！",
                  });
                }
              })
              .catch(function (err) {
                console.log(err);
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消提交！",
            });
          });
      } else {
        this.$message({
          type: "info",
          message: "有填报项未完成填报，完成填报在提交！",
        });
      }

      console.log("item233333", item);
    },
    queryButton() {
      const queryYear = this.queryYear;
      const stateValue = this.stateValue;
      console.log(queryYear + stateValue);
      // this.dataList.filter((item) => {
      //   console.log("item", item);
        // if (item.state === stateValue && item.year === queryYear) {
        let self = this;
        var params = new URLSearchParams();
        params.append("recordYear", queryYear);
        params.append("state", stateValue);
        self.$axios
          .get(
            "/api/regulatory/ReportAndRegister/getManagementByTimeAndState",
            { params }
          )
          .then((res) => {
            if (res.code == 0) {
              self.dataList = res.data;
            }
          })
          .catch(function (err) {
            console.log(err);
          });
        // return item;
        //}
      // });
    },
    blockShow(index) {
      this.dataList[index].show = !this.dataList[index].show;
    },
  },
  watch: {
    queryYear: function (n, o) {
      this.queryButton(this.queryYear);
    },
    stateValue: function (n, o) {
      this.queryButton(this.stateValue);
    },
  },
};
</script>
<style>
.none {
  display: none;
}
.application {
  color: rgba(66, 66, 66, 1);
}
.application > div,
.application > div > span {
  margin-right: 20px;
}
.application > div > span {
  line-height: 30px;
  width: 30%;
}
.application .queryButton {
  line-height: 30px;
  background: rgba(216, 216, 216, 1);
  padding: 0 21px;
}
.application .el-input__inner {
  line-height: 30px;
  height: 30px;
}
.el-input__icon {
  line-height: 30px;
}
.redistrationMain {
  margin-top: 18px;
  padding: 14px 1% 14px 1%;
}
.redistrationMain .mainList {
  justify-content: space-between;
}
.redistrationMain .mainList .time {
  width: 5%;
  text-align: right;
}
.redistrationMain .mainList .year {
  line-height: 44px;
}
.redistrationMain .centerMain {
  width: 2%;
  position: relative;
  z-index: 0;
}
.redistrationMain .mainList:last-child .centerMain .xian {
  height: 90%;
}
.redistrationMain .mainList:last-child .mianLeft {
  margin-bottom: 0;
}
.redistrationMain .centerMain .xian {
  height: 100%;
  width: 1px;
  background: rgba(151, 151, 151, 0.5);
  position: absolute;
  left: 50%;
  margin-left: -4%;
  top: 25px;
  z-index: -1;
}
.redistrationMain .centerMain .el-icon-success {
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  color: green;
  line-height: 44px;
}
.redistrationMain .mianLeft {
  width: 91%;
  border: 1px solid rgba(0, 0, 0, 0.12);
  height: 100%;
  margin-bottom: 50px;
}
.redistrationMain .mianLeft .state {
  justify-content: space-between;
  line-height: 44px;
  background: #d8d8d8;
  align-items: center;
  padding: 0 1% 0 3%;
}
.redistrationMain .listCon {
  padding: 0% 2% 30px;
}
.redistrationMain .listCon .tips {
  padding-bottom: 8px;
  border-bottom: 1px dashed rgba(151, 151, 151, 1);
  line-height: 30px;
  padding-top: 1%;
}
.redistrationMain .listCon .tips .el-icon-warning {
  color: rgba(68, 68, 68, 0.5);
}
.redistrationMain .listCon .tips .zhushi {
  color: rgba(51, 51, 51, 0.5);
}
.applyButton {
  padding: 0 36px;
  background: rgba(216, 216, 216, 1);
  line-height: 30px;
  cursor: pointer;
}
.mainIntroduce {
  flex-wrap: wrap;
}
.redistrationMain .mainIntroduce .itemMain {
  width: 15%;
  text-align: center;
  margin-top: 18px;
  margin-right: 33px;
  position: relative;
}
.redistrationMain .mainIntroduce .itemMain .itemName {
  padding: 16px 0 31px;
}
.redistrationMain .mainIntroduce .itemMain .bottomMain {
  background-color: rgba(85, 85, 85, 0.04);
  height: 55px;
  padding: 10px 4px;
}
.redistrationMain .stateMain {
  color: #5d6674;
  font-size: 12px;
}
.redistrationMain .mainIntroduce .itemMain.selected .stateMain {
  color: rgba(249, 182, 0, 1);
}
.redistrationMain .mainIntroduce .fillingTime {
  margin-top: 3px;
}
.redistrationMain .mainIntroduce .itemMain .itemMainCover {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.redistrationMain .mainIntroduce .itemMain .itemMainCover .viewButton {
  line-height: 30px;
  border: 1px solid rgba(255, 255, 255, 1);
  padding: 0 20px;
  margin-bottom: 10px;
  cursor: pointer;
}
.redistrationMain
  .mainIntroduce
  .itemMain
  .itemMainCover
  .viewButton:last-child {
  margin-bottom: 0;
}
.circular {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 3px solid rgba(249, 182, 0, 1);
  display: block;
  margin: 73% auto 0;
}
</style>
