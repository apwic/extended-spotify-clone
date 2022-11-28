import http from "../http-common";
import ISong from "../types/song-type";

class SongService {
  getAll() {
    return http.get<Array<ISong>>("/songs");
  };

  getById(id: string){
    return http.get<ISong>(`/songs?id=${id}`);
  };

  getByPenyanyiId(penyanyi_id: string){
    return http.get<Array<ISong>>(`/songs?penyanyi_id=${penyanyi_id}`);
  };
}