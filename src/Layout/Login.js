import React, { useRef, useState, useEffect } from 'react';
import styles from './Login.module.css';
import {useSelector, useDispatch} from 'react-redux'
import {authActions} from '../store/auth-slice'
import {Link, useHistory} from 'react-router-dom'


const Login = () => {

    const dispatch = useDispatch();

    const isLoggedin = useSelector(state=> state.auth.isLogin);
    const userToken = useSelector(state=> state.auth.token);
    const loggedInMail = useSelector(state=> state.auth.userMail)
    console.log('usermail',loggedInMail)
    console.log('token',userToken);
    console.log(' login status from Slice',isLoggedin);
    const emailRef = useRef();
    const passwordRef = useRef();
    const history = useHistory();
 
  const [isLogin, setIsLogin] = useState(false);

  const [error, setError] = useState('');

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
   }
  //  useEffect(()=>{
  //   console.log('isLogin',isLoggedin)
  //  },[isLoggedin])

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredMail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    // dispatch(authActions.setUserMail(enteredMail))
    // console.log('submit')
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD7IxQwW78e-6m5zIPTWJFNAzZNUEP7UDo',
    {
        method: 'POST',
        body: JSON.stringify({
            email: enteredMail,
            password: enteredPassword,
            returnSecureToken: true

        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res=>{
        if(res.ok){
          //   console.log('login authenticated')
          //  console.log(enteredMail);
           dispatch(authActions.setUserMail(enteredMail));
            return res.json()
        }else{
            return res.json().then(data=>{
                let error = 'login failed';
                if(data && data.error && data.error.message){
                    error = data.error.message
                }
                throw new Error(error);
            })
        }
    }).then(data=>{
        // console.log('login successful', data);
        // console.log('email', data.email);
        dispatch(authActions.setUserMail(data.email));
         dispatch(authActions.login(data.idToken));
         history.push('/welcome')
        
    }).catch(error=>{
        alert(error);
    })

  };
  return (
    <>
      <section className={styles.container}>
        <div></div>
        <div className={styles.content}>
          <header>Login</header>
          <form className={styles['form-div']} onSubmit={submitHandler}>
            <input type="email" placeholder="Email" ref={emailRef} required />
            <br />
            <input
              type="password"
              placeholder="Password"
              ref={passwordRef}
              required
            />
            <br />

            <span>{error}</span>
            <br />
            <button className={styles['signup-btn']}>Login</button>
            <Link to ='/forgetPassword' className={styles['login-btn1']} >Forgot Password</Link>
          </form>
          {!isLogin && (
            <Link
              to="/"
              className={styles['login-btn']}
              onClick={switchAuthModeHandler}
            >
              New ? Create an Account
            </Link>
          )}
          
        </div>

        <div className={styles['div-style']}></div>
      </section>
    </>
  );
};

export default Login;
