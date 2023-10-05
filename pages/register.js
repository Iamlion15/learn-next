import { useState } from "react"
import Layout from "../components/Layout"
import axios from "axios"

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
    const handleSubmit = e => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/register",{
            name,email,password
        })
        .then(response=>console.log(response))
        .catch(error=>console.log(error))
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
                />
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange('email')}
                    type="email"
                    className="form-control"
                    placeholder="type your email"
                    value={email}
                />
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange('password')}
                    type="password" className="form-control"
                    placeholder="type your password"
                    value={password}
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
            {registerForm()}
            <hr />
            {JSON.stringify(state)}
        </div>
    </Layout>
}


export default Register