

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

export {
  formatime
};
