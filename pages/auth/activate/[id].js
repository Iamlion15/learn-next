import { useEffect,useState } from "react";
import  jwt  from "jsonwebtoken";
import axios from "axios";
import { withRouter } from "next/router";
import { ShowErrorMessage, ShowSuccessMessage } from "../../../helpers/Alerts"
import Layout from "../../../components/Layout";

const ActivateAccount=({router})=>{
    const [state,setState]=useState({
        name:'',
        token:'',
        buttonText:'Activate account',
        success:'',
        error:''
    })
    const {name,token,buttonText,success,error}=state
    useEffect(()=>{
        let token=router.query.id
        if(token){
            const {name}=jwt.decode(token)
            setState({...state,name,token})
        }
    },[router])
    const clickSubmit=async e=>{
        e.preventDefault();
        setState({...state,buttonText:'Activating...'})
        try {
            const response=await axios.post(`${process.env.API}/register/activate`,{token})
            console.log("activate account",response);
            setState({...state,name:'',token:'',buttonText:'ACTIVATED',success:response.data.message})
        } catch (error) {
            console.log(error);
             setState({...state,buttonText:"Activate account",error:error.response.data.error})
        }
    }
    return <Layout>
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <h1>G'day {name},Ready to activate your account?</h1>
                <br/>
                {success&&ShowSuccessMessage(success)}
                {error &&ShowErrorMessage(error)}
                <button className="btn btn-outline-warning btn-block" onClick={clickSubmit}>{buttonText}</button>
            </div>
        </div>
    </Layout>
}


export default withRouter(ActivateAccount);