const DeviceInfo = {
  getBrowser: () => {
    const browsers = [
      // "5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36 OPR/75.0.3969.171"
      { name: "Opera", pattern: /\sOPR\/(\d+)/ },
      // "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.74 Safari/537.36 Edg/79.0.309.43"
      { name: "Microsoft Edge", pattern: /\sEdg(e|A|iOS)?\/(\d+)/ },
      // 5.0 (Linux; Android 5.0.2; SAMSUNG SM-G925F Build/LRX22G) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/4.0 Chrome/44.0.2403.133 Mobile Safari/537.36
      { name: "Samsung Internet", pattern: /\sSamsungBrowser\/(\d+)/ },
      // "5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36"
      // "5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36"
      { name: "Google Chrome", pattern: /\sChrome\/(\d+)/ },
      // "5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15"
      {
        name: "Safari",
        pattern: /\sSafari\/(\d+)/,
        version: /\sVersion\/(\d+)/,
      },
      // 5.0 (Macintosh; Intel Mac OS X 11.2; rv:87.0) Gecko/20100101 Firefox/87.0
      { name: "Firefox", pattern: /\s(Firefox|FxiOS)\/(\d+)/ },
      // 5.0 (compatible; MSIE 10.0; Windows NT 6.2)
      // 5.0 (Windows NT 10.0; Trident/7.0; rv:11.0) like Gecko
      { name: "Internet Explorer", pattern: /\s(MSIE|Trident)[\s/](\d+)/ },
    ];

    const appVersion = navigator.appVersion;
    let browserName = navigator.appName;
    let browserVersion = parseInt(appVersion, 10);

    for (let i = 0; i < browsers.length; ) {
      const browser = browsers[i++];
      let matches = appVersion.match(browser.pattern);

      if (matches) {
        browserName = browser.name;
        browserVersion = matches.pop();
        if (browser.version) {
          matches = appVersion.match(browser.version);
          if (matches) browserVersion = matches.pop();
        }
        break;
      }
    }

    return {
      name: browserName,
      version: browserVersion,
    };
  },

  getOs: () => {},
};
