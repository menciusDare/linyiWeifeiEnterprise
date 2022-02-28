<template>
    <div >
        <el-dialog :modal-append-to-body="false" :close-on-click-modal="false" :title="titleName" top="9vh" :visible.sync="dialogVisible" width="800px" >
        <!--<b v-if="!flag">新增驾驶员</b>
        <b v-else>编辑驾驶员</b>-->
        <div >
            <el-form :model="driverForm" :rules="driverFormrules"  ref="driverForm"   class="demo-ruleForm" >
                <tr>
                    <td style = "width: 490px">
                        <el-form-item label="姓名" prop="name" class="lableWidthClass" label-width="130px">
                            <el-input v-model="driverForm.name" placeholder="请输入姓名" style = "width: 240px"></el-input>
                        </el-form-item>
                    </td>
                    <td style = "width: 50%">
                        <el-form-item label="联系电话" prop="phone" class="lableWidthClass" label-width="130px" >
                            <el-input v-model="driverForm.phone" placeholder="请输入电话"  style = "width: 240px"></el-input>
                        </el-form-item>
                    </td>
                </tr>

                <tr>
                    <td>
                        <el-form-item label="身份证号" prop="idNo" class="lableWidthClass"  label-width="130px">
                            <el-input v-model="driverForm.idNo" placeholder="请输入身份证号"  style = "width: 240px"></el-input>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label="绑定车辆"  class="lableWidthClass"  label-width="130px">
                            <el-select v-model="driverForm.carNo" placeholder="绑定车辆" style = "width: 240px">
                                <el-option
                                        v-for="item in carOptions"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </td>

                   <!-- <td>
                        <el-form-item label="性别" prop="sex" class="lableWidthClass" label-width="130px" >
                            <el-radio v-model="driverForm.sex" :label="0">男</el-radio>
                            <el-radio v-model="driverForm.sex" :label="1">女</el-radio>
                        </el-form-item>
                    </td>-->
                </tr>
                <tr>
                    <td>
                        <el-form-item label="资质证号" prop="driveNo" class="lableWidthClass" label-width="130px">
                            <el-input v-model="driverForm.driveNo" placeholder="请输入资质证号" style = "width: 240px"></el-input>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label="证件有效期" prop="driveExpire" class="lableWidthClass" label-width="130px" >
                            <div class="block">
                                <el-date-picker
                                        v-model="driverForm.driveExpire"
                                        type="date"
                                        style = "width: 240px"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </div>
                        </el-form-item>
                    </td>
                </tr>

               <!-- <tr>
                    <td>
                        <el-form-item label="资格证号" prop="driverNvq1" class="lableWidthClass"  label-width="130px">
                            <el-input v-model="driverForm.driverNvq1" placeholder="资格证号" style = "width: 240px"></el-input>
                        </el-form-item>
                    </td>
                    <td>
                        <el-form-item label="证件有效期" prop="driverExpir1" class="lableWidthClass" label-width="130px">
                            <div class="block">
                                <el-date-picker
                                        v-model="driverForm.driverExpir1"
                                        type="date"
                                        style = "width: 240px"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </div>
                        </el-form-item>
                    </td>
                </tr>-->

            </el-form>
        </div>


        <div style="margin-top:1%;margin-bottom:1%;margin-top: 20px;    margin-left: 100px; ">
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
                    <div style="width: 250px;text-align: center;">*资质证首页</div>
                </el-col>
                <el-col :span="4"style="margin-left: 90px">
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
                    <div style="width: 250px;text-align: center;">*资质证次页</div>
                </el-col>
               <!-- <el-col :span="4"style="margin-left: 90px">
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
                    <div style="width: 250px;text-align: center;">*资格证</div>
                </el-col>-->
            </el-row>
        </div>

        <div style="text-align: center;margin: 1%;margin-top: 30px">
            <el-button type="primary"  @click="submitForm()" style="width: 200px;">完成</el-button>
            <el-button @click="closePage" style="width: 200px;">取消</el-button>
        </div>
        </el-dialog>
    </div>



</template>

<script>
    export default {
        name: "addDriver",
        data(){
            var checkPhone = (rule, value, callback) => {
                var that = this;
                if (!value) {
                    return callback(new Error("手机号不能为空"));
                } else if(value){
                    var reg = /^1[345789][0-9]\d{8}$/;
                    console.log(reg.test(value));
                    if (reg.test(value)) {
                        var url = 'api/regulatory/DriverM/checkPhoneOrIdNo';
                        var params = new URLSearchParams();
                        params.append('phone', that.driverForm.phone);
                        params.append('idNo', "");
                        that.$axios.get(url,{params}).then(
                            function (res) {
                                if(res.code ==0){
                                    callback();
                                }else{
                                    return callback(new Error(res.msg));
                                }
                            }
                        ).catch(error => {
                            // catch 指请求出错的处理
                            console.log(error);
                        });
                    } else {
                        return callback(new Error("请输入正确的手机号"));
                    }
                }
            };
            var checkIdNo = (rule, value, callback) => {
                var that = this;
                if (!value) {
                    return callback(new Error("身份证号不能为空"));
                } else {
                    const reg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/;
                    console.log(reg.test(value));
                    if (reg.test(value)) {
                        var url = 'api/regulatory/DriverM/checkPhoneOrIdNo';
                        var params = new URLSearchParams();
                        params.append('phone', "");
                        params.append('idNo', that.driverForm.idNo);
                        that.$axios.get(url,{params}).then(
                            function (res) {
                                if(res.code ==0){
                                    callback();
                                }else{
                                    return callback(new Error(res.msg));
                                }
                            }
                        ).catch(error => {
                            // catch 指请求出错的处理
                            console.log(error);
                        });

                    } else {
                        return callback(new Error("请输入正确的身份证号"));
                    }
                }
            };
            return{
                carOptions:[],
                flag:true,
                dialogVisible:false,
                titleName:'',
                imageUrl1: "",
                imageUrl2: "",
                imageUrl3: "",
                IMG_URL:this.AppConfig.appInfo.IMG_URL,
                driverForm:{
                    //rul = 2 为押运员  3为押运员
                    entId: "",
                    id: '',
                    idNo: "",
                    name: "",
                    phone: "",
                    sex: '0',
                    driverNvq1:'',
                    driverExpir1:'',
                    rul:'',
                    carNo:'',
                    driveNo:'',
                    driveExpire:''
                },
                photoListForm:[],
                //校验
                driverFormrules: {
                     name: [
                         {
                             required: true,
                             //  validator: checkName,
                             message: "请输入驾驶员姓名",
                             trigger: "blur"
                         }
                     ],
                     phone: [
                         {
                             required: true,
                             validator: checkPhone,
                             trigger: "blur"
                         }
                     ],
                    idNo: [
                         { required: true,validator:checkIdNo, trigger: "blur" }
                     ],
                    carNo:[
                        { required: true,message: "请选择车辆", trigger: "change" }
                    ],
                    /*driverNvq1: [
                        { required: true, message: "请输入证件号", trigger: "blur" }
                    ],*/

                },
                ruleType:this.AppConfig.appInfo.loginType,
                phoneIsUse:false,
                idCarIsUse:false,
            }
        },

        mounted(){
            // this.selectDriverList();
            // this.selectESList();
        },

        methods:{

            getCarOptions(){
                var that = this;
                var url = 'api/regulatory/DriverM/selectEntCarOptions';
                var params = new URLSearchParams();
                params.append('isNew', 1);
                that.$axios.get(url,{params}).then(
                    function (res) {
                        if(res.code == 0){
                            that.carOptions = res.data;
                        }else{
                            console.log(res.msg);
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    console.log(error);
                });
            },
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
                                that.$message({
                                    message: '当前无图片!',
                                    type: 'info'
                                });
                                return;
                            }
                            that.imageUrl1 = that.IMG_URL + imgData[0].locationUrl;
                            that.imageUrl2 = that.IMG_URL +imgData[1].locationUrl;
                            that.imageUrl3 = that.IMG_URL +imgData[2].locationUrl;
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
                    imageData.type = 7;
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
                    imageData.type = 8;
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


            //根据id查询押运员
            selectOneById(id){
                let that = this;
                that.flag = true;
                var id = id;
                var url = '/api/regulatory/DriverM/driverSelectById';
                //var url = 'localhost:8005/sysPerson/driverSelectById';
                that.$axios.get(url,{
                        params:{  id:id }
                    }
                ).then(
                    function (res) {
                        if(res.code == 0){
                            that.driverForm.driverExpir1= res.data.driverExpir1;
                            that.driverForm.driverNvq1= res.data.driverNvq1;
                            that.driverForm.idNo= res.data.idNo;
                            that.driverForm.name= res.data.name;
                            that.driverForm.phone= res.data.phone;
                            that.driverForm.sex= res.data.sex;
                            that.driverForm.id = res.data.id;
                            that.driverForm.entId=res.data.entId;
                            that.getTAttachments(res.data.correlationId);
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    console.log(error);
                });
            },

            submitForm() {
                this.$refs["driverForm"].validate(valid => {
                    if (valid) {
                        debugger
                        if(this.flag){
                            this.updateTdriverForm();
                        }else{
                            this.addTdriverForm();
                        }
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },

            addTdriverForm() {
                let self = this;
                debugger
                let driverForm = self.driverForm;
                let tAttachments = self.photoListForm;

                let url = "/api/regulatory/DriverM/addSupercargo";
                var str = '';
                if(self.ruleType == 2){
                    str = 5;
                }else if(self.ruleType == 3){
                    str = 8;
                }

                //判单图片1、2、3是否为空
                if(tAttachments.length ==0){
                    self.$message({
                        message: '有关证件未上传',
                        type: 'warning'
                    });
                    return
                }else{
                    var type1 = false;
                    var type2 = false;
                    for (let i = 0; i <tAttachments.length ; i++) {
                        switch (tAttachments[i].type) {
                            case  7 :
                                type1 = true;
                                break;
                            case  8 :
                                type2 = true;
                                break;
                        }
                    }
                    if(!(type1&&type2)){
                        self.$message({
                            message: '仍有证件未上传',
                            type: 'warning'
                        });
                        return;
                    }
                }
                self.$axios
                    .post(url, {
                        attachments:tAttachments,
                        idNo: self.driverForm.idNo,
                        name: self.driverForm.name,
                        phone: self.driverForm.phone,
                        carNo: self.driverForm.carNo,
                        driveNo: self.driverForm.driveNo,
                        driveExpire: self.driverForm.driveExpire
                    })
                    .then(function(res) {
                        if (res.code == 0) {
                            self.$message.success("保存押运员信息成功!");
                            self.closePage()
                        }else{
                            self.$message.info(res.msg);
                        }
                    })
                    .catch(function(err) {
                        self.$message.error("保存押运员信息失败，请稍后再试!");
                        self.closePage()
                    });
            },

            updateTdriverForm() {
                let self = this;
                let tAttachments = self.photoListForm
                let url = "/api/regulatory/DriverM/driverUpdate";
                var str = ''
                if(self.ruleType == 2){
                    str = 5
                }else if(self.ruleType == 3){
                    str = 8
                }
                self.$axios
                    .post(url, {
                        tAttachments:tAttachments,
                        id:self.driverForm.id,
                        idNo: self.driverForm.idNo,
                        name: self.driverForm.name,
                        phone: self.driverForm.phone,
                        sex: self.driverForm.sex,
                        driverExpir1: self.driverForm.driverExpir1,
                        driverNvq1: self.driverForm.driverNvq1,
                        entId :self.driverForm.entId,
                        rul:str
                    })
                    .then(function(res) {
                        if (res.code == 0) {
                            self.$message.success("编辑押运员信息成功!");
                            self.closePage()
                        }else{
                            self.closePage()
                        }
                    })
                    .catch(function(err) {
                        self.$message.error("编辑押运员信息失败，请稍后再试!");
                        self.closePage()
                    });
            },


            selectDriverList() {
                let that = this;
                that.$axios.post('/api/enterprise/tVehicleInfo/personSelect?role=2',{}
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
            
            selectESList() {
                let that = this;
                that.$axios.post('/api/enterprise/tVehicleInfo/personSelect?role=3',{}
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
                this.dialogVisible = false;
                this.flag = false;
                this.$emit("close");
                this.driverForm.idNo= '';
                this.driverForm.name= '';
                this.driverForm.phone= '';
                this.driverForm.sex= '';
                this.driverForm.id = '';
                this.driverForm.escortNvq1= '';
                this.driverForm.escortExpir= '';
                this.driverForm.carNo="";
                this.photoListForm=[];
                this.imageUrl1 = '';
                this.imageUrl2 = '';
                this.imageUrl3 = '';
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



