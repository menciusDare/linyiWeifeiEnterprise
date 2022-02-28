<template>
    <!-- 主体 -->
    <div class="main">
        <div class="main-top">
            <div class="breadcrumb">
                <a href="#"><i class="icon icon-zhuanyun"></i><span class="text-primary-font">五联单查询</span></a><span class="sep">></span><span class="text-primary">市内五联单查询</span>
            </div>
        </div>
        <div class="panel">
            <div class="panel-bd pdtlr-0">
                <div class="filter-more">
                    <ul class="filter-box">
                        <li class="filter-item">
                            <div class="filter-label">联单状态：</div>
                            <div class="filter-con">
                                <div class="el-select w160">
                                    <el-select v-model="linkedType" placeholder="请选择企业类型">
                                        <el-option
                                                v-for="item in linkedTypes"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-label">监控状态：</div>
                            <div class="filter-con">
                                <div class="el-select w320">
                                    <el-date-picker
                                                    v-model="tiem"  value-format="yyyy-MM-dd"
                                                    type="daterange"
                                                    range-separator="—"
                                                    start-placeholder="开始日期"
                                                    end-placeholder="结束日期">
                                    </el-date-picker>
                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-label">企业名称：</div>
                            <div class="filter-con">
                                <div class="el-input w160 el-input-group el-input--prefix"><!---->
                                    <el-input v-model="search" placeholder="请输入五联单编号">
                                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                    </el-input>
                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-label">五联单编号：</div>
                            <div class="filter-con">
                                <div class="el-input w160 el-input-group el-input--prefix"><!---->
                                    <el-input v-model="fiveLinkedNo" placeholder="请输入五联单编号">
                                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                    </el-input>
                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-btn">
                              <!--  <button type="button" class="button-type" @click="show">
                                    <span>查询</span></button>-->
                                <el-button type="button" size="medium"  @click="show" class="el-button el-button--primary">
                                    <span>查询</span></el-button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="total-number"  style="margin-left: 20px">
                <div class="total-name">
                    已找到<span class="num">&nbsp;{{total}}&nbsp;</span>条计划&nbsp;&nbsp;
                    <el-button type="primary" size="mini"  @click="basiReportList">
                            <i class="el-icon-upload2"></i>导出</el-button>
                </div>
            </div>
            <table class="table-default">
                <thead>
                <tr>
                    <th  style="text-align:center;width: 6%">序号</th>
                    <th style="text-align:center;width: 8%">五联单编号</th>
                    <th style="text-align:center;width: 8%">计划转移日期</th>
                    <th style="text-align:center;width: 8%">危废代码</th>
                    <th style="text-align:center;width: 8%">废物名称</th>
                    <th style="text-align:center;width: 8%">转移数量（吨）</th>
                    <th style="text-align:center;width: 9%">产废企业</th>
                    <th style="text-align:center;width: 9%">转运企业</th>
                    <th style="text-align:center;width: 9%">接收企业</th>
                    <th style="text-align:center;width: 8%">当前状态</th>
                    <th style="text-align:center;width: 8%">完成时间</th>
                    <th style="text-align:center;width: 8%">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,i)  in tableDatas" v-if="tableDatas.length>0">
                    <td style="text-align:center;width: 6%">{{item.index}}</td>
                    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.linkedId">{{item.linkedId}}</td>
                    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.plannedTransferTime">{{item.plannedTransferTime}}</td>
                    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.hazardousWasteCode">{{item.hazardousWasteCode}}</td>
                    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.detailsName">{{item.detailsName}}</td>
                    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.amount">{{item.amount}}</td>
                    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 9%" :title="item.wasteProductionEnt">{{item.wasteProductionEnt}}</td>
                    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 9%" :title="item.transportationEnt">{{item.transportationEnt}}</td>
                    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 9%" :title="item.receivingEnt">{{item.receivingEnt}}</td>
                    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.statusName"><div :class="item.statusClass">{{item.statusName}}</div></td>
                    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.completionTime">{{item.completionTime}}</td>
                    <td style="text-align:center;width: 8%">
                        <a href="javascript:;" class="text-primary text-underline" @click="showInfo(item.linkedId,item.statusName,item.status)">详情</a>
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
    </div>
</template>

<script>
    import downloadFile from "../../common/unit/DownloadFile";
    export default {
        name: "VideoMonitor",
        components: {
            downloadFile
        },
        data(){
            return {
                linkedTypes: [
                    {"value": -1,"label": "全部"},
                    {"value": 1,"label": "未开始"},
                    {"value": 2,"label": "转运中"},
                    {"value": 3,"label": "运转超时"},
                    {"value": 4,"label": "已完成"},
                ],
                cur_page: 1,
                pageSizes: this.AppConfig.appInfo.pageSizes,
                pageSize: this.AppConfig.appInfo.pageSize,
                tableDatas: [],
                total:0,
                totalPage:0,
                linkedType:-1,
                search:'',
                fiveLinkedNo:'',
                tiem:[],
                type:'1',
                path: '/api/regulatory/'
             }
        },
        created: function () {
            this.loadingData();
        },
     methods:{
         //导出
         basiReportList(){
             var _this = this;
             let url = _this.path+"tFiveLinked/export";
             var start = "";
             var end = "";
             if(null!=_this.tiem&&_this.tiem.length>0){
                 start = _this.tiem[0];
                 end = _this.tiem[1];
             }
             let params =new URLSearchParams();
             params.append('page',_this.cur_page);
             params.append('limit',_this.pageSize);
             params.append('linkedType',_this.linkedType);
             params.append('fiveLinkedNo',_this.fiveLinkedNo);
             params.append('startTime',start);
             params.append('endTime',end);
             params.append('search',_this.search);
             params.append('type',_this.type);
             _this.$axios.post(url,  params,
                 {responseType: "blob" }// 1.首先设置responseType对象格式为 blob:
                 // {responseType: 'arraybuffer'}
             ).then(function (response) {
                 downloadFile(response);
             }).catch(function () {
                 _this.$message.info("导出异常,请重试!");
             })
         },
         handleSizeChange(val) {
             // 改变每页显示的条数
             this.pageSize=val;
             // 注意：在改变每页显示的条数时，要将页码显示到第一页
             this.cur_page=1;
             this.loadingData();
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
         show(){
             this.cur_page=1;
             this.loadingData();
         },
         loadingData() {
             var _this = this;
             let url = _this.path+"tFiveLinked/selectTFiveLinkedPage";
             var start = "";
             var end = "";
             if(null!=_this.tiem&&_this.tiem.length>0){
                 start = _this.tiem[0];
                 end = _this.tiem[1];
             }
             let params =new URLSearchParams();
             params.append('page',_this.cur_page);
             params.append('limit',_this.pageSize);
             params.append('linkedType',_this.linkedType);
             params.append('fiveLinkedNo',_this.fiveLinkedNo);
             params.append('startTime',start);
             params.append('endTime',end);
             params.append('search',_this.search);
             params.append('type',_this.type);
             _this.$axios.get(url,{params}).then((response) => {
                 if(response.code == 0) {
                     _this.tableDatas = [];
                     for(var i =0;i<response.data.records.length;i++){
                         var da = response.data.records[i];
                         var statusClass = '';
                         if(da.status == 1){
                             statusClass = 'text-state state-off';
                         }else if(da.status == 2){
                             statusClass = 'text-state state-off1';
                         }else if(da.status == 3){
                             statusClass = 'text-state state-off2';
                         }else if(da.status == 4){
                             statusClass = 'text-state';
                         }
                         var obj = {
                             index: _this.getIndex(i),
                             linkedId: da.linkedId,
                             plannedTransferTime:da.plannedTransferTime,
                             hazardousWasteCode:da.hazardousWasteCode,
                             detailsName:da.detailsName,
                             amount:da.amount,
                             wasteProductionEnt:da.wasteProductionEnt,
                             transportationEnt:da.transportationEnt,
                             receivingEnt:da.receivingEnt,
                             statusName:da.statusName,
                             completionTime:da.completionTime,
                             status:da.status,
                             statusClass: statusClass,
                         }
                         _this.tableDatas.push(obj);
                     }
                     _this.entTotal = response.data.entTotal;
                     _this.total = response.data.total;
                     _this.totalPage = response.data.pages;
                 }else{
                     console.log(response.msg)
                 }
             }).catch((error) => {
                 // catch 指请求出错的处理
                 console.log(error);
             });
         },
         showInfo(linkedId,statusName,status){
             var statusClass = '';
             if(status == 1){
                 statusClass = 'text-state state-off';
             }else if(status == 2){
                 statusClass = 'text-state state-off1';
             }else if(status == 3){
                 statusClass = 'text-state state-off2';
             }else if(status == 4){
                 statusClass = 'text-state';
             }
             this.$router.push({ name: 'fiveLinkedInfo', params: { linkedId: linkedId,name:'市内五联单查询',pushPath:'cityFiveLinkedList',statusName: statusName,statusClass:statusClass}})
         }
     },
    }
</script>

<style>
    .text-state.state-off1 {
        background-color: 	#FFD306;
    }
    .text-state.state-off2 {
        background-color: #ff7575;
    }
    .text-state.state-off3 {
        background-color:  	#BBFFBB;
    }
</style>
