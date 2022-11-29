import React, { useState } from "react";
import HomeHeader from "./HomeHeader";
import ReactPaginate from "react-paginate";
import "../styles/singerPage.css";
import DeleteIcon from "../assets/delete-icon.png";
import EditIcon from "../assets/edit-icon.png";

const dataDummy = [
  {
    id: 1,
    judul: "Hahoahoa",
    penyanyi_id: 2,
    audio_path: "dodododo"
  },
  {
    id: 2,
    judul: "Hahoahoa",
    penyanyi_id: 2,
    audio_path: "dodododo"
  },
  {
    id: 3,
    judul: "Hahoahoa",
    penyanyi_id: 2,
    audio_path: "dodododo"
  },
  {
    id: 4,
    judul: "Hahoahoa",
    penyanyi_id: 2,
    audio_path: "dodododo"
  },
  {
    id: 5,
    judul: "Hahoahoa",
    penyanyi_id: 2,
    audio_path: "dodododo"
  },
];

interface SingerProps {
  maxData: number
}

const SingerPage = ({maxData}: SingerProps) => {
  const [offset, setOffset] = useState(0);
  const endOffset = offset + maxData;
  const currentData = dataDummy.slice(offset, endOffset);
  const pageCount = Math.ceil(dataDummy.length/maxData);
  
  const handlePageChange = (e: any) => {
    setOffset((e.selected * maxData) % dataDummy.length);
  }

  const displayData = (songData: any) => {
    return (
      <div className="singer-songlist">
        {
          songData.map((data: any, i: number) => (
            <div className="song-detail">
              <img src={EditIcon} alt="" className="song-icon"/>
              <div className="song-number">
                {i + offset + 1}
              </div>
              <div className="song-title">
                {data?.judul}
              </div>
              <img src={DeleteIcon} alt="" className="song-icon"/>
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
