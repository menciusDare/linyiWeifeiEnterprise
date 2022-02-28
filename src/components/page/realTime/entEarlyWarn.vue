<template>
  <!--主体
    <div class="main">
        <div class="main-top">
            <div class="breadcrumb">
                <a href="#"><i class="icon icon-zhuanyun"></i><span class="text-primary-font">智慧监管</span></a><span class="sep">></span><span class="text-primary-font">企业异常预警</span>
            </div>
        </div>
        <div class="panel">
            <div class="panel-bd pdtlr-0">
                &lt;!&ndash; 收起后样式名.filter-more-mini &ndash;&gt;
                <div class="filter-more">
                    <ul class="filter-box">
                        <li class="filter-item">
                            <div class="filter-label">所在地：</div>
                            <div class="filter-con">
                                <el-cascader
                                        style="width:150px;"
                                        ref="regionElCascader"
                                        @change="searchRegionChange"
                                        v-model="search.regionCode"
                                        :options="regionOptions"
                                        :props="{ checkStrictly: true }"
                                        clearable>
                                </el-cascader>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-label">企业类型：</div>
                            <div class="filter-con">
                                <el-select v-model="search.entType" style="width: 150px;" clearable>
                                    <el-option
                                            v-for="item in entTypeOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-label">异常类型：</div>
                            <div class="filter-con">
                                <el-select v-model="search.warningType" style="width: 150px;" clearable>
                                    <el-option
                                            v-for="item in warningOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-label">预警时间：</div>
                            <div class="filter-con">
                                <el-date-picker
                                        style="width: 200px;"
                                        @change="timeChange"
                                        v-model="search.timeValue"
                                        type="datetimerange"
                                        range-separator="-"
                                        :editable=false
                                        :clearable = true
                                        value-format = "yyyy-MM-dd HH:mm:ss"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                </el-date-picker>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-label">企业名称：</div>
                            <div class="filter-con">
                                <el-input style="width: 150px;" v-model="search.entName">

                                </el-input>
                            </div>
                        </li>
                        <li class="filter-item">
                            <el-button type="info" size="small" plain @click="searchEntEarlyWarn">查询</el-button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="panel" style="margin-top: 15px">
            <div class="panel-bd pdtlr-0">
                &lt;!&ndash; 收起后样式名.filter-more-mini &ndash;&gt;
                &lt;!&ndash;<div class="filter-more" style="box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.16);">
                    <ul class="filter-box">
                        <li class="filter-item">
                            <div class="filter-label">所在地：</div>
                            <div class="filter-con">
                                <el-cascader
                                        ref="regionElCascader"
                                        @change="searchRegionChange"
                                        v-model="search.regionCode"
                                        :options="regionOptions"
                                        :props="{ checkStrictly: true }"
                                        clearable>
                                </el-cascader>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-label">企业类型：</div>
                            <div class="filter-con">
                                <el-select v-model="search.entType" style="width: 150px;" clearable>
                                    <el-option
                                            v-for="item in entTypeOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-label">异常类型：</div>
                            <div class="filter-con">
                                <el-select v-model="search.warningType" style="width: 150px;" clearable>
                                    <el-option
                                            v-for="item in warningOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </li>
                    </ul>
                    <ul class="filter-box">
                        <li class="filter-item">
                            <div class="filter-label">预警时间：</div>
                            <div class="filter-con">
                                <el-date-picker
                                        @change="timeChange"
                                        v-model="search.timeValue"
                                        type="datetimerange"
                                        range-separator="-"
                                        :editable=false
                                        :clearable = true
                                        value-format = "yyyy-MM-dd HH:mm:ss"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                </el-date-picker>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-label">企业名称：</div>
                            <div class="filter-con">
                                <el-input style="width: 150px;" v-model="search.entName">

                                </el-input>
                            </div>
                        </li>
                    </ul>

                    <div class="filter-btn">
                        <button type="button" @click="searchEntEarlyWarn" class="el-button el-button&#45;&#45;primary">&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;<span>查询</span></button>
                    </div>
                </div>&ndash;&gt;
                <div class="filter-more">
                    <ul class="filter-box">
                        <li class="filter-item">
                            <div class="filter-label">
                                总预警
                                <font style="font-size: x-large;">{{count.all}}</font>
                                次
                            </div>

                        </li>
                        <li class="filter-item">
                            <div class="filter-label" style="color:#f56c6c">
                                当前异常企业
                                <font style="font-size: x-large;">{{count.one}}</font>
                                家
                            </div>
                        </li>

                    </ul>
                </div>
                <div style="overflow-x:auto;width:100%">
                    <table class="table-default table-full">
                        <thead>
                        <tr>
                            <th>序号</th>
                            <th>企业名称</th>
                            <th>预警时间</th>
                            <th>区域</th>
                            <th>所属行业</th>
                            <th>企业类型</th>
                            <th>联系人</th>
                            <th>电话</th>
                            <th>异常类型</th>
                            &lt;!&ndash;<th>操作</th>&ndash;&gt;
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in dataList">
                            <td>{{(cur_page-1)*pageSize+index+1}}</td>
                            <td>{{item.entName}}</td>
                            <td>{{item.warningTime}}</td>
                            <td>{{item.regionName}}</td>
                            <td>{{item.categoryName}}</td>
                            <td>{{item.entTypeStr}}</td>
                            <td>{{item.contacts}}</td>
                            <td>{{item.contactsPhone}}</td>
                            <td>
                                <span v-if="item.warningType==1">企业连续5天未更新企业台账</span>
                                <span v-if="item.warningType==2">企业储藏设施变动异常</span>
                                <span v-if="item.warningType==3">企业危费储存即将超时</span>
                            </td>
                            &lt;!&ndash;<td>
                                <div class="btn-opreate">
                                    <a href="javascript:;" class="text-second text-underline">查看</a>
                                </div>
                            </td>&ndash;&gt;
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="el-pagination is-background mt-lg">
                    <span class="el-pagination__total">共 {{total}}  条记录，每页显示</span>
                    <span class="el-pagination__total">
                                            <el-pagination
                                                    @size-change="handleSizeChange"
                                                    @current-change="handleCurrentChange"
                                                    :current-page="cur_page"
                                                    :page-sizes="pageSizes"
                                                    :page-size="pageSize"
                                                    layout="sizes, prev, pager, next"
                                                    :total="total">
                    </el-pagination>
                    </span>

                    <span class="el-pagination__total">共 {{totalPage}} 页</span>
                </div>
            </div>
        </div>
  </div>-->
  <!-- 内容区域 -->
  <div class="main">
    <div class="main-top">
      <div class="breadcrumb">
        <a href="#">
          <i class="icon icon-zhihuijianguan menu-icon"></i>智慧监管
        </a>
        <span class="sep">&gt;</span>
        <span class="text-primary">企业异常预警</span>
      </div>
    </div>
    <div class="panel">
      <div class="panel-bd">
        <div style="padding: 20px 0px 0 2px;">
          <ul class="filter-box">
            <li class="filter-item">
              <div class="filter-label">所在地：</div>
              <div class="filter-con">
                <div class="el-select w160">
                  <el-cascader
                    ref="regionElCascader"
                    :disabled="isDisabled"
                    @change="searchRegionChange"
                    v-model="search.regionCode"
                    :options="regionOptions"
                    :props="{ checkStrictly: true }"
                  ></el-cascader>
                </div>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-label">企业类型：</div>
              <div class="filter-con">
                <div class="el-select w124">
                  <el-select v-model="search.entType" clearable>
                    <el-option
                      v-for="item in entTypeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-label">异常类型：</div>
              <div class="filter-con">
                <div class="el-select w124">
                  <el-select v-model="search.warningType" clearable>
                    <el-option
                      v-for="item in warningOptions"
                      :key="item.dataStatus"
                      :label="item.typeNname"
                      :value="item.dataStatus"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-label">预警时间：</div>
              <div class="filter-con">
                <div class="el-select w200">
                  <el-date-picker
                    style="width: "
                    @change="timeChange"
                    v-model="search.timeValue"
                    type="datetimerange"
                    range-separator="-"
                    :editable="false"
                    :clearable="true"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </div>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-con">
                <div class="el-input w180 el-input-group el-input--prefix">
                  <span class="el-input__prefix">
                    <i class="el-input__icon el-icon-search"></i>
                  </span>
                  <input
                    type="text"
                    autocomplete="off"
                    placeholder="搜索企业名称"
                    v-model="search.entName"
                    class="el-input__inner"
                  />
                </div>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-btn">
                <!--<button type="button" @click="searchEntEarlyWarn" class="button-type">
                  <span>查询</span>
                </button>-->
                <el-button type="button" size="medium"  @click="searchEntEarlyWarn" class="el-button el-button--primary">
                  <span>查询</span></el-button>
              </div>
            </li>
          </ul>
        </div>
        <div class="total-number" style="margin-left: 3px;">
          <div class="total-name">总预警{{count.all}}次</div>
          <div class="total-text is-offline">
            当前异常企业
            <span class="num">{{count.one}}</span>家
          </div>
        </div>
        <table class="table-default">
          <thead>
            <tr>
              <th style="text-align:center;width: 6%">序号</th>
              <th style="text-align:center;width: 14%">企业名称</th>
              <th style="text-align:center;width: 10%">预警时间</th>
              <th style="text-align:center;width: 10%">区域</th>
              <th style="text-align:center;width: 10%">所属行业</th>
              <th style="text-align:center;width: 10%">企业类型</th>
              <th style="text-align:center;width: 10%">联系人</th>
              <th style="text-align:center;width: 10%">电话</th>
              <th style="text-align:center;width: 10%">异常类型</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in dataList">
              <td style="text-align:center;width: 6%">{{(cur_page-1)*pageSize+index+1}}</td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 14%"
                :title="item.entName"
              >{{item.entName}}</td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                :title="item.warningTime"
              >{{item.warningTime}}</td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                :title="item.regionName"
              >{{item.regionName}}</td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                :title="item.categoryName"
              >{{item.categoryName}}</td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                :title="item.entTypeStr"
              >{{item.entTypeStr}}</td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                :title="item.contacts"
              >{{item.contacts}}</td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                :title="item.contactsPhone"
              >{{item.contactsPhone}}</td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                :title="formatWarningType(item.warningType)"
              >
                <span v-if="item.warningType==1">企业连续5天未更新企业台账</span>
                <span v-if="item.warningType==2">企业储藏设施变动异常</span>
                <span v-if="item.warningType==3">企业危费储存即将超时</span>
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
    </div>
  </div>
</template>

<script>
export default {
  name: "entEarlyWarn",
  data() {
    return {
      isDisabled: false,
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
        {
          value: "3",
          label: "收集企业",
        },
        {
          value: "4",
          label: "经营企业",
        },
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
        {
          value: "4",
          label: "超过80%储存量",
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
      },
      dataList: [],
      count: {
        all: 0,
        one: 0,
        two: 1,
        three: 0,
      },
      regionOptions: [],
    };
  },
  created: function () {
    if (this.search.regionLevel == 3) {
      this.isDisabled = true;
    }
    this.getwarningOptions(4)
    this.searchEntEarlyWarn();
    // 行政区域级联
    this.getRegionChildrenList();
  },
  methods: {
    getwarningOptions(type) {
      var _this = this;
      var params = new URLSearchParams();
      params.append("type", type);
      _this.$axios
        .post("/api/regulatory/type/showDicType",params)
        .then(function (res) {
          if (res.code == 0) {
            let data = res.data;
            _this.warningOptions = res.data;
            console.log("data",data);
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          console.log(error);
        });
    },
    formatWarningType(warningType) {
      if (warningType == 1) {
        return "企业连续5天未更新企业台账";
      } else if (warningType == 2) {
        return "企业储藏设施变动异常";
      } else if (warningType == 3) {
        return "企业危费储存即将超时";
      }
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
      this.selectWarningCountEnt();
      this.pageList();
    },
    selectWarningCountEnt() {
      var _this = this;
      var params = new URLSearchParams();
      params.append("regionCode", _this.search.regionCode);
      _this.$axios
        .get("/api/regulatory/index/selectWarningCountEnt", { params })
        .then(function (res) {
          if (res.code == 0) {
            let data = res.data;
            _this.count.all = data.all;
            _this.count.one = data.one;
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
      params.append("warningType", _this.search.warningType);
      params.append("startime", _this.search.startime);
      params.append("endTime", _this.search.endTime);
      params.append("entName", _this.search.entName);
      _this.$axios
        .get("/api/regulatory/index/selectWarningCountEntPage", { params })
        .then(function (res) {
          if (res.code == 0) {
            _this.dataList = res.data.records;
            _this.totalPage = res.data.pages;
            _this.total = res.data.total;
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
  },
};
</script>

<style>

</style>
