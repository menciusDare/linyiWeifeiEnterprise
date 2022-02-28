<template>
    <!-- 内容区域 -->
    <div class="main">
        <div class="main-top">
            <div class="breadcrumb">
                <a href="#"><i class="icon icon-shenbaodengji menu-icon"></i>数据管理</a><span class="sep">&gt;</span><span
                    class="text-primary">修改记录审核</span>
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
                                            :show-all-levels="false"
                                            ref="regionElCascader"
                                            v-model="regionCode"
                                            :options="regionOptions"
                                            @change="handleChange"
                                            :props="{ checkStrictly: true }"
                                    >
                                    </el-cascader>
                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-label">审核状态：</div>
                            <div class="filter-con">
                                <div class="el-select w124">
                                    <el-select v-model="search.status" clearable>
                                        <el-option
                                                v-for="item in statusOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-label">企业名称：</div>
                            <div class="filter-con">
                                <div class="el-input w180 el-input-group el-input--prefix">
                    <span class="el-input__prefix"><i class="el-input__icon el-icon-search"></i>
                    </span><input type="text" autocomplete="off" placeholder="搜索企业名称" v-model="search.entName"
                                  class="el-input__inner">
                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-btn">
                                <!--<button type="button"  class="button-type"  @click="searchData">
                                    <span>查询</span></button>-->
                                <el-button type="button" size="medium"  @click="searchData" class="el-button el-button--primary">
                                    <span>查询</span></el-button>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-btn">
                                <!--<button type="button"  class="button-type" style="width: 100px; !important;"  @click="batchToExamine(1)">
                                    <span>批量通过</span></button>-->
                                <el-button type="button" size="medium"  @click="batchToExamine(1)" class="el-button el-button--primary">
                                    <span>批量通过</span></el-button>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-btn">
                                <!--<button type="button"  class="button-type" style="width: 100px; !important;"  @click="batchToExamine(2)">
                                    <span>批量不通过</span></button>-->
                                <el-button type="button" size="medium"  @click="batchToExamine(2)" class="el-button el-button--primary">
                                    <span>批量不通过</span></el-button>
                            </div>
                        </li>
                    </ul>
                </div>
                <table class="table-default">
                    <thead>
                    <tr>
                        <th style="text-align:center;width: 5%">
                            <el-checkbox v-model="allChecked" @change="allCheck"></el-checkbox>
                        </th>
                        <th style="text-align:center;width: 5%">序号</th>
                        <th style="text-align:center;width: 10%">企业名称</th>
                        <th style="text-align:center;width: 5%">操作类型</th>
                        <th style="text-align:center;width: 8%">修改前危废名称</th>
                        <th style="text-align:center;width: 8%">修改前危废代码</th>
                        <th style="text-align:center;width: 5%">修改前数量(KG)</th>
                        <th style="text-align:center;width: 8%">修改后危废名称</th>
                        <th style="text-align:center;width: 8%">修改后危废代码</th>
                        <th style="text-align:center;width: 5%">修改后数量(KG)</th>
                        <th style="text-align:center;width: 5%">审核状态</th>
                        <th style="text-align:center;width: 5%">当前贮存量(KG)</th>
                        <th style="text-align:center;width: 5%">最大贮存量(KG)</th>
                        <th style="text-align:center;width: 10%">审核</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,i)  in dataList" :key="item.id">
                        <td style="text-align:center;width: 5%" v-if="item.status == 0">
                            <el-checkbox v-model="item.checked" @change="itemCheck"></el-checkbox>
                        </td>
                        <td style="text-align:center;width: 5%" v-else>
                            <el-checkbox v-model="checked" disabled></el-checkbox>
                        </td>
                        <td style="text-align:center;width: 5%">{{pageSize*(cur_page-1)+i+1}}</td>
                        <td
                                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                                :title="item.entName"
                        >{{item.entName}}</td>

                        <td
                                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 5%"
                                :title="formatOperationType(item.operationType)"
                        >{{formatOperationType(item.operationType)}}</td>
                        <td
                                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width:8%"
                                :title="item.dictDetailName"
                        >{{item.dictDetailName}}</td>
                        <td
                                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%"
                                :title="item.dictDetailCode"
                        >{{item.dictDetailCode}}</td>

                        <td
                                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 5%"
                                :title="item.number"
                        >{{item.number}}</td>

                        <td
                                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width:8%"
                                :title="item.newDictDetailName"
                        >{{item.newDictDetailName}}</td>
                        <td
                                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%"
                                :title="item.newDictDetailCode"
                        >{{item.newDictDetailCode}}</td>

                        <td
                                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 5%"
                                :title="item.newNumber"
                        >{{item.newNumber}}</td>

                        <td
                                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 5%"
                                :title="formatStatus(item.status)"
                        >
                            <span >{{formatStatus(item.status)}}</span>
                        </td>
                        <td
                                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 5%"
                                :title="item.currentAmount"
                        >{{item.currentAmount}}</td>
                        <td
                                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 5%"
                                :title="item.maxAmount"
                        >{{item.maxAmount}}</td>
                        <td style="text-align:center;width: 10%">
                            <a
                                    v-if="item.status==0"
                                    href="javascript:;"
                                    class="text-primary text-underline"
                                    @click="toExamine(1,item)"
                            >通过</a>
                            <a
                                    v-if="item.status==0"
                                    href="javascript:;"
                                    class="text-primary text-underline"
                                    @click="toExamine(2,item)"
                            >不通过</a>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="el-pagination is-background mt-lg">
                    <span class="el-pagination__total">共 {{total}}  条，每页显示</span>
                    <span class="el-pagination__total">
                                            <el-pagination
                                                    @size-change="handleSizeChange"
                                                    @current-change="handleCurrentChange"
                                                    :current-page="cur_page"
                                                    :page-size="pageSize"
                                                    layout="sizes, prev, pager, next"
                                                    :total="total">
                    </el-pagination>
                    </span>

                    <span class="el-pagination__total">共 {{totalPage}} 页</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "productionBookUpdateRecordSecond",
        props: {},
        components: {},
        computed: {},
        data() {
            return {
                regionCode:'0',
                search:{
                    entName:'',
                    status:0,
                    regionCode:'0',//sessionStorage.getItem('regionCode'),
                },
                allChecked: false,
                dataList: [],
                selOptionData:[],
                totalPage: 0,
                total: 0,
                cur_page: 1,
                pageSize: 10,
                statusOptions:[{
                    value:'',
                    label:'全部'
                },{
                    value:0,
                    label:'待审核'
                },{
                    value:1,
                    label:'通过'
                },{
                    value:2,
                    label:'不通过'
                }],
                regionOptions:[],
                tempCounter:0,
                counter:0,
            }
        },
        methods: {
            formatStatus(status){
                if (status || status==0){
                    if(status==2){
                        return '不通过';
                    }else if(status==1){
                        return '通过';
                    }else if(status==0){
                        return '待审核';
                    }
                }
                return '';
            },
            formatOperationType(operationType){
                return operationType?(operationType==1?'入库':operationType==2?'出库':''):'';
            },
            handleSizeChange(val) {
                // 改变每页显示的条数
                this.pageSize = val
                // 注意：在改变每页显示的条数时，要将页码显示到第一页
                this.cur_page = 1
                this.pageList();
            },
            handleCurrentChange(val) {
                this.cur_page = val;
                this.pageList();
            },
            getIndex(index) {
                let curPage = this.cur_page;
                let limitPage = this.pageSize;
                return (index + 1) + (curPage - 1) * limitPage;
            },
            searchData(){
                this.cur_page = 1;
                this.pageList();
            },
            handleChange(value) {
                this.search.regionCode = value[value.length-1];
            },
            allCheck() {
                var self = this;
                if (self.allChecked) {
                    for (var i = 0; i < self.dataList.length; i++) {
                        if (
                            self.dataList[i].checked == false &&
                            self.dataList[i].status == 0
                        ) {
                            self.dataList[i].checked = true;
                        }
                    }
                } else {
                    for (var i = 0; i < self.dataList.length; i++) {
                        if (
                            self.dataList[i].checked &&
                            self.dataList[i].status == 0
                        ) {
                            self.dataList[i].checked = false;
                        }
                    }
                }
                this.getItemSelOption();
            },
            itemCheck(){
                this.getItemSelOption();
            },
            getItemSelOption(){
                var selData = [];
                for (let i = 0; i < this.dataList.length; i++) {
                    if(this.dataList[i].checked){
                        selData.push(this.dataList[i]);
                    }
                }
                this.selOptionData = selData;
            },
            batchToExamine(status){
                this.getItemSelOption();
                if(this.selOptionData.length<1){
                    this.$message.info("至少选择一项!");
                    return;
                }
                this.$confirm('是否确认批量审核', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,
                    type: 'warning'
                }).then(() => {
                    this.counter = this.selOptionData.length;
                    for (let i = 0; i < this.selOptionData.length; i++) {
                        this.submitExamine(status,this.selOptionData[i]);
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消批量审核'
                    });
                });
            },
            getRegionChildrenList(){
                var _this=this;
                /*_this.$axios.get('/api/regulatory/regionInfo/getRegionChildrenList',{params:{
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
                });*/
                let params = new URLSearchParams();
                params.append("regionId", "0");
                _this.$axios.post("/api/regulatory/regionInfo/getRegionTree/", params).then(
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
            pageList(){
                var _this=this;
                var params = new URLSearchParams();
                params.append('page', _this.cur_page);
                params.append('limit', _this.pageSize);
                params.append('entName', _this.search.entName);
                params.append('status', _this.search.status);
                params.append('regionCode', _this.search.regionCode);
                _this.$axios.get('/api/regulatory/entFont/selectStorageStandingBookRecordPageList',{params}).then(
                    function (res) {
                        if(res.code == 0){
                            _this.dataList = res.data.records;
                            _this.totalPage = res.data.pages;
                            _this.total = res.data.total;
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    console.log(error);
                });
            },
            toExamine(status,item){
                this.$confirm('是否确认审核', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,
                    type: 'warning'
                }).then(() => {
                    this.counter=1;
                    this.submitExamine(status,item);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消审核'
                    });
                });
            },
            submitExamine(status,item){
                var _this=this;
                return new Promise(function (resolve, reject) {
                    var params = new URLSearchParams();
                    params.append('oldBookId', item.oldBookId);
                    params.append('recordBookId', item.id);
                    params.append('status', status);
                    let url = '/api/regulatory/entFont/toExamineStorageStandingBookRecordSecond';
                    _this.$axios.get(url,{params}).then(
                        function (res) {
                            if(res.code == 0){
                                _this.tempCounter+=1;
                                if(_this.tempCounter==_this.counter){
                                    _this.$message.success("审核成功!");
                                    _this.pageList();
                                    _this.init();
                                }
                                resolve();
                            }else{
                                _this.pageList();
                                _this.init();
                                _this.$message.error(res.msg);
                            }
                        }
                    ).catch((error) => {
                        this.pageList();
                        this.init();
                        console.log(error);
                    });
                });
            },
            init(){
                this.selOptionData = [];
                this.allChecked = false;
                this.tempCounter = 0;
                this.counter = 0;
            }
        },
        mounted() {
            this.init();
            this.getRegionChildrenList();
            this.searchData();
        },
        created() {
        }
    }
</script>

<style scoped>

</style>