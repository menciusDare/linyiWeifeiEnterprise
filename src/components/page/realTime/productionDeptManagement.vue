<template>
    <!-- 主体 -->
    <div class="main">
        <div class="main-top">
            <div class="breadcrumb">
                <a href="#"><i class="icon icon-zhihuijianguan menu-icon"></i>企业管理</a><span class="sep">&gt;</span><span
                    class="text-primary">产废部门管理</span>
            </div>
        </div>
        <div class="panel">
            <div class="panel-bd">
                <!-- 收起后样式名.filter-more-mini -->
                <div style="padding: 20px 0px 0 2px;">
                    <ul class="filter-box">
                        <li class="filter-item">
                            <div class="filter-label">产废部门名称：</div>
                            <div class="filter-con">
                                <div class="el-input w180 el-input-group el-input--prefix">
                                    <input type="text" autocomplete="off" placeholder="产废部门名称" v-model="search.deptName" class="el-input__inner" >
                                </div>
                            </div>
                        </li>

                        <li class="filter-item">
                            <div class="filter-label">状态：</div>
                            <div class="filter-con">
                                <div class="el-select w124">
                                    <el-select v-model="search.status" >
                                        <el-option
                                                v-for="item in satusList"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-label">管理员：</div>
                            <div class="filter-con">
                                <div class="el-input w180 el-input-group el-input--prefix">
                                    <input type="text" autocomplete="off" placeholder="管理员" v-model="search.adminName" class="el-input__inner">
                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-label">联系电话：</div>
                            <div class="filter-con">
                                <div class="el-input w180 el-input-group el-input--prefix">
                                    <input type="text" autocomplete="off" placeholder="联系电话" v-model="search.adminPhone" class="el-input__inner">
                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-btn">
                                <!--<button type="button" @click="show" class="button-type"><span>查询</span></button>-->
                                <el-button type="button" size="medium"  @click="show" class="el-button el-button--primary">
                                    <span>查询</span></el-button>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-btn" >
                              <!--  <button type="button" @click="insertStorage" class="button-type"><span>新增贮存间</span></button>-->
                                <el-button type="button" size="medium"  @click="insertStorage" class="el-button el-button--primary">
                                    <span>新增</span></el-button>
                            </div>
                        </li>
                    </ul>
                </div>
                <table class="table-default table-full">
                    <thead>
                    <tr>
                        <th style="text-align:center;width: 6%">序号</th>
                        <th style="text-align:center;width: 10%">产废部门名称</th>
                        <th style="text-align:center;width: 10%">管理员</th>
                        <th style="text-align:center;width: 8%">联系电话</th>
                        <th style="text-align:center;width: 10%">创建时间</th>
                        <th style="text-align:center;width: 5%">状态</th>
                        <th style="text-align:center;width: 10%">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in dataList" :key="index">
                        <td style="text-align:center;width: 6%">{{(cur_page-1)*pageSize+index+1}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.storageTypeName">{{item.deptName}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.personLiable">{{item.adminName}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.phone">{{item.adminPhone}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.updateBy">{{item.createdTime}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.updateTime">{{item.deleteFlag==0?'启用':'停用'}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" >
                            <div class="btn-opreate">
                                <a @click="updateStorage(item)" href="javascript:;" class="text-primary text-underline">编辑</a>
                                <a @click="stopProductWasteDept(item)" href="javascript:;" class="text-primary text-underline">{{item.deleteFlag != 1 ? '停用':'启用'}}</a>
                            </div>
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
            <el-dialog :modal-append-to-body="false" :close-on-click-modal="false" :title="titleName" top="9vh" :visible.sync="dialogVisible" width="800px" @close="closeDia">
                <div>
                    <el-form ref="formFacilities" label-width="150px" :model="productionWasteDept" :rules="listRules">
                        <tr>
                            <td>
                                <el-form-item label="产废部门名称" prop="deptName" :rules="listRules.deptName">
                                    <el-input v-model="productionWasteDept.deptName" style="width: 200px" placeholder="产废部门名称" ></el-input>
                                </el-form-item>
                            </td>
                            <td>
                                <el-form-item label="管理员" prop="adminName" :rules="listRules.adminName">
                                    <el-input v-model="productionWasteDept.adminName" style="width: 200px" placeholder="管理员" ></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <el-form-item label="联系电话" prop="adminPhone"  :rules="listRules.adminPhone">
                                    <el-input v-model="productionWasteDept.adminPhone" style="width: 200px" placeholder="联系电话" ></el-input>
                                </el-form-item>
                            </td>
                         
                        </tr>
                    </el-form>
                    <div slot="footer" class="dialog-footer" style="text-align: center;">
                        <el-button type="primary" @click="insertForm('formFacilities')" v-if="titleName=='新增产废部门'">保存</el-button>
                        <el-button type="primary" @click="upForm('formFacilities')"  v-if="titleName=='编辑产废部门'">保存</el-button>
                        <el-button @click="closeDia">取 消</el-button>
                    </div>
                </div>
            </el-dialog>
        </div>

    </div>
</template>

<script>
    import loadBMap from '../../../components/common/unit/loadBMapApi'
    export default {
        name: "storageFacilityMonitoring",
        data(){
            var checkPhone = (rule, value, callback) => {
                if (value==""||value==null){
                    callback();
                }else {
                    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
                    console.log(reg.test(value));
                    if (reg.test(value)) {
                        callback();
                    } else {
                        return callback(new Error('请输入正确的手机号'));
                    }
                }
            };
            // var checkName = (rule, value, callback) => {
            //     var _this = this;
            //     if (value==null||value==""){
            //         callback();
            //     }else {
            //         var _this=this;
            //         _this.$axios.get('/api/regulatory/tStorageFacilities/showOnlyFacilitiesName?facilitiesName='+value).then(
            //             function (res) {
            //                 if(res.code == 0){
            //                     if (!res.data) {
            //                         callback();
            //                     } else {
            //                         return callback(new Error('贮存间名称已存在，请重新输入！'));
            //                     }
            //                 }
            //             }
            //         ).catch((error) => {
            //             console.log(error);
            //         });
            //     }
            // };
            return {
                dialogVisible:false,
                total:0,
                totalPage:0,
                cur_page: 1,
                pageSizes: this.AppConfig.appInfo.pageSizes,
                pageSize: this.AppConfig.appInfo.pageSize,
                dataList: [],
                satusList: [{
                    value: '-1',
                    label: '全部'
                }, {
                    value: '0',
                    label: '启用'
                }, {
                    value: '1',
                    label: '停用'
                },],
                search:{
                    deptName:'',
                    status: '-1',
                    adminName:'',
                    adminPhone:'',
                    page: 1,
                    limit : 10,　
                },
                titleName : '',
  
                productionWasteDept:{
                 deptName:'',
                 adminName:'',
                 adminPhone:''
                },
                listRules:{
                    deptName:[{required:true,message:'请输入产废部门名称',trigger:'blur'},
                    // {validator: checkName, trigger: 'blur'}
                    ],
                    adminName:[{required:true,message:'请输入管理员',trigger:'blur'}],
                    adminPhone:[{required:true,message:'请输入联系电话',trigger:'blur'},{validator: checkPhone, trigger: 'blur'}],
                },
                rules:{},
            }
        },
        created: function () {
            this.pageList()
        },
        methods: {

            handleSizeChange(val) {
                // 改变每页显示的条数
                this.pageSize=val
                // 注意：在改变每页显示的条数时，要将页码显示到第一页
                this.cur_page=1
                this.pageList();
            },
            handleCurrentChange(val) {
                this.cur_page = val;
                this.pageList();
            },
            getIndex(index){
                let curPage = this.cur_page;
                let limitPage = this.pageSize;
                return (index+1) + (curPage - 1) * limitPage;
            },
            show(){
                var _this=this;
                _this.cur_page = 1;
                _this.pageSize = 10;
                _this.pageList();
            },
            pageList(){
                var _this=this;
                var params = new URLSearchParams();
                params.append('pageSize', _this.cur_page);
                params.append('currentPage', _this.pageSize);
                params.append('deptName', _this.search.deptName);
                params.append('adminName', _this.search.adminName);
                params.append('adminPhone', _this.search.adminPhone);
                params.append('status', _this.search.status);
                _this.$axios.get('/api/regulatory/tEnterpriseProductDept/getProductWasteDeptPage',{params}).then(
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

            updateStorage(item){
                var _this = this;
                _this.titleName = "编辑产废部门";
                _this.productionWasteDept = item;


                _this.dialogVisible = true;
            },
            insertStorage(){
                var _this = this;
                _this.titleName = "新增产废部门";
                _this.dialogVisible = true;
            },

            closeDia(){
                var _this = this;
                _this.$nextTick(() => {
                this.productionWasteDept={
                     deptName:'',
                     adminName:'',
                    adminPhone:''
                }
                 _this.dialogVisible = false;

                _this.$refs['formFacilities'].clearValidate();
                });
            },
            insertForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var _this=this;
                        _this.$axios.post('/api/regulatory/tEnterpriseProductDept/addProductionWasteDept',_this.productionWasteDept).then(
                            function (res) {
                                if(res.code == 0){
                                    _this.$message({
                                        message: res.msg,
                                        type: 'success'
                                    });
                                }else{
                                    _this.$message.error(res.msg);
                                }
                                _this.closeDia();
                                _this.pageList();
                            }
                        ).catch((error) => {
                            // catch 指请求出错的处理
                            _this.$message.error("添加失败！");
                        });
                    } else {
                        return false;
                    }
                });
            },
            upForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var _this=this;
                        _this.$axios.post('/api/regulatory/tEnterpriseProductDept/updateProductionWasteDept',_this.productionWasteDept,{
                            headers:{
                                'Content-Type':'application/json'
                            }
                        }).then(
                            function (res) {
                                if(res.code == 0){
                                    _this.$message({
                                        message: res.msg,
                                        type: 'success'
                                    });

                                }else{
                                    _this.$message.error(res.msg);
                                }
                                _this.closeDia();
                                _this.pageList();
                            }
                        ).catch((error) => {
                            // catch 指请求出错的处理
                            _this.$message.error("修改失败！");
                        });
                    } else {
                        return false;
                    }
                });
            },

            stopProductWasteDept(item){
                var _this=this;
                _this.$confirm(item.deleteFlag == 1?'此操作将启用该产废部门, 是否继续?':'此操作将停用该产废部门, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,
                    type: 'warning'
                }).then(() => {
                    var params = new URLSearchParams();
                    params.append('id', item.id);
                    params.append('status', item.deleteFlag == 1?0:1);
                    _this.$axios.post('/api/regulatory/tEnterpriseProductDept/stopProductionWasteDept',params).then(
                        function (res) {
                            if(res.code == 0){
                                _this.$message({
                                    message: res.msg,
                                    type: 'success'
                                });
                            }else{
                                _this.$message.error(res.msg);
                            }
                            _this.pageList();
                        }
                    ).catch((error) => {
                        // catch 指请求出错的处理
                        _this.$message.error("操作失败！");
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            }
        }
    }
</script>

<style scoped>
    .allmap{
        width:100%;
        height:600px;
        position:relative;
        padding: 61px 10px 10px 10px;background: #ffffff;
    }
    .button-type{
        width: 100px;
        height: 35px;
        background: #33a7e1;
        font-weight: 500;
        color: white;
        border: 1px solid #FFFFFF;
        border-radius: 4px;
    }
    /* 去掉地图左下角的百度LOGO */
    .anchorBL {
        display:none
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #F8F8F8;
    }
    .grid-content {
        min-height: 40px;
    }
    .appeal{
        line-height: 40px;
        /*设置为伸缩容器*/
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        /*垂直居中*/
        -webkit-box-align: center;/*旧版本*/
        -moz-box-align: center;/*旧版本*/
        -ms-flex-align: center;/*混合版本*/
        -webkit-align-items: center;/*新版本*/
        align-items: center;/*新版本*/
    }
    .appeal2{
        line-height: 40px;
        /*设置为伸缩容器*/
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        /*垂直居中*/
        -webkit-box-align: center;/*旧版本*/
        -moz-box-align: center;/*旧版本*/
        -ms-flex-align: center;/*混合版本*/
        -webkit-align-items: center;/*新版本*/
        align-items: center;/*新版本*/
    }
    .el-dialog__body {
        padding: 30px 20px;
        color: #606266;
        font-size: 14px;
        word-break: break-all;
        background-color: #F8F8F8;
    }
</style>
