class Collection {
   _className;
   _activeItem;
   _dataCollection = [];

  constructor(className, dataCollection) {
      this._className   = className;
      this.initializeCollection(dataCollection);
  }

  initializeCollection(dataCollection) {
    const selfRef       = this;

    // DYNAMICALLY IMPORT THE ENTITY MODEL USING NODE'S REQUIRE...
    const DynamicModel  = require(`./${this._className}.js` );
    if(dataCollection){
        dataCollection.forEach(function(item) {
            const entity  = new DynamicModel.default(item);
            selfRef._dataCollection.push(entity);
        });
    }
  }

  getItemByIndex(collectionIndex) {
    return this._dataCollection[collectionIndex];
  }

  getDataCollection() {
    return this._dataCollection;
  }

  getItemByUID(UID) {
    const selfRef   = this;
    if (!this._dataCollection) {
      return null;
    }
    this._dataCollection.forEach(function(item) {
      if (item.uid === UID) {
        selfRef._activeItem = item;
        return true;
      }
    });
    return this._activeItem;
  }

  setDataCollection(dataCollection) {
    this._dataCollection = dataCollection;
  }


  get activeItem() {
    return this._activeItem;
  }

  set activeItem(value) {
    this._activeItem = value;
  }

  get className() {
    return this._className;
  }

  set className(value) {
    this._className = value;
  }

  get dataCollection() {
    return this._dataCollection;
  }

  set dataCollection(value) {
    this._dataCollection = value;
  }
}

export default Collection;
