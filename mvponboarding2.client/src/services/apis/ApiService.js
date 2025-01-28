import axios from "axios";

const API_SERVICE = {
  getRecord: async function (endPoint, id) {
    const url = endPoint + `/${id}`;
    try {
      await axios.get(url);
    } catch (err) {
      if (err) throw new Error("Link to the page not found.");
    }
  },
  postRecord: async function (endPoint, data) {
    try {
      await axios.post(endPoint, data);
    } catch (err) {
      if (err) throw new Error("Link to the page not found.");
    }
  },
  updateRecord: async function (endPoint, id, data) {
    const url = endPoint + `/${id}`;
    try {
      await axios.put(url, data);
    } catch (err) {
      if (err) throw new Error("Link to the page not found.");
    }
  },

  deleteRecord: async function (endPoint, id) {
    const url = endPoint + `/${id}`;
    try {
      await axios.delete(url);
    } catch (err) {
      if (err) throw new Error("Link to the page not found.");
    }
  },
};

export default API_SERVICE;
