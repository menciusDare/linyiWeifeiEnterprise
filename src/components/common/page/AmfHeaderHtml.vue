<template>
    <!-- 头部 -->
    <div class="header">
        <h1 class="logo">
            <!-- -->
            <img class="logo-img" src="/static/css/images/logo.png" alt="">
            <span class="logo-text">危废全过程企业管理平台</span>
            <!--   <img class="logo-img" src="/static/css/images/12" alt="" style="width: 65px;height: 65px;transform: translate(0px,-19px);">
              <span class="logo-text">临沂市危废全过程企业管理平台</span> -->

        </h1>
        <!-- 展开收起按钮 -->
        <div class="sidebar-toggle" id="btn-toggle">
            <i class="icon icon-shouqi"></i>
        </div>
        <div class="header-user">
            <div class="user-avatar"><!--<img :src="portraitUrl" alt="" class="user-avatar-img">--></div>
            <div class="user-name">{{name}}</div>
            <div class="user-logout" @click="logout"><a href="#">退出</a></div>
        </div>
        <amfListHtml ref="amfList"></amfListHtml>
    </div>
</template>

<script>
    import amfListHtml from './AmfListHtml'
    export default {
        name: "AmfHeaderHtml",
        components:{
            amfListHtml
        },
        data(){
            return{
                name: this.AppConfig.appInfo.userName,
                portraitUrl: this.AppConfig.appInfo.portraitUrl,
                orderNum: this.AppConfig.appInfo.totalOrder,
            }
        },
        methods: {
            open(){
                this.$nextTick(() => {
                    this.$refs.amfList.open();
                })
            },
            logout(){
                // const self = this;
                // self.$axios.post("/operation/user/sys/logout").then(function (response) {
                // }).catch(function (err) {
                //     console.log(err);
                //     self.message = "连接服务器失败！"
                // });
                sessionStorage.removeItem("token")
                sessionStorage.removeItem("entType")
                sessionStorage.removeItem("entId")
                sessionStorage.removeItem("regionCode")
                this.$router.push('/');
            },
            jumpAirMonitorFront(){
                window.open(this.AppConfig.appInfo.airMonitorFront+sessionStorage.getItem('token'), '_self');
            }
        }
    }
</script>

<style scoped>

</style>
