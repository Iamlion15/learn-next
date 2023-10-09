import axios from "axios";
import { getCookie } from "../helpers/auth";

const withAdmin = (Page) => {
  const WithAuthAdmin = (props) => <Page {...props} />;

  WithAuthAdmin.getInitialProps = async (context) => {
    const token = getCookie("token", context.req);
    let user = null;

    if (token) {
      try {
        const response = await axios.get(`${process.env.API}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", 
          },
        });
        user = response.data;
      } catch (error) {
        if (error.response.status === 401) {
          user = null;
        }
      }
    }

    if (user === null) {
      // Redirect to the homepage if user is not authenticated
      if (context.res) {
        context.res.writeHead(302, {
          Location: "/",
        });
        context.res.end();
    }
    } else {
      return {
        ...(Page.getInitialProps ? await Page.getInitialProps(context) : {}),
        user,
        token,
      };
    }
  };

  return WithAuthAdmin;
};

export default withAdmin;
