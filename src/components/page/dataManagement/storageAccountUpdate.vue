<template>
    <!-- 内容区域 -->
    <div class="main">
        <div class="main-top">
            <div class="breadcrumb">
                <a href="#"><i class="icon icon-shenbaodengji menu-icon"></i>数据管理</a><span class="sep">&gt;</span><span
                    class="text-primary">贮存台账修改</span>
            </div>
        </div>
        <div class="panel">
            <div class="panel-bd">
                <div style="padding: 20px 0px 0 2px;">
                    <ul class="filter-box">
                        <li class="filter-item">
                            <div class="filter-label">贮存时间：</div>
                            <div class="filter-con">
                                <div class="el-select " style="width: 400px !important;">
                                    <el-date-picker
                                            v-model="search.tims"
                                            type="datetimerange"
                                            range-separator="-"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期">
                                    </el-date-picker>
                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-label">操作类型：</div>
                            <div class="filter-con">
                                <div class="el-select w124">
                                    <el-select v-model="search.operationType" clearable>
                                        <el-option
                                                v-for="item in operationOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-label">危废类别：</div>
                            <div class="filter-con">
                                <div class="el-select w124">
                                    <el-select v-model="search.typeId" clearable >
                                        <el-option label="全部" value=""></el-option>
                                        <el-option
                                                v-for="item in dicTypes"
                                                :key="item.id"
                                                :label="item.typeName"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-label">关键字：</div>
                            <div class="filter-con">
                                <div class="el-input el-input-group el-input--prefix" style="  width: 245px !important;">
                    <span class="el-input__prefix"><i class="el-input__icon el-icon-search"></i>
                    </span><input type="text" autocomplete="off" placeholder="危废名称、危废代码" v-model="search.keyWord"
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
                    </ul>
                </div>
                <table class="table-default">
                    <thead>
                    <tr>
                        <th style="text-align:center;width: 6%">序号</th>
                        <th style="text-align:center;width: 14%">贮存时间</th>
                        <th style="text-align:center;width: 14%">操作类型</th>
                        <th style="text-align:center;width: 10%">危废名称</th>
                        <th style="text-align:center;width: 10%">危废代码</th>
                        <th style="text-align:center;width: 10%">危废类别</th>
                        <th style="text-align:center;width: 10%">数量(KG)</th>
                        <th style="text-align:center;width: 10%">贮存容器</th>
                        <th style="text-align:center;width: 10%">容器个数</th>
                        <th style="text-align:center;width: 10%">经办人</th>
                        <th style="text-align:center;width: 15%">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,i)  in dataList">
                        <td style="text-align:center;width: 6%">{{pageSize*(cur_page-1)+i+1}}</td>
                        <td
                                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 14%"
                                :title="item.storageTime"
                        >{{item.storageTime}}</td>
                        <td
                                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                                :title="formatOperationType(item.operationType)"
                        >{{formatOperationType(item.operationType)}}</td>
                        <td
                                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                                :title="item.dictDetailName"
                        >{{item.dictDetailName}}</td>
                        <td
                                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                                :title="item.dictDetailCode.split('#')[0]"
                        >{{item.dictDetailCode.split("#")[0]}}</td>
                        <td
                                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                                :title="item.dictTypeName"
                        >{{item.dictTypeName}}</td>
                        <td
                                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                                :title="item.number"
                        >{{item.number}}</td>
                        <td
                                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                                :title="item.containerName"
                        >{{item.containerName}}</td>
                        <td
                                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                                :title="1"
                        >1</td>
                        <td
                                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                                :title="item.userName"
                        >{{item.userName}}</td>
                        <td style="text-align:center;width: 15%">
                            <a
                                    href="javascript:;"
                                    class="text-primary text-underline"
                                    @click="details(item)"
                            >查看</a>
                            <a
                                    v-if="item.upBookId==null && item.deBookId ==null"
                                    href="javascript:;"
                                    class="text-primary text-underline"
                                    @click="upProBook(item)"
                            >修改</a>
                            <a
                                    v-if="item.operationType==1 && item.upBookId==null && item.deBookId ==null"
                                    href="javascript:;"
                                    class="text-primary text-underline"
                                    @click="delProBook(item)"
                            >删除</a>
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

        <!--look-->
        <lookProBook ref="lookProBook"></lookProBook>
        <!--update-->
        <updateProBook ref="updateProBook"></updateProBook>
    </div>
</template>

<script>
    import updateProBook from "../standingBook/updateProBook"
    import lookProBook from "../standingBook/lookProBook"
    export default {
        name: "storageAccountUpdate",
        props: {},
        components: {updateProBook,lookProBook},
        computed: {},
        data() {
            return {
                regionCode:sessionStorage.getItem('regionCode'),
                roleType:sessionStorage.getItem('roleType'),
                search:{
                    entId:sessionStorage.getItem("entId"),
                    typeId:'',
                    operationType:'',
                    tims:'',
                    keyWord:'',
                },
                dataList: [],
                totalPage: 0,
                total: 0,
                cur_page: 1,
                pageSize: 10,
                operationOptions:[{
                    value:'',
                    label:'全部'
                },{
                    value:1,
                    label:'入库'
                },{
                    value:2,
                    label:'出库'
                }],
                dicTypes:[],
            }
        },
        methods: {
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
            searchData(){
                // 查询危废类型
                this.initType();
                this.cur_page = 1;
                this.pageList();
            },
            initType() {
                var _this = this;
                _this.$axios.get("/api/regulatory/type/getTypeNameList/1").then((res) => {
                    _this.dicTypes = res.data;
                });
            },
            handleChange(value) {
                this.search.regionCode = value[value.length-1];
            },
            getIndex(index) {
                let curPage = this.cur_page;
                let limitPage = this.pageSize;
                return (index + 1) + (curPage - 1) * limitPage;
            },
            pageList(){
                var _this=this;
                var params = new URLSearchParams();
                _this.$axios.post('/api/regulatory/tEnterpriseInfo/selectentErpriseSSBookUpdateData',{
                    page: _this.cur_page,
                    limit: _this.pageSize,
                    entId: _this.search.entId,
                    typeId: _this.search.typeId,
                    startDate: _this.search.tims?(_this.search.tims[0]).format('yyyy-MM-dd hh:mm:ss'):'',
                    entDate:_this.search.tims?(_this.search.tims[1]).format('yyyy-MM-dd hh:mm:ss'):'',
                    keyWord: _this.search.keyWord,
                    operationType: _this.search.operationType
                }).then(function (res) {
                    if(res.code == 0){
                        _this.dataList = res.data.records;
                        _this.totalPage = res.data.pages;
                        _this.total = res.data.total;
                    }else{
                        _this.$message.warning(res.msg);
                    }
                }).catch((error) => {
                    // catch 指请求出错的处理
                    console.log(error);
                });
            },
            details(item){
                this.$refs.lookProBook.openDialog(item);
            },
            upProBook(item){
                this.$refs.updateProBook.openDialog(item);
            },
            delProBook(item){
                this.$confirm('申请删除该台账, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,
                    type: 'warning'
                }).then(() => {
                    this.executeDel(item);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除申请'
                    });
                });
            },
            executeDel(item){
                var _this=this;
                var params = new URLSearchParams();
                _this.$axios.get('/api/regulatory/standingBookDelete/saveDeleteSSBookAppliCation/'+item.id).then(function (res) {
                    if(res.code == 0){
                        _this.$message.success("删除申请提交成功");
                        _this.searchData();
                    }else{
                        _this.$message.warning(res.msg);
                    }
                }).catch((error) => {
                    // catch 指请求出错的处理
                    console.log(error);
                });
            }
        },
        mounted() {
            this.searchData();
        },
        created() {
        }
    }
</script>

<style >
    .blackColor{
        cursor: default;
    }
</style>