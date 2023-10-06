import Cookie from "js-cookie";
import Router from "next/router";

//set in cookie
export const setInCookie=(key,value)=>{
    if(typeof window !== 'undefined'){
        Cookie.set(key,value,{
            expires:1
        })
    }
}

//remove from the cookie
export const removeCookie=(key)=>{
    if(typeof window !== 'undefined'){
        Cookie.remove(key)
    }
}

//get from stored cookie
export const getCookie=(key)=>{
    if(typeof window !=="undefined"){
        return Cookie.get(key)
    }
}
//set in localstorage

export const setLocalStorage=(key,value)=>{
    localStorage.setItem(key,JSON.stringify(value))
}

//remove from the localstorage
export const removeStorage=(key)=>{
    localStorage.removeItem(key)
}

//authenticate user by passing data to cookie and localstorage during signin

export const authenticate=(response,next)=>{
    setInCookie('token',response.data.token)
    setLocalStorage('user',response.data.user)
    next();
}


//access information

export const isAuth=()=>{
    if(typeof window !=="undefined"){
        const cookieChecked=getCookie('token')
        if(cookieChecked){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'))
            }
            else{
                return false;
            }
        }
    }
}


export const logout=()=>{
    if(typeof window !=="undefined"){
        removeCookie("token")
        removeStorage("user")
        Router.push("/login")
    }
}