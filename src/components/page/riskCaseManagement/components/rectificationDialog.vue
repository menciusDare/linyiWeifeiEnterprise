<template>
    <el-form :label-position="labelPosition" :rules="rules" ref="formInline" label-width="100px" :model="formInline">
        <el-form-item label="案件说明:" prop="rectificationDetail">
            <el-input style="100%" type="textarea" :rows="2" v-model="formInline.rectificationDetail" placeholder="请输入整改说明"></el-input>
        </el-form-item>
        <el-form-item label="现场照片:">
            <span slot="label"><span style="color:#F56C6C;margin-right:4px;">*</span>现场照片:</span>
            <el-upload
                action="/api/permissions/imageController/uploadImage"
                list-type="picture"
                :on-success="onWheelSuccess"
                :headers="myHeaders"
                :beforeUpload="beforeAvatarUpload"
                :on-remove="handleRemove"
                ref='upload'
                >
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </el-form-item>
        <el-form-item>
            <el-button @click="cancelCase">取 消</el-button>
            <el-button type="primary" @click="confirmDialog('formInline')" :loading='uploadLing'>确 定</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        name: 'rectificationDialog',
        data() {
            return {
                formInline: {
                    rectificationDetail: ''
                },
                rules: {
                    rectificationDetail: [
                        { required: true, message: '请输入整改说明', trigger: 'blur' },
                    ]
                },
                labelPosition: 'right',
                myHeaders: {Authorization: "Bearer "+sessionStorage.getItem("token")},
                imageUrl: [],
                companyOptions: [],
                loading: false,
                inputDisabled: true,
                uploadLing: false
            }
        },
        props: {
            currentData: Object,
            reset: Boolean
        },
        watch: {
            currentData() {
                console.log(this.currentData)
            },
            reset() {
                this.resetForm('formInline')
            }
        },
        methods: {
            confirmDialog(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {
                            "caseId": this.currentData.id,
                            "instructions": this.formInline.rectificationDetail,
                            "tattachmentVoList": this.imageUrl
                        }
                        this.$axios.put("/api/enterprise/case/edit", params)
                        .then((res) => {
                            if (res.code == 0) {
                                this.imageUrl = [],
                                this.$message.success("提交成功!");
                                this.$emit('confirmDialog', this.formInline)
                                this.$refs.upload.clearFiles()
                            } else {
                                this.$message.info(res.msg);
                            }
                        })
                        .catch((error) => {
                            this.$message.error("请稍等后重试!");
                            this.$emit('confirmDialog', this.formInline)
                            this.resetForm('formInline')
                        });
                    } else {
                        this.$message.error("请填入所有内容!");
                        return false;
                    }
                });
            },
            cancelCase() {
                this.$emit('cancelDialog')
                this.resetForm('formInline')
            },
            beforeAvatarUpload(file) {
                this.uploadLing = true
                const isLt20M = file.size / 1024 / 1024 < 20;
                if (!isLt20M) {
                    this.$message.error('上传头像图片大小不能超过 20MB!');
                    this.uploadLing = false
                }
                return isLt20M;
            },
            onWheelSuccess(response, file, fileList) {
                if (response.code == 0) {
                    const imageData = {};
                    imageData.locationUrl = response.data.locationUrl;
                    imageData.thumbnailUrl = response.data.thumbnailUrl;
                    imageData.fileName = response.data.locationUrl;
                    this.imageUrl.push(imageData);
                    this.$message({ message: "上传成功", type: "success" });
                    this.uploadLing = false
                    return true;
                } else {
                    this.uploadLing = false
                    this.$message({ message: response.msg, type: "error" });
                    return false;
                }
            },
            handleRemove(file, fileList) {
                if (file && file.response.data) {
                    let fileMark = file.response.data.locationUrl
                    let deleteIndex = this.imageUrl.findIndex(item => {return item.fileName = fileMark})
                    this.imageUrl.splice(deleteIndex, 1)
                    const formData = {
                        correlationId: '',
                        createdBy: '',
                        createdTime: '',
                        id: 0,
                        locationUrl: file.response.data.locationUrl,
                        thumbnailUrl: file.response.data.thumbnailUrl,
                        type: '',
                        updatedBy: '',
                        updatedTime: '',
                    }
                    this.$axios.delete("/api/permissions/imageController/batchDeleteImageByUrl", {data: formData})
                    .then((res) => {
                        if (res.code == 0) {
                            this.$message.success("删除成功!");
                        }
                    })
                    .catch((error) => {
                        this.$message.error("删除失败!");
                    });
                }
            },    
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.imageUrl = []
                this.$refs.upload.clearFiles()
            }       
        }
    }
</script>

<style>
.el-upload{
    text-align: left;
}
</style>
