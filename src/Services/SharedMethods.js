import $            from 'jquery';

const SharedMethods =  {
    /**
     * NOT ALL FIELDS THAT ARE VISIBLE IN THE FORM VIEW ARE
     * ALSO VISIBLE IN THE TABLE VIEW. OTHERWISE WE TAKE UP
     * IRRELEVANT SPACE... THIS METHOD SIMPLY FETCHES FIELDS
     * THAT ARE RELEVANT TO A SPECIFIC TARGET, SAY: `table` VIEW.
     * THE FETCHED FIELDS CONTAINS CONFIGURATION DATA ON HOW
     * TO AUTOMATICALLY BUILD EITHER THE TABLE OR THE FORM RESPECTIVELY....
     * @param entity
     * @param target
     * @returns {*}
     */
    fetchVisibleFields(entity, target='table'){
      let idx;
      const shown             = [];
      const targetView        = target === 'table' ? "showInTable" : "showInForm";

      if(!entity){ return {count: 0, fields: null}; }

      const objFieldConfig    = entity.fetchFieldsConfig();
      let renderedItemsCount  = 0;

      if(!objFieldConfig){
        return {count: null, fields: null};
      }
      
      for(let fieldName in objFieldConfig){
        const objData = objFieldConfig[fieldName];
        const fn = fieldName;
        if(objData[targetView]){
          renderedItemsCount++;
          shown.push(fn);
        }
      }
      if((idx = shown.indexOf('uid')) !== -1){
        delete shown[idx];
      }
      shown.splice(0, 0, 'uid');
      return {count: renderedItemsCount, fields: shown};
    },
  
    /**
     * HANDLES THE SORTING END OF THE TABLE-VIEW.
     * THE HEADINGS ON THE TABLE WITH UP-DOWN SORT ICONS....
     * @param e
     * @param fieldName
     */
    sortByField(e,fieldName){
      //  parentOfTrigger => "th.pz-sortable-col", mainTrigger=>".pz-sortable-col-box", chainedGlass=>".fa-search egl-filter-chain"
      const orientation = e.currentTarget.getAttribute("data-orientation") === '1' ? '2' : '1';
      document.querySelectorAll("span.pz-sortable-col-box").forEach( (elem)=> {
        elem.setAttribute("data-orientation", '0');
      });
      e.currentTarget.setAttribute("data-orientation", orientation);
      this.sortResultBy(e, fieldName, orientation);
    },

    // IN ORDER TO MAKE THE DYNAMIC SEARCH MORE ROBUST, WE HAVE HAVE TO REACH INTO FIELD CONFIGURATION
    // AND THEN EXTRACT INFORMATION RELEVANT TO THE SEARCH MANIPULATION.
    getFieldConfigInfo(fieldName, dataSample){
      const fieldsConfig    = dataSample.fetchFieldsConfig();
      return (fieldsConfig[fieldName] !== undefined && fieldsConfig[fieldName]) ? fieldsConfig[fieldName] : null;
    },

    /**
     * RENDERS A HTML CONTENT AS A MODAL BOX...
     * COULD BE FADED OUT USING THE DELAY...
     * WIDTH IS MEASURED IN PERCENTAGE TO ALLOW FOR FLEXIBILITY.
     * @param msgText
     * @param widthPercent
     * @param delay
     */
    renderHTMLContentWithinAModalBox(msgText, widthPercent, delay=0, animationCompleteCallback=null){
      const unit      = "%";
      msgText         = (msgText !== undefined) ? msgText : "Das Bild wurde kopiert!";
      delay           = (delay !== undefined) ? delay: 2000;
      let htmlContent = `<div class="pz-box-wrapper-outer" id="pz-box-wrapper-outer" style='display:block;padding:0;margin:0 auto;width:${widthPercent}${unit};max-width:${widthPercent}${unit};'>${msgText}</div>` ;

      // DELETE OLDER INSTANCES OF THE HTML CONTENT BOX
      $("#pz-html-content").fadeOut(750, function(){$(this).remove();});

      //CREATE REMOVE BOX ICON (`#pz-trash-icon`)
      let pzTrashIcon  = $("<span />", {
        id: "pz-trash-icon",
        "class": "pz-trash-icon fa fa-window-close"
      }).css( {
        position    : "absolute",
        background  : "transparent",
        color       : "black",
        margin      : 0,
        padding     : 0,
        right       : `${ (((100 - widthPercent)/2) + 0.25) }${unit}`,
        top         : `0.25${unit}`,
        cursor      : `pointer`,
        zIndex      : 99999,
      } );

      //CREATE ALERT BOX WRAPPER OVERLAY-DIV (`#pz-html-content`)
      let htmlContentBox  = $("<div />", {
        id: "pz-html-content",
        "class": "pz-html-content"
      }).css( {
        position    : "fixed",
        width       : `${widthPercent}${unit}`,
        background  : "transparent",
        display     : "none",
        margin      : 0,
        padding     : 0,
        left        : ((100 - widthPercent)/2) + `${unit}`,
        zIndex      : 999999999,
        top         : 0,
      } ).append($(htmlContent)).append(pzTrashIcon);

      $("body").append(htmlContentBox);

      htmlContentBox.fadeIn(500, function(){
        const trashIcon    = $(this).find("#pz-trash-icon.pz-trash-icon");
        trashIcon.on("click", function(){
          htmlContentBox.fadeOut(delay, function(){
            $(this).remove();
            if (animationCompleteCallback) {
              animationCompleteCallback();
            }
            return true;
          });
        });

        if (delay > 0) {
          const tOut = setTimeout(function () {
            htmlContentBox.fadeOut(delay, function () {
              htmlContentBox.remove();
              trashIcon.trigger("click");
              clearTimeout(tOut);
              if (animationCompleteCallback) {
                animationCompleteCallback();
              }
            });
          }, delay);
        }
      });
    },

    getEntityDangerousActionHTMLModalString(question, yesNoObj) {
      return `
                    <div class="col-md-12 col row" style="background:white;color:black; padding: 30px 15px;">
                        <div class="col-md-10 col s10">${question}</div>
                        <div class="col-md-2 col s2">&nbsp;</div>
                        <div class="col-md-12  col s12 no-lr-pad" style="padding-top: 10px;">
                            <div class="col-md-3 col s3">
                                <button class="btn btn-danger egl-dangerous-action-btn egl-btn-yes"
                                        id="egl-btn-yes"
                                        value="1"
                                        style="width:100%;">${yesNoObj.yes}</button>
                            </div>
                            <div class="col-md-3 col s3">
                               <button class="btn btn-success egl-dangerous-action-btn egl-btn-no"
                                       id="egl-btn-no"
                                        value="0"
                                       style="width:100%;">${yesNoObj.no}</button>
                            </div>
                            <div class="col-md-6 col s6">
                            </div>
                        </div>
                    </div>
                    `
    },

    getActionQuestionBase(action='deactivate'){
      return `Are you sure you want to <strong style='color:red;'>${action} </strong> the Entity - `;
    },

    updateDataByUID(EglAPI, entityUID, entityObj, jqr, task='edit',){
      // LOOP THROUGH ALL THE RECORDS AND FIND + UPDATE THE RECORD WITH THE GIVEN UID OF `entityUID`
      let cueKey;
      let renderObj =  EglAPI.renderData ? EglAPI.renderData : [];
      switch(task){
        case 'edit':
        case 'deactivate':
          for(cueKey in renderObj){
            const entity    = renderObj[cueKey];
            const UID       = entity.uid;
            if( parseInt(entityUID) === parseInt(UID)){
              renderObj[cueKey] = entityObj;
              EglAPI.$store.commit('renderData', renderObj);
              break;
            }
          }
          break;

        case 'add':
        case 'new':
          if(typeof renderObj.push === 'function'){
            renderObj.push(entityObj);
            EglAPI.$store.commit('renderData', renderObj);
          }

          break;

        case 'delete':
          for(cueKey in renderObj){
            const entity    = EglAPI.$store.renderData[cueKey];
            const UID       = entity.uid;
            if( parseInt(entityUID) === parseInt(UID)){
              renderObj[cueKey] = null;
              EglAPI.$store.commit('renderData', renderObj);
              break;
            }
          }

          renderObj   = EglAPI.renderData.filter( (model) => { return ( model !== null);} );
          EglAPI.$store.commit('renderData', renderObj);
          break;

        default:
          break;
      }

      let renderData  = EglAPI.renderData;
      EglAPI.$store.commit('dataCollection',      renderData);
      EglAPI.$store.commit('activeCollection',    renderData);
      EglAPI.$store.commit('filteredCollection',  renderData);

      EglAPI.renderer.$forceUpdate();

      // REMOVE THE FORM WINDOW....
      jqr(".fa.fa-window-close.pz-close-form-box").trigger('click');
      
      // MANUALLY TRIGGER THE PAGINATOR SO THAT CONSISTENCY IS MAINTAINED...
      jqr("#itemsPerPageDropDown").trigger("click");
    },
  
  /**
   * DYNAMICALLY UPDATES THE COLLECTION GROUP WITHIN THE STORE GIVEN THE RIGHT PARAMETERS.
   * @param componentObj
   * @param NavData
   * @param modelName
   * @returns {*}
   */
    dynamicallyUpdateCollectionGroup(componentObj, NavData, modelName){
      let groupKey, modelKey;
      if(NavData){
        for(groupKey in NavData){
          const groupCollection = NavData[groupKey];
          if (typeof groupCollection === "object" && groupKey !== 'svgIcons') {
            for (modelKey in groupCollection) {
              const model = groupCollection[modelKey];
              if (model.className === modelName) {
                componentObj.$store.commit('sideBarRightData', {
                  "groupKey"  : groupKey,
                  "navConf"   : groupCollection
                });
                return groupCollection.menuName;
              }
            }
          }
        }
      }
    },

    /**
     * SET'S THE UID AS THE FIRST ITEM TO BE LISTED IN THE TABLE VIEW.
     * THIS IS BECAUSE THE SORTING IS BASED ON THE AUTO-GENERATED MODEL'S SORTING ALGORITHM
     * @param itemList
     * @returns {*}
     */
    setUIDAsFirstItem(itemList){
      let returnData = itemList;
      if(itemList.uid) {
        returnData = { uid : itemList.uid };
        delete itemList.uid;
        for(let key in itemList){
          returnData[key] = itemList[key];
        }
      }
      return returnData;
    },

    setHtmlPageTitle(pageTitle, component=null){
      document.title = pageTitle;
      if(component){
        const menuLink = $(".egl-child-list-item.pz-sub-item a.egl-action");
        menuLink.on("click", ()=>{ component.$store.commit('recaptureMenuState', false); });
      }
    },

    recaptureMenuLinkStates(currentRoute=null, component=null){
      if(component && !component.recaptureMenuState){
        if(currentRoute){
          currentRoute                  = currentRoute.split("/").filter((current)=>{ return !!current; })[0];
          const targetLink              = $(`a[href*="${currentRoute}/"]`);
          const LinkObj                 = targetLink.get(0);
          activeLinkedListParent        = LinkObj.parentNode;

          if(!$(LinkObj).hasClass('pz-active')){
            $(LinkObj).addClass('pz-active egl-action');
            $(LinkObj).parent("li").addClass('pz-active');
          }
        }
        return false;
      }
      
      const activeLinkedList        = $("li.pz-active");
      const activeLinkedListChild   = activeLinkedList.find("a");
      let activeLinkedListParent    = document.querySelector("li.pz-active");
      
      if(currentRoute){
        currentRoute                  = currentRoute.split("/").filter((current)=>{ return !!current; })[0];
        const targetLink              = $(`a[href*="${currentRoute}/"]`);
        const LinkObj                 = targetLink.get(0);
        activeLinkedListParent        = LinkObj.parentNode;
        if(!$(LinkObj).hasClass('pz-active')){
          $(LinkObj).addClass('pz-active');
          $(LinkObj).parent("li").addClass('pz-active');
        }
      }
      
      if(activeLinkedListParent) {
        activeLinkedListParent = activeLinkedListParent.parentNode.parentNode.querySelector("a.egl-dormant-link");
      }else{ return; }
  
      if ("createEvent" in document) {
        let evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", false, true);
        activeLinkedListParent.dispatchEvent(evt);
      }else {
        activeLinkedListParent.fireEvent("onclick");
      }
      activeLinkedListChild.addClass("pz-active egl-action");
    },

    findItemByUIDInACollection(uid, dataCollection){
      let key;
      for(key in dataCollection){
        const data = dataCollection[key];
        if(parseInt(data.uid) === parseInt(uid)){
          return dataCollection[key];
        }
      }
      return false;
    },

    fetchColumnFilterForm(columnName, columnLabel){
      const fieldID = `${columnName}_chained_filter`;
      return `
              <div class="col-md-12 col m12 s12 l12 egl-chained-filter-inner-box">
                  <input class="form-control egl-chained-filter-field"
                         id="${fieldID}"
                         name="${columnName}"
                         type="text"
                         value=""
                         placeholder="Filtern nach ${columnLabel}-Spalte"
                         required="required" />
                   <span class="fa fa-filter pz-search-icon" data-field-id="#${fieldID}" data-col-name="${columnName}"></span>
                   <span class="fa fa-close egl-remove-filter" data-field-id="#${fieldID}" data-col-name="${columnName}"></span>
                   <span class="fa fa-chevron-right egl-submit-filter" data-field-id="#${fieldID}" data-col-name="${columnName}"></span>
              </div> `
    },
  
    getColumnFilterForm(columnName, columnLabel){
      return `
        <div class="col-md-12 row" id="egl-col-filter-form-block">
          <div class="form-block pz-hidden" id="pz-hidden-form-wrapper" style="display: block;">
            <div class="col-md-12 egl-form-container" id="egl-form-container">
                <h1 class="egl-form-title-heading">Filtern nach ${columnLabel}-Spalte. </h1>
                <div class="form-group col-md-12 col s12">
                    <label class="col-md-4 col s4 egl-required" for="sid">${columnLabel}*</label>
                    <div data-v-2d55ed7d="" class="col-md-8 col s8">
                        <input class="form-control" id="${columnName}_chained_filter" :name="${columnName}" type="text" value="" required="required" />
                        <span class="egl-form-field-hint-block"><span class="fa fa-lightbulb-o"></span>&nbsp;
                            <span class="egl-hint">The Value to use in filtering the DataSet by this Column (${columnLabel})</span>
                        </span>
                    </div>
                </div>
                <div class="form-group col s3 offset-s9 col-md-3 col-md-offset-9 egl-extra-pad egl-btn-wrapper">
                    <input type="submit" value="Filtern" class="form-control" />
                </div>
            </div>
          </div>
        </div> `
    },

    createDateAsUTC(date) {
      return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
    },

    convertDateToUTC(date) {
      return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    },

    /**
     * PAUSES THE SCRIPT FOR A SPECIFIC TIME IN MILLISECONDS
     * @param milliSeconds
     */
    sleep(milliSeconds) {
      let currentTime = new Date().getTime();
      while (currentTime + milliSeconds >= new Date().getTime()){
        // Todo - Do nothing
      }
    },

    copyObject(objectToCopy){
      return JSON.parse(JSON.stringify(objectToCopy));
    },

};

export default SharedMethods;