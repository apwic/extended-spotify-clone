import React, { useState, useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import HomeHeader from './HomeHeader'
import '../styles/adminpage.css'
import UserService from "../services/user-service"

const AdminPage = () => {
    const [content, setContent] = useState(<></>);

    useEffect(() => {
      UserService.adminAccess().then(
        (response) => {
          setContent(<>
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
                  {dataDummy.map((data) => {
                      return (
                          <tr>
                              <td className="infosyle">{data.username}</td>
                              <td className="infosyle">{data.singerName}</td>
                              <td className="infosyle">Pending</td>
                              <td className="actionstyle">
                                  <Button className='acceptstyle' href='/admin'>Approve</Button>
                                  <Button className='rejectstyle' href='/admin'>Reject</Button>
                              </td>
                          </tr>
                      )
                  })}
              </tbody>
          </Table>
          </>);
        },
        (error) => {
          const _content = error.response.data.message
          console.log(_content);

          setContent(<>
            <h1>{_content}</h1>
          </>);
        }
      );
    }, []);

    const dataDummy = [
        {
            id : 1,
            idUser : 1,
            username : 'Lalalala',
            idSinger : 1,
            singerName : 'Lalalala',
        },
        {
            id : 2,
            idUser : 2,
            username : 'dodododo',
            idSinger : 2,
            singerName : 'dodododo',
        },
        {
            id : 3,
            idUser : 2,
            username : 'dodododo',
            idSinger : 3,
            singerName : 'kotktotkotk',
        },
        {
            id : 4,
            idUser : 3,
            username : 'kotktotkotk',
            idSinger : 4,
            singerName : 'hahshahsa',
        },
        {
            id : 5,
            idUser : 4,
            username : 'hfafafa',
            idSinger : 5,
            singerName : 'hfaafafa',
        }
    ]

    return (content)
}

export default AdminPage