class TitleManager {
  attachListeners() {
    let self = this;
    let unsafeDocument = document.wrappedJSObject;
    let unsafeDocumentPrototype = unsafeDocument.__proto__;

    let getter = exportFunction(function() {
      return self.realTitle;
    }, unsafeDocumentPrototype);

    let setter = exportFunction(function(newVal) { 
      if (!(newVal instanceof String || typeof newVal === "string")) {
        // TODO: safely newVal.toString() in the page's security context
        console.error('add-url-to-window-title:', 'page script trying to set non-string to document.title is unsupported');
        return;
      }
      self.realTitle = newVal;
    }, unsafeDocumentPrototype);

    Object.defineProperty(unsafeDocumentPrototype, 'title', { 'configurable': true, 'get': getter, 'set': setter});
  }

  updateTitle() {
    let urledTitle = config.getTitle(this.realTitle, document.URL);
    document.title = urledTitle;
  }

  get realTitle() {
    return this._realTitle;
  }

  set realTitle(newVal) {
    this._realTitle = newVal;
    this.updateTitle();
  }
};
let tm = new TitleManager();
tm.attachListeners();
tm.realTitle = document.title;
