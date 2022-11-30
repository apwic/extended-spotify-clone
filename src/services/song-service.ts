import http from "../http-common";
import { ISong, ISongList } from "../types/song-type";

class SongService {
  getAll() {
    return http.get<ISongList>("/songs");
  };

  getByUser() {
    return http.get<ISongList>("/songs/user");
  }

  getById(id: string){
    return http.get<ISong>(`/songs?id=${id}`);
  };

  getByPenyanyiId(penyanyi_id: string){
    return http.get<ISongList>(`/songs?penyanyi_id=${penyanyi_id}`);
  };

  deleteSong(id: number){
    return http.delete<any>(`/songs?id=${id}`);
  }
}

export default new SongService();