import axios from "axios"
import http from "../http-common"

class UserService {
  allAccess() {
    return http.get<any>("/test/all");
  }

  userAccess() {
    return http.get<any>("/test/user");
  }

  adminAccess() {
    return http.get<any>("/test/admin");
  }
}

export default new UserService();