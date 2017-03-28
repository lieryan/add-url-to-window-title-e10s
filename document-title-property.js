class TitleManager {
  attachListeners() {
    let self = this;
    let unsafeDocument = document.wrappedJSObject;
    let unsafeDocumentPrototype = unsafeDocument.__proto__;

    let getter = exportFunction(function() {
      return self.realTitle;
    }, unsafeDocumentPrototype);

    let setter = exportFunction(function(newVal) { 
      console.log('watched'); 
      if (!(newVal instanceof String || typeof newVal === "string")) {
        // TODO: safely newVal.toString() in the page's security context
        console.error('add-url-to-window-title:', 'page script trying to set non-string to document.title is unsupported');
        return;
      }
      self.realTitle = newVal;
    }, unsafeDocumentPrototype);

    Object.defineProperty(unsafeDocumentPrototype, 'title', { 'configurable': true, 'get': getter, 'set': setter});
    console.log('attached');
  }

  updateTitle() {
    let urledTitle = config.getTitle(this.realTitle, document.URL);
    console.log('updating title', urledTitle);
    document.title = urledTitle;
  }

  get realTitle() {
    return this._realTitle;
  }

  set realTitle(newVal) {
    console.log('write');
    this._realTitle = newVal;
    this.updateTitle();
  }
};
let tm = new TitleManager();
tm.attachListeners();
tm.realTitle = document.title;
console.log('injected: document-title-property.js');
