<template>
    <!-- 左侧 -->
    <div class="sidebar">
        <ul class="sidebar-menu" v-html="addHtml">
            <!-- <li class="menu-item">
                  <a href="javascript:;" @click="jumpAddress('homePage')" data-toggle="tooltip" title="首页概览">
                      <i class="icon icon-shouye menu-icon"></i>
                      <span class="menu-text">首页概览</span>
                      <i class="icon icon-right menu-toggle"></i>
                  </a>
              </li>
                  <li class="menu-item">
                     <a href="javascript:;"  data-toggle="tooltip" title="智慧监管">
                         <i class="icon icon-zhihuijianguan menu-icon"></i>
                         <span class="menu-text">智慧监管</span>
                         <i class="icon icon-right menu-toggle"></i>
                     </a>
                     <ul class="menu-child">
                         <li><a href="#" @click="jumpAddress('wfMap')"><span class="menu-text">危废地图</span></a></li>
                         <li><a href="#" @click="jumpAddress('entScreen')"><span class="menu-text">企业合规筛查</span></a></li>
                         <li><a href="#" @click="jumpAddress('entEarlyWarn')"><span class="menu-text">企业异常预警</span></a></li>
                     </ul>
                 </li>
                 <li class="menu-item">
                     <a href="javascript:;" data-toggle="tooltip" title="产废企业监管">
                         <i class="icon icon-chanfeiqiyejianguan menu-icon"></i>
                         <span class="menu-text">产废企业监管</span>
                         <i class="icon icon-right menu-toggle"></i>
                     </a>
                     <ul class="menu-child">
                         <li><a href="#" @click="jumpAddress('videoMonitor')"><span class="menu-txt">企业视频监控</span></a></li>
                         <li><a href="#" @click="jumpAddress('enterpriseMonitor')"><span class="menu-txt">企业台账监控</span></a></li>
                         <li><a href="#" @click="jumpAddress('storageFacilityMonitoring')"><span class="menu-text">贮存设施监控</span></a></li>
                     </ul>
                 </li>

                 <li class="menu-item">
                     <a href="javascript:;" data-toggle="tooltip" title="申报登记">
                         <i class="icon icon-shenbaodengji menu-icon"></i>
                         <span class="menu-text">申报登记</span>
                         <i class="icon icon-right menu-toggle"></i>
                     </a>
                     <ul class="menu-child">
                         <li><a href="#" @click="jumpAddress('RegisterHomeList')"><span class="menu-txt">管理计划</span></a></li>
                         <li><a href="#" @click="jumpAddress('entManagementPlanReport')"><span class="menu-txt">管理计划备案登记</span></a></li>
                         <li><a href="#" @click="jumpAddress('entMonthReport')"><span class="menu-txt">产废月报</span></a></li>
                         <li><a href="#" @click="jumpAddress('entYearReport')"><span class="menu-txt">产废年报</span></a></li>
                     </ul>
                 </li>
                 <li class="menu-item">
                     <a href="javascript:;" data-toggle="tooltip" title="转移计划监管">
                         <i class="icon icon-zhuanyijihuajianguan menu-icon"></i>
                         <span class="menu-text">转移计划监管</span>
                         <i class="icon icon-right menu-toggle"></i>
                     </a>
                     <ul class="menu-child">
                         <li><a href="#" @click="jumpAddress('transferCity')"><span class="menu-txt">市内转移计划</span></a></li>
                         <li><a href="#" @click="jumpAddress('transferCityProvince')"><span class="menu-txt">跨省转移计划</span></a></li>
                     </ul>
                 </li>
                 <li class="menu-item">
                     <a href="javascript:;" data-toggle="tooltip" title="五联单查询">
                         <i class="icon icon-wuliandan menu-icon"></i>
                         <span class="menu-text">五联单查询</span>
                         <i class="icon icon-right menu-toggle"></i>
                     </a>
                     <ul class="menu-child">
                         <li><a href="#" @click="jumpAddress('cityFiveLinkedList')"><span class="menu-txt">市内五联单管理</span></a></li>
                         <li><a href="#" @click="jumpAddress('provincialFiveLinked')"><span class="menu-txt">跨省五联单管理</span></a></li>
                     </ul>
                 </li>
                 <li class="menu-item">
                     <a href="javascript:;" data-toggle="tooltip" title="统计分析">
                         <i class="icon icon-tongjifenxi menu-icon"></i>
                         <span class="menu-text">统计分析</span>
                         <i class="icon icon-right menu-toggle"></i>
                     </a>
                     <ul class="menu-child">
                         <li><a href="#" @click="jumpAddress('qyStatisticalAnalysis')"><span class="menu-txt">企业统计</span></a></li>
                         <li><a href="#" @click="jumpAddress('wfStatisticalAnalysis')"><span class="menu-txt">危废统计</span></a></li>
                     </ul>
                 </li>
                     <li class="menu-item">
                         <a href="javascript:;" data-toggle="tooltip" title="权限管理">
                             <i class="icon icon-quanxian menu-icon"></i>
                             <span class="menu-text">权限管理</span>
                             <i class="icon icon-right menu-toggle"></i>
                         </a>
                         <ul class="menu-child">
                             <li><a href="#"  @click="jumpAddress('roleList')"><span class="menu-txt">权限管理</span></a></li>
                         </ul>
                     </li>
                     <li class="menu-item">
                         <a href="javascript:;" data-toggle="tooltip" title="用户管理">
                             <i class="icon icon-yonghu menu-icon"></i>
                             <span class="menu-text">用户管理</span>
                             <i class="icon icon-right menu-toggle"></i>
                         </a>
                         <ul class="menu-child">
                             <li><a href="#"  @click="jumpAddress('userList')"><span class="menu-txt">用户管理</span></a></li>
                         </ul>
                     </li>
                     <li class="menu-item" v-if=" username == 'admin'">
                         <a href="javascript:;" data-toggle="tooltip" title="菜单管理">
                             <i class="icon icon-yonghu menu-icon"></i>
                             <span class="menu-text">菜单管理</span>
                             <i class="icon icon-right menu-toggle"></i>
                         </a>
                         <ul class="menu-child">
                             <li><a href="#"  @click="jumpAddress('menu')"><span class="menu-txt">菜单管理</span></a></li>
                         </ul>
                     </li>-->

        </ul>
    </div>
</template>

<script>
    export default {
        name: "AmfNavHtml",
        data() {
            return {
                menuData: [],
                entType:null,
                addHtml:'',
                typeName:'',
                username: sessionStorage.getItem('username')
            }
        },
        mounted() {
            this.query();
        },

        methods: {
            query(){
                var that = this;
                var url = '/api/permissions/sysMenu/queryMenuByRoleIdList';
                //var url = '/api2/sysMenu/queryMenuByRoleIdList';
                that.$axios.get(url,{
                }).then(function (res) {
                    if(res.code == 0){
                        that.menuData = res.data;
                        
                        if(res.data!=null){
                            that.addHtml = "";
                            var html = "";
                            for(var i = 0;i < res.data.length; i++){
                                var obj = res.data[i];
                                if(i == 0){
                                    if(null != obj.path && obj.path != ''){
                                        html = html +"<li class=\"menu-item active\"  onclick =\"returnAddress('"+obj.path+"')\">";
                                    }else{
                                        html = html +"<li class=\"menu-item active\">";
                                    }
                                }else{
                                    if(null != obj.path && obj.path != ''){
                                        html = html +"<li class=\"menu-item\"  onclick = \"returnAddress('"+obj.path+"')\">";
                                    }else{
                                        html = html +"<li class=\"menu-item\">";
                                    }
                                }

                                html = html +"<a href=\"#\"><i class=\""+obj.icon+"\"></i><span class=\"menu-txt\">"+obj.name+"</span>";
                                if(null != obj.children && obj.children.length>0){
                                    html = html +"<i class=\"icon icon-down menu-toggle\"></i></a><ul class=\"menu-child\">";
                                    for(var j = 0 ; j < obj.children.length ; j++){
                                        html = html + "<li onclick = \"returnAddress('"+obj.children[j].path+"')\"><a href=\"#\"><span class=\"menu-txt\">"+obj.children[j].name+"</span></a></li>";
                                    }
                                    html = html +" </ul>";
                                }else{
                                    html = html + "</a>";
                                }
                                html =   html+"</li>";
                            }
                            that.addHtml = html;

                            var oJs = document.createElement('script');
                            oJs.setAttribute("type", "text/javascript");
                            oJs.setAttribute("src", "static/css/js/sidebar.js"); //文件的地址 ,可为绝对及相对路径
                            document.getElementsByTagName("head")[0].appendChild(oJs); //绑定*/
                        }
                    }else{
                        that.$message.error("查询失败!")
                    }
                }).catch(function (err) {
                    console.log(err);
                    that.$message.error("查询失败!")
                })
            },
            jumpAddress (adress){
               
                if(null!=adress && adress!=""){
                   this.$router.push('/'+adress);
                }
            }
        },
    }
</script>

<style scoped>

</style>
