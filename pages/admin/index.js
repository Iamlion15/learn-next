import Layout from "../../components/Layout";
import axios from "axios"
import withAdmin from "../withAdmin";
import { useEffect } from "react";
const Admin = ({ user, token }) => {
return (
        <Layout>{JSON.stringify(token)}</Layout>
    )
}



export default withAdmin(Admin);