import axios from "axios";

const API = "http://localhost:3000";

export default {
  register(data) {
    return axios.post(`${API}/register`, data);
  },

  login(data) {
    return axios.post(`${API}/login`, data);
  },

  logout() {
    return axios.post(`${API}/logout`);
  },

  getCurrentUser() {
    return axios.get(`${API}/current-user`);
  },

  updateCurrentUser(data) {
    return axios.put(`${API}/current-user`, data);
  },

  getContacts() {
    return axios.get(`${API}/contacts`);
  },

  addContact(contact) {
    return axios.post(`${API}/contacts`, contact);
  },

  updateContact(id, contact) {
    return axios.put(`${API}/contacts/${id}`, contact);
  },

  deleteContact(id) {
    return axios.delete(`${API}/contacts/${id}`);
  },
};
