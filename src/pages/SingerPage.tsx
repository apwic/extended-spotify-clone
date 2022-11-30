import React, { useEffect, useState } from "react";
import HomeHeader from "./HomeHeader";
import ReactPaginate from "react-paginate";
import "../styles/singerPage.css";
import DeleteIcon from "../assets/delete-icon.png";
import EditIcon from "../assets/edit-icon.png";
import SongService from "../services/song-service";
import { ISong } from "../types/song-type";
import UserService from "../services/user-service";

interface SingerProps {
  maxData: number
}

const SingerPage = ({maxData}: SingerProps) => {
  const [offset, setOffset] = useState(0);
  const [content, setContent] =  useState(Array<ISong>);
  const endOffset = offset + maxData;
  const currentData = content.slice(offset, endOffset);
  const pageCount = Math.ceil(content.length/maxData);
  
  const handlePageChange = (e: any) => {
    setOffset((e.selected * maxData) % content.length);
  }

  const handleDelete = (id: number) => {
    SongService.deleteSong(id)
    .then((response) => {
      console.log(response);
      updatePage();
    })
    .catch((e: Error) => {
      console.log(e);
    });
  }

  const updatePage = () => {
    UserService.userAccess().then(
      (response) => {
        SongService.getByUser()
        .then((response) => {
          const data = response.data;
          setContent(data.songs);
        })
        .catch((e: Error) => {
          console.log(e);
        });
      }, 
      (error) => {
        console.log(error.response.data.message);
        setContent([]);
      }
    );
  }

  useEffect(() => {
    updatePage();
  }, []);

  useEffect(() => {
  }, [content])

  const displayData = (songData: Array<ISong>) => {
    return (
      <div className="singer-songlist">
        {
          songData.map((data: ISong, i: number) => (
            <div className="song-detail">
              <img src={EditIcon} alt="" className="song-icon hover-shadow"/>
              <div className="song-number">
                {i + offset + 1}
              </div>
              <div className="song-title">
                {data?.judul}
              </div>
              <img src={DeleteIcon} alt="" onClick={() => handleDelete(data.song_id)} className="song-icon hover-shadow"/>
            </div>
          ))
        }
      </div>
    )
  }

  return (
    <>
      <HomeHeader />
      <div className="page-title">
        Your Music
      </div>
      {displayData(currentData)}
      <ReactPaginate 
        breakLabel="..."
        nextLabel=" >"
        pageRangeDisplayed={5}
        previousLabel="< "
        onPageChange={(e) => handlePageChange(e)}
        pageCount={pageCount}
        className="singer-pagination"
      />
    </>
  );
};

export default SingerPage;
