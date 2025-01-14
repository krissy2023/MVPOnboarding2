import axios from "axios";

const API_SERVICE = {
  getRecord: async function (endPoint, id) {
    const url = endPoint + `/${id}`;
    await axios.get(url);
  },
  postRecord: async function (endPoint, data) {
    await axios.post(endPoint, data);
  },
  updateRecord: async function (endPoint, id, data) {
    const url = endPoint + `/${id}`;
    await axios.put(url, data);
  },

  deleteRecord: async function (endPoint, id) {
    const url = endPoint + `/${id}`;
    await axios.delete(url);
  },
};

export default API_SERVICE;
