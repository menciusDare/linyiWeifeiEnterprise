<template>
    <!-- 主体 -->
    <div class="main">
        <div class="main-top">
            <div class="breadcrumb">
                <a href="#"><i class="icon icon-zhihuijianguan menu-icon"></i>企业管理</a><span class="sep">&gt;</span><span
                    class="text-primary">许可证信息管理</span>
            </div>
        </div>
        <div class="panel">
            <div class="panel-bd">
                <!-- 收起后样式名.filter-more-mini -->
                <div style="padding: 20px 0px 0 2px;">
                    <ul class="filter-box">
                        <li class="filter-item">
                            <div class="filter-label">许可证编号：</div>
                            <div class="filter-con">
                                <div class="el-input w180 el-input-group el-input--prefix">
                                    <input type="text" autocomplete="off" placeholder="许可证编号" v-model="search.licenseNum" class="el-input__inner" >
                                </div>
                            </div>
                        </li>

                        <li class="filter-item">
                            <div class="filter-label" style="line-height: 35px">发证日期：</div>
                            <div class="filter-con">
                                <!-- <div class="el-select w124"> -->
                                    <div class="el-input el-input--suffix">
                                        <el-date-picker style="width: 300px;height: 35px"
                                                        v-model="tiem"  value-format="yyyy-MM-dd"
                                            type="daterange"
                                            range-separator="—"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期">
                                        </el-date-picker>
                                    </div>
                                <!-- </div> -->
                            </div>
                        </li>
                        <!-- <li class="filter-item">
                            <div class="filter-label">责任人：</div>
                            <div class="filter-con">
                                <div class="el-input w180 el-input-group el-input--prefix">
                                    <input type="text" autocomplete="off" placeholder="责任人" v-model="search.personLiable" class="el-input__inner">
                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-label">联系电话：</div>
                            <div class="filter-con">
                                <div class="el-input w180 el-input-group el-input--prefix">
                                    <input type="text" autocomplete="off" placeholder="联系电话" v-model="search.iphone" class="el-input__inner">
                                </div>
                            </div>
                        </li> -->
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
                        <th style="text-align:center;width: 10%">许可证编号</th>
                        <th style="text-align:center;width: 10%">经营方式</th>
                        <th style="text-align:center;width: 8%">经营规模</th>
                        <th style="text-align:center;width: 8%">经营危废类别</th>
                        <th style="text-align:center;width: 10%">发证机关</th>
                        <th style="text-align:center;width: 10%">有效期开始日期</th>
                        <th style="text-align:center;width: 10%">有效期结束日期</th>
                        <th style="text-align:center;width: 10%">发证日期</th>
                        <th style="text-align:center;width: 10%">初次发证日期</th>
                        <!-- <th style="text-align:center;width: 5%">状态</th> -->
                        <th style="text-align:center;width: 10%">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in dataList">
                        <td style="text-align:center;width: 6%">{{(cur_page-1)*pageSize+index+1}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.licenseNum">{{item.licenseNum}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.modeOperation">{{item.modeOperation}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.businessScale">{{item.businessScale}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.hazardousTypeName">{{item.hazardousTypeName}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.issuingAuth">{{item.issuingAuth}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.validityStartDate">{{item.validityStartDate}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.validityEndDate">{{item.validityEndDate}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.issuanceDate">{{item.issuanceDate}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.initIssuance">{{item.initIssuance}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 14%" >
                            <div class="btn-opreate">
                                <a @click="updateStorage(item)" href="javascript:;" class="text-primary text-underline">编辑</a>
                                <a @click="delProBook(item)" href="javascript:;" class="text-primary text-underline">删除</a>
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
            <el-dialog  :modal-append-to-body="false" :close-on-click-modal="false" :title="titleName" top="9vh" :visible.sync="dialogVisible" width="800px" @close="closeDia">
                <div>
                    <el-form ref="form" label-width="150px" :model="form" :rules="listRules">
                        <tr>
                            <td>
                                <el-form-item label="许可证编号：" prop="licenseNum" :rules="listRules.licenseNum">
                                    <el-input v-model="form.licenseNum" style="width: 200px" placeholder="请输入许可证编号" :readonly="operationType == 3?true:false"></el-input>
                                </el-form-item>
                            </td>
                            <td>
                                <el-form-item label="经营方式：" prop="modeOperation" :rules="listRules.modeOperation">
                                    <el-input v-model="form.modeOperation" style="width: 200px" placeholder="请输入经营方式" :readonly="operationType == 3?true:false"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <!-- :disabled ="!lookFlog" -->
                                <el-form-item label="危废类别"  prop="vfKind" :rules="listRules.vfKind">
                                    <el-select v-model="form.vfKind" placeholder="请选择"  style = "width: 200px"     @change="selectVfInfo(form.vfKind,1)">
                                        <el-option
                                                v-for="item in wfKindList"
                                                :key="item.code"
                                                :label="item.name"
                                                :value="item.code"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </td>
                            <td>
                                <el-form-item label="危废名称及代码" prop="hazardousType" :rules="listRules.hazardousType">
                                    <!-- :disabled="form.vfKind=='' || !lookFlog" -->
                                    <el-select v-model="form.hazardousType" placeholder="请选择" :disabled="form.vfKind=='' || !lookFlog"  style = "width: 140px"  >
                                        <el-option
                                                v-for="item in codeList"
                                                :key="item.code"
                                                :label="item.name"
                                                :value="item.code"
                                        ></el-option>
                                    </el-select>
                                    <!-- :disabled="form.vfKind=='' || !lookFlog" -->
                                    <el-button  type="button" class="el-button el-button--primary"  size="mini" :disabled="form.vfKind=='' || !lookFlog"    @click="newOne(form.vfKind)"> 新增</el-button>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                 <el-form-item label="经营规模：" prop="businessScale" :rules="listRules.businessScale">
                                    <el-input v-model="form.businessScale" style="width: 200px" placeholder="请输入经营规模" :readonly="operationType == 3?true:false"></el-input>
                                </el-form-item>
                            </td>
                            <td>
                                 <el-form-item label="发证机关：" prop="issuingAuth" :rules="listRules.issuingAuth">
                                    <el-input v-model="form.issuingAuth" style="width: 200px" placeholder="请输入发证机关" :readonly="operationType == 3?true:false"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <el-form-item label="有效期开始日期" prop="validityStartDate" :rules="listRules.validityStartDate"><el-date-picker v-model="form.validityStartDate" type="date" value-format="yyyy-MM-dd"
                                placeholder="选择有效期开始日期" style="width: 200px"></el-date-picker>
                                </el-form-item>
                            </td>
                            <td>
                                <el-form-item label="有效期结束日期" prop="validityEndDate" :rules="listRules.validityEndDate"><el-date-picker v-model="form.validityEndDate" type="date" value-format="yyyy-MM-dd"
                                placeholder="选择有效期结束日期" style="width: 200px"></el-date-picker>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                             <td>
                                <el-form-item label="初次发证日期" prop="initIssuance" :rules="listRules.initIssuance"><el-date-picker v-model="form.initIssuance" type="date" value-format="yyyy-MM-dd"
                                placeholder="选择初次发证日期" style="width: 200px"></el-date-picker>
                                </el-form-item>
                            </td>
                            <td>
                                <el-form-item label="发证日期" prop="issuanceDate" :rules="listRules.issuanceDate"><el-date-picker v-model="form.issuanceDate" type="date" value-format="yyyy-MM-dd"
                                placeholder="选择发证日期" style="width: 200px"></el-date-picker>
                                </el-form-item>
                            </td>
                        </tr>
                    </el-form>
                    <div slot="footer" class="dialog-footer" style="text-align: center;">
                        <el-button type="primary" @click="insertForm('form')" v-if="operationType=='1'">保存</el-button>
                        <el-button type="primary" @click="upForm('form')"  v-if="operationType=='2'">保存</el-button>
                        <el-button @click="closeDia">取 消</el-button>
                    </div>
                </div>
            </el-dialog>
            <el-dialog title="新增危废代码" :modal="false"  style="margin-top: 5%" width="490px" height="500px" :visible.sync="newOneDialog" append-to-body  @close="closeDialog" :close-on-click-modal="false" >
                <template>
                    <el-form label-position="right" :model="newChil" ref="newChil" class="demo-form-inline" label-width="100px"   :rules="newChilRuls" >
                        <!--  一行  -->
                        <el-form-item label="危废类别"  prop="vfKind" >
                            <el-select v-model="newChil.vfKind" placeholder="请选择"  style = "width: 300px"  >
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
                        <el-button  type="primary"  @click="addSmall()" style="width: 200px;">保存</el-button>
                       <el-button  @click="closeDialog" style="width: 200px;">取消</el-button>
                    </div>
                </template>
            </el-dialog>
        </div>

        
    </div>
</template>

<script>
    import loadBMap from '../../common/unit/loadBMapApi'
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
            var checkName = (rule, value, callback) => {
                var _this = this;
                if (value==null||value=="" || _this.operationType!=1){
                    callback();
                }else {
                    var _this=this;
                    _this.$axios.get('/api/regulatory/tStorageFacilities/showOnlyFacilitiesName?facilitiesName='+value).then(
                        function (res) {
                            if(res.code == 0){
                                if (!res.data) {
                                    callback();
                                } else {
                                    return callback(new Error('贮存间名称已存在，请重新输入！'));
                                }
                            }
                        }
                    ).catch((error) => {
                        console.log(error);
                    });
                }
            };
            var checkDeviceNo = (rule, value, callback) => {
                var _this = this;
                if (value==null||value==""){
                    callback();
                }else {
                    var _this=this;
                    var params = new URLSearchParams();
                    params.append('deviceNo', value);
                    params.append('id', this.equipment.id);
                    _this.$axios.get('/api/regulatory/tStorageFacilities/checkDeviceNo',{params}).then(
                        function (res) {
                            if(res.code == 0){
                                if (res.data) {
                                    callback();
                                } else {
                                    return callback(new Error('该设备编号已存在，不许重复绑定同一设备！'));
                                }
                            }
                        }
                    ).catch((error) => {
                        console.log(error);
                    });
                }
            };
            return {
                labelPosition:"right",
                bindDeviceTitle:'绑定设备',
                adminList:[],
                equipment:{
                    id:"",
                    userId:"",
                    terminalNo:'',
                    facilitiesId:''
                },
                tiem:['',''],
                searchKeyWord:'',
                bindDeviceDialog:false,
                dialogVisible:false,
                total:0,
                totalPage:0,
                cur_page: 1,
                pageSizes: this.AppConfig.appInfo.pageSizes,
                pageSize: this.AppConfig.appInfo.pageSize,
                dataList: [],
                search:{
                    licenseNum:'',
                    issuanceStartDate: '',
                    issuanceEndDate:'',
                    page: 1,
                    limit : 10,　
                },
                titleName : '',
                positionform:{
                    lat:'',
                    lng:'',
                },
                form:{
                    id:'',
                    licenseNum:'',
                    modeOperation:'',
                    hazardousType:'',
                    businessScale:'',
                    issuingAuth:'',
                    validityStartDate:'',
                    validityEndDate:'',
                    initIssuance:'',
                    issuanceDate:''
                },
                listRules:{
                    // {validator: checkName, trigger: 'blur'}
                    licenseNum:[{required:true,message:'请输入许可证编号',trigger:'blur'}],
                    modeOperation:[{required:true,message:'请选择经营方式',trigger:'blur'}],
                    hazardousType:[{required:true,message:'请选择危废类别',trigger:'blur'}],
                    vfKind:[{required:true,message:'请选择危废类别',trigger:'blur'}],
                    businessScale: [{required:true,message:'请输入经营规模',trigger:'blur'}],
                    issuingAuth:[{required:true,message:'请输入发证机关',trigger:'blur'}],
                    validityStartDate:[{required:true,message:'请选择有效期开始日期',trigger:'blur'}],
                    validityEndDate:[{required:true,message:'请选择有效期结束日期',trigger:'blur'}],
                    initIssuance:[{required:true,message:'请选择初次发证日期',trigger:'blur'}],
                    issuanceDate:[{required:true,message:'请选择发证日期',trigger:'blur'}],
                    code:[{required:true,message:'请选择危废类别',trigger:'blur'}],
                    // phone:[{required:true,message:'请输入联系电话',trigger:'blur'},{validator: checkPhone, trigger: 'blur'}],
                    // address:[{required:true,message:'请输入地址',trigger:'blur'}],
                    // lng:[{required:true,message:'请选择经纬度',trigger:'blur'}],
                },
                bindDeviceRules:{
                    terminalNo:[{required:true,message:'请输入设备编号',trigger:'blur'},{validator: checkDeviceNo, trigger: 'blur'}],
                    userId:[{required:true,message:'请选择管理员',trigger:'change'}],

                },
                operationType: 1,
                rules:{},
                dialogVisibleImg: false,
                dialogImageUrl:'',
                mapDialog:false,
                fileList:[],
                dialogShowVisible: false,
                wfKindList:[],
                vfCode:'',
                newChil:{
                    vfKind:'',
                    vfcode:'',
                    vfname:'',
                },
                newOneDialog:false,
                codeList:[],
                lookFlog:false,
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
            }
        },
        created: function () {
            this.pageList();
            this.onloadSelects();
        },
        methods: {
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
            },
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
            onloadSelects(){
                var _this=this;
                var params = new URLSearchParams();
                _this.$axios.get('/api/regulatory/tStorageFacilities/storageSettingSelects',{params}).then(
                    function (res) {
                        if(res.code == 0){
                            _this.wfKindList = res.data.wfKindList;
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    console.log(error);
                });
            },

            selectVfInfo(vfCode,co){
                var _this=this;
                this.lookFlog = true;
                // _this.newChil.vfKind = vfCode;
                _this.vfCode = vfCode;
                this.newChil.vfcode = vfCode;
                // _this.form.hazardousType = ''
                var params = new URLSearchParams();
                _this.$axios.get('/api/regulatory/tStorageFacilities/storageSettingCodeInfoSelects',{params:{ vfCode:vfCode }}).then(
                    function (res) {
                        if(res.code == 0){
                            _this.codeList = res.data;
                            if(res.data.length > 0){
                                if(co == 1){
                                    _this.form.hazardousType = res.data[0].code
                                }
                            }
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    console.log(error);
                });
            },

            addBindDevice(){
                this.$refs["deviceForm"].validate((valid) => {
                    if (valid) {
                        this.$axios.post("/api/regulatory/tStorageFacilities/addBindDevice",this.equipment).then((res)=>{
                            if(res.data){
                                this.$message({ message:"绑定成功", type:'success' });
                                this.closeBindDialog();
                                this.pageList();
                            }
                        })

                    }})
            },

            updateBindDevice(){
                 this.$refs["deviceForm"].validate((valid) => {
                    if (valid) {
                        this.$axios.post("/api/enterprise/tStorageFacilities/updateBindDevice",this.equipment).then((res)=>{
                            this.$message({ message:res.msg, type:'success' });
                            this.closeBindDialog();
                            this.pageList();
                        })

                    }})
            },
            bindDevice(item){
                this.bindDeviceDialog = true;
                this.equipment.facilitiesId = item.id;
                if(item.teeId != null && item.teeId != ''){
                    this.bindDeviceTitle = '修改绑定'
                    this.equipment.userId = item.userId;
                    this.equipment.terminalNo = item.terminalNo;
                    this.equipment.id = item.teeId;
                }else{
                    this.bindDeviceTitle = '绑定设备'
                }
            },
            closeBindDialog(){
                this.bindDeviceDialog = false;
                this.equipment = {
                    id:"",
                    userId:"",
                    terminalNo:'',
                    facilitiesId:''
                }
                this.$refs['deviceForm'].resetFields();
            },
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
            show(){
                var _this=this;
                _this.cur_page = 1;
                _this.pageSize = 10;
                _this.pageList();
            },
            pageList(){
                var _this=this;
                var params = new URLSearchParams();
                params.append('page', _this.cur_page);
                params.append('limit', _this.pageSize);
                params.append('licenseNum', _this.search.licenseNum);
                _this.tiem == null ? _this.tiem=['',''] : _this.tiem;
                params.append('issuanceStartDate', _this.tiem[0]==null?'':_this.tiem[0]);
                params.append('issuanceEndDate', _this.tiem[1]==null?'':_this.tiem[1]);
                _this.$axios.get('/api/regulatory/hazardousBusinessLicense/queryHazardousLicenseList',{params}).then(
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
            closeShowDia(){
                this.form={
                    id:'',
                    licenseNum:'',
                    modeOperation:'',
                    hazardousType:'',
                    businessScale:'',
                    issuingAuth:'',
                    validityStartDate:'',
                    validityEndDate:'',
                    initIssuance:'',
                    issuanceDate:''
                }
                this.dialogShowVisible = false;
            },
            
            insertStorage(){
                var _this = this;
                _this.operationType = 1;
                _this.titleName = "新增许可证信息";
                _this.dialogVisible = true;
            },
             updateStorage(item){
                var _this = this;
                _this.operationType = 2;
                _this.titleName = "编辑许可证信息";
                _this.form = item;
                this.selectVfInfo(this.form.vfKind,2);
                _this.dialogVisible = true;
            },
           
            delProBook(item){
                this.$confirm('确定删除该许可证信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,
                    type: 'warning'
                }).then(() => {
                    this.executeDel(item);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除操作'
                    });
                });
            },
            executeDel(item){
                var _this=this;
                var params = new URLSearchParams();
                _this.$axios.get('/api/regulatory/hazardousBusinessLicense/delHazardousLicense/'+item.id).then(function (res) {
                    if(res.code == 0){
                        _this.$message.success("删除许可证信息成功");
                        _this.pageList();
                    }else{
                        _this.$message.warning(res.msg);
                    }
                }).catch((error) => {
                    // catch 指请求出错的处理
                    console.log(error);
                });
            },
            closeDia(){
                var _this = this;
                _this.$nextTick(() => {
                    _this.form ={
                        id:'',
                    licenseNum:'',
                    modeOperation:'',
                    hazardousType:'',
                    businessScale:'',
                    issuingAuth:'',
                    validityStartDate:'',
                    validityEndDate:'',
                    initIssuance:'',
                    issuanceDate:''
                    };
                    _this.$refs['form'].clearValidate();
                    this.dialogVisible = false;
                });
            },
            //编辑
            upForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var _this=this;
                        _this.$axios.post('/api/regulatory/hazardousBusinessLicense/updateHazardousLicense',_this.form,{
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
            // 新增
            insertForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var _this=this;
                        _this.$axios.post('/api/regulatory/hazardousBusinessLicense/addHazardousLicense',_this.form).then(
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
