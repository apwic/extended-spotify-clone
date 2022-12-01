import React, { useContext, useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import HeaderAuth from './HeaderAuth'
import IUser from "../types/user-type"
import AuthService from '../services/auth-service'
import { UserContext } from '../context/UserContext'
import { ModalContext } from '../context/ModalContext'

const Register = () => {
    const [username, setUsername] = useState<IUser["username"]>('');
    const [email, setEmail] = useState<IUser["email"]>('');
    const [name, setName] = useState<IUser["name"]>('');
    const [password, setPassword] = useState<IUser["password"]>('');
    const [confirmPassword, setConfirmPassword] = useState<IUser["password"]>('');
    const isAdmin = false;
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    const modalContext = useContext(ModalContext);
    const regex = new RegExp(/^[a-zA-Z0-9_]*$/);

    const checkUsername = (e: React.ChangeEvent<HTMLInputElement>) => {

        setUsername(e.target.value);
        if (!regex.test(e.target.value)) {
            alert('Username must only contain alphanumeric characters and underscores.');
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        if (!regex.test(username)) {
            alert('Username must only contain alphanumeric characters and underscores.');
            return;
        }
        const data: IUser = {
            username,
            email,
            name,
            password,
            isAdmin
        }
        userContext.setUsername(username);
        AuthService.signUp(data)
            .then((response: any) => {
                const dataLogin: IUser = {
                    username,
                    password
                }
                AuthService.signIn(dataLogin)
                    .then((response: any) => {
                        console.log(response);
                        navigate('/singer');
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
            }
        );
    }

    return (
        <>
            <Row>
                <HeaderAuth />
                <Form onSubmit={handleSubmit}>
                    <Form.Label className='formstyle'>Enter your Name</Form.Label>
                    <Form.Control required className='inputstyle' type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                    <Form.Label className='formstyle'>Enter your Username</Form.Label>
                    <Form.Control required className='inputstyle' type='text' placeholder='Username' value={username} onChange={checkUsername} />
                    <Form.Label className='formstyle'>What's your Email?</Form.Label>
                    <Form.Control required className='inputstyle' type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Form.Label className='formstyle'>Enter your Password</Form.Label>
                    <Form.Control required className='inputstyle' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}  />
                    <Form.Label className='formstyle'>Confirm your Password</Form.Label>
                    <Form.Control required className='inputstyle' type='password' placeholder='Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
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