<template>
    <div class="main">
        <div class="page-title">总览</div>
        <div class="panel">
            <div class="panel-hd">
                <h2 class="panel-tit"><i class="icon icon-qiyejianguan"></i><span>企业监管</span></h2>
            </div>
            <div class="panel-bd">
                <div class="list-count">
                    <div class="row row-gap">
                        <div class="col-8">
                            <div class="count-item item01">
                                <div class="count-num"><strong>{{dataOne.number}}</strong>个</div>
                                <div class="count-name">辖区企业数</div>
                                <div class="count-icon count-company"></div>
                            </div>
                        </div>
                        <div class="col-8">
                            <div class="count-item item02">
                                <div class="count-num"><strong>{{getDun(dataOne.inventory)}}</strong>吨</div>
                                <div class="count-name">当前库存量</div>
                                <div class="count-icon count-stock"></div>
                            </div>
                        </div>
                        <div class="col-8">
                            <div class="count-item item03">
                                <div class="count-num"><strong>{{dataOne.rate}}</strong>%</div>
                                <div class="count-name">贮存率</div>
                                <div class="count-icon count-percentage"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="box-count mt">
            <div class="row row-gap">
                <div class="col-8">
                    <div class="count-item">
                        <div class="count-icon"><i class="icon icon-shiyou"></i></div>
                        <div class="count-sub">
                            <div class="count-num"><strong>{{getDun(strToNull(entNumSumBigVo.inventory))}}</strong>吨</div>
                            <div class="count-name">本月产废量</div>
                        </div>
                        <div class="count-sub">
                            <div class="count-num"><strong class="text-down">{{getDun(countUpNumber(entNumSumBigVo.rate,entNumSumBigVo.yesToday))}}</strong>
                                <i :class="countUp(entNumSumBigVo.rate,entNumSumBigVo.yesToday)"></i>
                            </div>
                            <div class="count-name">今日变化</div>
                        </div>
                    </div>
                </div>
                <div class="col-8">
                    <div class="count-item">
                        <div class="count-icon"><i class="icon icon-ruku"></i></div>
                        <div class="count-sub">
                            <div class="count-num"><strong>{{getDun(strToNull(entNumSumBigVos.inventory))}}</strong>吨</div>
                            <div class="count-name">本月入库量</div>
                        </div>
                        <div class="count-sub">
                            <div class="count-num"><strong class="text-down">{{getDun(countUpNumber(entNumSumBigVos.rate,entNumSumBigVos.yesToday))}}</strong>
                                <i :class="countUp(entNumSumBigVos.rate,entNumSumBigVos.yesToday)"></i>
                            </div>
                            <div class="count-name">今日变化</div>
                        </div>
                    </div>
                </div>
                <div class="col-8">
                    <div class="count-item">
                        <div class="count-icon"><i class="icon icon-chuku"></i></div>
                        <div class="count-sub">
                            <div class="count-num"><strong>{{getDun(strToNull(entNumSumBig.inventory))}}</strong>吨</div>
                            <div class="count-name">本月出库量</div>
                        </div>
                        <div class="count-sub">
                            <div class="count-num"><strong class="text-down">{{getDun(countUpNumber(entNumSumBig.rate,entNumSumBig.yesToday))}}</strong>
                                <i :class="countUp(entNumSumBig.rate,entNumSumBig.yesToday)"></i>
                            </div>
                            <div class="count-name">今日变化</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="panel mt">
            <div class="panel-hd">
                <h2 class="panel-tit"><i class="icon icon-shiyou"></i><span>实时贮存量(吨)</span>
                    <el-button-group style="margin-left: 20px">
                        <el-button type="primary" :class="cla==1?'butAll':'butAllUn'" plain size="small" @click="butNnum(1,'')">全部</el-button>
                        <el-button type="primary" :class="cla==2?'butAll':'butAllUn'" plain size="small" @click="butNnum(2,'HW08')">废矿物油</el-button>
                        <el-button type="primary" :class="cla==3?'butAll':'butAllUn'" plain size="small" @click="butNnum(3,'HW03')">医疗废物</el-button>
                    </el-button-group></h2>

            </div>
            <div class="panel-bd">
                <div class="row row-gap">
                    <div class="col-15 col-md-16 col-lg-18">
                        <div class="chart-item" id="chartFysscl" style="height: 244px"></div>
                    </div>
                    <div class="col-9 col-md-8 col-lg-6">
                        <div class="box-count box-count-icon-none">
                            <div class="count-item">
                                <div class="count-sub">
                                    <div class="count-num"><strong>{{getDun(dataFive.cumulativeTotal)}}</strong>吨</div>
                                    <div class="count-name">{{title}}累计总量(吨)</div>
                                </div>
                                <div class="count-sub">
                                    <div class="count-num"><strong class="text-down">{{getDun(countUpNumber(dataFive.today,dataFive.yesToday))}}</strong>
                                        <i :class="countUp(dataFive.today,dataFive.yesToday)"></i>
                                    </div>
                                    <div class="count-name">今日变化</div>
                                </div>
                            </div>
                            <div class="count-item mt">
                                <div class="count-sub">
                                    <div class="count-num"><strong>{{getDun(strToNull(dataFive.disport))}}</strong>吨</div>
                                    <div class="count-name">{{title}}累计处置量(吨)</div>
                                </div>
                                <div class="count-sub">
                                    <div class="count-num"><strong class="text-number">{{getDun(strToNull(dataFive.transferred))}}</strong></div>
                                    <div class="count-name">待转运(吨)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row row-gap mt">
            <div class="col-12">
                <div class="panel">
                    <div class="panel-hd">
                        <h2 class="panel-tit"><i class="icon icon-pie"></i><span>库存危废类型占比</span></h2>
                        <div class="panel-hd-right"><a href="#" class="more"></a></div>
                    </div>
                    <div class="panel-bd">
                        <div class="chart-item" id="chartKcwflxzb" style="height: 282px"></div>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="panel">
                    <div class="panel-hd">
                        <h2 class="panel-tit"><i class="icon icon-bar"></i><span>企业危废贮存量TOP10</span></h2>
                        <div class="panel-hd-right"><a href="#" class="more"></a></div>
                    </div>
                    <div class="panel-bd">
                        <div class="chart-item" id="chartKcwfcl" style="height: 282px"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row row-gap mt">
            <div class="col-12">
                <div class="panel" style="height: 573px;overflow: auto">
                    <div class="panel-hd">
                        <h2 class="panel-tit"><i class="icon icon-warning"></i><span>企业预警</span></h2>
                        <div class="panel-hd-right"><a href="#" class="more" @click="goRoutle('/homeAlarmList')">更多</a></div>
                    </div>
                    <div class="panel-bd">
                        <table class="table">
                            <colgroup>
                                <col style="width: 60px;">
                                <col style="width: 25%;">
                                <col style="width: 15%;">
                                <col style="width: 27%;">
                                 <col style="width: 15%;">
                            </colgroup>
                            <thead>
                            <tr>
                                <th class="text-center">序号</th>
                                <th>企业名称</th>
                                <th>报警时间</th>
                                <th>报警类型</th>
                                <th>状态</th>
                                <!-- <th>说明</th> -->
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for=" (item,index) in dataTwo">
                                <td class="text-center">{{index<9?'0'+(++index):++index}}</td>
                                <td :title="item.name">{{item.name}}</td>
                                <td>{{formatterDate(item.time,'MM-dd hh:mm')}}</td>
                                <td :title="statusToType(item.typeName)">{{statusToType(item.typeName)}}</td>
                                <td>{{statusTo(item.status)}}</td>
                                <!-- <td :title="item.remark">{{item.remark}}</td> -->
                            </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-12"  style="height: 580px;overflow: auto ">
                <div class="panel" style="height: 580px;overflow: auto ">
                    <div class="panel-hd">
                        <h2 class="panel-tit"><i class="icon icon-xinxibiao"></i><span>出入库信息表</span></h2>
                    </div>
                    <div class="panel-bd">
                        <div class="step-box" >
                            <ol class="step-list">
                                <li :class="liToClass(index,item.status)" v-for="(item,index) in dataThree">
                                    <div class="step-time">
                                        <span class="time-text" v-if="index==0">{{formatterDateSta(item.time,'MM.dd hh:mm')}}</span>
                                        <span class="time-text" v-if="index>0">{{ formatterDate(item.time,'MM.dd hh:mm')}}</span>
                                    </div>
                                    <div class="step-icon">
                                        <span class="step-num"></span>
                                        <div class="step-line"></div>
                                    </div>
                                    <div class="step-con">
                                        <div class="step-tit">{{stepTit(item.status)}}</div>
                                        <div class="step-text">
                                            <span :title="item.name">{{item.name}}</span>
                                            <span>{{item.typeName}}</span><span>{{getDun(item.number)}}吨</span>
                                        </div>
                                    </div>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HomePage",
        mounted() {
            this.initJs();
            this.loadingData();
            this.queryMonthAmountByRegionCode();
            this.queryEntAlarmByRegionCode();
            this.queryInOutInformationByRegionCode();
            this.queryTypeByRegionCode();
            this.queryTopTwnByRegionCode();
            this.setTimeAdd();
            // setTimeout(this.queryInOutInformationByRegionCode,1000)
        },
        data(){
            return{
                regionCode:sessionStorage.getItem('regionCode'),
                dataOne:{
                    number:'',
                    inventory:'',
                    rate:'',
                },
                entNumSumBigVo:{
                    inventory:'',
                    yesToday:'',
                    rate:'',
                },
                entNumSumBigVos:{
                    inventory:'',
                    yesToday:'',
                    rate:'',
                },
                entNumSumBig:{
                    inventory:'',
                    yesToday:'',
                    rate:'',
                },
                dataTwo:[],
                dataThree:[],
                dataFive:{
                    hours:'',
                    today:'',
                    yesToday:'',
                    disport:'',
                    transferred:'',
                    cumulativeTotal:'',
                },
                interval:null, //定时器名称
                number:null, //定时器名称
                cla:1,
                dicCode:"",
                title:''
            }
        },
        methods:{
            butNnum:function(num,str){
                this.cla=num;
                this.dicCode=str;
                if(str == 'HW08'){
                    this.title = '废矿物油'
                }else if(str == 'HW03') {
                    this.title = '医疗废物'
                }else{
                    this.title = ''
                }
                this.initJs();
            },
            //KG转换吨
            getDun: function (str) {
                if(null==str||str==''||str==0){
                    return 0;
                }else {
                    let number = str / 1000;
                    return number.toFixed(2);
                }
                // return str;
            },
            formatterDateSta(value,str){
                if(value!=null){
                    let format = new Date().format('yyyy-MM-dd hh:mm:ss');
                    if(format>value){
                        let timeDifference = this.TimeDifference(value,format);
                        if(timeDifference<=5){
                            return  '刚刚'
                        }else {
                            let val= new Date(value).format(str);
                            return val;
                        }
                    }

                }else{
                    return '--';
                }
            },
            formatterDate(value,str){
                if(value!=null){
                    let val= new Date(value).format(str);
                    return val;
                }else{
                    return '--';
                }
            },
            //计算时间差-分钟
            TimeDifference:function (time1, time2) {
                //判断开始时间是否大于结束日期

                //截取字符串
                var begin1 = time1.substr(0, 10).split("-");
                var end1 = time2.substr(0, 10).split("-");

                //将拆分的数组重新组合，并实例成化新的日期对象
                var date1 = new Date(begin1[0] + - + begin1[1] + - + begin1[2]);
                var date2 = new Date(end1[0] + - + end1[1] + - + end1[2]);

                //得到两个日期之间的差值m，以分钟为单位
                var m = parseInt(Math.abs(date2 - date1) / 1000 / 60);

                //小时数和分钟数相加得到总的分钟数
                //time1.substr(11,2)截取字符串得到时间的小时数
                //parseInt(time1.substr(11,2))*60把小时数转化成为分钟
                var min1 = parseInt(time1.substr(11, 2)) * 60 + parseInt(time1.substr(14, 2));
                var min2 = parseInt(time2.substr(11, 2)) * 60 + parseInt(time2.substr(14, 2));

                //两个分钟数相减得到时间部分的差值，以分钟为单位
                var n = min2 - min1;

                var sec1 = parseInt(time1.substr(17, 2)) / 60;
                var sec2 = parseInt(time2.substr(17, 2)) / 60;
                var s = sec2 - sec1;

                //将日期和时间两个部分计算出来的差值相加，即得到两个时间相减后的分钟数
                var minutes = m + n+s;
                return minutes.toFixed(2);
            },
            goRoutle:function(str){
                this.$router.push(str);
            },
            setTimeAdd:function(){
                    this.interval = window.setInterval(() => {
                        //监听 1 分钟 企业预警
                        setTimeout(this.queryEntAlarmByRegionCode(), 0)
                    }, 60000*5);
                },
            // setTimeAddTwo:function(){
            //     let number = window.setInterval(() => {
            //         //监听 1 分钟 出入库信息表
            //         setTimeout(this.queryInOutInformationByRegionCode(), 0)
            //     }, 60000);
            //     },
            liToClass:function(str){
                if(str==0){
                    return 'is-active'
                }else {
                    if(str%2==0){
                        return 'is-out-lx'
                    } else {
                        return 'is-out'
                    }
                }

            },
            stepTit:function(str){
                if(str==1){

                    return '入库'
                }
                if(str==2){

                    return '出库'
                }
            },
            statusToType:function(str){
              if(str==1){
                  return '企业连续5天未更新企业台账';
              }
              if(str==2){
                  return '企业储藏设施变动异常';
              }
              if(str==3){
                  return '企业危费储存即将超时';
              }
            },
            statusTo:function(str){
              if(str==0){
                  return '未处理';
              }
              if(str==1){
                  return '已处理';
              }
            },
            countUpNumber:function(now,yesToday){
                let strToNull = this.strToNull(now);
                let strToNull1 = this.strToNull(yesToday);
                let num=   (strToNull-strToNull1);
                let numStr = num.toString();
                let index = numStr.indexOf('.');
                let result = numStr.slice(0, index + 3);
                return result;
            },
            countUp:function(now,yesToday){
                    if(now>=yesToday){
                        return 'count-up'
                    }else {
                        return 'count-down'
                    }
            },
            //
            strToNull:function(str){
                if(null==str||str==''){
                    return 0;
                }else {
                    return str;
                }
            },
            //查询企业信息
            loadingData() {
                var _this = this;
                // let url = "http://localhost:8006/home/queryNumSumBigByRegionCode/";
                let url = "/api/regulatory/home/queryNumSumBigByRegionCode/";
                let params = new URLSearchParams();
                params.append("regionCode",_this.regionCode);
                _this.$nextTick(() => {
                    _this.$axios.post(url,params).then((response) => {
                        if(response.code == 0) {
                            _this.dataOne = response.data;
                        }
                    }).catch((error) => {
                        // catch 指请求出错的处理
                        console.log(error);
                    });
                })
            },
            //查询企业预警接口
            queryEntAlarmByRegionCode() {
                console.log(new Date().format('yyyy-MM-dd hh:mm:ss'));
                var _this = this;
                // let url = "http://localhost:8006/home/queryEntAlarmByRegionCode/";
                let url = "/api/regulatory/home/queryEntAlarmByRegionCode/";
                let params = new URLSearchParams();
                params.append("page",'1');
                params.append("size",'10');
                params.append("regionCode",_this.regionCode);
                _this.$nextTick(() => {
                    _this.$axios.post(url,params).then((response) => {
                        if(response.code == 0) {
                            _this.dataTwo = response.data.records;
                        }
                    }).catch((error) => {
                        // catch 指请求出错的处理
                        console.log(error);
                    });
                });
                _this.queryInOutInformationByRegionCode();
            },
            //查询出入库信息表接口
            queryInOutInformationByRegionCode() {
                console.log(new Date().format('yyyy-MM-dd hh:mm:ss'));
                var _this = this;
                // let url = "http://localhost:8006/home/queryInOutInformationByRegionCode/";
                let url = "/api/regulatory/home/queryInOutInformationByRegionCode/";
                let params = new URLSearchParams();
                params.append("regionCode",_this.regionCode);
                params.append("page",'1');
                params.append("size",'10');
                _this.$nextTick(() => {
                    _this.$axios.post(url,params).then((response) => {
                        if(response.code == 0) {
                            _this.dataThree = response.data;
                        }
                    }).catch((error) => {
                        // catch 指请求出错的处理
                        console.log(error);
                    });
                })
            },
            //查询本月产废转入转出量接口
            queryMonthAmountByRegionCode() {
                var _this = this;
                // let url = "http://localhost:8006/home/queryMonthAmountByRegionCode/";
                let url = "/api/regulatory/home/queryMonthAmountByRegionCode/";
                let params = new URLSearchParams();
                params.append("regionCode",_this.regionCode);
                _this.$nextTick(() => {
                    _this.$axios.post(url,params).then((response) => {
                        if(response.code == 0) {
                            _this.entNumSumBigVo = response.data.entNumSumBigVo;
                            _this.entNumSumBigVos = response.data.entNumSumBigVos;
                            _this.entNumSumBig = response.data.entNumSumBig;
                        }
                    }).catch((error) => {
                        // catch 指请求出错的处理
                        console.log(error);
                    });
                })
            },
            queryTypeByRegionCode:function(){
                var _this = this;
                // let url = "http://localhost:8006/home/queryTypeByRegionCode/";
                let url = "/api/regulatory/home/queryTypeByRegionCode/";
                let params = new URLSearchParams();
                params.append("regionCode",_this.regionCode);
                _this.$nextTick(() => {
                    _this.$axios.post(url,params).then((response) => {
                        if(response.code == 0) {
                            //库存危废类型占比de
                            var data03 =[];
                            var chartKcwflxzb = echarts.init(document.getElementById('chartKcwflxzb'), 'skinUpp');
                            for(let i=0;i<response.data.length;i++){
                                let obj =new Object();
                                obj.name=response.data[i].hours;
                                obj.value=_this.getDun(response.data[i].cumulativeTotal);
                                obj.valueS=response.data[i].cumulativeTotal;
                                data03.push(obj);
                            }
                            var option = {
                                baseOption:{
                                    //浮层
                                    tooltip: {
                                        trigger: 'item',
                                        confine: true,
                                        //formatter: "{a} <br/>{b}: {c} ({d}%)" //{a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
                                    },
                                    //图例
                                    legend: {
                                        textStyle: {
                                            color: '#666666',
                                        },
                                        orient: 'vertical',
                                        top: 'center',
                                        right: '10%',
                                        left: "auto",
                                        itemGap: 10,
                                        itemWidth: 8,
                                        itemHeight: 8,
                                        icon: 'circle',
                                        formatter:  function(name){
                                            var total = 0;
                                            var target;
                                            for (var i = 0, l = data03.length; i < l; i++) {
                                                total += data03[i].valueS;
                                                if (data03[i].name == name) {
                                                    target = data03[i].valueS;
                                                }
                                            }
                                            var arr = [];
                                            if(total!=null&&total>0){
                                                arr = [
                                                    '{nameText|'+name+'}',
                                                    '{nameText|'+'('+((target/1000).toFixed(2))+'吨)}',
                                                    '{numText|'+((target/total)*100).toFixed(2)+'%}'
                                                ]
                                            }else{
                                                arr = [
                                                    '{nameText|'+name+'}',
                                                    '{nameText|'+'('+((target/1000).toFixed(2))+'吨)}',
                                                    '{numText|'+""+'}'
                                                ]
                                            }

                                            return arr.join('')
                                        },
                                        textStyle:{
                                            rich:{
                                                nameText:{
                                                    align:'left',
                                                    padding: [0, 0, 0, 0],
                                                    width: 60,
                                                },
                                                numText:{
                                                    align:'right',
                                                    width: 50,
                                                    color: '#333',
                                                    fontWeight: 500
                                                },
                                            }
                                        }
                                    },
                                    series: [{
                                        name: '库存危废类型占比',
                                        type: 'pie',
                                        radius: ['22%', '90%'],
                                        center: ['32%', '50%'],
                                        roseType: 'radius',
                                        //文字标签
                                        label: {
                                            show: false,
                                            position: 'outside', //标签的位置。默认outside，可选inside，center
                                            formatter: '{d}%', //{a}：系列名。{b}：数据名。{c}：数据值。{d}：百分比。
                                            color: "#333"
                                        },
                                        itemStyle: {
                                            shadowColor: 'rgba(0,0,0,.2)',
                                            shadowBlur: 10,
                                        },
                                        data: data03,
                                        startAngle: 270, //起始角度
                                    }, {
                                        //遮罩层
                                        type: 'pie',
                                        radius: ['22%', '28%'],
                                        center: ['32%', '50%'],
                                        label: {
                                            show: false,
                                        },
                                        itemStyle: {
                                            color: 'rgba(255,255,255,.2)'
                                        },
                                        hoverOffset: 0,
                                        zlevel: 3,
                                        data: data03,
                                    }]
                                },
                                // 处理不同分辨率下位置
                                media: [
                                    {
                                        query: {
                                            minWidth: 500
                                        },
                                        option: {       // 这里写此规则满足下的option。
                                            series: [
                                                {
                                                    center: ['40%', '50%'],
                                                },
                                                {
                                                    center: ['40%', '50%'],
                                                }
                                            ]
                                        },
                                    },
                                    {
                                        query: {
                                            minWidth: 800
                                        },
                                        option: {
                                            legend: {
                                                right: '20%',
                                            },
                                        },
                                    }
                                ],

                            };
                            chartKcwflxzb.setOption(option);
                            $(window).on('resize',function(){
                                chartKcwflxzb.resize();
                            })
                        }
                    }).catch((error) => {
                        // catch 指请求出错的处理
                        console.log(error);
                    });
                })
            },
            // 库存危废储量TOP10
            queryTopTwnByRegionCode:function(){
                // 库存危废储量TOP10
                let _this = this;
                // let url = "http://localhost:8006/home/queryTopTwnByRegionCode/";
                let url = "/api/regulatory/home/queryTopTwnByRegionCode/";
                let params = new URLSearchParams();
                params.append("regionCode",_this.regionCode);
                _this.$nextTick(() => {
                    _this.$axios.post(url,params).then((response) => {
                       if(response.code==0){
                           let sericeData=[];
                           let  legendData= [];
                           for (let i = 0; i < response.data.length; i++) {
                               let arr=new Array();
                               arr.push((1+i)+'.'+response.data[i].hours);
                               legendData.push((1+i)+'.'+response.data[i].hours);
                               arr.push(_this.getDun(response.data[i].cumulativeTotal));
                               sericeData.push(arr);
                           }
                           var chartKcwfcl = echarts.init(document.getElementById('chartKcwfcl'),'skinUpp');
                           var option = {
                               //提示框
                               tooltip : {
                                   trigger: 'axis',
                               },
                               // x轴
                               // xAxis: {
                               //     type: 'category',
                               //     data: legendData,
                               //     boundaryGap: true,
                               //     axisLabel: {
                               //         show: true,
                               //         rotate: 310,
                               //         interval: 0,
                               //         color:'#666'
                               //     }
                               // },
                               xAxis: [{
                                   type: 'category',
                                   data: legendData,
                                   boundaryGap: true,
                                   axisTick: {
                                       show: false,
                                   },
                                   axisLine: {
                                       show: false
                                   },
                                   axisLabel: {
                                       show: true,
                                       interval: 0,
                                       rotate: 310,
                                       formatter: function (value) {
                                           return (value.length > 6 ? (value.slice(0,6)+"...") : value )
                                       },
                                       textStyle: {
                                           color: '#666',
                                           fontSize: 12,
                                       }
                                   },
                                   triggerEvent: true // 设置为true后，可触发事件。实现x轴文字过长，显示省略号，hover上去显示全部的功能
                               }],
                               grid:{
                                   bottom: 15,
                                   top: 30,
                               },
                               // y轴
                               yAxis: {
                                   type: 'value',
                                   name: '吨',
                                   nameTextStyle: {
                                       color: '#999'
                                   },
                               },
                               // 数据
                               series : [
                                   {
                                       type: 'bar',
                                       data:sericeData,
                                       barWidth: 24,
                                       label: {
                                           show: true,
                                           position: "top",
                                           // formatter: '{d}',
                                       },
                                       itemStyle: {
                                           barBorderRadius: [4, 4, 0, 0],
                                           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                               offset: 0,
                                               color: 'rgba(56,126,232,1)'
                                           }, {
                                               offset: 1,
                                               color: 'rgba(175,203,245,1)'
                                           }], false),
                                       },
                                   }
                               ],
                           };
                           chartKcwfcl.setOption(option);
                           $(window).on('resize',function(){
                               chartKcwfcl.resize();
                           })
                       }
                    }).catch((error) => {
                        // catch 指请求出错的处理
                        console.log(error);
                    });
                })
            },
            // 废油实时储量 (吨)
            initJs:function () {
                let _this = this;
                // let url = "http://localhost:8006/home/queryWasteOilByRegionCode/";
                let url = "/api/regulatory/home/queryWasteOilByRegionCode/";
                let params = new URLSearchParams();
                params.append("regionCode",_this.regionCode);
                params.append("type",_this.dicCode);
                _this.$nextTick(() => {
                    _this.$axios.post(url,params).then((response) => {
                        if(response.code==0){
                            _this.dataFive=response.data;
                            let sericeData=[];
                            let xAxisData=['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
                            if( response.data.list.length==0){
                                for (let i = 0; i < xAxisData.length; i++) {
                                    let arr=new Array();
                                    arr.push(xAxisData[i]);
                                    arr.push(0);
                                    sericeData.push(arr);
                                }
                            }else {
                                for (let j = 0; j < response.data.list.length; j++) {
                                    let arr=new Array();
                                    arr.push(response.data.list[j].hours);
                                    arr.push(_this.getDun(response.data.list[j].value));
                                    sericeData.push(arr);
                                }
                            }
                            // 废油实时储量 (吨)
                            var chartFysscl = echarts.init(document.getElementById('chartFysscl'), 'skinUpp');
                            var option = {
                                //提示框
                                tooltip: {
                                    trigger: 'axis',
                                    backgroundColor: '#fff',
                                    padding: [5, 10, 5, 10],
                                    textStyle: {
                                        color: '#666',
                                    },
                                    // formatter: '时间：{b0}<br />储量：{c}吨'
                                    formatter:  function (params,ticket,callback) {
                                        var res = '时间: ' + params[0].name;
                                //使用for可以将需要的数据全部加到res
                                //注意下边的<br/>
                                        for (var i = 0, l = params.length; i < l; i++) {
                                            res += '<br/>' +'储量: ' + params[i].value[1]+'吨';
                                        }
                                        return res;
                                    }
                                },
                                // x轴
                                xAxis: {
                                    type: 'category',
                                    data: xAxisData,
                                    boundaryGap: false,
                                    axisLabel: {
                                        show: true,
                                        //interval: 0,
                                    }
                                },
                                // y轴
                                yAxis: {
                                    type: 'value',
                                },
                                // 数据
                                series: [
                                    {
                                        type: 'line',
                                        data: sericeData,
                                        smooth: true,
                                        symbolSize: 0,
                                        itemStyle: {
                                            normal: {
                                                borderWidth: 3,
                                            },
                                        },
                                        lineStyle: {
                                            width: 3
                                        },
                                        areaStyle: {
                                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                                offset: 0,
                                                color: 'rgba(56,126,232,.20)'
                                            }, {
                                                offset: 1,
                                                color: 'rgba(56,126,232,0.05)'
                                            }], false),
                                        },
                                    }
                                ],
                            };
                            chartFysscl.setOption(option);
                            $(window).on('resize',function(){
                                chartFysscl.resize();
                            })
                        }
                    }).catch((error) => {
                        // catch 指请求出错的处理
                        console.log(error);
                    });
                })
            }
        },
        beforeDestroy(){
            clearInterval(this.interval);
            this.interval = null;
        }
    }
</script>

<style scoped>
.butAll{
    background:#33a7e1;
    border-color:#33a7e1;
    color:#FFF
}
.butAllUn{
    color:#0083c4;
    /*border-color:#0083c4*/
}
</style>
