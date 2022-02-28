<template>
    <!-- 内容区域 -->
    <div class="main">
        <div class="main-top">
            <div class="breadcrumb">
                <a href="#"><i class="icon icon-shenbaodengji menu-icon"></i>数据管理</a><span class="sep">&gt;</span><span
                    class="text-primary">删除数据审核</span>
            </div>
        </div>
        <div class="panel" style="padding: 20px;">
            <div class="panel-bd pdtlr-0">
                <div class="filter-more">
                    <ul class="filter-box">
                        <li class="filter-item">
                            <div class="filter-label">所在地：</div>
                            <div class="filter-con">
                                <div class="el-select w160">
                                    <el-cascader
                                            :show-all-levels="false"
                                            ref="regionElCascader"
                                            @change="searchRegionChange"
                                            :disabled="isDisabled"
                                            v-model="regionCode"
                                            :options="regionOptions"
                                            :props="{ checkStrictly: true }"
                                    >
                                    </el-cascader>
                                </div>
                            </div>
                        </li>
                        <li class="filter-item" >
                            <div class="filter-con">
                                    <input class="el-input__inner" style="height: 35px;width: 160px" autocomplete="off"  v-model="entName" placeholder="关键字搜索"></input>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-btn">
                               <!-- <button type="button" class="button-type" @click="show">
                                    <span>查询</span></button>-->
                                <el-button type="button" size="medium"  @click="show" class="el-button el-button--primary">
                                    <span>查询</span></el-button>
                                <!--<button type="button" class="button-type" @click="openDialog(null)">
                                    <span>批量审核</span></button>-->
                                <el-button type="button" size="medium"  @click="openDialog(null)" class="el-button el-button--primary">
                                    <span>批量审核</span></el-button>
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
                    <th style="text-align:center;width: 10%">操作时间</th>
                    <th style="text-align:center;width: 8%">危废名称</th>
                    <th style="text-align:center;width: 9%">危废代码</th>
                    <th style="text-align:center;width: 10%">危废类别</th>
                    <th style="text-align:center;width: 8%">数量(KG)</th>
                    <th style="text-align:center;width: 10%">删除人</th>
                    <th style="text-align:center;width: 7%">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index)  in tableData">
                    <td  style="text-align:center;width: 4%"><el-checkbox  v-model="item.falg"  @change="handleCheckedCitiesChange"></el-checkbox></td>
                    <td style="text-align:center;width: 5%">{{getIndex(index)}}</td>
                    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.updatedTime">{{item.updatedTime}}</td>
                    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.detName">{{item.detName}}</td>
                    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 9%" :title="item.detCode.split('#')[0]">{{item.detCode.split("#")[0]}}</td>
                    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 9%" :title="item.typeName">{{item.typeName}}</td>
                    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.number">{{item.number}}</td>
                    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.byName">{{item.byName}}</td>
                    <td style="text-align:center;width: 7%">
                        <div class="btn-opreate">
                            <a href="javascript:;" class="text-primary text-underline" @click="openDialog(item)">审核</a>
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
    </div>


</template>

<script>
    export default {
        name: "TransferCity",
        data(){
            return {
                entName: '',
                time: '',
                isDisabled:false,
                options: [
                    {label:'未开始',value:'0'},
                    {label:'已完成',value:'1'}
                ],
                cur_page: 1,
                pageSizes: this.AppConfig.appInfo.pageSizes,
                pageSize: this.AppConfig.appInfo.pageSize,
                tableData: [],
                enterpriseName:'',
                total:0,
                totalPage:0,
                totalEnt:0,
                totalPageEnt:0,
                tiem:['',''],
                status:"",
                fiveNo:"",
                centerDialogVisibleOpen:false,
                titleNo:'',
                carImg:'',
                carUserImg:'',
                regionCode: sessionStorage.getItem('regionCode'),
                checkAll: false,
                planIds:[],
                regionOptions:[],
            }
        },
        created: function () {
            // 行政区域级联
            this.getRegionChildrenList();
            this.loadingData();
        },
        methods:{
            getRegionChildrenList(){
                var _this=this;
                _this.$axios.get('/api/regulatory/regionInfo/getRegionChildrenList',{params:{
                        "regionCode":_this.regionCode
                    }}).then(
                    function (res) {
                        if(res.code == 0){
                            _this.regionOptions = res.data;
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    console.log(error);
                });
            },
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
            openDialog:function(item){
                var _this=this;
                if(null == _this.tableData||_this.tableData.length<=0){
                    _this.$message.error("请选择需要审核的数据！");
                    return;
                }
                if(item!=null){
                    _this.planIds = [];
                    _this.planIds.push(item.id);
                }
                if(_this.planIds==null||_this.planIds.length<=0){
                    _this.$message.error("请选择需要审核的数据！");
                    return;
                }
                if(_this.planIds==null||_this.planIds.length<=0){
                    _this.$message.error("请选择需要审核的数据！");
                }else{
                    _this.$confirm('请审核选中的数据?', '提示', {
                        confirmButtonText: '通过',
                        cancelButtonText: '不通过',
                        closeOnClickModal: false,
                        distinguishCancelAndClose: true,
                    }).then(() => {
                        _this.examine(1)
                    }).catch(action => {
                        if(action === 'cancel'){
                            _this.examine(2)
                        }
                    })
                }
            },
            examine(num){
                var _this=this;
                let params =new URLSearchParams();
                params.append('ids',_this.planIds);
                params.append('status',num);
                let url = "/api/regulatory/standingBookDelete/examineStorageStandingBookDelete";
                _this.$axios.post(url,params).then(function(res) {
                    if (res.code == 0) {
                        _this.$message.success('审核成功！');
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
                let url = "/api/regulatory/standingBookDelete/queryBookDelete";
                let params =new URLSearchParams();
                params.append('page',_this.cur_page);
                params.append('size',_this.pageSize);
                params.append('search',_this.entName);
                params.append('regionCode',_this.regionCode);
                params.append('status',0);
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
            searchRegionChange(){
                let regionInfo =this.$refs.regionElCascader.getCheckedNodes();
                if(regionInfo.length>0){
                    this.search.regionName = regionInfo[0].label;
                    this.search.regionLevel= regionInfo[0].level+1;
                    this.search.regionCode = regionInfo[0].value;
                    let parentRegionInfo = regionInfo[0].parent;
                    if(parentRegionInfo!=null){
                        this.search.regionParentCode = parentRegionInfo.value;
                    }else{
                        this.search.regionName = this.regionName;
                        this.search.regionLevel= this.regionLevel;
                        this.search.regionCode = this.regionCode;
                        this.search.regionParentCode = this.parentCode;
                    }
                }else{
                    this.search.regionName = this.regionName;
                    this.search.regionLevel= this.regionLevel;
                    this.search.regionCode = this.regionCode;
                    this.search.regionParentCode = this.parentCode;
                }
                /*console.log(this.search.regionCode+"<<<当前省/市/区");*/
            },
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
