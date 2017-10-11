class Storage {
  /**
   *  for saving some data in local
   * 
   * @param {any} keys an array of keys which you want to save 
   * @param {any} obj a obj that contains the keys and values
   * @memberof Storage
   */
  save (keys, obj) {
    console.log(obj);
    for (const key of keys) {
      localStorage.setItem(key, JSON.stringify(obj[key]));
    }
  }

  /**
   * for geting some data from local
   * 
   * @param {any} keys an array of keys which you want to get
   * @memberof Storage
   */
  get (keys) {
    let obj = {};
    for (const key of keys) {
      obj[key] = localStorage.getItem(key);
    }
    console.log(obj);
    return obj;
  }


  /**
   * for clearing some data in local
   * 
   * @param {any} keys an array of keys which you want to remove
   * @memberof Storage
   */
  remove (keys) {
    for (const key of keys) {
      localStorage.removeItem(key);
    }
  }
}

export default new Storage();
