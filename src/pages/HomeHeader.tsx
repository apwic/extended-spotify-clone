import React, { useContext } from 'react'
import { Button, Container, OverlayTrigger, Popover } from 'react-bootstrap'
import sepotipayiLogo from '../assets/logo-good-quality.png'
import '../styles/homeheader.css'
import AuthService from '../services/auth-service'
import { useNavigate } from 'react-router'
import { UserContext } from '../context/UserContext'
import { ModalContext } from '../context/ModalContext'

const HomeHeader = () => {
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    const modalContext = useContext(ModalContext);

    const handleLogout = () => {
        userContext.setUsername('');
        AuthService.signOut()
            .then((response: any) => {
                console.log(response);
                navigate('/');
            })
            .catch((e: any) => {
                modalContext.setMsg(e.response.data.message);
                modalContext.setType("error");
                modalContext.setOpen(true);
            });
    }

    const logoutButton = (
        <Popover id="popover-basic">
            <Popover.Body>
                <Button className='logoutbuttonstyle' onClick={handleLogout}>Logout ➡</Button>
            </Popover.Body>
        </Popover>
    )


    return (
        <Container fluid>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid lightgray' }}>
                <div style={{ display: 'flex', alignItems: 'left', paddingBottom: '1vw' }}>
                    <img src={sepotipayiLogo} style={{ height: '7vh', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '1vw', marginLeft: '1vw' }} />
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20vw', height: '7vh', fontWeight: 'bold', fontSize: 'clamp(1rem, 2.5vw, 1.3rem)' }}>
                        Sepotipayi Premium
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '1vw' }}>
                    <OverlayTrigger trigger="click" placement="bottom" overlay={logoutButton}>
                        <Button className='profilestyle'>Hello, <strong>{userContext.username}</strong></Button>
                    </OverlayTrigger>
                </div>
            </div>
        </Container>
  )
}

export default HomeHeader