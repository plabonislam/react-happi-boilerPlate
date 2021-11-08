
let baseurl = " ";

if (process.env.REACT_APP_NOT_SECRET_CODE == "production")
    baseurl = "http://localhost:3001";

export default baseurl;