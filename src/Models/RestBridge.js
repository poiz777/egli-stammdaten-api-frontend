import axios from 'axios';

class RestBridge {
    _config;
    _header;
    _payload;
    _endPoint;
    _baseURL    = (navigator.appVersion.indexOf("Win")!==-1) ? "https://portalpoizapi.intranet.eglionline.ch" : "http://api.egli.dvp";
    _response   = {};

    constructor(config={}) {
        this._baseURL   = config.baseURL    ? config.baseURL    : this._baseURL;
        this._header    = config.header     ? config.header     : this._header;
        this._config    = config.config     ? config.config     : this._config;
        this._endPoint  = config.endPoint   ? config.endPoint   : this._endPoint;
    }

    /**
     * FETCHES A SINGLE ENTRY.
     * THIS METHOD IS CALLED BY ENTITIES THAT ACCESS THE `/show` ENDPOINT
     */
    async fetchEntry(endPoint){
        endPoint        = (endPoint) ? endPoint : this._endPoint;
        this._response  = await axios.get(`${this._baseURL}${endPoint}`, this._config);
        return await this._response;
    }

    /**
     * FETCHES ALL ENTITY'S ENTRIES BASED ON CONFIGURATION PARAMETER.
     * THIS METHOD IS CALLED BY ENTITIES THAT ACCESS THE `/list` ENDPOINT
     */
    async fetchEntries(endPoint){
        endPoint        = (endPoint) ? endPoint : this._endPoint;
        this._response  = await axios.get(`${this._baseURL}${endPoint}`, this._config);
        return await this._response;
    }

    /**
     * AS THE NAME SUGGEST, THIS PERFORMS A POST TRANSACTION AS OPPOSED TO A GET TRANSACTION.
     * THE REQUEST PAYLOAD (PARAMETERS) ARE PASSED AS FORM-DATA.
     * THIS METHOD IS CALLED BY ENTITIES THAT ACCESS THE `/add` OR THE `/update` OR THE `set` ENDPOINTS
     */
    async performPostTransaction(endPoint, payload={}){
        endPoint        = (endPoint) ? endPoint : this._endPoint;
        const options   = {
          method      : 'POST',
          headers     : { 'content-type': 'multipart/form-data' }, // 'application/x-www-form-urlencoded'
          data        : payload,
          url         : `${this._baseURL}${endPoint}`,
        };

        this._response = await axios(options);
        return this._response;
    }

    /**
     * AS THE NAME SUGGEST, METHOD MERELY UPDATES A RESOURCE USING THE `POST` METHOD.
     * THE REQUEST PAYLOAD (PARAMETERS) ARE PASSED AS FORM-DATA.
     * THIS METHOD IS CALLED BY ENTITIES THAT ACCESS THE `/update` OR THE `set` ENDPOINTS
     */
    async updateEntry(endPoint, payload={}){
        return await this.performPostTransaction(endPoint, payload);
    }

    /**
     * AS THE NAME SUGGEST, METHOD MERELY CREATE A NEW RESOURCE USING THE `POST` METHOD.
     * THE REQUEST PAYLOAD (PARAMETERS) ARE PASSED AS FORM-DATA.
     * THIS METHOD IS CALLED BY ENTITIES THAT ACCESS THE `/add` ENDPOINTS
     */
    async createEntry(endPoint, payload={}){
        return await this.performPostTransaction(endPoint, payload);
    }

    /**
     * AS THE NAME SUGGEST, METHOD MERELY DELETES A RESOURCE USING THE `POST` METHOD.
     * THE ONLY REQUEST PAYLOAD (PARAMETER) IS THE RESOURCE'S UNIQUE ID & IS PASSED AS FORM-DATA.
     * THIS METHOD IS CALLED BY ENTITIES THAT ACCESS THE `/delete` ENDPOINTS
     */
    async deleteEntry(endPoint, payload={}){
        return await this.performPostTransaction(endPoint, payload);
    }

    /**
     * AS THE NAME SUGGEST, METHOD MERELY FLAGS A RESOURCE AS DEACTIVATED USING THE `POST` METHOD.
     * THE ONLY REQUEST PAYLOAD (PARAMETER) IS THE RESOURCE'S UNIQUE ID & IS PASSED AS FORM-DATA.
     * THIS METHOD IS CALLED BY ENTITIES THAT ACCESS THE `/deactivate` ENDPOINTS
     */
    async deactivateEntry(endPoint, payload={}){
        return await this.performPostTransaction(endPoint, payload);
    }


    get baseURL() {
        return this._baseURL;
    }

    set baseURL(value) {
        this._baseURL = value;
    }

    get endPoint() {
        return this._endPoint;
    }

    set endPoint(value) {
        this._endPoint = value;
    }

    get response() {
        return this._response;
    }

    set response(value) {
        this._response = value;
    }

    get payload() {
        return this._payload;
    }

    set payload(value) {
        this._payload = value;
    }

    get header() {
        return this._header;
    }

    set header(value) {
        this._header = value;
    }

    get config() {
        return this._config;
    }

    set config(value) {
        this._config = value;
    }
}

export default RestBridge;
