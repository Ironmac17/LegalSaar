import api from "./api";

export const adminLogin = (data) => api.post("/admin/login", data);
export const getUsers = () => api.get("/admin/users");
export const getOffices = () => api.get("/admin/offices");
export const getKnowledge = () => api.get("/admin/knowledge");
export const getSolutions = () => api.get("/admin/solutions");
