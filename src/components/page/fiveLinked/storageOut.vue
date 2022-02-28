<template>
        <!-- 主体 -->
        <div class="main">
            <div class="main-top">
                <div class="breadcrumb">
                    <a href="#"><i class="icon icon-zhuanyijihuajianguan menu-icon"></i>手动出库</a>
                </div>
            </div>


            <div class="panel">

                <div class="" style="height: 60px;">
                    <ul class="filter-box">
                        <li class="filter-item" style="margin-right: 30px;width: 100%;margin-top: 10px;margin-bottom: 10px">
                            <el-form :inline="true" class="demo-form-inline" >
                                <el-form-item style="float: right;" >
                                    <el-button type="primary"   @click="moreSet('')">批量出库</el-button>
                                </el-form-item>
                                <!-- <el-form-item style="float: right; display:flex;align-items:stretch" >
                                     <el-button type="primary"   @click="getDriverList()">查询</el-button>
                                 </el-form-item>-->
                            </el-form>
                        </li>
                    </ul>
                </div>



                <el-table ref="multipleTable" :data="tableDatas"    tooltip-effect="dark"  style="width: 100%"  @selection-change="handleSelectionChange" :header-cell-style="{backgroundColor:' rgba(223, 234, 251, 0.3)',color:'#333'}">
                    <el-table-column type="selection" width="55"> </el-table-column>
                    <el-table-column type="index"           label="序号" align="center" width="70%"></el-table-column>
                    <el-table-column prop="storageTime"         label="操作时间" align="center" :show-overflow-tooltip="true" ></el-table-column>
                    <el-table-column prop="dictDetailName"       label="危废名称" align="center"></el-table-column>
                    <el-table-column prop="codeStr"          label="危废代码" align="center"></el-table-column>
                    <el-table-column prop="dictTypeName"   label="危废类别" align="center"></el-table-column>
                    <el-table-column prop="number"        label="重量(KG)" align="center"></el-table-column>
                    <el-table-column prop="containerName"    abel="贮存容器" align="center"></el-table-column>
                    <el-table-column prop="userName"       label="经办人" align="center"></el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <a href="javascript:;" class="text-primary text-underline" @click="moreSet(scope.row.id)" >出库</a>
                        </template>
                    </el-table-column>
                </el-table>

                <div class="el-pagination is-background mt-lg">

        <span>
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
                </div>
            </div>

        </div>
</template>

<script>
    export default {
        name: "storageOut",
        data(){
            return{
                oneOrMore:'one',
                total: 0,
                totalPage: 0,
                multipleSelection:[],
                cur_page: 1,
                pageSizes: this.AppConfig.appInfo.pageSizes,
                pageSize: this.AppConfig.appInfo.pageSize,
                tableDatas: [],
                ids:'',
            }
        },

        mounted() {
            this.loadingData();
        },
        methods:{
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

            //企业贮存台账
            loadingData() {
                var _this = this;
                _this.$axios
                    .post("/api/regulatory/tEnterpriseInfo/selectentErpriseSSBookIn", {
                        page: _this.cur_page,
                        limit: _this.pageSize,
                    })
                    .then((response) => {
                        if (response.code == 0) {
                            _this.tableDatas = response.data.records;
                            _this.total = response.data.total;
                            _this.totalPage = response.data.pages;
                        }
                    })
                    .catch((error) => {
                        // catch 指请求出错的处理
                        console.log(error);
                    });
            },




            chooseDriver(driverId) {
                if (this.multipleSelection.length > 0) {
                    this.moreSet(driverId);
                }else{
                    this.oneSet(driverId)
                }
            },


            moreSet: function (id) {
                var _this = this;
                var ids = '';
                if(id == ''){
                    for (var i = 0; i < _this.multipleSelection.length; i++) {
                        var id = _this.multipleSelection[i].id
                        ids+=  _this.multipleSelection[i].id+'%'
                    }
                }else{
                    ids = id+'%'
                }
                var url = "/api/regulatory/tEnterpriseInfo/storageOutTo";
                _this.$axios
                    .get(url, {params: { ids: ids}}).then(function (res) {

                    if (res.code == 0) {
                        _this.loadingData()
                    }
                })
                    .catch(error => {
                        // catch 指请求出错的处理
                        console.log(error);
                    });

            }

        }
    }
</script>

<style scoped>

</style>