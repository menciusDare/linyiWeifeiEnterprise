<template>
    <!-- 主体 -->
    <div class="main">
        <div class="main-top">
            <div class="breadcrumb">
                <a href="#"><i class="icon icon-zhuanyijihuajianguan menu-icon"></i>运输管理</a><span class="sep">&gt;</span><span
                    class="text-primary">车辆分配</span>
            </div>
        </div>

        <div class="panel">

         <!--   <div class="filter-more" style="height: 60px;">-->
            <div class="" style="height: 60px;">
                <ul class="filter-box">
                    <li class="filter-item" style="margin-right: 30px;width: 100%;margin-top: 10px;margin-bottom: 10px">
                        <el-form :inline="true" class="demo-form-inline" >
                            <el-form-item style="float: right;" >
                                <el-button type="primary"   @click="setDriver('','more')">批量分配</el-button>
                            </el-form-item>
                            <el-form-item style="float: right; display:flex;align-items:stretch" >
                                <el-button type="primary"   @click="show()">查询</el-button>
                            </el-form-item>
                        </el-form>
                    </li>
                </ul>
            </div>


            <el-table ref="multipleTable" :data="tableDatas"    tooltip-effect="dark"  style="width: 100%"  @selection-change="handleSelectionChange" :header-cell-style="{backgroundColor:' rgba(223, 234, 251, 0.3)',color:'#333'}">
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column type="index" label="序号" align="center" width="70%"></el-table-column>
                <el-table-column prop="entName" label="产废企业" align="center" :show-overflow-tooltip="true" width="200%"></el-table-column>
                <el-table-column prop="targetName" label="接收企业" align="center" :show-overflow-tooltip="true" width="200%" ></el-table-column>
                <el-table-column prop="nameGroup" label="危废名称" align="center"></el-table-column>
                <el-table-column prop="weight" label="计划转移重量(KG)" align="center"></el-table-column>
                <el-table-column prop="transportDate" label="计划转移时间" align="center"></el-table-column>
                <el-table-column prop="userName" label="司机" align="center"></el-table-column>
                <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
                <el-table-column prop="statusStr" label="状态" align="center"></el-table-column>

                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <a
                                href="javascript:;"
                                class="text-primary text-underline"
                                @click="setDriver(scope.row.id,'one')"
                        >车辆分配</a>
                    </template>

                </el-table-column>
            </el-table>

            <div class="el-pagination is-background mt-lg">
               <!-- <span class="el-pagination__total">共 {{total}} 个企业</span>-->

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
                <!--<span class="el-pagination__total">共 {{totalPage}} 页</span>-->
            </div>
        </div>

        <el-dialog title="车辆分配"  width="640px" height="800px" :visible.sync="dialogTableVisible" :destroy-on-close="true" :modal-append-to-body="false"  @close="closeColumn" >
            <template>
                <div>
                    <el-table :data="driverList" class="table-default" >
                        <el-table-column type="index" label="序号" width="100%" align="center" ></el-table-column>
                        <el-table-column prop="carNo" label="车牌号" align="center" width="100%"></el-table-column>
                        <el-table-column prop="name" label="司机" align="center" width="100%"></el-table-column>
                        <el-table-column prop="phone" label="司机联系电话" align="center" ></el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="scope">

                                <a      v-if="scope.row.carNo"
                                        href="javascript:;"
                                        class="text-primary text-underline"
                                        @click="chooseDriver(scope.row.id)"
                                >确认</a>
                                <span v-else>暂未分配车辆</span>
                            </template>

                        </el-table-column>
                    </el-table>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "OrderDriver",
        data() {
            return {
                oneOrMore:'one',
                dialogTableVisible:false,
                queryInfo:{
                    query: '',
                    pageNo: 1,
                    pageSize: 10
                },
                planId:'',
                status:'0',
                entTypes: [
                    { value: '', label: "全部" },
                    { value: 0, label: "计划中" },
                    { value: 1, label: "已完成" },
                ],
                cur_page: 1,
                pageSizes: this.AppConfig.appInfo.pageSizes,
                pageSize: this.AppConfig.appInfo.pageSize,
                tableDatas: [],
                driverList:[],
                driverId:'',
                total: 0,
                totalPage: 0,
                multipleSelection:[]
            };
        },
        created: function() {
            this.loadingData();
            // this.getDriverList();
        },
        methods: {

            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                if (val.length == 0 ){
                    this.oneOrMore = 'one'
                }else{
                    this.oneOrMore = 'more'
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
                var url = "/api/regulatory/tEnterpriseTransportPlan/planListPage";
                //var url = "http://localhost:8006/tEnterpriseTransportPlan/planListPage";
                let params = new URLSearchParams();
                params.append("page", _this.queryInfo.pageNo);
                params.append("size", _this.queryInfo.pageSize);
                params.append("status", _this.status);
                // params.append("monitorType", _this.monitorType);
                // params.append('regionCode',_this.regionCode);
                params.append("name", _this.search);
                _this.$axios
                    .get(url, { params })
                    .then(response => {
                        if (response.code == 0) {
                            _this.tableDatas = response.data.records
                            _this.total = response.data.total;
                            _this.totalPage = response.data.current;
                        } else {
                            console.log(response.msg);
                        }
                    })
                    .catch(error => {
                        // catch 指请求出错的处理
                        console.log(error);
                    });
            },
            getDriverList() {
                var _this = this;
                var url = "/api/regulatory/tEnterpriseTransportPlan/planDriverList";
               // var url = 'http://localhost:8006/tEnterpriseTransportPlan/planDriverList'
                _this.$axios
                    .get(url, { params: { } }) .then(function(res) {

                        if (res.code == 0) {
                            _this.driverList = res.data;
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
            },

            setDriver(planId,status){
                if(status == 'more'){
                    if(this.multipleSelection.length == 0){
                        this.$message('请选择要设置的订单');
                        return
                    }
                }
                var that= this ;
                that.planId = planId;
                that.getDriverList();
                that.dialogTableVisible = true;
            },

            closeColumn(){
                this.dialogTableVisible = false;
            },


            chooseDriver(driverId) {
                if (this.multipleSelection.length > 0) {
                    this.moreSet(driverId);
                }else{
                    this.oneSet(driverId)
                }
            },

            oneSet(driverId){
                this.driverId = driverId;
                var _this = this;
                var url = "/api/regulatory/tEnterpriseTransportPlan/setPlanDriver";
                _this.$axios
                    .get(url, { params: {driverId: _this.driverId,planId: _this.planId } }) .then(function(res) {
                    if (res.code == 0) {
                        _this.loadingData()
                    }
                    _this.dialogTableVisible = false;
                })
                    .catch(error => {
                        console.log(error);
                    });

            },

            moreSet: function (driverId) {
                this.driverId = driverId;
                var _this = this;
                var plans = '';
                for (var i = 0; i < _this.multipleSelection.length; i++) {
                    var id = _this.multipleSelection[i].id
                    plans+=  _this.multipleSelection[i].id+'%'
                }
                var url = "/api/regulatory/tEnterpriseTransportPlan/setPlanMoreDriver";
                _this.$axios
                    .get(url, {params: {driverId: _this.driverId, planId: plans}}).then(function (res) {

                    if (res.code == 0) {
                        _this.loadingData()
                    }
                    _this.dialogTableVisible = false;
                })
                    .catch(error => {
                        // catch 指请求出错的处理
                        console.log(error);
                    });

            }


        }
    };
</script>

<style>
</style>
