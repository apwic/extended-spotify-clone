import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import sepotipayiLogo from '../assets/logo-good-quality.png'

const HeaderAuth = () => {
    const location = useLocation()
    return (
        <Container fluid>
            <Row style={{ borderBottom: '2px solid lightgray' }}>
                <Col>
                    <img src={sepotipayiLogo} alt="logo-sepotipayi" style={{ height: '9vw', paddingBottom: '1vw' }} />
                    <div style={{ fontWeight: 'var(--extra_bold)', fontSize: 'clamp(0.3rem, 5vw, 2.5rem)', paddingBottom: '1vw'}}>Sepotipayi Premium</div>
                </Col>
            </Row>
            <Row>
                <div style={{ fontSize: 'clamp(0.1rem, 2vw, 1rem)', fontWeight: '400' , paddingTop: '2vw', paddingBottom: '1vw' }}>Let's {location.pathname === '/' ? 'log in to your account!' : 'create your account!'}</div>
            </Row>
        </Container>
    )
}

export default HeaderAuth