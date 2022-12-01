import { useState, useContext} from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import HeaderAuth from './HeaderAuth'
import '../styles/auth.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import IUser from "../types/user-type"
import AuthService from "../services/auth-service"
import { UserContext } from '../context/UserContext'
import { ModalContext } from '../context/ModalContext'

const Login = () => {
  const [username, setUsername] = useState<IUser["username"]>('');
  const [password, setPassword] = useState<IUser["password"]>('');
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const modalContext = useContext(ModalContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: IUser = {
      username,
      password
    }
    userContext.setUsername(username);
    AuthService.signIn(data)
      .then((response: any) => {
        response.isAdmin ? navigate('/admin') : navigate('/singer');
      })
      .catch((e: any) => {
        modalContext.setMsg(e.response.data.message);
        modalContext.setType("error");
        modalContext.setOpen(true);
    });
  }

  return (
    <>
        <Row>
            <HeaderAuth />
            <Form onSubmit={handleSubmit}>
                <Form.Label className='formstyle'>Enter your Username</Form.Label>
                <Form.Control className='inputstyle' type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                <Form.Label className='formstyle'>Enter your Password</Form.Label>
                <Form.Control className='inputstyle' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button className='buttonstyle' type='submit'>LOG IN</Button>
            </Form>
            <div className='formstyle' style={{ marginTop: '1vh' }}>
                Don't have an account? <Link to='/register'>Register for Sepotipayi Premium</Link>
            </div>
        </Row>
    </>
  )
}

export default Login