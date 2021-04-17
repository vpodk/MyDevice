(function(doc, win, nav) {
  const initDeviceFeatures = () => {
    const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
    setResult('network-information', connection ? connection.effectiveType : false);
    setResult('device-memory', 'deviceMemory' in nav);
    setResult('online-status', ('onLine' in nav)|| ('ononline' in win));
    setResult('vibration-api', 'vibrate' in nav);
    setResult('battery-status', ('getBattery' in nav) || ('battery' in nav));
  };

  const initMediaFeatures = () => {
    const isSupported = ('mediaDevices' in nav) || ('getUserMedia' in nav);
    setResult('media-capture', isSupported);
    setResult('image-capture', isSupported && 'ImageCapture' in win);
    setResult('media-recorder', isSupported && 'MediaRecorder' in win);
    setResult('webrtc-support', isSupported && 'RTCPeerConnection' in win);
  };

  const initProgressiveExperience = () => {
    const hasWorker = 'serviceWorker' in nav;
    setResult('offline-mode', hasWorker && 'CacheStorage' in win);
    setResult('pwa-installation', 'BeforeInstallPromptEvent' in win);
    setResult('bg-sync', hasWorker && 'SyncManager' in win);
    setResult('sharing-api', 'share' in nav);
    setResult('payments-api', 'PaymentRequest' in win || 'ApplePaySession' in win);
    setResult('credentials-api', 'PasswordCredential' in win || 'FederatedCredential' in win);
  };

  const initLocationFeatures = () => {
    setResult('geo-api', 'geolocation' in nav);
    setResult('orientation-api', 'DeviceOrientationEvent' in win ||
                                 'AbsoluteOrientationSensor' in win ||
                                 'RelativeOrientationSensor' in win);
    setResult('motion-api', 'DeviceMotionEvent' in win ||
                            'Accelerometer' in win ||
                            'Gyroscope' in win);
    setResult('proximity-api', 'ondeviceproximity' in win || 
                               'onuserproximity' in win ||
                               'ProximitySensor' in win);
  };

  const initInputFeatures = () => {
    setResult('touch-gestures', 'ontouchstart' in win || 'onpointerdown' in win);
    setResult('speech-api', 'webkitSpeechRecognition' in win || 'SpeechRecognition' in win);
    setResult('clipboard-api', 'clipboard' in nav || 'ClipboardEvent' in win);
    setResult('pointing-api', win.matchMedia('(pointer: none), (pointer: coarse), (pointer: fine)').matches);
  };

  const initBrowserInfo = () => {
    const browsers = [
      // "5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36 OPR/75.0.3969.171"
      {name: 'Opera', pattern: /\sOPR\/(\d+)/},
      // "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.74 Safari/537.36 Edg/79.0.309.43"
      {name: 'Microsoft Edge', pattern: /\sEdg(e|A|iOS)?\/(\d+)/},
      // "5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36"
      // "5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36"
      {name: 'Google Chrome', pattern: /\sChrome\/(\d+)/},
      // "5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15"
      {name: 'Safari', pattern: /\sSafari\/(\d+)/, version: /\sVersion\/(\d+)/},
      // 5.0 (Macintosh; Intel Mac OS X 11.2; rv:87.0) Gecko/20100101 Firefox/87.0
      {name: 'Firefox', pattern: /\s(Firefox|FxiOS)\/(\d+)/},
      // 5.0 (compatible; MSIE 10.0; Windows NT 6.2)
      // 5.0 (Windows NT 10.0; Trident/7.0; rv:11.0) like Gecko
      {name: 'Internet Explorer', pattern: /\s(MSIE|Trident)[\s/](\d+)/}
    ];

    let browserName  = nav.appName;
    let browserVersion = parseInt(nav.appVersion, 10);
    const agent = nav.userAgent;

    for (let i = 0; i < browsers.length;) {
      const browser = browsers[i++];
      const pattern = browser.pattern;
      let matches = agent.match(pattern);
      if (matches) {
        browserName = browser.name;
        browserVersion = matches.pop();
        if (browser.version) {
          matches = agent.match(browser.version);
          if (matches) browserVersion = matches.pop();
        }
        console.log(pattern, matches);
        break;
      }
    } 

    setResult('browser-name', browserName);
    setResult('browser-version', browserVersion);
    setResult('browser-platform', nav.platform);
    setResult('browser-cookie', nav.cookieEnabled);
    setResult('browser-screen', screen.width + ' x ' + screen.height);
  };

  const setResult = (id, value) => {
    const node = doc.getElementById(id);
    const isBool = 'boolean' === typeof value;
    node.className = value ? 'yes' : 'no';
    node.textContent = isBool ? (value ? 'Yes' : 'No') : value;
  };

  initBrowserInfo();
  initDeviceFeatures();
  initMediaFeatures();
  initProgressiveExperience();
  initLocationFeatures();
  initInputFeatures();
})(document, window, navigator);