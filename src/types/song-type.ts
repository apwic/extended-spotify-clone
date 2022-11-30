export interface ISong {
  song_id: number,
  judul: string,
  audio_path: string,
  penyanyi_id: number,
};

export interface ISongList{
  songs: Array<ISong>,
  penyanyi?: string,
};
