export default {
  //MAIN APPLICATION DATA.
  REFS(state, payload) {
    if(payload !== undefined){
      for(let refKey in payload){
        state.REFS[refKey] = payload[refKey];
      }
    }
  },
  
  appName(state, payload) {
    if(payload !== undefined){ state.appName = payload; }
  },
  
  pagination(state, payload) {
    if(payload !== undefined){
      for(let pgnKey in payload){
        state.pagination[pgnKey] = payload[pgnKey];
      }
    }
  },
  
  user(state, payload) {
    if(payload !== undefined){ state.user = payload; }
  },
  
  
  userData(state, payload) {
    if(payload !== undefined){ state.userData = payload; }
  },
  
  navMenuTitle(state, payload) {
    if(payload !== undefined){ state.navMenuTitle = payload; }
  },
  
  
  qtBox(state, payload) {
    if(payload !== undefined){ state.qtBox = payload; }
  },
  
  showForm(state, payload) {
    if(payload !== undefined){ state.showForm = payload; }
  },
  
  clearForm(state, payload) {
    if(payload !== undefined){ state.clearForm = payload; }
  },
  
  VModels(state, payload) {
    if(payload !== undefined){
      for(let vModelKey in payload){
        state.VModels[vModelKey] = payload[vModelKey];
      }
    }
  },
  
  formConfig(state, payload) {
    if(payload !== undefined){
      for(let formConfigKey in payload){
        state.formConfig[formConfigKey] = payload[formConfigKey];
      }
    }
  },
  
  formOptions(state, payload) {
    if(payload !== undefined){ state.formOptions = payload; }
  },
  
  optionsModels(state, payload) {
    if(payload !== undefined){ state.optionsModels = payload; }
  },
  
  activeLang(state, payload) {
    if(payload !== undefined){ state.activeLang = payload; }
  },
  
  globalObjectKey(state, payload) {
    if(payload !== undefined){ state.globalObjectKey = payload; }
  },
  
  multiLangFields(state, payload) {
    if(payload !== undefined){ state.multiLangFields = payload; }
  },
  
  triggerClicked(state, payload) {
    if(payload !== undefined){ state.triggerClicked = payload; }
  },
  
  searchIsActive(state, payload) {
    if(payload !== undefined){ state.searchIsActive = payload; }
  },
  
  isRenderReady(state, payload) {
    if(payload !== undefined){ state.isRenderReady = payload; }
  },
  
  targetEntity(state, payload) {
    if(payload !== undefined){ state.targetEntity = payload; }
  },
  
  entityInstance(state, payload) {
    if(payload !== undefined){ state.entityInstance = payload; }
  },
  
  tableFields(state, payload) {
    if(payload !== undefined){ state.tableFields = payload; }
  },
  
  targetModel(state, payload) {
    if(payload !== undefined){ state.targetModel = payload; }
  },
  
  groupName(state, payload) {
    if(payload !== undefined){ state.groupName = payload; }
  },
  
  modelName(state, payload) {
    if(payload !== undefined){ state.modelName = payload; }
  },
  
  currentEvent(state, payload) {
    if(payload !== undefined){ state.currentEvent = payload; }
  },


  setOnce(state, payload) {
    if(payload !== undefined){ state.setOnce = payload; }
  },

  renderData(state, payload) {
    if(payload !== undefined){ state.renderData = payload; }
  },
  
  modelCollection(state, payload) {
    if(payload !== undefined){ state.modelCollection = payload; }
  },
  
  activeCollection(state, payload) {
    if(payload !== undefined){ state.activeCollection = payload; }
  },
  
  entityCollection(state, payload) {
    if(payload !== undefined){ state.entityCollection = payload; }
  },
  
  filteredData(state, payload) {
    if(payload !== undefined){ state.filteredData = payload; }
  },
  
  filteredCollection(state, payload) {
    if(payload !== undefined){ state.filteredCollection = payload; }
  },
  
  dataCollection(state, payload) {
    if(payload !== undefined){ state.dataCollection = payload; }
  },
  
  StandardIPP(state, payload) {
    if(payload !== undefined){ state.StandardIPP = payload; }
  },
  
  standardItemsPerPage(state, payload) {
    if(payload !== undefined){ state.standardItemsPerPage = payload; }
  },
  
  resetSearchVal(state, payload) {
    if(payload !== undefined){ state.resetSearchVal = payload; }
  },
  
  resetItemsPerPage(state, payload) {
    if(payload !== undefined){ state.resetItemsPerPage = payload; }
  },
  
  activityTitle(state, payload) {
    if(payload !== undefined){ state.activityTitle = payload; }
  },
  
  currentTask(state, payload) {
    if(payload !== undefined){ state.currentTask = payload; }
  },
  
  renderSideBarRight(state, payload) {
    if(payload !== undefined){ state.renderSideBarRight = payload; }
  },
  
  recaptureMenuState(state, payload) {
    if(payload !== undefined){ state.recaptureMenuState = payload; }
  },
  
  sideBarRightData(state, payload) {
    if(payload !== undefined){ state.sideBarRightData = payload; }
  },
  
  ActivityTitleAffixes(state, payload) {
    if(payload !== undefined){
      if(payload[state.activeLang] !== undefined){
        for(let activity in payload[state.activeLang]){
          state.ActivityTitleAffixes[state.activeLang][activity] = payload[state.activeLang][activity];
        }
      }else{
        state.ActivityTitleAffixes = payload;
      }
    }
  },


  // PAGINATION RELATED DATA
  reset(state, payload) {
    if(payload !== undefined){ state.reset = payload; }
  },
  
  theme(state, payload) {
    if(payload !== undefined){ state.theme = payload; }
  },
  
  activeModel(state, payload) {
    if(payload !== undefined){ state.activeModel = payload; }
  },
  
  matrix(state, payload) {
    if(payload !== undefined){ state.matrix = payload; }
  },
  
  dropDownSteps(state, payload) {
    if(payload !== undefined){ state.dropDownSteps = payload; }
  },
  
  currentPageNum(state, payload) {
    if(payload !== undefined){ state.currentPageNum = payload; }
  },
  
  prevPageNum(state, payload) {
    if(payload !== undefined){ state.prevPageNum = payload; }
  },
  
  nextPageNum(state, payload) {
    if(payload !== undefined){ state.nextPageNum = payload; }
  },
  
  itemsPerPage(state, payload) {
    if(payload !== undefined){ state.itemsPerPage = payload; }
  },
  
  blockLinksCount(state, payload) {
    if(payload !== undefined){ state.blockLinksCount = payload; }
  },
  
  maxPageBlocks(state, payload) {
    if(payload !== undefined){ state.maxPageBlocks = payload; }
  },
  
  lastPNumSlice(state, payload) {
    if(payload !== undefined){ state.lastPNumSlice = payload; }
  },
  
  pageTitle(state, payload) {
    if(payload !== undefined){ state.pageTitle = payload; }
  },
  
  maxItemsPerPage(state, payload) {
    if(payload !== undefined){ state.maxItemsPerPage = payload; }
  },
  
  paginationStats(state, payload) {
    if(payload !== undefined){
      for(let statKey in payload){
        state.paginationStats[statKey] = payload[statKey];
      }
    }
  },
  
  currentTRCount(state, payload) {
    if(payload !== undefined){ state.currentTRCount = payload; }
  },
  
  shownRange(state, payload) {
    if(payload !== undefined){ state.shownRange = payload; }
  },
  
  globalRangeObject(state, payload) {
    if(payload !== undefined){ state.globalRangeObject = payload; }
  },
  
  rangeObject(state, payload) {
    if(payload !== undefined){ state.rangeObject = payload; }
  },
  
  defaultItemsPerPage(state, payload) {
    if(payload !== undefined){ state.defaultItemsPerPage = payload; }
  },
  
  blockLinksMap(state, payload) {
    if(payload !== undefined){ state.blockLinksMap = payload; }
  },
  
  renderer(state, payload) {
    if(payload !== undefined){ state.renderer = payload; }
  },

  DynamicSearch(state, payload) {
    if(payload !== undefined){ state.DynamicSearch = payload; }
  },

  menu(state, payload) {
    if(payload !== undefined){ state.menu = payload; }
  },

  dataSample(state, payload) {
    if(payload !== undefined){ state.dataSample = payload; }
  },
  
  animate(state, payload) {
    if(payload !== undefined){ state.animate = payload; }
  },
  
  __VUE_DEVTOOLS_UID__(state, payload) {
    if(payload !== undefined){ state.__VUE_DEVTOOLS_UID__ = payload; }
  },
  
};
