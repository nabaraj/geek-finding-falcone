
import axios from 'axios';
const defaultOption = {
    //timeout:1000*20,
    method: "POST"
  };
export const requestApi = function(options) {
    let finalOptions = Object.assign({}, defaultOption, options);
    let axiosInstance = axios(finalOptions);
    axiosInstance.catch(error => {
      if (error && error.response && error.response.status === 401) {
        //window.location.reload();
        
      }
    });
    //axios.cancel(requestId);
    return axiosInstance;
  };