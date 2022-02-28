<template>
    <!-- 主体 -->
    <div class="main" >
        <div class="main-top">
            <div class="breadcrumb">
                <a href="#"><i class="icon icon-zhuanyun"></i><span class="text-primary-font">申报登记</span></a><span class="sep">></span><span class="text-primary">管理计划</span>
            </div>
        </div>
        <div class="panel">
            <div class="panel-bd pdtlr-0">
                <!-- 收起后样式名.filter-more-mini -->
                <div class="filter-more" >
                    <ul class="filter-box">
                        <li class="filter-item">
                            <div class="filter-label">所在地：</div>
                            <div class="filter-con">
                                <div class="el-select w160">
                                    <el-cascader
                                                ref="regionElCascader"
                                                placeholder="请选择所在地"
                                                 :disabled="isDisabled"
                                                 v-model="regientCode"
                                                 @change="searchRegionChange"
                                                 :options="regionOptions"
                                                 change-on-select>
                                    </el-cascader>
                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-label">企业类型：</div>
                            <div class="filter-con">
                                <el-select v-model="entType" placeholder="请选择" style="width: 150px;" >
                                    <el-option
                                            v-for="item in entTypeOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-label">申请年份：</div>
                            <div class="filter-con">
                                <el-date-picker style="width: 150px;"
                                                :clearable="false"
                                                v-model="year"
                                                type="year"
                                                value-format="yyyy"
                                                placeholder="选择年">
                                </el-date-picker>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-label">申请状态：</div>
                            <div class="filter-con">
                                <el-select v-model="registerStatus" placeholder="请选择" style="width: 150px;">
                                    <el-option
                                            v-for="item in RegisOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </li>

                        <li class="filter-item">
                            <div class="filter-label">企业名称：</div>
                            <div class="filter-con">
                                <div class="el-input"><!---->
                                    <input type="text" autocomplete="off" placeholder="企业名称" class="el-input__inner" v-model="entName" style="width: 150px;">
                                    <!----><!----><!----><!----></div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-btn">
                                <!--<button type="button" class="button-type" @click="getRegionCountData(1)">&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt; <span>查询</span></button>-->
                                <el-button type="button" size="medium"  @click="getRegionCountData(1)" class="el-button el-button--primary">
                                    <span>查询</span></el-button>
                            </div>
                        </li>

                    </ul>

                </div>



                <div class="total-number" style="margin-left: 20px">
                    <div class="total-name">全部企业<span class="num">{{count}}</span>家</div>
                    <div class="total-text">已申报企业<span class="num">{{ok}}</span>家</div>
                    <div class="total-text is-offline">未申报企业<span class="num">{{noOk}}</span>家</div>
                </div>

                <table class="table-default">
                    <thead>
                    <tr>
                        <th class = "text_center">序号</th>
                        <th class = "text_center">企业名称</th>
                        <th class = "text_center">企业类型</th>
                        <th class = "text_center">所在地</th>

                        <th class = "text_center">所属行业</th>
                        <th class = "text_center">联系人</th>
                        <th class = "text_center">电话</th>
                        <th class = "text_center">申报状态</th>

                        <th class = "text_center">申报时间</th>
                        <th class = "text_center">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,i)  in dataTable">
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 6%" :title="item.rownum">{{item.rownum}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 14%" :title="item.name">{{item.name}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.typeNameStr">{{item.typeNameStr}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.address">{{item.address}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.caName">{{item.caName}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.contacts">{{item.contacts}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.contactsPhone">{{item.contactsPhone}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.declareStatus"><div :class="item.declareStatus=='已申报'?'text-state':'text-state state-off'">{{item.declareStatus}}</div></td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.declareTime">{{item.declareTime}}</td>
                        <td style="text-align:center;width: 10%">
                            <a v-if="item.declareStatus=='已申报'" href="javascript:;" class="text-primary text-underline"  @click="infoFun(item.id,item.correlationId,item.name)"> 查看</a>
                            <a v-else href="javascript:;" class="text-primary "  >暂无申报</a>
                        </td>
                    </tr>
                    </tbody>
                </table>




                <div class="el-pagination is-background mt-lg">
                    <span class="el-pagination__total">共 {{total}}  家运输企业，每页显示</span>
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
    </div>
</template>

<script>
    import aaa from '../../../../static/css/images/map/sanjiao.png'
    import loadBMap from '../../../components/common/unit/loadBMapApi'
    /*import mapFunction from '../../common/unit/mapFunction'*/
    export default {
        name: "RegisterHomeList",
        data(){
            return {
                isDisabled:false,
                total:0,
                totalPage:0,
                cur_page: 1,
                pageSizes: this.AppConfig.appInfo.pageSizes,
                pageSize: this.AppConfig.appInfo.pageSize,
                regientCode:sessionStorage.getItem('regionCode'),//[this.AppConfig.appInfo.regionCode],
                /*370000*/
                count:'',
                ok:'',
                noOk:'',
                entName:'',
                year:new Date().format("yyyy"),
                entType:'',
                registerStatus:'',
                dataTable:'',
                regionOptions:[],
                entTypeOptions: [
                    {
                        value: '',
                        label: '全部企业'
                    }, {
                        value: '1',
                        label: '重点企业'
                    }, {
                        value: '2',
                        label: '一般企业'
                    },{value: 3,label: "收集企业"},
                    {value: 4,label: "经营企业"}
                ],
                YearOptions:[
                    {
                        value: '',
                        label: '全部年份'
                    },
                    {
                        value: '2019',
                        label: '2019'
                    },
                    {
                        value: '2020',
                        label: '2020'
                    }
                ],
                RegisOptions:[
                    {
                        value: '',
                        label: '全部状态'
                    },
                    {
                        value: '1',
                        label: '已申报'
                    },
                    {
                        value: '2',
                        label: '未申报'
                    }
                ],
                search:{
                    entType:'',
                    regionLevel:sessionStorage.getItem('regionLevel'),
                }
            }
        },
        created: function () {
            if(this.search.regionLevel==3){
                this.isDisabled = true;
            }
            this.getRegionCountData(0);
            this.getRegionChildrenList();
        },
        methods:{
            handleSizeChange(val) {
                // 改变每页显示的条数
                this.pageSize=val
                // 注意：在改变每页显示的条数时，要将页码显示到第一页
                this.cur_page=1
                this.getRegionCountData(0);
            },
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getRegionCountData(0);
            },
            getIndex(index){
                let curPage = this.cur_page;
                let limitPage = this.pageSize;
                return (index+1) + (curPage - 1) * limitPage;
            },

            getRegionCountData(num){
                var that = this;
                if(num==1){
                    this.cur_page=1
                }
               /* var region = "";
                debugger
                if(null!=that.regientCode&&that.regientCode.length>0){
                    region =that.regientCode[that.regientCode.length-1]
                }*/
                var url = '/api/regulatory/ReportAndRegister/tEntRegisterPlantList';
                that.$axios.get(url, {params: {
                        year: that.year,
                        entType: that.entType,
                        regientCode: that.regientCode,
                        registerStatus: that.registerStatus,
                        entName: that.entName,
                        pageSize: that.pageSize,
                        pageNum: that.cur_page
                    }
                }).then(
                    function (res) {
                        if(res.code == 0){
                            that.dataTable = res.data.pageUtil.list
                            that.totalPage = res.data.pageUtil.totalPage;
                            that.total = res.data.pageUtil.totalCount;
                            var num = that.pageSize * (that.cur_page-1)
                            that.ok =  res.data.ok
                            that.noOk =  res.data.noOk
                            that.count =  res.data.count
                            for (var i = 0 ; i< res.data.pageUtil.list.length ; i++){
                                res.data.pageUtil.list[i].rownum = Number(num) + Number(res.data.pageUtil.list[i].rownum)
                            }
                        }else{
                            that.ok =  0
                            that.noOk =  0
                            that.count =  0
                            that.dataTable = []
                            that.totalPage = 0
                            that.total = 0
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    console.log(error);
                });
            },

            infoFun(entId,correlationId,name){
                this.$router.push({name: 'RegisterHome', params: {entId: entId,correlationId:correlationId,name:name}});
            },

            getRegionChildrenList(){
                var _this=this;
                _this.$axios.get('/api/regulatory/regionInfo/getRegionChildrenList',{params:{
                        "regionCode":_this.regientCode
                    }}).then(
                    function (res) {
                        if(res.code == 0){
                            _this.regionOptions = res.data;
                            _this.regionCode = [res.data[0].value+''];
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    console.log(error);
                });
            },
            searchRegionChange(){
                let regionInfo =this.$refs.regionElCascader.getCheckedNodes();
                if(regionInfo.length>0){
                    this.regientCode = regionInfo[0].value;
                }
                /*console.log(this.search.regionCode+"<<<当前省/市/区");*/
            }
        }
    }
</script>

<style>
    .text_center{
        text-align: center;
    }
</style>


