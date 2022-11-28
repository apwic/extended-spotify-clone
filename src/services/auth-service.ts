import http from "../http-common";
import IUser from "../types/user-type";

class AuthService {
  signIn(data: IUser) {
    return http.post<any>("/auth/signin", data);
  }

  signUp(data: IUser) {
    return http.post<any>("/auth/signup", data);
  }

  signOut(){
    return http.post<any>("/auth/signout");
  }
};

export default new AuthService();