<template>
    <div>
        <el-dialog
                :title="dialogTitle"
                :visible.sync="centerDialogVisible"
                width="450px"
                :modal-append-to-body="false"
                :close-on-click-modal="false"
                :show-close = "false"
                left>

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
                <el-form-item label="危废名称：" prop="wfCode">
                   <!-- <el-select v-model="ruleForm.wfCode"  placeholder="请选择">
                        <el-option
                                style="width: 220px;"
                                v-for="item in wfOptions"
                                :key='item.storageId+","+item.wfCode+","+item.wfName'
                                :label="item.wfName"
                                :value='item.storageId+","+item.wfCode+","+item.wfName'>
                        </el-option>
                    </el-select>-->
                    <el-cascader  v-model="wfItemInfo" :disabled="wfItemDisabled" :options="wfStorageTreeOptions" ref="wfElCascader" :show-all-levels="false" @change="wfhandleChange"  style="width: 220px;"></el-cascader>
                </el-form-item>
                <el-form-item label="数量（KG）：" prop="number">
                    <el-input  v-model="ruleForm.number" style="width: 220px;"></el-input>
                </el-form-item>
                <el-form-item label="备注：">
                    <el-input type="textarea" v-model="ruleForm.remark" style="width: 220px;"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">申请修改</el-button>
                    <el-button @click="closeDoalog('ruleForm')">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "updateProBook",
        props: {},
        components: {},
        computed: {},
        data() {
            var checkNumber = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('数量不能为空!'));
                }
                setTimeout(() => {
                    if (/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)===false) {
                        callback(new Error('请输入正数!'));
                    } else {
                        callback();
                    }
                }, 500);
            };
            return {
                dialogTitle:"修改贮存台账",
                centerDialogVisible: false,
                wfItemInfo:[],
                ruleForm: {
                    wfCode: '',
                    number: '',
                    remark:'',
                    bookId:'',
                },
                wfOptions:[],
                wfStorageTreeOptions:[],
                rules: {
                    wfCode: [
                        { required: true, message: '请选择危废代码', trigger: 'change' }
                    ],
                    number: [
                        { validator: checkNumber, trigger: 'blur' },
                    ],
                },
                wfItemDisabled:true
            }
        },
        methods: {
            openDialog(item){
                this.ruleForm.number = item.number;
                this.ruleForm.bookId = item.id;
                if(item.operationType==1){
                    // 入库
                    this.wfItemDisabled =false;
                }else if(item.operationType==2){
                    // 出库
                    this.wfItemDisabled =true;
                }
                // this.selectWfOption(item);
                this.selectWfStorgeTreeVo(item);
                this.centerDialogVisible = true;
            },
            closeDoalog(formName){
                this.centerDialogVisible = false;
                this.$refs[formName].resetFields();
                this.ruleForm.wfCode='';
                this.ruleForm.number='';
                this.ruleForm.remark='';
                this.ruleForm.bookId='';
            },
            submitForm(formName) {
                this.wfhandleChange();
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.addStorageStandingBookRecord(formName);
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            addStorageStandingBookRecord(formName){
                var _this = this;
                let url = "/api/regulatory/entFont/addStorageStandingBookRecordSecond";
                let params = new URLSearchParams();
                params.append("bookId",_this.ruleForm.bookId);
                params.append("dictDetailCode",_this.ruleForm.wfCode?_this.ruleForm.wfCode.split(",")[1]:'');
                params.append("storageId",_this.ruleForm.wfCode?_this.ruleForm.wfCode.split(",")[0]:'');
                params.append("number",_this.ruleForm.number);
                params.append("remark",_this.ruleForm.remark);
                _this.$nextTick(() => {
                    _this.$axios.post(url,params).then((response) => {
                        if(response.code == 0) {
                            _this.$message.success("修改申请提交成功!");
                            _this.closeDoalog(formName);
                            _this.$parent.searchData();
                        }else{
                            _this.$message.warning(response.msg);
                        }
                    }).catch((error) => {
                        // catch 指请求出错的处理
                        console.log(error);
                    });
                })
            },
            selectWfOption(item){
                var _this=this;
                var params = new URLSearchParams();
                params.append('entId', item.entId);
                let url = '/api/regulatory/entFont/selectWfOption';
                _this.$axios.get(url,{params}).then(
                    function (res) {
                        if(res.code == 0){
                            _this.ruleForm.wfCode = item.storageId+","+item.dictDetailCode+","+item.dictDetailName;
                            _this.wfOptions = res.data;
                        }
                    }
                ).catch((error) => {
                    console.log(error);
                });
            },
            selectWfStorgeTreeVo(item){
                var _this=this;
                var params = new URLSearchParams();
                params.append('entId', item.entId);
                params.append('storageId', item.storageId);
                let url = '/api/regulatory/entFont/selectWfStorgeTreeVo';
                _this.$axios.get(url,{params}).then(
                    function (res) {
                        if(res.code == 0){
                            _this.wfStorageTreeOptions = res.data;
                            _this.wfItemInfo = [item.storageId+"",item.dictDetailCode];
                        }
                    }
                ).catch((error) => {
                    console.log(error);
                });
            },
            wfhandleChange(){
                //'item.storageId+","+item.wfCode+","+item.wfName'
                let item = this.$refs.wfElCascader.getCheckedNodes();
                if (item && item.length > 0 && item[0]!=null) {
                    this.ruleForm.wfCode = item[0].parent.value+","+item[0].value+","+item[0].label;
                }
            }
        },
        mounted() {
        },
        created() {
        }
    }
</script>

<style scoped>

</style>