import Cookie from "js-cookie";
import Router from "next/router";

//set in cookie
export const setInCookie = (key, value) => {
    if (typeof window !== 'undefined') {
        Cookie.set(key, value, {
            expires: 1
        })
    }
}

//remove from the cookie
export const removeCookie = (key) => {
    if (typeof window !== 'undefined') {
        Cookie.remove(key)
    }
}

//get from stored cookie
export const getCookie = (key, req) => {
    return (typeof window !== "undefined") ? getCookieFromBrowser(key) : getCookieFromServer(key, req);
}

export const getCookieFromBrowser = (key) => {
    return Cookie.get(key);
}

export const getCookieFromServer = (key, req) => {
    if (!req.headers.cookie) {
        return 'undefined';
    }
    console.log("req.headers.cookie", req.headers.cookie);
    let token = req.headers.cookie.split(';').find(c => c.trim().startsWith(`${key}=`));
    if (!token) {
        return undefined;
    }
    let tokenValue = token.split("=")[1];
    console.log("get cookie from server", tokenValue);
    return tokenValue;
}

//set in localstorage

export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

//remove from the localstorage
export const removeStorage = (key) => {
    localStorage.removeItem(key)
}

//authenticate user by passing data to cookie and localstorage during signin

export const authenticate = (response, next) => {
    setInCookie('token', response.data.token)
    setLocalStorage('user', response.data.user)
    next();
}


//access information

export const isAuth = () => {
    if (typeof window !== "undefined") {
        const cookieChecked = getCookie('token')
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'))
            }
            else {
                return false;
            }
        }
    }
}


export const logout = () => {
    if (typeof window !== "undefined") {
        removeCookie("token")
        removeStorage("user")
        Router.push("/login")
    }
}