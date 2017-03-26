// URL change listener
class AUTTLite {
  constructor(config) {
    this.config = config;
  }
  onTabUpdated(tabId, changeInfo, tabInfo) {
    if (changeInfo.url) {
      console.log("tab updated: tabId:", tabId, "url:", changeInfo.url);

      let newTitle = this.config.getTitle(tabInfo.title, changeInfo.url);
      browser.tabs.executeScript(tabId, {
        code: "tm.realTitle = '" + newTitle + "';"
      });
    }
  }
}


let autt = new AUTTLite(config);
browser.tabs.onUpdated.addListener(autt.onTabUpdated.bind(autt));
