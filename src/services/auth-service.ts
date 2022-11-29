import http from "../http-common";
import IUser from "../types/user-type";

class AuthService {
  signIn(data: IUser) {
    return http.post<any>("/auth/signin", data)
      .then((response) => {
          if (response.data.username) {
            console.log("test");
            localStorage.setItem("user", JSON.stringify(response.data));
          }
      
          return response.data;
      });
  }

  signUp(data: IUser) {
    return http.post<any>("/auth/signup", data);
  }

  signOut(){
    return http.post<any>("/auth/signout")
      .then((response) => {
        localStorage.removeItem("user");
        return response.data;
      });
  }

  getCurrentUser(){
    return JSON.parse(localStorage.getItem("user") || '{}');
  }
};

export default new AuthService();