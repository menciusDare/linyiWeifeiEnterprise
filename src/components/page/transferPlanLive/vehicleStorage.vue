<template>
    <div class="main">
        <div class="main-top">
            <div class="breadcrumb">
                <a href="#"><i class="icon icon-zhuanyun"></i>整车入库</a>
            </div>
        </div>
        <div class="panel" style="width:100%;height: 60px;">
            <div style="height: 8px">
            </div>

            <div style="vertical-align: text-bottom;float: right; ">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <input   multiple  prefix-icon="el-icon-search"  type="file" ref="myfile" id="fil">
                        </input>
                    </el-form-item>
                    <el-form-item style="margin-right: 40px">
                       <!-- <el-button  type="primary" plain @click="upload()" icon="el-icon-upload2">导入数据</el-button>-->
                        <el-button type="button" size="medium"  @click="upload()" class="el-button el-button--primary"> <span>导入数据</span></el-button>
                    </el-form-item>
                    <el-form-item style="margin-right: 40px">
                        <!--<el-button  type="primary" plain  @click="funcDown()" icon="el-icon-upload">下载模板</el-button>-->
                        <el-button type="button" size="medium"  @click="funcDown()" class="el-button el-button--primary"> <span>下载模板</span></el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
    import downloadFile from "../../common/unit/DownloadFile";
    export default {
        name: "vehicleStorage",
        data(){
            return{
                fil:'',
            }
        },

        methods:{
            upload(){
                var that = this
                var formData = new FormData();
                let myfile = this.$refs.myfile;
                let files = myfile.files;
                let file = files[0];

                if(!file){
                    that.$message({message: '请选择文件',});
                    return;
                }
                var url = '/api/enterprise/terminal/transferPlan/carStorage';
                formData.append("file", file);
                that.$axios.post(url,formData,{
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
                    .then(function (res) {
                        if(res.code == 0){

                            $('#fil').html("")
                            that.$message({
                                dangerouslyUseHTMLString: true,
                                message: res.msg,
                                type: 'success'
                            })
                            that.$refs.myfile.value = ''
                        }else{
                            that.$message({
                                dangerouslyUseHTMLString: true,
                                message: res.msg,
                                type: 'error'
                            })
                        }
                    }).catch(function (err) {
                    console.log(err);
                })
            },

             funcDown(){
                var that = this ;
                var url = '/api/enterprise/terminal/transferPlan/exportTemplate';
                var params = {}
                 that.$axios.post(url,  params,
                     {responseType: "blob" }// 1.首先设置responseType对象格式为 blob:
                     // {responseType: 'arraybuffer'}
                 ).then(function (response) {
                     downloadFile(response);
                 }).catch(function () {
                     that.$message.info("导出异常,请重试!");
                 })
            },

        },


    }
</script>

<style scoped>
</style>