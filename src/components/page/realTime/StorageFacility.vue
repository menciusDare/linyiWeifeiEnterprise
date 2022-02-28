<template>
    <!-- 主体 -->
    <div class="main">
        <div class="main-top">
            <div class="breadcrumb">
                <a href="#"><i class="icon icon-zhihuijianguan menu-icon"></i>企业管理</a><span class="sep">&gt;</span><span
                    class="text-primary">贮存间管理</span>
            </div>
        </div>
        <div class="panel">
            <div class="panel-bd">
                <!-- 收起后样式名.filter-more-mini -->
                <div style="padding: 20px 0px 0 2px;">
                    <ul class="filter-box">
                        <li class="filter-item">
                            <div class="filter-label">贮存间名称：</div>
                            <div class="filter-con">
                                <div class="el-input w180 el-input-group el-input--prefix">
                                    <input type="text" autocomplete="off" placeholder="贮存间名称" v-model="search.facilitiesName" class="el-input__inner" >
                                </div>
                            </div>
                        </li>

                        <li class="filter-item">
                            <div class="filter-label">贮存间类型：</div>
                            <div class="filter-con">
                                <div class="el-select w124">
                                    <el-select v-model="search.storageType" >
                                        <el-option
                                                v-for="item in storageTypeList"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
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
                        <th style="text-align:center;width: 10%">贮存间名称</th>
                        <th style="text-align:center;width: 10%">贮存间类型</th>
                        <th style="text-align:center;width: 8%">责任人</th>
                        <th style="text-align:center;width: 8%">联系电话</th>
                        <th style="text-align:center;width: 10%">修改人</th>
                        <th style="text-align:center;width: 10%">修改时间</th>
                        <th style="text-align:center;width: 5%">状态</th>
                        <th style="text-align:center;width: 10%">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in dataList" :key="index">
                        <td style="text-align:center;width: 6%">{{(cur_page-1)*pageSize+index+1}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 14%" :title="item.facilitiesName">{{item.facilitiesName}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.storageTypeName">{{item.storageTypeName}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.personLiable">{{item.personLiable}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.phone">{{item.phone}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.updateBy">{{item.updateBy}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.updateTime">{{item.updateTime}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" >{{item.storageStatus == 1 ? '停用':'生效'}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" >
                            <div class="btn-opreate">
                                <a @click="lookInfo(item)" href="javascript:;" class="text-primary text-underline">查看</a>
                                <a @click="updateStorage(item)" href="javascript:;" class="text-primary text-underline">编辑</a>
                                <a @click="stopStorage(item)" href="javascript:;" class="text-primary text-underline">{{item.storageStatus != 1 ? '停用':'启用'}}</a>
                                <a @click="bindDevice(item)" href="javascript:;" class="text-primary text-underline"> {{item.teeId == null ? '绑定设备':'修改绑定'}}</a>
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
                    <el-form ref="formFacilities" label-width="150px" :model="formFacilities" :rules="listRules">
                        <tr>
                            <td>
                                <el-form-item label="贮存间名称：" prop="facilitiesName" :rules="listRules.facilitiesName">
                                    <el-input v-model="formFacilities.facilitiesName" style="width: 200px" placeholder="请输入贮存间名称" :readonly="operationType == 3?true:false"></el-input>
                                </el-form-item>
                            </td>
                            <td>
                                <el-form-item label="贮存间类型：" prop="storageType" :rules="listRules.storageType">
                                    <el-select v-model="formFacilities.storageType" style="width: 200px" placeholder="请选择贮存间类型" :disabled="operationType == 3?true:false">
                                        <el-option
                                                v-for="item in storageTypes"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <el-form-item label="贮存间大小：" prop="area"  :rules="listRules.area">
                                    <el-input v-model="formFacilities.area" style="width: 200px" placeholder="请输入贮存间大小" :readonly="operationType == 3?true:false"></el-input>
                                </el-form-item>
                            </td>
                            <td>
                                <el-form-item label="贮存间大小单位：" prop="areaType" :rules="listRules.areaType">
                                    <el-select v-model="formFacilities.areaType" style="width: 200px" placeholder="请选择贮存间大小单位" :disabled="operationType == 3?true:false">
                                        <el-option
                                                v-for="item in areaTypes"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <el-form-item label="贮存能力（KG）：" prop="maxAmount" :rules="listRules.maxAmount">
                                    <el-input v-model="formFacilities.maxAmount" style="width: 200px" placeholder="请输入贮存能力" :readonly="operationType == 3?true:false"></el-input>
                                </el-form-item>
                            </td>
                            <td>
                                <el-form-item label="设置经纬度：" prop="lng" >
                                    <el-input v-model="formFacilities.lng" style="width: 75px" placeholder="请选择经度" :readonly="true" :title="formFacilities.lng"></el-input>
                                    <el-input v-model="formFacilities.lat" style="width: 75px" placeholder="请选择纬度" :readonly="true" :title="formFacilities.lat"></el-input>
                                    <el-button icon="el-icon-plus" size="small" @click="showMap"></el-button>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <el-form-item label="责任人：" prop="personLiable" :rules="listRules.personLiable">
                                    <el-input v-model="formFacilities.personLiable" style="width: 200px" placeholder="请输入责任人" :readonly="operationType == 3?true:false"></el-input>
                                </el-form-item>
                            </td>
                            <td>
                                <el-form-item label="联系电话：" prop="phone" :rules="listRules.phone">
                                    <el-input v-model="formFacilities.phone" style="width: 200px" placeholder="请输入联系电话" :readonly="operationType == 3?true:false"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <el-form-item label="地址：" prop="address" :rules="listRules.address">
                                    <el-input v-model="formFacilities.address" style="width: 550px" placeholder="请输入地址" :readonly="operationType == 3?true:false"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <el-form-item label="备注：" prop="remark" >
                                    <el-input v-model="formFacilities.remark" style="width: 550px" :rows="4" type="textarea" placeholder="请输入备注" :readonly="operationType == 3?true:false"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <el-form-item label="图片：">
                                    <el-upload
                                            action="/api/permissions/app/imageController/uploadImage"
                                            list-type="picture-card"
                                            accept="image/*"
                                            ref="upload"
                                            :on-preview="handlePictureCardPreview"
                                            :on-remove="handleRemove"
                                            :on-success="onSuccessImg"
                                            :file-list="fileList" :disabled="operationType == 3?true:false" prop= "">
                                        <i class="el-icon-plus" ></i>
                                    </el-upload>
                                    <el-dialog :visible.sync="dialogVisibleImg" :modal="false"  :modal-append-to-body="false" title="大图" top="30px">
                                        <img width="100%" :src="dialogImageUrl" alt="">
                                    </el-dialog>
                                </el-form-item>
                            </td>
                        </tr>
                    </el-form>
                    <div slot="footer" class="dialog-footer" style="text-align: center;">
                        <el-button type="primary" @click="insertForm('formFacilities')" v-if="operationType=='1'">保存</el-button>
                        <el-button type="primary" @click="upForm('formFacilities')"  v-if="operationType=='2'">保存</el-button>
                        <el-button @click="closeDia">取 消</el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
        <el-dialog  title="请选择地址" :visible.sync="mapDialog" width="850px" top="40px" :modal-append-to-body="false" :close-on-click-modal="false" @close="closeSelectMap">
            <div>
                <el-form :inline="true" class="demo-form-inline" ref="form" :model="positionform">
                    <el-form-item label="经度：">
                        <el-input v-model="positionform.lng" style="width: 150px" :readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="纬度：">
                        <el-input v-model="positionform.lat" style="width: 150px" :readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="closeSelectMap" style="margin-left: 10px;">确定</el-button>
                        <el-button  @click="closeMap">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="allmap" id="wfMap"></div>
            <div style="position: absolute;left: 25px;top: 150px;">
                <el-input
                        id="suggestId"
                        size="mini"
                        v-model="searchKeyWord"
                        placeholder="请输入检索关键字"
                        suffix-icon="el-icon-search">
                </el-input>
                <div id="searchResultPanel" style="display: none;height:auto"></div>
            </div>
        </el-dialog>
        <el-dialog  :modal-append-to-body="false" :close-on-click-modal="false" title="贮存间详情" top="9vh" :visible.sync="dialogShowVisible" width="800px" @close="closeShowDia">
            <div>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light appeal" ><span>&nbsp;&nbsp;&nbsp;&nbsp;贮存间名称：{{formFacilities.facilitiesName}}</span></div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-light appeal"><span>&nbsp;&nbsp;&nbsp;&nbsp;贮存间类型：{{forrmotName(storageTypes,formFacilities.storageType)}}</span></div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple appeal"><span>&nbsp;&nbsp;&nbsp;&nbsp;贮存间大小：{{formFacilities.area}}</span></div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple appeal"><span>&nbsp;&nbsp;&nbsp;&nbsp;贮存间大小单位：{{forrmotName(areaTypes,formFacilities.areaType)}}</span></div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple-light appeal"><span>&nbsp;&nbsp;&nbsp;&nbsp;贮存能力（KG）：{{formFacilities.maxAmount}}</span></div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple-light appeal"><span>&nbsp;&nbsp;&nbsp;&nbsp;经纬度：{{formatString(formFacilities.lng)+' ，'+formatString(formFacilities.lat)}}</span></div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple appeal"><span>&nbsp;&nbsp;&nbsp;&nbsp;责任人：{{formFacilities.personLiable}}</span></div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple appeal"><span>&nbsp;&nbsp;&nbsp;&nbsp;联系电话：{{formFacilities.phone}}</span></div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="24"><div class="grid-content bg-purple-light appeal"><span>&nbsp;&nbsp;&nbsp;&nbsp;地址：{{formFacilities.address}}</span></div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="24"><div class="grid-content bg-purple appeal2"><span>&nbsp;&nbsp;&nbsp;&nbsp;备注：{{formFacilities.remark}}</span></div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content bg-purple-light"  style="padding: 10px 0px">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;图片：</span>
                            <div class="block" style="padding: 10px 0px">
                                <el-image v-for="fit in fileList" :key="fit"  style="width: 100px; height: 100px;padding: 5px"
                                        :src="fit.url"
                                        fit="fill" :preview-src-list="[fit.url]"></el-image>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <div slot="footer" class="dialog-footer bg-purple-light" style="text-align: center;padding: 10px">
                    <el-button  type="primary" plain @click="closeShowDia">关闭</el-button>
                </div>
            </div>
        </el-dialog>

        <el-dialog  :title="bindDeviceTitle" :visible.sync="bindDeviceDialog" width="850px" top="40px" :modal-append-to-body="false" :close-on-click-modal="false" @close="closeBindDialog">
            <div>
                <el-form :label-position="labelPosition"   class="demo-form-inline" ref="deviceForm" :model="equipment" :rules="bindDeviceRules">
                    <el-form-item label="设备编号：" prop="terminalNo" label-width="100px">
                        <el-input v-model="equipment.terminalNo" style="width: 350px" ></el-input>
                    </el-form-item>
                    <el-form-item label="管理员：" prop="userId" label-width="100px">
                        <!-- <el-input v-model="equipment.userId" style="width: 150px" :readonly="true"></el-input> -->
                        <el-select v-model="equipment.userId" style="width: 150px" placeholder="请选择管理员">
                            <el-option
                                v-for="item in adminList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item>
                        <el-button v-if="bindDeviceTitle == '绑定设备'" type="primary" @click="addBindDevice()" style="margin-left: 10px;">确定</el-button>
                        <el-button v-if="bindDeviceTitle == '修改绑定'" type="primary" @click="updateBindDevice()" style="margin-left: 10px;">确定</el-button>
                        <el-button  @click="closeBindDialog">取消</el-button>
                    </el-form-item> -->
                </el-form>

                    <div slot="footer" class="dialog-footer" style="text-align: center;">
                        <el-button v-if="bindDeviceTitle == '绑定设备'" type="primary" @click="addBindDevice()" style="margin-left: 10px;">确定</el-button>
                        <el-button v-if="bindDeviceTitle == '修改绑定'" type="primary" @click="updateBindDevice()" style="margin-left: 10px;">确定</el-button>
                        <el-button  @click="closeBindDialog">取消</el-button>
                    </div>
            </div>
        </el-dialog>
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
                searchKeyWord:'',
                bindDeviceDialog:false,
                dialogVisible:false,
                total:0,
                totalPage:0,
                cur_page: 1,
                pageSizes: this.AppConfig.appInfo.pageSizes,
                pageSize: this.AppConfig.appInfo.pageSize,
                dataList: [],
                storageTypeList: [{
                    value: '-1',
                    label: '全部'
                }, {
                    value: '1',
                    label: '仓库'
                }, {
                    value: '2',
                    label: '贮存池'
                }, {
                    value: '3',
                    label: '储罐'
                }],
                storageTypes: [ {
                    value: '1',
                    label: '仓库'
                }, {
                    value: '2',
                    label: '贮存池'
                }, {
                    value: '3',
                    label: '储罐'
                }],
                areaTypes: [ {
                    value: '1',
                    label: '平方'
                }, {
                    value: '2',
                    label: '立方'
                }],
                search:{
                    facilitiesName:'',
                    storageType: '-1',
                    personLiable:'',
                    iphone:'',
                    page: 1,
                    limit : 10,　
                },
                titleName : '',
                positionform:{
                    lat:'',
                    lng:'',
                },
                formFacilities:{
                    id:'',
                    facilitiesName:'',
                    storageType:'',
                    area:'',
                    areaType:'',
                    maxAmount:'',
                    personLiable:'',
                    phone:'',
                    address:'',
                    lat:'',
                    lng:'',
                    remark:'',
                    attachmentList: []
                },
                listRules:{
                    facilitiesName:[{required:true,message:'请输入贮存间名称',trigger:'blur'},{validator: checkName, trigger: 'blur'}],
                    storageType:[{required:true,message:'请选择贮存间类型',trigger:'change'}],
                    area:[{required:true,message:'请输入贮存间大小',trigger:'blur'}],
                    areaType: [{required:true,message:'请选择贮存间大小单位',trigger:'change'}],
                    maxAmount:[{required:true,message:'请输入贮存能力',trigger:'blur'}],
                    personLiable:[{required:true,message:'请输入责任人',trigger:'blur'}],
                    phone:[{required:true,message:'请输入联系电话',trigger:'blur'},{validator: checkPhone, trigger: 'blur'}],
                    address:[{required:true,message:'请输入地址',trigger:'blur'}],
                    lng:[{required:true,message:'请选择经纬度',trigger:'blur'}],
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
            }
        },
        created: function () {
            this.pageList();
            this.getEntAdminList();
        },
        methods: {
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
            getEntAdminList(){
               this.$axios.get('/api/regulatory/tStorageFacilities/getEntAdminList')
               .then(res=>{
                   this.adminList = res.data;
               })
            },
            formatString(str){
                return (str == null || str == "" || str == undefined) ? "-" : str;
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
                params.append('page', _this.cur_page);
                params.append('limit', _this.pageSize);
                params.append('facilitiesName', _this.search.facilitiesName);
                params.append('storageType', 1);
                params.append('type', 1);
                params.append('personLiable', _this.search.personLiable);
                params.append('iphone', _this.search.iphone);
                _this.$axios.get('/api/regulatory/tStorageFacilities/queryFacilitiesList',{params}).then(
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
            changeLngAndLat(){
                var _this = this;
                if(_this.formFacilities.lng!=null && _this.formFacilities.lng!=''
                && _this.formFacilities.lat!=null && _this.formFacilities.lat!=''){
                    _this.$refs["formFacilities"].clearValidate(['lng']);
                }
            },
            closeShowDia(){
                this.formFacilities={
                    id:'',
                        facilitiesName:'',
                        storageType:'',
                        area:'',
                        areaType:'',
                        maxAmount:'',
                        personLiable:'',
                        phone:'',
                        address:'',
                        lat:'',
                        lng:'',
                        remark:'',
                        attachmentList: []
                }
                this.dialogShowVisible = false;
            },
            lookInfo(item){
                var _this = this;
                _this.formFacilities = item;
                _this.formFacilities.areaType =item.areaType+"";
                 _this.formFacilities.storageType =item.storageType+"";
               _this.formFacilities.storageType =item.storageType+"";
                _this.fileList = [];
                for(var i =0;i<item.attachmentList.length;i++){
                    var obj = item.attachmentList[i];
                    var imgs = new Object();
                    imgs.name = obj.fileName;
                    imgs.url = _this.IMG_URL+obj.locationUrl;
                    this.fileList.push(imgs);
                }
                _this.dialogShowVisible = true;
            },
            updateStorage(item){
                var _this = this;
                _this.operationType = 2;
                _this.titleName = "编辑贮存间";
                _this.formFacilities = item;
                _this.formFacilities.areaType =item.areaType+"";
                _this.formFacilities.storageType =item.storageType+"";
                _this.fileList = [];
                var files = [];
                for(var i =0;i<item.attachmentList.length;i++){
                    var obj = item.attachmentList[i];
                    var imgs = new Object();
                    imgs.name = obj.fileName;
                    imgs.url = _this.IMG_URL+obj.locationUrl;
                    obj.url = _this.IMG_URL+obj.locationUrl;
                    this.fileList.push(imgs);
                    files.push(obj);
                }
                _this.formFacilities.attachmentList = files;
                _this.dialogVisible = true;
            },
            insertStorage(){
                var _this = this;
                _this.operationType = 1;
                _this.titleName = "新增贮存间";
                _this.dialogVisible = true;
            },
            handleRemove(file, fileList) {
                var _this = this;
                _this.fileList = [];
                var imgLists = [];
                var fileUrl = "";
                var thumbUrl = "";
                for(var i = 0; i< _this.formFacilities.attachmentList.length;i++){
                    if(_this.formFacilities.attachmentList[i].url!=file.url){
                        var imgs = new Object();
                        imgs.name = _this.formFacilities.attachmentList[i].name;
                        imgs.url = _this.IMG_URL+_this.formFacilities.attachmentList[i].locationUrl;
                        _this.fileList.push(imgs);
                        imgLists.push(_this.formFacilities.attachmentList[i]);
                    }else{
                        fileUrl = _this.formFacilities.attachmentList[i].locationUrl;
                        thumbUrl = _this.formFacilities.attachmentList[i].thumbnailUrl;
                    }
                }
                _this.formFacilities.attachmentList = [];
                _this.formFacilities.attachmentList = imgLists;
                var params = new URLSearchParams();
                params.append('fileUrl', fileUrl);
                params.append('thumbUrl', thumbUrl);
                console.log(_this.formFacilities.attachmentList)
                _this.$axios.post("/api/permissions/imageController/batchDeleteImageByUrl",params).then((res)=>{
                })
            },
            onSuccessImg(response,file,fileList){
                if(response.code == 0){
                    var obj = response.data;
                    obj.url = this.IMG_URL+obj.locationUrl;
                    obj.fileName= file.name
                    this.formFacilities.attachmentList.push(obj);
                    var imgs = new Object();
                    imgs.name = file.name;
                    imgs.url = obj.url;
                    this.fileList.push(imgs);
                    this.$message({ message:"上传成功", type:'success' });
                    return true;
                }else{
                    this.$message({ message:res.msg, type:'error' })
                    return false;
                }
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisibleImg = true;
            },
            showMap(){
                var _this = this;
                _this.positionform.lat = _this.formFacilities.lat;
                _this.positionform.lng = _this.formFacilities.lng;
                loadBMap('IGAhv4rnLVYAIiUoTpcquETTlUaIaLNr', 1).then(() => {
                    var map = new BMap.Map("wfMap",{
                        enableMapClick:false// 构造底图时，关闭底图可点功能
                    });//在百度地图容器中创建一个地图
                    var point = null;
                    if(_this.positionform.lat && _this.positionform.lng){
                        point = new BMap.Point(_this.positionform.lng, _this.positionform.lat);//定义一个中心点坐标
                        map.centerAndZoom(point, 16);  // 初始化地图,设置中心点坐标和地图级别
                        map.addOverlay(new BMap.Marker(point));    //添加标注
                    }else{
                        point = new BMap.Point(_this.AppConfig.appInfo.lng, _this.AppConfig.appInfo.lat);//定义一个中心点坐标
                        map.centerAndZoom(point, 11);  // 初始化地图,设置中心点坐标和地图级别
                    }
                    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
                    map.addEventListener('click', function (e) {
                        _this.positionform.lat = e.point.lat;
                        _this.positionform.lng = e.point.lng;
                        _this.formFacilities.lat = e.point.lat;
                        _this.formFacilities.lng = e.point.lng;
                        map.clearOverlays();//清空地图覆盖物
                        let pp = new BMap.Point(e.point.lng,e.point.lat);//定义一个中心点坐标
                        map.centerAndZoom(pp, 16);
                        map.addOverlay(new BMap.Marker(pp));    //添加标注
                    });
                    var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
                        {"input" : "suggestId"
                            ,"location" : map
                        });

                    ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
                        var str = "";
                        var _value = e.fromitem.value;
                        var value = "";
                        if (e.fromitem.index > -1) {
                            value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
                        }
                        str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

                        value = "";
                        if (e.toitem.index > -1) {
                            _value = e.toitem.value;
                            value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
                        }
                        str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
                        document.getElementById("searchResultPanel").innerHTML = str;
                    });

                    var myValue;
                    ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
                        var _value = e.item.value;
                        myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
                        document.getElementById("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;

                        setPlace();
                    });

                    function setPlace(){
                        map.clearOverlays();    //清除地图上所有覆盖物
                        function myFun(){
                            var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                            _this.positionform.lat = pp.lat;
                            _this.positionform.lng = pp.lng;
                            _this.formFacilities.lat = pp.lat;
                            _this.formFacilities.lng = pp.lng;
                            map.centerAndZoom(pp, 16);
                            map.addOverlay(new BMap.Marker(pp));    //添加标注
                        }
                        var local = new BMap.LocalSearch(map, { //智能搜索
                            onSearchComplete: myFun
                        });
                        local.search(myValue);
                    }
                }).catch(err => {
                    console.log(err);
                    console.log("地图加载失败");
                });
                _this.mapDialog = true;
            },
            closeMap(){
                var self = this;
                self.positionform.lat = "";
                self.positionform.lng = "";
                self.formFacilities.lat = "";
                self.formFacilities.lng = "";
                self.mapDialog =false;
            },
            closeSelectMap(){
                var self = this;
                self.mapDialog =false;
                self.positionform = {
                    lat:"",
                    lng:""
                }
                self.changeLngAndLat();
            },
            closeDia(){
                var _this = this;
                _this.$nextTick(() => {
                    _this.formFacilities ={
                        id:'',
                        facilitiesName:'',
                        storageType:'',
                        area:'',
                        areaType:'',
                        maxAmount:'',
                        personLiable:'',
                        phone:'',
                        address:'',
                        lat:'',
                        lng:'',
                        remark:'',
                        attachmentList: []
                    };
                    _this.dialogImageUrl = "";
                    _this.fileList = [];
                    _this.dialogVisible = false;
                    _this.positionform = {
                        lat:"",
                        lng:""
                    }
                    _this.$refs['formFacilities'].clearValidate();
                });
            },
            insertForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var _this=this;
                       let param =_this.formFacilities
                       param.type =1
                        _this.$axios.post('/api/regulatory/tStorageFacilities/insertFacilities',param).then(
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
                        _this.$axios.post('/api/regulatory/tStorageFacilities/upFacilities',_this.formFacilities,{
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
            forrmotName(list,value){
                var _this = this;
                for(var i = 0;i<list.length;i++){
                     if(list[i].value == value){
                         return list[i].label;
                     }
                }
            },
            stopStorage(item){
                var _this=this;

                _this.$confirm(item.storageStatus == 1?'此操作将启用该贮存间, 是否继续?':'此操作将停用该贮存间, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,
                    type: 'warning'
                }).then(() => {
                    var params = new URLSearchParams();
                    params.append('id', item.id);
                    params.append('status', item.storageStatus == 1?0:1);
                    _this.$axios.post('/api/regulatory/tStorageFacilities/stopUsingFacilities',params).then(
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
