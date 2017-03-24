class URL {
  constructor(url) {
    // we are creating a fake <a> element so we can use the browser's URL parser
    const link = document.createElement('a');
    link.setAttribute('href', url)

    this.url = url;
    this.protocol = link.protocol;  // https:
    this.host = link.host;          // myhost.com:8080
    this.hostname = link.hostname;  // myhost.com
    this.port = link.port;          // 8080
    this.pathname = link.pathname;  // /path/name
    this.search = link.search;      // ?search=query
    this.hash = link.hash;          // #hash

    // HTTP Basic Authentication username and password
    this.username = link.username;  // myuser
    this.password = link.password;  // mypass
  }
}


function getHostname(url) {
  let link = new URL(url);
  let optPort = link.port == "" ? "" : ":" + link.port;
  return link.protocol + '//' + link.hostname + optPort + '/';
}


let config = {
  separator: " - ",
  getTitle: function(title, url) {
    return title + this.separator + getHostname(url);
  }
};


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
