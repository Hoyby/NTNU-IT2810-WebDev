const API_URL = "http://localhost:8080/api/auth/";

const register = (username:string | null | undefined, email:string | null | undefined, password:string | null | undefined) => {
    console.log(username, email, password);
    // "post" request to backend with username, email, password
    return "registrer"
};

const login = (email:string | null | undefined, password:string | null | undefined) => {
    console.log(email, password)
    // "post" request to backend with email, password
    
    // response is accesstoken

    // save to localStorage
    // response -> localStorage.setItem("accessToken", JSON.stringify(response.data));

    // return response.data;
    return "login"
};

const logout = () => {
  localStorage.removeItem("accessToken");
  return "logout"
};

const authService = {
  register,
  login,
  logout,
};

export default authService;