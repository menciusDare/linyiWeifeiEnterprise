<template>
  <div class="main">
    <!--  // 导航-->
    <div class="main-top">
      <div class="breadcrumb">
        <a href="#"
          ><i class="icon icon-zhihuijianguan menu-icon"></i
          ><span class="text-primary-font">一般工业固废</span></a
        ><span class="sep">></span><span class="text-primary">产废信息</span>
      </div>
    </div>

    <!-- // 提示-->
    <!-- <div class="panel">
            <div class="panel-bd pdtlr-0">
                <div style="margin-bottom: 8px">友情提示 </div>
                <div class="breadcrumb" style="padding-top:5px;padding-left:9px;width: 100%;height: 100%;background-color: #fdf6ec;color: #e6a74f;line-height: 23px;font-size: 14px">
                    <div>一、生产性产废：生产产品过程中直接产生的危险废物。如产品加工和制造过程中产生的下脚料、边角料、残余物质；在物质提取、提纯、电解、电积、净化、改性、表面处理及其它处理过程中产生的残余物质；在物质
                    合成、裂解、分馏、蒸馏、溶解、沉淀以及其他过程中产生的残余物质等。 生产性危废只能通过产废入库功能新增入库，增加库存。</div>
                    <div>二、非生产性产废：非生产过程产生的危险废物，与生产过程不直接相关。如事故应急、设备检修、场地清理产生的危险废物，废水、废气等污染防治设施产生的危险废物。 非生产性危废只能通过产废入库功能新增入库，
                    增加库存。</div>
                    <div>三、次生危废：危险废物利用处置过程中产生的危险废物，即在自行利用处置项目或经营许可项目中产生的废物。 次生危废只能通过自行利用处置或经营记录新增入库。
                    注：产废信息如果在管理计划、联单、年度申报等模块使用过，将不能修改废物代码、名称、计量单位、废物类型。</div>
                </div>
            </div>
        </div> -->

    <!--数据表格-->
    <div class="panel">
      <div class="panel-bd">
        <div style="padding: 20px 0px 0 2px">
          <ul class="filter-box">
            <li class="filter-item">
              <div class="filter-label">废物名称：</div>
              <div class="filter-con">
                <div class="el-input w180 el-input-group">
                  <span class="el-input__prefix">
                    <i class="el-input__icon el-icon-search"></i>
                  </span>
                  <el-input
                    type="text"
                    clearable
                    placeholder="废物名称"
                    v-model="labelForm.wasteName"
                  />
                </div>
              </div>
            </li>
            <!-- <li class="filter-item">
                            <div class="filter-label">危废代码：</div>
                            <div class="filter-con">
                                <div class="el-input w180 el-input-group el-input--prefix">
                                    <span class="el-input__prefix"> <i class="el-input__icon el-icon-search"></i> </span>
                                    <input type="text" autocomplete="off" placeholder="危废代码" v-model="search.vfCode"  class="el-input__inner">
                                </div>
                            </div>
                        </li> -->

            <li class="filter-item">
              <div class="filter-label">废物类别：</div>
              <div class="filter-con">
                <div class="el-select w180">
                  <el-select
                    v-model="labelForm.wasteCategory"
                    clearable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item,index) in fw_type"
                      :key="index"
                      :label="item.dicName"
                      :value="item.dicCode"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </li>

            <!-- <li class="filter-item">
                            <div class="filter-label">贮存间：</div>
                            <div class="filter-con">
                                <div class="el-select w124">
                                    <el-select v-model="search.storageId" clearable>
                                        <el-option
                                                v-for="item in storageList"
                                                :key="item.code"
                                                :label="item.name"
                                                :value="item.code">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </li> -->

            <li class="filter-item">
              <div class="filter-btn">
                <el-button
                  type="button"
                  size="medium"
                  @click="pageList"
                  class="el-button el-button--primary"
                >
                  <span>查询</span></el-button
                >
                <el-button
                  type="button"
                  size="medium"
                  @click="addVf"
                  class="el-button el-button--primary"
                >
                  <span>新增</span></el-button
                >
              </div>
            </li>
          </ul>
        </div>

        <table class="table-default">
          <thead>
            <tr>
              <th style="text-align: center; width: 6%">废物名称</th>
              <th style="text-align: center; width: 8%">废物大类</th>
              <th style="text-align: center; width: 5%">计量单位</th>
              <th style="text-align: center; width: 7%">操作人</th>
              <th style="text-align: center; width: 6%">操作时间</th>
              <th style="text-align: center; width: 7%">状态</th>
              <th style="text-align: center; width: 7%">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in dataList" :key="i">
              <td
                style="
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 7%;
                "
                :title="item.name"
              >
                {{ item.name }}
              </td>
              <td
                style="
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 7%;
                "
                :title="item.categoryName"
              >
                {{ item.categoryName }}
              </td>
              <td
                style="
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 7%;
                "
                :title="item.companyName"
              >
                {{ item.companyName }}
              </td>
              <td
                style="
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 7%;
                "
                :title="item.updatedByName"
              >
                {{ item.updatedByName }}
              </td>
              <td
                style="
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 7%;
                "
              >
                {{ item.updatedTime }}
              </td>
              <td
                style="
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 7%;
                "
              >
                {{ item.status == 1 ? "生效" : "停用" }}
              </td>
              <td>
                &nbsp;<el-link type="primary" @click="updateByid(item.id)"
                  >编辑</el-link
                >
                &nbsp;<el-link type="primary" @click="lookInfo(item.id)"
                  >查看</el-link
                >

                <el-link
                  v-show="item.status == 1"
                  type="primary"
                  @click="vfCodeStop(item.id)"
                  >停用</el-link
                >
                   <el-link
                  v-show="item.status !== 1"
                  type="primary"
                  @click="startUse(item.id)"
                  >启用</el-link
                >
              </td>
            </tr>
          </tbody>
        </table>
        <div class="el-pagination is-background mt-lg">
          <span class="el-pagination__total">共 {{ total }} 条，每页显示</span>
          <span class="el-pagination__total">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="cur_page"
              :page-size="pageSize"
              layout="sizes, prev, pager, next"
              :total="total"
            >
            </el-pagination>
          </span>

          <span class="el-pagination__total">共 {{ totalPage }} 页</span>
        </div>
      </div>
    </div>
    <!--弹窗-->
    <StorageroomEditor v-on:close="closeDia" ref="vfChild"></StorageroomEditor>

    <el-dialog
      title="产废信息"
      :modal-append-to-body="false"
      top="9vh"
      width="1100px"
      :visible.sync="inforDialog"
      append-to-body
      @close="closeInfoDialog"
      :close-on-click-modal="false"
    >
      <template>
        <div>
          <div class="panel">
            <div class="panel-bd pdtlr-0">
              <div
                class="breadcrumb"
                style="
                  padding-top: 5px;
                  padding-left: 9px;
                  width: 100%;
                  height: 100%;
                  background-color: #fdf6ec;
                  color: red;
                  line-height: 23px;
                  font-size: 14px;
                "
              >
                <div>
                  第I类：按照《固体废物浸出毒性浸出方法》（GB5086-1997）规定方法进行浸出试验而获得的浸出液中，任何一种污染物的浓度均未超过《污水综合排放标准》（GB8978-1996）中最高允许排放浓度，且pH值在6~9的一般工业固体废物。
                </div>
                <div>
                  第II类：按照《固体废物浸出毒性浸出方法》（GB5086-1997）规定方法进行浸出试验而获得的浸出液中，有一种或一种以上的污染物浓度超过《污水综合排放标准》（GB8978-1996）中最高允许排放浓度，或者pH值在6~9的之外的一般工业固体废物。
                </div>
              </div>
            </div>
          </div>
          <el-form
            label-position="right"
            :model="formInlinefa"
            ref="formInline"
            class="demo-form-inline"
            label-width="130px"
            style="width: 1050px"
          >
            <!--  一行  -->
            <el-row>
              <el-col :span="24">
                <el-form-item label="废物分类" prop="vfKind">
                  <el-select
                    v-model="formInlinefa.vfKind"
                    placeholder="请选择"
                    style="width: 400px"
                    :disabled="!lookFlog"
                  >
                    <el-option
                      v-for="(item,index) in vfTypeList"
                      :key="index"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <!--  二行  -->
            <el-row>
              <el-col :span="12">
                <el-form-item label="废物大类" prop="fwType">
                  <el-select
                    v-model="formInlinefa.fwType"
                    placeholder="请选择"
                    filterable
                    style="width: 400px"
                    :disabled="!lookFlog"
                  >
                    <el-option
                      v-for="item in fw_type"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
             <el-col :span="12">
                       <el-form-item label="贮存间" prop="storageFacilitiesId">
                  <el-select
                    v-model="formInlinefa.storageFacilitiesId"
                    placeholder="请选择"
                    filterable
                    style="width: 400px"
                    :disabled="!lookFlog"
                  >
                    <el-option
                      v-for="item in storeRoomList"
                      :key="item.id"
                      :label="item.facilitiesName"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          
            <!--  三行  -->
            <el-row>
              <el-col :span="12">
                <el-form-item label="废物俗称" prop="vfName">
                  <el-input
                    v-model="formInlinefa.vfName"
                    style="width: 400px"
                    :disabled="!lookFlog"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="计量单位">
                  <el-input
                    placeholder="吨"
                    title="吨"
                    style="width: 400px"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!--  四行  -->
            <el-row>
              <el-col :span="12">
                <el-form-item label="废物形态" prop="fwForm">
                  <el-select
                    v-model="formInlinefa.fwForm"
                    placeholder="请选择"
                   
                    filterable
                    style="width: 400px"
                    :disabled="!lookFlog"
                  >
                    <el-option
                      v-for="item in fw_form"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="密度" prop="equipment">
                  <div style="display: flex; flex-direction: row">
                    <el-input
                      v-model="formInlinefa.equipment"
                      placeholder="请输入"
                      style="width: 360px; border: none; height: 100%"
                      :disabled="!lookFlog"
                    >
                    </el-input>
                    <div
                      style="
                        width: 40px;
                        background-color: rgb(221 221 221);
                        height: 34px;
                        line-height: 34px;
                        transform: translateY(3px);
                        text-align: center;
                      "
                    >
                      g/m³
                    </div>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <!--  五行  -->
            <el-row>
              <el-col :span="12">
                <el-form-item label="产生工艺及主要成分" prop="wxFeatures">
                  <el-input
                    v-model="formInlinefa.wxFeatures"
                    style="width: 400px"
                    :rows="4"
                    maxlength="40"
                    type="textarea"
                    :disabled="!lookFlog"
                    placeholder="不超过40个字"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="禁忌与应急措施" prop="emergency">
                  <el-input
                    v-model="formInlinefa.emergency"
                    style="width: 400px"
                    :disabled="!lookFlog"
                    :rows="4"
                    type="textarea"
                    placeholder="不超过40个字"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!-- <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple-light appeal" ><span>&nbsp;&nbsp;&nbsp;&nbsp;危废类别：{{forrmotName(wfKindList,formInlinefa.vfKind)}}</span></div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple-light appeal"><span>&nbsp;&nbsp;&nbsp;&nbsp;危废代码：{{formInlinefa.code}}</span></div></el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple-light appeal"  style=" background: #d3dce6;"><span>&nbsp;&nbsp;&nbsp;&nbsp;危废名称：{{formInlinefa.vfName}}</span></div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple-light appeal"  style=" background: #d3dce6;"><span>&nbsp;&nbsp;&nbsp;&nbsp;危废类型：{{forrmotName(fw_type,formInlinefa.fwType)}}</span></div></el-col>
                       
                    </el-row>

                    <el-row>
                         <el-col :span="12"><div class="grid-content bg-purple-light appeal"  ><span>&nbsp;&nbsp;&nbsp;&nbsp;贮存间：{{forrmotName(storageList,formInlinefa.storageId)}}</span></div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple-light appeal" ><span>&nbsp;&nbsp;&nbsp;&nbsp;颜色：{{forrmotName(wf_color,formInlinefa.wfColor)}}</span></div></el-col>
                        
                    </el-row>

                    <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple-light appeal" style=" background: #d3dce6;"><span>&nbsp;&nbsp;&nbsp;&nbsp;应急设备：{{formInlinefa.equipment}}</span></div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple-light appeal"  style=" background: #d3dce6;" ><span>&nbsp;&nbsp;&nbsp;&nbsp;危废形态：{{forrmotName(fw_form,formInlinefa.fwForm)}}</span></div></el-col>
                        
                    </el-row>

                    <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple-light appeal"  ><span>&nbsp;&nbsp;&nbsp;&nbsp;危废特性：{{forrmotName(wx_features,formInlinefa.wxFeatures)}}</span></div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple-light appeal" ><span>&nbsp;&nbsp;&nbsp;&nbsp;有害物质名称：{{formInlinefa.harmful}}</span></div></el-col>
                        
                    </el-row>

                    <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple-light appeal" style=" background: #d3dce6;"><span>&nbsp;&nbsp;&nbsp;&nbsp;危险情况：{{forrmotName(wx_situation,formInlinefa.wxSituation)}}</span></div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple-light appeal"  style=" background: #d3dce6;" ><span>&nbsp;&nbsp;&nbsp;&nbsp;应急措施：{{forrmotName(measures,formInlinefa.measures)}}</span></div></el-col>
                        
                    </el-row> -->
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import StorageroomEditor from "./solidStorageEditor";
export default {
  components: {
    StorageroomEditor,
  },
  name: "solidStorageInfo",
  data() {
    return {
      storeRoomList:[],
      labelForm: {
        wasteName: "",
        wasteCategory: undefined,
      },
      lookFlog: false,
      nameList: [],
      inforDialog: false,
      dataList: [],
      totalPage: 0,
      total: 0,
      cur_page: 1,
      pageSize: 10,

      search: {
        vfName: "",
        vfCode: "",
        vfType: "",
        storageId: "",
        status: "",
      },
      vfTypeList: [],

      wfKindList: [], //危废种类
      storageList: [], //储藏间
      wx_situation: [], //危险情况
      wx_features: [], //危险特性
      fw_form: [], //危废形态
      fw_type: [], //危废类型
      storeRoomList:[],
      measures: [], //应急措施
      wf_color: [], //危废颜色
      codeList: [], //危废代码列表

      formInlinefa: {
        vfKind: "",
        fwType: "",
        vfName: "",
        storageId: "",
        emergency: "",
        wfColor: [],
        fwForm: '',
        wxFeatures: "",
        wxSituation: "",
        harmful: "",
        equipment: "",
        measures: "",
        code: "",
        storageFacilitiesId:''
      },
    };
  },

  mounted() {
    this.onloadSelects();
    this.pageList();
    this.getSolidWaste()
    this.getDetailsSelectData()
    this.getWasteShape()
    this.getStoreRoomList()
  },
  methods: {
    getDetailsSelectData() {
      this.$axios
        .get("/api/regulatory/solidWasteCategory/listAll")
        .then((res) => {
          if(!res.code) {

            this.fw_type = res.data;
            this.$refs.vfChild.fw_type = res.data;
     
          }
        });
    },
    getSolidWaste() {
      let _this = this
    let type =9
      _this.$axios
        .get(`/api/regulatory/type/getSelectDataByType/${type}`,)
        .then(function (res) {
          if (res.code == 0) {

            _this.vfTypeList = res.data
          
            _this.$refs.vfChild.wfKindList = res.data;
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          console.log(error);
        });
    },
      getWasteShape() {
      let _this = this
    let type =10
      _this.$axios
        .get(`/api/regulatory/type/getSelectDataByType/${type}`,)
        .then(function (res) {
          if (res.code == 0) {

            _this.fw_form = res.data
         
            _this.$refs.vfChild.fw_form = res.data;
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          console.log(error);
        });
    },
    getStoreRoomList(){
        
                var _this=this;
                var params = new URLSearchParams();
                params.append('page', _this.cur_page);
                params.append('limit', _this.pageSize);
                params.append('facilitiesName','');
                params.append('storageType', '');
                // params.append('storageType', 2);
                params.append('type', 2); // 贮藏设施类型：1危废 2固废
                params.append('storageStatus', 0); // 贮存间状态： 0  生效     1 停用

                // params.append('personLiable', _this.search.personLiable);
                // params.append('iphone', _this.search.iphone);
                _this.$axios.get('/api/regulatory/tStorageFacilities/queryFacilitiesList',{params}).then(
                    function (res) {
                        if(res.code == 0){
                          
                            _this.storeRoomList = res.data.records;
                             
            _this.$refs.vfChild.storeRoomList = res.data.records;
                         
                         
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    console.log(error);
                });
           
    },
    closeInfoDialog() {
      this.inforDialog = false;
    },

    forrmotName(list, codes) {
      let answerList = [];
      if (typeof codes == "number" || typeof codes == "string") {
        for (var i = 0; i < list.length; i++) {
          if (list[i].code == codes) {
            return list[i].name;
          }
        }
      } else {
        if (codes && codes.length > 0) {
          list.forEach((element) => {
            codes.find((item) => {
              if (item == element.code) {
                answerList.push(element.name);
              }
            });
          });
          return answerList.toString();
        }
      }
    },
    getCaption(obj, state) {
      var index = obj.lastIndexOf("#");
      if (index == -1) {
      } else if (state == 0) {
        obj = obj.substring(0, index);
      } else {
        obj = obj.substring(index + 1, obj.length);
      }
      return obj;
    },

    onloadSelects() {
      var _this = this;
      var params = new URLSearchParams();
      _this.$axios
        .get("/api/regulatory/tStorageFacilities/storageSettingSelects", {
          params,
        })
        .then(function (res) {
          if (res.code == 0) {
            // _this.vfTypeList = res.data.wfKindList;
            _this.storageList = res.data.storageList;

            // _this.$refs.vfChild.wfKindList = res.data.wfKindList;
            _this.$refs.vfChild.storageList = res.data.storageList;
            _this.$refs.vfChild.wx_situation = res.data.wx_situation;
            _this.$refs.vfChild.wx_features = res.data.wx_features;
            //  _this.$refs.vfChild.fw_form = res.data.fw_form;
            // _this.$refs.vfChild.fw_type = res.data.fw_type;
            _this.$refs.vfChild.measures = res.data.measures;
            _this.$refs.vfChild.wf_color = res.data.wf_color;

            _this.wfKindList = res.data.wfKindList;
            _this.storageList = res.data.storageList;
            _this.wx_situation = res.data.wx_situation;
            _this.wx_features = res.data.wx_features;
            // _this.fw_form = res.data.fw_form;
            // _this.fw_type = res.data.fw_type;
            
            _this.measures = res.data.measures;
            _this.wf_color = res.data.wf_color;
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          console.log(error);
        });
    },
    addVf() {
      this.$refs.vfChild.flag = false;
      this.$refs.vfChild.lookFlog = true;
      this.$refs.vfChild.title = "新增产废";
      this.$refs.vfChild.dialogVf = true;
    },
    closeDia() {
      this.$refs.vfChild.flag = false;
      this.$refs.vfChild.dialogVf = false;
      this.pageList();
    },
    startUse(id){
   this.$refs.vfChild.storeRoomList = this.storeRoomList;
			     this.$refs.vfChild.fw_form = this.fw_form;
				      this.$refs.vfChild.wfKindList =  this.vfTypeList;
					     this.$refs.vfChild.fw_type = this.fw_type;
      this.$refs.vfChild.flag = true;
      this.$refs.vfChild.lookFlog = true;
      this.$refs.vfChild.selectOneForStart(id);
    
    },

    updateByid(id) {
     this.$refs.vfChild.storeRoomList = this.storeRoomList;
			     this.$refs.vfChild.fw_form = this.fw_form;
				      this.$refs.vfChild.wfKindList =  this.vfTypeList;
					     this.$refs.vfChild.fw_type = this.fw_type;
      this.$refs.vfChild.flag = true;
      this.$refs.vfChild.title = "编辑产废信息";
      this.$refs.vfChild.dialogVf = true;
      this.$refs.vfChild.lookFlog = true;
     this.$refs.vfChild.selectOne(id);
    },

    lookInfo(id) {
      this.inforDialog = true;
      this.lookInfoDialog(id);
     
     
    },

    lookInfoDialog(id) {
      let that = this;
      var id = id;
      var url = "/api/regulatory/commonlysolidwaste/wasteProduction";
      that.$axios
        .get(url, {
          params: { id },
        })
        .then(function (res) {
          if (res.code == 0) {
            that.selectVfInfo(res.data.vfKind);
            that.formInlinefa.vfKind = res.data.classId;
            that.formInlinefa.vfKind = res.data.classId;
           
            that.formInlinefa.storageFacilitiesId = res.data.storageFacilitiesId;
        
            that.formInlinefa.fwType = res.data.categoryId;
            that.formInlinefa.vfName = res.data.name;
            that.formInlinefa.fwForm = res.data.form;
            that.formInlinefa.equipment = Number(res.data.density);
            that.formInlinefa.wxFeatures = res.data.wasteComposition;
            that.formInlinefa.emergency = res.data.emergencyMeasure;
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          console.log(error);
        });
    },

    selectVfInfo(vfCode, co) {
      var _this = this;
      var params = new URLSearchParams();
      _this.$axios
        .get(
          "/api/regulatory/tStorageFacilities/storageSettingCodeInfoSelects",
          { params: { vfCode: vfCode } }
        )
        .then(function (res) {
          if (res.code == 0) {
            _this.codeList = res.data;
            if (res.data && res.data.length > 0) {
              // _this.formInlinefa.code = res.data[0].code
            }
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          console.log(error);
        });
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
    pageList() {
      var _this = this;
      var params = new URLSearchParams();
      params.append("pageNo", _this.cur_page);
      params.append("pageSize", _this.pageSize);
      params.append(
        "categoryId",
        _this.labelForm.wasteCategory == undefined
          ? ""
          : _this.labelForm.wasteCategory
      );
      params.append("name", _this.labelForm.wasteName);

      _this.$axios
        .get("/api/regulatory/commonlysolidwaste/wasteProductionPageList", {
          params,
        })
        .then(function (res) {
          if (res.code == 0) {
            _this.dataList = res.data.records;
            _this.totalPage = res.data.pages;
            _this.total = res.data.total;
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          console.log(error);
        });
    },

    vfCodeStop(id) {
      this.$confirm("是否确认停用?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning",
      })
        .then(() => {
          var _this = this;
          const data = {
              id,
              status: 0
          }
          _this.$axios
            .post("/api/regulatory/commonlysolidwaste/editStatus", data)
            .then(function (res) {
              if (res.code == 0) {
                _this.$message.success("停用成功");
                _this.pageList();
              }
            })
            .catch((error) => {
              // catch 指请求出错的处理
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消停用",
          });
        });
    },
  },
};
</script>

<style scoped>
.allmap {
  width: 100%;
  height: 600px;
  position: relative;
  padding: 61px 10px 10px 10px;
  background: #ffffff;
}
.button-type {
  width: 100px;
  height: 35px;
  background: #33a7e1;
  font-weight: 500;
  color: white;
  border: 1px solid #ffffff;
  border-radius: 4px;
}
/* 去掉地图左下角的百度LOGO */
.anchorBL {
  display: none;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #f8f8f8;
}
.grid-content {
  min-height: 40px;
}
.appeal {
  line-height: 40px;
  /*设置为伸缩容器*/
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  /*垂直居中*/
  -webkit-box-align: center; /*旧版本*/
  -moz-box-align: center; /*旧版本*/
  -ms-flex-align: center; /*混合版本*/
  -webkit-align-items: center; /*新版本*/
  align-items: center; /*新版本*/
}
.appeal2 {
  line-height: 40px;
  /*设置为伸缩容器*/
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  /*垂直居中*/
  -webkit-box-align: center; /*旧版本*/
  -moz-box-align: center; /*旧版本*/
  -ms-flex-align: center; /*混合版本*/
  -webkit-align-items: center; /*新版本*/
  align-items: center; /*新版本*/
}
.el-dialog__body {
  padding: 30px 20px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
  background-color: #f8f8f8;
}
</style>
