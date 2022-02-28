<template>
    <div class="main">
        <div class="main-top">
            <div class="breadcrumb">
                <a href="#"><i class="icon icon-zhuanyijihuajianguan menu-icon"></i>运输管理</a><span class="sep">&gt;</span><span
                    class="text-primary">司机管理</span>
            </div>
        </div>
        <div class="panel">
            <div class="panel-bd pdtlr-0">
               <!-- <div class="filter-more" style="height: 60px;">-->
                <div class="" style="height: 60px;">
                    <ul class="filter-box">
                        <li class="filter-item" style="margin-right: 10px;">
                            <div class="panel-hd">
                                <div style="">
                                    <el-form :inline="true" class="demo-form-inline">
                                        <el-form-item style="float: right;" >
                                            <el-button type="primary"  @click="addDriver()">新增</el-button>
                                        </el-form-item>
                                        <el-form-item style="float: right;" >
                                            <el-button type="primary"  @click="query(1)">查询</el-button>
                                        </el-form-item>

                                        <el-form-item style="float: right;height: 50px; display:flex;align-items:stretch" label="车牌号:">
                                            <el-input  v-model="carNo" placeholder="请输入车牌号"   style="width: 130px;" ></el-input>
                                        </el-form-item>

                                        <el-form-item style="float: right;height: 50px; display:flex;align-items:stretch" label="联系电话:">
                                            <el-input  v-model="phone" placeholder="请输入联系电话"   style="width: 130px;" ></el-input>
                                        </el-form-item>

                                        <el-form-item style="float: right;height: 50px; display:flex;align-items:stretch" label="司机姓名:">
                                            <el-input  v-model="name" placeholder="请输入司机姓名"   style="width: 130px;" ></el-input>
                                        </el-form-item>

                                    </el-form>
                                </div>
                            </div>
                        </li>
                     </ul>
                </div>

        <!--列表-->
                <table class="table-default ">
            <thead>
            <tr>
                <th style="text-align:center;width: 80px">编号</th>
                <th style="text-align:center">司机姓名</th>
                <th style="text-align:center">联系电话</th>
                <th style="text-align:center">证件号</th>
                <th style="text-align:center">绑定车辆</th>
                <th style="text-align:center">所属企业</th>

                <th style="text-align:center">准驾车型</th>
                <th style="text-align:center">准驾证号</th>
                <th style="text-align:center">有效期</th>

                <th style="text-align:center">状态</th>
                <th style="text-align:center">操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item  in tableData">
                <td style="text-align:center;width: 80px">{{item.rownum}}</td>
                <td style="text-align:center">{{item.name}}</td>
                <td style="text-align:center">{{item.phone}}</td>
                <td style="text-align:center">{{item.idNo}}</td>
                <td style="text-align:center">{{item.carNo}}</td>
                <td style="text-align:center">{{item.entName}}</td>

                <td style="text-align:center">{{item.driveLevel}}</td>
                <td style="text-align:center">{{item.driveNo}}</td>
                <td style="text-align:center">{{item.driveExpire}}</td>

                <td style="text-align:center">{{item.status}}</td>
                <td style="text-align:center" >
                    <span v-if="item.carNo">
                        <span   style = "font-size: 16px;" >已配车辆</span> &nbsp;
                    </span>
                    <span v-else>
                        <el-link  type="primary" style = "font-size: 16px;" @click="setCar(item.id)">分配车辆</el-link> &nbsp;&nbsp;
                    </span>
                <!--    <el-link type="primary" style = "font-size: 16px;" @click="connectEntDriver(item.id)">关联产废企业</el-link> &nbsp;&nbsp;-->
                 <!--  <el-link type="primary" style = "font-size: 16px;" @click="updateByid(item.id)">编辑</el-link>-->
                  <!--   <el-link type="primary" style = "font-size: 16px;" class="btn"
                             @click="itemMousemove($event,item.id)"
                             @mouseover="itemMouseover"
                             @mouseout="itemMouseout"
                    >更多>></el-link>-->
                    <!--<div  class="special_focus_toolTip focus_toolTip" id = 'appendDiv' v-html="toolTopbody"></div>-->
                  <!--  @click="deleteByid(item.id)"-->
                </td>
            </tr>
            </tbody>
        </table>

        <div class="el-pagination is-background mt-lg">
            <span class="el-pagination__total">共 {{total}} 条，每页显示</span>
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

        <dialog class="connectEntDialog" style="display: none;width:870px;height: 600px ;position: absolute; left: 0%; top: 15%; padding-left: 20px ;padding-top: 50px"  >
            <connectEnt v-on:close="closeConnect" :message = totalPersonId ref="mychild"></connectEnt>
        </dialog>

        <!--<dialog class="setCarDialog" style="display: none;width:870px;height: 600px ;position: absolute; left: 0%; top: 15%; padding-left: 20px ;padding-top: 50px"  >-->
         <el-dialog title="分配车辆"  width="600px" max-height="870px" :visible.sync="dialogDriver" :destroy-on-close="true" :modal-append-to-body="false"   :modal="false">
             <template>
                <setCar v-on:close="closeAdd"  ref="setCar"></setCar>
             </template>
         </el-dialog>
    </div>
    </div>
        <addDriver v-on:close="closeAdd" ref="myFirstchild"></addDriver>
    </div>
</template>

<script>
    import  addDriver from "./addDriver";
    import connectEnt from "./connectEnt";
    import setCar from "./setCar";
    export default {
        components:{
            addDriver,connectEnt,setCar
        },
        name: "DriverList",
        data(){
            return{
                dialogDriver:false,
                carNo:'',
                phone:'',
                name:'',
                idd:'',
                toolTopbody:'',
                totalPersonId:'',
                total:0,
                totalPage:0,
                cur_page: 1,
                pageSizes: this.AppConfig.appInfo.pageSizes,
                pageSize: this.AppConfig.appInfo.pageSize,
                tableData:[],
                ruleType:this.AppConfig.appInfo.loginType,
                countUsed:''
            }
        },
        mounted() {
            this.query();
        },
        methods:{
            handleSizeChange(val) {
                // 改变每页显示的条数
                this.pageSize=val
                // 注意：在改变每页显示的条数时，要将页码显示到第一页
                this.cur_page=1
                this.query();
            },
            handleCurrentChange(val) {
                this.cur_page = val;
                this.query();
            },
            getIndex(index){
                let curPage = this.cur_page;
                let limitPage = this.pageSize;
                return (index+1) + (curPage - 1) * limitPage;
            },

            query(num) {
                var that = this;
                var url = '/api/regulatory/DriverM/personList';
                var str = ''
                if(that.ruleType == 2){
                    str = 5
                }else if(that.ruleType == 3){
                    str = 8
                }else{
                    str = 9999    /* 14和15 都查*/
                }
                if(num){
                    that.cur_page = 1
                }
                that.$axios.get(url, {
                    params: {
                        pageNum:that.cur_page,
                        pageSize:that.pageSize,
                        name:that.name,
                        phone:that.phone,
                        str:str,
                        carNo:that.carNo,
                    }
                }).then(
                    function (res) {
                        if(res.code == 0){
                            that.tableData = res.data.list;
                            that.totalPage = res.data.totalPage;
                            that.total = res.data.totalCount;
                            var num = that.pageSize * (that.cur_page-1)
                            for (var i = 0 ; i< res.data.list.length ; i++){
                                res.data.list[i].rownum = Number(num) + Number(res.data.list[i].rownum)
                            }
                            // that.countUsed =  res.data.list[0].countUsed;
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    console.log(error);
                });
            },

            addDriver(){
                /*var addDriverDialog = $(".addDriverDialog");
                addDriverDialog.css("display", "block");*/
                this.$refs.myFirstchild.flag = false;
                this.$refs.myFirstchild.titleName = "新增驾驶员";
                this.$refs.myFirstchild.getCarOptions();
                this.$refs.myFirstchild.dialogVisible = true;
            },
            connectEntDriver(id){
                this.totalPersonId = id;
                this.$refs.mychild.selectCanBanding(id)
                this.$refs.mychild.selectBanded(id);
                var connectEntDialog = $(".connectEntDialog");
                connectEntDialog.css("display", "block");
            },

            closeDialog(){
                this.setCarDialog = false
            },
            setCar(id){
                this.dialogDriver = true ;
                this.$nextTick(() => {
                    this.$refs.setCar.queryCar(id)
                })
                // this.dialogDriver = true ;
                // this.$refs.myCarchild.queryCar(id)
            },

            updateByid(id){
                /*var addDriverDialog = $(".addDriverDialog");
                addDriverDialog.css("display", "block");*/
                this.$refs.myFirstchild.flag = true;
                this.$refs.myFirstchild.titleName = "编辑驾驶员";
                this.$refs.myFirstchild.selectOneById(id)
            },

            closeAdd(){
                this.query()
               /* var addDriverDialog = $(".addDriverDialog");
                addDriverDialog.css("display", "none");*/
                this.dialogDriver = false
               /* var setCarDialog = $(".setCarDialog");
                setCarDialog.css("display", "none");*/
            },
            closeConnect(){
                this.query();
                var connectEntDialog = $(".connectEntDialog");
                connectEntDialog.css("display", "none");
            },
            deleteByid(id){
                var that = this;
                var url = '/api/regulatory/DriverM/driverDeleteById';
                that.$axios.get(url, {
                    params: {
                        id:id,
                    }
                }).then(
                    function (res) {
                        if(res.code == 0){
                            that.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            that.query();
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                });
            },

            itemMouseover: function() {
                var focusTooltip = $(".focus_toolTip");
                focusTooltip.css("display", "block");
            },

            itemMouseout: function() {
                var focusTooltip = $(".focus_toolTip");
                focusTooltip.css("display", "none");
            },

            itemMousemove: function(e,id) {
                var self = this;
                self.idd = id
                var focusTooltip = $(".focus_toolTip");
                focusTooltip.css("top", e.clientY - 90 + "px");
                focusTooltip.css("left", e.clientX + 110 + "px");
                var headerHtml =
                   /* "<div class = 'fontClass password'>重置密码</div>"+*/
                    "<div class = 'fontClass delect'>删除数据</div>"+
                    "<div class = 'fontClass  quxiao' >取消</div>";
                self.toolTopbody = headerHtml
                var focusTooltip = $(".focus_toolTip");
                focusTooltip.css("display", "block");
                $("body").on("click",".password",function(){
                    self.open2(self.idd)
                })
                $("body").on("click",".delect",function(){
                    self.open(self.idd)
                })
                $("body").on("click",".quxiao",function(){
                    var focusTooltip = $(".focus_toolTip");
                    focusTooltip.css("display", "none");
                })
            },
            //重置密码
            password(id){
                var that = this;
                var url = '/api/enterprise/sysUser/resetPassword?id='+id;
                that.$axios.post(url, {
                }).then(
                    function (res) {
                        if(res.code == 0){
                            that.$message.success("密码已重置!");
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    that.$message.error("密码重置失败!");
                });
            },
            //删除提示
            open(id) {
                var that = this;
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,
                    type: 'warning'
                }).then(() => {
                    that.deleteByid(id);
                    that.query();

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            //重置密码提示
            open2(id) {
                var that = this;
                this.$confirm('此操作将永久改变该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,
                    type: 'warning'
                }).then(() => {
                    that.password(id);
                    that.query();

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消重置密码'
                    });
                });
            }

        }
    }
</script>

<style scoped>


    .total-num {
        line-height: 42px;
    }
    .total-num span {
        font-size: 30px;
        margin-right: 10px;
    }
    .buttonStyle {
        margin-left: 15px;
    }
    .special_focus_toolTip {
        text-align: left;
        z-index: 7;
        position: absolute;
        display: none;
        width: 100px;
        height: 80px;
        border-style: solid;
        transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1),
        top 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        background-color: rgba(50, 50, 50, 0.701961);
        border-width: 0px;
        border-color: #333333;
        border-radius: 4px;
        color: #ffffff;
        font-style: normal;
        font-variant: normal;
        font-weight: normal;
        font-stretch: normal;
        font-size: 14px;
        font-family: "Microsoft YaHei";
        line-height: 21px;
        padding: 10px 10px;
        margin-left: -400px;
        margin-top: 30px;
    }
    .fontClass{
        font-size:12px;color: #fec443;font-weight: bold;font-family: MicrosoftYaHei;
    }


</style>