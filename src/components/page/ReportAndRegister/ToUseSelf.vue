<template>
    <div class="" style="overflow: auto">


        <div style="margin-left: 20px;background-color: rgba(140, 147, 157, 0.16);height: 40px;padding-top: 10px;padding-left: 20px;margin-right: 20px;">
            <div style="width: 7px;height: 22px;background-color: rgba(27, 27, 27, 0.38);float: left"></div>
            <div style="float: left;margin-left: 10px;font-weight: bold; font-size: 16px;">基本信息</div>
        </div>

        <table  class="tableClass" style="margin-left: 20px">
            <tr>
                <td colspan="2"><strong>设施名称</strong></td>
                <td >{{dataForm.equipmentName}} </td>
                <td ><strong>设施类别（利用处置方式）</strong></td>
                <td >{{dataForm.equipmentType}} </td>
            </tr>

            <tr>
                <td colspan="2"><strong>设施地址</strong></td>
                <td >{{dataForm.equipmentAddress}} </td>
                <td ><strong>总投资（万元）</strong></td>
                <td >{{dataForm.totalInvestment}} </td>
            </tr>

            <tr>
                <td colspan="2"><strong>设计能力</strong></td>
                <td >{{dataForm.designCapability/1000}} </td>
                <td ><strong>设计使用年限</strong></td>
                <td >{{dataForm.designServiceLife}} </td>
            </tr>

            <tr>
                <td colspan="2"><strong>投入运行时间</strong></td>
                <td >{{dataForm.operationTime}} </td>
                <td ><strong>运行费用</strong></td>
                <td > {{dataForm.operatingExpenses}}</td>
            </tr>

            <tr>
                <td colspan="2"><strong>主要设备及数量</strong></td>
                <td colspan="3" >{{dataForm.number}} </td>
            </tr>

            <tr>
                <td colspan="2"><strong>危险废物利用处置效果</strong></td>
                <td colspan="3" >{{dataForm.equipmentName}} </td>
            </tr>

            <tr>
                <td colspan="2"><strong>是否定期检测污染物排放情况</strong></td>
                <td >
                    <el-checkbox-group v-model="checkList1"  disabled>
                        <el-checkbox label=0>是</el-checkbox>
                        <el-checkbox label=1>否</el-checkbox>
                    </el-checkbox-group>
                </td>
                <td > <strong>污染物排放达标情况</strong></td>
                <td >
                    <el-checkbox-group v-model="checkList2"  disabled>
                        <el-checkbox label=0>达标</el-checkbox>
                        <el-checkbox label=1>不达标</el-checkbox>
                    </el-checkbox-group>
                </td>
            </tr>

            <tr>
                <td :rowspan="rowSize" style="width: 18%">
                    <strong> 危险废物自行<br>
                        利用处置情况</strong>
                </td>
                <td ><strong>序号</strong></td>
                <td ><strong>自行利用处置废物名称</strong></td>
                <td ><strong>本年度计划利用处置量（吨）</strong></td>
                <td ><strong>上年度计划利用处置量（吨）</strong></td>
            </tr>


            <tr v-for="item  in ListData2" >
                <td >{{item.rownum}}</td>
                <td >{{item.name}}</td>
                <td >{{item.thisYearNumber/1000}}</td>
                <td >{{item.lastYearNumber/1000}}</td>
            </tr>

            <tr>
                <td colspan="2"><strong>合计</strong></td>
                <td >{{thisNumSum/1000}} </td>
                <td >{{lastNumSum/1000}} </td>
            </tr>

        </table>


        <div style="margin-left: 20px;background-color: rgba(140, 147, 157, 0.16);height: 40px;padding-top: 10px;padding-left: 20px;margin-right: 20px;">
            <div style="width: 7px;height: 22px;background-color: rgba(27, 27, 27, 0.38);float: left"></div>
            <div style="float: left;margin-left: 10px;font-weight: bold; font-size: 16px;">危险废物自行利用处置工艺流程图及工艺说明</div>
        </div>

        <table class="table2" style="margin-left: 20px">
            <tr>
                <td style="width: 200px;text-align: center;">
                    <strong> <br>危<br>险<br>废<br>物<br>自<br>行<br>利<br>用<br>处<br>置<br>工<br>艺<br>流<br>程<br>图<br>及<br>工<br>艺<br>说<br>明<br><br></strong>
                </td>
                <td style="width: 1050px;padding-left: 20px" ref="tableRight">
                    <div>
                        <img  :src="imageUrl" class="avatar" />
                    </div>
                </td>
            </tr>
        </table>

        <div style="margin-left: 20px;background-color: rgba(140, 147, 157, 0.16);height: 40px;padding-top: 10px;padding-left: 20px;margin-right: 20px;">
            <div style="width: 7px;height: 22px;background-color: rgba(27, 27, 27, 0.38);float: left"></div>
            <div style="float: left;margin-left: 10px;font-weight: bold; font-size: 16px;">二次环境污染控制和事故预防措施</div>
        </div>



        <table class="table2" style="margin-left: 20px">
            <tr>
                <td style="width: 200px;text-align: center;">
                    <strong><br>二<br>次<br>环<br>境<br>污<br>染<br>控<br>制<br>和<br>事<br>故<br>预<br>防<br>措<br>施<br><br></strong>
                </td>
                <td style="width: 1050px;vertical-align: top;" ref="tableRight2">
                    <br>
                        <div id = "footHeml" style="padding-left: 25px">

                        </div>
                    <br><br>
                </td>
            </tr>
        </table>



    </div>
</template>

<script>
    export default {
        name: "ToUseSelf",
        data(){
            return{
                entId:this.$route.params.entId,
                year:this.$route.params.year,
                checkList1:[],
                checkList2:[],
                ListData2:'',
                rowSize:50,
                thisNumSum:'',
                lastNumSum:'',
                imageUrl:'',
                dataForm:{},
                headBottom:{
                    width: '12%' ,
                    border: '1px solid #333',
                    borderTop:'0px',
                    minHeight: '88px',
                    float: 'left',
                    textAlign: 'center',
                }
            }
        },
        mounted(){
            this.getDataself()
            var that = this;
            window.vm.$on("ToUseSelf", function (year) {
                that.year = year
                that.getDataself();
            })
        },
        methods:{

            getTAttachments(correlationId){
                var that = this;
                var url = 'api/regulatory/ReportAndRegister/getAttByCorrelationId';
                var params = new URLSearchParams();
                params.append('correlationId', correlationId);// 附件关联Id
                params.append('type', '55');// 附件关联Id
                that.$axios.get(url,{params}).then(
                    function (res) {
                        if(res.code == 0){
                            var imgData = res.data;
                            if(imgData.length<1){
                                that.imageUrl=''
                                return;
                            }
                            that.imageUrl = that.IMG_URL + imgData[0].locationUrl
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    console.log(error);
                });
            },

            getDataself(){
                var that = this;
                var url = 'api/regulatory/ReportAndRegister/selfUse';
                that.$axios.get(url,{params: {
                    year:that.year,
                    id:that.entId}
                }).then(
                    function (res) {
                        if(res.code == 0){
                            if(res.data != null){
                                that.ListData2 = res.data.lis
                                that.rowSize = res.data.lis.length+2
                                that.dataForm = res.data.selfUsed[0];

                                that.checkList1=[]
                                that.checkList1.push((res.data.selfUsed[0].isRegular !=null  ? res.data.selfUsed[0].isRegular : '' )+'');

                                that.checkList2=[]
                                that.checkList2.push((res.data.selfUsed[0].isStandard !=null  ? res.data.selfUsed[0].isStandard : '' )+'');

                                var thisNumSum = 0;
                                var lastNumSum = 0;

                                for (var i = 0 ; i< res.data.lis.length ; i++){
                                    thisNumSum += res.data.lis[i].thisYearNumber
                                    lastNumSum += res.data.lis[i].lastYearNumber
                                }

                                that.thisNumSum = thisNumSum;
                                that.lastNumSum = lastNumSum;

                                $('#footHeml').html( res.data.selfUsed[0].measures );

                                that.getTAttachments(res.data.selfUsed[0].explain);
                            }else {
                                that.ListData2 = []
                                that.rowSize = 100
                                that.dataForm =[];

                                that.checkList1=[]
                                that.checkList2=[]

                                var thisNumSum = 0;
                                var lastNumSum = 0;

                                $('#footHeml').html( '' );

                                that.imageUrl =''
                            }
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    console.log(error);
                });
            },


        },
        destroyed: function() {
            window.vm.$off("ToUseSelf")
        }
    }
</script>

<style scoped>

    .tableClass{
        width: 1250px;
        border: 1px solid #333;
        border-collapse:collapse;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .tableClass tr td{
        width: 20%;
        height: auto;
        min-height: 44px;
        line-height: 24px;
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: center;
        border:1px solid #333;
        font-size: 16px;
    }

    .table2{
        border:1px solid #333;
        width: 1250px;
        border-collapse:collapse;
        font-size: 16px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .table2 tr td{
        border:1px solid #333;
    }
    .title{
        margin-top: 30px;
        font-size: 18px;
        width: 100%;
        height: 40px;
        background-color: #F7F7F7;
        line-height: 40px;
        margin-bottom: 20px;
    }


    /*
    !*!/ 多选*!
    /deep/ .el-checkbox__inner{
        border: 2px solid #DCDFE6;
    }
    /deep/ .cell .el-checkbox__input .el-checkbox__inner {
        background-color: #fff;
        color: #ededed;
        border-color: #ededed;
        width: 16px;
        height: 16px;
    }
    /deep/ .el-checkbox {
        color: #a8a8a8;
    }
    /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
        color: #6c7c92;
    }
    /deep/ .el-checkbox__input .el-checkbox__inner::after {
        !*!/ 对号*!
        border: 2px solid #ededed;
        !* // 不覆盖下面的 会 导致对号变形*!
        box-sizing: content-box;
        content: "";
        border-left: 0;
        border-top: 0;
        height: 7px;
        left: 4px;
        position: absolute;
        top: 1px;
        width: 3px;
    //
    transform: rotate(45deg) scaleY(1);
    }
    !* // 选中后*!
    /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
        background-color: #fff;
        border-color: #6c7c92;
    }
    /deep/ .el-checkbox__input.is-checked .el-checkbox__inner::after {
        border: 2px solid #6c7c92;
        -webkit-box-sizing: content-box;
        box-sizing: content-box;
        content: "";
        border-left: 0;
        border-top: 0;
        height: 7px;
        left: 3px;
        position: absolute;
        top: -1px;
        width: 3px;
        -webkit-transform: rotate(45deg) scaleY(1);
        transform: rotate(45deg) scaleY(1);
    }*/
</style>
