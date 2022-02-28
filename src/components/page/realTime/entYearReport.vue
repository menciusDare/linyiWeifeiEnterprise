<template>
  <!-- 主体 -->
  <div class="main">
        <div class="main-top">
            <div class="breadcrumb">
                <a href="#"><i class="icon icon-shenbaodengji menu-icon"></i>申报登记</a><span class="sep">&gt;</span><span
                    class="text-primary">产废年报</span>
            </div>
        </div>
    <div class="panel">
      <div class="panel-bd">
        <div style="">
          <ul class="filter-box">
            <li class="filter-item">
              <div class="filter-label">提交年份：</div>
              <div class="filter-con">
                <el-date-picker
                  style="width: 150px;"
                  :clearable="false"
                  @change="submitYearChange"
                  v-model="search.reportYear"
                  :picker-options="pickerOptions"
                  type="year"
                  value-format="yyyy"
                  placeholder="选择年"
                ></el-date-picker>
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
            <col style="width: 60px;" />
            <col />
            <col style="width: 8%;" />
            <col style="width: 8%;" />
            <col style="width: 8%;" />
            <col style="width: 8%;" />
            <col style="width: 10%;" />
            <col style="width: 8%;" />
            <col style="width: 8%;" />
            <col style="width: 8%;" />
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
              <th style="text-align:center;width: 10%">状态</th>
              <th style="text-align:center;width: 10%">提交时间</th>
              <th style="text-align:center;width: 10%">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in dataList" :key="index">
              <td style="text-align:center;width: 6%">{{(cur_page-1)*pageSize+index+1}}</td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                :title="item.entName"
              >{{item.entName}}</td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                :title="item.entKind"
              >{{item.entKind}}</td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%"
                :title="item.regionName"
              >{{item.regionName}}</td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%"
                :title="item.categoryName"
              >{{item.categoryName}}</td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                :title="item.contacts"
              >{{item.contacts}}</td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%"
                :title="item.contactsPhone"
              >{{item.contactsPhone}}</td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              >
                <div v-if="item.auditStatus == -1" class="text-state state-anomaly">审核拒绝</div>
                <div v-if="item.auditStatus == 0" class="text-state untreated">已提交未审核</div>
                <div v-if="item.auditStatus == 1" class="text-state">审核通过</div>
                <div v-if="item.auditStatus == null" class="text-state state-off">未提交</div>
              </td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                :title="item.submitime"
              >
                <div v-if="item.submitime">{{item.submitime}}</div>
                <div v-else>--</div>
              </td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              >
                <div class="btn-opreate">
                  <a
                    @click="lookEntMonthPeport(item.entId,item.entName,item.auditStatus)"
                    href="javascript:;"
                    class="text-primary text-underline"
                  >查看</a>
                </div>
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
              :total="total"
            ></el-pagination>
          </span>

          <span class="el-pagination__total">共 {{totalPage}} 页</span>
        </div>
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
      @close="entReportDialogClose"
    >
      <div>
        <el-tabs :tab-position="tabPosition" v-model="productionName" @tab-click="monthClick">
          <el-tab-pane
            v-for="item in yearList"
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
          <table class="mytable-default">
            <thead>
              <tr>
                <th style="text-align:center;width: 7%">序号</th>
                <th style="text-align:center;width: 15%">废物代码</th>
                <th style="text-align:center;width: 20%">危险废物名称</th>
                <th style="text-align:center;width: 15%">生产量(吨)</th>
                <th style="text-align:center;width: 15%">处置利用方式</th>
                <th style="text-align:center;width: 18%">处置利用数量(吨)</th>
<!--                <th style="text-align:center;width: 10%">操作</th>-->
              </tr>
            </thead>
            <tbody>
            
              <tr v-for="(item,index) in entMonthOrYearReportInfo.reportEntProductionVoList">             
                <td style="text-align:center;width: 10%">{{(cur_page-1)*pageSize+index+1}}</td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%;padding:0 0 0 0"
                  :title="formatDictDetailCode(item.dictDetailCode)"
                >
                  <!--<a href="javascript:;" class="text-second text-underline">-->      
                  <!--</a>-->
                    {{item.dictDetailCode}}
<!--                  <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="true" v-model=" item.dictDetailCode"/>  -->
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 20%"
                  :title="item.harmfulName"
                >
                  {{item.harmfulName}}
<!--                  <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="true" v-model=" item.harmfulName"/>  -->
             
                
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                  :title="item.productionNumber"
                >
                    {{item.productionNumber}}
<!--                  <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="true" v-model=" item.productionNumber"/>-->
             
                
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
                {{item.handleNumber}}
<!--                 <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="true" v-model=" item.handleNumber"/>-->
              
                
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
                  <!--<a href="javascript:;" class="text-second text-underline">-->      
                  <!--</a>-->
                  <!-- <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="wfscShow" v-model=" newItemTop.dictDetailCode"/>   -->
                    
                            <el-select v-model="newItemTop.dictDetailCode" placeholder="请选择" @change="selectNode">
                                <el-option
                                v-for="item in wasteList"
                                :key="item.dictDetailCode"
                                :label="item.dictDetailCode"
                                :value="item.dictDetailCode">
                                </el-option>
                            </el-select>
                        
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 20%"
                 
                >
                  <!-- <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="wfscShow" v-model=" newItemTop.harmfulName"/>  
              -->
                <el-select v-model="newItemTop.harmfulName" :disabled="selectNodeTwoShow" placeholder="请选择" @change="selectNodeTwo" >
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
         
                >
                  <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="wfscShow" v-model=" newItemTop.productionNumber"/>  
             
                
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                 
                >
                 <!-- <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="wfscShow" v-model=" newItemTop.handleType"/>  
               -->
                    <el-select v-model="newItemTop.handleType" placeholder="请选择">
                                <el-option
                                v-for="item in operationModeList"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                                </el-option>
                            </el-select>
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                
                >
                
                 <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="wfscShow" v-model=" newItemTop.handleNumber"/>  
              
                
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
                <!-- {{(entDialogCountInfo.productionNumber?entDialogCountInfo.productionNumber:0).toFixed(2)}} -->
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
          <table class="mytable-default">
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
<!--                 <th style="text-align:center;width: 10%">操作</th>-->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in entMonthOrYearReportInfo.reportEntEntrusts">
                <td style="text-align:center;width: 10%">{{(cur_page-1)*pageSize+index+1}}</td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                  :title="formatDictDetailCode(item.dictDetailCode)"
                >
                  <!--<a href="javascript:;" class="text-second text-underline">-->                 
    <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="true" v-model=" item.dictDetailCode"/>
                  <!-- {{formatDictDetailCode(item.dictDetailCode)}} -->
                  <!--</a>-->
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                  :title="item.harmfulName"
                >
                   <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="true" v-model=" item.harmfulName" />
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                  :title="item.client"
                >             
                  <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="wfscShow" v-model=" item.client"/>  
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                  :title="item.location"
                >
                       <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="wfscShow" v-model=" item.location"/>  
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                  :title="item.license"
                >
                 <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="wfscShow" v-model=" item.license"/>  
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                  :title="item.handleType"
                >
                  <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="true" v-model=" item.handleType"/>               
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                  :title="item.entrustNumber"
                >
                    <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="wfscShow" v-model=" item.entrustNumber"/>             
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
                  <!--<a href="javascript:;" class="text-second text-underline">-->                 
    <!-- <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="wfscShow" v-model=" newItemMiddle.dictDetailCode"/>   -->
                  <!-- {{formatDictDetailCode(item.dictDetailCode)}} -->
                  <!--</a>-->
                    {{newItemMiddle.dictDetailCode}}
<!--                       <el-select :disabled="true" v-model="newItemMiddle.dictDetailCode" placeholder="请选择" @change="selectNodeMiddle">-->
<!--                                <el-option-->
<!--                                v-for="item in wasteList"-->
<!--                                :key="item.dictDetailCode"-->
<!--                                :label="item.dictDetailCode"-->
<!--                                :value="item.dictDetailCode">-->
<!--                                </el-option>-->
<!--                            </el-select>-->
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                  :title="newItemMiddle.harmfulName"
                >
                    {{newItemMiddle.harmfulName}}
<!--                        <el-select v-model="newItemMiddle.harmfulName" :disabled="selectNodeTwoShowMiddle" placeholder="请选择" @change="selectNodeTwoMiddle" >-->
<!--                                <el-option-->
<!--                                v-for="item in wasteList"-->
<!--                                :key="item.dictDetailName"-->
<!--                                :label="item.dictDetailName"-->
<!--                                :value="item.dictDetailName">-->
<!--                                </el-option>-->
<!--                            </el-select>-->
                   <!-- <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="wfscShow" v-model=" newItemMiddle.harmfulName"/>   -->
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                  :title="newItemMiddle.client"
                >
                    {{newItemMiddle.client}}
<!--                  <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="true" v-model=" newItemMiddle.client"/>-->
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                  :title="newItemMiddle.location"
                >
                    {{newItemMiddle.location}}
<!--                       <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="true" v-model=" newItemMiddle.location"/>-->
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                  :title="newItemMiddle.license"
                >
                    {{newItemMiddle.license}}
<!--                 <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="true" v-model=" newItemMiddle.license"/>-->
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                  :title="newItemMiddle.handleType"
                >
                    {{newItemMiddle.handleType}}
<!--                     <el-select :disabled="true" v-model="newItemMiddle.handleType" placeholder="请选择">-->
<!--                                <el-option-->
<!--                                v-for="item in operationModeList"-->
<!--                                :key="item.value"-->
<!--                                :label="item.name"-->
<!--                                :value="item.value">-->
<!--                                </el-option>-->
<!--                            </el-select>-->
                  <!-- <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="wfscShow" v-model=" newItemMiddle.handleType"/>                -->
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                  :title="newItemMiddle.entrustNumber"
                >
                    {{newItemMiddle.entrustNumber}}
<!--                    <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="true" v-model=" newItemMiddle.entrustNumber"/>-->
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
          <table class="mytable-default">
            <thead>
              <tr>
                <th style="text-align:center;width: 10%">序号</th>
                <th style="text-align:center;width: 20%">废物代码</th>
                <th style="text-align:center;width: 20%">危险废物名称</th>
                <th style="text-align:center;width: 20%">上年遗留贮存量(吨)</th>
                <th style="text-align:center;width: 20%">上年底贮存量(吨)</th>
                <th style="text-align:center;width: 20%">本年底贮存量(吨)</th>
<!--                 <th style="text-align:center;width: 10%">操作</th>-->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in entMonthOrYearReportInfo.reportEntStorageVos">
                <td style="text-align:center;width: 10%">{{(cur_page-1)*pageSize+index+1}}</td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 20%"
                  :title="item.dictDetailCode"
                >
                  <!--<a href="javascript:;" class="text-second text-underline">-->
                      
<!--               <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="true" v-model=" item.dictDetailCode"/>             -->
       {{item.dictDetailCode}}
                
                  <!--</a>-->
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 20%"
                  :title="item.harmfulName"
                >{{item.harmfulName}}</td>
                <td
                        align="center"
                >{{(entDialogCountInfo.legacyMonth?entDialogCountInfo.legacyMonth:0).toFixed(2)}}</td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 20%"
                  :title="item.lastMonth"
                >
<!--                     <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="wfscShow" v-model=" item.lastMonth"/>             -->
       {{item.lastMonth}}
                
               </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 20%"
                  :title="item.thisMonth"
                >
<!--                  <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="true" v-model=" item.thisMonth"/>-->
       {{item.thisMonth}}
                </td>
<!--                         <td-->
<!--                  align="center"-->
<!--                  style="color:red;font-size:14px;cursor:pointer"-->
<!--                  @click="deleteOneRowBottom(index)"-->
<!--                >删除</td>-->
              </tr>

                    <tr v-if="controlAddNewItemBottom">
                <td style="text-align:center;width: 10%">{{controlAddNewItemIndexBottom}}</td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 20%"
                  :title="newItemBottom.dictDetailCode"
                >
                  <!--<a href="javascript:;" class="text-second text-underline">-->
                
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
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 20%"
                  :title="newItemBottom.harmfulName"
                >
                
                    <el-select v-model="newItemBottom.harmfulName" :disabled="selectNodeTwoShowBottom" placeholder="请选择" @change="selectNodeTwoBottom" >
                                <el-option
                                v-for="item in wasteList"
                                :key="item.dictDetailName"
                                :label="item.dictDetailName"
                                :value="item.dictDetailName">
                                </el-option>
                            </el-select>
                </td>
                <td
                        align="center"
                >{{(entDialogCountInfo.legacyMonth?entDialogCountInfo.legacyMonth:0).toFixed(2)}}</td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 20%"
                  :title="newItemBottom.lastMonth"
                >
                 <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="wfscShow" v-model=" newItemBottom.lastMonth"/>             
   
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 20%"
                  :title="newItemBottom.thisMonth"
                >   
                <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="true" v-model=" newItemBottom.thisMonth"/>
       </td>
<!--             <td-->
<!--                  align="center"-->
<!--                  style="color:red;font-size:14px;cursor:pointer"-->
<!--                  @click="deleteOneRowNewItemBottom()"-->
<!--                >删除</td>-->
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
<!--        <el-button v-if="listItemStatus"-->
<!--                size="mini"-->
<!--                type="primary"-->
<!--                @click="saveOrUpdateData()"-->
<!--              >保存</el-button>-->
              <el-button
                size="mini"
                type="danger"
                 
                  @click="cancleSee()"
              >取消</el-button>
               </div>
               </div>
    </el-dialog>
    <!-------------------审核弹窗------------------->
    <el-dialog
      title="审核"
      :visible.sync="auditDialogVisible"
      width="50%"
      :modal-append-to-body="false"
      :before-close="handleClose"
    >
      <div>
        <el-tabs :tab-position="tabPosition" v-model="productionName" @tab-click="yearClick">
          <el-tab-pane
            v-for="item in yearList"
            :key="item.name"
            :label="item.name"
            :name="item.value"
          ></el-tab-pane>
        </el-tabs>
      </div>
      <p>
        审核信息
        <span style="width:10px" class="wx border">&nbsp;&nbsp;&nbsp; &nbsp;</span>
      </p>

      <br />
      <el-form
        ref="form"
        :rules="rules"
        :model="yearReportAudit"
        label-width="150px"
        class="auditDetails"
        style="padding:10px;box-sizing:border-box"
      >
        <el-timeline>
          <div class="feedback_dialog">
            <el-timeline-item
              :timestamp="'审核时间：' + item.auditDate"
              placement="top"
              v-for="(item, index) in yearAuditList"
              :key="index"
            >
              <el-card>
                <el-row>
                  <el-col :span="4">
                    <h4>审核人：</h4>
                  </el-col>
                  <el-col :span="18">{{item.auditName}}</el-col>
                </el-row>
                <br />
                <el-row>
                  <el-col :span="4">
                    <h4>审核状态：</h4>
                  </el-col>
                  <el-col :span="18">{{item.status ==1?"通过":"拒绝"}}</el-col>
                </el-row>
                <br />

                <el-row>
                  <el-col :span="4">
                    <h4>审核内容：</h4>
                  </el-col>
                  <el-col :span="18" style="letter-spacing:1px;line-height: 22px">{{item.opinion}}</el-col>
                </el-row>
              </el-card>
            </el-timeline-item>
          </div>
        </el-timeline>
        <div v-if="auditStatus != 1">
          <el-form-item prop="status" label="审核状态：">
            <el-select v-model="yearReportAudit.status" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="opinion" label="请填写审核意见：">
            <el-input
              type="textarea"
              :rows="6"
              maxlength="200"
              show-word-limit
              v-model="yearReportAudit.opinion"
              style="width: 500px"
            ></el-input>
          </el-form-item>
          <el-form-item prop="loginUser" label="审核人：">
            <span>{{loginUser}}</span>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="addYearReportAudit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "entYearReport",
  data() {
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
          return time.getTime() > Date.now();
        },
      },
      loginUser: window.sessionStorage.getItem("username"),
      auditDialogVisible: false,
      auditStatus: 0,
      rules: {
        status: [
          {
            required: true,
            message: "请选择审核状态",
            trigger: "blur",
          },
        ],
        opinion: [
          {
            required: true,
            message: "请填写审核意见",
            trigger: "blur",
          },
        ],
      },
      options: [
        {
          label: "通过",
          value: 1,
        },
        {
          label: "拒绝",
          value: -1,
        },
      ],
      yearAuditList: [],
      yearReportAudit: {
        status: "",
        declareId: "",
        opinion: "",
        auditBy: window.sessionStorage.getItem("userId"),
        yearReportId: "",
      },
      isDisabled: false,
      productionName: new Date().format("yyyy"),
      tabPosition: "top",
      entName: "",
      dialogVisible: false,
      total: 0,
      totalPage: 0,
      cur_page: 1,
      pageSizes: this.AppConfig.appInfo.pageSizes,
      pageSize: this.AppConfig.appInfo.pageSize,
      regionCode: [],
      regionLevel: this.AppConfig.appInfo.regionLevel,
      parentCode: this.AppConfig.appInfo.parentCode,
      regionName: this.AppConfig.appInfo.regionName,
      dialogSearch: {
        reportYear: new Date().format("yyyy"),
      },
      search: {
        reportYear: new Date().format("yyyy"),
        regionCode: sessionStorage.getItem("regionCode"),
        entType: "",
        entKind: "1",
        standardSituation: "",
        entName: "",
        regionName: this.AppConfig.appInfo.regionName,
        regionLevel: sessionStorage.getItem("regionLevel"),
        regionParentCode: "",
        reportStatus: "",
        year: new Date().format("yyyy"),
        month: new Date().format("MM"),
        sourceType: 1,
      },
      dataList: [],
     
      count: {
        all: 0,
        one: 0,
        two: 1,
        three: 0,
      },
      managementPlanFilingEntInfo: "",
      entMonthOrYearReportInfo: "",
      entDialogCountInfo: {
        productionNumber: 0,
        handleNumber: 0,
        entrustNumber: 0,
        lastMonth: 0,
        thisMonth: 0,
      },
      entId: "",
      listItemStatus: "",
      yearList: [{}],
      monthList: [
        {
          name: "1月",
          value: "01",
        },
        {
          name: "2月",
          value: "02",
        },
        {
          name: "3月",
          value: "03",
        },
        {
          name: "4月",
          value: "04",
        },
        {
          name: "5月",
          value: "05",
        },
        {
          name: "6月",
          value: "06",
        },
        {
          name: "7月",
          value: "07",
        },
        {
          name: "8月",
          value: "08",
        },
        {
          name: "9月",
          value: "09",
        },
        {
          name: "10月",
          value: "10",
        },
        {
          name: "11月",
          value: "11",
        },
        {
          name: "12月",
          value: "12",
        },
      ],
    };
  },
  created: function () {
    if (this.search.regionLevel == 3) {
      this.isDisabled = true;
    }
    this.searchEntManagementPlanReport();
    // 初始化弹窗年
    this.initDialogYearList();
    this.getOperationModeList();
    //  this.selectCodesMiddle()
    //  this.selectCodesBottom()
  },
 
  methods: {
  
    			      getOperationModeList() {
                 this.$axios
        .get("/api/regulatory/type/getTypeOptionsList/15", 
        ).then((res) => {
                    this.operationModeList = res.data
                }).catch((err) => {
                    this.message = "连接服务器失败！"
                })
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
    selectNodeMiddle(val){
this.wasteList.forEach(item=>{
if(item.dictDetailCode==val){
this.wasteList=[];
this.wasteList.push(item)
}
})
this.selectNodeTwoShowMiddle=false
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
            deleteOneRow(index) {
      let _this = this;
     console.log('cc',_this.entMonthOrYearReportInfo) 
    
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
       params.sourceType=_this.search.sourceType;
      console.log("here ii",params)
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
     console.log('cc',_this.entMonthOrYearReportInfo) 
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
    addYearReportAudit() {
      var _this = this;
      this.$refs["form"].validate((valid) => {
        if (valid) {
          _this.$axios
            .post(
              "/api/regulatory/index/addYearReportAudit",
              _this.yearReportAudit
            )
            .then(function (res) {
              if (res.code == 0 && res.data) {
                _this.$message({
                  message: "审核成功！",
                  type: "success",
                });
                _this.searchEntManagementPlanReport();
              } else {
                _this.$message.error("审核失败！");
              }
              _this.handleClose();
            })
            .catch((error) => {
              // catch 指请求出错的处理
              // console.log(error);
            });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    adudit(item) {
      this.auditDialogVisible = true;
      this.yearReportAudit.yearReportId = item.declareId;
      this.entId = item.entId;
      this.getYearReportAuditByEntAndYear(item);
    },
    getYearReportAuditByEntAndYear(item) {
      var _this = this;
      _this.auditStatus = 0;
      var params = new URLSearchParams();
      params.append("year", _this.search.year);
      params.append("entId", item.entId);
      _this.$axios
        .get("/api/regulatory/index/getYearReportAuditByEntAndYear", {
          params,
        })
        .then(function (res) {
          if (res.code == 0) {
            _this.yearAuditList = res.data;
            if (_this.yearAuditList != null && _this.yearAuditList.length > 0) {
              _this.auditStatus = _this.yearAuditList[0].auditStatus;
            }
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          // console.log(error);
        });
    },
    handleClose() {
      this.auditDialogVisible = false;
      this.$refs["form"].resetFields();
    },
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.pageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.cur_page = 1;
      this.pageList();
    },
    handleCurrentChange(val) {
      this.cur_page = val;
      this.pageList();
    },
    getIndex(index) {
      let curPage = this.cur_page;
      let limitPage = this.pageSize;
      return index + 1 + (curPage - 1) * limitPage;
    },
    searchEntManagementPlanReport() {
      var _this = this;
      var region = sessionStorage.getItem('regionCode')==null?_this.AppConfig.appInfo.regionCode:sessionStorage.getItem('regionCode');
      if(null!=_this.regionCode&&_this.regionCode.length>0){
        region =_this.regionCode[_this.regionCode.length-1]
      }
      _this.search.regionCode = region;
      _this.cur_page = 1;
      _this.pageList();
    },
    pageList() {
      var _this = this;
      // var params = new URLSearchParams();
       var params = {}
            params.page= _this.cur_page;
      params.limit= _this.pageSize;
      params.regionCode= _this.regionCode;
      params.entType= _this.search.entType;
      params.entKind= _this.search.entKind;
      params.entId=sessionStorage.getItem('entId');
      params.year= _this.search.year;
      params.month= _this.search.month;
      params.entName= _this.search.entName;
      params.sourceType= _this.search.sourceType;
      // params.append("page", _this.cur_page);
      // params.append("limit", _this.pageSize);
      // params.append("regionCode", _this.regionCode);
      // params.append("entType", _this.search.entType);
      // params.append("entKind", _this.search.entKind);
      // params.append("entId", sessionStorage.getItem('entId'));
      // params.append("year", _this.search.year);
      // params.append("month", _this.search.month);
      // params.append("entName", _this.search.entName);
      // params.append("sourceType", _this.search.sourceType);
      _this.$axios
        .get("/api/regulatory/index/selectEntMonthYearReportList", { params })
        .then(function (res) {
          if (res.code == 0) {
            _this.dataList = res.data.records;
            _this.totalPage = res.data.pages;
            _this.total = res.data.total;
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          // console.log(error);
        });
    },
    searchRegionChange() {
      let regionInfo = this.$refs.regionElCascader.getCheckedNodes();
      if (regionInfo.length > 0) {
        this.search.regionName = regionInfo[0].label;
        this.search.regionLevel = regionInfo[0].level + 1;
        this.search.regionCode = regionInfo[0].value;
        let parentRegionInfo = regionInfo[0].parent;
        if (parentRegionInfo != null) {
          this.search.regionParentCode = parentRegionInfo.value;
        } else {
          this.search.regionName = this.regionName;
          this.search.regionLevel = this.regionLevel;
          this.search.regionCode = this.regionCode;
          this.search.regionParentCode = this.parentCode;
        }
      } else {
        this.search.regionName = this.regionName;
        this.search.regionLevel = this.regionLevel;
        this.search.regionCode = this.regionCode;
        this.search.regionParentCode = this.parentCode;
      }
      /*console.log(this.search.regionCode+"<<<当前省/市/区");*/
    },
    selectManagementPlanFilingEntInfo(entId) {
      var _this = this;
      _this.$axios
        .get("/api/regulatory/index/selectManagementPlanFilingEntInfo/" + entId)
        .then(function (res) {
          if (res.code == 0) {
            _this.managementPlanFilingEntInfo = res.data;
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          // console.log(error);
        });
    },
               selectEntMonthYearReportInfo() {
      var _this = this;
     
      var params = new URLSearchParams();
      params.append("entId", _this.entId);
      params.append("year", _this.search.year);
      params.append("month", _this.search.month);
       params.append("sourceType", _this.search.sourceType);
    //   params.append('sourceType', 1);
      _this.$axios
        .get("/api/regulatory/index/selectEntMonthYearReportInfo1/", { params })
        .then(function (res) {
      
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
        
          // console.log(error);
        });
         _this.selectCodes()
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
             
  _this.wasteList=res.data
          }
        })
        .catch((error) => {        
           console.log(error);
        });
    },
            selectCodesMiddle() {
      var _this = this;
      var params = {};
     
     params.entId= _this.entId;
      params.type=2;
       
      _this.$axios
        .get("/api/regulatory/tEnterpriseInfo/selectWasteInfoOptions",  {params} )
        .then(function (res) {
        
          if (res.code == 0) {
             
  _this.wasteList=res.data
          }
        })
        .catch((error) => {        
           console.log(error);
        });
    },
          selectCodesBottom() {
      var _this = this;
      var params = {};
     
     params.entId= _this.entId;
      params.type=3;
       
      _this.$axios
        .get("/api/regulatory/tEnterpriseInfo/selectWasteInfoOptions",  {params} )
        .then(function (res) {
        
          if (res.code == 0) {
             
  _this.wasteList=res.data
          }
        })
        .catch((error) => {        
           console.log(error);
        });
    },
    lookEntMonthPeport(entId, entName, auditStatus) {
      this.entName = entName;
      this.entId = entId;
      this.listItemStatus = auditStatus;
      this.selectEntMonthYearReportInfo();
      this.dialogVisible = true;
    },
    monthClick(tab, event) {
      this.resetEntDialogCountInfo();
      // console.log(this.productionName);
      this.search.year = this.productionName;
      /*this.search.month = (parseInt(tab.index)+1);*/
      this.selectEntMonthYearReportInfo();
    },
    yearClick(tab, event) {
      this.search.year = this.productionName;
      var item = {
        entId:this.entId
      }
      this.getYearReportAuditByEntAndYear(item);
    },
    entReportDialogClose() {
      this.resetEntDialogCountInfo();
      this.dialogVisible = false;
      this.submitYearChange();
      this.resetEntDialogCountInfo();
    },
    submitYearChange() {
      var year = this.search.reportYear;
      this.dialogSearch.reportYear = year;
      this.search.year = year;
      this.productionName = year;
    },
    dialogSearchReportYearChange() {
      this.resetEntDialogCountInfo();
      this.search.year = this.dialogSearch.reportYear;
      this.selectEntMonthYearReportInfo();
    },
    resetEntDialogCountInfo() {
      this.entDialogCountInfo.productionNumber = 0;
      this.entDialogCountInfo.handleNumber = 0;
      this.entDialogCountInfo.entrustNumber = 0;
      this.entDialogCountInfo.lastMonth = 0;
      this.entDialogCountInfo.thisMonth = 0;
    },
    initDialogYearList() {
      var yearArr = this.getYearList(3);
      this.yearList = yearArr;
    },

    getYearList(num) {
      let thisYear = new Date().format("yyyy");
      if (num == null) {
        return;
      }
      var yearArr = [];
      let thisObj = {};
      thisObj.name = thisYear + "年";
      thisObj.value = thisYear;
      yearArr.push(thisObj);
      for (let i = 1; i < num; i++) {
        let obj = {};
        obj.name = parseInt(thisYear) - i + "年";
        obj.value = parseInt(thisYear) - i + "";
        yearArr.push(obj);
      }
      return yearArr.reverse();
    },
  },
};
</script>

<style >
.el-divider--vertical {
  display: inline-block;
  width: 3px;
  height: 8em;
  margin: 24px 8px;
  vertical-align: middle;
  position: relative;
}
.dabiao {
  width: 70px;
  height: 20px;
  background: #5daf34;
  text-align: center;
}
.jbdabiao {
  width: 70px;
  height: 20px;
  background: #f3d9b3;
  text-align: center;
}
.budabiao {
  width: 70px;
  height: 20px;
  background: #f56c6c;
  text-align: center;
}

.mytable-default {
  width: 100%;
  border: 1px solid #c0c4cc;
  color: #222;
}
.mytable-default td,
.mytable-default th {
  line-height: 22px;
  font-size: 16px;
  border: 1px solid #c0c4cc;
}
.mytable-default td:first-child,
.mytable-default th:first-child {
  padding-left: 30px;
}
.mytable-default tr:nth-child(even) td {
  background-color: #fcfdff;
}
.mytable-default tr:hover td {
  background-color: rgba(15, 162, 245, 0.1);
}
.mytable-default th {
  padding: 10px 12px 11px;
  background-color: #f0f2f5;
}
.mytable-default td {
  /* padding: 11px 12px; */
  transition: 0.3s background;
  border-bottom: 1px solid #c0c4cc;
  white-space: nowrap;
}
.total-num span {
  font-size: 30px;
  margin-right: 10px;
}
.feedback_dialog {
  overflow-y: auto;
  max-height: 400px;
}
/* input:disabled {
    cursor: default;
       background-color: -internal-light-dark(rgba(239, 239, 239, 0.3),rgba(239, 239, 239, 0.3));
    background-color: -internal-light-dark(rgba(239, 239, 239, 0.3), rgba(59, 59, 59, 0.3)); 
     color: -internal-light-dark(rgb(84, 84, 84), rgb(170, 170, 170));
   border-color: rgba(118, 118, 118, 0.3);
} */

</style>
