//访问用户媒体设备的兼容方法
export function getUserMedia(
  constraints?: MediaStreamConstraints,
  success?: (value: MediaStream) => void,
  error?: any
): Promise<MediaStream> {
  if (navigator.mediaDevices.getUserMedia) {
    //最新的标准API
    console.log('navigator', navigator);
    return navigator.mediaDevices.getUserMedia(constraints);
  } else if (navigator.webkitGetUserMedia) {
    //webkit核心浏览器
    return navigator.webkitGetUserMedia(constraints, success, error);
  } else if (navigator.mozGetUserMedia) {
    //firfox浏览器
    return navigator.mozGetUserMedia(constraints, success, error);
  } else if (navigator.getUserMedia) {
    //旧版API
    return navigator.getUserMedia(constraints, success, error);
  }
  return Promise.reject();
}

export function hasMediaDevices() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    if (!navigator.webkitGetUserMedia) {
      if (!navigator.mozGetUserMedia) {
        if (!navigator.getUserMedia) {
          return false;
        }
      }
    }
  }
  return true;
}
