import axiosInstance from "../utils/axiosInstance";

export const createQuestion = ({ targetId, content, subject = "" }) => {
    return axiosInstance.post("/question", {
        targetId,
        subject,
        content,
    });
};

export const getReceivedQuestions = () => {
    return axiosInstance
        .get("/question/received")
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const getSentQuestions = () => {
    return axiosInstance
        .get("/question/sent")
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const getReceivedAnswers = () => {
    return axiosInstance
        .get("/answer/all")
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

export const createAnswer = ({ questionId, content }) => {
    return axiosInstance.post("/answer", {
        questionId,
        content,
    });
};
