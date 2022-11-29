import React, { useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import HeaderAuth from './HeaderAuth'
import IUser from "../types/user-type"
import AuthService from '../services/auth-service'

const Register = () => {
    const [username, setUsername] = useState<IUser["username"]>('');
    const [email, setEmail] = useState<IUser["email"]>('');
    const [name, setName] = useState<IUser["name"]>('');
    const [password, setPassword] = useState<IUser["password"]>('');
    const [confirmPassword, setConfirmPassword] = useState<IUser["password"]>('');
    const isAdmin = false;
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data: IUser = {
            username,
            email,
            name,
            password,
            isAdmin
        }
        AuthService.signUp(data)
            .then((response: any) => {
                console.log(response);
                navigate('/singer');
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    return (
        <>
            <Row>
                <HeaderAuth />
                <Form onSubmit={handleSubmit}>
                    <Form.Label className='formstyle'>Enter your Name</Form.Label>
                    <Form.Control className='inputstyle' type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                    <Form.Label className='formstyle'>Enter your Username</Form.Label>
                    <Form.Control className='inputstyle' type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                    <Form.Label className='formstyle'>What's your Email?</Form.Label>
                    <Form.Control className='inputstyle' type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Form.Label className='formstyle'>Enter your Password</Form.Label>
                    <Form.Control className='inputstyle' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}  />
                    <Form.Label className='formstyle'>Confirm your Password</Form.Label>
                    <Form.Control className='inputstyle' type='password' placeholder='Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <Button className='buttonstyle' type='submit'>REGISTER</Button>
                </Form>
                <div className='formstyle' style={{ marginTop: '.5vh' }}>
                    Already have an account? <Link to='/'>Log in for Sepotipayi Premium</Link>
                </div>
            </Row>
        </>
    )
}

export default Register