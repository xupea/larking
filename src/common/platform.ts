/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line no-underscore-dangle
let _isWindows = false;

if (typeof navigator === 'object') {
  _isWindows = navigator.userAgent.indexOf('Windows') >= 0;
}

export const isWindows = _isWindows;
