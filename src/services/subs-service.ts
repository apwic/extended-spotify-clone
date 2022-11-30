import http from "../http-common";
import { ISubs, ISubsList } from "../types/subs-type";

class SubsService{
  getAll() {
    return http.get<ISubsList>("/subscription");
  };

  updateStatus(data: ISubs) {
    return http.patch<any>("/subscription", data);
  }
}

export default new SubsService();