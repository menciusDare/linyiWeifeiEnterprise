<template>
    <div >
        <div @click="closePage" style="width:100%;text-align: right ;margin-top: -40px;margin-bottom: 10px">X</div>
        <b>已绑定产废企业</b>
        <div style="height: 240px;width:100%;  overflow:scroll;">
            <table class="table-default table-full" >
                <thead>
                <tr>
                    <th style="text-align:center;width: 80px">编号</th>
                    <th style="text-align:center">企业名称</th>
                    <th style="text-align:center">企业地址</th>
                    <th style="text-align:center">企业联系人</th>
                    <th style="text-align:center">企业联系电话</th>
                    <th style="text-align:center">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item  in UnLinkEntList">
                    <td style="text-align:center;width: 80px">{{item.rownum}}</td>
                    <td style="text-align:center">{{item.name}}</td>
                    <td style="text-align:center">{{item.address}}</td>
                    <td style="text-align:center">{{item.contacts}}</td>
                    <td style="text-align:center">{{item.contactsPhone}}</td>
                    <td style="text-align:center" >
                        <el-link type="primary" style = "font-size: 16px;"@click="openJ(item.id)" >解绑<span class="el-icon-delete"></span></el-link>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>


        <b>可绑定产废企业</b>
        <div style="height: 240px;width:100%;  overflow:scroll;">
        <table class="table-default table-full" >
            <thead>
            <tr>
                <th style="text-align:center;width: 80px">编号</th>
                <th style="text-align:center">企业名称</th>
                <th style="text-align:center">企业地址</th>
                <th style="text-align:center">企业联系人</th>
                <th style="text-align:center">企业联系电话</th>
                <th style="text-align:center">操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item  in tableData">
                <td style="text-align:center;width: 80px">{{item.rownum}}</td>
                <td style="text-align:center">{{item.name}}</td>
                <td style="text-align:center">{{item.address}}</td>
                <td style="text-align:center">{{item.contacts}}</td>
                <td style="text-align:center">{{item.contactsPhone}}</td>
                <td style="text-align:center" >
                    <el-link type="primary" style = "font-size: 16px;"@click="openB(item.id,item.personName)" >绑定<span class="el-icon-edit"> </span></el-link>
                </td>
            </tr>
            </tbody>
        </table>
        </div>


        <!--<div style="text-align: center;margin: 1%;margin-top: 30px">
            <el-button type="primary"  @click="submitForm()" style="width: 200px;">完成</el-button>
            <el-button @click="closePage" style="width: 200px;">取消</el-button>
        </div>-->
    </div>
</template>

<script>
    export default {
        props: ["message"],
        name: "connectEnt",
        data(){
            return{

                imageUrl1: "",
                imageUrl2: "",
                imageUrl3: "",
                fatherId:'',
                tableData:[],
                UnLinkEntList:[],
                photoListForm:[],
                //校验
                driverFormrules: {
                },
            }
        },

        mounted(){
        },

        methods:{


            //绑定
            Binding(entId){
                var that = this;
                that.$axios.post('/api/enterprise/tEntDriverRelation/binding',{
                        personId:that.message,
                        entIdList:entId
                    }
                ).then(
                    function (res) {
                        if(res.code == 0){
                            that.selectCanBanding(that.fatherId)
                            that.selectBanded(that.fatherId)
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    console.log(error);
                });
            },

            //解绑
            removeBinding(entId) {
                var that = this;
                that.$axios.post('/api/enterprise/tEntDriverRelation/removeBinding',{
                    personId:that.message,
                    entIdList:entId
                    }
                ).then(
                    function (res) {
                        if(res.code == 0){
                            that.selectCanBanding(that.fatherId)
                            that.selectBanded(that.fatherId)
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    console.log(error);
                });
            },

            //可关联收货企业
            selectCanBanding(id) {
                let that = this;
                that.fatherId = id;
                that.$axios.get('/api/enterprise/tEntDriverRelation/entDriverList',{
                    params:{  personId:id }
                    }
                ).then(
                    function (res) {
                        if(res.code == 0){
                            that.tableData = res.data;
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    console.log(error);
                });

            },

            //已关联企业
            selectBanded(id) {
                let that = this;
                var id = id;
                that.$axios.get('/api/enterprise/tEntDriverRelation/Binded',{
                      params:{  driverId:id }
                }
                ).then(
                    function (res) {
                        if(res.code == 0){
                            that.UnLinkEntList = res.data;
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    console.log(error);
                });

            },
            closePage(){
                this.$emit("close")
            },

            closePage(){
                this.$emit("close")
            },
            //绑定 open
            openB(id,personName) {
                var that = this;
                var infos = ''
                if(personName){
                    infos = '当前企业已绑定司机:'+personName+', 是否继续?'
                }else{
                    infos = '当前企业暂无已绑定司机, 是否继续?'
                }
                this.$confirm(infos, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,
                    type: 'warning'
                }).then(() => {
                    that.Binding(id,);


                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            },

            //解绑 open
            openJ(id) {
                var that = this;
                this.$confirm('此操作将永久修改数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,
                    type: 'warning'
                }).then(() => {
                    that.removeBinding(id);
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
</style>