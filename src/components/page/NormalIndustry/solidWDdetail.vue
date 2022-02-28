<template>
    <!-- 主体 -->
    <div class="main">
        <div class="main-top">
            <div class="breadcrumb">
                <a href="#"><i class="icon icon-zhihuijianguan menu-icon"></i>一般工业固废</a><span class="sep">&gt;</span><span
                    class="text-primary">{{entNameA}}</span>
            </div>
        </div>
        <div class="panel">

            <!-- <div class="panel-bd"> -->
                  <div style="  width: 8%;text-align: center;cursor:pointer;padding-top:10px;padding-left:1px"><span @click="routerBack" >{{backWords}}</span></div>
                <!-- 收起后样式名.filter-more-mini -->
                <div style="margin-top:15px">
                 <el-form ref="form"  :rules="ruleListA" :label-position="'right'" label-width="auto">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>申报类型</span>
                </div>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="申报类型:" :rules="ruleListA.applyType">
                               <el-select v-model="labelForm.quarter"  @change="yearOrquarter(labelForm.quarter)" :disabled="controlSeeNot==2?true:false" clearable>
                    <el-option
                      v-for="(item, index) in quarterArrayList"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item v-if="yearShow" label="年份:" :rules="ruleListA.applyYear">
                                <el-date-picker
                                :disabled="controlSeeNot==2?true:false"
                    v-model="labelForm.years"
                    type="year"
                    value-format="yyyy"
                    placeholder="请选择"
                  >
                  </el-date-picker>
                       
                        </el-form-item>
                              <el-form-item v-if="quarterShow" label="年份:" :rules="ruleListA.applyYear">
                                <el-date-picker
                                :disabled="controlSeeNot==2?true:false"
                    v-model="labelForm.years"
                    type="year"
                    value-format="yyyy"
                    placeholder="请选择"
                  >
                  </el-date-picker>
                           
                        </el-form-item>
                               <el-form-item v-if="quarterShow" :rules="ruleListA.applyDate" >
                          <el-select v-model="labelForm.month"  :disabled="controlSeeNot==2?true:false"  clearable>
                    <el-option
                    
                      v-for="(item, index) in quarterArrayTwo"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                       placeholder="选择日期"
                    ></el-option>
                  </el-select>
                           
                        </el-form-item>
                    </el-col>
                </el-row>
          
            </el-card>
            <el-card class="box-card" style="margin-top:15px">
                <div slot="header" class="clearfix">
                    <span>单位基本情况</span>
                </div>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="申报单位名称:" prop="baseInfoA.name">
                         <el-input v-model="baseInfoA.name" disabled ></el-input>                  
                         
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="申报单位法人:" prop="baseInfoA.legal">
                            <el-input v-model="baseInfoA.legal" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="工商注册地址:" prop="baseInfoA.registeredAddress">
                            <el-input v-model="baseInfoA.registeredAddress"  disabled ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="行政区域:" prop="baseInfoA.regionCode">
                            <el-input v-model="baseInfoA.regionCode"  disabled ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
     
            </el-card>
     
            <el-card class="box-card" style="margin-top:15px">
                <div slot="header" class="clearfix">
                    <span>一般工业固废产生,利用,处置情况</span>
                </div>
               <el-table
                    :data="tableDataBottom"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="name"
                        label="序号"
                        width="80"
                         align="center">
                        <template slot-scope="scope">
                             <div
                           
                            v-if="scope.row.judge==0"
                           >合计</div>
                                <div
                            v-else
                           >{{scope.$index+1}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="一般工业固废名称"
                         align="center"
                         prop="name"
                        >
                           <template slot-scope="scope">
                             <div
                           
                            v-if="scope.row.judge==0"
                           >/</div>
                                <div
                            v-else
                           >{{scope.row.name}}</div>
                        </template>
                    </el-table-column>
                        <el-table-column
                        label="一般工业固废类别"
                        align="center"
                        prop="type"
                        >
                        <template slot-scope="scope">
                             <div
                           
                            v-if="scope.row.judge==0"
                           >/</div>
                                <div
                            v-else
                           >{{scope.row.type}}</div>
                        </template>
                    </el-table-column>
                        <el-table-column
                        label="本期产生量(吨)"
                         align="center"
                         prop="currentProduction"
                        >
  
                    </el-table-column>
                    <el-table-column
                        label="本期移出量(吨)"
                         align="center"
                           prop="outAmount"
                        >
                        
                    </el-table-column>
                     <el-table-column
                        label="上期贮存量(吨)"
                         align="center"
                          prop="beforeAmount"
                        >
                   
                    </el-table-column>
                      <el-table-column
                        label="累计贮存量(吨)"
                         align="center"
                          prop="cumulativeAmount"
                        >
                   
                    </el-table-column>
                     <el-table-column
                        label="自行处置量(吨)"
                         align="center"
                         prop="selfDisposalAmount"
                       >
                   
                    </el-table-column>
                    <el-table-column label="操作"
                    width="80"
                     align="center">
                       <template  slot-scope="scope">
                             <el-button
                            size="mini"
                            type="primary"
                            v-if="scope.row.judge==0"
                            :disabled="controlSeeNot==2?true:false"
                            @click="AddNew(scope.$index, scope.row)">添加</el-button>

                            <div  v-else style="display:flex;flex-direction:row" >
                              <div
                              v-show= "controlSeeNot==2?false:true"
                         style="color:blue;font-size:12px;cursor:pointer"
                            @click="rowEdit(scope.$index, scope.row)">编辑</div>
                                 <div
                                     v-show= "controlSeeNot==2?false:true"
                                  style="color:red;font-size:12px;margin-left:10px;cursor:pointer"
                               
                            @click="handleDeleteRow(scope.$index, scope.row)">删除</div> 
                                   <div
                                     v-show= "controlSeeNot==2?true:false"
                                  style="font-size:14px;margin:0 auto;"
                               
                           >  
                            <el-button
                            size="mini"
                            type="primary"
                           
                            @click="seeDetail(scope.$index, scope.row)">查看</el-button>
                            </div> 
                            </div>
                            
                       
                        </template>
                    </el-table-column>
                </el-table> 
                
                <el-row >
                    <el-col :span="24" style='text-align: center;margin-top:20px;'>
                        <el-button type="primary" v-if="this.controlSeeNot==1" @click="submitFormNew">提交</el-button>
                        <!-- <el-button type="primary" @click="resetForm">重置</el-button> -->
                    </el-col>
                </el-row>
            </el-card>
           
        </el-form>
         
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
       <p style="color:red;font-size:12px"> 填报提示：本期产生量 +上期贮存总量 = 累计贮存总量 + 委外处置利用总量 + 自行处置利用总量</p>
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
  
        <div style="padding-bottom: 12px;height: 236px;overflow: auto;">
          <table class="mytable-default">
            <thead>
              <tr>
                <th style="text-align:center;width: 19%;"><a style="color:red" >*</a>一般工业固废名称</th>
                <th style="text-align:center;"><a style="color:red" >*</a>一般工业固废类别</th>
                <th style="text-align:center;"><a style="color:red" >*</a>本期生产量(吨)</th>
                <th style="text-align:center;"><a style="color:red" >*</a>上期贮存量(吨)</th>
                <th style="text-align:center;"><a style="color:red" >*</a>累计贮存量(吨)</th>
                <th style="text-align:center;width: 12%"><a style="color:red" >*</a>产生工序</th>
           
              </tr>
            </thead>
            <tbody>
            
              <tr v-for="(item,index) in firstTable" :key="index">             
             
                          <td style="text-align:center;width: 10%">
    <el-select v-model="item.fA" placeholder="请选择" @change="selectNodeAA(item.fA)" >
                                <el-option
                                v-for="(item,index) in wasteAllList"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>

                          </td>
              
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%;padding:0 0 0 0"
                
                >
                    <input type="text" style="width:100%;border:none; height:44px;text-align:center" disabled v-model=" item.fB"/>  
      
               
               </td>
                      <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 20%"
                  :title="item.fC"
                >
                  <input type="number" style="width:100%;border:none; height:44px;text-align:center" @change="formateAmount" v-model=" item.fC"/>  
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 20%"
                  :title="item.fD"
                >
                  <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="true" v-model=" item.fD"/>  
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                  :title="item.fE"
                >
                  <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="true" v-model=" item.fE"/>  
             
                
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                  :title="item.fF"
                >
                 <input type="text" style="width:100%;border:none; height:44px;text-align:center" :disabled="false" v-model=" item.fF"/>  
                       
                </td>   
              </tr>     
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div style="font-size: large;color: black;padding-bottom: 12px;">
          <span style="padding-right: 3px">|</span>一般工业固废贮存情况
        </div>
        <div style="padding-bottom: 12px;height: 236px;overflow: auto;">
          <table class="mytable-default">
            <thead>
              <tr>
                <th style="text-align:center;width: 8%">序号</th>
                <th style="text-align:center;">贮存点</th>
       
                <th style="text-align:center;">累计贮存总量</th>
                <th style="text-align:center;">贮存方式</th>
                <th style="text-align:center;">上期贮存量(吨)</th>
                <th style="text-align:center;width:10%">操作</th>
              </tr>
            </thead>
            <tbody>
            
              <tr v-for="(item,index) in solidWasteStorageList" :key="index">             
                 <td style="text-align:center;width: 10%">{{index+1}}</td> 
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%;padding:0 0 0 0"
                  
                >
               <el-select v-model="item.storagePositionId" placeholder="请选择" @change="selectNode">
                                <el-option
                                v-for="(item,index) in facilityAllList"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                  :title="item.totalAmount"
                >
                
                  <input type="number" style="width:100%;border:none; height:44px;text-align:center"  @change="calTotaltAmoutn" v-model=" item.totalAmount"/>  
             
                
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                  :title="item.keepingMode"
                >
                   <el-select v-model="item.keepingMode" placeholder="请选择">
                               <el-option
                                                v-for="(item,index) in storageTypeList"
                                                :key="index"
                                                :label="item.name"
                                                :value="item.categoryId">
                                        </el-option>
                            </el-select>
                
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                  :title="item.beforeAmount"
                >            
                 <input type="number" style="width:100%;border:none; height:44px;text-align:center" @change="calTotalBeforeAmoutn" v-model=" item.beforeAmount"/>  

                </td>
                    <td
                  align="center"
                  style="color:red;font-size:14px;cursor:pointer;justify-content: space-between;"      
                >
                <a @click="secondAddOneRow(index)"> <i class="el-icon-circle-plus" ></i> </a>
                  <a @click="seconddeleteOneRow(index)"> <i  class="el-icon-remove" ></i> </a>            
                </td>        
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div style="font-size: large;color: black;padding-bottom: 12px;">
          <span style="padding-right: 3px">|</span>一般工业固废自行处置利用情况
        </div>
        <div style="padding-bottom: 12px;height: 236px;overflow: auto;">
          <table class="mytable-default">
            <thead>
              <tr>
                <th style="text-align:center;width: 8%">序号</th>
                <th style="text-align:center;width: 8%">项目</th>
                <th style="text-align:center;">利用处置量(吨)</th>
                <th style="text-align:center;">经营方式</th>
                <th style="text-align:center;">经营方式详情</th>          
                 <th style="text-align:center;width: 10%">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in solidWasteVoluntarilyHandleList" :key="index">
                <td style="text-align:center;width: 10%">{{(index+1)}}</td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                
                >
                               
    <input type="text" style="width:100%;border:none; height:44px;text-align:center" v-model=" item.name"/>  
            
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                  :title="item.handleAmount"
                >
                   <input type="number" style="width:100%;border:none; height:44px;text-align:center" @change="calTotalHandleAmount" v-model=" item.handleAmount"/>  
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                  :title="item.manageMode"
                >  
                      <el-select v-model="item.manageMode" @change="autoOperationListTwo(item.manageMode,index)" placeholder="请选择" >
                               <el-option
                                                v-for="(item,index) in operationTypeList"
                                                :key="index"
                                                :label="item.typeName"
                                                :value="item.id">
                                        </el-option>
                            </el-select>           
    
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                  :title="item.manageModeDetails"
                >
                   <el-select v-model="item.manageModeDetails" placeholder="请选择" >
                               <el-option
                                                v-for="(item,index) in manageModeDetailList"
                                                :key="index"
                                                :label="item.name"
                                                :value="item.code">
                                        </el-option>
                            </el-select> 
                      
                </td>
       
                     <td
                  align="center"
                  style="color:red;font-size:14px;cursor:pointer"
        
                >
                 <a @click="thirdAddOneRow(index)"> <i  class="el-icon-circle-plus" ></i> </a>
                  <a @click="thirddeleteOneRow(index)"> <i  class="el-icon-remove" ></i> </a>
                </td>
              </tr>

        
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div style="font-size: large;color: black;padding-bottom: 12px;">
          <span style="padding-right: 3px">|</span>一般工业固废移出详情
        </div>
        <div style="padding-bottom: 12px;height: 236px;overflow: auto;width:100%;">
          <table class="mytable-default" style="width:1800px">
            <thead>
              <tr>
                <th style="text-align:center;width: 6%">序号</th>
                <th style="text-align:center;">接收单位名称</th>
                <th style="text-align:center;width: 200px">利用量(吨)</th>
                <th style="text-align:center;width: 200px">处置量(吨)</th>
                <th style="text-align:center;width: 200px">利用,处置量(吨)</th>
                <th style="text-align:center;">经营方式</th>
                <th style="text-align:center;">经营方式详情</th>
                   <th style="text-align:center;width: 200px">联系人</th>
                     <th style="text-align:center;width: 200px">联系电话</th>
                      <th style="text-align:center;width: 250px">接收单位所在地</th>
                 <th style="text-align:center;">运输单位</th>
                  <th style="text-align:center;">运输方式</th>
                   <th style="text-align:center;width:100px">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in solidWasteRemoveList" :key="index">
                <td style="text-align:center;width: 6%">{{index+1}}</td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;"
                  :title="item.entId"
                >
                
                             <el-select
    v-model="item.entId"
     @change="changeCompany(item.entId)"
    filterable
    remote
    reserve-keyword
    placeholder="请输入关键词"
    :remote-method="remoteMethod"
    :loading="loading">
    <el-option
      v-for="item in optionsAA"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
               <!-- <input type="number" style="width:100%;border:none; height:44px;text-align:center"  v-model=" item.entId"/>              -->

                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;%"
                  :title="item.utilizeAmount"
                >
                   <input type="number" style="width:100%;border:none; height:44px;text-align:center" @change="calTotalutilizeHandleAmount(index,1,item.utilizeAmount)" v-model=" item.utilizeAmount"/>             
       
                </td>
                   <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;"
                  :title="item.handleAmount"
                >
                   <input type="number" style="width:100%;border:none; height:44px;text-align:center" @change="calTotalutilizeHandleAmount(index,2,item.handleAmount)"  v-model=" item.handleAmount"/>             
       
                </td>
                     <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;"
                  :title="item.utilizeHandleAmount"
                >
                   <input type="number" style="width:100%;border:none;  height:44px;text-align:center" disabled @change="calTotalutilizeHandleAmountTotal(item.utilizeHandleAmount)" v-model=" item.utilizeHandleAmount"/>             
       
                </td>
                     <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;"
                  :title="item.manageMode"
                >
                     <el-select v-model="item.manageMode" @change="autoOperationListThree(item.manageMode,index)" placeholder="请选择" >
                               <el-option
                                                v-for="(item,index) in operationTypeList"
                                                :key="index"
                                                :label="item.typeName"
                                                :value="item.id">
                                        </el-option>
                            </el-select>    
                </td>
                    <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;"
                  :title="item.manageModeDetails"
                >
               <el-select v-model="item.manageModeDetails" placeholder="请选择" >
                               <el-option
                                                v-for="(item,index) in opetareListThree"
                                                :key="index"
                                                :label="item.name"
                                                :value="item.code">
                                        </el-option>
                            </el-select>
                </td>
                   <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;"
                  :title="item.contacts"
                >
                   <input type="text" style="width:100%;border:none; height:44px;text-align:center" disabled v-model="item.contacts"/>             
                </td>
                   <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;"
                  :title="item.contactsPhone"
                >
                   <input type="text" style="width:100%;border:none; height:44px;text-align:center" disabled v-model=" item.contactsPhone"/>             
                </td>
                   <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;"
                  :title="item.entAddressd"
                >
                   <input type="text" style="width:100%;border:none; height:44px;text-align:center" disabled v-model=" item.entAddressd"/>             
                </td>
                   <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;"
                  :title="item.transportEntId"
                >
                                                                 <el-select
    v-model="item.transportEntId"
 
    filterable
    remote
    reserve-keyword
    placeholder="请输入关键词"
    :remote-method="remoteMethod2"
    :loading="loading2">
    <el-option
      v-for="item in optionsAA2"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
                   <!-- <input type="text" style="width:100%;border:none; height:44px;text-align:center"  v-model=" item.transportEntId"/>              -->
                </td>
                       <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;"
                  
                >
                   <el-select v-model="item.transportMode" placeholder="请选择" >
                               <el-option
                                                v-for="(item,index) in tansportMethods"
                                                :key="index"
                                                :label="item.label"
                                                :value="item.label">
                                        </el-option>
                            </el-select>
    
               
                </td>
                       <td
                  align="center"
                  style="color:red;font-size:14px;cursor:pointer"
        
                >
                 <a @click="fourthAddOneRow(index)"> <i  class="el-icon-circle-plus" ></i> </a>
                  <a @click="fourthdeleteOneRow(index)"> <i  class="el-icon-remove" ></i> </a>
                </td>
              </tr>

        
        
            </tbody>
          </table>
        </div>
      </div>
      <div style="text-align:center;width:100%;">
        <div v-show="seeDetailControl">
             <el-button
    v-show="showAddBtn"
                size="mini"
                type="primary"
                @click="saveOrUpdateDataNew()"
              >添加</el-button>
               <el-button
               v-show="showSaveBtn"
                size="mini"
                type="primary"
                @click="editMethodSave()"
              >保存</el-button>
              <el-button
                size="mini"
                type="danger"
                 
                  @click="cancleSee()"
              >置空</el-button>
               </div>
               </div>
    </el-dialog>
       
    </div>
 
    </div>
</template>

<script>
   
  
    export default {
        name: "administrativeDisposition",
        components: {
          
        },
        data(){
            return {
                    oldSubmitBtn:true,
                newSubmitBtn:false,
                originalData:{},
                showSaveBtn:true,
                showAddBtn:true,
                AllTableData:[],
                btmRowId:0,
              seeDetailControl:true,
              loading: false,
              loading2:false,
              optionsAA:[],
              optionsAA2:[],
              entNameA:'新增',
              controlSeeNot:1,
              rowInfoId: '',
              utliZedTotalforUse:'',
              handleAmoutTotalforUse:'',
             unusedParam:{
	"auditStatus": "",
	"commitTime": "",
	"declareQuarter": "",
	"declareStatus": "",
	"declareTime": "",
	"declareType": "",
	"declareYear": "",
	"entId": "",
	"enterpriseSolidWasteDeclareDetailsList": [
		{
			"beforeAmount": "",
			"cumulativeAmount": "",
			"currentProduction": "",
			"declareId": "",
			"deleteFlag": "",
			"id": "",
			"outAmount": "",
			"productionId": "",
			"productionProcess": "",
			"selfDisposalAmount": "",
			"solidWasteRemoveList": [
				{
					"contacts": "",
					"contactsPhone": "",
					"declareDetailId": "",
					"deleteFlag": "",
					"entAddressd": "",
					"entId": "",
					"handleAmount": "",
					"id": "",
					"manageMode": "",
					"manageModeDetails": "",
					
					"transportEntId": "",
					"updatedBy": "",
					"updatedTime": "",
					"utilizeAmount": "",
					"utilizeHandleAmount": ""
				}
			],
			"solidWasteStorageList": [
				{
					"beforeAmount": "",
					"declareDetailId": "",
					"deleteFlag": "",
					"id": "",
					"storagePositionId": "",
					"storagePositionName": "",
					"totalAmount": "",
					"keepingMode": "",
					"transferName": "",
					"updatedBy": "",
					"updatedTime": ""
				}
			],
			"solidWasteVoluntarilyHandleList": [
				{
					"declareDetailId": "",
					"deleteFlag": "",
					"handleAmount": "",
					"id": "",
					"manageMode": "",
					"manageModeDetails": "",
					
					"name": "",
					"updatedBy": "",
					"updatedTime": ""
				}
			],
			"type": "",
			"updatedBy": "",
			"updatedTime": ""
		}
	],
	"id": "",
	"updatedBy": "",
	"updatedTime": ""
},
              baseInfoA:{},
              			solidWasteRemoveList: [
				{	"entId": "",
					"contacts": "",
					"contactsPhone": "",
					"declareDetailId": "",
					"deleteFlag": "",
					"entAddressd": "",
					"handleAmount": "",
					"id": "",
					"manageMode": "",
					"manageModeDetails": "",
	
					"transportEntId": "",
					"updatedBy": "",
					"updatedTime": "",
					"utilizeAmount": "",
					"utilizeHandleAmount": ""
				}
			],
                manageModeDetailList:[],
                opetareListThree:[],
                	enterpriseSolidWasteDeclareDetailsList: [
		{
			"beforeAmount": 0,
			"cumulativeAmount": 0,
			"currentProduction": 0,
			"declareId": 0,
			"deleteFlag": 0,
			"id": 0,
			"name": "",
			"outAmount": 0,
			"selfDisposalAmount": 0,
			"solidWasteRemoveList": [
				{
					"contacts": "",
					"contactsPhone": "",
					"declareDetailId": 0,
					"deleteFlag": 0,
					"entAddressd": "",
					"entId": 0,
					"handleAmount": 0,
					"id": 0,
					"manageMode": "",
					"manageModeDetails": "",
				
					"transportEntId": 0,
					"updatedBy": "",
					"updatedTime": "",
					"utilizeAmount": 0,
					"utilizeHandleAmount": 0
				}
			],
			"solidWasteStorageList": [
				{
					"beforeAmount": 0,
					"declareDetailId": 0,
					"deleteFlag": 0,
					"id": "",
					"storagePositionId": 0,
					"storagePositionName": "",
					"totalAmount": 0,
					"keepingMode": 0,
					"transferName": "",
					"updatedBy": "",
					"updatedTime": ""
				}
			],
			"solidWasteVoluntarilyHandleList": [
				{
					"declareDetailId": 0,
					"deleteFlag": 0,
					"handleAmount": 0,
					"id": "",
					"manageMode": "",
					"manageModeDetails": "",
				
					"name": "",
					"updatedBy": "",
					"updatedTime": ""
				}
			],
			"type": 0,
			"updatedBy": "",
			"updatedTime": ""
		}
	],
                operationTypeList:[
                     {
          label: "排放",
          value: 1,
        },
        {
          label: "处置",
          value: 2,
        },
                   {
          label: "综合利用",
          value: 3,
        },
        {
          label: "贮存",
          value: 4,
        },
                ],
                tansportMethods:[
{
                    value: '-1',
                    label: '公路运输'
                }, {
                    value: '1',
                    label: '铁路运输'
                }, {
                    value: '2',
                    label: '水路运输'
                }, {
                    value: '3',
                    label: '航空运输'
                },
               
                {
                    value: '4',
                    label: '其他'
                },
                ],
                facilityAllList:[],
                
                						     storageTypeList: [{
                    value: '-1',
                    label: '全部'
                }, {
                    value: '1',
                    label: '仓库'
                }, {
                    value: '2',
                    label: '贮存池'
                }, {
                    value: '3',
                    label: '储罐'
                }],
                 wasteAllList:[],
                firstTable:[{
                    fA:'',
                    fB:'',
                    fC:'',
                    fD:'' ,fE:'', fF:''
                }],
                
                    secondTable:[{
                    sA:'',
                    sB:'',
                    sC:'',
                    sD:'' ,sE:'',
                }],
                  solidWasteStorageList:[
  {
  storagePositionId:'',
 totalAmount:'',
 keepingMode:'' ,           //方式
  beforeAmount:''  ,
  	declareDetailId: 0,
					deleteFlag: 0,
					id: '',
					storagePositionName: "",
					transferName: "",
					updatedBy: "",
					updatedTime: ""
  }
  	
				
  ],
              
            
                solidWasteVoluntarilyHandleList:[
                    		{"name": "",
                            "handleAmount": "",
                            "manageMode": "",
                            "manageModeDetails": "",
					"declareDetailId": 0,
					"deleteFlag": 0,
					
					"id": '',
	
					
					
					"updatedBy": "",
					"updatedTime": ""
				}

                ],
                  
            //         fourthTable:[{
            //         fA:'',
            //         fB:'',
            //         fC:'',
            //         fD:'' ,fE:'',fF:'',fG:'',fH:'',fI:'',fJ:''
            //     }],
            //         fourthTableO:{
            // fA:'',
            //         fB:'',
            //         fC:'',
            //         fD:'' ,fE:'',fF:'',fG:'',fH:'',fI:'',fJ:''
            //     },
               dialogVisible:false,
                quarterShow:true,
                yearShow:false,
                     quarterArrayList: [
        {
          label: "季度",
         value: 2,
        },
        {
          label: "年度",      
            value: 1,
        },
        
      ],
           quarterArrayTwo: [
        {
          label: "第一季度",
          value: 1,
        },
        {
          label: "第二季度",
          value: 2,
        },
        {
          label: "第三季度",
          value: 3,
        },
        {
          label: "第四季度",
          value: 4,
        },
      ],
      EnterpristList:[],
                    labelForm: {
        years: undefined,
        quarter: undefined,
        status: undefined,
        month:undefined,
        season:undefined
      },
                backWords:'< 返回',
                myHeaders: {Authorization: "Bearer "+sessionStorage.getItem("token")},
                allFileList: [],
                unitList: [
                    {name: '千克', value: 1}
                ],
                tableData: [{
                    disposalMethodCode: '',
                    typeCode: '',
                    wasteCode: '',
                    wasteName: '',
                    number:  0,
                    unit: '',
                    wasteList: []
                }],
                tableDataBottom:[{
                  name:'',
                  type:'',
    currentProduction:'',// 本期生产量
    outAmount:'',//yichu
			beforeAmount: '',//上期
			cumulativeAmount: '',
			selfDisposalAmount: '',
    judge:0


                }
                   
                ],
                formDisposition: {
                    dpInfoId: '',
                    departmentDatas:{
                        dpInfoId : '',
                        dpName: '',
                        dpAdministration: [],
                        dpContactPerson: '',
                        dpContactNumber: '',
                        dpContactAddress: '',
                        dpContactLicense: '',
                        dpCertificate: '',
                        dpRegionName: ''
                    },
                    rceivesDatas:{
                        rceivesInfoId : '',
                        receivesUnitName: '',
                        receivesUnitAdministration: [],
                        receivesUnitContactPerson: '',
                        receivesUnitContactNumber: '',
                        receivesUnitContactAddress: '',
                        receivesUnitContactLicense: '',
                        receivesUnitCertificate: '',
                        receivesUnitRegionName: ''
                    },
                    transportDatas:{
                        transportInfoId : '',
                        transportName: '',
                        transportAdministration: [],
                        transportContactPerson: '',
                        transportContactNumber: '',
                        transportContactAddress: '',
                        transportContactLicense: '',
                        transportCertificate: '',
                        transportRegionName: ''
                    },
                    actualRollOut: '',
                    transferDate: '',
                    planNo: '计划编号'
                },
                options: [],
                ruleListA:{
                   'applyType': [
                        { required: true, message: '请选择申报类型', trigger: 'change' },
                    ],
                      'applyYear': [
                        { required: true, message: '请选择申报年份', trigger: 'change' },
                    ],
                      'applyDate': [
                        { required: true, message: '请选择申报季度', trigger: 'change' },
                    ],
                },
               
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
      entName: "一般工业固废,产生,利用处置情况",
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
                operationModeList: [],
                wasteList: [],
                haseRceivesInfoId: null,
                hasTransportInfoId: null,
                hasDpInfoId: null,
                acceptList: [],
                transportList: [],
                loading: false
            }
        },
        created: function () {
            // this.getRegionChildrenList()
            // this.getOperationModeList()
            this.getWasteList()
            // 企业类型 1转出部门2接收单位4运输单位
            this.getDepartmentInfo('', 1, sessionStorage.getItem('entId'))
            this.getWasteCategory()
            this.getFacilityList()
            // this.getOperationTypeList()
            this.getBasicalInfo()
            //获取经营方式list
            this.getOperationMethodList()
          //获取贮存方式
          this.getStorageList()
           
          this.rowInfoId = this.$route.query.rowInfo
         this.controlSeeNot = this.$route.query.judge
          this.entNameA = this.$route.query.entName
          
           if(this.rowInfoId) {
             this.getWholeInfo(this.rowInfoId)
           }
          //  this.getCompanyList()
        },
        methods:{

          getStorageList(){
                let url = "/api/regulatory/type/listSolidWasteKeepingModeInfo";
                this.$axios.get(url, ).then((res) => {
               
            this.storageTypeList = res.data
           
         }).catch(function (err) {
                     //alert('连接服务器失败！');
                });
          },
          remoteMethod(query) {
           
        if (query !== '') {
          this.loading = true;
                          let params = new URLSearchParams();
                params.append('entKind', '2');
                params.append('entName', query);
  
                let url = "/api/regulatory/tEnterpriseInfo/searchEnterpriseInfos";
                this.$axios.get(url, {params}).then((res) => {
               
               setTimeout(() => {
            this.loading = false;
            this.optionsAA = res.data
        
           }
          , 200);
         }).catch(function (err) {
                     //alert('连接服务器失败！');
                });
        } else {
          this.optionsAA = [];
        }

      },
            remoteMethod2(query) {
           
        if (query !== '') {
          this.loading2 = true;
                          let params = new URLSearchParams();
                params.append('entKind', '4');
                params.append('entName', query);
  
                let url = "/api/regulatory/tEnterpriseInfo/searchEnterpriseInfos";
                this.$axios.get(url, {params}).then((res) => {
               
               setTimeout(() => {
            this.loading2 = false;
            this.optionsAA2 = res.data
        
           }
          , 200);
         }).catch(function (err) {
                     //alert('连接服务器失败！');
                });
        } else {
          this.optionsAA2 = [];
        }

      },
      changeCompany(idA){
      this.optionsAA.forEach(item=>{
        if(item.id==idA){
 this.solidWasteRemoveList[0].entAddressd=item.address;
this.solidWasteRemoveList[0].contacts= item.contacts;
this.solidWasteRemoveList[0].contactsPhone=item.contactsPhone
        }
      })


      },
                    
        displayTotalNumsEdit(){
           let last =this.tableDataBottom.length-1;
this.tableDataBottom.splice(last,1)
         let obj={currentProduction:0,outAmount:0,beforeAmount:0,cumulativeAmount:0,selfDisposalAmount:0, judge:0}
         this.tableDataBottom.forEach((item)=>{
           
           obj.currentProduction +=(+item.currentProduction)
   obj.outAmount +=(+item.outAmount)
   obj.beforeAmount +=(+item.beforeAmount)
   obj.cumulativeAmount +=(+item.cumulativeAmount)
   obj.selfDisposalAmount +=(+item.selfDisposalAmount)

         })
                    obj.currentProduction =(+obj.currentProduction).toFixed(2)
   obj.outAmount =(+obj.outAmount).toFixed(2)
   obj.beforeAmount =(+obj.beforeAmount).toFixed(2)
   obj.cumulativeAmount =(+obj.cumulativeAmount).toFixed(2)
   obj.selfDisposalAmount =(+obj.selfDisposalAmount).toFixed(2)
       

this.tableDataBottom.push(obj)

       },
           secondAddOneRow(index){
            let curObj ={
					"beforeAmount": '',
					"declareDetailId": '',
					"deleteFlag": '',
					"id": 0,
					"storagePositionId": '',
					"storagePositionName": "",
					"totalAmount": '',
					"keepingMode": '',
					"transferName": "",
					"updatedBy": "",
					"updatedTime": ""
				}
this.solidWasteStorageList.push(curObj)
           },
           seconddeleteOneRow(index){
           
this.solidWasteStorageList.forEach((item,idx)=>{
if(index ==idx && index != 0){
this.solidWasteStorageList.splice(idx,1)
}
})
           },
                    thirdAddOneRow(index){
            let curObj ={
					"declareDetailId": '',
					"deleteFlag": '',
					"handleAmount": '',
					"id": '',
					"manageMode": "",
					"manageModeDetails": "",
				
					"name": "",
					"updatedBy": "",
					"updatedTime": ""
				}
this.solidWasteVoluntarilyHandleList.push(curObj)
           },
                         fourthAddOneRow(index){
            let curObj ={	"entId": '',
					"contacts": "",
					"contactsPhone": "",
					"declareDetailId": '',
					"deleteFlag": '',
					"entAddressd": "",
					"handleAmount": '',
					"id": '',
					"manageMode": "",
					"manageModeDetails": "",
			
					"transportEntId": '',
					"updatedBy": "",
					"updatedTime": "",
					"utilizeAmount": '',
					"utilizeHandleAmount": ''
				}
this.solidWasteRemoveList.push(curObj)
           },
                    fourthdeleteOneRow(index){
           
this.solidWasteRemoveList.forEach((item,idx)=>{
if(index ==idx && index != 0){
this.solidWasteRemoveList.splice(idx,1)
}
})
           },
           handleDeleteRow(index){
          
this.tableDataBottom.forEach((item,idx)=>{
if(idx==index){
this.tableDataBottom.splice(idx,1)
this.displayTotalNumsEdit()
}
})
this.AllTableData.forEach((item,idx)=>{
if(idx==index){
this.AllTableData.splice(idx,1)
}
})

           },
           thirddeleteOneRow(index){
     
this.solidWasteVoluntarilyHandleList.forEach((item,idx)=>{
if(index ==idx && index != 0){
this.solidWasteVoluntarilyHandleList.splice(idx,1)
}
})
           },
           calTotalutilizeHandleAmountTotal(amount){
  let total =0

this.solidWasteRemoveList.forEach(item=>{

 total+=(+item.utilizeHandleAmount)

item.utilizeHandleAmount=(+item.utilizeHandleAmount).toFixed(2)
})

this.utliZedTotalforUse =total.toFixed(2)
           },
                      displayTotalutilizeHAmount(T){
                        if(T&&T.length>0){
  let total =0

T.forEach(item=>{

 total+=(+item.utilizeHandleAmount)

item.utilizeHandleAmount=(+item.utilizeHandleAmount).toFixed(2)
})
let final =total.toFixed(2)
return final
           }else{
             return 0
           }
                        },

      
           calTotalutilizeHandleAmount(index,num,pa){

 this.solidWasteRemoveList.forEach((item,idx)=>{
  if(index==idx){
item.utilizeHandleAmount=(+item.utilizeAmount)+(+item.handleAmount)
if(num==1){
 item.utilizeAmount=(+item.utilizeAmount).toFixed(2)
}else {
item.handleAmount=(+item.handleAmount).toFixed(2)
}

  
   item.utilizeHandleAmount=(+item.utilizeHandleAmount).toFixed(2)
  }

})

this.calTotalutilizeHandleAmountTotal()
           },
           calTotalHandleAmount(){
            
  let total =0
this.solidWasteVoluntarilyHandleList.forEach(item=>{

 total+=(+item.handleAmount)

item.handleAmount=(+item.handleAmount).toFixed(2)
})

this.handleAmoutTotalforUse =total.toFixed(2)
           },
                      displayTotalHandleAmount(pA){
            // solidWasteVoluntarilyHandleList
            if(pA &&pA.length>0){
  let total =0
pA.forEach(item=>{

 total+=(+item.handleAmount)

item.handleAmount=(+item.handleAmount).toFixed(2)
})
let final =total.toFixed(2)
return final
            }else{
              return 0
            }

           },

       getOperationMethodList(){
                   let params = new URLSearchParams();
                params.append('type', 11);
      let url =  '/api/regulatory/type/showDicType'
     
                this.$axios.post(url,params ).then((res) => {                 
                  this.operationTypeList = res.data
              
                }).catch(function (err) {
                       //alert('连接服务器失败！');
                });
            },


           calTotaltAmoutn(){
  let total =0
this.solidWasteStorageList.forEach(item=>{
 total+=(+item.totalAmount)
item.totalAmount=(+item.totalAmount).toFixed(2)
})

this.firstTable[0].fE =total.toFixed(2)
           },

           calTotalBeforeAmoutn(){

  let total =0
this.solidWasteStorageList.forEach(item=>{
 total+=(+item.beforeAmount)
item.beforeAmount=(+item.beforeAmount).toFixed(2)
})

this.firstTable[0].fD =total.toFixed(2)
           },
           getBasicalInfo(){
      let url =  `/api/regulatory/commonlysolidwaste/currentUserEnt`
              
                this.$axios.get(url, ).then((res) => {                 
                  this.baseInfoA = res.data
                
                }).catch(function (err) {
                       //alert('连接服务器失败！');
                });
            },
          formateAmount(){
           
this.firstTable[0].fC=(+this.firstTable[0].fC).toFixed(2)
          },
                getWholeInfo(id) {
              //        let url = '/api/regulatory/commonlysolidwaste/declarationInfo'
              // const param ={};
              // param.declareId=id
              
              //   this.$axios.get(url, param).then((res) => {   
                 let params = new URLSearchParams();
                params.append('declareId', id);
                let url = "/api/regulatory/commonlysolidwaste/declarationInfo";
                this.$axios.get(url, {params}).then((res) => {
         this.handleresult(res.data,this.wasteAllList)

                }).catch(function (err) {
                     //alert('连接服务器失败！');
                });
            },
 handleresult(res,paramTwo){
             if(res){   
                 this.originalData= res.enterpriseSolidWasteDeclareDetailsList   
                this.AllTableData =res.enterpriseSolidWasteDeclareDetailsList
               
               
this.labelForm.quarter=res.declareType

let curyear =res.declareYear.toString()
  this.labelForm.years=curyear
  if(res.declareQuarter){
this.labelForm.month=res.declareQuarter
  }
for(let i=0;i<res.enterpriseSolidWasteDeclareDetailsList.length;i++){
  let obj ={
                  name:'',
                  type:'',
    currentProduction:'',// 本期生产量
    outAmount:'',//yichu
			beforeAmount: '',//上期
			cumulativeAmount: '',
			selfDisposalAmount: '',
      juage:2,
      idxx:'',
                }
                  obj.idxx=i;
                                paramTwo.forEach(item=>{
                  if(item.id==res.enterpriseSolidWasteDeclareDetailsList[i].productionId){
obj.name=item.name
 obj.type=item.categoryId 
                  }
                })
                                       this.wastedDetailListZ.forEach(item=>{
                  if(obj.type==item.dicCode){
obj.type=item.dicName
                }
                })
                  
                  // obj.type=res.enterpriseSolidWasteDeclareDetailsList[0].type
                   obj.currentProduction=(+res.enterpriseSolidWasteDeclareDetailsList[i].currentProduction).toFixed(2)
                  // obj.outAmount=res.enterpriseSolidWasteDeclareDetailsList[0].outAmount
                  obj.outAmount=this.displayTotalutilizeHAmount( res.enterpriseSolidWasteDeclareDetailsList[i].solidWasteRemoveList)
                
                   obj.beforeAmount=(+res.enterpriseSolidWasteDeclareDetailsList[i].beforeAmount).toFixed(2)
                  obj.cumulativeAmount=(+res.enterpriseSolidWasteDeclareDetailsList[i].cumulativeAmount).toFixed(2)
                 obj.selfDisposalAmount=this.displayTotalHandleAmount(res.enterpriseSolidWasteDeclareDetailsList[i].solidWasteVoluntarilyHandleList)
               //
             
         
 this.tableDataBottom.unshift(obj)
}  
 this.displayTotalNums()
           }

            },
            handleSecondPageDisplay(rowId,row){
               
               let  idx =rowId
                      let res =  this.AllTableData
                     
                        this.utliZedTotalforUse=row.outAmount;
               this.handleAmoutTotalforUse=row.selfDisposalAmount
 //------------------------------------------展示四张表的数据------------------------------
 this.firstTable[0].fA=res.enterpriseSolidWasteDeclareDetailsList[idx].productionId
 this.firstTable[0].fB=row.type
 this.firstTable[0].fC=(+res.enterpriseSolidWasteDeclareDetailsList[idx].currentProduction).toFixed(2)
  this.firstTable[0].fD=(+res.enterpriseSolidWasteDeclareDetailsList[idx].beforeAmount).toFixed(2)
   this.firstTable[0].fE=(+res.enterpriseSolidWasteDeclareDetailsList[idx].cumulativeAmount).toFixed(2)
  this.firstTable[0].fF=res.enterpriseSolidWasteDeclareDetailsList[idx].productionProcess
  
    //第二个表的回显
    let secondTableDataU =res.enterpriseSolidWasteDeclareDetailsList[idx].solidWasteStorageList
    if(secondTableDataU.length>0){
      secondTableDataU.forEach(it=>{
        it.totalAmount=(+it.totalAmount).toFixed(2)
         it.beforeAmount=(+it.beforeAmount).toFixed(2)
      })

    }
    this.solidWasteStorageList=secondTableDataU
 
    //第3个表的回显  
    let curTableThreeU =res.enterpriseSolidWasteDeclareDetailsList[idx].solidWasteVoluntarilyHandleList
    if(curTableThreeU.length>0){
     curTableThreeU.forEach(ele=>{
       if(ele.manageMode){
   this.zCFSIDList.push(ele.manageMode)
       }
     })
    }
    if(this.zCFSIDList.length>0){
      this.zCFSIDList.forEach(item=>{
  let url =  `/api/regulatory/type/listByTypeId/${item}`
                this.$axios.get(url, ).then((res) => {
                   for( let i of res.data){
                            this.manageModeDetailList.push(i);
                                   }
                
                }).catch(function (err) {
                   //alert('连接服务器失败！');
                });
      })
        

    }
    this.solidWasteVoluntarilyHandleList=curTableThreeU
    //第4个表的回显
    let curTableFourU =res.enterpriseSolidWasteDeclareDetailsList[idx].solidWasteRemoveList
     if(curTableFourU.length>0){
    curTableFourU.forEach((ele,idx)=>{
       if(ele.manageMode){
   this.zclast.push(ele.manageMode)
 
       }
   
           if(ele.entId ){
   this.entIdListU.push(ele.entId)
       } 
               if(ele.transportEntId ){
   this.entidLLstW.push(ele.transportEntId)
       }    
                //格式化数据保留两位小数
            if(ele.utilizeAmount){
           ele.utilizeAmount=(+ele.utilizeAmount).toFixed(2)
       }
            if(ele.handleAmount){
           ele.handleAmount=(+ele.handleAmount).toFixed(2)
       }
            if(ele.utilizeHandleAmount){
           ele.utilizeHandleAmount=(+ele.utilizeHandleAmount).toFixed(2)
       }   
     })
    } 
    if(this.zclast.length>0){
      this.zclast.forEach(item=>{
  let url =  `/api/regulatory/type/listByTypeId/${item}`
                this.$axios.get(url, ).then((res) => {
                 
                  	 for( let i of res.data){
                            this.opetareListThree.push(i);
                                   }
                }).catch(function (err) {
                   //alert('连接服务器失败！');
                });
      })
    }       if(this.entIdListU.length>0){          
      this.entIdListU.forEach(item=>{
         let params = new URLSearchParams();
                params.append('entId', item);
  let url =  `/api/regulatory/tEnterpriseInfo/selectTEnterpriseInfoDetails`
                this.$axios.get(url,{params} ).then((res) => {

                            this.optionsAA.push(res.data.tenterpriseInfo);
                          
                }).catch(function (err) {
                   //alert('连接服务器失败！');
                });
      })
    } 
   
          if(this.entidLLstW.length>0){
      this.entidLLstW.forEach(item=>{
         let params = new URLSearchParams();
                params.append('entId', item);
  let url =  `/api/regulatory/tEnterpriseInfo/selectTEnterpriseInfoDetails`
                this.$axios.get(url,{params} ).then((res) => {
                
                            this.optionsBBT.push(res.data.tenterpriseInfo);
                                             
                }).catch(function (err) {
                   //alert('连接服务器失败！');
                });
      })
    }   
    
   this.solidWasteRemoveList=curTableFourU
    this.finalTableData=[];
    this.solidWasteRemoveList.map((item,index)=>{
      
           let params = new URLSearchParams();
                params.append('entId', item.entId);
  let url =  `/api/regulatory/tEnterpriseInfo/selectTEnterpriseInfoDetails`
                this.$axios.get(url,{params} ).then((res) => {
            let  itemNew={
            entAddressd: res.data.tenterpriseInfo.address,
              contacts: res.data.tenterpriseInfo.contacts,
              contactsPhone: res.data.tenterpriseInfo.contactsPhone
              }
            
              this.finalTableData.push(Object.assign({}, item, itemNew))
              if(index==(this.solidWasteRemoveList.length-1)){
                
this.solidWasteRemoveList=this.finalTableData
              }
                
                }).catch(function (err) {
                  alert('连接服务器失败！');
                  
                });
    })

            },
            //      getOperationTypeList(id) {
            //     let url =  `/api/regulatory/type/getTypeOptionsList/${15}`
            //     this.$axios.get(url, ).then((res) => {
            //       this.manageModeDetailList = res.data
            //       
            //     }).catch(function (err) {
            //        //alert('连接服务器失败！');
            //     });
            // },
            autoOperationListTwo(id,index){
              let idN =id
               this.solidWasteVoluntarilyHandleList[index].manageModeDetails=''
     let url =  `/api/regulatory/type/listByTypeId/${idN}`
                this.$axios.get(url, ).then((res) => {
                 
                   for( let i of res.data){
                            this.manageModeDetailList.push(i);
                                   }
                 
                }).catch(function (err) {
                   //alert('连接服务器失败！');
                });
            },

           
                  autoOperationListThree(id,index){
              let idN =id
              
              this.solidWasteRemoveList[index].manageModeDetails=''
     let url =  `/api/regulatory/type/listByTypeId/${idN}`
                this.$axios.get(url, ).then((res) => {
             
                         for( let i of res.data){
                            this.opetareListThree.push(i);
                                   }
                 
                }).catch(function (err) {
                   //alert('连接服务器失败！');
                });
            },
          routerBack() {
        this.$router.push(
              `/solidWasteDeclaration`
  
      );
    },
            //      getOperationTypeList(id) {
            //     let url =  `/api/regulatory/type/getTypeOptionsList/${15}`
            //     this.$axios.get(url, ).then((res) => {
            //       this.manageModeDetailList = res.data
            //       
            //     }).catch(function (err) {
            //        //alert('连接服务器失败！');
            //     });
            // },
    //         autoOperationListTwo(id){
    //           let idN =id
              
    //  let url =  `/api/regulatory/type/listByTypeId/${idN}`
    //             this.$axios.get(url, ).then((res) => {
    //               this.manageModeDetailList = res.data
                 
    //             }).catch(function (err) {
    //                //alert('连接服务器失败！');
    //             });
    //         },

                    autoOperationListTwo(id,index){
              let idN =id
               this.solidWasteVoluntarilyHandleList[index].manageModeDetails=''
     let url =  `/api/regulatory/type/listByTypeId/${idN}`
                this.$axios.get(url, ).then((res) => {
                  for( let i of res.data)
{
  this.manageModeDetailList.push(i);
}                
                }).catch(function (err) {
                   //alert('连接服务器失败！');
                });
            },			
				
    //               autoOperationListThree(id){
    //           let idN =id
              
    //  let url =  `/api/regulatory/type/listByTypeId/${idN}`
    //             this.$axios.get(url, ).then((res) => {
    //               this.opetareListThree = res.data                              
    //             }).catch(function (err) {
    //                //alert('连接服务器失败！');
    //             });
    //         },
                    autoOperationListThree(id,index){
              let idN =id
              
              this.solidWasteRemoveList[index].manageModeDetails=''
     let url =  `/api/regulatory/type/listByTypeId/${idN}`
                this.$axios.get(url, ).then((res) => {
                  
                                  for( let i of res.data){
                            this.opetareListThree.push(i);
                                   }
                 
                }).catch(function (err) {
                   //alert('连接服务器失败！');
                });
            },
    //       routerBack() {
    //     this.$router.push(
    //           `/solidWasteDeclaration`
  
    //   );
    // },
       rowEdit(rowId, row) {
         
         this.btmRowId=rowId
          this.showSaveBtn=true,
                this.showAddBtn=false,
        //  this.showSaveBtn=true,
        // this.showAddBtn=false,
    //   this.entName = entName;
    //   this.entId = entId;
    //   this.selectEntMonthYearReportInfo();
      this.dialogVisible = true;
       this.handleSecondPageDisplay(rowId,row)
    },
       AddNew(entId, entName) {
          this.showSaveBtn=false,
                this.showAddBtn=true,
    //   this.entName = entName;
    //   this.entId = entId;
    //   this.selectEntMonthYearReportInfo();
      this.cancleSee()
      this.dialogVisible = true;
   
    },
    seeDetail(){
       this.dialogVisible = true;
       this.seeDetailControl=false;
    },
    yearOrquarter(comeParam){
        if(comeParam==2){
this.quarterShow =true
this.yearShow=false
        }else{
          this.quarterShow =false
this.yearShow=true 
        }

    },

            changeCode(name) {
                let params = new URLSearchParams();
                params.append('types', name);
                let url = "/api/regulatory/hazardousWasteCategory/getDetailsCodeByDicType";
                this.$axios.get(url, {params}).then((response) => {
                    let index = this.tableData.findIndex(item => {return item.typeCode === name})
                    this.$set(this.tableData[index], 'wasteList', JSON.parse(JSON.stringify(response.data)))
                    this.$set(this.tableData[index], 'wasteCode', '')
                }).catch(function (err) {
                  //alert('连接服务器失败！');
                    
                });
            },
                        getFacilityList(){
                var _this=this;
                var params = new URLSearchParams();
                params.append('type',2);
                _this.$axios.get('/api/regulatory/tStorageFacilities/listCurrentEntStorageFacilitiesInfo',{params}).then(
                    function (res) {
                        if(res.code == 0){
                            _this.facilityAllList = res.data;   
                                             
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    console.log(error);
                });
            },
            getOperationModeList() {
                getTypeOptionsList().then((res) => {
                    this.operationModeList = res.data
                }).catch((err) => {
                      //alert('连接服务器失败！');
                })
            },
            getWasteList() {
                let params = new URLSearchParams();
                params.append('type', 1);
                this.$axios.post("/api/regulatory/hazardousWasteCategory/showDicType",params).then((response) => {
                    this.wasteList = response.data
                }).catch(function (err) {
                
                      //alert('连接服务器失败！');
                });
            },
    
            getDepartmentInfo(name, type, id) {
                return new Promise((resolve, reject) => {
                    let params = new URLSearchParams();
                    params.append('entName', name);
                    params.append('entKind', type);
                    params.append('entId', id)
                    let url = "/api/regulatory/pc/administrative/searchEntInfoByName";
                    this.$axios.get(url, {params}).then((response) => {
                        if(response.code === 0) {
                            if(type === 1) {
                                this.hasDpInfoId = response.data[0].entId
                                this.formDisposition.departmentDatas.dpInfoId = response.data[0].entId
                                this.formDisposition.departmentDatas.dpName = response.data[0].entName
                                this.formDisposition.departmentDatas.dpAdministration = response.data[0].regionCode
                                this.formDisposition.departmentDatas.dpContactPerson = response.data[0].linkName
                                this.formDisposition.departmentDatas.dpContactNumber = response.data[0].linkPhone
                                this.formDisposition.departmentDatas.dpContactAddress = response.data[0].entAddress
                                this.formDisposition.departmentDatas.dpContactLicense = response.data[0].businessLicense
                                this.formDisposition.departmentDatas.dpCertificate = response.data[0].roadTransportCertificate
                                this.formDisposition.departmentDatas.dpRegionName = response.data[0].regionCodeName
                            } else if (type === 2) {
                                this.acceptList = response.data
                            } else if (type === 4) {
                                this.transportList = response.data
                            }
                            this.loading = false
                        } else {
                            this.$message(response.msg)
                            switch(type) {
                                case 1: 
                                    this.hasDpInfoId = null
                                    this.formDisposition.departmentDatas.dpName = ''
                                    this.formDisposition.departmentDatas.dpAdministration = [];
                                    this.formDisposition.departmentDatas.dpContactPerson = ''
                                    this.formDisposition.departmentDatas.dpContactNumber = ''
                                    break;
                                case 2: 
                                    this.haseRceivesInfoId = null
                                    this.formDisposition.rceivesDatas.receivesUnitName = ''
                                    this.formDisposition.rceivesDatas.receivesUnitCode = ''
                                    this.formDisposition.rceivesDatas.receivesUnitAdministration = []
                                    this.formDisposition.rceivesDatas.receivesUnitPerson = ''
                                    this.formDisposition.rceivesDatas.receivesUnitNumber = ''
                                    this.formDisposition.rceivesDatas.receivesUnitAddress = ''
                                    break;
                                case 4: 
                                    this.hasTransportInfoId = null
                                    this.formDisposition.transportDatas.transportName = ''
                                    this.formDisposition.transportDatas.transportCode = ''
                                    this.formDisposition.transportDatas.transportAddress = ''
                                    this.formDisposition.transportDatas.transportPerson = ''
                                    this.formDisposition.transportDatas.transportNumber = ''
                                    break;
                            }
                            this.loading = false
                        }
                    })
                })
            },

            saveOrUpdateDataNew(){
              let obj ={
                  name:'',
                  type:'',
    currentProduction:'',// 本期生产量
    outAmount:'',//yichu
			beforeAmount: '',//上期
			cumulativeAmount: '',
			selfDisposalAmount: '',
      juage:1
                }
                this.wasteAllList.forEach(item=>{
                  if(item.id==this.firstTable[0].fA){
obj.name=item.name
                  }
                })
                 
                  obj.type=this.firstTable[0].fB
                   obj.currentProduction=this.firstTable[0].fC
                  obj.outAmount=this.utliZedTotalforUse
                   obj.beforeAmount=this.firstTable[0].fD
                  obj.cumulativeAmount=this.firstTable[0].fE
                  obj.selfDisposalAmount=this.handleAmoutTotalforUse
                  //判断总量是否相等
                  let pre =(+obj.currentProduction)+(+obj.beforeAmount)
                  let latter =(+obj.outAmount)+(+obj.cumulativeAmount)+(+obj.selfDisposalAmount)
              
                              if(obj.currentProduction=="" || obj.beforeAmount==""){
    this.$message({
                                type: 'error',
                                message: '请填写相关数据！'
                            });
                            return 
                  }
                  if(pre !=latter){
    this.$message({
                                type: 'error',
                                message: '填报数量不符合要求，提交失败！'
                            });
                            return 
                  }
            let   curObjTable={
                     productionId: this.firstTable[0].fA  ,   
      // this.enterpriseSolidWasteDeclareDetailsList[0].type=  this.firstTable[0].fB
      currentProduction: this.firstTable[0].fC,
      beforeAmount :this.firstTable[0].fD ,
          cumulativeAmount:  this.firstTable[0].fE,
         productionProcess:    this.firstTable[0].fF,
        //第二个表赋值
     solidWasteStorageList:this.solidWasteStorageList,
  solidWasteVoluntarilyHandleList:this.solidWasteVoluntarilyHandleList,
       solidWasteRemoveList:this.solidWasteRemoveList
                  }
                  
                this.AllTableData.unshift(curObjTable)
              this.tableDataBottom.unshift(obj)
      this.$message({
                                type: 'success',
                                message: '添加成功'
                            });
                   this.dialogVisible = false; 
                   this.displayTotalNumsEdit()         
            },


            editMethodSave(){
          let obj ={
                  name:'',
                  type:'',
    currentProduction:'',// 本期生产量
    outAmount:'',//yichu
			beforeAmount: '',//上期
			cumulativeAmount: '',
			selfDisposalAmount: '',
      juage:1
                }
                this.wasteAllList.forEach(item=>{
                  if(item.id==this.firstTable[0].fA){
obj.name=item.name
                  }
                })
                 
                  obj.type=this.firstTable[0].fB
                   obj.currentProduction=this.firstTable[0].fC
                  obj.outAmount=this.utliZedTotalforUse
                   obj.beforeAmount=this.firstTable[0].fD
                  obj.cumulativeAmount=this.firstTable[0].fE
                  obj.selfDisposalAmount=this.handleAmoutTotalforUse
                  //判断总量是否相等
                  let pre =(+obj.currentProduction)+(+obj.beforeAmount)
                  let latter =(+obj.outAmount)+(+obj.cumulativeAmount)+(+obj.selfDisposalAmount)
                
                  if(pre !=latter){
    this.$message({
                                type: 'error',
                                message: '填报数量不符合要求，提交失败！'
                            });
                            return 
                  }
              let    curObjTable={
                     productionId: this.firstTable[0].fA  ,   
      // this.enterpriseSolidWasteDeclareDetailsList[0].type=  this.firstTable[0].fB
      currentProduction: this.firstTable[0].fC,
      beforeAmount :this.firstTable[0].fD ,
          cumulativeAmount:  this.firstTable[0].fE,
         productionProcess:    this.firstTable[0].fF,
        //第二个表赋值
     solidWasteStorageList:this.solidWasteStorageList,
  solidWasteVoluntarilyHandleList:this.solidWasteVoluntarilyHandleList,
       solidWasteRemoveList:this.solidWasteRemoveList
                  }
                  
                this.AllTableData[this.btmRowId]=curObjTable

               this.tableDataBottom[this.btmRowId]=obj
      this.$message({
                                type: 'success',
                                message: '保存成功'
                            });
                   this.dialogVisible = false; 
                   this.displayTotalNumsEdit() 
            },
              cancleSee(){
               this.firstTable[0].fA=''     
     this.firstTable[0].fB=''
      this.firstTable[0].fC=''
        this.firstTable[0].fD =''
           this.firstTable[0].fE=''
         this.firstTable[0].fF  =''
        //第二个表赋值
        this.solidWasteStorageList=[{
          beforeAmount:"",
declareDetailId: "",
deleteFlag: "",
id: "",
keepingMode: '',
storagePositionId: '',
storagePositionName: "",
totalAmount: "",
transferName: "",
updatedBy: "",
updatedTime: ""}]
     
      
     this.solidWasteVoluntarilyHandleList=[{declareDetailId: "",
deleteFlag: "",
handleAmount: "",
id: "",
manageMode: "",
manageModeDetails: "",
name: "",
updatedBy: "",
updatedTime: ""}]

       
  
       this.solidWasteRemoveList=[{contacts: "",
contactsPhone: "",
declareDetailId: "",
deleteFlag: "",
entAddressd: "",
entId: "",
handleAmount: "",
id: "",
manageMode: "",
manageModeDetails: "",
transportEntId: "",
updatedBy: "",
updatedTime: "",
utilizeAmount: "",
utilizeHandleAmount: "",}]

  
    
    },
           submitFormNew(formName) {
             
              
                    let  nowDate = new Date().format("yyyy-MM-dd hh:mm");

let param = {
	"auditStatus": 0,
	"declareStatus": 0,
	"id": '',
	"updatedBy": "",
	"updatedTime": ""
}
param.declareQuarter=this.labelForm.month

param.declareType=this.labelForm.quarter
param.declareYear= this.labelForm.years,
param.entId= sessionStorage.getItem('entId'),
param.commitTime= nowDate,
param.declareTime= nowDate,	
// param.enterpriseSolidWasteDeclareDetailsList=this.enterpriseSolidWasteDeclareDetailsList
param.enterpriseSolidWasteDeclareDetailsList=[]
for(let i of this.AllTableData){
param.enterpriseSolidWasteDeclareDetailsList.push(i)
}
   this.$axios.post("/api/regulatory/commonlysolidwaste/declarationSolidWasteSave",param).then((response) => {
                        if (response.code === 0) {
                            this.$message({
                                type: 'success',
                                message: '保存成功！'
                            })
                                this.$router.push(
              `/solidWasteDeclaration`
  
      );
                            // this.resetForm()
                            this.routerBack()
                        }else if(response.code === 1&&response.msg=="系统异常"){
     this.$message({
                                type: 'error',
                                message: '一个entId一个年度只能提交一次！'
                            })
                        }else if(response.code === 1&&response.msg.indexOf('不可重复申报')>-1){
     this.$message({
                                type: 'error',
                                message: '已申报，不可重复申报！'
                            })}
                    }).catch(function (err) {
                      // console.log(err)
                     
                        this.$message.error(err)
                    });
                //  else {
                //     return false;
                // }
                // });
            },



                getOperationModeList() {
                 this.$axios
        .get("/api/regulatory/type/getTypeOptionsList/15", 
        ).then((res) => {
                    this.operationModeList = res.data
                }).catch((err) => {
                 
                  //alert('连接服务器失败！');
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
           
              // console.log(error);
            });
        } else {
        
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
 
    },
    handleCurrentChange(val) {
      this.cur_page = val;
  
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
    //   _this.pageList();
    },
    pageList() {
      var _this = this;
     
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
//     getWasteCategory(){
        
//         var _this=this
//         let param ={
//     "pageNum": 1,
//     "pageSize": 10,
//     "vfName": "",
//     "status": "",
//     "vfCode": "",
//     "vfType": "",
//     "storageId": ""
// }
//   _this.$axios
//         .get("/api/regulatory/tStorageFacilities/storageSettingList",  {param})
//         .then(function (res) {
             
//           if (res.code == 0) {  
//             _this.wasteAllList= res.data.records;          
//           }
//         })
//         .catch((error) => {        
//           // console.log(error);
//         })
//     },
   getWasteCategory(){      
        var _this=this
     let params = new URLSearchParams();
     params.append("entId", this.rowInfoId);
  _this.$axios
        .post("/api/regulatory/commonlysolidwaste/listSolidWasteInfo", {params} )
        .then(function (res) {            
          if (res.code == 0) {  
            _this.wasteAllList= res.data;    
             
           
          }
        })
        .catch((error) => {        
          // console.log(error);
        })
    },
    selectNodeAA(val){
     
this.wasteAllList.forEach(item=>{
  if(val==item.id){
   
    this.firstTable[0].fB=item.categoryName;

  }

})

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
    lookEntMonthPeport(entId, entName) {
      this.entName = entName;
      this.entId = entId;
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

            resetForm(formName) {
                this.$refs['form'].resetFields();
                this.allFileList = [];
                this.acceptList =[],
                this.transportList = [],
                this.tableData = [{
                    disposalMethodCode: '',
                    typeCode: '',
                    wasteCode: '',
                    wasteName: '',
                    number:  0,
                    unit: '',
                    wasteList: []
                }]
                this.getDepartmentInfo('', 1, sessionStorage.getItem('entId'))
            },
            handleAdd(index, data) {
                this.tableData.push({
                    disposalMethodCode: '',
                    typeCode: '',
                    wasteCode: '',
                    wasteName: '',
                    number:  0,
                    unit: '',
                    wasteList: []
                })
            },
            handleDelete(index, data) {
                if (this.tableData.length > 1) {
                    this.tableData.splice(index, 1)
                } else {
                    this.$message('至少有一组数据');
                }
            },
            searchComponyInfo(name) {
                this.getDepartmentInfo(name, 2, '')
            },
            searchTransportInfo(name) {
                this.getDepartmentInfo(name, 4, '')
            },
            beforeAvatarUpload(file) {
                if (
                    file.name.endsWith(".doc") ||
                    file.name.endsWith(".docx") ||
                    file.name.endsWith(".xls") ||
                    file.name.endsWith(".xlsx") ||
                    file.name.endsWith(".pdf")
                ) {
                    let count = 0;
                    this.allFileList.forEach(element => {
                        if (element.fileName == file.name) {
                            count++;
                        }
                    });
                    if (count > 0) {
                        this.$message({
                            message: "上传失败,已存在同名文件，请检查!",
                            type: "warning"
                        });
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    this.$message({
                    message: "上传失败,上传文件只支持word,excel,pdf!",
                    type: "warning"
                    });
                    return false;
                }
            },
            onWheelSuccess(response, file, fileList) {
                if (response.code == 0) {
                    var imageData = {};
                    imageData.fileUrl = response.data.locationUrl;
                    imageData.thumbUrl = response.data.thumbnailUrl;
                    imageData.fileName = response.data.locationUrl;
                    this.allFileList.push(imageData);
                    this.$message({ message: "上传成功", type: "success" });
                    return true;
                } else {
                    this.$message({ message: response.msg, type: "error" });
                    return false;
                }
            },
            handleRemove(file, fileList) {
                this.allFileList = this.allFileList.filter((item) => {
                    return item.uid !== file.uid
                })
            },
        },
    }
</script>


<style scoped>
    .allmap{
        width:100%;
        height:600px;
        position:relative;
        padding: 61px 10px 10px 10px;background: #ffffff;
    }
    .button-type{
        width: 100px;
        height: 35px;
        background: #33a7e1;
        font-weight: 500;
        color: white;
        border: 1px solid #FFFFFF;
        border-radius: 4px;
    }
  .mytable-default >>> .el-input--suffix .el-input__inner {
    width: 162px;
    height: 44px;
    border:none;
    padding-left: auto;
}
/* .mytable-default >>> td:first-child,.mytable-default >>> th:first-child {
    padding-left: 0px;
} */
    /* 去掉地图左下角的百度LOGO */
    .anchorBL {
        display:none
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #F8F8F8;
    }
    .grid-content {
        min-height: 40px;
    }
    .appeal{
        line-height: 40px;
        /*设置为伸缩容器*/
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        /*垂直居中*/
        -webkit-box-align: center;/*旧版本*/
        -moz-box-align: center;/*旧版本*/
        -ms-flex-align: center;/*混合版本*/
        -webkit-align-items: center;/*新版本*/
        align-items: center;/*新版本*/
    }
    .appeal2{
        line-height: 40px;
        /*设置为伸缩容器*/
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        /*垂直居中*/
        -webkit-box-align: center;/*旧版本*/
        -moz-box-align: center;/*旧版本*/
        -ms-flex-align: center;/*混合版本*/
        -webkit-align-items: center;/*新版本*/
        align-items: center;/*新版本*/
    }
    .el-dialog__body {
        padding: 30px 20px;
        color: #606266;
        font-size: 14px;
        word-break: break-all;
        background-color: #F8F8F8;
    }
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
</style>
