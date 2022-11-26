import React from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import HeaderAuth from './HeaderAuth'
import '../styles/auth.css'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div>
        <Row>
            <HeaderAuth />
            <Form>
                <Form.Label className='formstyle'>Enter your Username</Form.Label>
                <Form.Control className='inputstyle' type='text' placeholder='Username' />
                <Form.Label className='formstyle'>Enter your Password</Form.Label>
                <Form.Control className='inputstyle' type='password' placeholder='Password' />
                <Button className='buttonstyle'>LOG IN</Button>
            </Form>
            <div className='formstyle' style={{ marginTop: '1vh' }}>
                Don't have an account? <Link to='/register'>Register for Sepotipayi Premium</Link>
            </div>
        </Row>
    </div>
  )
}

export default Login