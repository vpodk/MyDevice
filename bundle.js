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
    const browser = DeviceInfo.getBrowser();
    setResult('browser-name', browser.name);
    setResult('browser-version', browser.version);
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