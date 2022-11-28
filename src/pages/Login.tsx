import { Component, ChangeEvent} from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import HeaderAuth from './HeaderAuth'
import '../styles/auth.css'
import { Link } from 'react-router-dom'
import { PropsFromToggle } from 'react-bootstrap/esm/DropdownToggle'
import IUser from "../types/user-type"
import AuthService from "../services/auth-service"


// const Login = () => {
  // return (
  //   <>
  //       <Row>
  //           <HeaderAuth />
  //           <Form>
  //               <Form.Label className='formstyle'>Enter your Username</Form.Label>
  //               <Form.Control className='inputstyle' type='text' placeholder='Username' />
  //               <Form.Label className='formstyle'>Enter your Password</Form.Label>
  //               <Form.Control className='inputstyle' type='password' placeholder='Password' />
  //               <Button className='buttonstyle' href='/admin'>LOG IN</Button>
  //           </Form>
  //           <div className='formstyle' style={{ marginTop: '1vh' }}>
  //               Don't have an account? <Link to='/register'>Register for Sepotipayi Premium</Link>
  //           </div>
  //       </Row>
  //   </>
  // )
// }

type Props = {};
type State = IUser;

export default class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.signIn = this.signIn.bind(this);

    this.state = {
      username: "",
      password: ""
    };
  }

  onChangeUsername(e: ChangeEvent<HTMLInputElement>){
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e: ChangeEvent<HTMLInputElement>){
    this.setState({
      password: e.target.value
    });
  }

  signIn() {
    console.log(this.state);
    const data: IUser = {
      username: this.state.username,
      password: this.state.password
    };

    AuthService.signIn(data)
      .then((response: any) => {
        console.log(response);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render () {
    const { username, password } = this.state;

    return (
      <>
          <Row>
              <HeaderAuth />
              <Form>
                  <Form.Label className='formstyle'>Enter your Username</Form.Label>
                  <Form.Control className='inputstyle' type='text' placeholder='Username' value={username} onChange={this.onChangeUsername} name="username"/>
                  <Form.Label className='formstyle'>Enter your Password</Form.Label>
                  <Form.Control className='inputstyle' type='password' placeholder='Password' value={password} onChange={this.onChangePassword} name="password"/>
                  <Button className='buttonstyle' onClick={this.signIn}>LOG IN</Button>
              </Form>
              <div className='formstyle' style={{ marginTop: '1vh' }}>
                  Don't have an account? <Link to='/register'>Register for Sepotipayi Premium</Link>
              </div>
          </Row>
      </>
    )
  }
}