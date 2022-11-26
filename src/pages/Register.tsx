import React from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import HeaderAuth from './HeaderAuth'

const Register = () => {
    return (
        <div>
            <Row>
                <HeaderAuth />
                <Form>
                    <Form.Label className='formstyle'>Enter your Username</Form.Label>
                    <Form.Control className='inputstyle' type='text' placeholder='Username' />
                    <Form.Label className='formstyle'>What's your Email?</Form.Label>
                    <Form.Control className='inputstyle' type='email' placeholder='Email' />
                    <Form.Label className='formstyle'>Enter your Password</Form.Label>
                    <Form.Control className='inputstyle' type='password' placeholder='Password' />
                    <Form.Label className='formstyle'>Confirm your Password</Form.Label>
                    <Form.Control className='inputstyle' type='password' placeholder='Password' />
                    <Button className='buttonstyle'>REGISTER</Button>
                </Form>
                <div className='formstyle' style={{ marginTop: '.5vh' }}>
                    Already have an account? <Link to='/'>Log in for Sepotipayi Premium</Link>
                </div>
            </Row>
        </div>
    )
}

export default Register