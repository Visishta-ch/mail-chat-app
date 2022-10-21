import React, {useRef, useState} from 'react'
import {Link, useHistory} from 'react-router-dom';
// import {useHistory} from 'react-router-dom'
import styles from './SignUp.module.css'


const SignUp = () => {
    const history = useHistory();
    const emailRef = useRef();
    const passwordRef = useRef();
    const cpref = useRef();
    const [isLogin, setIsLogin] = useState(false);
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState('');

    // let history = useHistory();


    var strongRegex = new RegExp(
        '^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})'
        );

        const switchAuthModeHandler = () => {
            setIsLogin((prevState) => !prevState);
            console.log('loginin')
            // history.push('/Login');
        }

    const submitHandler = (e) => {
        e.preventDefault();

        const enteredMail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;
        const confirmPswd = cpref.current.value;

        console.log('Entered', enteredMail,enteredPassword,confirmPswd);
        setLoading(true);
         if(enteredPassword !== confirmPswd){
            setError('Confirm password shoul match with password entered');
         }
         if(enteredPassword.length < 6 || !strongRegex.test(enteredPassword)){
            setError('password should atleast have 6 characters and should have special characters');
         }

         if(enteredPassword === confirmPswd){
            fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD7IxQwW78e-6m5zIPTWJFNAzZNUEP7UDo',
            {
                method: 'POST',
                body: JSON.stringify({
                    email: enteredMail,
                    password:enteredPassword,
                    returnSecureToken: true
                }),
                headers: { 
                    'Content-Type': 'application/json'
                }
            }).then(response =>{
                    setLoading(false);
                    if(response.ok){
                        return response.json();
                    }else{
                        return response.json().then((data) => {
                            let errorMessage = 'Authentication failed';
                            if(data && data.error && data.error.message){
                                errorMessage = data.error.message;
                            }
                            throw new Error(errorMessage)
                        })
                    }
            }).then(data=> {
                console.log('signup successful', data);
                history.replace('/Login')
        
            }).catch(error => {
                alert('error', error)
            })
         }

    }

  return (
    <>

        <section className={styles.container}>
            <div></div>        
            <div className={styles.content}>
            <header>Sign Up</header>
                <form className={styles['form-div']} onSubmit={submitHandler}>
                    <input type="email"  placeholder="Email"  ref={emailRef} required />
                    <br/>
                    <input type="password" placeholder="Password" ref={passwordRef} required />
                    <br/>
                    <input type="password" placeholder=" Confirm Password"  ref={cpref} required/>
                    <span>{error}</span>
                    <br/>
                    <button className={styles['signup-btn']}>SignUp</button>
                </form>
               {!isLogin && <Link to='/Login'  className={styles['login-btn']} onClick={switchAuthModeHandler}>Have an Account? Login</Link>}
               {loading && <p className={styles.error}>Sending request to signup</p>}
               
            </div>
            
        <div  className={styles['div-style']}></div>
        
        </section>
    </>
  )
}

export default SignUp