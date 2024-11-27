import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        // 로컬스토리지에서 초기 상태 가져오기
        const savedStatus = localStorage.getItem("isLoggedIn");
        return savedStatus === "true";
    });

    const setLogin = () => {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
    };

    const setLogout = () => {
        setIsLoggedIn(false);
        localStorage.setItem("isLoggedIn", "false");
    };

    useEffect(() => {
        // 로그인 상태가 변경될 때마다 로컬스토리지 업데이트
        localStorage.setItem("isLoggedIn", isLoggedIn.toString());
    }, [isLoggedIn]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setLogin, setLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
