import { useState,useEffect } from "react"
import Layout from "../components/Layout"
import axios from "axios"
import { ShowErrorMessage, ShowSuccessMessage } from "../helpers/Alerts"
import Router from "next/router"
import { isAuth } from "../helpers/auth"

const Register = () => {
    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: "",
        buttonText: "Register"
    })
    const { name, email, password, error, success, buttonText } = state
    const handleChange = (name) => (e) => {
        setState({ ...state, [name]: e.target.value, error: "", success: "", buttonText: "Register" })
    }
    useEffect(()=>{
        isAuth() && Router.push("/")
    })
    const handleSubmit = async e => {
        e.preventDefault()
        setState({ ...state, buttonText: 'registering' })
        try {
            const response = await axios.post(`${process.env.API}/register`, {
                name, email, password
            })
            setState({
                name: '',
                email: '',
                password: '',
                buttonText: 'submitted',
                success: response.data.message
            })
        } catch (error) {
            setState({
                buttonText: 'Register',
                error: error.response.data.error

            })
        }

    }

    const registerForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    onChange={handleChange('name')}
                    type="text"
                    className="form-control"
                    placeholder="type your name"
                    value={name}
                    required
                />
            </div>
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
            <h1>Register</h1>
            <br />
            {success && ShowSuccessMessage(success)}
            {error && ShowErrorMessage(error)}
            {registerForm()}
        </div>
    </Layout>
}


export default Register