<template>
    <!-- 内容区域 -->
    <div class="main">
        <div class="main-top">
            <div class="breadcrumb">
                <a href="#"><i class="icon icon-shenbaodengji menu-icon"></i>企业贮存台账修改</a><span class="sep">&gt;</span><span
                    class="text-primary">审核</span>
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
                                            v-model="search.regionCode"
                                            :options="regionOptions"
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
                                <!--<button type="button"  class="button-type"  @click="pageList">
                                    <span>查询</span></button>-->
                                <el-button type="button" size="medium"  @click="pageList" class="el-button el-button--primary">
                                    <span>查询</span></el-button>
                            </div>
                        </li>
                    </ul>
                </div>
                <table class="table-default">
                    <thead>
                    <tr>
                        <th style="text-align:center;width: 6%">序号</th>
                        <th style="text-align:center;width: 8%">企业名称</th>
                        <th style="text-align:center;width: 6%">所在地</th>
                        <th style="text-align:center;width: 8%">贮存时间</th>
                        <th style="text-align:center;width: 5%">操作类型</th>
                        <th style="text-align:center;width: 7%">危废名称</th>
                        <th style="text-align:center;width: 7%">危废代码</th>
                        <th style="text-align:center;width: 6%">危废类别</th>
                        <th style="text-align:center;width: 6%">数量(KG)</th>
                       <!-- <th style="text-align:center;width: 10%">贮存容器</th>
                        <th style="text-align:center;width: 6%">容器个数</th>-->
                        <th style="text-align:center;width: 8%">经办人</th>
                        <th style="text-align:center;width: 5%">审核状态</th>
                        <th style="text-align:center;width: 8%">申请时间</th>
                        <th style="text-align:center;width: 8%">申请人</th>
                        <th style="text-align:center;width: 10%">备注</th>
                        <th style="text-align:center;width: 15%">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,i)  in dataList">
                        <td style="text-align:center;width: 6%">{{pageSize*(cur_page-1)+i+1}}</td>
                        <td
                                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%"
                                :title="item.entName"
                        >{{item.entName}}</td>
                        <td
                                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 6%"
                                :title="item.regionName"
                        >{{item.regionName}}</td>
                        <td
                                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%"
                                :title="item.storageTime"
                        >{{item.storageTime}}</td>
                        <td
                                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 5%"
                                :title="item.operationType"
                        >{{item.operationType?item.operationType==1?'入库':item.operationType==2?'出库':"":null}}</td>
                        <td
                                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width:7%"
                                :title="item.dictDetailName"
                        >{{item.dictDetailName}}</td>
                        <td
                                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 7%"
                                :title="item.dictDetailCode.split('#')[0]"
                        >{{item.dictDetailCode.split("#")[0]}}</td>
                        <td
                                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 6%"
                                :title="item.dictTypeName"
                        >{{item.dictTypeName}}</td>
                        <td
                                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 6%"
                                :title="item.number"
                        >{{item.number}}</td>
                        <!--<td
                                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                                :title="item.containerName"
                        >{{item.containerName}}</td>
                        <td
                                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 6%"
                                :title="1"
                        >1</td>-->
                        <td
                                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%"
                                :title="item.userName"
                        >{{item.userName}}</td>
                        <td
                                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 5%"
                        >
                            <span v-if="item.deleteFlag==1">已审核</span>
                            <span v-if="item.deleteFlag==0">待审核</span>
                        </td>
                        <td
                                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%"
                                :title="item.updatedTime"
                        >{{item.updatedTime}}</td>
                        <td
                                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%"
                                :title="item.updatedByUserName"
                        >{{item.updatedByUserName}}</td>
                        <td
                                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                                :title="item.remark"
                        >{{item.remark}}</td>
                        <td style="text-align:center;width: 15%">
                            <a
                                    v-if="item.deleteFlag==0"
                                    href="javascript:;"
                                    class="text-primary text-underline"
                                    @click="toExamine(item)"
                            >审核</a>
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
    </div>
</template>

<script>
    export default {
        name: "productionBookUpdateRecord",
        props: {},
        components: {},
        computed: {},
        data() {
            return {
                regionCode:sessionStorage.getItem('regionCode'),//'371300',
                search:{
                    entName:'',
                    status:0,
                    regionCode:sessionStorage.getItem('regionCode'),
                },
                dataList: [],
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
                    label:'已审核'
                }],
                regionOptions:[]
            }
        },
        methods: {
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
            toExamine(item){
                this.$confirm('是否确认审核', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,
                    type: 'warning'
                }).then(() => {
                    this.submitExamine(item);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消审核'
                    });
                });
            },
            submitExamine(item){
                var _this=this;
                var params = new URLSearchParams();
                params.append('oldBookId', item.oldBookId);
                params.append('recordBookId', item.id);
                let url = '/api/regulatory/entFont/toExamineStorageStandingBookRecord';
                _this.$axios.get(url,{params}).then(
                    function (res) {
                        if(res.code == 0){
                            _this.$message.success("审核成功!");
                            _this.pageList();
                        }else{
                            _this.$message.error(res.msg);
                        }
                    }
                ).catch((error) => {
                    console.log(error);
                });
            }
        },
        mounted() {
            this.getRegionChildrenList();
            this.pageList();
        },
        created() {
        }
    }
</script>

<style scoped>

</style>