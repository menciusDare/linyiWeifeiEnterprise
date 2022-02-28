<template>
  <!-- 主体 -->
  <div class="main">
    <div class="main-top">
      <div class="breadcrumb">
        <a href="#">
          <i class="icon icon-jianguan"></i>
          <span class="text-primary-font">危废转移监管</span>
        </a>
        <span class="sep">></span>
        <span class="text-primary">转运过程追溯</span>
      </div>
    </div>
    <div class="panel">
      <div class="panel-bd pdtlr-0">
        <div class="filter-more">
          <ul class="filter-box">
            <li class="filter-item">
              <div class="filter-label">运输时间：</div>
              <div class="filter-con">
                <el-date-picker
                  v-model="value1"
                  type="daterange"
                  range-separator="——"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="changeDate"
                  clearable
                ></el-date-picker>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-label">危废类型：</div>
              <div class="filter-con">
                <div class="el-select w160">
                  <el-select v-model="entType" placeholder="请选择企业类型">
                    <el-option
                      v-for="item in entTypes"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </li>
            <!-- <li class="filter-item">
              <div class="filter-label">监控状态：</div>
              <div class="filter-con">
                <div class="el-select w160">
                  <el-select v-model="monitorType" placeholder="请选择监控状态">
                    <el-option
                      v-for="item in monitorTypes"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </li>-->
            <li class="filter-item">
              <div class="filter-label">企业名称：</div>
              <div class="filter-con">
                <div class="el-input w180 el-input-group el-input--prefix">
                  <!---->
                  <el-input v-model="search" placeholder="请输入企业名称">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                </div>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-btn">
                <!--<button type="button" class="button-type" @click="show">
                  <span>查询</span>
                </button>-->
                <el-button type="button" size="medium"  @click="show" class="el-button el-button--primary">
                  <span>查询</span></el-button>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-btn">
                <!--<button type="button" class="button-type" @click="show">
                  <span>导出</span>
                </button>-->
                <el-button type="button" size="medium"  @click="show" class="el-button el-button--primary">
                  <span>导出</span></el-button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- <div class="total-number" style="margin-left: 20px">
        <div class="total-name">
          全部企业
          <span class="num">{{entTotal.total}}</span>家
        </div>
        <div class="total-text">
          正常企业
          <span class="num">{{entTotal.normal}}</span>家
        </div>
        <div class="total-text is-offline">
          离线企业
          <span class="num">{{entTotal.offLine}}</span>家
        </div>
      </div>-->
      <table class="table-default">
        <thead>
          <tr>
            <th style="text-align:center;width: 6%">序号</th>
            <th style="text-align:center;width: 14%">移出企业</th>
            <th style="text-align:center;width: 10%">转运车辆</th>
            <th style="text-align:center;width: 10%">五联单号</th>
            <th style="text-align:center;width: 10%">接收企业</th>
            <th style="text-align:center;width: 10%">数量</th>
            <th style="text-align:center;width: 10%">完成时间</th>
            <th style="text-align:center;width: 10%">运输时长</th>
            <th style="text-align:center;width: 10%">状态</th>
            <th style="text-align:center;width: 10%">异常信息</th>
            <th style="text-align:center;width: 10%">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i)  in tableDatas">
            <td style="text-align:center;width: 6%">{{i+1}}</td>
            <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 14%"
              :title="item.moveOutEntName"
            >{{item.moveOutEntName}}</td>
            <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              :title="item.carNo"
            >{{item.carNo}}</td>
            <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              :title="item.fiveNo"
            >{{item.fiveNo}}</td>
            <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              :title="item.receiveEntName"
            >{{item.receiveEntName}}</td>
            <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              :title="item.transportNumber"
            >{{item.transportNumber}}</td>
            <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              :title="item.completeTime"
            >{{item.completeTime}}</td>
            <!-- <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              :title="item.monitorType"
            >
              <div
                :class="item.monitorType=='正常'?'text-state':'text-state state-off'"
              >{{item.monitorType}}</div>
            </td>-->
            <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              :title="item.yssc"
            >{{item.yssc?item.yssc.toFixed(2)+'小时':null}}</td>
            <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              :title="item.status"
            >{{item.status}}</td>
            <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              :title="item.exceptionMsg"
            >{{item.exceptionMsg}}</td>
            <td style="text-align:center;width: 10%">
              <a
                href="javascript:;"
                class="text-primary text-underline"
                @click="dialogTableVisible = true"
              >转运详情</a>
              <a
                href="javascript:;"
                class="text-primary text-underline"
                @click="jumpAddress('productionBook',item.entId,item.name,item.regionName)"
              >回放</a>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="el-pagination is-background mt-lg">
        <span class="el-pagination__total">共 {{total}} 条，每页显示</span>
        <span class="el-pagination__total">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="cur_page"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="sizes, prev, pager, next"
            :total="total"
          ></el-pagination>
        </span>

        <span class="el-pagination__total">共 {{totalPage}} 页</span>
      </div>
    </div>
    <el-dialog
      :modal="true"
      :modal-append-to-body="false"
      title="转运危废详情"
      :visible.sync="dialogTableVisible"
      width="600px"
      :close="dialogVisibleClose"
    >
      <div class="company-hd" style="padding-bottom: 14px">
        <div class="company-logo" style="float: left;">
          <img style="width: 100px;
    height: 60px;" src="http://59.110.152.155:8000/group1/M00/00/17/rBGuPF7PJ5uAHTJYAAV7fB4Ykps780.jpg" class="logo-sub" />
        </div>
        <div class="company-title">
          <!--<el-tooltip class="item" effect="dark" :content="entMapInfo.name" placement="top-start">-->
          <h2>{{Transdata.carVo.carNo}}</h2>
          <span style="position: absolute;right: 20px;">五联单号:1000000</span>
           <h3>{{Transdata.carVo.entName}}</h3>
          <!--</el-tooltip>-->
          
        </div>
      </div>
      <el-divider></el-divider>
      <div style=" padding-top: 6px;
      display: inline-flex;
    padding-bottom: 6px;">
          <div style="width: 70px; text-align: center;
    border: 1px solid;
    border-radius: 30px;
    background-color: grey;
    margin-right: 8px;height: 24px;
"> <i class="el-icon-office-building"></i>移出</div>
    <div><b>中节能天融科技有限公司</b></div>
      <div style="width: 70px; text-align: center;
    border: 1px solid;
    border-radius: 30px;
    background-color: grey;
    margin-left: 40px;margin-right: 8px;height: 24px;">  <i class="iconfont icon-huishou"></i>接收</div>
    <div><b>中节能天融科技有限公司</b></div>
      </div>
      <el-divider></el-divider>
      <table class="table-default">
        <thead></thead>
        <tbody>
          <tr v-for="(item,i)  in tableDatas1">
            <td style="text-align:center;width: 6%">{{item.dictCode}}</td>
            <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 14%"
              :title="item.storageTime"
            >{{item.dictName}}</td>
            <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              :title="item.operationType"
            >{{item.weight}}kg</td>
          </tr>
        </tbody>
      </table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "VideoMonitor",
  components: {},
  data() {
    return {
      value1: "",
      isDisabled: false,
      Transdata: {
        carVo: {
          carNo: "京A33334",
          entName: "清洁之光运输有限公司",
          carModel: "",
          driver: "张伟",
          driverPhone: "13999222233"
        }
      },
      dialogTableVisible: false,
      tableDatas1: [
        { dictCode: "HW08", dictName: "矿物废油", weight: "40" },
        { dictCode: "HW08", dictName: "矿物废油", weight: "40" },
        { dictCode: "HW08", dictName: "矿物废油", weight: "40" },
        { dictCode: "HW08", dictName: "矿物废油", weight: "40" }
      ],
      entTypes: [
        { value: -1, label: "全部" },
        { value: 1, label: "重点企业" },
        { value: 2, label: "一般企业" }
      ],
      monitorTypes: [
        { value: -1, label: "全部" },
        { value: 1, label: "正常" },
        { value: 2, label: "异常" }
      ],
      cur_page: 1,
      pageSizes: this.AppConfig.appInfo.pageSizes,
      pageSize: this.AppConfig.appInfo.pageSize,
      tableDatas: [],
      total: 0,
      totalPage: 0,
      regionOptions: [],
      regionCode: sessionStorage.getItem("regionCode"), //[],
      monitorType: -1,
      entType: -1,
      search: "",
      entTotal: {},
      regionLevel: sessionStorage.getItem("regionLevel")
    };
  },
  created: function() {
    if (this.regionLevel == 3) {
      this.isDisabled = true;
    }
    this.getRegionChildrenList();
    this.loadingData();
  },
  methods: {
    jumpAddress(adress, entId, entName, regionName) {
      if (null != adress && adress != "") {
        this.$router.push({
          path: "/" + adress,
          query: {
            entId: entId,
            entName: entName,
            regionName: regionName
          }
        });
      }
    },
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.pageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.cur_page = 1;
      this.loadingData();
    },
    handleCurrentChange(val) {
      this.cur_page = val;
      this.loadingData();
    },
    getIndex(index) {
      let curPage = this.cur_page;
      let limitPage = this.pageSize;
      return index + 1 + (curPage - 1) * limitPage;
    },
    show() {
      this.cur_page = 1;
      this.loadingData();
    },
    loadingData() {
      var _this = this;
      var url =
        "/api/regulatory/tEnterpriseTransferStandingBook/selectZyPlanHistory";
      // var url = "/api2/tVideocamera/selectEnterprisePage";
      /* var region = "";
      if (null != _this.regionCode && _this.regionCode.length > 0) {
        region = _this.regionCode[_this.regionCode.length - 1];
      }*/
      _this.$axios
        .post(url, { page: _this.cur_page, limit: _this.pageSize })
        .then(response => {
          if (response.code == 0) {
            _this.tableDatas = [];
            _this.tableDatas = response.data.records;
            // console.log(_this.tableDatas);
            _this.total = response.data.total;
            // console.log(_this.total);
            _this.totalPage = response.data.pages;
            // console.log(_this.totalPage);
          } else {
            console.log(response.msg);
          }
        })
        .catch(error => {
          // catch 指请求出错的处理
          console.log(error);
        });
    },
    getRegionChildrenList() {
      var _this = this;
      _this.$axios
        .get("/api/regulatory/regionInfo/getRegionChildrenList", {
          params: {
            regionCode: _this.regionCode
          }
        })
        .then(function(res) {
          if (res.code == 0) {
            _this.regionOptions = res.data;
            //_this.regionCode = [res.data[0].value + ""];
          }
        })
        .catch(error => {
          // catch 指请求出错的处理
          console.log(error);
        });
    },
    closeData() {
      var _this = this;
    },
    searchRegionChange() {
      let regionInfo = this.$refs.regionElCascader.getCheckedNodes();
      if (regionInfo.length > 0) {
        this.regionCode = regionInfo[0].value;
      }
      /*console.log(this.search.regionCode+"<<<当前省/市/区");*/
    }
  }
};
</script>

<style>
</style>
