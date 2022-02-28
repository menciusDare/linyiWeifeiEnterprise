<template>
    <el-form :label-position="labelPosition" ref="formInline" label-width="100px" :model="formInline">
        <el-form-item label="企业类型:" prop="companyType">
            <el-input style='width:100%' :disabled="inputDisabled" v-model="formInline.companyType" placeholder="请选择企业类型"></el-input>
        </el-form-item>
        <el-form-item label="企业名称:" prop="companyName">
            <el-input style='width:100%' :disabled="inputDisabled" v-model="formInline.companyName" placeholder="请搜索企业名称"></el-input>
        </el-form-item>
        <el-form-item label="事件类型:" prop="caseType">
            <el-input style='width:100%' :disabled="inputDisabled" v-model="formInline.caseType" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="案件来源:" prop="caseSource">
            <el-input type="text" :disabled="inputDisabled" v-model="formInline.caseSource"></el-input>
        </el-form-item>
        <el-form-item label="案件说明:" prop="caseDetail">
            <el-input style="100%" :disabled="inputDisabled" type="textarea" :rows="2" v-model="formInline.caseDetail"></el-input>
        </el-form-item>
        <el-form-item label="现场照片:" v-if="imageUrl.length">
            <el-row justify="space-between" :gutter="20">
                <el-col v-for="item in imageUrl" :key='item.url' :span=7>
                    <el-image 
                        fit="contain"
                        style="width: 100%; height: 150px"
                        :src="item.imageUrl" 
                        :preview-src-list=[item.url]>
                    </el-image>
                </el-col>
            </el-row>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        name: 'addDialog',
        props: {
            currentData: Object
        },
        watch: {
            currentData() {
                this.getCaseDetail()
            }
        },
        data() {
            return {
                formInline: {
                    region: '',
                    companyType: '',
                    companyName: '',
                    caseType: '',
                    caseSource: '',
                    caseDetail: ''
                },
                labelPosition: 'right',
                myHeaders: {Authorization: "Bearer "+sessionStorage.getItem("token")},
                imageUrl: [],
                inputDisabled: true
            }
        },
        created() {
            this.getCaseDetail()
        },
        methods: {
            getCaseDetail() {
                if (this.currentData && this.currentData.id) {
                    this.$axios.get(`/api/regulatory/case/getCase/${this.currentData.id}`)
                    .then((res) => {
                        this.formInline.region = res.data.regionCode
                        this.formInline.companyType = res.data.entKind
                        this.formInline.companyName = res.data.entName
                        this.formInline.caseType = res.data.caseTypeName ? res.data.caseTypeName : '其他'
                        this.formInline.caseSource = res.data.caseSource
                        this.formInline.caseDetail = res.data.caseInfo ? res.data.caseInfo : '无'
                        this.imageUrl = res.data.tattachmentVoList.map((item) => {
                            item.url = this.IMG_URL + item.locationUrl
                            item.imageUrl = this.IMG_URL + item.thumbnailUrl
                            return item
                        })
                    })
                    .catch((error) => {
                        this.$message.error("请稍等后重试!");
                    });
                }
            }
        }
    }
</script>

<style></style>
