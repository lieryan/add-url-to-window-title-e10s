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

  getHostname() {
    let optPort = this.port == "" ? "" : ":" + this.port;
    return this.protocol + '//' + this.hostname + optPort + '/';
  }
}


let config = {
  separator: " - ",
  getTitle: function(title, url) {
    return title + this.separator + new URL(url).getHostname();
  }
};

console.log("injected: url.js");
