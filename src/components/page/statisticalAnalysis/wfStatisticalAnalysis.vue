<template>
  <div class="main">
    <div class="main-top">
      <div class="breadcrumb">
        <a href="#">
          <i class="icon icon-zhuanyun"></i>
          <span class="text-primary-font">统计分析</span>
        </a>
        <span class="sep">&gt;</span>
        <span class="text-primary">危废统计分析</span>
      </div>
    </div>
    <div class="panel">
      <div class="panel-bd pdtlr-0" style="padding: 20px 20px 0px 20px">
        <div class="filter-more">
          <ul class="filter-box" style="padding-right: 20px;padding-left: 20px;">
            <li style="float:right">
              <RegionCascader
                style="width: 130px;"
                ref="regionCascader"
                @handleRegionChange="handleChange"
              ></RegionCascader>
            </li>
            <li class="filter-item" style="padding-right: 20px;float:right">
              <div>
                <el-select
                  v-model="value"
                  placeholder="请选择"
                  style="width:130px;"
                  @change="handleChangeYear"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </li>
            <li class="filter-item" style="padding-left: 40px;float: left;">
              <el-link type="primary" style="height:34px" @click="getDate1(7,'day')">近一周</el-link>
            </li>
            <li class="filter-item" style="padding-left: 40px;float: left;">
              <el-link type="primary" style="height:34px" @click="getDate1(30,'day')">近一月</el-link>
            </li>
            <li class="filter-item" style="padding-left: 40px;float: left;">
              <el-link type="primary" style="height:34px" @click="getDate1(365,'month')">近一年</el-link>
            </li>
            <li class="filter-item" style="float: left;">
              <div>
                <span style="height:34px">指定周期：</span>
                <el-date-picker
                  v-model="value1"
                  type="daterange"
                  range-separator="——"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="changeDate"
                  clearable
                ></el-date-picker>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 产废类型占比 储存量占比-->
    <div class="el-row mt-lg" style="margin-left: -10px; margin-right: -10px;">
      <div class="el-col el-col-12" style="padding-left: 10px; padding-right: 10px;">
        <div class="panel">
          <div class="panel-hd">
            <h2 class="panel-tit">
              <i class="icon icon-zongchanliang"></i>产废类型占比
            </h2>
            <!-- <div class="panel-right">
              <a href="javascript:;" class="more">更多</a>
            </div>-->
          </div>
          <div class="panel-bd">
            <div v-show="isCflxzb" class="chart-item" id="chartCflxzb" style="height: 270px"></div>
              <div v-show="!isCflxzb" style="height: 270px;text-align: center;line-height: 16;">暂无数据</div>
          </div>
        </div>
      </div>
      <div class="el-col el-col-12" style="padding-left: 10px; padding-right: 10px;">
        <div class="panel">
          <div class="panel-hd">
            <h2 class="panel-tit">
              <i class="icon icon-chuzhiliang"></i>储存量占比
            </h2>
            <!-- <div class="panel-right">
              <a href="javascript:;" class="more">更多</a>
            </div>-->
          </div>
          <div class="panel-bd">
            <div v-show="isCclzb1==true" class="chart-item" id="chartCclzb" style="height: 270px"></div>
            <div v-show="isCclzb1==false" style="height: 270px;text-align: center;line-height: 16;">暂无数据</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 产废量曲线 -->
    <div class="el-row mt-lg" style="margin-left: -10px; margin-right: -10px;">
      <div class="el-col el-col-24" style="padding-left: 10px; padding-right: 10px;">
        <div class="panel">
          <div class="panel-hd">
            <h2 class="panel-tit">
              <i class="icon icon-xiaolv"></i>产废量曲线
            </h2>
            <!-- <div class="panel-right">
              <a href="javascript:;" class="more">更多</a>
            </div>-->
          </div>
          <div class="panel-bd">
            <div class="chart-item" id="chartCflqx" style="height: 270px"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 储存量曲线-->
    <div class="el-row mt-lg" style="margin-left: -10px; margin-right: -10px;">
      <div class="el-row mt-lg" style="margin-left: -10px; margin-right: -10px;">
        <div class="el-col el-col-24" style="padding-left: 10px; padding-right: 10px;">
          <div class="panel">
            <div class="panel-hd">
              <h2 class="panel-tit">
                <i class="icon icon-xiaolv"></i>储存量曲线
              </h2>
              <!-- <div class="panel-right">
              <a href="javascript:;" class="more">更多</a>
              </div>-->
            </div>
            <div class="panel-bd">
              <div class="chart-item" id="chartCclqx" style="height: 270px"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- 转移量曲线-->
      <div class="el-row mt-lg" style="margin-left: -10px; margin-right: -10px;">
        <div class="el-col el-col-24" style="padding-left: 10px; padding-right: 10px;">
          <div class="panel">
            <div class="panel-hd">
              <h2 class="panel-tit">
                <i class="icon icon-xiaolv"></i>转移量曲线
              </h2>
              <!-- <div class="panel-right">
              <a href="javascript:;" class="more">更多</a>
              </div>-->
            </div>
            <div class="panel-bd">
              <div class="chart-item" id="chartZylqx" style="height: 270px"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import RegionCascader from "../../common/unit/RegionCascader";
export default {
  name: "PlatformHomepage",
  components: {
    RegionCascader
  },
  data() {
    return {
      isCclzb1:true,
      isCflxzb:true,
      EntInfoEpitomizeCountVos: [],
      xData: [],
      zclData: [],
      zyxl: 0,
      qnzyxl: 0,
      value: "2020",
      value1: [],
      adcd: this.getAdcd(this.AppConfig.appInfo.regionCode),
      // adcd: "",
      thisYear: 2020,
      cityOptions: [],
      timeType: "day",
      options: [],
      port: "/api/regulatory/"
    };
  },

  methods: {
    //初始化时间
    initOption() {
      this.options = [];
      let year = new Date().getFullYear();
      for (let a = 0; a < 10; a++) {
        let option = {};
        option.value = year - a;
        this.options.push(option);
      }
    },
    //产废类型占比
    selectEntinfoGroupByHazardousType() {
      var _this = this;
      _this.$axios
        .post(
          _this.port + "tEnterpriseInfo/selectEntinfoGroupByHazardousType",
          {
            startTime: _this.timestampToTime(_this.value1[0]),
            endTime: _this.timestampToTime(_this.value1[1]),
            adcd: _this.adcd
          }
        )

        .then(response => {
          if(response.data.length>0){
             _this.isCflxzb=true;
               _this.$nextTick(() => {
          let legendData = [];
          response.data.forEach((item, i) => {
            if (item.name) {
              legendData.push(item.name);
            } else {
              response.data.splice(i, 1);
            }
          });
          _this.initPie(
            legendData,
            response.data,
            "chartCflxzb",
            "area",
            [30, 80],
            null,
            { show: false },
            ["#12D1B4", "#06B2EE", "#00CE61", "#A486F9", "#F08870", "#F4DB63"]
          );})}else{
            _this.isCflxzb=false;
          }
        })
        .catch(error => {
          // catch 指请求出错的处理
          console.log(error);
        });
    },
    //储存量占比
    selectEntinfoGroupByStorage() {
      var _this = this;
      _this.$axios
        .post(_this.port + "tEnterpriseInfo/selectEntinfoGroupByStorage", {
          startTime: _this.timestampToTime(_this.value1[0]),
          endTime: _this.timestampToTime(_this.value1[1]),
          adcd: _this.adcd
        })
        .then(response => {
          if(response.data.length>0){
             _this.isCclzb1=true;
             _this.$nextTick(()=>{
let total = 0;
          let legendData = [];
          response.data.forEach(item => {
            legendData.push(item.name);
            total += Number(item.value);
          });
          _this.initPie(
            legendData,
            response.data,
            "chartCclzb",
            false,
            [50, 80],
            [
              {
                //环形图中间添加文字
                type: "text", //通过不同top值可以设置上下显示
                left: "center",
                top: "50%",
                style: {
                  text:
                    total > 1000
                      ? (total / 1000).toFixed(2)
                      : total > 10000 * 1000
                      ? (total / 1000 / 10000).toFixed(2)
                      : total,
                  textAlign: "center",
                  fill: "black", //文字的颜色
                  width: 30,
                  height: 30,
                  fontSize: 25,
                  fontFamily: "PingFangHK-Semibold"
                }
              },
              {
                //环形图中间添加文字
                type: "text", //通过不同top值可以设置上下显示
                left: "center",
                top: "60%",
                style: {
                  text:
                    total > 1000
                      ? "总量(吨)"
                      : total > 10000 * 1000
                      ? "总量(万吨)"
                      : "总量(千克)",
                  textAlign: "center",
                  fill: "black", //文字的颜色
                  width: 30,
                  height: 30,
                  fontSize: 15,
                  fontFamily: "PingFangHK-Medium"
                }
              }
            ],
            { show: true },
            ["#12D1B4", "#06B2EE", "#00CE61", "#A486F9", "#F08870", "#F4DB63"]
          );
             })
          }else{
            _this.isCclzb1=false;
          }
        })
        .catch(error => {
          // catch 指请求出错的处理
          console.log(error);
        });
    },
    //产废量曲线
    selectWasteProductionCurve() {
      //debugger;
      var _this = this;
      _this.$axios
        .post(_this.port + "tEnterpriseInfo/selectWasteProductionCurve", {
          timeType: _this.timeType,
          startTime: _this.timestampToTime(_this.value1[0]),
          endTime: _this.timestampToTime(_this.value1[1]),
          adcd: _this.adcd
        })
        .then(response => {
          let xData = [];
          let zclData = [];
          response.data.forEach(item => {
            xData.push(item.name);
            zclData.push(Number(item.value));
          });
          _this.initChart(
            "千克",
            xData,
            zclData,
            "line",
            "chartCflqx",
            null,
            true,
            {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(56,126,232,.20)"
                  },
                  {
                    offset: 1,
                    color: "rgba(56,126,232,0.05)"
                  }
                ],
                false
              )
            },
            null
          );
        })
        .catch(error => {
          // catch 指请求出错的处理
          console.log(error);
        });
    },
    handleChangeYear(value) {
      var now = new Date();
      var end = "";
      if (value == now.getFullYear()) {
        end = new Date(value, now.getMonth(), now.getDate());
      } else {
        end = new Date(value, 11, 31);
      }
      const start = new Date(value, 0, 1);
      this.value1 = [];
      this.value1.push(start);
      this.value1.push(end);
      this.timeType = "month";
      this.init();
    },
    //贮存量曲线
    selectStorageCurve() {
      var _this = this;
      _this.$axios
        .post(_this.port + "tEnterpriseInfo/selectStorageCurve", {
          timeType: _this.timeType,
          startTime: _this.timestampToTime(_this.value1[0]),
          endTime: _this.timestampToTime(_this.value1[1]),
          adcd: _this.adcd
        })
        .then(response => {
          let xData = [];
          let zclData = [];
          response.data.forEach(item => {
            xData.push(item.name);
            zclData.push(Number(item.value));
          });
          _this.initChart(
            "千克",
            xData,
            zclData,
            "bar",
            "chartCclqx",
            null,
            false,
            null,
            {
              barBorderRadius: [4, 4, 0, 0],
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(56,126,232,1)"
                  },
                  {
                    offset: 1,
                    color: "rgba(175,203,245,1)"
                  }
                ],
                false
              )
            }
          );
        })
        .catch(error => {
          // catch 指请求出错的处理
          console.log(error);
        });
    },
    //转移量曲线
    selectTransferCurve() {
      var _this = this;
      _this.$axios
        .post(_this.port + "tEnterpriseInfo/selectTransferCurve", {
          timeType: _this.timeType,
          startTime: _this.timestampToTime(_this.value1[0]),
          endTime: _this.timestampToTime(_this.value1[1]),
          adcd: _this.adcd
        })
        .then(response => {
          let xData = [];
          let zclData = [];
          response.data.forEach(item => {
            xData.push(item.name);
            zclData.push(Number(item.value));
          });
          _this.initChart(
            "L",
            xData,
            zclData,
            "line",
            "chartZylqx",
            null,
            false,
            {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(56,126,232,.20)"
                  },
                  {
                    offset: 1,
                    color: "rgba(56,126,232,0.05)"
                  }
                ],
                false
              )
            },
            null
          );
        })
        .catch(error => {
          // catch 指请求出错的处理
          console.log(error);
        });
    },
    getDate1(day, timeType) {
      var now = new Date();
      const end = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        now.getMinutes()
      );

      const start = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - day,
        now.getHours(),
        now.getMinutes()
      );
      this.value1 = [];
      this.value1.push(start);
      this.value1.push(end);
      this.timeType = timeType;
      this.init();
    },
    changeDate() {
      this.timeType = "day";
      this.init();
    },
    initChart(
      yname,
      xData,
      Data,
      type,
      id,
      color,
      smooth,
      areaStyle,
      itemStyle
    ) {
      var chart = echarts.init(document.getElementById(id), "skinUpp");
      chart.setOption({
        color: color,
        xAxis: {
          type: "category",
          data: xData,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: "8%",
          right: "4%",
          bottom: "10%",
          top: "15%"
        },
        yAxis: {
          name: yname,
          type: "value",
          axisTick: {
            show: false
          }
        },
        series: [
          {
            data: Data,
            type: type,
            barWidth: 20,
            smooth: smooth,
            areaStyle: areaStyle,
            itemStyle: itemStyle
          }
        ]
      });
    },
    initPie(legendData, Data, id, roseType, radius, graphic, label, color) {
      var chart = echarts.init(document.getElementById(id), "skinUpp");
      chart.setOption({
        color: color,
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "right",
          data: legendData
        },
        graphic: graphic,
        series: [
          {
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: Data,
            label: label,
            radius: radius,
            roseType: roseType,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1) + "-"
          : date.getMonth() + 1 + "-";
      var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      return Y + M + D;
    },
    handleChange(value) {
      // this.adcd = this.getAdcd(value);
      this.adcd = "";
      this.init();
    },
    getAdcd(adcd) {
      while (true) {
        if (adcd.endsWith("00")) {
          adcd = adcd.substring(0, adcd.length - 2);
        } else {
          return adcd;
        }
      }
    },
    init() {
      this.selectEntinfoGroupByHazardousType();
      this.selectEntinfoGroupByStorage();
      this.selectWasteProductionCurve();
      this.selectStorageCurve();
      this.selectTransferCurve();
    }
  },
  mounted() {
    this.initOption();
    this.getDate1(7, "day");
  }
};
</script>
<style scoped>
</style>
