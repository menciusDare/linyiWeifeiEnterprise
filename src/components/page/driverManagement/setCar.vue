<template>
    <div >
            <table class="table-default table-full" >
                <thead>
                <tr>
                    <th style="text-align:center;width: 80px">编号</th>
                    <th style="text-align:center">车牌号</th>

                    <th style="text-align:center">上牌日期</th>
                    <th style="text-align:center">年审到期日</th>
                    <th style="text-align:center">联系电话</th>
                    <th style="text-align:center">当前驾驶员</th>
                    <th style="text-align:center">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item  in tableData">
                    <td style="text-align:center;width: 80px">{{item.rownum}}</td>
                    <td style="text-align:center">{{item.carNo}}</td>

                    <td style="text-align:center">{{item.license}}</td>
                    <td style="text-align:center">{{item.due}}</td>
                    <td style="text-align:center">{{item.phone}}</td>

                    <td style="text-align:center">{{item.nameDriver}}</td>

                    <td style="text-align:center" >
                       <!-- <el-link type="primary"  v-if="item.idDriver == userId">已绑定</el-link>-->
                        <el-link type="primary" @click="open(item.id)" >绑定车辆</el-link>
                    </td>


                </tr>
                </tbody>
            </table>

        <div class="el-pagination is-background mt-lg">
            <span class="el-pagination__total">共 {{total}} 条，每页显示</span>
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
</template>

<script>
    export default {
        name: "setCar",
        data(){
            return{
                userId:'',
                total:0,
                totalPage:0,
                cur_page: 1,
                pageSizes: this.AppConfig.appInfo.pageSizes,
                pageSize: this.AppConfig.appInfo.pageSize,
                ruleType:this.AppConfig.appInfo.loginType,
                tableData:[],
            }
        },
        mounted(){
          //this.queryCar()
        },
        methods:{
            closePage(){
                this.$emit("close")
            },
            handleSizeChange(val) {
                // 改变每页显示的条数
                this.pageSize=val
                // 注意：在改变每页显示的条数时，要将页码显示到第一页
                this.cur_page=1
            },
            handleCurrentChange(val) {
                this.cur_page = val;
                this.loadingData();
            },
            getIndex(index){
                let curPage = this.cur_page;
                let limitPage = this.pageSize;
                return (index+1) + (curPage - 1) * limitPage;
            },


            queryCar(id) {
                var that = this;
                var url = '/api/regulatory/DriverM/carList';
                that.userId = id
                that.$axios.post(url,{
                    setDriver:'1',
                    pageNum:that.cur_page,
                    pageSize:that.pageSize,
                }).then(
                    function (res) {
                        if(res.code == 0){
                            that.tableData = res.data.list;
                            that.totalPage = res.data.totalPage;
                            that.total = res.data.totalCount;
                            var num = that.pageSize * (that.cur_page-1)
                            for (var i = 0 ; i< res.data.list.length ; i++){
                                res.data.list[i].rownum = Number(num) + Number(res.data.list[i].rownum)
                            }
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    console.log(error);
                });
            },


            //绑定提示
            open(carTableId) {
                var that = this;
                this.$confirm('此操作将永久更改数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,
                    type: 'warning'
                }).then(() => {
                    that.Bangding(carTableId);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消绑定'
                    });
                });
            },

            Bangding(carTableId) {
                let self = this;
                var id = self.userId;
                let url = "/api/regulatory/DriverM/carChangeDriver?carId="+carTableId+'&personId='+ id+'&setDriver=1';
                self.$axios
                    .get(url, { })
                    .then(function(res) {
                        if (res.code == 0) {
                            self.$message.success("绑定车辆成功!");
                            self.closePage()
                        }
                    })
                    .catch(function(err) {
                        self.$message.error("绑定车辆失败，请稍后再试!");
                        self.closePage()
                    });
            },

        }
    }
</script>

<style scoped>

</style>