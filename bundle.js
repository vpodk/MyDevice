(function(doc, win, nav) {
  const initDeviceFeatures = () => {
    const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
    setResult('network-information', connection ? connection.effectiveType : false);
    setResult('device-memory', 'deviceMemory' in nav);
    setResult('online-status', ('onLine' in nav)|| ('ononline' in win));
    setResult('vibration-api', 'vibrate️' in nav);
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

  const initBrowserInfo = () => {
    let browserName  = nav.appName;
    let fullVersion  = '' + parseFloat(nav.appVersion);
    let majorVersion = parseInt(nav.appVersion, 10);

    if (nav.userAgentData) {
      const record = nav.userAgentData.brands && nav.userAgentData.brands[0];
      browserName = record && record.brand;
      majorVersion = record && record.version;
    } else {
      let nAgt = nav.userAgent;
      let nameOffset, verOffset, ix;
      
      if ((verOffset = nAgt.indexOf("OPR/")) != -1) {
        // In Opera 15+, the true version is after "OPR/" 
        browserName = "Opera";
        fullVersion = nAgt.substring(verOffset + 4);
      } else if ((verOffset = nAgt.indexOf("Opera")) != -1) {
        // In older Opera, the true version is after "Opera" or after "Version"
        browserName = "Opera";
        fullVersion = nAgt.substring(verOffset + 6);
        if ((verOffset = nAgt.indexOf("Version")) != -1) 
          fullVersion = nAgt.substring(verOffset + 8);
      } else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
        // In MSIE, the true version is after "MSIE" in userAgent
        browserName = "Internet Explorer";
        fullVersion = nAgt.substring(verOffset + 5);
      } else if ((verOffset = nAgt.indexOf("Chrome"))!=-1) {
        // In Chrome, the true version is after "Chrome" 
        browserName = "Chrome";
        fullVersion = nAgt.substring(verOffset + 7);
      } else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
        // In Safari, the true version is after "Safari" or after "Version" 
        browserName = "Safari";
        fullVersion = nAgt.substring(verOffset + 7);
        if ((verOffset = nAgt.indexOf("Version")) != -1) 
          fullVersion = nAgt.substring(verOffset + 8);
      } else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
        // In Firefox, the true version is after "Firefox" 
        browserName = "Firefox";
        fullVersion = nAgt.substring(verOffset + 8);
      } else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < 
                (verOffset = nAgt.lastIndexOf('/'))) {
        // In most other browsers, "name/version" is at the end of userAgent 
        browserName = nAgt.substring(nameOffset, verOffset);
        fullVersion = nAgt.substring(verOffset + 1);
        if (browserName.toLowerCase() == browserName.toUpperCase()) {
          browserName = nav.appName;
        }
      }

      // trim the fullVersion string at semicolon/space if present
      if ((ix = fullVersion.indexOf(";")) != -1)
        fullVersion = fullVersion.substring(0, ix);

      if ((ix = fullVersion.indexOf(" ")) != -1)
        fullVersion = fullVersion.substring(0, ix);
      
      majorVersion = parseInt('' + fullVersion, 10);
      if (isNaN(majorVersion)) {
        fullVersion  = '' + parseFloat(nav.appVersion); 
        majorVersion = parseInt(nav.appVersion, 10);
      }
    }
    
    setResult('browser-name', browserName);
    setResult('browser-version', majorVersion);
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
})(document, window, navigator);