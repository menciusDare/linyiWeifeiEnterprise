import Vue from 'vue'
import Router from 'vue-router'
import LoginHtml from '../components/loginHtml'
import loginByToken from '../components/loginByToken'
import amfHomeHtml from '@/components/common/page/AmfHomeHtml'
/************************************ zys start ***************************************/
import menu from '../components/page/role/menuManager'

import roleList from '../components/page/role/RoleList'
import userList from '../components/page/role/UserList'
import videoMonitor from '../components/page/standingBook/ProductionVideoHuiKanNew2'
// import videoMonitor from '../components/page/standingBook/ProductionVideoHuiKanNew2'
import provincialFiveLinked from '../components/page/fiveLinked/ProvincialFiveLinkedList'
import fiveLinkedInfo from '../components/page/fiveLinked/FiveLinkedInfo'
import cityFiveLinkedList from '../components/page/fiveLinked/CityFiveLinkedList'
import distributionEnterprise from '../components/page/DriverAssignment/DistributionEnterprise'
import storageFacility from '../components/page/realTime/StorageFacility'
import solidStorageFacility from '../components/page/NormalIndustry/solidStorageFacility'
import SolidStorageInfo from '../components/page/NormalIndustry/solidStorageInfo'
import SolidWasteDeclaration from '../components/page/NormalIndustry/solidWasteDeclaration'

import SolidWDdetail from '../components/page/NormalIndustry/solidWDdetail'
import SolidWDEdit from '../components/page/NormalIndustry/solidWDEdit'
import SolidWDSeeDetail from '../components/page/NormalIndustry/solidWDSeeDetail'
import productionDeptManagement from '../components/page/realTime/productionDeptManagement'
import ExamineStandingBookDelete from '../components/page/realTime/ExamineStandingBookDelete'
import ExamineStandingBookDeleteList from '../components/page/realTime/ExamineStandingBookDeleteList'
import hazardousLicense from '../components/page/realTime/HazardousLicense'
/************************************ zys end ***************************************/


/************************************* zxl start ***************************************/
import collectVideoMonitor from '../components/page/standingBook/ProductionVideoHuiKanNew2'
import managementVideoMonitor from '../components/page/standingBook/ProductionVideoHuiKanNew2'
import collectEnterpriseMonitor from '../components/page/standingBook/collectProductionBook'
import managermentEnterpriseMonitor from '../components/page/standingBook/managementProductionBook'
import collectProductionBook from "../components/page/standingBook/collectProductionBook";
import managementProductionBook from "../components/page/standingBook/managementProductionBook";
import collectStorageFacilityMonitorin from '../components/page/realTime/collectStorageFacilityMonitorin'
import managerStorageFacilityMonitoring from '../components/page/realTime/managerStorageFacilityMonitoring'
import enterpriseManagement from '../components/page/standingBook/enterpriseManagement'
import enterprisesInfo from '../components/page/standingBook/enterprisesInfo'
import enterpriseProductionBook from '../components/page/standingBook/enterpriseProductionBook'
import collectEnterpriseProductionBook from '../components/page/standingBook/collectEnterpriseProductionBook'
import managementEnterpriseProductionBook from '../components/page/standingBook/managementEnterpriseProductionBook'
import storageOut from "../components/page/fiveLinked/storageOut";
/************************************* zxl end ***************************************/



/************************************ lx start ***************************************/
import transferCity from "../components/page/transfer/TransferCity";
import transferCityProvince from "../components/page/transfer/TransferCityProvince";
import entBase from "../components/page/ReportAndRegister/EntBase";
import homePage from "../components/page/home/HomePage";
import homeAlarmList from "../components/page/home/HomeAlarmList";

/************************************ lx end ***************************************/

/************************************ cxf start ***************************************/
import qyStatisticalAnalysis from '../components/page/statisticalAnalysis/qyStatisticalAnalysis'
import wfStatisticalAnalysis from '../components/page/statisticalAnalysis/wfStatisticalAnalysis'
import lastYearReview from '../components/page/ReportAndRegister/lastYearReview'
import transferPlanLiveMap from '../components/page/transferPlanLive/transferPlanLiveMap'
import transferPlanLiveList from '../components/page/transferPlanLive/transferPlanLiveList'
import enterinfo from '../components/page/enterinfoMaintenance/enterinfo'
import contractList from '../components/page/enterinfoMaintenance/contractList'

/************************************ cxf end ***************************************/

/************************************ gjx start ***************************************/
import wfMap from '../components/page/realTime/wfMap'
import entScreen from '../components/page/realTime/entScreen'
import entEarlyWarn from '../components/page/realTime/entEarlyWarn'
import storageFacilityMonitoring from '../components/page/realTime/storageFacilityMonitoring2'
import entMonthReport from '../components/page/realTime/entMonthReport'
import entYearReport from '../components/page/realTime/entYearReport'
import entManagementPlanReport from '../components/page/realTime/entManagementPlanReport'
/************************************ gjx end ***************************************/

/************************************ gjx end ***************************************/

/************************************ sy start ***************************************/
import hazardousReductionPlan from "../components/page/ReportAndRegister/hazardousReductionPlan";
import hazardousProductInfo from "../components/page/ReportAndRegister/hazardousProductInfo";
import productInfo from "../components/page/ReportAndRegister/productInfo";
import RegisterHomeList from "../components/page/ReportAndRegister/RegisterHomeList";
import RegisterHome from "../components/page/ReportAndRegister/RegisterHome";
import transterPlan from "../components/page/ReportAndRegister/transterPlan";
import ToUseSelf from "../components/page/ReportAndRegister/ToUseSelf";
import otherUsed from "../components/page/ReportAndRegister/otherUsed";
import environmental from "../components/page/ReportAndRegister/environmental";
import OrderDriver from "../components/page/fiveLinked/OrderDriver";
import SupercargoList from "../components/page/supercargoManagement/SupercargoList";
import vehicleStorage from "../components/page/transferPlanLive/vehicleStorage";
import VehicleList from "../components/page/vehicleManagement/VehicleList";
import DriverList from "../components/page/driverManagement/DriverList";
import StorageroomInfo from "../components/page/StorageRoomSetting/StorageroomInfo";
import StorageroomEditor from "../components/page/StorageRoomSetting/StorageroomEditor";
/************************************ sy end ***************************************/
import enterpriseMonitor from "../components/page/standingBook/productionBook";
import productionBook from "../components/page/standingBook/productionBook";

/************************************ zh start ***************************************/
import InformationFiling from "../components/page/InformationFiling/InformationFiling"
import ManagementPlan from "../components/page/InformationFiling/ManagementPlan"
import ApplicationRegistration from "../components/page/InformationFiling/ApplicationRegistration"


/************************************ zh end ***************************************/

/************************************ wxd start ***************************************/
import storageHistory from "../components/page/dataManagement/storageStandBookHistory"
import storageHistoryAudit from "../components/page/dataManagement/storageStandBookHistoryAudit"


/************************************ wxd end ***************************************/


/************************************ guojx start ***************************************/
import productionBookUpdateRecord from "../components/page/standingBook/productionBookUpdateRecord"
import productionBookUpdateRecordSecond from "../components/page/standingBook/productionBookUpdateRecordSecond"
import proBookUpRecordHistory from "../components/page/standingBook/proBookUpRecordHistory"
import storageAccountUpdate from "../components/page/dataManagement/storageAccountUpdate"
/************************************ guojx end ***************************************/ // ??????????????????
import caseAssigned from '../components/page/riskCaseManagement/caseAssigned.vue'
import instorage from '../components/page/riskCaseManagement/instorage.vue'
import transferBill from '../components/page/riskCaseManagement/transferBill.vue'
import cityTransferBill from '../components/page/riskCaseManagement/cityTransferBill.vue'
import cityTransferDetail from '../components/page/riskCaseManagement/cityTransferDetail'
// ????????????
import outbound from './../components/page/warehouseManagement/outbound.vue'
// ????????????
import enterpriseInformation from '../components/page/companyManagement/enterpriseInformation'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/loginByToken',
            name: 'loginByToken',
            component: loginByToken
        },
        {
            path: '/',
            name: 'LoginHtml',
            component: LoginHtml
        },
        {
            path: '/amfHomeHtml',
            name: 'amfHomeHtml',
            component: amfHomeHtml,
            redirect: '/homePage',
            children: [
                {
                    path: '/outstorage',
                    name: 'outbound',
                    meta: {
                        
                    },
                    component: outbound
                },
                /************************************ zys start ***************************************/
                {
                    path: '/menu',
                    name: 'menu',
                    meta: {
                        // auth: true //??????????????????????????????
                    },
                    component: menu
                },
                {
                    path: '/roleList',
                    name: 'roleList',
                    meta: {
                        // auth: true //??????????????????????????????
                    },
                    component: roleList
                },
                {
                    path: '/caseAssigned',
                    name: 'caseAssigned',
                    meta: {
                        auth: true //??????????????????????????????
                    },
                    component: caseAssigned
                },
                //solidStorageFacility
                {
                    path: '/solidWasteStorage',
                    name: 'solidWasteStorage',
                    meta: {
                        auth: true //??????????????????????????????
                    },
                    component: solidStorageFacility
                },
                //SolidStorageInfo     
                    {
                        path: '/solidWasteInformation',
                        name: 'solidWasteInformation',
                        meta: {
                            auth: true //??????????????????????????????
                        },
                        component: SolidStorageInfo
                    },
                       //SolidStorageInfo     
                       {
                        path: '/solidWasteDeclaration',
                        name: 'solidWasteDeclaration',
                        meta: {
                            auth: true //??????????????????????????????
                        },
                        component: SolidWasteDeclaration
                    },
                    //SolidWDdetail
                    {
                        path: '/solidWDdetail',
                        name: 'solidWDdetail',
                        meta: {
                            auth: true //??????????????????????????????
                        },
                        component: SolidWDdetail
                    },
                    //solidWDEdit
                    {
                        path: '/solidWDEdit',
                        name: 'solidWDEdit',
                        meta: {
                            auth: true //??????????????????????????????
                        },
                        component: SolidWDEdit
                    },
                    //SolidWDSeeDetail
                        //solidWDEdit
                        {
                            path: '/solidWDSeeDetail',
                            name: 'solidWDSeeDetail',
                            meta: {
                                auth: true //??????????????????????????????
                            },
                            component: SolidWDSeeDetail
                        },


                {
                    path: '/userList',
                    name: 'userList',
                    meta: {
                        // auth: true //??????????????????????????????
                    },
                    component: userList
                },
                {
                    path: '/videoMonitor',
                    name: 'videoMonitor',
                    meta: {
                        // auth: true//??????????????????????????????
                    },
                    component: videoMonitor
                },
                {
                    path: '/provincialFiveLinked',
                    name: 'provincialFiveLinked',
                    meta: {
                        auth: true //??????????????????????????????
                    },
                    component: provincialFiveLinked
                },
                {
                    path: '/fiveLinkedInfo',
                    name: 'fiveLinkedInfo',
                    meta: {
                        auth: true //??????????????????????????????
                    },
                    component: fiveLinkedInfo
                },
                {
                    path: '/cityFiveLinkedList',
                    name: 'cityFiveLinkedList',
                    meta: {
                        auth: true //??????????????????????????????
                    },
                    component: cityFiveLinkedList
                },
                {
                    path: '/distributionEnterprise',
                    name: 'distributionEnterprise',
                    meta: {
                        auth: true //??????????????????????????????
                    },
                    component: distributionEnterprise
                },
                {
                    path: '/storageFacility',
                    name: 'storageFacility',
                    meta: {
                        auth: true //??????????????????????????????
                    },
                    component: storageFacility
                },
                {
                    path: '/enterpriseInformation',
                    name: 'enterpriseInformation',
                    meta: {
                        keepAlive: true,
                        isUseCache: false
                    },
                    component: enterpriseInformation
                },
                {
                    path: '/hazardousLicense',
                    name: 'hazardousLicense',
                    meta: {
                        auth: true //??????????????????????????????
                    },
                    component: hazardousLicense
                },
                {
                    path: '/productionDeptManagement',
                    name: 'productionDeptManagement',
                    meta: {
                        auth: true //??????????????????????????????
                    },
                    component: productionDeptManagement
                },
                {
                    path: '/ExamineStandingBookDelete',
                    name: 'ExamineStandingBookDelete',
                    meta: {
                        auth: true //??????????????????????????????
                    },
                    component: ExamineStandingBookDelete
                },
                {
                    path: '/ExamineStandingBookDeleteList',
                    name: 'ExamineStandingBookDeleteList',
                    meta: {
                        auth: true //??????????????????????????????
                    },
                    component: ExamineStandingBookDeleteList
                },

                /************************************ zys end ***************************************/

                /************************************ zxl start ***************************************/
                {
                    path: '/collectVideoMonitor',
                    name: 'collectVideoMonitor',
                    meta: {
                        // auth: true//??????????????????????????????
                    },
                    component: collectVideoMonitor
                },
                {
                    path: '/managementVideoMonitor',
                    name: 'managementVideoMonitor',
                    meta: {
                        // auth: true//??????????????????????????????
                    },
                    component: managementVideoMonitor
                },
                {
                    path: '/collectEnterpriseMonitor',
                    name: 'collectEnterpriseMonitor',
                    meta: {
                        // auth: true//??????????????????????????????
                    },
                    component: collectEnterpriseMonitor
                },

                {
                    path: '/managermentEnterpriseMonitor',
                    name: 'managermentEnterpriseMonitor',
                    meta: {
                        // auth: true//??????????????????????????????
                    },
                    component: managermentEnterpriseMonitor
                },
                {
                    path: '/collectProductionBook',
                    name: 'collectProductionBook',
                    meta: {
                        // auth: true//??????????????????????????????
                    },
                    component: collectProductionBook
                },
                {
                    path: '/managementProductionBook',
                    name: 'managementProductionBook',
                    meta: {
                        // auth: true//??????????????????????????????
                    },
                    component: managementProductionBook
                },
                {
                    path: '/collectStorageFacilityMonitorin',
                    name: 'collectStorageFacilityMonitorin',
                    meta: {
                        // auth: true//??????????????????????????????
                    },
                    component: collectStorageFacilityMonitorin
                },
                {
                    path: '/managerStorageFacilityMonitoring',
                    name: 'managerStorageFacilityMonitoring',
                    meta: {
                        // auth: true//??????????????????????????????
                    },
                    component: managerStorageFacilityMonitoring
                },
                {
                    path: '/enterpriseManagement',
                    name: 'enterpriseManagement',
                    meta: {
                        // auth: true//??????????????????????????????
                    },
                    component: enterpriseManagement
                },
                {
                    path: '/enterprisesInfo',
                    name: 'enterprisesInfo',
                    meta: {
                        // auth: true//??????????????????????????????
                    },
                    component: enterprisesInfo
                },
                {
                    path: '/collectEnterpriseProductionBook',
                    name: 'collectEnterpriseProductionBook',
                    meta: {
                        // auth: true//??????????????????????????????
                    },
                    component: collectEnterpriseProductionBook
                },
                {
                    path: '/enterpriseProductionBook',
                    name: 'enterpriseProductionBook',
                    meta: {
                        // auth: true//??????????????????????????????
                    },
                    component: enterpriseProductionBook
                },
                {
                    path: '/managementEnterpriseProductionBook',
                    name: 'managementEnterpriseProductionBook',
                    meta: {
                        // auth: true//??????????????????????????????
                    },
                    component: managementEnterpriseProductionBook
                },

                {
                    path: '/storageOut',
                    name: 'storageOut',
                    meta: {
                        // auth: true//??????????????????????????????
                    },
                    component: storageOut
                },



                /************************************ zxl end ***************************************/


                /************************************ lx start ***************************************/
                {
                    path: '/transferCity',
                    name: 'transferCity',
                    meta: {
                        auth: true //??????????????????????????????
                    },
                    component: transferCity
                },
                {
                    path: '/transferCityProvince',
                    name: 'transferCityProvince',
                    meta: {
                        auth: true //??????????????????????????????
                    },
                    component: transferCityProvince
                },
                {
                    path: '/homePage',
                    name: 'homePage',
                    meta: {
                        auth: true //??????????????????????????????
                    },
                    component: homePage
                },
                {
                    path: '/homeAlarmList',
                    name: 'homeAlarmList',
                    meta: {
                        auth: true //??????????????????????????????
                    },
                    component: homeAlarmList
                },


                /************************************ lx end ***************************************/

                /************************************ cxf start ***************************************/

                {
                    path: '/qyStatisticalAnalysis',
                    name: 'qyStatisticalAnalysis',
                    meta: {
                        auth: true //??????????????????????????????
                    },
                    component: qyStatisticalAnalysis
                }, {
                    path: '/enterinfo',
                    name: 'enterinfo',
                    meta: {
                        auth: true //??????????????????????????????
                    },
                    component: enterinfo
                }, {
                    path: '/contractList',
                    name: 'contractList',
                    meta: {
                        auth: true //??????????????????????????????
                    },
                    component: contractList
                },

                {
                    path: '/wfStatisticalAnalysis',
                    name: 'wfStatisticalAnalysis',
                    meta: {
                        auth: true //??????????????????????????????
                    },
                    component: wfStatisticalAnalysis
                },
                {
                    path: '/transferPlanLiveMap',
                    name: 'transferPlanLiveMap',
                    meta: {
                        // auth: true//??????????????????????????????
                    },
                    component: transferPlanLiveMap
                },
                {
                    path: '/transferPlanLiveList',
                    name: 'transferPlanLiveList',
                    meta: {
                        // auth: true//??????????????????????????????
                    },
                    component: transferPlanLiveList
                },
                /************************************ cxf end ***************************************/

                /************************************ gjx start ***************************************/

                {
                    path: '/wfMap',
                    name: 'wfMap',
                    meta: {
                        // auth: true//??????????????????????????????
                    },
                    component: wfMap
                },
                {
                    path: '/entScreen',
                    name: 'entScreen',
                    meta: {
                        // auth: true//??????????????????????????????
                    },
                    component: entScreen
                },
                {
                    path: '/entEarlyWarn',
                    name: 'entEarlyWarn',
                    meta: {
                        // auth: true//??????????????????????????????
                    },
                    component: entEarlyWarn
                },
                {
                    path: '/storageFacilityMonitoring',
                    name: 'storageFacilityMonitoring',
                    meta: {
                        // auth: true//??????????????????????????????
                    },
                    component: storageFacilityMonitoring
                },
                {
                    path: '/entMonthReport',
                    name: 'entMonthReport',
                    meta: {
                        // auth: true//??????????????????????????????
                    },
                    component: entMonthReport
                },
                {
                    path: '/entYearReport',
                    name: 'entYearReport',
                    meta: {
                        // auth: true//??????????????????????????????
                    },
                    component: entYearReport
                },
                /************************************ gjx end ***************************************/
                , {
                    path: '/entManagementPlanReport',
                    name: 'entManagementPlanReport',
                    meta: {
                        // auth: true//??????????????????????????????
                    },
                    component: entManagementPlanReport
                },
                /************************************ gjx end ***************************************/

                /************************************ sy start ***************************************/

                {
                    path: '/RegisterHomeList',
                    name: 'RegisterHomeList',
                    meta: {
                        auth: true //??????????????????????????????
                    },
                    component: RegisterHomeList
                },

                {
                    path: '/OrderDriver',
                    name: 'OrderDriver',
                    meta: {
                        //auth: true//??????????????????????????????
                    },
                    component: OrderDriver
                },
                {
                    path: '/SupercargoList',
                    name: 'SupercargoList',
                    meta: {
                        //auth: true//??????????????????????????????
                    },
                    component: SupercargoList
                },
                {
                    path: '/VehicleList',
                    name: 'VehicleList',
                    meta: {
                        // auth: true//??????????????????????????????
                    },
                    component: VehicleList
                },

                {
                    path: '/DriverList',
                    name: 'DriverList',
                    meta: {
                        // auth: true//??????????????????????????????
                    },
                    component: DriverList
                },

                {
                    path: '/StorageroomInfo',
                    name: 'StorageroomInfo',
                    meta: {
                        // auth: true//??????????????????????????????
                    },
                    component: StorageroomInfo
                },

                {
                    path: '/StorageroomEditor',
                    name: 'StorageroomEditor',
                    meta: {
                        // auth: true//??????????????????????????????
                    },
                    component: StorageroomEditor
                },
                {
                    path: '/vehicleStorage',
                    name: 'vehicleStorage',
                    meta: {
                        // auth: true//??????????????????????????????
                    },
                    component: vehicleStorage
                },
                {
                    path: '/RegisterHome',
                    name: 'RegisterHome',
                    meta: {
                        auth: true //??????????????????????????????
                    },
                    component: RegisterHome,
                    children: [{
                            path: '/entBase',
                            name: 'entBase',
                            meta: {
                                auth: true //??????????????????????????????
                            },
                            component: entBase
                        },
                        {
                            path: '/transterPlan',
                            name: 'transterPlan',
                            meta: {
                                auth: true //??????????????????????????????
                            },
                            component: transterPlan
                        },
                        {
                            path: '/ToUseSelf',
                            name: 'ToUseSelf',
                            meta: {
                                auth: true //??????????????????????????????
                            },
                            component: ToUseSelf
                        },

                        {
                            path: '/otherUsed',
                            name: 'otherUsed',
                            meta: {
                                //auth: true//??????????????????????????????
                            },
                            component: otherUsed
                        },

                        {
                            path: '/environmental',
                            name: 'environmental',
                            meta: {
                                //auth: true//??????????????????????????????
                            },
                            component: environmental
                        },
                        {
                            path: '/lastYearReview',
                            name: 'lastYearReview',
                            meta: {
                                auth: true //??????????????????????????????
                            },
                            component: lastYearReview
                        },
                        {
                            path: '/hazardousReductionPlan',
                            name: 'hazardousReductionPlan',
                            meta: {
                                auth: true //??????????????????????????????
                            },
                            component: hazardousReductionPlan
                        },
                        {
                            path: '/hazardousProductInfo',
                            name: 'hazardousProductInfo',
                            meta: {
                                auth: true //??????????????????????????????
                            },
                            component: hazardousProductInfo
                        },

                        {
                            path: '/productInfo',
                            name: 'productInfo',
                            meta: {
                                auth: true //??????????????????????????????
                            },
                            component: productInfo
                        },
                    ]
                },
                /************************************ sy end ***************************************/
                /************************************ zh start ***************************************/
                {
                    path: '/informationFiling', // ??????????????????
                    name: 'informationFiling',
                    meta: {
                        auth: true // ??????????????????????????????
                    },
                    component: InformationFiling,
                    children: [{
                            path: '/applicationRegistration',
                            name: 'ApplicationRegistration',
                            component: ApplicationRegistration,
                            meta: {
                                auth: true // ??????????????????????????????
                            }
                        },
                        {
                            path: '/managementPlan/:id', // ??????????????????
                            name: 'ManagementPlan',
                            meta: {
                                auth: true // ??????????????????????????????
                            },
                            component: ManagementPlan
                        }
                    ]
                },
                /************************************ zh end ***************************************/
                {
                    path: '/enterpriseMonitor',
                    name: 'enterpriseMonitor',
                    meta: {
                        //auth: true//??????????????????????????????
                    },
                    component: enterpriseMonitor
                },
                {
                    path: '/productionBook',
                    name: 'productionBook',
                    meta: {
                        //auth: true//??????????????????????????????
                    },
                    component: productionBook
                },
                /************************************ guojx start ***************************************/
                {
                    path: '/productionBookUpdateRecord',
                    name: 'productionBookUpdateRecord',
                    meta: {
                        auth: true //??????????????????????????????
                    },
                    component: productionBookUpdateRecord
                },
                {
                    path: '/productionBookUpdateRecordSecond',
                    name: 'productionBookUpdateRecordSecond',
                    meta: {
                        auth: true //??????????????????????????????
                    },
                    component: productionBookUpdateRecordSecond
                },
                {
                    path: '/proBookUpRecordHistory',
                    name: 'proBookUpRecordHistory',
                    meta: {
                        auth: true //??????????????????????????????
                    },
                    component: proBookUpRecordHistory
                },
                {
                    path: '/storageAccountUpdate',
                    name: 'storageAccountUpdate',
                    meta: {
                        auth: true //??????????????????????????????
                    },
                    component: storageAccountUpdate
                },
                /************************************ guojx end ***************************************/
                /************************************ wxd start ***************************************/
                {
                    path: '/storageHistory',
                    name: 'storageHistory',
                    meta: {
                        //auth: true//??????????????????????????????
                    },
                    component: storageHistory
                },
                {
                    path: '/storageHistoryAudit',
                    name: 'storageHistoryAudit',
                    meta: {
                        //auth: true//??????????????????????????????
                    },
                    component: storageHistoryAudit
                },
                {
                    path: '/instorage',
                    name: 'instorage',
                    meta: {
                        //auth: true//??????????????????????????????
                    },
                    component: instorage
                },
                {
                    path: '/transferBill',
                    name: 'transferBill',
                    meta: {
                        //auth: true//??????????????????????????????
                    },
                    component: transferBill
                },
                {
                    path: '/cityTransferBill',
                    name: 'cityTransferBill',
                    meta: {
                        //auth: true//??????????????????????????????
                    },
                    component: cityTransferBill
                },
                {
                    path: '/cityTransferDetail',
                    name: 'cityTransferDetail',
                    meta: {
                        //auth: true//??????????????????????????????
                    },
                    component: cityTransferDetail
                },
                /************************************ wxd end ***************************************/
            ]
        },

    ]

})