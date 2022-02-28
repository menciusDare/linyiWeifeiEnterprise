<template>
    <div>
        <el-dialog :title="title"  :destroy-on-close="true" width="1100px" height="700px" :visible.sync="dialogVf" append-to-body   @close="closevf" destroy-on-close="" :close-on-click-modal="false">
            <el-form label-position="right" :model="formInline" ref="formInline" class="demo-form-inline" label-width="130px" style="width:1050px"  :rules="listRules" >
                <!--  一行  -->
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="危废类别"  prop="vfKind" >
                            <el-select v-model="formInline.vfKind" placeholder="请选择"  filterable style = "width: 400px"  :disabled ="!lookFlog"  @change="selectVfInfo(formInline.vfKind,1)">
                                <el-option
                                        v-for="(item,id) in vfTypeList"
                                        :key="id"
                                        :label="item.typeName"
                                        :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>


                    <el-col :span="12">
                        <el-form-item label="危废代码" prop="code">
                            <el-select v-model="formInline.code" placeholder="请选择" filterable  style = "width: 400px"  :disabled="formInline.vfKind=='' || !lookFlog">
                                <el-option
                                        v-for="(item,index) in codeList"
                                        :key="index"
                                        :label="item.detailsCode"
                                        :value="item.detailsCode"
                                ></el-option>
                            </el-select>
                            <!-- <el-button  type="button" class="el-button el-button--primary" size="mini"  :disabled="formInline.vfKind=='' || !lookFlog" @click="newOne(formInline.vfKind)"> 新增</el-button> -->
                        </el-form-item>
                    </el-col>
                </el-row>
                <!--  二行  -->
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="危废名称" prop="vfName">
                            <el-input v-model="formInline.vfName" placeholder="有害物质名称" style="width: 400px" :disabled ="!lookFlog"></el-input>
                        </el-form-item>
                    </el-col>
                    
                    <el-col :span="12">
                        <el-form-item label="危废类型"   prop="fwType">
                            <el-select v-model="formInline.fwType" placeholder="请选择"  filterable style = "width: 400px" :disabled ="!lookFlog">
                                <el-option
                                        v-for="item in fw_type"
                                        :key="item.code"
                                        :label="item.name"
                                        :value="item.code"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    
                </el-row>
                <!--  三行  -->
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="贮存间" prop="storageId">
                            <el-select v-model="formInline.storageId" placeholder="请选择" filterable style = "width: 400px" :disabled ="!lookFlog">
                                <el-option
                                        v-for="item in storageList"
                                        :key="item.code"
                                        :label="item.name"
                                        :value="item.code"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="包装方式" prop="storageType">
                            <el-select v-model="formInline.storageType" placeholder="请选择" style = "width: 400px" :disabled ="!lookFlog">
                                <el-option
                                        v-for="item in wf_storage_type"
                                        :key="item.code"
                                        :label="item.name"
                                        :value="item.code"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    

                </el-row>
                <!--  四行  -->
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="应急设备" prop="equipment">
                            <el-input v-model="formInline.equipment" placeholder="应急设备" style="width: 400px" :disabled ="!lookFlog"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="危废形态" prop="fwForm">
                            <el-select v-model="formInline.fwForm" placeholder="请选择" multiple collapse-tags filterable style = "width: 400px" :disabled ="!lookFlog">
                                <el-option
                                        v-for="item in fw_form"
                                        :key="item.code"
                                        :label="item.name"
                                        :value="item.code"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                     </el-row>
                <!--  五行  -->
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="危险特性" prop="wxFeatures">
                            <el-select v-model="formInline.wxFeatures" placeholder="请选择" multiple collapse-tags filterable style = "width: 400px" :disabled ="!lookFlog">
                                <el-option
                                        v-for="item in wx_features"
                                        :key="item.code"
                                        :label="item.name"
                                        :value="item.code"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
               
                    <el-col :span="12">
                        <el-form-item label="有害物质名称" prop="harmful">
                            <el-input v-model="formInline.harmful" placeholder="有害物质名称" style="width: 400px" :disabled ="!lookFlog"></el-input>
                        </el-form-item>
                    </el-col>
                   
                </el-row>
                <!--  六行  -->
                <el-row>
                     <el-col :span="12">
                        <el-form-item label="危险情况" prop="wxSituation">
                            <el-select v-model="formInline.wxSituation" placeholder="请选择" filterable style = "width: 400px" :disabled ="!lookFlog">
                                <el-option
                                        v-for="item in wx_situation"
                                        :key="item.code"
                                        :label="item.name"
                                        :value="item.code"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="应急措施" prop="measures">
                            <el-select v-model="formInline.measures" placeholder="请选择" filterable style = "width: 400px" :disabled ="!lookFlog">
                                <el-option
                                        v-for="item in measures"
                                        :key="item.code"
                                        :label="item.name"
                                        :value="item.code"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <div style="text-align: center;;margin-top: 30px" v-if="lookFlog"  >
                <el-button   type="primary"  @click="submitVf()"    :disabled ="!lookFlog">保存</el-button>
                <el-button @click="closePage" >取消</el-button>
            </div>

            <!-- <el-dialog title="新增危废代码"  style="margin-top: 5%" width="490px" height="500px" :visible.sync="newOneDialog" append-to-body  @close="closeDialog" :close-on-click-modal="false" >
                <template>
                    <el-form label-position="right" :model="newChil" ref="newChil" class="demo-form-inline" label-width="100px"   :rules="newChilRuls" >
                        <el-form-item label="危废类别"  prop="vfKind" >
                            <el-select v-model="newChil.vfKind" placeholder="请选择"  style = "width: 300px"  disabled = true>
                                <el-option
                                        v-for="item in wfKindList"
                                        :key="item.code"
                                        :label="item.name"
                                        :value="item.code"
                                ></el-option>
                            </el-select>
                        </el-form-item>


                        <el-form-item label="危废代码" prop="vfcode">
                            <el-input v-model="newChil.vfcode" placeholder="危废代码" style="width: 300px" :disabled ="!lookFlog"></el-input>
                        </el-form-item>

                        <el-form-item label="危废名称" prop="vfname">
                            <el-input v-model="newChil.vfname" placeholder="危废名称" style="width: 300px" :disabled ="!lookFlog"></el-input>
                        </el-form-item>
                    </el-form>

                    <div style="text-align: center;;margin-top: 30px" >
                        <el-button    type="primary"  @click="addSmall()" style="width: 200px;">保存</el-button>
                    </div>
                </template>
            </el-dialog> -->
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "StorageroomEditor",
        data(){
            return{
                vfTypeList:[],
                title:'',
                wfname:'',
                dialogVf:false,
                newOneDialog:false,
                updateId:'',
                lookFlog:true,
                flag:false,
                formInline:{
                    vfKind:'',
                    fwType:'',
                    vfName: '',
                    storageId:'',
                    wfColor:[],
                    fwForm:[],
                    wxFeatures:[],
                    wxSituation:'',
                    harmful:'',
                    equipment:'',
                    measures:'',
                    code:'',
                    storageType: ''
                },

                newChil:{
                    vfKind:'',
                    vfcode:'',
                    vfname:'',
                },

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

                //校验
                newChilRuls:{
                    vfKind: [
                        {
                            required: true,
                            message: "请选择危废类别",
                            trigger: "blur" }
                    ],
                    vfcode: [
                        {
                            required: true,
                            message: "请填写危废代码",
                            trigger: "blur" }
                    ],
                    vfname: [
                        {
                            required: true,
                            message: "请填写危废名称",
                            trigger: "blur" }
                    ],
                },

                listRules:{
                    vfKind: [
                        {
                            required: true,
                            message: "请选择危废类别",
                            trigger: "blur" }
                        ],

                    code: [
                        {
                            required: true,
                            message: "请选择危废代码",
                            trigger: "blur" }
                    ],
                    vfName: [
                        {
                            required: true,
                            message: "请填写危废名称",
                            trigger: "blur" }
                    ],
                    fwType: [
                        {
                            required: true,
                            message: "请选择危废类型",
                            trigger: "blur" }
                    ],
                    wfColor: [
                        {
                            required: true,
                            message: "请选择颜色",
                            trigger: "blur" }
                    ],
                    fwForm: [
                        {
                            required: true,
                            message: "请选择危废形态",
                            trigger: "blur" }
                    ],
                    wxFeatures: [
                        {
                            required: true,
                            message: "请选择危险特性",
                            trigger: "blur" }
                    ],
                    wxSituation: [
                        {
                            required: true,
                            message: "请选择危险情况",
                            trigger: "blur" }
                    ],
                    storageId: [
                        {
                            required: true,
                            message: "请选择贮存间",
                            trigger: "blur" }
                    ],
                    equipment: [
                        {
                            required: true,
                            message: "请填写应急设备",
                            trigger: "blur" }
                    ],
                    measures: [
                        {
                            required: true,
                            message: "请选择应急措施",
                            trigger: "blur" }
                    ],

                    harmful: [
                        {
                            required: true,
                            message: "请填写有害物质",
                            trigger: "blur" }
                    ],
                    storageType: [
                        {
                            required: true,
                            message: "请选择包装方式",
                            trigger: "blur" }
                    ],
                }
            }
        },

        mounted(){
            this.onloadSelect();
            this.getvfTypeList()
        },

        methods:{
            getvfTypeList(){
                this.$axios.post('/api/regulatory/hazardousWasteCategory/showDicType').then(res=>{
                       this.vfTypeList = res.data
                })
            },
            // 
            //加载下拉框
            onloadSelect(){
                var _this=this;
                var params = new URLSearchParams();
                _this.$axios.get('/api/regulatory/tStorageFacilities/storageSettingSelects',{params}).then(
                    function (res) {
                        if(res.code == 0){
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
            closevf(){
                this.clear();
            },
            selectVfInfo(vfCode,co){
                var _this=this;
                _this.vfTypeList.filter(item=>{
                   if(item.id == vfCode){
                       _this.wfname = item.typeName
                   }
                })
                _this.formInline.code = ''
                var params = new URLSearchParams();
                _this.$axios.get('/api/regulatory/hazardousWasteCategory/getDetailsCodeByDicType',{params:{ types:this.wfname }}).then(
                    function (res) {
                        if(res.code == 0){
                            _this.codeList = res.data;
                            if(res.data.length > 0){
                                if(co == 1){
                                    _this.formInline.code = res.data[0].detailsCode
                                }
                            }
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    console.log(error);
                });
            },

            submitVf() {
                this.$refs["formInline"].validate(valid => {
                    if (valid) {
                        if(this.flag){
                            this.update();
                        }else{
                            this.addTcarForm();
                        }
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },

            addTcarForm(){
                let self = this;
                let url = "/api/regulatory/storageDetailcode/addOneVf";
                self.$axios
                    .post(url, {
                        typeName: self.wfname,
                        dictDetailCode: self.formInline.code,
                        equipment: self.formInline.equipment,
                        vfName:self.formInline.vfName,
                        fwForm: (self.formInline.fwForm).toString(),
                        fwType: self.formInline.fwType,
                        harmful: self.formInline.harmful,
                        measures: self.formInline.measures,
                        status: 1,  //新增和修改后 默认状态是 1
                        storageId: self.formInline.storageId,
                        wfColor: (self.formInline.wfColor).toString(),
                        wxFeatures: (self.formInline.wxFeatures).toString(),
                        wxSituation: self.formInline.wxSituation,
                        storageType: self.formInline.storageType
                    })
                    .then(function(res) {
                        if (res.code == 0) {
                            self.$message.success("保存成功!");
                            self.closePage()
                        }
                    })
                    .catch(function(err) {
                        self.$message.error("保存失败，请稍后再试!");
                    });
            },

            update(){
                let self = this;
                let url = "/api/regulatory/storageDetailcode/updateById";
                self.$axios
                    .post(url, {
                        id:self.updateId,
                        vfKind: self.formInline.vfKind,
                        dictDetailCode: self.formInline.code,
                        equipment: self.formInline.equipment,
                        vfName:self.formInline.vfName,
                        fwForm: (self.formInline.fwForm).toString(),
                        fwType: self.formInline.fwType,
                        harmful: self.formInline.harmful,
                        measures: self.formInline.measures,
                        status: 1,  //新增和修改后 默认状态是 1
                        storageId: self.formInline.storageId,
                        wfColor: (self.formInline.wfColor).toString(),
                        wxFeatures: (self.formInline.wxFeatures).toString(),
                        wxSituation: self.formInline.wxSituation,
                        typeName: self.wfname,
                        storageType: self.formInline.storageType
                    })
                    .then(function(res) {
                        if (res.code == 0) {
                            self.$message.success("保存成功!");
                            self.closePage()
                        }
                    })
                    .catch(function(err) {
                        self.$message.error("保存失败，请稍后再试!");
                    });
            },
 selectOneForStart(id){
                let that = this;
                // that.onloadSelect()
                that.updateId = id;
                var url = '/api/regulatory/storageDetailcode/queryOneById'
                that.$axios.get(url,{
                        params:{  Id:id }
                    }
                ).then(
                    function (res) {
                        if(res.code == 0){
                            that.selectVfInfo(res.data.vfKind);
                            that.formInline.vfKind=Number(res.data.vfKind);
                            that.formInline.fwType=res.data.fwType;
                            that.formInline.vfName=res.data.vfName;
                            that.formInline.storageId=res.data.storageId;
                            that.formInline.wfColor=res.data.wfColor ? res.data.wfColor.split(',') : '';
                            that.formInline.fwForm=res.data.fwForm ? res.data.fwForm.split(',') : '';
                            that.formInline.wxFeatures=res.data.wxFeatures ? res.data.wxFeatures.split(',') : '';
                            that.formInline.wxSituation=res.data.wxSituation;
                            that.formInline.harmful=res.data.harmful;
                            that.formInline.equipment=res.data.equipment;
                            that.formInline.measures=res.data.measures;
                            that.formInline.code=res.data.nameConcat;
                              let url = "/api/regulatory/storageDetailcode/updateById";
                that.$axios
                    .post(url, {
                        id:that.updateId,
                        vfKind: that.formInline.vfKind,
                        dictDetailCode: that.formInline.code,
                        equipment: that.formInline.equipment,
                        vfName:that.formInline.vfName,
                        fwForm: (that.formInline.fwForm).toString(),
                        fwType: that.formInline.fwType,
                        harmful: that.formInline.harmful,
                        measures: that.formInline.measures,
                        status: 1,  //新增和修改后 默认状态是 1
                        storageId: that.formInline.storageId,
                        wfColor: (that.formInline.wfColor).toString(),
                        wxFeatures: (that.formInline.wxFeatures).toString(),
                        wxSituation: that.formInline.wxSituation,
                        typeName: that.wfname
                    })
                    .then(function(res) {
                        if (res.code == 0) {
                         
                            that.closePage()
                        }
                    })
                    .catch(function(err) {
                        that.$message.error("保存失败，请稍后再试!");
                    });
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    console.log(error);
                });
            },
            selectOne(id){
                let that = this;
                // that.onloadSelect()
                that.updateId = id;
                var url = '/api/regulatory/storageDetailcode/queryOneById'
                that.$axios.get(url,{
                        params:{  Id:id }
                    }
                ).then(
                    function (res) {
                        if(res.code == 0){
                            that.selectVfInfo(res.data.vfKind);
                            that.formInline.vfKind=Number(res.data.vfKind);
                            that.formInline.fwType=res.data.fwType;
                            that.formInline.vfName=res.data.vfName;
                            that.formInline.storageId=res.data.storageId;
                            that.formInline.wfColor=res.data.wfColor ? res.data.wfColor.split(',') : '';
                            that.formInline.fwForm=res.data.fwForm ? res.data.fwForm.split(',') : '';
                            that.formInline.wxFeatures=res.data.wxFeatures ? res.data.wxFeatures.split(',') : '';
                            that.formInline.wxSituation=res.data.wxSituation;
                            that.formInline.harmful=res.data.harmful;
                            that.formInline.equipment=res.data.equipment;
                            that.formInline.measures=res.data.measures;
                            that.formInline.code=res.data.nameConcat;
                            that.formInline.storageType=res.data.storageType;
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    console.log(error);
                });
            },
   
            lookInfoChil(id,bool){
                let that = this;
                // that.onloadSelect();
                that.lookFlog = bool;
                var id = id;
                var url = '/api/regulatory/storageDetailcode/queryOneById';
                that.$axios.get(url,{
                        params:{  Id:id }
                    }
                ).then(
                    function (res) {
                        if(res.code == 0){
                            that.selectVfInfo(res.data.vfKind)
                            that.formInline.vfKind=res.data.typeName;
                            that.formInline.fwType=res.data.fwType;
                            that.formInline.vfName=res.data.vfName;
                            that.formInline.storageId=res.data.storageId;
                            that.formInline.wfColor=res.data.wfColor.split(',');
                            that.formInline.fwForm=res.data.fwForm.split(',');
                            that.formInline.wxFeatures=res.data.wxFeatures.split(',');
                            that.formInline.wxSituation=res.data.wxSituation;
                            that.formInline.harmful=res.data.harmful;
                            that.formInline.equipment=res.data.equipment;
                            that.formInline.measures=res.data.measures;
                            that.formInline.code=res.data.nameConcat;
                            that.formInline.storageType=res.data.storageType;
                            
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    console.log(error);
                });
            },


            //关闭弹窗
            closePage(){
                this.$emit("close");
                this.clear();
            },


            clear(){
                this.formInline.vfKind='',
                    this.formInline.fwType='',
                    this.formInline.storageId='',
                    this.formInline.vfName='',
                    this.formInline.wfColor=[],
                    this.formInline.fwForm=[],
                    this.formInline.wxFeatures=[],
                    this.formInline.wxSituation='',
                    this.formInline.harmful='',
                    this.formInline.equipment='',
                    this.formInline.measures='',
                    this.formInline.code='',
                    this.lookFlog = true,
                    this.formInline.storageType=''
            },

            //危废小项
            closeDialog(){
                this.newOneDialog=false
                // this.onloadSelect();
            },

            newOne(kind){
                 this.newChil.vfcode = '',
                 this.newChil.vfname = '',
                 this.newChil.vfKind = kind,
                 this.newOneDialog=true
            },

            addSmall(){
                let self = this;
                self.$refs["newChil"].validate(valid => {
                    if (valid) {
                        let url = "/api/regulatory/storageDetailcode/addSmall";
                        self.$axios
                            .post(url, {
                                vfKind: self.newChil.vfKind,
                                vfcode: self.newChil.vfcode,
                                vfname: self.newChil.vfname,
                            })
                            .then(function(res) {
                                if (res.code == 0) {
                                    self.$message.success("保存成功!");
                                    self.selectVfInfo(self.vfCode)
                                    self.newOneDialog=false
                                }else{
                                    self.$message.error(res.msg);
                                }
                            })
                            .catch(function(err) {
                                self.$message.error("保存失败，请稍后再试!");
                            });

                        }else {
                            console.log("error submit!!");
                            return false;
                        }
                    }
                )
            }
        }
    }
</script>

<style>
    .table-tr-width-320 {
        width:320px;
    }
    .table-tr-width-400 {
        width:400px;
    }
</style>
