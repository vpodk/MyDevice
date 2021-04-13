(function() {
  const initNetworkInfo = () => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    setResult('network-information', connection ? connection.effectiveType : false);
  };

  const initOnlineStatus = () => {
    const isSupported = ('onLine' in navigator )|| ('ononline' in window);
    setResult('online-status', isSupported);
  };

  const initVibrationApi = () => {
    const isSupported = ('onLine' in navigator )|| ('ononline' in window);
    setResult('vibration-api', isSupported);
  };

  const initBatteryStatus = () => {
    const isSupported = ('getBattery' in navigator) || ('battery' in navigator);
    setResult('battery-status', isSupported);
  };

  const initDeviceMemory = () => {
    const isSupported = 'deviceMemory' in navigator;
    setResult('device-memory', isSupported);
  };

  const initMediaFeatures = () => {
    const isSupported = ('mediaDevices' in navigator) || ('getUserMedia' in navigator);
    setResult('media-capture', isSupported);
    setResult('image-capture', isSupported && 'ImageCapture' in window);
    setResult('media-recorder', isSupported && 'MediaRecorder' in window);
    setResult('webrtc-support', isSupported && 'RTCPeerConnection' in window);
  };

  const initBrowserInfo = () => {
    let browserName  = navigator.appName;
    let fullVersion  = '' + parseFloat(navigator.appVersion);
    let majorVersion = parseInt(navigator.appVersion, 10);

    if (navigator.userAgentData) {
      const record = navigator.userAgentData.brands && 
                     navigator.userAgentData.brands[0];
      browserName = record.brand;
      majorVersion = record.version;
    } else {
      let nAgt = navigator.userAgent;
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
          browserName = navigator.appName;
        }
      }

      // trim the fullVersion string at semicolon/space if present
      if ((ix = fullVersion.indexOf(";")) != -1)
        fullVersion = fullVersion.substring(0, ix);

      if ((ix = fullVersion.indexOf(" ")) != -1)
        fullVersion = fullVersion.substring(0, ix);
      
      majorVersion = parseInt('' + fullVersion, 10);
      if (isNaN(majorVersion)) {
        fullVersion  = '' + parseFloat(navigator.appVersion); 
        majorVersion = parseInt(navigator.appVersion, 10);
      }
    }
    
    setResult('browser-name', browserName);
    setResult('browser-version', majorVersion);
    setResult('browser-platform', navigator.platform);
    setResult('browser-cookie', navigator.cookieEnabled);
    setResult('browser-screen', screen.width + ' x ' + screen.height);
  };

  const setResult = (id, value) => {
    const node = document.getElementById(id);
    const isBool = 'boolean' === typeof value;
    node.className = value ? 'yes' : 'no';
    node.textContent = isBool ? (value ? 'Yes' : 'No') : value;
  };

  initBrowserInfo();

  initNetworkInfo();
  initOnlineStatus();
  initVibrationApi();
  initBatteryStatus();
  initDeviceMemory();

  initMediaFeatures();
})();