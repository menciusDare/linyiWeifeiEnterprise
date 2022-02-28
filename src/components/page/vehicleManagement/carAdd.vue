<template>
    <div >
            <b v-if="!flag">新增车辆</b>
            <b v-else>编辑车辆</b>
            <div >
                <el-form :model="carForm" :rules="carFormrules"  ref="carForm"   class="demo-ruleForm" >
                    <tr>
                        <td style = "width: 490px">
                            <el-form-item label="车牌号" prop="carNo" class="lableWidthClass"label-width="130px" >
                                <el-input v-model="carForm.carNo" placeholder="请输入车牌号" style = "width: 240px" autocomplete="off"></el-input>
                            </el-form-item>

                           <!-- <el-form-item label="姓名" :label-width="130px" prop="carForm.carNo">
                                <el-input  class="infoinput" v-model="carForm.carNo" ></el-input>
                            </el-form-item>-->
                        </td>
                        <td style = "width: 50%">
                            <el-form-item label="车辆类型" prop="dictDetailName" class="lableWidthClass"label-width="130px" >
                                <el-select v-model="carForm.dictDetailCode" placeholder="请选择"  style = "width: 240px">
                                    <el-option
                                            v-for="item in dictDetailCodeList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <el-form-item label="上牌日期" prop="licenseDate" class="lableWidthClass"label-width="130px">
                                <div class="block">
                                    <el-date-picker
                                            v-model="carForm.licenseDate"
                                            type="date"
                                            :picker-options="pickerOptions0"
                                            style = "width: 240px"
                                            placeholder="选择日期">
                                    </el-date-picker>
                                </div>
                            </el-form-item>
                        </td>


                        <td>
                            <el-form-item label="年审到期" prop="dueDate" class="lableWidthClass"label-width="130px">
                                <div class="block">
                                    <el-date-picker
                                            v-model="carForm.dueDate"
                                            type="date"
                                            style = "width: 240px"
                                            :picker-options="pickerOptions1"
                                            placeholder="选择日期">
                                    </el-date-picker>
                                </div>
                            </el-form-item>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <el-form-item label="车主" prop="vehicleOwner" class="lableWidthClass"label-width="130px">
                                <el-input v-model="carForm.vehicleOwner" placeholder="请输入车主" style = "width: 240px"></el-input>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="联系电话" prop="phone" class="lableWidthClass"label-width="130px">
                                <el-input v-model="carForm.phone" placeholder="请输入联系电话" style = "width: 240px"></el-input>
                            </el-form-item>
                        </td>
                    </tr>

                   <!-- <tr>
                        <td>
                            <el-form-item label="驾驶员" prop="driverId" class="lableWidthClass"label-width="130px">
                                <el-select v-model="carForm.driverId" placeholder="请选择"  style = "width: 240px" @change="driverChouse(carForm.driverId)">
                                    <el-option
                                            v-for="item in driverList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id"

                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>-->

                    <tr >
                        <td style = "width: 490px">
                            <el-form-item label="车辆载重(KG)" prop="vehicleLoad" class="lableWidthClass"label-width="130px" >
                                <el-input v-model="carForm.vehicleLoad" placeholder="车辆载重(KG)" style = "width: 240px" autocomplete="off"></el-input>
                            </el-form-item>
                        </td>

                        <td style = "width: 490px">
                            <el-form-item label="车辆分类" prop="vehicleClassify" class="lableWidthClass"label-width="130px" >
                                <el-select v-model="carForm.vehicleClassify" placeholder="请选择"  style = "width: 240px">
                                    <el-option
                                            v-for="item in dictClassifyCodeList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-form-item label="状态" prop="vehicleState" class="lableWidthClass"label-width="130px">
                                <el-select v-model="carForm.vehicleState" placeholder="请选择"  style = "width: 240px">
                                    <el-option
                                            v-for="item in dictState"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="行驶证号" prop="roadPermit" class="lableWidthClass"label-width="130px">
                                <el-input v-model="carForm.roadPermit" placeholder="请输入行驶证号" style = "width: 240px"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-form-item label="是否豁免" prop="exempt" class="lableWidthClass"label-width="130px">
                                <el-select v-model="carForm.exempt" placeholder="请选择"  style = "width: 240px">
                                    <el-option
                                            v-for="item in dictExempt"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>


                </el-form>
            </div>


            <!--<div style="margin-top:1%;margin-bottom:1%;margin-top: 20px">
                <el-row :gutter="200">
                    <el-col :span="4"style="margin-left: 10px">
                        <el-upload
                                class="avatar-uploader"
                                action="/api/permissions/imageController/uploadImage"
                                :show-file-list="false"
                                :on-success="onYyzzSuccess"
                                :on-remove="handleRemove"
                                :before-upload="beforeAvatarUpload"
                        >
                            <img v-if="imageUrl1" :src="imageUrl1" class="avatar" />
                            <i v-else class="el-icon-plus avatar-uploader-icon" ></i>
                        </el-upload>
                        <div style="width: 250px;text-align: center;">车辆照片</div>
                    </el-col>
                    <el-col :span="4" style="margin-left: 90px">
                        <el-upload
                                class="avatar-uploader"
                                action="/api/permissions/imageController/uploadImage"
                                :show-file-list="false"
                                :on-success="onJyxkzSuccess"
                                :on-remove="handleRemove"
                                :before-upload="beforeAvatarUpload"
                        >
                            <img v-if="imageUrl2" :src="imageUrl2" class="avatar" />
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <div style="width: 250px;text-align: center;">行驶证首页</div>
                    </el-col>
                    <el-col :span="4" style="margin-left: 90px">
                        <el-upload
                                class="avatar-uploader"
                                action="/api/permissions/imageController/uploadImage"
                                :show-file-list="false"
                                :on-success="onYsxkzSuccess"
                                :on-remove="handleRemove"
                                :before-upload="beforeAvatarUpload"
                        >
                            <img v-if="imageUrl3" :src="imageUrl3" class="avatar" />
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <div style="width: 250px;text-align: center;">行驶证次页</div>
                    </el-col>
                </el-row>
            </div>-->

            <div style="text-align: center;margin: 1%;margin-top: 30px">
                <el-button type="primary"  @click="submitForm()" style="width: 200px;">完成</el-button>
                <el-button @click="closePage" style="width: 200px;">取消</el-button>
            </div>
        </div>



</template>

<script>
    export default {
        name: "testCar",
        data(){
            var checkPhone = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error("手机号不能为空"));
                } else {
                    var reg = /^1[345789][0-9]\d{8}$/;
                    console.log(reg.test(value));
                    if (reg.test(value)) {
                        callback();
                    } else {
                        return callback(new Error("请输入正确的手机号"));
                    }
                }
            };

            var checkDate = (rule, value, callback) => {
                if (!this.carForm.licenseDate) {
                    this.carForm.dueDate = ''
                    return callback(new Error("请先填写上牌日期"));
                } else {
                        callback();
                }
            };


            var checkNum = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error("车辆载重不能为空"));
                } else if(value == 0 || value == '0'){
                    return callback(new Error("请输入正确的载重量"));
                }else{
                    var reg = /^(\+)?\d+(\.\d+)?$/;
                    console.log(reg.test(value));
                    if (reg.test(value)) {
                        callback();
                    } else {
                        return callback(new Error("请输入正确的载重量"));
                    }
                }
            };

            return{
                pickerOptions0: {
                    disabledDate(time){
                        return time.getTime() > Date.now() - 8.64e6
                    }
                },
                pickerOptions1: {
                    disabledDate(time){
                        return time.getTime() < Date.now() - 8.64e6
                    }
                },
                imageUrl1: "",
                imageUrl2: "",
                imageUrl3: "",
                carForm:{
                    carNo:'',
                    dictDetailCode:'',
                    licenseDate:'',
                    dueDate:'',
                    vehicleOwner:'',
                    phone:'',
                    driverId:'',
                    escortId:'',
                    vehicleLoad:'',

                    vehicleClassify:'',
                    vehicleState:'',
                    roadPermit:'',
                    exempt:''

                },
                photoListForm:[],
                regionCodeOptions:'',
                ruleType:this.AppConfig.appInfo.loginType,
                IMG_URL:this.AppConfig.appInfo.IMG_URL,
                //车辆类型下拉单
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
                //车辆分类下拉单
                dictClassifyCodeList:[
                    {
                        label:'普通货车',
                        value:'普通货车',
                    },
                    {
                        label:'危废车辆',
                        value:'危废车辆',
                    },
                    {
                        label:'医废车辆',
                        value:'医废车辆',
                    },
                    {
                        label:'其他',
                        value:'其他',
                    },
                ],
                //车辆状态
                dictState:[
                    {
                        label:'启用',
                        value:'0',
                    },
                    {
                        label:'停用',
                        value:'1',
                    },
                ],
                //车辆是否豁免
                dictExempt:[
                    {
                        label:'是',
                        value:'0',
                    },
                    {
                        label:'否',
                        value:'1',
                    },
                ],
                //驾驶员列表
                driverList:[
                    {

                    }
                ],
                //押运员列表
                escortIdList:{

                },
                //校验
                carFormrules: {
                    carNo: [
                        {
                            required: true,
                            //  validator: checkName,
                            message: "请输入车牌号",
                            trigger: "blur"
                        }
                    ],
                    vehicleOwner: [
                        {
                            required: true,
                            // validator: checkCreditCode,
                            message: "请输入车主",
                            trigger: "blur"
                        }
                    ],
                    driverId: [
                        {
                            required: true,
                            message: "请选择驾驶员",
                            trigger: "blur" }
                    ],
                    phone: [
                        {
                            required: true,
                            validator: checkPhone,
                            trigger: "blur"
                        }
                    ],

                    dueDate: [
                        {
                            required: true,
                            validator: checkDate,
                            trigger: "blur"
                        }
                    ],

                    licenseDate:[
                        {
                            required: true,
                            validator: checkDate,
                            trigger: "blur"
                        }
                    ],
                    vehicleLoad: [
                        {
                            required: true,
                            validator: checkNum,
                            trigger: "blur"
                        }
                    ],
                },
            };

        },

        mounted(){
            // this.selectDriverList()
            // this.selectESList()
        },

        methods:{
            getTAttachments(correlationId){
                var that = this;
                    var url = 'api/order/tContractInfo/getTAttachments/';
                var params = new URLSearchParams();
                params.append('correlationId', correlationId);// 附件关联Id
                that.$axios.get(url,{params}).then(
                    function (res) {
                        if(res.code == 0){
                            var imgData = res.data;
                            if(imgData.length<1){
                                // that.$message({
                                //     message: '当前无图片!',
                                //     type: 'info'
                                // });
                                return;
                            }
                            that.imageUrl1 = that.IMG_URL + imgData[0].locationUrl
                            that.imageUrl2 = that.IMG_URL +imgData[1].locationUrl
                            that.imageUrl3 = that.IMG_URL +imgData[2].locationUrl
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    console.log(error);
                });
            },
            onYyzzSuccess(response, file, fileList) {
                if (response.code == 0) {
                    var imageData = {};
                    imageData.type = 1;
                    imageData.locationUrl = response.data.locationUrl;
                    imageData.thumbnailUrl = response.data.thumbnailUrl;
                    this.photoListForm.push(imageData);
                    this.imageUrl1 = URL.createObjectURL(file.raw);
                    this.$message({ message: "上传成功", type: "success" });
                    return true;
                } else {
                    this.$message({ message: response.msg, type: "error" });
                    return false;
                }
            },
            //经营许可证
            onJyxkzSuccess(response, file, fileList) {
                if (response.code == 0) {
                    var imageData = {};
                    imageData.type = 2;
                    imageData.locationUrl = response.data.locationUrl;
                    imageData.thumbnailUrl = response.data.thumbnailUrl;
                    this.photoListForm.push(imageData);
                    this.imageUrl2 = URL.createObjectURL(file.raw);
                    this.$message({ message: "上传成功", type: "success" });
                    return true;
                } else {
                    this.$message({ message: response.msg, type: "error" });
                    return false;
                }
            },
            //运输许可证
            onYsxkzSuccess(response, file, fileList) {
                if (response.code == 0) {
                    var imageData = {};
                    imageData.type = 3;
                    imageData.locationUrl = response.data.locationUrl;
                    imageData.thumbnailUrl = response.data.thumbnailUrl;
                    this.photoListForm.push(imageData);
                    this.imageUrl3 = URL.createObjectURL(file.raw);
                    this.$message({ message: "上传成功", type: "success" });
                    return true;
                } else {
                    this.$message({ message: response.msg, type: "error" });
                    return false;
                }
            },
            //移除图片
            handleRemove(file, fileList) {
                console.log(file);
                for (let i = 0; i < this.photoListForm.length; i++) {
                    if (this.photoListForm[i].fileUrl == file.response.data.fileUrl) {
                        this.photoListForm.splice(i, 1);
                    }
                }
                var params = new URLSearchParams();
                params.append("fileUrl", file.response.data.fileUrl);
                params.append("thumbUrl", file.response.data.thumbUrl);
                this.$axios
                    .post("/api/base/imageController/batchDeleteImageByUrl", params)
                    .then(response => {
                        // then 指成功之后的回调 (注意：使用箭头函数，可以不考虑this指向)
                    })
                    .catch(error => {
                        // catch 指请求出错的处理
                        console.log(error);
                    });
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === "image/jpeg" || file.type === "image/png";
                const isLt6M = file.size / 1024 / 1024 < 6;

                if (!isJPG) {
                    this.$message.error("上传图片只能是 JPG/PNG 格式!");
                }
                if (!isLt6M) {
                    this.$message.error("上传图片大小不能超过 6MB!");
                }
                return isJPG && isLt6M;
            },

            submitForm() {
                this.$refs["carForm"].validate(valid => {
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

            update() {
                let self = this;
                let tAttachments = self.photoListForm
                let url = "/api/regulatory/vehicle/updateCar";
                self.$axios
                    .post(url, {
                        id: self.carForm.id,
                        carNo:self.carForm.carNo,
                        dictDetailCode:self.carForm.dictDetailCode,
                        licenseDate:self.carForm.licenseDate,
                        dueDate:self.carForm.dueDate,
                        vehicleOwner:self.carForm.vehicleOwner,
                        phone:self.carForm.phone,
                        driverId:self.carForm.driverId,
                        escortId:self.carForm.escortId,
                        vehicleLoad:self.carForm.vehicleLoad,
                        tAttachments:tAttachments,

                        vehicleClassify:self.carForm.vehicleClassify,
                        vehicleState:self.carForm.vehicleState,
                        roadPermit:self.carForm.roadPermit,
                        exempt:self.carForm.exempt
                    })
                    .then(function(res) {
                        if (res.code == 0) {
                            self.$message.success("编辑车辆信息成功!");
                            self.closePage()
                        }
                    })
                    .catch(function(err) {
                        self.$message.error("编辑车辆信息失败，请稍后再试!");
                        self.closePage()
                    });
            },

            addTcarForm() {
                let self = this;

                let carForm = self.carForm;
                let tAttachments = self.photoListForm
                let url = "/api/regulatory/vehicle/addCar/";
                self.$axios
                    .post(url, {
                        carNo:self.carForm.carNo,
                        dictDetailCode:self.carForm.dictDetailCode,
                        licenseDate:self.carForm.licenseDate,
                        dueDate:self.carForm.dueDate,
                        vehicleOwner:self.carForm.vehicleOwner,
                        phone:self.carForm.phone,
                        driverId:self.carForm.driverId,
                        escortId:self.carForm.escortId,
                        vehicleLoad:self.carForm.vehicleLoad,
                        tAttachments:tAttachments,

                        vehicleClassify:self.carForm.vehicleClassify,
                        vehicleState:self.carForm.vehicleState,
                        roadPermit:self.carForm.roadPermit,
                        exempt:self.carForm.exempt
                    })
                    .then(function(res) {
                        if (res.code == 0) {
                            self.$message.success("保存车辆信息成功!");
                            self.closePage()
                        }else{
                          self.$message.warning(res.msg);
                        }
                    })
                    .catch(function(err) {
                        self.$message.error("保存车辆信息失败，请稍后再试!");
                    });
            },

            selectOneById(id){
                console.log(id)
                let that = this;
                that.flag = true;
                var id = id;
                that.$axios.get('/api/regulatory/vehicle/selectByID',{
                        params:{  id:id }
                    }
                ).then(
                    function (res) {
                        if(res.code == 0){

                                that.carForm.id=  res.data.id
                                that.carForm.carNo=  res.data.carNo
                                that.carForm.licenseDate= res.data.licenseDate
                                that.carForm.dueDate= res.data.dueDate
                                that.carForm.vehicleOwner= res.data.vehicleOwner
                                that.carForm.phone= res.data.phone
                                that.carForm.driverId= res.data.driverId
                                that.carForm.escortId= res.data.escortId
                                that.carForm.dictDetailCode= res.data.dictDetailCode
                                that.carForm.vehicleLoad= res.data.vehicleLoad

                                that.carForm.vehicleClassify= res.data.vehicleClassify
                                that.carForm.vehicleState= res.data.vehicleState
                                that.carForm.roadPermit= res.data.roadPermit
                                that.carForm.exempt= res.data.exempt

                                that.getTAttachments(res.data.correlationId)
                                for(let i=0;i<that.dictDetailCodeList.length;i++){
                                    if(res.data.dictDetailCode==that.dictDetailCodeList[i].value){
                                        that.carForm.dictDetailName=that.dictDetailCodeList[i].label
                                        that.carForm.dictDetailCode=that.dictDetailCodeList[i].value
                                    }
                                }
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    console.log(error);
                });
            },


            selectDriverList() {
                let that = this;
                var  role_id = '';
                if(that.ruleType == 2){
                    role_id = 5
                }else if(that.ruleType == 3){
                    role_id = 8
                }
                that.$axios.post('/api/regulatory/vehicle/personSelect?role='+role_id+'&type=1',{}
                ).then(
                    function (res) {
                        if(res.code == 0){
                            that.driverList = res.data;
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    console.log(error);
                });

            },
            driverChouse(phone){
                this.carForm.driverPhone = phone
            },
            ESChouse(ESphone){
                this.carForm.ESphone = ESphone
            },
            selectESList() {
                let that = this;
                var  role_id = '';
                if(that.ruleType == 2){
                    role_id = 14
                }else if(that.ruleType == 3){
                    role_id = 15
                }
                that.$axios.post('/api/regulatory/vehicle/personSelect?role='+role_id+'&type=2',{}
                ).then(
                    function (res) {
                        if(res.code == 0){
                            that.escortIdList = res.data;
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    console.log(error);
                });

            },
            closePage(){
                var that = this
                this.flag = false
                this.$emit("close")
                that.carForm.id=  ''
                that.carForm.carNo=  ''
                that.carForm.dictDetailCode=  ''
                that.carForm.licenseDate=  ''
                that.carForm.dueDate=  ''
                that.carForm.vehicleOwner=  ''
                that.carForm.phone=  ''
                that.carForm.driverId=  ''
                that.carForm.escortId=  ''
                that.carForm.vehicleLoad = ''
                this.imageUrl1 = ''
                this.imageUrl2 = ''
                this.imageUrl3 = ''
            }
        }
    }
</script>

<style scoped>
.lableWidthClass{

}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 250px;
    height: 180px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 250px;
    height: 178px;
    display: block;
}
</style>
