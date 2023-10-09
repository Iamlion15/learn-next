import Layout from "../../components/Layout";
import axios from "axios";
import { getCookie } from "../../helpers/auth";
const Admin=({user})=><Layout>{JSON.stringify(user)}</Layout>

Admin.getInitialProps=async context=>{
   const token=getCookie('token',context.req)
   try {
    const response=await axios.get("http://localhost:8000/api/user",{
        headers:{
            Authorization:`Bearer ${token}`,
            contentType:'application/json'
        }
    })
    return {
        user:response.data
    }
   } catch (error) {
    console.log(error);
    if(error.response.status===401){
        return {user:"no user"}
    }
   }
}

export default Admin;