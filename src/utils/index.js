

/**
 * formatime translate it to some forms like 几分钟前 
 * 
 * @param {any} tar 
 */
function formatime (tar) {
  const now = (new Date()).valueOf();
  const pre = (new Date(tar)).valueOf();
  const offset = Math.floor((now - pre) / 1000);
  if (offset < 60) return '刚刚';
  else if (offset < 3600) return `${Math.floor(offset / 60)}分钟前`;
  else if (offset < 3600 * 24) return `${Math.floor(offset / 3600)}小时前`;
  else if (offset < 3600 * 24 * 30) return `${Math.floor(offset / (3600 * 24))}天前`;
  else if (offset < 3600 * 24 * 30 * 12) return `${Math.floor(offset / (3600 * 24 * 30))}个月前`;
  else return `${Math.floor(offset / (3600 * 24 * 30 * 12))}年前`;
}

/**
 * translate the time to some forms like 1.7年
 * 
 * @param {any} tar 
 * @returns 
 */

function toDetailedTime (tar) {
  const now = (new Date()).valueOf();
  const pre = (new Date(tar)).valueOf();
  const offset = now - pre;
  if (offset < 3600 * 24 * 30 * 1000) return `${Math.floor(offset / (3600 * 24 * 1000))}天`;
  else if (offset < 3600 * 24 * 30 * 12 * 1000) return `${Math.floor(offset / (3600 * 24 * 30 * 1000))}个月`;
  else return `${(offset / (3600 * 24 * 30 * 1000 * 12)).toFixed(1)}年`;
}

/**
 * 
 * 
 * @param {any} fn 需要被节流的函数
 * @param {any} atleast 间隔
 * @returns 
 */
function throttle (fn, delay) {
  var previous = null;

  return function () {
    var now = +new Date();
    if ( !previous ) previous = now;
    if ( now - previous > delay ) {
      fn();
      // 重置上一次开始时间为本次结束时间
      previous = now;
    }
  }
};

export {
  formatime,
  toDetailedTime,
  throttle
};