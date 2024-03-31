import { Headers } from "./headers";
import axios from 'axios'

const API_URL = `${process.env.REACT_APP_API_URL}`;

export default function call({ path, method, data }) {
  return new Promise((resolve, reject) => {
    axios({
      url: API_URL + path,
      method,
      data,
      headers: Headers(),
    })
    .then((d) => {
      resolve(d.data);
    })
    .catch((err) => {
        let status = err?.response?.data?.status;
        if (status === 403 || status === 401 || status === 404) 
        {
          let e = err?.response?.data;
          if (!e) return;
          reject(e);
          // setTimeout(function(){window.location.href = "/login";}, 1000)
        }
      });
  });
}
