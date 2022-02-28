<template>
    <!-- 主体 -->
    <div class="main">
        <div class="main-top">
            <div class="breadcrumb">
                <a href="#"><i class="icon icon-shenbaodengji menu-icon"></i>申报登记</a><span class="sep">&gt;</span><span
                    class="text-primary">产废月报</span>
            </div>
        </div>
        <div class="panel">
            <div class="panel-bd">
                <div>
                    <ul class="filter-box">
                        <li class="filter-item">
                            <div class="filter-label">提交月份：</div>
                            <div class="filter-con">
                                <el-date-picker style="width: 150px;"
                                                :clearable="false"
                                                :picker-options="pickerOptions"
                                                @change = "submitMonthChange"
                                        v-model="search.reportYear"
                                        type="month" value-format="yyyy-MM"
                                        placeholder="选择年月">
                                </el-date-picker>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-btn">
                                <el-button type="button" size="medium"  @click="searchEntManagementPlanReport" class="el-button el-button--primary">
                                    <span>查询</span></el-button>
                            </div>
                        </li>
                    </ul>
                </div>
                <table class="table-default">
                    <colgroup>
                        <col style="width: 60px;">
                        <col>
                        <col style="width: 8%;">
                        <col style="width: 8%;">
                        <col style="width: 8%;">
                        <col style="width: 8%;">
                        <col style="width: 10%;">
                        <col style="width: 8%;">
                        <col style="width: 8%;">
                        <col style="width: 8%;">
                    </colgroup>
                    <thead>
                    <tr>
                        <th style="text-align:center;width: 6%">序号</th>
                        <th style="text-align:center;width: 10%">企业名称</th>
                        <th style="text-align:center;width: 10%">企业类型</th>
                        <th style="text-align:center;width: 8%">所在地</th>
                        <th style="text-align:center;width: 8%">所属行业</th>
                        <th style="text-align:center;width: 10%">联系人</th>
                        <th style="text-align:center;width: 8%">电话</th>
                        <th style="text-align:center;width: 10%">提交状态</th>
                        <th style="text-align:center;width: 10%">提交时间</th>
                        <th style="text-align:center;width: 10%">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in dataList" :key="index">
                        <td style="text-align:center;width: 6%">{{(cur_page-1)*pageSize+index+1}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.entName">
                                {{item.entName}}
                        </td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.entKind">{{item.entKind}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.regionName">{{item.regionName}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.categoryName">{{item.categoryName}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.contacts">{{item.contacts}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.contactsPhone">{{item.contactsPhone}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" >
                            <div v-if="item.submitime" class="text-state">已提交</div>
                            <div v-else class="text-state state-off">未提交</div>
                        </td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.submitime">
                            <div v-if="item.submitime">{{item.submitime}}</div>
                            <div v-else>--</div>
                        </td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" >
                            <div class="btn-opreate">
                                <a @click="lookEntMonthPeport(item.entId,item.entName,item.submitime)" href="javascript:;" class="text-primary text-underline">查看</a>
                                <!--<a v-else href="javascript:;" class="text-lighter text-underline">查看</a>-->
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="el-pagination is-background mt-lg">
                    <span class="el-pagination__total">共 {{total}}  条，每页显示</span>
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
            <el-dialog
                    top="9vh"
                    :title="entName"
                    :modal="true"
                    :modal-append-to-body="false"
                    :visible.sync="dialogVisible"
                    width="1000px"
                    height="50%"
                    @close="entReportDialogClose">
                <div>
                    <el-date-picker style="width: 150px;"
                                    clearable
                                    :readonly="true"
                                    :picker-options="pickerOptions"
                                    v-model="dialogSearch.reportYear"
                                    @change="dialogSearchReportYearChange"
                                    type="year"
                                    value-format="yyyy"
                                    placeholder="选择年">
                    </el-date-picker>
                </div>

                <div>
                    <el-tabs :tab-position="tabPosition" :stretch="true" v-model="productionName" @tab-click="monthClick">
                        <el-tab-pane v-for="item in monthList"
                                     :key="item.name"
                                     :label="item.name"
                                     :name="item.value"
                        ></el-tab-pane>
                    </el-tabs>
                </div>
                <div>
                    <div style="font-size: large;color: black;padding-bottom: 12px;">
                        <span style="padding-right: 3px">|</span>危废生产情况
                    </div>
                    <div style="padding-bottom: 12px;height: 236px;overflow: auto;">
                        <table class="mytable-default" >
                            <thead>
                            <tr>
                                <th style="text-align:center;width: 8%">序号</th>
                                <th style="text-align:center;width: 15%">废物代码</th>
                                <th style="text-align:center;width: 20%">危险废物名称</th>
                                <th style="text-align:center;width: 15%">生产量(吨)</th>
                                <th style="text-align:center;width: 15%">处置利用方式</th>
                                <th style="text-align:center;width: 15%">处置利用数量(吨)</th>
<!--                                 <th style="text-align:center;width: 10%">操作</th>-->
                            </tr>
                            </thead>
                            <tbody>
                                        <tr v-for="(item,index) in entMonthOrYearReportInfo.reportEntProductionVoList" :key="index">             
                <td style="text-align:center;width: 10%">{{(cur_page-1)*pageSize+index+1}}</td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%;padding:0 0 0 0"
                  :title="formatDictDetailCode(item.dictDetailCode)"
                >
                  <!--<a href="javascript:;" class="text-second text-underline">-->      
                  <!--</a>-->
<!--                  <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="true" v-model=" item.dictDetailCode"/>  -->
                                            {{item.dictDetailCode}}
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 20%"
                  :title="item.harmfulName"
                >
<!--                  <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="true" v-model=" item.harmfulName"/>  -->
             {{item.harmfulName}}
                
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                  :title="item.productionNumber"
                >
<!--                  <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="wfscShow" v-model=" item.productionNumber"/>  -->
             {{item.productionNumber}}
                
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                  :title="item.handleType"
                >
<!--                 <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="true" v-model=" item.handleType"/>  -->
              {{item.handleType}}
                
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                  :title="item.handleNumber"
                >
                
<!--                 <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="wfscShow" v-model=" item.handleNumber"/>  -->
              {{item.handleNumber}}
                
                </td>
<!--                  <td-->
<!--                  align="center"-->
<!--                  style="color:red;font-size:14px;cursor:pointer"-->
<!--                  @click="deleteOneRow(index)"-->
<!--                >删除</td>-->
              

             
              </tr>
      <tr v-if="controlAddNewItem">
        
              <td style="text-align:center;width: 10%">{{controlAddNewItemIndex}}</td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%;padding:0 0 0 0"
                  
                >
          {{newItemTop.dictDetailCode}}
<!--                            <el-select v-model="newItemTop.dictDetailCode" placeholder="请选择" @change="selectNode">-->
<!--                                <el-option-->
<!--                                  v-for="item in wasteList"-->
<!--                                :key="item.dictDetailCode"-->
<!--                                :label="item.dictDetailCode"-->
<!--                                :value="item.dictDetailCode">-->
<!--                                </el-option>-->
<!--                            </el-select>-->
                        
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 20%"
                 
                >

          {{newItemTop.harmfulName}}
<!--                <el-select v-model="newItemTop.harmfulName" :disabled="selectNodeTwoShow" placeholder="请选择" @change="selectNodeTwo" >-->
<!--                                <el-option-->
<!--                                  v-for="item in wasteList"-->
<!--                                :key="item.dictDetailName"-->
<!--                                :label="item.dictDetailName"-->
<!--                                :value="item.dictDetailName">-->
<!--                                </el-option>-->
<!--                            </el-select>-->
                
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
         
                >
<!--                  <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="wfscShow" v-model=" newItemTop.productionNumber"/>  -->
             {{newItemTop.productionNumber}}
                
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                 
                >
              {{newItemTop.handleType}}
<!--                    <el-select v-model="newItemTop.handleType" placeholder="请选择">-->
<!--                                <el-option-->
<!--                                v-for="item in operationModeList"-->
<!--                                :key="item.value"-->
<!--                                :label="item.name"-->
<!--                                :value="item.value">-->
<!--                                </el-option>-->
<!--                            </el-select>-->
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                
                >
                {{newItemTop.handleNumber}}
<!--                 <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="wfscShow" v-model=" newItemTop.handleNumber"/>  -->
              
                
                </td>
<!--                  <td-->
<!--                  align="center"-->
<!--                  style="color:red;font-size:14px;cursor:pointer"-->
<!--                  @click="deleteOneRowNewItem()"-->
<!--                >删除</td>-->
              
      </tr>
              <tr v-if="entMonthOrYearReportInfo.reportEntProductionVoList">
                <td colspan="3" align="center" style="width:100%;border:none; height:44px;text-align:center">合计</td>
                 <td
                  align="center"
                >
                 {{entDialogCountInfo.productionNumber}}
                 </td>
               
                <td align="center">/</td>
                  <td
                  align="center"
                >{{entDialogCountInfo.handleNumber}}</td>
              
<!--                <td-->
<!--                  align="center"-->
<!--                  style="color:blue;font-size:14px;cursor:pointer"-->
<!--                  @click=addOneRow()-->
<!--                >-->
<!--                新增</td>-->
              </tr>
                     
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <div style="font-size: large;color: black;padding-bottom: 12px;">
                        <span style="padding-right: 3px">|</span>危废委托利用处置情况
                    </div>
                    <div style="padding-bottom: 12px;height: 236px;overflow: auto;">
                        <table class="mytable-default" >
                            <thead>
                            <tr>
                                <th style="text-align:center;width: 8%">序号</th>
                                <th style="text-align:center;width: 10%">废物代码</th>
                                <th style="text-align:center;width: 15%">危险废物名称</th>
                                <th style="text-align:center;width: 15%">委托单位名称</th>
                                <th style="text-align:center;width: 10%">所在地</th>
                                <th style="text-align:center;width: 15%">经验许可证编号</th>
                                <th style="text-align:center;width: 15%">处置利用方式</th>
                                <th style="text-align:center;width: 10%">数量(吨)</th>
<!--                                   <th style="text-align:center;width: 10%">操作</th>-->
                            </tr>
                            </thead>
                            <tbody>
                        <tr v-for="(item,index) in entMonthOrYearReportInfo.reportEntEntrusts" :key="index">
                <td style="text-align:center;width: 10%">{{(cur_page-1)*pageSize+index+1}}</td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                  :title="formatDictDetailCode(item.dictDetailCode)"
                >
                       
<!--    <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="true" v-model=" item.dictDetailCode"/>-->
                    {{item.dictDetailCode}}
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                  :title="item.harmfulName"
                >
<!--                   <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="true" v-model=" item.harmfulName"/>-->
                    {{item.harmfulName}}
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                  :title="item.client"
                >             
<!--                  <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="wfscShow" v-model=" item.client"/>  -->
                    {{item.client}}
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                  :title="item.location"
                >
                    {{item.location}}
<!--                       <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="wfscShow" v-model=" item.location"/>  -->
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                  :title="item.license"
                >
                    {{item.license}}
<!--                 <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="wfscShow" v-model=" item.license"/>  -->
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                  :title="item.handleType"
                >
                    {{item.handleType}}
<!--                  <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="true" v-model=" item.handleType"/>               -->
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                  :title="item.entrustNumber"
                >
<!--                    <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="wfscShow" v-model=" item.entrustNumber"/>             -->
                    {{item.entrustNumber}}
                </td>
<!--                     <td-->
<!--                  align="center"-->
<!--                  style="color:red;font-size:14px;cursor:pointer"-->
<!--                  @click="deleteOneRowMiddle(index)"-->
<!--                >删除</td>-->
              </tr>


           <tr v-if="controlAddNewItemMiddle" >
                <td style="text-align:center;width: 10%">{{controlAddNewItemIndexMiddle}}</td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                  :title="newItemMiddle.dictDetailCode"
                >
  {{newItemMiddle.dictDetailCode}}
                       <el-select v-model="newItemMiddle.dictDetailCode" placeholder="请选择" @change="selectNodeMiddle">
                                <el-option
                                  v-for="item in wasteList"
                                :key="item.dictDetailCode"
                                :label="item.dictDetailCode"
                                :value="item.dictDetailCode">
                                </el-option>
                            </el-select>
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                  :title="newItemMiddle.harmfulName"
                >
                        <el-select v-model="newItemMiddle.harmfulName" :disabled="selectNodeTwoShowMiddle" placeholder="请选择" @change="selectNodeTwoMiddle" >
                                <el-option
                               v-for="item in wasteList"
                                :key="item.dictDetailName"
                                :label="item.dictDetailName"
                                :value="item.dictDetailName">
                                </el-option>
                            </el-select>
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                  :title="newItemMiddle.client"
                >             
                  <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="wfscShow" v-model=" newItemMiddle.client"/>  
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                  :title="newItemMiddle.location"
                >
                       <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="wfscShow" v-model=" newItemMiddle.location"/>  
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                  :title="newItemMiddle.license"
                >
                 <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="wfscShow" v-model=" newItemMiddle.license"/>  
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                  :title="newItemMiddle.handleType"
                >
                     <el-select v-model="newItemMiddle.handleType" placeholder="请选择">
                                <el-option
                                v-for="item in operationModeList"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                                </el-option>
                            </el-select>
                   </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                  :title="newItemMiddle.entrustNumber"
                >
                    <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="wfscShow" v-model=" newItemMiddle.entrustNumber"/>             
                </td>
<!--                     <td-->
<!--                  align="center"-->
<!--                  style="color:red;font-size:14px;cursor:pointer"-->
<!--                  @click="deleteOneRowNewItemMiddle()"-->
<!--                >删除</td>-->
              </tr>
              <tr v-if="entMonthOrYearReportInfo.reportEntEntrusts">
                <td colspan="7" align="center" style="width:100%;border:none; height:44px;text-align:center">合计</td>
                <td
                  align="center"
                >{{entDialogCountInfo.entrustNumber}}
               
                
                </td>
<!--                   <td-->
<!--                  align="center"-->
<!--                  style="color:blue;font-size:14px;cursor:pointer"-->
<!--                  @click=addOneRowMiddle()-->
<!--                >-->
<!--                新增</td>-->
              </tr>        
                          
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <div style="font-size: large;color: black;padding-bottom: 12px;">
                        <span style="padding-right: 3px">|</span>危废贮存情况
                    </div>
                    <div style="padding-bottom: 12px;height: 236px;overflow: auto;">
                        <table class="mytable-default" >
                            <thead>
                            <tr>
                                <th style="text-align:center;width: 8%">序号</th>
                                <th style="text-align:center;width: 20%">废物代码</th>
                                <th style="text-align:center;width: 20%">危险废物名称</th>
                                <th style="text-align:center;width: 17%">上月遗留贮存量(吨)</th>
                                <th style="text-align:center;width: 17%">上月底贮存量(吨)</th>
                                <th style="text-align:center;width: 17%">本月底贮存量(吨)</th>
<!--                                 <th style="text-align:center;width: 10%">操作</th>-->
                            </tr>
                            </thead>
                            <tbody>
            
                                 <tr v-for="(item,index) in entMonthOrYearReportInfo.reportEntStorageVos" :key="index">
                <td style="text-align:center;width: 8%">{{(cur_page-1)*pageSize+index+1}}</td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 17%"
                  :title="item.dictDetailCode"
                >
                  <!--<a href="javascript:;" class="text-second text-underline">-->
                      
<!--               <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="true" v-model=" item.dictDetailCode"/>             -->
       {{item.dictDetailCode}}
                
                  <!--</a>-->
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 17%"
                  :title="item.harmfulName"
                >{{item.harmfulName}}</td>
                <td
                        align="center"
                >{{(entDialogCountInfo.legacyMonth?entDialogCountInfo.legacyMonth:0).toFixed(2)}}</td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 17%"
                  :title="item.lastMonth"
                >
<!--                     <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="wfscShow" v-model=" item.lastMonth"/>             -->

                    {{item.lastMonth}}
                
               </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 17%"
                  :title="item.thisMonth"
                >
<!--                  <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="wfscShow" v-model=" item.thisMonth"/>             -->
       {{item.thisMonth}}
                </td>
<!--                         <td-->
<!--                  align="center"-->
<!--                  style="color:red;font-size:14px;cursor:pointer"-->
<!--                  @click="deleteOneRowBottom(index)"-->
<!--                >删除</td>-->
              </tr>

                    <tr v-if="controlAddNewItemBottom">
                <td style="text-align:center;width: 8%">{{controlAddNewItemIndexBottom}}</td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 17%"
                  :title="newItemBottom.dictDetailCode"
                >
                  
                
                                <el-select v-model="newItemBottom.dictDetailCode" placeholder="请选择" @change="selectNodeBottom">
                                <el-option
                                 v-for="item in wasteList"
                                :key="item.dictDetailCode"
                                :label="item.dictDetailCode"
                                :value="item.dictDetailCode">
                                </el-option>
                            </el-select>
                  <!--</a>-->
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 17%"
                  :title="newItemBottom.harmfulName"
                >
                
                    <el-select v-model="newItemBottom.harmfulName" :disabled="selectNodeTwoShowBottom" placeholder="请选择" @change="selectNodeTwoBottom" >
                                <el-option
                                    v-for="(item,index) in wasteList"
                                :key="index"
                                :label="item.dictDetailName"
                                :value="item.dictDetailName">
                                </el-option>
                            </el-select>
                </td>
                <td
                        align="center"
                >{{(entDialogCountInfo.legacyMonth?entDialogCountInfo.legacyMonth:0).toFixed(2)}}</td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 17%"
                  :title="newItemBottom.lastMonth"
                >
                 <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="wfscShow" v-model=" newItemBottom.lastMonth"/>             
   
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 17%"
                  :title="newItemBottom.thisMonth"
                >   
                <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="wfscShow" v-model=" newItemBottom.thisMonth"/>             
       </td>
             <td
                  align="center"
                  style="color:red;font-size:14px;cursor:pointer"
                  @click="deleteOneRowNewItemBottom()"
                >删除</td>
              </tr>
              <tr v-if="entMonthOrYearReportInfo.reportEntStorageVos">
                <td style="width:100%; height:44px;text-align:center" colspan="3" align="center">合计</td>
                <td
                        align="center"
                >{{(entDialogCountInfo.legacyMonth?entDialogCountInfo.legacyMonth:0).toFixed(2)}}</td>
                <td
                style="width:100%; height:44px;text-align:center"
                  align="center"
                >{{(entDialogCountInfo.lastMonth?entDialogCountInfo.lastMonth:0).toFixed(2)}}</td>
                <td
                style="width:100%;; height:44px;text-align:center"
                  align="center"
                >{{(entDialogCountInfo.thisMonth?entDialogCountInfo.thisMonth:0).toFixed(2)}}</td>
<!--                  <td-->
<!--                  align="center"-->
<!--                  style="color:blue;font-size:14px;cursor:pointer"-->
<!--                  @click=addOneRowBottom()-->
<!--                >-->
<!--                新增</td>-->
              </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                    <div style="text-align:center;width:100%;">
        <div>
        <el-button v-if="listItemSubmitime == null"
                size="mini"
                type="primary"
                @click="saveOrUpdateData()"
              >提交</el-button>
              <el-button
                size="mini"
                type="danger"
                 
                  @click="cancleSee()"
              >取消</el-button>
               </div>
               </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "entMonthReport",
        data(){
            return {
       
                  selectNodeTwoShow:true,
      selectNodeTwoShowMiddle:true,
      selectNodeTwoShowBottom:true,
      operationModeList:[],
      wasteList:[],
    
      wfscShow:false,
   controlAddNewItem:false,
   controlAddNewItemMiddle:false,
   controlAddNewItemBottom:false,
   controlAddNewItemIndex:'',
   controlAddNewItemIndexMiddle:'',
    controlAddNewItemIndexBottom:'',
   newItemTop:{
        dictDetailCode:'',
        harmfulName:'',
        productionNumber:'',
        handleType:'',
        handleNumber:''
      },
      newItemMiddle: {
    
        dictDetailCode:'',
        harmfulName:'',
        entrustNumber:'',
        handleType:'',
       client:'',
location:'',
license:'',
      },
   newItemBottom: {
      dictDetailCode: "",
harmfulName: "",
lastMonth: '',
legacyMonth: '',
thisMonth: ''
    },

                pickerOptions: {
                    disabledDate(time) {
                        // return time.getTime() < Date.now() - 8.64e7;   //禁用以前的日期，今天不禁用
                        // return date.getTime() <= Date.now();    //禁用今天以及以前的日期
                        return time.getTime() > Date.now();
                    }
                },
                isDisabled:false,
                productionName:new Date().format("MM"),
                tabPosition: 'top',
                entName:'',
                dialogVisible:false,
                total:0,
                totalPage:0,
                cur_page: 1,
                pageSizes: this.AppConfig.appInfo.pageSizes,
                pageSize: this.AppConfig.appInfo.pageSize,
                regionCode:[],
                regionLevel:this.AppConfig.appInfo.regionLevel,
                parentCode:this.AppConfig.appInfo.parentCode,
                regionName:this.AppConfig.appInfo.regionName,
                listItemSubmitime: '',
                reportStatusOptions:[{
                    value: '',
                    label: '全部'
                }, {
                    value: '1',
                    label: '已备案'
                }, {
                    value: '2',
                    label: '未备案'
                }],
                dialogSearch:{
                    reportYear:new Date().format("yyyy")
                },
                search:{
                    regionCode:sessionStorage.getItem('regionCode'),
                    entType:'',
                    entKind:'1',
                    standardSituation:'',
                    entName:'',
                    regionName :this.AppConfig.appInfo.regionName,
                    regionLevel:sessionStorage.getItem('regionLevel'),
                    regionParentCode:'',
                    reportStatus:'',
                    reportYear:new Date().format("yyyy-MM"),
                    year:new Date().format("yyyy"),
                    month:new Date().format("MM"),
                    sourceType:2
                },
                dataList:[],
                managementPlanFilingEntInfo:'',
                entMonthOrYearReportInfo:'',
                entDialogCountInfo:{
                    productionNumber:0,
                    handleNumber:0,
                    entrustNumber:0,
                    lastMonth:0,
                    thisMonth:0
                },
                entId:'',
                monthList:[{
                    name:"1月",
                    value:"01"
                },{
                    name:"2月",
                    value:"02"
                },{
                    name:"3月",
                    value:"03"
                },{
                    name:"4月",
                    value:"04"
                },{
                    name:"5月",
                    value:"05"
                },{
                    name:"6月",
                    value:"06"
                },{
                    name:"7月",
                    value:"07"
                },{
                    name:"8月",
                    value:"08"
                },{
                    name:"9月",
                    value:"09"
                },{
                    name:"10月",
                    value:"10"
                },{
                    name:"11月",
                    value:"11"
                },{
                    name:"12月",
                    value:"12"
                }]
            }
        },
        created: function () {
            if(this.search.regionLevel==3){
                this.isDisabled = true;
            }
            this.initMonthList();
             this.getOperationModeList();
            this.searchEntManagementPlanReport();
        },
        methods:{
               
    			      getOperationModeList() {
                 this.$axios
        .get("/api/regulatory/type/getTypeOptionsList/15", 
        ).then((res) => {
                    this.operationModeList = res.data
                }).catch((err) => {
                    this.message = "连接服务器失败！"
                })
            },
                selectCodes() {
      var _this = this;
      var params = {};
     
     params.entId= _this.entId;
      params.type=1;
       
      _this.$axios
        .get("/api/regulatory/tEnterpriseInfo/selectWasteInfoOptions",  {params} )
        .then(function (res) {
        
          if (res.code == 0) {
             let len =res.data.length-1;
  _this.wasteList=res.data.slice(0,len)
          }
        })
        .catch((error) => {        
           console.log(error);
        });
    },
            regionChange(value) {
                this.regionCode = value
            },
            formatDictDetailCode(code){
                  if(code==null || !code){
                      return '--';
                  }else{
                      return code.split('#')[0];
                  }
            },
                selectNodeMiddle(val){
this.wasteList.forEach(item=>{
if(item.dictDetailCode==val){
this.wasteList=[];
this.wasteList.push(item)
}
})
this.selectNodeTwoShowMiddle=false
},
            initMonthList(){
                this.monthList = [];
                var year = this.search.reportYear.split("-")[0];
                var timeArr = new Date().format("yyyy-MM").split("-");
                var thisLength = null;
                if(year==timeArr[0]){
                    // 当前月之前
                    thisLength = timeArr[1];
                }else{
                    thisLength = 12;
                }
                for (let i = 1; i <= thisLength; i++) {
                    var obj ={};
                    obj.name = i +"月";
                    if(i<10){
                        obj.value = "0"+i;
                    }else{
                        obj.value = i+"";
                    }
                    this.monthList.push(obj);
                }
            },
            handleSizeChange(val) {
                // 改变每页显示的条数
                this.pageSize=val
                // 注意：在改变每页显示的条数时，要将页码显示到第一页
                this.cur_page=1
                this.pageList();
            },
            handleCurrentChange(val) {
                this.cur_page = val;
                this.pageList();
            },
            getIndex(index){
                let curPage = this.cur_page;
                let limitPage = this.pageSize;
                return (index+1) + (curPage - 1) * limitPage;
            },
            searchEntManagementPlanReport(){
              var _this = this;
              var region = sessionStorage.getItem('regionCode')
              _this.search.regionCode = region;
              _this.cur_page = 1;
              _this.pageList();
            },
                selectNodeBottom(val){
this.wasteList.forEach(item=>{
if(item.dictDetailCode==val){
this.wasteList=[];
this.wasteList.push(item)
}
})
this.selectNodeTwoShowBottom=false
},
    addOneRow(){  
        
 this.controlAddNewItem=true;
      // this.wfscShow =true
      this.controlAddNewItemIndex = this.entMonthOrYearReportInfo.reportEntProductionVoList.length+1

    },
      addOneRowMiddle(){  
   
       this.controlAddNewItemMiddle =true
          this.controlAddNewItemIndexMiddle = this.entMonthOrYearReportInfo.reportEntEntrusts.length+1

    },
          addOneRowBottom(){  
   
       this.controlAddNewItemBottom =true
          this.controlAddNewItemIndexBottom = this.entMonthOrYearReportInfo.reportEntStorageVos.length+1

    },
            pageList(){
                var _this=this;
                var params = new URLSearchParams();
                params.append('page', _this.cur_page);
                params.append('limit', _this.pageSize);
                params.append('regionCode', _this.regionCode);
                params.append('entType', _this.search.entType);
                params.append('entKind',_this.search.entKind);
                params.append('year', _this.search.year);
                params.append('month', _this.search.month);
                params.append('entId', sessionStorage.getItem('entId'));
                params.append('entName', _this.search.entName);
                params.append('sourceType', _this.search.sourceType);
            
                _this.$axios.get('/api/regulatory/index/selectEntMonthYearReportList',{params}).then(
                    function (res) {
                        if(res.code == 0){
                            _this.dataList = res.data.records;
                            _this.totalPage = res.data.pages;
                            _this.total = res.data.total;
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                });
            },
            searchRegionChange(){
                let regionInfo =this.$refs.regionElCascader.getCheckedNodes();
                if(regionInfo.length>0){
                    this.search.regionName = regionInfo[0].label;
                    this.search.regionLevel= regionInfo[0].level+1;
                    this.search.regionCode = regionInfo[0].value;
                    let parentRegionInfo = regionInfo[0].parent;
                    if(parentRegionInfo!=null){
                        this.search.regionParentCode = parentRegionInfo.value;
                    }else{
                        this.search.regionName = this.regionName;
                        this.search.regionLevel= this.regionLevel;
                        this.search.regionCode = this.regionCode;
                        this.search.regionParentCode = this.parentCode;
                    }
                }else{
                    this.search.regionName = this.regionName;
                    this.search.regionLevel= this.regionLevel;
                    this.search.regionCode = this.regionCode;
                    this.search.regionParentCode = this.parentCode;
                }
                /*console.log(this.search.regionCode+"<<<当前省/市/区");*/
            },
            selectManagementPlanFilingEntInfo(entId){
                var _this=this;
                _this.$axios.get('/api/regulatory/index/selectManagementPlanFilingEntInfo/'+entId).then(
                    function (res) {
                        if(res.code == 0){
                            _this.managementPlanFilingEntInfo = res.data;
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                });
            },
                selectNode(val){
this.wasteList.forEach(item=>{
if(item.dictDetailCode==val){
this.wasteList=[];
this.wasteList.push(item)
}
})
this.selectNodeTwoShow=false
},
 
                selectEntMonthYearReportInfo() {
      var _this = this;
     
      // var params = new URLSearchParams();
      // params.append("entId", _this.entId);
      // params.append("year", _this.search.year);
      // params.append("month", _this.search.month);
      //  params.append("sourceType", _this.search.sourceType);
         var params = {};
      params.entId= _this.entId;
      params.year= _this.search.year;
      params.month= _this.search.month;
       params.sourceType= _this.search.sourceType;

    //   params.append('sourceType', 1);
      _this.$axios
        .get("/api/regulatory/index/selectEntMonthYearReportInfo1/", {params} )
        .then(function (res) {
     debugger
          if (res.code == 0) {
           
            res.data.reportEntProductionVoList.forEach(ele => {
              ele.dictDetailCode = _this.formatDictDetailCode(ele.dictDetailCode)  

             ele.productionNumber = (ele.productionNumber?ele.productionNumber:0).toFixed(2)
             ele.handleNumber=(ele.handleNumber?ele.handleNumber:0).toFixed(2)
            });
if(res.data.reportEntEntrusts!=null){
    res.data.reportEntEntrusts.forEach(ele => {
              ele.dictDetailCode = _this.formatDictDetailCode(ele.dictDetailCode)    
             ele.entrustNumber = (ele.entrustNumber?ele.entrustNumber:0).toFixed(2)
            
            });
}
         
        if(res.data.reportEntEntrusts==null){
res.data.reportEntEntrusts=[]
         }
        if(res.data.reportEntProductionVoList==null){
res.data.reportEntProductionVoList=[]
         }
                 if(res.data.reportEntStorageVos==null){
res.data.reportEntStorageVos=[]
         }
            _this.entMonthOrYearReportInfo = res.data;
            let reportEntEntrusts = res.data.reportEntEntrusts;
            let reportEntProductionVoList = res.data.reportEntProductionVoList;
            let reportEntStorageVos = res.data.reportEntStorageVos;
          
            if (reportEntEntrusts && reportEntEntrusts.length > 0) {
               let cur =0;
              for (let i = 0; i < reportEntEntrusts.length; i++) {
                
                  if(res.data.reportEntEntrusts[i].entrustNumber==null){
  res.data.reportEntEntrusts[i].entrustNumber=0
                  }
                
                cur +=
                ( +res.data.reportEntEntrusts[i].entrustNumber);
             
              
              }
             
               _this.entDialogCountInfo.entrustNumber=cur.toFixed(2)
               
            }
            
            if (reportEntProductionVoList && reportEntProductionVoList.length > 0) {
               let curB =0,curC=0;
              for (let i = 0; i < reportEntProductionVoList.length; i++) {
                  let curZA =res.data.reportEntProductionVoList[i].productionNumber
                  if(curZA==null){
 curZA=0
                  }
                  curB+=
                  (+curZA);  
                  let curZB =res.data.reportEntProductionVoList[i].handleNumber
                 if(curZB==null){
  curZB=0
                  }    
                   curC +=
                 ( +curZB);   
                      
            
              }
                _this.entDialogCountInfo.productionNumber=(curB).toFixed(2)

                  _this.entDialogCountInfo.handleNumber=(curC).toFixed(2)
            }
                   res.data.reportEntStorageVos.forEach(ele => {

              ele.dictDetailCode = _this.formatDictDetailCode(ele.dictDetailCode)
             
            //  ele.lastMonth = (ele.lastMonth?ele.lastMonth:0).toFixed(2)
            if(ele.lastMonth==null||ele.lastMonth==undefined){
ele.lastMont=0
            }
            ele.lastMonth=ele.lastMonth.toFixed(2)
            //  ele.thisMonth=(ele.thisMonth?ele.thisMonth:0).toFixed(2)
                        if(ele.thisMonth==null||ele.thisMonth==undefined){
ele.thisMonth=0
            }
            ele.thisMonth=ele.thisMonth.toFixed(2)
            });
             
            if (reportEntStorageVos.length > 0) {
              let curB =0,curC=0;
              for (let i = 0; i < reportEntStorageVos.length; i++) {
                         curB+=
                  (+res.data.reportEntStorageVos[i].lastMonth);            
              curC +=
                ( + res.data.reportEntStorageVos[i].thisMonth);  
             
            
              }
               _this.entDialogCountInfo.lastMonth=curB
               _this.entDialogCountInfo.thisMonth=curC
            }
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          // console.log(error);
        });
         _this.selectCodes()
    },
                   deleteOneRow(index) {
      let _this = this;
    
     let params ={}
        // let params = new URLSearchParams();
      let entIDd=sessionStorage.getItem('entId')
      params.entId =entIDd ;
       params.month= _this.search.month;
      //  params.reportEntEntrusts= _this.entMonthOrYearReportInfo.reportEntEntrusts;
      //       params.reportEntStorageVos= _this.entMonthOrYearReportInfo.reportEntStorageVos;
          params.reportEntEntrusts= [];
            params.reportEntStorageVos= [];
            let curArr =[];
            curArr.push(_this.entMonthOrYearReportInfo.reportEntProductionVoList[index])
       params.reportEntProductionVoList= curArr;
  
       params.entType= _this.search.entType;
       params.entKind=_this.search.entKind;      
       params.year= _this.search.year;
        //  params.sourceType=1;
        params.sourceType=_this.search.sourceType;
      
      _this.$axios
        .post("/api/regulatory/tYearOrMonthlyReport/deleteYearOrMonthlyReportRecord", 
         params ).then(function (res) {
              if (res.code == 0 && res.msg) {
                _this.$message({
                  message: "删除成功！",
                  type: "success",
                });   
                _this.selectEntMonthYearReportInfo()     
              } else {
                _this.$message.error("删除失败！");
              }   
            })
            .catch((error) => {
              // catch 指请求出错的处理
               console.log(error);
            });
    },
                deleteOneRowMiddle(index) {
      let _this = this;
     console.log('cc',_this.entMonthOrYearReportInfo) 
     let params ={}
        // let params = new URLSearchParams();
      let entIDd=sessionStorage.getItem('entId')
      params.entId =entIDd ;
       params.month= _this.search.month;
      //  params.reportEntEntrusts= _this.entMonthOrYearReportInfo.reportEntEntrusts;
      //       params.reportEntStorageVos= _this.entMonthOrYearReportInfo.reportEntStorageVos;
          params.reportEntProductionVoList= [];
            params.reportEntStorageVos= [];
            let curArr =[];
            curArr.push(_this.entMonthOrYearReportInfo.reportEntEntrusts[index])
       params.reportEntEntrusts= curArr;
       params.entType= _this.search.entType;
       params.entKind=_this.search.entKind;      
       params.year= _this.search.year;
    //    params.sourceType=1;
        params.sourceType=_this.search.sourceType;
      _this.$axios
        .post("/api/regulatory/tYearOrMonthlyReport/deleteYearOrMonthlyReportRecord", 
         params ).then(function (res) {
              if (res.code == 0 && res.msg) {
                _this.$message({
                  message: "删除成功！",
                  type: "success",
                });   
                _this.selectEntMonthYearReportInfo()     
              } else {
                _this.$message.error("删除失败！");
              }   
            })
            .catch((error) => {
               console.log(error);
            });
    },
                                deleteOneRowBottom(index) {
      let _this = this;
    
     let params ={}
        // let params = new URLSearchParams();
      let entIDd=sessionStorage.getItem('entId')
      params.entId =entIDd ;
       params.month= _this.search.month;
      //  params.reportEntEntrusts= _this.entMonthOrYearReportInfo.reportEntEntrusts;
      //       params.reportEntStorageVos= _this.entMonthOrYearReportInfo.reportEntStorageVos;
          params.reportEntProductionVoList= [];
            params.reportEntEntrusts= [];
            let curArr =[];
            curArr.push(_this.entMonthOrYearReportInfo.reportEntStorageVos[index])
       params.reportEntStorageVos= curArr;
       params.entType= _this.search.entType;
       params.entKind=_this.search.entKind;      
       params.year= _this.search.year;
       params.sourceType=2;
       
      _this.$axios
        .post("/api/regulatory/tYearOrMonthlyReport/deleteYearOrMonthlyReportRecord", 
         params ).then(function (res) {
              if (res.code == 0 && res.msg) {
                _this.$message({
                  message: "删除成功！",
                  type: "success",
                });   
                _this.selectEntMonthYearReportInfo()     
              } else {
                _this.$message.error("删除失败！");
              }   
            })
            .catch((error) => {
               console.log(error);
            });
    },
          saveOrUpdateData() {
           
       let _this = this;
    //  console.log('cc',_this.entMonthOrYearReportInfo) 
       let params ={}
         let entIDd=sessionStorage.getItem('entId')
      params.entId =entIDd ;     
       params.month = _this.search.month;
       if(_this.controlAddNewItemMiddle==true){
_this.entMonthOrYearReportInfo.reportEntEntrusts.push(_this.newItemMiddle)
       }
       params.reportEntEntrusts= _this.entMonthOrYearReportInfo.reportEntEntrusts;
       if(params.reportEntEntrusts==null){
params.reportEntEntrusts=[]
       }
       if (_this.controlAddNewItem==true){
_this.entMonthOrYearReportInfo.reportEntProductionVoList.push(_this.newItemTop)
       }
       params.reportEntProductionVoList= _this.entMonthOrYearReportInfo.reportEntProductionVoList;
       
              if(_this.controlAddNewItemBottom==true){
_this.entMonthOrYearReportInfo.reportEntStorageVos.push(_this.newItemBottom)
       }
       params.reportEntStorageVos= _this.entMonthOrYearReportInfo.reportEntStorageVos;
       params.entType= _this.search.entType;
       params.entKind=_this.search.entKind;      
       params.year= _this.search.year;
        params.sourceType=_this.search.sourceType;
      
      _this.$axios
        .post("/api/regulatory/tYearOrMonthlyReport/merageYearOrMonthlyReportRecord", 
        params ).then(function (res) {
              if (res.code == 0 && res.msg) {
                _this.$message({
                  message: "保存成功！",
                  type: "success",
                });   
            _this.selectEntMonthYearReportInfo()      
              } else {
                _this.$message.error("保存失败！");
              }   
            })
            .catch((error) => {
              // catch 指请求出错的处理
               console.log(error);
            });
            _this.deleteOneRowNewItem()
            _this.deleteOneRowNewItemMiddle()
             _this.deleteOneRowNewItemBottom()
    },

    selectNodeTwo(){
this.selectCodes()
this.selectNodeTwoShow=true
},
selectNodeTwoMiddle(){
this.selectCodes()
this.selectNodeTwoShowMiddle=true
},
selectNodeTwoBottom(){
this.selectCodes()
this.selectNodeTwoShowBottom=true
},
        cancleSee(){
      
       this.dialogVisible = false;
    },
    deleteOneRowNewItem(){
this.controlAddNewItem=false;
this.newItemTop= {
        dictDetailCode:'',
        harmfulName:'',
        productionNumber:'',
        handleType:'',
        handleNumber:''
      }
    },
        deleteOneRowNewItemMiddle(){
this.controlAddNewItemMiddle=false;
this.newItemMiddle= {
        dictDetailCode:'',
        harmfulName:'',
        productionNumber:'',
        handleType:'',
        handleNumber:''
      }
    },
            deleteOneRowNewItemBottom(){
this.controlAddNewItemBottom=false;
this.newItemBottom={
      dictDetailCode: "",
harmfulName: "",
lastMonth: '',
legacyMonth: '',
thisMonth: ''
    }
    },
    addOneRow(){  
 this.controlAddNewItem=true;
      // this.wfscShow =true
      this.controlAddNewItemIndex = this.entMonthOrYearReportInfo.reportEntProductionVoList.length+1

    },
      addOneRowMiddle(){  
   
       this.controlAddNewItemMiddle =true
          this.controlAddNewItemIndexMiddle = this.entMonthOrYearReportInfo.reportEntEntrusts.length+1

    },
          addOneRowBottom(){  
   
       this.controlAddNewItemBottom =true
          this.controlAddNewItemIndexBottom = this.entMonthOrYearReportInfo.reportEntStorageVos.length+1

    },
            lookEntMonthPeport(entId,entName,submitime){
                this.entName = entName;
                this.entId = entId;
                this.listItemSubmitime = submitime;
                this.selectEntMonthYearReportInfo();
                this.dialogVisible = true;
            },
            monthClick(tab, event){
                this.resetEntDialogCountInfo();
                this.search.year = this.dialogSearch.reportYear;
                this.search.month = (parseInt(tab.index)+1);
                this.selectEntMonthYearReportInfo();
            },
            entReportDialogClose(){
                this.resetEntDialogCountInfo();
                this.dialogVisible=false;
                this.submitMonthChange();
                this.resetEntDialogCountInfo();
            },
            submitMonthChange(){
                var timeArr = this.search.reportYear.split("-");
                this.dialogSearch.reportYear = timeArr[0];
                this.search.year = timeArr[0];
                this.search.month = timeArr[1];
                this.productionName = timeArr[1];
                this.initMonthList();
            },
            dialogSearchReportYearChange(){
                this.initMonthList();
                this.resetEntDialogCountInfo();
                this.search.year = this.dialogSearch.reportYear;
                this.selectEntMonthYearReportInfo();
            },
            resetEntDialogCountInfo(){
                this.entDialogCountInfo.productionNumber=0;
                this.entDialogCountInfo.handleNumber=0;
                this.entDialogCountInfo.entrustNumber=0;
                this.entDialogCountInfo.lastMonth=0;
                this.entDialogCountInfo.thisMonth=0;
            }
        }
    }
</script>

<style>
    .breadcrumb {
        line-height: 59px;
        height: 59px;
        font-size: 18px;
        color: #172033;
    }
    .el-divider--vertical {
        display: inline-block;
        width: 3px;
        height: 8em;
        margin: 24px 8px;
        vertical-align: middle;
        position: relative;
    }
    .dabiao{
        width: 70px;height: 20px;background: #5daf34;text-align: center;;
    }
    .jbdabiao{
        width: 70px;height: 20px;background: #f3d9b3;text-align: center;
    }
    .budabiao{
        width: 70px;height: 20px;background: #f56c6c;text-align: center;;
    }

    .mytable-default {
        width: 100%;
        border: 1px solid #c0c4cc;
        color: #222;
    }
    .mytable-default td, .mytable-default th {
        line-height: 22px;
        font-size: 16px;
        border: 1px solid #c0c4cc;
    }
    .mytable-default td:first-child, .mytable-default th:first-child {
        padding-left: 30px;
    }
    .mytable-default tr:nth-child(even) td {
        background-color: #FCFDFF;
    }
    .mytable-default tr:hover td {
        background-color: rgba(15, 162, 245, 0.1);
    }
    .mytable-default th {
        padding: 10px 12px 11px;
        background-color: #F0F2F5;
    }
    .mytable-default td {
        padding: 11px 12px;
        transition: .3s background;
        border-bottom: 1px solid #c0c4cc;
        white-space: nowrap;
    }
    .total-num span {
        font-size: 30px;
        margin-right: 10px;
    }
</style>
