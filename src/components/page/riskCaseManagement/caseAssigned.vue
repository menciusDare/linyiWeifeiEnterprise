<template>
    <div class="mainCase">
        <div class="main-top">
            <div class="breadcrumb">
                <a href="#"><i class="icon icon-jianguan"></i></a>风险案件管理<span class="sep">&gt;</span>
                <span class="text-primary">案件管理</span>
            </div>
            <el-card class="box-card">
                <div>
                    <QueryForm @queryInfo="queryInfo"></QueryForm>
                </div>
                <el-table :data="tableData" class="table-default" style="height:100%">
                    <el-table-column label="序号" type="index" width="100px" align="center" :index='(index)=>{return (index+1) + (this.pageIndex-1)*this.pageSize}'></el-table-column>
                    <el-table-column prop="caseCode" label="案件编号" align="center"></el-table-column>
                    <el-table-column prop="caseStatus" label="处理状态" align="center"></el-table-column>
                    <el-table-column prop="details" label="案件说明" align="center"></el-table-column>
                    <el-table-column prop="createDate" label="上报时间" align="center"></el-table-column>
                    <el-table-column prop="statusStr" label="案件状态" align="center"></el-table-column>
                    <el-table-column label="操作" align="center" width="220">
                        <template slot-scope="scope">
                            <el-button type="text" @click="checkCase(scope.row)" size="small">查看</el-button>
                            <el-button type="text" v-if="scope.row.showOperation == 0" @click="auditCase(scope.row)" size="small">上报</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="el-pagination is-background mt-lg">
                    <span >
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :page-sizes="[5,10, 15, 20]"
                            :current-page="pageIndex"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next"
                            :total="totalPageCount">
                        </el-pagination>
                    </span>
                    <span class="el-pagination__total">共 {{pages}} 页</span>
                </div>
            </el-card>
            <el-dialog title="案件详情" 
                :modal-append-to-body="false" 
                :visible.sync="dialogCheckVisible"
                width="50%"
                center>
                <CheckDialog :currentData="currentData" @cancelDialog="cancelDialog" @confirmDialog="confirmDialog"></CheckDialog>
            </el-dialog>
            <el-dialog title="案件整改" 
                :modal-append-to-body="false" 
                :visible.sync="dialogAuditVisible"
                width="36%"
                @closed="closed"
                center>
                <RectificationDialog :reset="reset" :currentData="currentData" @cancelDialog="cancelDialog" @confirmDialog="confirmDialog"></RectificationDialog>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import QueryForm from './components/queryForm.vue'
    import CheckDialog from './components/checkDialog.vue'
    import RectificationDialog from './components/rectificationDialog.vue'
    export default {
        name: 'caseAssigned',
        components: {
            QueryForm,
            CheckDialog,
            RectificationDialog
        },
        data() {
            return {
                tableData: [],
                totalPageCount: 0,
                pages: 0,
                dialogCheckVisible: false,
                dialogAuditVisible: false,
                currentData: {},
                pageSize: 10,
                pageIndex: 1,
                enterpriseTypeList: [
                    { name: '运营企业', value: 0},
                    { name: '产废企业', value: 1},
                    { name: '经营企业', value: 2},
                    { name: '收集企业', value: 3},
                    { name: '运输企业', value: 4},
                ],
                sourceList: [
                    { name: '系统', value: 1},
                    { name: '手动新增', value: 2},
                    { name: '其他', value: 3},
                ],
                statusList: [
                    { name: '进行中', value: 1},
                    { name: '已删除', value: 2},
                    { name: '已超时', value: 3},
                    { name: '已完结', value: 4},
                ],
                queryParams: {},
                reset: false
            }
        },
        created() {
            this.getCaseList(this.queryParams)
        },
        methods: {
            getCaseList(params) {
                if (params && params.date) {
                    params.start = params.date[0]
                    params.end = params.date[1]
                }
                this.$axios.get("/api/enterprise/case/selectCaseWarnings", {
                    params:{
                        "start":  params.start ? params.start : '',
                        "end":  params.end ? params.end : '',
                        "status": params.status + '' ? params.status : '',
                        "caseCode": params.caseCode ? params.caseCode : '',
                        "caseType": params.caseType ? params.caseType : '',
                        "source": params.source ? params.source : '',
                        "page": this.pageIndex,
                        "limit": this.pageSize,
                    }
                })
                .then((res) => {
                    if (res.code == 0 && res.data.records.length > 0) {
                        this.tableData = res.data.records.map((item) => {
                            item.statusStr = this.statusList.filter((ele) => {return ele.value == item.status})[0].name
                            return item
                        })
                        this.totalPageCount = res.data.total
                        this.pages = res.data.pages
                        this.pageIndex = res.data.current
                    } else {
                        this.tableData = []
                    }
                })
                .catch((error) => {
                    this.$message.error("请稍等后重试!");
                });
            },
            handleSizeChange(val) {
                this.pageSize = val
                this.getCaseList(this.queryParams)
            },
            handleCurrentChange(val) {
                this.pageIndex = val
                this.getCaseList(this.queryParams)
            },
            queryInfo(value) {
                this.queryParams = JSON.parse(JSON.stringify(value))
                this.pageIndex = 1
                this.getCaseList(value)
            },
            checkCase(params) {
                this.currentData = JSON.parse(JSON.stringify(params))
                this.dialogCheckVisible = true
            },
            auditCase(params) {
                this.currentData = JSON.parse(JSON.stringify(params))
                this.dialogAuditVisible = true
            },
            cancelDialog() {
                this.dialogCheckVisible = false
                this.dialogAuditVisible = false
            },
            confirmDialog() {
                this.dialogCheckVisible = false
                this.dialogAuditVisible = false
                this.getCaseList(this.queryParams)
            },
            closed() {
                this.reset = !this.reset
            }
        }
    }
</script>

<style scoped>
    .mainCase {
        padding: 0 20px;
    }
    .mainCase .el-table{
        margin-top: 1%;
    }
    .mainCase .el-card{
        width: 100%;
        border: 0;
    }
    .mainCase .el-table th{
        padding: 15px 5px;
        font-size: 16px;
        background-color: rgba(223, 234, 251, 0.3);
        color: #333;
    }
    .mainCase .el-table th.is-leaf, .el-table td{
        border: 0;
    }
    .mainCase .el-table::before{
        height: 0;
    }
</style>
