<template>
  <!-- 主体 -->
  <div class="main">
    <div class="main-top">
      <div class="breadcrumb">
        <a href="#">
          <i class="icon icon-jianguan"></i>
          <span class="text-primary-font">企业管理</span>
        </a>
      </div>
    </div>
    <div class="panel">
      <div class="panel-bd pdtlr-0">
        <div class="filter-more">
          <ul class="filter-box">
            <li class="filter-item">
              <div class="filter-label">企业类型：</div>
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
          </ul>
        </div>
      </div>
	  
		  <el-table :data="tableDatas" class="table-default" >
		  	  <el-table-column type="index" label="序号" width="100%" align="center" ></el-table-column>
		      <el-table-column prop="name" label="企业名称" align="center" width="200%"></el-table-column>
		  	  <el-table-column prop="entType" label="企业类型" align="center"></el-table-column>
		  	  <el-table-column prop="managerName" label="管理员姓名" align="center"></el-table-column>
			  <el-table-column prop="managerPhone" label="管理员手机号" align="center"></el-table-column>
			  <el-table-column prop="status" label="状态" align="center"></el-table-column>
			  <el-table-column prop="managerStatusStr" label="企业帐号状态" align="center"></el-table-column>
		  	  <el-table-column label="操作" align="center">
				  <template slot-scope="scope">
					  <a
					    href="javascript:;"
					    class="text-primary text-underline"
					    @click="jumpAddress('EnterprisesInfo',scope.row.id,scope.row.name,scope.row.creditCode,scope.row.regionCode,scope.row.categoryName,scope.row.legal,scope.row.legalPhone,scope.row.enterpriseScale,scope.row.contacts,scope.row.contactsPhone,scope.row.correlationId)"
					  >企业详情</a>
					  <a
					    href="javascript:;"
					    class="text-primary text-underline"
					    @click="jumpAddressToProductionBook(scope.row.id,scope.row.name,scope.row.regionCode,scope.row.entType)"
					  >管理台账</a>
				  </template>
		  		  
		  	  </el-table-column>
		  </el-table>
      
      <div class="el-pagination is-background mt-lg">
        <span class="el-pagination__total">共 {{total}} 条，每页显示</span>
		
		
		
        <span >
          <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="cur_page"
                :page-sizes="[5,10, 15, 20]"
                :page-size="10"
                layout="total, sizes, prev, pager, next"
                :total="total">
              </el-pagination>
        </span>
		
		
		

        <span class="el-pagination__total">共 {{totalPage}} 页</span>
      </div>
    </div>
    <productionVideoHuiKan ref="closeMouleHK"></productionVideoHuiKan>
  </div>
</template>

<script>
import productionVideoHuiKan from "./ProductionVideoHuiKan.vue";
export default {
  name: "VideoMonitor",
  components: {
    productionVideoHuiKan
  },
  data() {
    return {
		queryInfo:{
			query: '',
			pageNo: 1,
			pageSize: 10
			
		},
	  entTypes: [
	    { value: -1, label: "全部" },
	    { value: 1, label: "重点企业" },
	    { value: 2, label: "一般企业" },
	    { value: 3, label: "收集企业"},
	    { value: 4, label: "经营企业"}
	  ],
      cur_page: 1,
      pageSizes: this.AppConfig.appInfo.pageSizes,
      pageSize: this.AppConfig.appInfo.pageSize,
      tableDatas: [],
      total: 0,
      totalPage: 0,
      regionOptions: [],
      regionCode: sessionStorage.getItem('regionCode'),//[],
      monitorType: -1,
      entType: -1,
      search: '',
      entTotal: {},
    };
  },
  created: function() {
    this.loadingData();
  },
  methods: {
    jumpAddress(adress,entId,entName,creditCode,regionCode,categoryName,legal,legalPhone,enterpriseScale,contacts,contactsPhone,correlationId) {
      if (null != adress && adress != "") {
        this.$router.push({
          path: "/"+adress,
          query: {
            entId: entId,
            entName: entName,
			creditCode: creditCode,
			regionCode: regionCode,
			categoryName: categoryName,
			legal: legal,
			legalPhone: legalPhone,
			enterpriseScale: enterpriseScale,
			contacts: contacts,
			contactsPhone: contactsPhone,
			correlationId: correlationId,
			pageNo: this.queryInfo.pageNo,
			pageSize: this.queryInfo.pageSize,
			entType: this.entType,
			name: this.search
          }
        });
      }
    },
	jumpAddressToProductionBook(entId,entName,regionName,entType) {
		if(entType == "重点企业" || entType == "一般企业"){
		  this.$router.push({
			path: "/"+ "enterpriseProductionBook",
			query: {
			  entId: entId,
			  entName: entName,
					regionName: regionName,
			}
		  });
		}
		if(entType == "收集企业"){
		  this.$router.push({
			path: "/"+ "collectEnterpriseProductionBook",
			query: {
			  entId: entId,
			  entName: entName,
					regionName: regionName,
			}
		  });
		}
		if(entType == "经营企业"){
		  this.$router.push({
			path: "/"+ "managementEnterpriseProductionBook",
			query: {
			  entId: entId,
			  entName: entName,
					regionName: regionName,
			}
		  });
		}
	  
	},
	
    handleSizeChange(newSize) {
      this.queryInfo.pageSize=newSize
      this.loadingData();
    },
    handleCurrentChange(newPage) {
		
      this.queryInfo.pageNo=newPage
      this.loadingData();
    },
    show() {
      this.cur_page = 1;
      this.loadingData();
    },
    loadingData() {
      var _this = this;
      var url = "/api/regulatory/tEnterpriseManagement/selectEnterpriseDetails";
      let params = new URLSearchParams();
      params.append("pageNo", _this.queryInfo.pageNo);
      params.append("pageSize", _this.queryInfo.pageSize);
      params.append("entType", _this.entType);
      // params.append("monitorType", _this.monitorType);
      // params.append('regionCode',_this.regionCode);
      params.append("name", _this.search);
      _this.$axios
        .get(url, { params })
        .then(response => {
          if (response.code == 0) {
			_this.tableDatas = response.data.list
             _this.total = response.data.count;
             _this.totalPage = response.data.totalPageCount;
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
    searchRegionChange(){
      let regionInfo =this.$refs.regionElCascader.getCheckedNodes();
      if(regionInfo.length>0){
        this.regionCode = regionInfo[0].value;
      }
      /*console.log(this.search.regionCode+"<<<当前省/市/区");*/
    }
  }
};
</script>

<style>
</style>
