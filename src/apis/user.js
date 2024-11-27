import axiosInstance from "../utils/axiosInstance";

export const signup = (username, password1, password2, email) => {
    return axiosInstance
        .post("/user/signup", {
            username,
            password1,
            password2,
            email,
        })
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const login = (email, password) => {
    return axiosInstance
        .post("/user/login", {
            email,
            password,
        })
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const logout = () => {
    return axiosInstance
        .post("/user/logout", {})
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const loginTest = () => {
    return axiosInstance
        .post("/user/test", {})
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const getAllUsers = () => {
    return axiosInstance
        .get("/user")
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const getUser = (userId) => {
    return axiosInstance
        .get(`/user/${userId}`)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const getProfile = () => {
    return axiosInstance
        .get("/user/me")
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};
