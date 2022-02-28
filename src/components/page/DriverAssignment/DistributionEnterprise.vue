<template>
    <!-- 内容区域 -->
    <div class="main">
        <div class="main-top">
            <div class="breadcrumb">
                <i class="icon icon-zhuanyijihuajianguan menu-icon"></i>运输管理<span class="sep">&gt;</span><span
                    class="text-primary">分配运输企业</span>
            </div>
        </div>
        <div class="panel" style="padding: 20px;">
            <div class="panel-bd pdtlr-0">
                <div class="filter-more">
                    <ul class="filter-box">
                        <li class="filter-item" >
                            <div class="filter-label">企业名称：</div>
                            <div class="filter-con">
                                    <input class="el-input__inner" style="height: 35px;width: 160px" autocomplete="off"  v-model="entName" placeholder="搜索企业名称"></input>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-btn">
                                <!--<button type="button" class="button-type" @click="show">
                                    <span>查询</span></button>-->
                                <el-button type="button" size="medium"  @click="show" class="el-button el-button--primary">
                                    <span>查询</span></el-button>
                                <!--<button type="button" class="button-type" @click="openDialog(null)">
                                    <span>批量分配</span></button>-->
                                <el-button type="button" size="medium"  @click="openDialog(null)" class="el-button el-button--primary">
                                    <span>批量分配</span></el-button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <table class="table-default" >
                <thead>
                <tr>
                    <th  style="text-align:center;width: 4%"><el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox></th>
                    <th  style="text-align:center;width: 6%">序号</th>
                    <th style="text-align:center;width: 10%">申请编号</th>
                    <th style="text-align:center;width: 8%">产废企业</th>
                    <th style="text-align:center;width: 9%">计划转移日期</th>
                    <th style="text-align:center;width: 10%">转移重量(KG)</th>
                    <th style="text-align:center;width: 8%">运输企业</th>
                    <th style="text-align:center;width: 10%">五联单号</th>
                    <th style="text-align:center;width: 7%">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index)  in tableData">
                    <td  style="text-align:center;width: 4%"><el-checkbox  v-model="item.falg"  @change="handleCheckedCitiesChange" :disabled="item.transportEnterprise==null?false:true"></el-checkbox></td>
                    <td style="text-align:center;width: 5%">{{getIndex(index)}}</td>
                    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.applicationNo">{{item.applicationNo}}</td>
                    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.productionEnterprise">{{item.productionEnterprise}}</td>
                    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 9%" :title="item.transportDate">{{formatterDate(item.transportDate,"yyyy-MM-dd")}}</td>
                    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.transportNumber">{{item.transportNumber}}</td>
                    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.transportEnterprise">{{item.transportEnterprise}}</td>
                    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.fiveNo">{{item.fiveNo}}</td>
                    <td style="text-align:center;width: 7%">
                        <div class="btn-opreate">
                            <!--    color: #becdd4 !important;-->
                            <a v-if="item.transportEnterprise"   style="color: #333 !important;">已分配</a>
                            <a v-else  href="javascript:;" class="text-primary text-underline" @click="openDialog(item)">分配运输企业</a>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>

            <div class="el-pagination is-background mt-lg">
                <span class="el-pagination__total">共 {{total}} 条</span>

                <span class="el-pagination__sizes">
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

        <!--详情弹框-->
        <div>
            <el-dialog :modal-append-to-body="false" custom-class="openCla" :modal="false"
                       title="运输企业列表"
                       :visible.sync="centerDialogVisibleOpen"
                       width="50%" @close="closeData"
            >
                <div class="filter-more">
                    <ul class="filter-box">
                        <li class="filter-item"  style="height: 39px;margin-right: 0px">
                            <div class="filter-label" style="line-height: 35px">企业名称：</div>
                            <div class="filter-con">
                                <div class="el-input w180 el-input-group el-input--prefix">
                    <span class="el-input__prefix"><i class="el-input__icon el-icon-search"></i>
                    </span>
                                    <input class="el-input__inner" style="height: 35px;width: 160px" autocomplete="off"  v-model="enterpriseName" placeholder="搜索企业名称"></input>

                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-btn">
                                <el-button type="button" size="medium"  @click="showEnt" class="el-button el-button--primary">
                                    <span>查询</span></el-button>
                            </div>
                        </li>
                    </ul>
                </div>
                <table class="table-default">
                    <thead>
                    <tr>
                        <th  style="text-align:center;width: 6%">序号</th>
                        <th style="text-align:center;width: 10%">企业名称</th>
                        <th style="text-align:center;width: 9%">所属区域</th>
                        <th style="text-align:center;width: 10%">联系人</th>
                        <th style="text-align:center;width: 8%">联系人电话</th>
                        <th style="text-align:center;width: 7%">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index)  in tableEntData">
                        <td style="text-align:center;width: 5%">{{getIndexEnt(index)}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.applicationNo">{{item.name}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 9%" :title="item.transportDate">{{item.regionName}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.transportNumber">{{item.contacts}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.productionEnterprise">{{item.contactsPhone}}</td>
                        <td style="text-align:center;width: 7%">
                            <div class="btn-opreate">
                                <a href="javascript:;" class="text-primary text-underline" @click="addTransportation(item)">选择</a>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="el-pagination is-background mt-lg">
                    <span class="el-pagination__total">共 {{totalEnt}} 条</span>

                    <span class="el-pagination__sizes">
                                            <el-pagination
                                                    @size-change="handleSizeChangeEnt"
                                                    @current-change="handleCurrentChangeEnt"
                                                    :current-page="cur_Entpage"
                                                    :page-sizes="pageEntSizes"
                                                    :page-size="pageEntSize"
                                                    layout="sizes, prev, pager, next"
                                                    :total="totalEnt">
                    </el-pagination>
                    </span>

                    <span class="el-pagination__total">共 {{totalPageEnt}} 页</span>
                </div>
            </el-dialog>
        </div>
    </div>


</template>

<script>
    export default {
        name: "TransferCity",
        data(){
            return {
                entName: '',
                time: '',
                options: [
                    {label:'未开始',value:'0'},
                    {label:'已完成',value:'1'}
                ],
                cur_page: 1,
                pageSizes: this.AppConfig.appInfo.pageSizes,
                pageSize: this.AppConfig.appInfo.pageSize,
                tableData: [],
                enterpriseName:'',
                tableEntData:[],
                cur_Entpage: 1,
                pageEntSizes: this.AppConfig.appInfo.pageSizes,
                pageEntSize: this.AppConfig.appInfo.pageSize,
                total:0,
                totalPage:0,
                totalEnt:0,
                totalPageEnt:0,
                tiem:['',''],
                status:"",
                fiveNo:"",
                centerDialogVisibleOpen:false,
                titleNo:'',
                formDate:{
                    id:null,
                    productionEnterprise:'',
                    transportEnterprise:'',
                    acceptEnterprise:'',
                    dictDetailName:'',
                    dictType:'',
                    dictDetailCode:'',
                    transportNumber:'',
                    packingType:'',
                    transportDate:'',
                    handledBy:'',
                    contactsPhone:'',
                    carModel:'',
                    driver:'',
                    driverPhone:'',
                    transportClass:'',
                    payload:'',
                    receiveUser:'',
                    receivePhone:'',
                    businessType:'',
                    applicationNo:'',
                    locationUrl:'',
                    thumbnailUrl:'',
                    driverCorrelationId:'',
                },
                imgUrl:'http://59.110.152.155:8000/',
                carImg:'',
                carUserImg:'',
                regionCode: sessionStorage.getItem('regionCode'),
                checkAll: false,
                planIds:[],
            }
        },
        created: function () {
            this.loadingData();
        },
        methods:{
            handleCheckAllChange(val) {
                var _this = this;
                _this.planIds = [];
                for(var i =0;i<_this.tableData.length;i++){
                    console.log(_this.tableData[i])
                    if(null == _this.tableData[i].transportEnterprise||_this.tableData[i].transportEnterprise.length<=0){
                        _this.tableData[i].falg = val;
                        if(val){
                            _this.planIds.push(_this.tableData[i].id);
                        }
                    }
                }
            },
            handleCheckedCitiesChange(value) {
                var _this = this;
                var t = 0;
                var num = 0;
                _this.planIds = [];
                for(var i =0;i<_this.tableData.length;i++){
                    if(_this.tableData[i].falg){
                        _this.planIds.push(_this.tableData[i].id);
                        t++;
                    }
                    if(null == _this.tableData[i].transportEnterprise||_this.tableData[i].transportEnterprise.length<=0){
                        num ++;
                    }
                }
                if(t == num){
                    _this.checkAll = true;
                }else{
                    _this.checkAll = false;
                }

            },
            //KG转换吨
            getDun: function (str) {
                if(null==str||str==''){
                    return 0;
                }else {
                    let number = str / 1000;
                    return number.toFixed(2);
                }
            },
            openDialog:function(item){
                var _this = this;
                if(null == _this.tableData||_this.tableData.length<=0){
                    _this.$message.error("请选择需要分配运输企业的计划！");
                    return;
                }
                if(item!=null){
                    _this.planIds = [];
                    _this.planIds.push(item.id);
                }
                if(_this.planIds==null||_this.planIds.length<=0){
                    _this.$message.error("请选择需要分配运输企业的计划！");
                    return;
                }
                _this.getImgList();
                _this.centerDialogVisibleOpen=true;

            },
            handleSizeChangeEnt(val) {
                // 改变每页显示的条数
                this.pageEntSize=val;
                // 注意：在改变每页显示的条数时，要将页码显示到第一页
                this.cur_Entpage=1;
                this.getImgList();
            },
            handleCurrentChangeEnt(val) {
                this.cur_Entpage = val;
                this.tableEntData=[];
                this.getImgList();
            },
            getIndexEnt(index){
                let curPage = this.cur_Entpage;
                let limitPage = this.pageEntSize;
                return (index+1) + (curPage - 1) * limitPage;
            },

            showEnt(){
                this.cur_Entpage=1;
                this.getImgList();
            },
            getImgList() {
                var _this = this;
                let url = "/api/regulatory/tEnterpriseTransportPlan/queryTransportationList";
                let params =new URLSearchParams();
                params.append('page',_this.cur_Entpage);
                params.append('limit',_this.pageEntSize);
                params.append('companyName',_this.enterpriseName);
                console.log(_this.enterpriseName)
                _this.$nextTick(() => {
                    _this.$axios.get(url,{params}).then((response) => {
                        if(response.code == 0) {
                            console.log(response)
                            _this.totalEnt = response.data.total;
                            _this.tableEntData = response.data.records;
                            _this.totalPageEnt = response.data.pages;
                            console.log(_this.totalEnt)
                        }
                    }).catch((error) => {
                        // catch 指请求出错的处理
                        console.log(error);
                    });
                })
            },
            formatterDate(value,str){
                if(value!=null){
                    let val= new Date(value).format(str);
                    return val;
                }else{
                    return '--';
                }
            },
            statusType:function(sta){
                if(0==sta){
                    return "未开始"
                }
                if(1==sta){
                    return "已完成"
                }
            },




            handleSizeChange(val) {
                // 改变每页显示的条数
                this.pageSize=val;
                // 注意：在改变每页显示的条数时，要将页码显示到第一页
                this.cur_page=1;
                this.loadingData();
            },
            handleCurrentChange(val) {
                this.cur_page = val;
                this.tableData=[];
                this.loadingData();
            },
            getIndex(index){
                let curPage = this.cur_page;
                let limitPage = this.pageSize;
                return (index+1) + (curPage - 1) * limitPage;
            },

            show(){
                this.cur_page=1;
                this.checkAll=false;
                this.planIds = [];
                this.loadingData();
            },
            loadingData() {
                var _this = this;
                // let url = "http://localhost:8006/tEnterpriseTransportPlan/getTranByParams";
                let url = "/api/regulatory/tEnterpriseTransportPlan/queryPlanReceivingList";
                let params =new URLSearchParams();
                params.append('page',_this.cur_page);
                params.append('limit',_this.pageSize);
                params.append('companyName',_this.entName);
                _this.$nextTick(() => {
                    _this.$axios.get(url,{params}).then((response) => {
                        if(response.code == 0) {
                            _this.total = response.data.total;
                            _this.tableData = response.data.records;
                            _this.totalPage = response.data.pages;
                            _this.checkAll = false;
                        }
                    }).catch((error) => {
                        // catch 指请求出错的处理
                        console.log(error);
                    });
                })
            },
            //修改通过状态
            updateByStatus:function(id){
                let _this=this;
                // let url = "http://localhost:8006/tEnterpriseTransportPlan/updateByStatus/";
                let url = "/api/regulatory/tEnterpriseTransportPlan/updateByStatus/";
                _this.$axios.post(url+id).then(function(res) {
                    if (res.code == 0) {
                        _this.$message.success('通过成功！');
                        _this.centerDialogVisibleOpen=false;
                        _this.cur_page=1;
                        _this.loadingData();
                    } else {
                        _this.$message.error(res.msg);
                    }
                }).catch((error) => {
                    // catch 指请求出错的处理
                    console.log(error);
                })
            },
            addTransportation(item){
                var _this=this;
                if(_this.planIds==null||_this.planIds.length<=0){
                    _this.$message.error("请选择需要分配运输企业的计划！");
                    _this.closeData();
                }else{
                    _this.$confirm('是否确定选择该运输企业，运输企业一经选择将不可更改！', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        closeOnClickModal: false,
                        type: 'warning'
                    }).then(() => {
                        let params =new URLSearchParams();
                        params.append('planIds',_this.planIds);
                        params.append('entId',item.entId);
                        let url = "/api/regulatory/tEnterpriseTransportPlan/addTransportation";
                        _this.$axios.post(url,params).then(function(res) {
                            if (res.code == 0) {
                                _this.$message.success('分配成功！');
                                _this.centerDialogVisibleOpen=false;
                                _this.cur_page=1;
                                _this.loadingData();
                            } else {
                                _this.$message.error(res.msg);
                            }
                        }).catch((error) => {
                            // catch 指请求出错的处理
                            console.log(error);
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消操作'
                        });
                    });
                }
            },
            closeData(){
                var _this = this;
                _this.centerDialogVisibleOpen = false;
                _this.enterpriseName='';
                _this.totalEnt = 0;
                _this.tableEntData = [];
                _this.totalPageEnt = 0;
                _this.pageEntSize = 10;
                _this.cur_Entpage=1;
            }
        },
    }
</script>

<style>
    .tdOolor{
        width: 70px;height: 20px;background: rgba(96, 96, 96, 0.65);text-align: center;
    }
    .tdOolorAs{
        width: 70px;height: 20px;background: #67c23aa6;text-align: center;;
    }
    .el-select .te input{
        height: 40px;
    }
</style>
