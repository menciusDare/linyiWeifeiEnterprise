<template>
    <div class="main" >
        <div class="main-top">
            <div class="breadcrumb">
                <a href="#"><i class="icon icon-zhuanyijihuajianguan menu-icon"></i>运输管理</a><span class="sep">&gt;</span><span
                    class="text-primary">车辆管理</span>
            </div>
        </div>

        <div class="panel">
            <div class="panel-bd pdtlr-0">
                <!--<div class="filter-more" style="height: 60px;">-->
                <div class="" style="height: 60px;">
                    <ul class="filter-box">
                        <li class="filter-item" style="margin-right: 10px;">
                            <el-form :inline="true" class="demo-form-inline">
                                <el-form-item style="float: right; display:flex;align-items:stretch" >
                                    <el-button type="primary"   @click="addCar">新增</el-button>
                                </el-form-item>
                                <el-form-item style="float: right; display:flex;align-items:stretch" >
                                    <el-button type="primary"   @click="query">查询</el-button>
                                </el-form-item>
                                <el-form-item style="float: right; display:flex;align-items:stretch" label="车牌号:">
                                    <el-input  v-model="carNo" placeholder="请输入车牌号"   style="width: 130px;" ></el-input>
                                </el-form-item>
                                <el-form-item style="float: right; display:flex;align-items:stretch" label="驾驶员姓名:">
                                    <el-input  v-model="driverName" placeholder="请输入驾驶员姓名"   style="width: 150px;" ></el-input>
                                </el-form-item>
                            </el-form>
                        </li>
                    </ul>
                </div>
                <!--列表-->
                    <table class="table-default ">
                        <thead>
                        <tr>
                            <th style="text-align:center;width: 80px">编号</th>
                            <th style="text-align:center">车牌号</th>
                            <th style="text-align:center">车辆类型</th>
                            <th style="text-align:center">车辆载重(KG)</th>
                           <!-- <th style="text-align:center">车辆识别码</th>-->
                            <th style="text-align:center">上牌日期</th>
                            <th style="text-align:center">年审到期日</th>
                            <th style="text-align:center">车主名</th>
                            <th style="text-align:center">联系电话</th>

                            <th style="text-align:center">分类</th>
                            <th style="text-align:center">状态</th>
                            <th style="text-align:center">许可证</th>
                            <th style="text-align:center">是否豁免</th>
                          <!--  <th style="text-align:center">当前驾驶员</th>-->
                            <th style="text-align:center">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item  in tableData">
                            <td style="text-align:center;width: 80px">{{item.rownum}}</td>
                            <td style="text-align:center">{{item.carNo}}</td>
                            <td style="text-align:center">{{item.dictDetailCode}}</td>
                            <td style="text-align:center">{{item.vehicleLoad}}</td>
                           <!-- <td style="text-align:center">{{item.code}}</td>-->
                            <td style="text-align:center">{{item.license}}</td>
                            <td style="text-align:center">{{item.due}}</td>
                            <td style="text-align:center">{{item.vehicleOwner}}</td>
                            <td style="text-align:center">{{item.phone}}</td>

                            <td style="text-align:center">{{item.vehicleClassify}}</td>
                            <td style="text-align:center">{{item.vehicleState}}</td>
                            <td style="text-align:center">{{item.roadPermit}}</td>
                            <td style="text-align:center">{{item.exempt}}</td>
                            <!--<td style="text-align:center" class="buttonStyle"
                                @mousemove="itemMousemove($event,'当前驾驶员',item.nameDriver,item.phoneDri)"
                                @mouseover="itemMouseover"
                                @mouseout="itemMouseout"
                                @click="bondDriver(item.id,item.nameDriver,item.phoneDri)">
                                {{item.nameDriver == null ? '分配司机': item.nameDriver}}&nbsp;
                                <el-button icon="el-icon-phone" circle v-if="item.nameDriver"></el-button>
                                <el-button icon="el-icon-setting" circle v-else></el-button>
                                <div  class="special_focus_toolTip focus_toolTip" v-html="toolTopbody"></div>
                            </td>-->
                            <!-- <td style="text-align:center" class="buttonStyle"
                                 @mousemove="itemMousemove($event,'当前押运员',item.nameEscort,item.phoneEsc)"
                                 @mouseover="itemMouseover"
                                 @mouseout="itemMouseout"
                                 @click="bondES(item.id,item.nameEscort,item.phoneEsc)">
                                 {{item.nameEscort}}&nbsp;<el-button icon="el-icon-phone" circle v-if="item.nameEscort"></el-button>

                                 <div  class="special_focus_toolTip focus_toolTip" v-html="toolTopbody"></div>
                             </td>-->
                            <td style="text-align:center" ><el-link type="primary" @click="updateByid(item.id)">编辑</el-link>
                                &nbsp;<el-link type="primary" @click="bondDriver(item.id,item.nameDriver,item.phoneDri)">分配司机</el-link>
                                &nbsp;<el-link type="primary" @click="bondSuper(item.id,item.nameSuper,item.phoneSuper)">分配押运员</el-link>
                                &nbsp;<el-link type="primary"@click="open(item.id)">删除</el-link></td>
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
            </div>
        </div>

        <!--绑定司机-->
       <!-- <dialog style="width: 600px;  max-height: 600px; padding-bottom: 80px ;position: absolute; left: 0%; top: 15%;" class = "dirverListClass">-->
        <el-dialog title="分配司机"  width="600px" max-height="800px" :visible.sync="dialogtf" :destroy-on-close="true" :modal-append-to-body="false"  @close="closeDia" :modal="false" >
            <template>
                <div style="height: 500px;overflow:auto">
                    <table class="table-default table-full">
                        <thead>
                        <tr>
                            <th style="text-align:center;width: 20%">已分配</th>
                            <th style="text-align:center;width: 40%">当前驾驶员：{{bondDriverHis.nameDriver}}</th>
                            <th style="text-align:center">联系电话：{{bondDriverHis.phoneDri}}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item  in tableDriverList" @click="chouse(item.id)" class="trClass" >
                            <td style="text-align:center;width: 80px">{{item.rownum}}</td>
                            <td style="text-align:center;width: 80px">{{item.name}}</td>
                            <td style="text-align:center">{{item.phone}}</td>

                        </tr>
                        </tbody>
                        <div class="filter-btn" style="margin-left:  30px">
                            <el-button type="button" class="el-button el-button--primary"@click="updateBond"><span>确认绑定</span></el-button>
                            <el-button type="button" class="el-button el-button--border" @click="closeDia"><span>取消</span></el-button>
                        </div>
                    </table>
                </div>
            </template>
        </el-dialog>

        <el-dialog title="分配押运员"  width="600px" max-height="800px" :visible.sync="dialogtfSup" :destroy-on-close="true" :modal-append-to-body="false"  @close="closeDia" :modal="false" >
            <template>
                <div style="height: 500px;overflow:auto">
                    <table class="table-default table-full">
                        <thead>
                        <tr>
                            <th style="text-align:center;width: 20%">已分配</th>
                            <th style="text-align:center;width: 40%">当前押运员：{{bondSuperHis.nameSuper}}</th>
                            <th style="text-align:center">联系电话：{{bondSuperHis.phoneSuper}}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item  in tableDriverList" @click="chouse(item.id)" class="trClass" >
                            <td style="text-align:center;width: 80px">{{item.rownum}}</td>
                            <td style="text-align:center;width: 80px">{{item.name}}</td>
                            <td style="text-align:center">{{item.phone}}</td>

                        </tr>
                        </tbody>
                        <div class="filter-btn" style="margin-left:  30px">
                            <el-button type="button" class="el-button el-button--primary"@click="updateBondSup"><span>确认绑定</span></el-button>
                            <el-button type="button" class="el-button el-button--border" @click="closeDia"><span>取消</span></el-button>
                        </div>
                    </table>
                </div>
            </template>
        </el-dialog>

        <!--<dialog class="addCarDialog" style="display: none;width:1000px;height: 700px ;position: absolute; left: 0%; top: 8%; padding-left: 60px ;padding-top: 50px"  >-->
        <el-dialog title="编辑车辆"  width="1000px" height="700px" :visible.sync="dialogtfVeh" :destroy-on-close="true" :modal-append-to-body="false"  @close="closeDia" :modal="false" >
            <template>
                <carAdd v-on:close="closeAdd" ref = "myFirstchild"></carAdd>
            </template>
        </el-dialog>

    </div>
</template>

<script>
    import carAdd from "./carAdd";
    export default {

    components:{
        carAdd
    },
        name: "VehicleList",
        data(){
            return{
                dialogtf:false,
                dialogtfVeh:false,
                dialogtfSup:false,
                driverName:'',
                escortName:'',
                entName:'',
                carNo:'',

                vehicleClassify:'',
                vehicleState:'',
                roadPermit:'',
                exempt:'',

                total:0,
                totalPage:0,
                cur_page: 1,
                pageSizes: this.AppConfig.appInfo.pageSizes,
                pageSize: this.AppConfig.appInfo.pageSize,
                ruleType:this.AppConfig.appInfo.loginType,
                tableData:[],
                form:{
                    carNo:"",
                    driverId:"",
                    escortId:"",
                    phone:""
                },
                dictDetailCodeList:[
                    {
                        label:'重型',
                        value:'1',
                    },
                    {
                        label:'中型',
                        value:'2',
                    },
                ],
                toolTopbody: "",
                bondDriverHis:{  //当前绑定的驾驶员  用于弹窗回显
                    carNo:"",
                    nameDriver:"",
                    phoneDri:"",
                    id:""//司机id
                },
                bondSuperHis:{  //当前绑定的押运员  用于弹窗回显
                    carNo:"",
                    nameSuper:"",
                    phoneSuper:"",
                    id:""//押运员id
                },
                tableDriverList:[],//当前企业可绑定司机列表

                bondESHis:{  //当前绑定的驾驶员  用于弹窗回显
                    carNo:"",
                    nameES:"",
                    phoneDri:"",
                    id:""//押运员id
                },
                tableESList:[],//当前企业可绑定押运员列表

                countUsed:'',
            }
        },
        mounted(){
            this.query();
        },
        methods:{

            closeDia(){
                this.dialogtf=false
                this.dialogtfVeh=false
                this.dialogtfSup=false
            },
            handleSizeChange(val) {
                // 改变每页显示的条数
                this.pageSize=val
                // 注意：在改变每页显示的条数时，要将页码显示到第一页
                this.cur_page=1
            },
            handleCurrentChange(val) {
                this.cur_page = val;
                this.loadingData();
            },
            getIndex(index){
                let curPage = this.cur_page;
                let limitPage = this.pageSize;
                return (index+1) + (curPage - 1) * limitPage;
            },

            query() {
                var that = this;
                var url = '/api/regulatory/vehicle/carList';

                that.$axios.post(url,{
                    pageNum:that.cur_page,
                    pageSize:that.pageSize,
                    phone: that.form.phone,
                    carNo: that.carNo,
                    driverName: that.driverName,
                    escortName: that.escortName,
                    entName: that.entName,
                }).then(
                    function (res) {
                        if(res.code == 0){
                            that.tableData = res.data.list;
                            that.totalPage = res.data.totalPage;
                            that.total = res.data.totalCount;
                            var num = that.pageSize * (that.cur_page-1)
                            for (var i = 0 ; i< res.data.list.length ; i++){
                                res.data.list[i].rownum = Number(num) + Number(res.data.list[i].rownum)
                                for(let j=0;j<that.dictDetailCodeList.length;j++){
                                    if(res.data.list[i].dictDetailCode==that.dictDetailCodeList[j].value){
                                       res.data.list[i].dictDetailCode =that.dictDetailCodeList[j].label
                                    }
                                }
                            }
                            that.countUsed =  res.data.list[0].countUsed;
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    console.log(error);
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

            itemMousemove: function(e,title,driver,phone) {
                var self = this;
                var focusTooltip = $(".focus_toolTip");
                focusTooltip.css("top", e.clientY - 80 + "px");
                focusTooltip.css("left", e.clientX + 150 + "px");
                var headerHtml =
                    "<div class = 'fontClass'>" + (title  == null ? '暂无数据': title )+ "</div>"+
                    "<div class = 'fontClass'>联系人："+ (driver == null ? '暂无数据':driver) +"</div>"+
                    "<div class = 'fontClass'>联系电话："+ (phone == null ? '':phone) +"</div>";
                var effectHtml =
                    "<div style='font-size:12px;margin-top:5px;'>" + "</div>";
                self.toolTopbody = headerHtml + effectHtml;
            },

            closeDriverC(){
                this.query()
                this.dialogtf = false
            },
            closeDriverS(){
                this.query()
                this.dialogtfSup = false
            },


            bondDriver(id,driverName,phone){  //点击司机 进行绑定操作
                var that = this;
                that.bondDriverHis.carNo=id;
                that.bondDriverHis.nameDriver=driverName;
                that.bondDriverHis.phoneDri =phone ;



                //打开弹窗
                that.dialogtf = true
                var ESListClass = $(".ESListClass");
                ESListClass.css("display", "none");
               //加载可绑定司机数据  role = 2  说明是司机
                that.$axios.get('/api/regulatory/vehicle/personSelect',{ }
                ).then(
                    function (res) {
                        if(res.code == 0){
                            that.tableDriverList = res.data;
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    console.log(error);
                });

            },

            bondSuper(id,driverName,phone){  //点击押运员 进行绑定操作
                var that = this;
                that.bondSuperHis.carNo=id;
                that.bondSuperHis.nameSuper=driverName;
                that.bondSuperHis.phoneSuper =phone ;



                //打开弹窗
                that.dialogtfSup = true
                var ESListClass = $(".ESListClass");
                ESListClass.css("display", "none");
               //加载可绑定押运员数据  role = 2  说明是押运员
                that.$axios.get('/api/regulatory/vehicle/personSelect?roleId=12',{ }
                ).then(
                    function (res) {
                        if(res.code == 0){
                            that.tableDriverList = res.data;
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    console.log(error);
                });

            },
/*
            chouse(id){  //选择新司机
                alert(id)
                this.bondDriverHis.id=id; //设置成当前选中的id
                this.bondESHis.id=id
                $('#trClass').parent().find("tr.focus").toggleClass("focus");//取消原先选中行
                $('#trClass').toggleClass("focus");//设定当前行为选中行
            },
*/
            chouse(id){  //选择押运员
                this.bondSuperHis.id=id; //设置成当前选中的id
                this.bondDriverHis.id=id;
                var is=event.currentTarget;
                $(is).parent().find('tr').removeClass("focus");
                $(is).addClass("focus")

            },

            updateBond(){   //绑定操作
                var that = this ;
                var carId = that.bondDriverHis.carNo
                var personId = that.bondDriverHis.id;
                var tip = "";

                that.$axios.get('/api/regulatory/vehicle/checkDriverCar?id='+personId,{}
                ).then(
                    function (res) {
                        if(res.code == 0){
                                if(res.data != null && res.data.car_no != '' && res.data.car_no != null && res.data.car_no != undefined){
                                    tip = '当前选中司机已绑定车辆"'+res.data.car_no+'",是否修改？'
                                }else{
                                    tip = '是否绑定当前选中司机？'
                                }

                                that.$confirm(tip, '确认信息', {
                                    distinguishCancelAndClose: true,
                                    closeOnClickModal: false,
                                    confirmButtonText: '保存',
                                    cancelButtonText: '放弃修改'
                                })
                                    .then(() => {
                                        that.$axios.get('/api/regulatory/vehicle/carChangeDriver?carId='+carId+'&&personId='+personId,{}
                                        ).then(
                                            function (res) {
                                                if(res.code == 0){
                                                    that.closeDriverC()
                                                }
                                            }
                                        ).catch(error => {
                                            // catch 指请求出错的处理
                                            console.log(error);
                                        });
                                    })
                                    .catch(action => {
                                        this.$message({
                                            type: 'info',
                                            message: action === 'cancel'
                                                ? '放弃保存并离开页面'
                                                : '停留在当前页面'
                                        })
                                    });

                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    console.log(error);
                });
            },

            updateBondSup(){   //绑定押运员操作
                var that = this ;
                var carId = that.bondSuperHis.carNo
                var personId = that.bondSuperHis.id;
                var tip = "";

                that.$axios.get('/api/regulatory/vehicle/checkDriverCar?id='+personId,{}
                ).then(
                    function (res) {
                        if(res.code == 0){
                                if(res.data != null && res.data.car_no != '' && res.data.car_no != null && res.data.car_no != undefined){
                                    tip = '当前选中司机已绑定车辆"'+res.data.car_no+'",是否修改？'
                                }else{
                                    tip = '是否绑定当前选中司机？'
                                }

                                that.$confirm(tip, '确认信息', {
                                    distinguishCancelAndClose: true,
                                    closeOnClickModal: false,
                                    confirmButtonText: '保存',
                                    cancelButtonText: '放弃修改'
                                })
                                    .then(() => {
                                        that.$axios.get('/api/regulatory/vehicle/carChangeDriver?carId='+carId+'&&personId='+personId+'&&tip=12',{}
                                        ).then(
                                            function (res) {
                                                if(res.code == 0){
                                                    that.closeDriverS()
                                                }
                                            }
                                        ).catch(error => {
                                            // catch 指请求出错的处理
                                            console.log(error);
                                        });
                                    })
                                    .catch(action => {
                                        this.$message({
                                            type: 'info',
                                            message: action === 'cancel'
                                                ? '放弃保存并离开页面'
                                                : '停留在当前页面'
                                        })
                                    });

                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    console.log(error);
                });
            },


            //以下为押运员操作
            closeESC(){
                this.query()
                var ESListClass = $(".ESListClass");
                ESListClass.css("display", "none");
                // $(".shadow").css({'display':'none'});

            },
            bondES(id,Name,phone){  //点击司机 进行绑定操作
                var that = this;
                that.bondESHis.carNo=id;
                that.bondESHis.nameES=Name;
                that.bondESHis.phoneDri =phone ;

                //打开弹窗
                that.dialogtf= false

                that.dialogtfVeh=false
                var role_id = ''
                if(that.ruleType == 2){
                    role_id = 14
                }else if(that.ruleType == 3){
                    role_id = 15
                }

                that.$axios.post('/api/regulatory/vehicle/personSelect?role='+role_id+'&type=2&carId='+id,{}
                ).then(
                    function (res) {
                        if(res.code == 0){
                            that.tableESList = res.data;
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    console.log(error);
                });

            },

            updateBondES(){   //绑定操作
                var that = this ;
                var carId = that.bondESHis.carNo
                var personId = that.bondESHis.id;
                that.$axios.get('/api/enterprise/tVehicleInfo/carChangeEscort?carId='+carId+'&&personId='+personId,{}
                ).then(
                    function (res) {
                        if(res.code == 0){
                            that.closeESC();
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    console.log(error);
                });
            },

            addCar(){
                this.dialogtfVeh = true
            },


            updateByid(id){
                console.log(id)
                this.dialogtfVeh = true
                this.$nextTick(() => {
                    this.$refs.myFirstchild.selectOneById(id)
                })
            },

            closeAdd(){
                this.query()
                this.dialogtfVeh=false
            },

            deleteByid(id){
                var that = this;
                var url = '/api/regulatory/vehicle/deleteCar?id='+id;
                that.$axios.get(url, {
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
                    that.$message.error("删除失败!");
                });
            },


            //删除提示
            open(id) {
                var that = this;
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.deleteByid(id);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }

        }
    }
</script>

<style scoped>

    .focus{
        background-color:#b4ecfb;
    }

    .total-num {
        background-color:#e5f9fe;
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
        width: 200px;
        height: 90px;
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

     .filter-btn {
        position: absolute;
        right: 20px;
        bottom: 20px;
    }

    .filter-btn .el-button {
        min-width: 80px;
    }
    .shadow{
        width:100%;
        height:100%;
        position:absolute;
        left:0;
        top:0;
        z-index:998;
        background-color:#000;
        opacity:0.6;
        display:none;
    }
    .addBox{
    //其他属性
    z-index:999;
    }

    .avatar-uploader-icon[data-v-9fc04a66] {
        border-radius: 6px;
        font-size: 28px;
        color: #8c939d;
        width: 250px;
        height: 180px;
        line-height: 178px;
        text-align: center;
        border: 1px solid #dcdfe6;
    }
</style>