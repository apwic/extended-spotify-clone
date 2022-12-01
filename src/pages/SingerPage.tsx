import React, { useContext, useEffect, useState } from "react";
import HomeHeader from "./HomeHeader";
import ReactPaginate from "react-paginate";
import "../styles/singerPage.css";
import DeleteIcon from "../assets/delete-icon.png";
import EditIcon from "../assets/edit-icon.png";
import SongService from "../services/song-service";
import { ISong } from "../types/song-type";
import UserService from "../services/user-service";
import { Button, Container, Form, Row } from "react-bootstrap";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { ModalContext } from "../context/ModalContext";
import { UserContext } from "../context/UserContext";
interface SingerProps {
  maxData: number
}

const SingerPage = ({maxData}: SingerProps) => {
  const [offset, setOffset] = useState(0);
  const [content, setContent] =  useState(Array<ISong>);
  const [music, setMusic] = useState<ISong["judul"]>("");
  const [fileSelected, setFileSelected] = useState<File | null | undefined>();
  const [editFile, setEditFile] = useState<File | null | undefined>();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState<ISong>();
  const endOffset = offset + maxData;
  const currentData = content.slice(offset, endOffset);
  const pageCount = Math.ceil(content.length/maxData);
  const modalContext = useContext(ModalContext);
  const userContext = useContext(UserContext);
  
  const getFilesChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileSelected(e.target.files[0]);
    }
  }

  const getFilesEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setEditFile(e.target.files[0]);
    }
  }

  const handlePageChange = (e: any) => {
    setOffset((e.selected * maxData) % content.length);
  }

  const handleDelete = (id: number) => {
    SongService.deleteSong(id)
    .then((response) => {
      console.log(response);
      updatePage();
    })
    .catch((e: any) => {
      modalContext.setMsg(e.response.data.message);
      modalContext.setType("error");
      modalContext.setOpen(true);
  });
  }

  const handleCreate = () => {
    setOpen(false);
    if (fileSelected) {
      const formData = new FormData();
      formData.append("judul", music);
      formData.append("file", fileSelected, fileSelected.name);
      SongService.createSong(formData)
        .then((response) => {
          console.log(response);
          modalContext.setMsg("Song added!");
          modalContext.setType("popup");
          modalContext.setOpen(true);
          updatePage();
        })
        .catch((e: any) => {
            modalContext.setMsg(e.response.data.message);
            modalContext.setType("error");
            modalContext.setOpen(true);
        });
    }
    setFileSelected(undefined);
  }

  const handleUpdate = (id: number) => {
    if (editFile) {
      const formData = new FormData();
      formData.append("id", id.toString());
      formData.append("judul", music);
      formData.append("file", editFile, editFile.name);
      SongService.updateSong(formData)
        .then((response) => {
          console.log(response);
          updatePage();
        })
        .catch((e: any) => {
          modalContext.setMsg(e.response.data.message);
          modalContext.setType("error");
          modalContext.setOpen(true);
        });
    } else {
      const formData = new FormData();
      formData.append("id", id.toString());
      formData.append("judul", music);
      SongService.updateSong(formData)
        .then((response) => {
          console.log(response);
          updatePage();
        })
        .catch((e: any) => {
          modalContext.setMsg(e.response.data.message);
          modalContext.setType("error");
          modalContext.setOpen(true);
        });
    }
    setEditFile(undefined);
  }

  const updatePage = () => {
    UserService.userAccess().then(
      (response) => {
        SongService.getByUser()
        .then((response) => {
          const data = response.data;
          setContent(data.songs);
        })
        .catch((e: any) => {
          modalContext.setMsg(e.response.data.message);
          modalContext.setType("error");
          modalContext.setOpen(true);
        });
      }, 
      (e: any) => {
        modalContext.setMsg(e.response.data.message);
        modalContext.setType("error");
        modalContext.setOpen(true);
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
            <div className="song-detail" key={i}>
              <img src={EditIcon} alt="" className="song-icon hover-shadow" onClick={() => {setEdit(true); setId(data)}} />
              {id ? 
                <Modal open={edit} onClose={() => setEdit(false)} center>
                  <Container>
                    <Row>
                      <Form>
                        <Form.Label className='placeholderstyle'>Edit your Music Title</Form.Label>
                        <Form.Label className='currentstyle'>Your Current Music Title : {id.judul}</Form.Label>
                        <Form.Control className='inputsongstyle' type="text" placeholder={id.judul} onChange={(e) => setMusic(e.target.value)} />
                        <Form.Label className='placeholderstyle'>Edit your Music File</Form.Label>
                        <Form.Label className='currentstyle'>Your Current Music File : {(id.audio_path).substring(30)}</Form.Label>
                        <Form.Control className='inputsongstyle' type="file" accept="audio/*" onChange={getFilesEdit} />
                        <Button className="submitaddsong" onClick={() => handleUpdate(id.song_id)}>UPDATE</Button>
                      </Form>
                    </Row>
                  </Container>
                </Modal>
              : null}
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
      <div className="content-section">
        <div className="page-title">
          <div>Your Music</div>
          <Button className="addbutton" onClick={() => setOpen(true)}>+</Button>
          <Modal open={open} onClose={() => setOpen(false)} center>
            <Container>
              <Row>
                <Form>
                  <Form.Label className='placeholderstyle'>Enter your Music Title</Form.Label>
                  <Form.Control className='inputsongstyle' type="text" placeholder="Music Title" onChange={(e) => setMusic(e.target.value)} />
                  <Form.Label className='placeholderstyle'>Insert your Music File</Form.Label>
                  <Form.Control className='inputsongstyle' type="file" accept="audio/*" onChange={getFilesChanges}/>
                  <Button className="submitaddsong" onClick={handleCreate}>ADD SONG</Button>
                </Form>
              </Row>
            </Container>
          </Modal>
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
      </div>
    </>
  );
};

export default SingerPage;
