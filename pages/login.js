import { useState,useEffect } from "react"
import Link from "next/link"
import Router from "next/router"
import Layout from "../components/Layout"
import axios from "axios"
import { authenticate,isAuth } from "../helpers/auth"
import { ShowErrorMessage, ShowSuccessMessage } from "../helpers/Alerts"

const Login = () => {
    const [state, setState] = useState({
        email: "",
        password: "",
        error: "",
        success: "",
        buttonText: "Login"
    })
    useEffect(()=>{
        isAuth() && Router.push("/")
    })
    const { email, password, error, success, buttonText } = state
    const handleChange = (name) => (e) => {
        setState({ ...state, [name]: e.target.value, error: "", success: "", buttonText: "Login" })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setState({ ...state, buttonText: 'Logging in ...' })
        try {
            const response = await axios.post(`${process.env.API}/login`, {
             email, password
            })
            authenticate(response,()=>{
                isAuth() && isAuth().role === 'admin' ? Router.push('/admin') : Router.push("/user")
            })
        } catch (error) {
            console.log(error)
            setState({
                buttonText: 'Login',
                error: error.response.data.error
            })
        }

    }

    const registerForm = () => (
        <form onSubmit={handleSubmit}>
            {JSON.stringify(isAuth())}
            <div className="form-group">
                <input
                    onChange={handleChange('email')}
                    type="email"
                    className="form-control"
                    placeholder="type your email"
                    value={email}
                    required
                />
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange('password')}
                    type="password" className="form-control"
                    placeholder="type your password"
                    value={password}
                    required
                />
            </div>
            <div className="form-group">
                <button className="btn btn-outline-warning text-dark">{buttonText}</button>
            </div>
        </form>
    )
    return <Layout>
        <div className="col-md-6 offset-md-3">
            <h1>Login</h1>
            <br />
            {success && ShowSuccessMessage(success)}
            {error && ShowErrorMessage(error)}
            {registerForm()}
        </div>
    </Layout>
}


export default Login