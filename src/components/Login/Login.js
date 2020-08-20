import React from 'react';
import Button from '@material-ui/core/Button';
import logo from '../../assets/logo.png';
import { provider, auth } from '../../firebase/firebase';
import { useStateValue } from '../../context/StateProvider';

const Login = () => {
  const [state, dispatch] = useStateValue();

  const login = () => {
    auth.signInWithPopup(provider)
      .then(res => {
        dispatch({
          type: 'SET_USER',
          payload: res.user
        })
      }).catch(err => {
        console.log(err);
      });
  }
  return (
    <div className="login">
      <img src={logo} alt="logo" className="main__logo" />
      <h1>Login</h1>
      <Button variant="contained" type="submit" onClick={login} className="login__btn" >
        Sign In With Google
      </Button>
    </div>
  )
}

export default Login;
