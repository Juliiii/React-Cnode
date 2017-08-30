import axios from 'axios';
// here, you can config the axios
axios.defaults.baseURL = "https://cnodejs.org/api/v1";
axios.create({
  timeout: 5000
});

export default axios;