<template>
    <div>
        <el-form :label-position="labelPosition" :inline="true" label-width="80px" :model="formInline">
            <el-form-item label="事件类型:">
                <el-select clearable v-model="formInline.caseType" placeholder="请选择事件类型">
                    <el-option
                        v-for="item in caseTypeList"
                        :key="item.name"
                        :label="item.detailsName"
                        :value="item.detailsCode"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="案件状态:">
                <el-select v-model="formInline.status" placeholder="请选择案件状态">
                    <el-option
                        v-for="item in statusList"
                        :key="item.name"
                        :label="item.name"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="案件来源:">
                <el-select v-model="formInline.source" placeholder="请选择案件来源">
                    <el-option
                        v-for="item in sourceList"
                        :key="item.name"
                        :label="item.name"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="案件编号:">
                <el-input type="text" v-model="formInline.caseCode" placeholder="请选择案件编号"></el-input>
            </el-form-item>
            <el-form-item label="上报时间:">
                <el-date-picker
                v-model="formInline.date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="queryInfo">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        name: 'queryForm',
        data() {
            return {
                formInline: {
                    "start": '',
                    "end": '',
                    "status": '',
                    "caseCode": '',
                    "caseType": '',
                    "source": ''
                },
                labelPosition: 'right',
                statusList: [
                    { name: '进行中', value: 0},
                    { name: '已删除', value: 1},
                    { name: '已超时', value: 2},
                    { name: '已完结', value: 3}
                ],
                sourceList: [
                    { name: '系统', value: 1},
                    { name: '手动新增', value: 2},
                    { name: '其他', value: 3},
                ],
                caseTypeList: [],
                enterpriseTypeList: [
                    { name: '运营企业', value: 0},
                    { name: '产废企业', value: 1},
                    { name: '经营企业', value: 2},
                    { name: '收集企业', value: 3},
                    { name: '运输企业', value: 4},
                ]
            }
        },
        created() {
            this.getCaseTypeList()
        },
        methods: {
            getCaseTypeList() {
                this.$axios.get("/api/permissions/detailsCascadeType/selectDetailsCascade?detailsCode=caseType")
                .then((res) => {
                    if (res.code == 0) {
                        this.caseTypeList = res.data
                    }
                })
                .catch((error) => {
                    this.$message.error("请稍等后重试!");
                });
            },
            queryInfo() {
                this.$emit('queryInfo', this.formInline)
            }
        }
    }
</script>

<style></style>
