<template>
  <!-- 主体 -->
  <div class="main">
    <div class="main-top">
      <div class="breadcrumb">
        <a href="#"
          ><i class="icon icon-zhihuijianguan menu-icon"></i>一般工业固废</a
        ><span class="sep">&gt;</span><span class="text-primary">固废申报</span>
      </div>
    </div>
    <div class="panel">
      <div class="panel-bd">
        <div style="padding: 20px 0px 0 2px">
          <ul class="filter-box">
            <li class="filter-item">
              <div class="filter-label">年份：</div>
              <div class="filter-con">
                <div class="el-input w180 el-input-group el-input--prefix">
                  <el-date-picker
                    v-model="labelForm.years"
                    type="year"
                    value-format="yyyy"
                    placeholder="请选择"
                  >
                  </el-date-picker>
                </div>
              </div>
            </li>

            <li class="filter-item">
              <div class="filter-label">季度：</div>
              <div class="filter-con">
                <div class="el-select w180">
                  <el-select v-model="labelForm.quarter" clearable>
                    <el-option
                      v-for="(item, index) in quarterArray"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-label">状态：</div>
              <div class="filter-con">
                <div class="el-select w180">
                  <el-select v-model="labelForm.status" clearable>
                    <el-option
                      v-for="(item, index) in stateArray"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-btn">
                <el-button
                  type="button"
                  size="medium"
                  @click="show"
                  class="el-button el-button--primary"
                >
                  <span>查询</span></el-button
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-btn">
                <el-button
                  type="button"
                  size="medium"
                  @click="lookInfo(1,'新增',{})"
                  class="el-button el-button--primary"
                >
                  <span>新增</span></el-button
                >
              </div>
            </li>
          </ul>
        </div>
        <table class="table-default table-full">
          <thead>
            <tr>
              <th style="text-align: center; width: 6%">序号</th>
              <th style="text-align: center; width: 10%">企业名称</th>
              <th style="text-align: center; width: 10%">申报类型</th>
              <th style="text-align: center; width: 8%">申报时间</th>
              <th style="text-align: center; width: 8%">修改人</th>
              <th style="text-align: center; width: 10%">修改时间</th>
              <th style="text-align: center; width: 5%">状态</th>
              <th style="text-align: center; width: 10%">提交时间</th>
              <th style="text-align: center; width: 10%">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in dataList" :key="index">
              <td style="text-align: center; width: 6%">
                {{ (cur_page - 1) * pageSize + index + 1 }}
              </td>
              <td
                style="
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 14%;
                "
                :title="item.entName"
              >
                {{ item.entName }}
              </td>
              <td
                style="
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 10%;
                "
              >
                {{ item.declareType == 1 ? "年度" : "季度" }}
              </td>
              <td
                style="
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 8%;
                "
              >
                {{ item.declareTime }}
              </td>
              <td
                style="
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 8%;
                "
                :title="item.updatedByName"
              >
                {{ item.updatedByName }}
              </td>
              <td
                style="
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 8%;
                "
              >
                {{ item.updatedTime }}
              </td>
              <td
                style="
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 8%;
                "
              >
                <span
                  style="color: rgb(245, 34, 45)"
                  v-if="item.auditStatus == -1"
                  >审核未通过</span
                >
                <span
                  style="color: rgb(56, 158, 13)"
                  v-else-if="item.auditStatus == 0"
                  >已提交未审核</span
                >
                <span
                  style="color: rgb(56, 158, 13)"
                  v-else-if="item.auditStatus == 1"
                  >审核通过</span
                >
                <span style="color: rgb(145, 145, 145)" v-else>未提交</span>
              </td>
              <td
                style="
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 8%;
                "
              >
                {{ item.declareTime }}
              </td>
              <td
                style="
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 10%;
                "
              >
                <div class="btn-opreate">
                   <a
                    @click="toEDit(1,'编辑',item)"
                  class="text-primary text-underline"
                  
                  v-if="item.auditStatus == 0 ||item.auditStatus == -1"
                  >编辑</a>
                  <a
                    @click="toSeeDetail(2,' 查看',item)"
                    href="javascript:;"
                    class="text-primary text-underline"
                    >查看</a
                  >
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="el-pagination is-background mt-lg">
          <span class="el-pagination__total">共 {{ total }} 条，每页显示</span>
          <span class="el-pagination__total">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="cur_page"
              :page-sizes="pageSizes"
              :page-size="pageSize"
              layout="sizes, prev, pager, next"
              :total="total"
            >
            </el-pagination>
          </span>

          <span class="el-pagination__total">共 {{ totalPage }} 页</span>
        </div>
           <!-- <div  v-show="false">
            
      <sonWasteDeclara ref="sonComput"
      
    ></sonWasteDeclara></div> -->
      </div>
    </div>
  </div>
</template>

<script>
  // import sonWasteDeclara from  './solidWDdetail.vue'
export default {
  name: "solidWasteDeclaration",
//   components:{
// sonWasteDeclara
//   },
  data() {
    return {
      labelForm: {
        years: undefined,
        quarter: undefined,
        status: undefined,
      },
      quarterArray: [
        {
          label: "第一季度",
          value: 1,
        },
        {
          label: "第二季度",
          value: 2,
        },
        {
          label: "第三季度",
          value: 3,
        },
        {
          label: "第四季度",
          value: 4,
        },
      ],
      stateArray: [
        {
          label: "未提交",
          value: 2,
        },
        {
          label: "已提交未审核",
          value: 0,
        },
        {
          label: "审核通过",
          value: 1,
        },
        {
          label: "审核未通过",
          value: -1,
        },
      ],
      total: 0,
      totalPage: 0,
      cur_page: 1,
      pageSizes: this.AppConfig.appInfo.pageSizes,
      pageSize: this.AppConfig.appInfo.pageSize,
      dataList: [],
    };
  },
  created: function () {
    this.pageList();
  },
  methods: {
    lookInfo(first,entName,param) {
  
      this.$router.push({ name: "solidWDdetail", query: { rowInfo: param.id ? param.id : '' ,judge:first,entName:entName} });

    },
    toSeeDetail(first,entName,param) {
      this.$router.push({ name: "solidWDSeeDetail", query: { rowInfo: param.id ? param.id : '' ,judge:first,entName:entName} });
    },

    handleSizeChange(val) {
      // 改变每页显示的条数
      this.pageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.cur_page = 1;
      this.pageList();
    },
 toEDit(first,entName,param) {

      this.$router.push({ name: "solidWDEdit", query: { rowInfo: param.id ? param.id : '' ,judge:first,entName:entName} });

    },
    handleCurrentChange(val) {
      this.cur_page = val;
      this.pageList();
    },
    show() {
      var _this = this;
      _this.cur_page = 1;
      _this.pageSize = 10;
      _this.pageList();
    },
    pageList() {
      var _this = this;
      var params = new URLSearchParams();
      params.append("pageNo", this.cur_page);
      params.append("pageSize", this.pageSize);
      params.append(
        "quarter",
        this.labelForm.quarter == undefined ? "" : this.labelForm.quarter
      );
      params.append(
        "year",
        this.labelForm.years == undefined ? "" : this.labelForm.years
      );
    
      if(this.labelForm.status != undefined){
        params.append(
              "auditStatus",
              this.labelForm.status == undefined ? "" : this.labelForm.status
            )
      }
    
      _this.$axios
        .get(
          "/api/regulatory/commonlysolidwaste/declarationListOfSolidWastesList",
          {
            params,
          }
        )
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
  },
};
</script>

<style scoped>
.allmap {
  width: 100%;
  height: 600px;
  position: relative;
  padding: 61px 10px 10px 10px;
  background: #ffffff;
}
.button-type {
  width: 100px;
  height: 35px;
  background: #33a7e1;
  font-weight: 500;
  color: white;
  border: 1px solid #ffffff;
  border-radius: 4px;
}
/* 去掉地图左下角的百度LOGO */
.anchorBL {
  display: none;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #f8f8f8;
}
.grid-content {
  min-height: 40px;
}
.appeal {
  line-height: 40px;
  /*设置为伸缩容器*/
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  /*垂直居中*/
  -webkit-box-align: center; /*旧版本*/
  -moz-box-align: center; /*旧版本*/
  -ms-flex-align: center; /*混合版本*/
  -webkit-align-items: center; /*新版本*/
  align-items: center; /*新版本*/
}
.appeal2 {
  line-height: 40px;
  /*设置为伸缩容器*/
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  /*垂直居中*/
  -webkit-box-align: center; /*旧版本*/
  -moz-box-align: center; /*旧版本*/
  -ms-flex-align: center; /*混合版本*/
  -webkit-align-items: center; /*新版本*/
  align-items: center; /*新版本*/
}
.el-dialog__body {
  padding: 30px 20px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
  background-color: #f8f8f8;
}
</style>
