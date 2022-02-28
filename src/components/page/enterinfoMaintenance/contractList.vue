<template>
    <div class="main" >
        <div class="main-top">
            <div class="breadcrumb">
                <a href="#">经营管理</a><span class="sep">></span><span class="text-primary">合同管理</span>
            </div>
        </div>
        <div class="panel">
             <div class="panel-bd pdtlr-0" style="padding-bottom: 5px;">
              <div class="filter-more">
                    <ul class="filter-box">

                        <li class="filter-item"  style="height: 35px;margin-right: 0px">
                            <div class="filter-label" style="line-height: 35px">合同状态：</div>
                            <div class="filter-con">
                               <div class="el-select w124">
                                    <el-select v-model="status" clearable  placeholder="全部" style="width: 120px;">
                                        <el-option
                                                   label="全部"
                                                   value="">
                                        </el-option>
                                        <el-option
                                                   v-for="item in options"
                                                   :key="item.value"
                                                   :label="item.label"
                                                   :value="item.value">
                                        </el-option>
                                    </el-select>
                                     </div>
                            </div>
                        </li>
                        <li class="filter-item" >
                            <div class="filter-label" style="line-height: 35px">合同编号：</div>
                            <div class="filter-con">
                                <div class="el-input w180 el-input-group el-input--prefix">

                    <span class="el-input__prefix"><i class="el-input__icon el-icon-search"></i>
                    </span>
                                    <!--                                    <input type="text" autocomplete="off" placeholder="搜索企业名称"-->
                                    <!--                                  class="el-input__inner">-->
                                    <el-input  style="height: 35px;width: 160px" autocomplete="off"  v-model="contractNo" placeholder="搜索合同编号"></el-input>

                                </div>
                            </div>
                        </li>
                          <li class="filter-item" style="float: right;">
                             <el-button size="small" type="primary" @click="addContract">增加</el-button>
                        </li>
                        <li class="filter-item" style="float: right;margin-right: 20px;">
                            <el-button size="small" type="primary" @click="query">查询</el-button>
                        </li>
                       
                    </ul>
                </div>
            </div>
        </div>
        
        <div style="        width:100%;overflow: auto">
            <!--列表-->
            <table class="table-default table-full">
                <thead>
                <tr>
                    <th style="text-align:center;width: 80px">序号</th>
                    <th style="text-align:center">合同编号</th>
                    <th style="text-align:center">处置品类</th>
                    <th style="text-align:center">甲方</th>
                    <th style="text-align:center">乙方</th>
                    <th style="text-align:center">合同开始日</th>
                    <th style="text-align:center">结束日</th>
                    <th style="text-align:center">约定价格</th>
                    <th style="text-align:center">合同来源</th>
                    <th style="text-align:center">状态</th>
                    <!-- <th style="text-align:center">操作</th> -->
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item ,index) in tableData">
                    <td style="text-align:center;width: 80px">{{(cur_page-1)*pageSize+index+1}}</td>
                    <!--<td style="text-align:center;width: 80px">{{index<9?'0'+(++index):++index}}</td>-->
                    <td style="text-align:center">{{item.contractNo}}</td>
                    <td style="text-align:center">{{item.hazardousWasteType}}</td>
                    <td style="text-align:center">{{item.fristParTyName}}</td>
                    <td style="text-align:center">{{item.secondParTyName}}</td>
                    <td style="text-align:center">{{item.startDate}}</td>
                    <td style="text-align:center">{{item.endDate}}</td>
                    <td style="text-align:center">
                        {{item.price}}
                        <span v-if="item.price!=null">/{{item.unitofvolumestr}}</span>
                    </td>
                    <td style="text-align:center">{{item.sources}}</td>
                    <td style="text-align:center">
                        <span v-if="item.statuss=='待审核'" style="background: #e4b3a0"><font color="#d63535">{{item.statuss}}</font></span>
                        <span v-else-if="item.statuss=='待确认'" style="background: #e4b3a0"><font color="#d63535">{{item.statuss}}</font></span>
                        <span v-else>{{item.statuss}}</span>
                    </td>
                    <!-- <td style="text-align:center" >
                        <el-link type="primary" @click="selectByContractNo(item.contractNo,item.correlationId)">查看</el-link> &nbsp;&nbsp;
                        <el-link type="primary" v-if="item.status==7" @click="contractAudit(item.contractNo,item.correlationId,2)">审核</el-link> &nbsp;&nbsp;
                        <el-link type="primary" v-if="item.showConfirmButton" @click="contractAudit(item.contractNo,item.correlationId,3)">确认</el-link> &nbsp;&nbsp;
                        <el-link type="primary" @click="downs(item.correlationId)">下载</el-link>
                    </td> -->
                </tr>
                </tbody>
            </table>
        </div>
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
         <el-dialog
        title="新增已有合同"
        :visible.sync="dialogVisible"
        class="dlogBox"
        :modal-append-to-body="false"
        width="800px"
        @closed="closeDialog"
      ><contractAdd ref="contractAdd" @close="closeAdd"></contractAdd></el-dialog>
    </div>
</template>

<script>
    import contractAdd from "./contractAdd";
    export default {
    components:{
        contractAdd
    },
        name: "contractList",
        data(){
            return{
                imgs:require("../../../../static/css/images/login.jpg"),
                total:0,
                totalPage:0,
                cur_page: 1,
                pageSizes: this.AppConfig.appInfo.pageSizes,
                pageSize: this.AppConfig.appInfo.pageSize,
                tableData:[],
                sxSum:0,
                wsxSum:0,
                beOverSum:0,
                status:"",
                dialogVisible:false,
                form:{
                    carNo:"",
                    driverId:"",
                    escortId:"",
                    phone:""
                },
                options:[{
                    label:'生效中',
                    value:8
                },{
                    label:'未生效',
                    value:0
                },{
                    label:'已结束',
                    value:9
                }],
                toolTopbody: "",
                contractNo: "",// 合同编号
                dictDetailCode: "",// 处置品类
                fristParTyName: "",// 产废企业(甲)
                secondParTyName:"",// 处置企业(乙)
                qrBase64: "", // 二维码对应的base64（在方法里面进行获取）
                prefixBase64: "data:image/png;base64,", // base64前缀
                isFirefox: false,
                correlationId:'',
            }
        },
        mounted(){
            // 判断浏览器是否是火狐
            if (navigator.userAgent.indexOf("Firefox") > 0) {
                this.isFirefox = true;
            }
            this.query();
        },
        methods:{
            getTAttachments(){
                var that = this;
                var url = '/api/order/tContractInfo/getTAttachments/';
                var params = new URLSearchParams();
                params.append('correlationId', that.correlationId);// 附件关联Id
                that.$axios.get(url,{params}).then(
                    function (res) {
                        if(res.code == 0){
                            var imgData = res.data;
                            if(imgData.length<1){
                                that.$message({
                                    message: '当前无合同图片!',
                                    type: 'info'
                                });
                                return;
                            }
                            for (let i = 0; i < imgData.length; i++) {
                                var locationUrl = imgData[i].locationUrl;
                                that.outportData(locationUrl);
                            }
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    console.log(error);
                });
            },
            downs(correlationId) {
                var that = this;
                that.correlationId = correlationId;
                if(correlationId==null||correlationId==''){
                    that.$message({
                        message: '当前无合同图片!',
                        type: 'info'
                    });
                    return;
                }
                that.getTAttachments();
            },
            // 点击下载图片
            handleDownloadQrIMg() {
                // 这里是获取到的图片base64编码,这里只是个例子哈，要自行编码图片替换这里才能测试看到效果
                const imgUrl = this.prefixBase64 + this.qrBase64;
                // 如果浏览器支持msSaveOrOpenBlob方法（也就是使用IE浏览器的时候），那么调用该方法去下载图片
                if (window.navigator.msSaveOrOpenBlob) {
                    let bstr = atob(imgUrl.split(",")[1]);
                    let n = bstr.length;
                    let u8arr = new Uint8Array(n);
                    while (n--) {
                        u8arr[n] = bstr.charCodeAt(n);
                    }
                    let blob = new Blob([u8arr]);
                    window.navigator.msSaveOrOpenBlob(blob, new Date().format('yyyyMMddhhmmss') + "." + "png");
                } else {
                    // 这里就按照chrome等新版浏览器来处理
                    let a = document.createElement("a");
                    a.href = imgUrl;
                    a.setAttribute("download", new Date().format('yyyyMMddhhmmss'));
                    a.click();
                }
            },
            arrayBufferToBase64(buffer) {
                var binary = '';
                var bytes = new Uint8Array(buffer);
                var len = bytes.byteLength;
                for (var i = 0; i < len; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                return window.btoa(binary);
            },

            outportData(locationUrl){
                var _this = this;
                var params = new URLSearchParams();
                params.append('pathUrl', locationUrl);
                var url = "/api/permissions/imageController/downLoad";
                _this.$axios.post(url,  params,
                    // {responseType: "blob" }// 1.首先设置responseType对象格式为 blob:
                    {responseType: 'arraybuffer'}
                ).then(function (response) {
                    //downloadFile(response);
                    _this.qrBase64 = _this.arrayBufferToBase64(response);
                    _this.handleDownloadQrIMg();
                }).catch(function () {
                    _this.$message.info("导出异常,请重试!");
                })
            },
            handleSizeChange(val) {
                // 改变每页显示的条数
                this.pageSize=val;
                // 注意：在改变每页显示的条数时，要将页码显示到第一页
                this.cur_page=1;
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
            contractAudit(contractNo,correlationId,isInfoShow){
                this.$router.push({
                    path:"contractInfo",
                    query:{
                        contractNo:contractNo,
                        correlationId:correlationId,
                        isInfoShow:isInfoShow
                    }
                })
            },
            selectByContractNo(contractNo,correlationId){
                this.$router.push({
                    path:"contractInfo",
                    query:{
                        contractNo:contractNo,
                        correlationId:correlationId,
                        isInfoShow:1
                    }
                })
            },
            query() {
                var that = this;
                var url = '/api/regulatory/tEnterpriseInfo/tContractInfo/pageList';
                var params = new URLSearchParams();
                params.append('page', that.cur_page);
                params.append('limit', that.pageSize);
                params.append('contractNo', that.contractNo);// 合同编号
                params.append('dictDetailCode', that.dictDetailCode);// 处置品类
                params.append('fristParTyName', that.fristParTyName);// 产废企业(甲)
                params.append('secondParTyName', that.secondParTyName);// 处置企业(乙)
                  params.append('status', that.status);// 处置企业(乙)
                that.$axios.get(url,{params}).then(
                    function (res) {
                        if(res.code == 0){
                            that.tableData = res.data.records;
                            that.totalPage = res.data.pages;
                            that.total = res.data.total;
                        }else{
                            that.$message.error(res.msg);
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
                    "<div class = 'fontClass'>" + title + "</div>"+
                    "<div class = 'fontClass'>联系人："+driver +"</div>"+
                    "<div class = 'fontClass'>联系电话："+phone +"</div>";
                var effectHtml =
                    "<div style='font-size:12px;margin-top:5px;'>" + "</div>";
                self.toolTopbody = headerHtml + effectHtml;
            },

            closeDriverC(){
                this.query()
                var dirverListClass = $(".dirverListClass");
                dirverListClass.css("display", "none");
               // $(".shadow").css({'display':'none'});
            },
            addContract(){
                // var addCarDialog = $(".addContracTDialog");
                // addCarDialog.css("display", "block");
                this.dialogVisible=true;
            },

            closeAdd(){
                this.query();
            this.dialogVisible=false;
            },
            closeDialog(){
                debugger;
                this.$refs['contractAdd'].closePage();
            }
        }
    }
</script>

<style scoped>

    .focus{
        background-color:#99d3f0;
    }
    .table-default {
        width: 100%;
        border: 1px solid #EAECEF;
    }
    .table-default td, .table-default th {
        line-height: 22px;
        font-size: 16px;
    }
    .table-default td:first-child, .table-default th:first-child {
        padding-left: 30px;
    }
    .table-default tr:nth-child(even) td {
        background-color: #FCFDFF;
    }
    .table-default tr:hover td {
        background-color: rgba(15, 162, 245, 0.1);
    }
    .table-default th {
        padding: 10px 12px 11px;
        background-color: #F0F2F5;
    }
    .table-default td {
        padding: 11px 12px;
        transition: .3s background;
        border-bottom: 1px solid #EAECEF;
        white-space: nowrap;
    }

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
   
    z-index:999;
    }
</style>
