var app_config = {
    appInfo:{
       // title:"临沂市危废全过程企业管理平台",//系统名称
        title:"危废全过程企业管理平台",
        // logoImg:"",// logo地址
        // title:"危废全过程监管平台",//系统名称
        riverCode: '07CB000000',
        regionCode: sessionStorage.getItem('regionCode')==null?"371300":sessionStorage.getItem('regionCode'),
        regionLevel:2,
        parentCode:"370000",
        parentLevel:1,
        regionName:"临沂市",
        pageSizes: [5,10,15,20],
        pageSize: 10,
        IMG_URL: 'http://10.0.200.26/',
        // IMG_URL: 'http://59.110.152.155:8000/',
        airMonitorFront: 'http://218.241.184.18:8411/#/loginByToken?token=',
        lng: "118.3407680000",
        lat: "35.0724090000",
        portraitUrl: '../../../../static/css/images/pic/head.png',
        userName: sessionStorage.getItem("name"),
        duLng:"118.3407680000",
        duLat:"35.0724090000",
        bssw: "65.89630158504319,7.330286361787131",
        bsne: "145.29903476211402,57.65074046432375",
        baiDuYingYanServiceId:"222203",
        baiDuMapMCode:"E6:2B:BD:65:8F:C8:FE:AF:F3:EF:62:97:74:3E:BB:BB:A0:31:A0:4D;com.baidu.track",
        baiDuMapAk:"IGAhv4rnLVYAIiUoTpcquETTlUaIaLNr"
    },
    authInfo: {
        username: 'talroad',
        password: 'talroad',
    },
    datas:{
        menus:[],
    }
}

module.exports=app_config;
