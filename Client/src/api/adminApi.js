import api from "./api";

export const adminLogin = (data) => api.post("/admin/login", data);
export const getUsers = () => api.get("/admin/users");
export const getOffices = () => api.get("/admin/offices");
export const createOffice = (data) => api.post("/admin/offices", data);
export const updateOffice = (id, data) => api.put(`/admin/offices/${id}`, data);
export const deleteOffice = (id) => api.delete(`/admin/offices/${id}`);
export const getKnowledge = () => api.get("/admin/knowledge");
export const getSolutions = () => api.get("/admin/solutions");
