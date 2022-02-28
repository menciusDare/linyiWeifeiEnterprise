<template>
    <!-- 内容区域 -->
    <div class="main">
        <div class="main-top">
            <div class="breadcrumb">
                <a href="#"><i class="icon icon-zhihuijianguan menu-icon"></i>智慧监管</a><span class="sep">&gt;</span><span
                    class="text-primary">企业合规筛查</span>
            </div>
        </div>
        <div class="panel">
            <div class="panel-bd">
                <div style="padding: 20px 0px 0 2px;">
                    <ul class="filter-box">
                        <li class="filter-item">
                            <div class="filter-label">所在地：</div>
                            <div class="filter-con">
                                <div class="el-select w160">
                                    <el-cascader
                                            ref="regionElCascader"
                                            @change="searchRegionChange"
                                            :disabled="isDisabled"
                                            v-model="search.regionCode"
                                            :options="regionOptions"
                                            :props="{ checkStrictly: true }"
                                           >
                                    </el-cascader>
                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-label">企业类型：</div>
                            <div class="filter-con">
                                <div class="el-select w124">
                                    <el-select v-model="search.entType"  clearable>
                                        <el-option
                                                v-for="item in entTypeOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-label">达标情况：</div>
                            <div class="filter-con">
                                <div class="el-select w124">
                                    <el-select v-model="search.standardSituation"  clearable>
                                        <el-option
                                                v-for="item in standardSituationOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-con">
                                <div class="el-input w180 el-input-group el-input--prefix">
                    <span class="el-input__prefix"><i class="el-input__icon el-icon-search"></i>
                    </span><input type="text" autocomplete="off" placeholder="搜索企业名称" v-model="search.entName"
                                  class="el-input__inner">
                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-btn">
                               <!-- <button type="button" @click="searchEntScreen" class="button-type">
                                    <span>查询</span></button>-->

                                <el-button type="button" size="medium"  @click="searchEntScreen" class="el-button el-button--primary">
                                    <span>查询</span></el-button>
                            </div>
                        </li>
                    </ul>

                </div>
                <div class="total-number" style="margin-left: 3px;">
                    <div class="total-name">全部企业{{count.all}}家</div>
                    <div class="total-text">达标企业<span class="num">{{count.one}}</span>家</div>
                    <div class="total-text is-offline">未达标企业<span class="num">{{count.three}}</span>家</div>
                </div>
                <table class="table-default">
                    <thead>
                    <tr>
                        <th style="text-align:center;width: 6%">序号</th>
                        <th style="text-align:center;width: 14%">企业名称</th>
                        <th style="text-align:center;width: 10%">企业类型</th>
                        <th style="text-align:center;width: 10%">所在地</th>
                        <th style="text-align:center;width: 10%">所属行业</th>
                        <th style="text-align:center;width: 10%">联系人</th>
                        <th style="text-align:center;width: 10%">电话</th>
                        <th style="text-align:center;width: 10%">
                            达标分值
                            <i v-if="search.descStatus==1" class="el-icon-caret-top" @click="standardValueIsDesc(0)"></i>
                            <i v-if="search.descStatus==0" class="el-icon-caret-bottom" @click="standardValueIsDesc(1)"></i>
                        </th>
                        <th style="text-align:center;width: 10%">达标情况</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in dataList">
                        <td style="text-align:center;width: 6%">{{(cur_page-1)*pageSize+index+1}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 14%" :title="item.entName">{{item.entName}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.entTypeStr">{{item.entTypeStr}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.regionName">{{item.regionName}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.categoryName">{{item.categoryName}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.contacts">{{item.contacts}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.contactsPhone">{{item.contactsPhone}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" :title="item.standardValue">{{item.standardValue}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%" >
                            <div v-if="item.standardSituationStr=='达标'" class="text-state">{{item.standardSituationStr}}</div>
                            <div v-if="item.standardSituationStr=='基本达标'" >{{item.standardSituationStr}}</div>
                            <div v-if="item.standardSituationStr=='不达标'" class="text-state state-off">{{item.standardSituationStr}}</div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="el-pagination is-background mt-lg">
                    <span class="el-pagination__total">共 {{total}}  家，每页显示</span>
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
    export default {
        name: "entScreen",
        data(){
            return {
                total:0,
                totalPage:0,
                cur_page: 1,
                isDisabled:false,
                pageSizes: this.AppConfig.appInfo.pageSizes,
                pageSize: this.AppConfig.appInfo.pageSize,
                regionCode:sessionStorage.getItem('regionCode'),
                regionLevel:this.AppConfig.appInfo.regionLevel,
                parentCode:this.AppConfig.appInfo.parentCode,
                regionName:this.AppConfig.appInfo.regionName,
                userRegionLevel:sessionStorage.getItem('regionLevel'),
                entTypeOptions: [{
                    value: '',
                    label: '全部企业'
                }, {
                    value: '1',
                    label: '重点企业'
                }, {
                    value: '2',
                    label: '一般企业'
                },{value: 3,label: "收集企业"},
                    {value: 4,label: "经营企业"}],
                standardSituationOptions:[{
                    value: '',
                    label: '全部'
                }, {
                    value: '1',
                    label: '达标'
                }, {
                    value: '2',
                    label: '基本达标'
                }, {
                    value: '3',
                    label: '不达标'
                }],
                search:{
                    regionCode:sessionStorage.getItem('regionCode'),
                    entType:'',
                    standardSituation:'',
                    entName:'',
                    regionName :this.AppConfig.appInfo.regionName,
                    regionLevel:sessionStorage.getItem('regionLevel'),
                    regionParentCode:'',
                    descStatus:1
                },
                dataList:[],
                count:{
                    all: 0,
                    one: 0,
                    two: 1,
                    three: 0
                },
                regionOptions:[],
            }
        },
        created: function () {
            this.search.descStatus = 1;
            if(this.search.regionLevel==3){
                this.isDisabled = true;
            }
            this.searchEntScreen();
            // 行政区域级联
            this.getRegionChildrenList();
        },
        methods:{
            standardValueIsDesc(isDescStatus){
                this.search.descStatus = isDescStatus;
                this.pageList();
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
            getRegionChildrenList(){
                var _this=this;
                _this.$axios.get('/api/regulatory/regionInfo/getRegionChildrenList',{params:{
                        "regionCode":_this.regionCode
                    }}).then(
                    function (res) {
                        if(res.code == 0){
                            _this.regionOptions = res.data;
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    console.log(error);
                });
            },
            searchEntScreen(){
                this.selectStandardSituationCountEnt();
                this.pageList();
            },
            selectStandardSituationCountEnt(){
                var _this=this;
                var params = new URLSearchParams();
                params.append('regionCode', _this.search.regionCode);
                _this.$axios.get('/api/regulatory/index/selectStandardSituationCountEnt',{params}).then(
                    function (res) {
                        if(res.code == 0){
                            let data = res.data;
                            _this.count.all = data.all;
                            _this.count.one = data.one;
                            _this.count.two = data.two;
                            _this.count.three = data.three;
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    console.log(error);
                });
            },
            pageList(){
                var _this=this;
                var params = new URLSearchParams();
                params.append('page', _this.cur_page);
                params.append('limit', _this.pageSize);
                params.append('regionCode', _this.search.regionCode);
                params.append('entType', _this.search.entType);
                params.append('standardSituation', _this.search.standardSituation);
                params.append('entName', _this.search.entName);
                params.append('descStatus', _this.search.descStatus);
                _this.$axios.get('/api/regulatory/index/selectStandardSituationCountEntPage',{params}).then(
                    function (res) {
                        if(res.code == 0){
                            _this.dataList = res.data.records;
                            _this.totalPage = res.data.pages;
                            _this.total = res.data.total;
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
            }
        }
    }
</script>

<style>
    /*button{
        outline:none;
    }*/
    .dabiao{
        width: 70px;height: 20px;background: #5daf34;text-align: center;;
    }
    .jbdabiao{
        width: 70px;height: 20px;background: #f3d9b3;text-align: center;
    }
    .budabiao{
        width: 70px;height: 20px;background: #f56c6c;text-align: center;;
    }
</style>
