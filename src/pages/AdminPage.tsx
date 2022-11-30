import React, { useState, useEffect, useContext } from 'react'
import { Table, Button } from 'react-bootstrap'
import HomeHeader from './HomeHeader'
import '../styles/adminpage.css'
import UserService from "../services/user-service"
import SubsService from '../services/subs-service'
import { ISubs } from '../types/subs-type'


const AdminPage = () => {
    const [content, setContent] = useState(Array<ISubs>);
    
    const handleButton = (subs: ISubs, status: string) => {
      const data: ISubs = {creatorId: subs.creatorId, subscriberId: subs.subscriberId, status: status}
      SubsService.updateStatus(data)
        .then((response) => {
          console.log(response);
          updatePage();
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }

    const updatePage = () => {
      UserService.adminAccess().then(
        (response) => {
          SubsService.getAll().then((response) => {
            const data = response.data.subscription;
            setContent(data);
          });
        },
        (error) => {
          const _content = error.response.data.message
          console.log(_content);

          setContent([]);
        }
      );
    }

    useEffect(() => {
      updatePage();
    }, []);

    useEffect(() => {
    }, [content])

    return (
      <>
        <HomeHeader />
        <div className="title">
            User's Subscription Requests
        </div>
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
                {content.map((data) => {
                    return (
                        <tr>
                            <td className="infosyle">{data.subscriberName}</td>
                            <td className="infosyle">{data.creatorName}</td>
                            <td className="infosyle">{data.status}</td>
                            <td className="actionstyle">
                                <Button className='acceptstyle' onClick={() => handleButton(data, "APPROVE")}>Approve</Button>
                                <Button className='rejectstyle' onClick={() => handleButton(data, "REJECTED")}>Reject</Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
      </>
    )
}

export default AdminPage