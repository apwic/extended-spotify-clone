import React, { useState, useEffect, useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import HomeHeader from './HomeHeader';
import ReactPaginate from "react-paginate";
import '../styles/adminpage.css';
import UserService from "../services/user-service";
import SubsService from '../services/subs-service';
import { ISubs } from '../types/subs-type';
import { ModalContext } from '../context/ModalContext';
import { UserContext } from '../context/UserContext';

interface SubsProps {
  maxData: number
}

const AdminPage = ({maxData}: SubsProps) => {
    const [offset, setOffset] = useState(0);
    const [content, setContent] = useState(Array<ISubs>);
    const endOffset = offset + maxData;
    const currentData = content.slice(offset, endOffset);
    const pageCount = Math.ceil(content.length/maxData);
    const modalContext = useContext(ModalContext);
    const userContext = useContext(UserContext);

    const handlePageChange = (e: any) => {
      setOffset((e.selected * maxData) % content.length);
    }
    
    const handleButton = (subs: ISubs, status: string) => {
      const data: ISubs = {creatorId: subs.creatorId, subscriberId: subs.subscriberId, status: status}
      SubsService.updateStatus(data)
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

    const updatePage = () => {
      UserService.adminAccess().then(
        (response) => {
          SubsService.getAll()
          .then((response) => {
            const data = response.data.subscription;
            setContent(data);
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

    const displayData = (subsData: Array<ISubs>) => {
      return (
        <Table striped hover variant='dark'>
          <thead>
                <tr>
                    <th>Users</th>
                    <th>Singers</th>
                    <th>Status</th>
                    <th className="actionstyle">Action</th>
                </tr>
            </thead>
            <tbody>
                {subsData.map((data: ISubs, i: number) => {
                    return (
                        <tr key={i}>
                            <td className="infosyle">{data.subscriberName}</td>
                            <td className="infosyle">{data.creatorName}</td>
                            <td className="infosyle">{data.status}</td>
                            <td className="actionstyle">
                                <Button className='acceptstyle' onClick={() => handleButton(data, "ACCEPTED")}>Accept</Button>
                                <Button className='rejectstyle' onClick={() => handleButton(data, "REJECTED")}>Reject</Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
      )
    }

    return (
      <>
        <HomeHeader />
        <div className='content-section'>
          <div className="title">
              User's Subscription Requests
          </div>
          {displayData(currentData)}
          <ReactPaginate 
            breakLabel="..."
            nextLabel=" >"
            pageRangeDisplayed={5}
            previousLabel="< "
            onPageChange={(e) => handlePageChange(e)}
            pageCount={pageCount}
            className="subs-pagination"
          />
        </div>
      </>
    )
}

export default AdminPage