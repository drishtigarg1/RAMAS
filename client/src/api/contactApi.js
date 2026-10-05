import api from "./api";

const contactApi = {
  create: (data) => api.post("/contacts", data),
  list: () => api.get("/contacts"),
  markRead: (id) => api.patch(`/contacts/${id}/read`),
  remove: (id) => api.delete(`/contacts/${id}`),
};

export default contactApi;
