import Vue  from 'vue';
import Vuex from 'vuex';
import StoreMutators    from "./StoreMutators";
import StoreActions     from "./StoreActions";
import StoreBaseGetters from "./StoreBaseGetters";

Vue.use(Vuex);
Vue.config.devtools = process.env.NODE_ENV === 'development';

export default new Vuex.Store({
  state: {
    //MAIN APPLICATION DATA.
    __VUE_DEVTOOLS_UID__  : null,
    okToRenderDropDown    : false,
    recaptureMenuState    : true,
    setOnce           	  : false,
    appName              	: 'Stammdaten Management.',
    navMenuTitle          : 'Stammdaten',
    pageTitle             : '',
    qtBox                 : '',
    pagination            : {prev: null, next: null, current: 1},
    showForm             	: false,
    clearForm            	: false,
    user    	            : {},
    userData    	        : {},
    REFS                 	: {},
    VModels              	: {},
    formConfig           	: [],
    formOptions          	: {},
    optionsModels        	: {},
    activeLang           	: 'de',
    globalObjectKey      	: 'bezeichnung',
    multiLangFields      	: [ 'bezeichnung', 'kurzform' ],
    triggerClicked       	: false,
    searchIsActive       	: false,
    isRenderReady        	: false,
    renderer        	    : null,
    DynamicSearch  	      : null,
    menu        	        : null,
    targetEntity         	: null,
    dataSample          	: null,
    tableFields           : null,     // TODO: DROP FIELD...
    targetModel           : null,     // TODO: DROP FIELD...
    groupName             : null,     // TODO: DROP FIELD...
    modelName             : null,     // TODO: DROP FIELD...
    renderData            : {},
    modelCollection       : [],       // TODO: DROP FIELD...
    entityCollection      : [],       // TODO: DROP FIELD...
    filteredData   	      : [],
    filteredCollection   	: [],
    dataCollection       	: [],
    standardItemsPerPage 	: 12,   //120,
    resetSearchVal       	: false,
    resetItemsPerPage    	: false,
    animate    	          : false,
    activityTitle        	: "",
    currentTask          	: "",
    renderSideBarRight   	: false,
    sideBarRightData      : { groupKey: null,  navConf: {} },
    ActivityTitleAffixes  : {
      de  : {
        new         : {prefix: 'Neu(e)',  suffix: ' erstellen'},
        edit        : {prefix: '',        suffix: ' bearbeiten'},
        manage      : {prefix: '',        suffix: ' verwalten'},
        delete      : {prefix: '',        suffix: ' entfernen'},
        deactivate  : {prefix: '',        suffix: ' deaktivieren'},
        management  : {prefix: '',        suffix: '',             translation: ' management'},
      }
    },
    
    
    // PAGINATION RELATED DATA
    reset                	: null,
    theme                	: 'theme-success',
    activeModel          	: null,
    matrix               	: [],
    dropDownSteps        	: 6,     // 6,   24,
    currentPageNum       	: 1,
    prevPageNum          	: 1,
    nextPageNum          	: 2,
    itemsPerPage         	: 30,     // 6,    //120,
    blockLinksCount      	: 0,
    maxPageBlocks        	: 10,     // MAXIMUM NUMBER OF PAGINATION SLOTS TO SHOW
    lastPNumSlice        	: [],
    maxItemsPerPage      	: 1500,   // 120,    //360,
    paginationStats       : {prev: null, next: null, current:1},
    currentTRCount       	: 0,
    shownRange           	: [],
    globalRangeObject    	: {},
    rangeObject    	      : {},
    StandardIPP  	        : 100,     // StandardItemsPerPage
    defaultItemsPerPage  	: 30,      // 6,  //120,
    blockLinksMap         : { left: 0, right:0 },
    
    // APP THEMES
    THEMES                : {
      default       : "theme-success",
      success       : "theme-success",
      joyous        : "theme-joyous",
      conservative  : "theme-conservative",
    },
  },
  
  // MUTATIONS ARE SYNCHRONOUS....
  // FOR ASYNC OPERATIONS, PLEASE USE  `ACTIONS` BELOW
  mutations: {
    ...StoreMutators
  },

  getters: {
    ...StoreBaseGetters
  },

  actions: {
    ...StoreActions
  }
});
