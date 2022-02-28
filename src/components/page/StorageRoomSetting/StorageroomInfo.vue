<template>
    <div class="main">
      <!--  // 导航-->
        <div class="main-top">
            <div class="breadcrumb">
                <a href="#"><i class="icon icon-zhihuijianguan menu-icon"></i><span class="text-primary-font">企业管理</span></a><span class="sep">></span><span class="text-primary">危废信息</span>
            </div>
        </div>

       <!-- // 提示-->
        <div class="panel">
            <div class="panel-bd pdtlr-0">
                <div style="margin-bottom: 8px">友情提示 </div>
                <div class="breadcrumb" style="padding-top:5px;padding-left:9px;width: 100%;height: 100%;background-color: #fdf6ec;color: #e6a74f;line-height: 23px;font-size: 14px">
                    <div>一、生产性产废：生产产品过程中直接产生的危险废物。如产品加工和制造过程中产生的下脚料、边角料、残余物质；在物质提取、提纯、电解、电积、净化、改性、表面处理及其它处理过程中产生的残余物质；在物质
                    合成、裂解、分馏、蒸馏、溶解、沉淀以及其他过程中产生的残余物质等。 生产性危废只能通过产废入库功能新增入库，增加库存。</div>
                    <div>二、非生产性产废：非生产过程产生的危险废物，与生产过程不直接相关。如事故应急、设备检修、场地清理产生的危险废物，废水、废气等污染防治设施产生的危险废物。 非生产性危废只能通过产废入库功能新增入库，
                    增加库存。</div>
                    <div>三、次生危废：危险废物利用处置过程中产生的危险废物，即在自行利用处置项目或经营许可项目中产生的废物。 次生危废只能通过自行利用处置或经营记录新增入库。
                    注：产废信息如果在管理计划、联单、年度申报等模块使用过，将不能修改废物代码、名称、计量单位、废物类型。</div>
                </div>
            </div>
        </div>


        <!--数据表格-->
        <div class="panel">
            <div class="panel-bd">

                <div style="padding: 20px 0px 0 2px;">
                    <ul class="filter-box">

                        <li class="filter-item">
                            <div class="filter-label">危废名称：</div>
                            <div class="filter-con">
                                <div class="el-input w180 el-input-group el-input--prefix">
                                    <span class="el-input__prefix"> <i class="el-input__icon el-icon-search"></i> </span>
                                    <input type="text" autocomplete="off" placeholder="危废名称" v-model="search.vfName"  class="el-input__inner">
                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-label">危废代码：</div>
                            <div class="filter-con">
                                <div class="el-input w180 el-input-group el-input--prefix">
                                    <span class="el-input__prefix"> <i class="el-input__icon el-icon-search"></i> </span>
                                    <input type="text" autocomplete="off" placeholder="危废代码" v-model="search.vfCode"  class="el-input__inner">
                                </div>
                            </div>
                        </li>

                        <li class="filter-item">
                            <div class="filter-label">危废类型：</div>
                            <div class="filter-con">
                                <div class="el-select w124">
                                    <el-select v-model="search.vfType" clearable>
                                        <el-option
                                                v-for="item in vfTypeList"
                                                :key="item.name"
                                                :label="item.name"
                                                :value="item.name">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </li>

                        <li class="filter-item">
                            <div class="filter-label">贮存间：</div>
                            <div class="filter-con">
                                <div class="el-select w124">
                                    <el-select v-model="search.storageId" clearable>
                                        <el-option
                                                v-for="item in storageList"
                                                :key="item.code"
                                                :label="item.name"
                                                :value="item.code">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </li>

                        <li class="filter-item">
                            <div class="filter-btn">
                                <!--<button type="button"  class="button-type"  @click="pageList"> <span>查询</span></button>-->
                                <el-button type="button" size="medium"  @click="pageList" class="el-button el-button--primary">
                                    <span>查询</span></el-button>
                                <!--<button type="button"  class="button-type"  @click="addVf"> <span>新增</span></button>-->
                                <el-button type="button" size="medium"  @click="addVf" class="el-button el-button--primary">
                                    <span>新增</span></el-button>
                            </div>
                        </li>
                    </ul>
                </div>



                <table class="table-default">
                    <thead>
                    <tr>
                        <th style="text-align:center;width: 6%">危废名称</th>
                        <th style="text-align:center;width: 8%">危废代码</th>
                        <th style="text-align:center;width: 5%">危废类别</th>
                        <th style="text-align:center;width: 7%">贮存间</th>
                        <th style="text-align:center;width: 7%">操作人</th>
                        <th style="text-align:center;width: 6%">操作时间</th>
                        <th style="text-align:center;width: 7%">状态</th>
                        <th style="text-align:center;width: 7%">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,i)  in dataList" :key="i">
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width:7%" :title="item.dictDetailName" >{{item.name}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width:7%" :title="item.dictDetailName" >{{item.codeSort}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width:7%" :title="item.dictDetailName" >{{item.typeName}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width:7%" :title="item.dictDetailName" >{{item.storageName}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width:7%" :title="item.dictDetailName" >{{item.userName}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width:7%" :title="item.dictDetailName" >{{item.setTime}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width:7%" :title="item.dictDetailName" >{{item.statusStr}}</td>
                        <td>
                            &nbsp;<el-link type="primary" @click="lookInfo(item.id)">查看</el-link>
                            &nbsp;<el-link type="primary" @click="updateByid(item.id)">编辑</el-link>
                            <el-link v-show="item.status == 1" type="primary" @click="vfCodeStop(item.id)">停用</el-link>
                            <el-link
                  v-show="item.status!= 1"
                  type="primary"
                  @click="startUse(item.id)"
                  >启用</el-link>
                       
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
        <!--弹窗-->
        <StorageroomEditor v-on:close="closeDia" ref = "vfChild"></StorageroomEditor>

        <el-dialog title="危废详情"  :modal-append-to-body="false"  top="9vh"  width="800px"  :visible.sync="inforDialog" append-to-body  @close="closeInfoDialog" :close-on-click-modal="false">
            <template>
                <div>
                    <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple-light appeal" ><span>&nbsp;&nbsp;&nbsp;&nbsp;危废类别：{{forrmotName(wfKindList,formInlinefa.vfKind)}}</span></div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple-light appeal"><span>&nbsp;&nbsp;&nbsp;&nbsp;危废代码：{{formInlinefa.code}}</span></div></el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple-light appeal"  style=" background: #d3dce6;"><span>&nbsp;&nbsp;&nbsp;&nbsp;危废名称：{{formInlinefa.vfName}}</span></div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple-light appeal"  style=" background: #d3dce6;"><span>&nbsp;&nbsp;&nbsp;&nbsp;危废类型：{{forrmotName(fw_type,formInlinefa.fwType)}}</span></div></el-col>
                       
                    </el-row>

                    <el-row>
                         <el-col :span="12"><div class="grid-content bg-purple-light appeal"  ><span>&nbsp;&nbsp;&nbsp;&nbsp;贮存间：{{forrmotName(storageList,formInlinefa.storageId)}}</span></div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple-light appeal" ><span>&nbsp;&nbsp;&nbsp;&nbsp;包装方式：{{forrmotName(wf_storage_type,formInlinefa.storageType)}}</span></div></el-col>
                        
                    </el-row>

                    <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple-light appeal" style=" background: #d3dce6;"><span>&nbsp;&nbsp;&nbsp;&nbsp;应急设备：{{formInlinefa.equipment}}</span></div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple-light appeal"  style=" background: #d3dce6;" ><span>&nbsp;&nbsp;&nbsp;&nbsp;危废形态：{{forrmotName(fw_form,formInlinefa.fwForm)}}</span></div></el-col>
                        
                    </el-row>

                    <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple-light appeal"  ><span>&nbsp;&nbsp;&nbsp;&nbsp;危废特性：{{forrmotName(wx_features,formInlinefa.wxFeatures)}}</span></div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple-light appeal" ><span>&nbsp;&nbsp;&nbsp;&nbsp;有害物质名称：{{formInlinefa.harmful}}</span></div></el-col>
                        
                    </el-row>

                    <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple-light appeal" style=" background: #d3dce6;"><span>&nbsp;&nbsp;&nbsp;&nbsp;危险情况：{{forrmotName(wx_situation,formInlinefa.wxSituation)}}</span></div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple-light appeal"  style=" background: #d3dce6;" ><span>&nbsp;&nbsp;&nbsp;&nbsp;应急措施：{{forrmotName(measures,formInlinefa.measures)}}</span></div></el-col>
                        
                    </el-row>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    import StorageroomEditor from "./StorageroomEditor";
    export default {
        components:{
            StorageroomEditor
        },
        name: "StorageroomInfo",
        data(){
            return{
                nameList:[],
                inforDialog:false,
                dataList: [],
                totalPage: 0,
                total: 0,
                cur_page: 1,
                pageSize: 10,

                search:{
                    vfName:'',
                    vfCode:'',
                    vfType:'',
                    storageId:'',
                    status:'',
                },
                vfTypeList:[
                ],

                wfKindList:[],     //危废种类
                storageList:[],     //储藏间
                wx_situation:[],    //危险情况
                wx_features:[],     //危险特性
                fw_form:[],         //危废形态
                fw_type:[],         //危废类型
                measures:[],        //应急措施
                wf_color:[],        //危废颜色
                codeList:[],        //危废代码列表
                wf_storage_type:[], //包装方式

                formInlinefa:{
                    vfKind:'',
                    fwType:'',
                    storageId:'',
                    wfColor:'',
                    fwForm:'',
                    wxFeatures:'',
                    wxSituation:'',
                    harmful:'',
                    equipment:'',
                    measures:'',
                    code:'',
                    storageType: ''
                },
            }
        },

        mounted(){
            this.onloadSelects();
            this.pageList();
        },
        methods:{
            closeInfoDialog(){
                this.inforDialog = false
            },

            forrmotName(list,codes){
                let answerList = []
                if (typeof(codes) == 'number' || typeof(codes) == 'string') {
                    for(var i = 0;i<list.length;i++){
                        if(list[i].code == codes){
                            return list[i].name;
                        }
                    }
                } else {
                    if(codes && codes.length>0){
                        list.forEach(element => {
                            codes.find((item) => {
                                if (item == element.code) {
                                    answerList.push(element.name)
                                }
                            })
                        });
                        return answerList.toString()
                    }
                }
            },
            getCaption(obj,state) {
                var index=obj.lastIndexOf("\#");
                if(index== -1){

                }else if(state==0){
                    obj=obj.substring(0,index);
                }else {
                    obj=obj.substring(index+1,obj.length);
                }
                return obj;
            },

            onloadSelects(){
                var _this=this;
                var params = new URLSearchParams();
                _this.$axios.get('/api/regulatory/tStorageFacilities/storageSettingSelects',{params}).then(
                    function (res) {
                        if(res.code == 0){
                            _this.vfTypeList = res.data.wfKindList;
                            _this.storageList = res.data.storageList;

                            _this.$refs.vfChild.wfKindList = res.data.wfKindList;
                            _this.$refs.vfChild.storageList = res.data.storageList;
                            _this.$refs.vfChild.wx_situation = res.data.wx_situation;
                            _this.$refs.vfChild.wx_features = res.data.wx_features;
                            _this.$refs.vfChild.fw_form = res.data.fw_form;
                            _this.$refs.vfChild.fw_type = res.data.fw_type;
                            _this.$refs.vfChild.measures = res.data.measures;
                            _this.$refs.vfChild.wf_color = res.data.wf_color;
                            _this.$refs.vfChild.wf_storage_type = res.data.wf_storage_type;

                            _this.wfKindList = res.data.wfKindList;
                            _this.storageList = res.data.storageList;
                            _this.wx_situation = res.data.wx_situation;
                            _this.wx_features = res.data.wx_features;
                            _this.fw_form = res.data.fw_form;
                            _this.fw_type = res.data.fw_type;
                            _this.measures = res.data.measures;
                            _this.wf_color = res.data.wf_color;
                            _this.wf_storage_type = res.data.wf_storage_type;
                            
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    console.log(error);
                });
            },
            addVf(){
                this.$refs.vfChild.flag = false;
                this.$refs.vfChild.lookFlog = true;
                this.$refs.vfChild.title= "新增危废";
                this.$refs.vfChild.dialogVf = true;
            },
            closeDia(){
                this.$refs.vfChild.flag = false;
                this.$refs.vfChild.dialogVf=false;
                this.pageList();
            },

            updateByid(id){
                this.$refs.vfChild.flag = true;
                this.$refs.vfChild.title= "编辑危废";
                this.$refs.vfChild.dialogVf = true;
                this.$refs.vfChild.lookFlog = true;
                this.$refs.vfChild.selectOne(id);
            },

            lookInfo(id){
                this.inforDialog = true ;
                this.lookInfoDialog(id);
            },

            lookInfoDialog(id){
                let that = this;
                var id = id;
                var url = '/api/regulatory/storageDetailcode/queryOneById';
                that.$axios.get(url,{
                        params:{  Id:id }
                    }
                ).then(
                    function (res) {
                        if(res.code == 0){
                            that.selectVfInfo(res.data.vfKind)
                            that.formInlinefa.vfKind=Number(res.data.vfKind); 
                            that.formInlinefa.fwType=res.data.fwType;// null
                            that.formInlinefa.vfName=res.data.vfName;
                            that.formInlinefa.storageId=res.data.storageId;
                            that.formInlinefa.wfColor=res.data.wfColor ? res.data.wfColor.split(',') : ''; // null
                            that.formInlinefa.fwForm=res.data.fwForm ? res.data.fwForm.split(',') : '';
                            that.formInlinefa.wxFeatures=res.data.wxFeatures ? res.data.wxFeatures.split(',') : '';
                            that.formInlinefa.wxSituation=res.data.wxSituation; // null
                            that.formInlinefa.harmful=res.data.harmful;
                            that.formInlinefa.equipment=res.data.equipment; // null
                            that.formInlinefa.measures=res.data.measures; // null
                            that.formInlinefa.code=that.getCaption(res.data.code,0);
                            that.formInlinefa.storageType=res.data.storageType;
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    console.log(error);
                });
            },

            selectVfInfo(vfCode,co){
                var _this=this;
                var params = new URLSearchParams();
                _this.$axios.get('/api/regulatory/tStorageFacilities/storageSettingCodeInfoSelects',{params:{ vfCode:vfCode }}).then(
                    function (res) {
                        if(res.code == 0){
                            _this.codeList = res.data;
                            if(res.data && res.data.length > 0){
                                   // _this.formInlinefa.code = res.data[0].code
                            }
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    console.log(error);
                });
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
              startUse(id){
                  
                this.$refs.vfChild.flag = true;
                this.$refs.vfChild.lookFlog = true;
                  this.$refs.vfChild.selectOneForStart(id);

    },
            pageList(){
                var _this=this;
                // var params = new URLSearchParams();
                // params.append('pageNum', _this.cur_page);
                // params.append('pageSize', _this.pageSize);
                // params.append('vfName', _this.search.vfName);
                // params.append('status', _this.search.status);
                // params.append('vfCode', _this.search.vfCode);
                // params.append('vfType', _this.search.vfType);
                // params.append('storageId', _this.search.storageId);
                     var params = {};
                params.pageNum= _this.cur_page;
                params.pageSize= _this.pageSize;
                params.vfName= _this.search.vfName;
                params.status= _this.search.status;
                params.vfCode= _this.search.vfCode;
                params.vfType= _this.search.vfType;
                params.storageId= _this.search.storageId,
                params.type= 1; // 贮藏设施类型：1危废 2固废
console.log('here',params)
                _this.$axios.get('/api/regulatory/tStorageFacilities/storageSettingList',{params}).then(
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

            vfCodeStop(id){
                this.$confirm('是否确认停用?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,
                    type: 'warning'
                }).then(() => {
                    var _this=this;
                    var params = new URLSearchParams();
                    _this.$axios.get('/api/regulatory/storageDetailcode/vfCodeStop',{params:{ id:id }}).then(
                        function (res) {
                            if(res.code == 0){
                                _this.$message.success("停用成功");
                                _this.pageList();
                            }
                        }
                    ).catch((error) => {
                        // catch 指请求出错的处理
                        console.log(error);
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消停用'
                    });
                });
            },
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
