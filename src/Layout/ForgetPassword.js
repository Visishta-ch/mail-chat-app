import React,{ useRef} from 'react';
import {useHistory} from 'react-router-dom'
import '../App.css'


const ForgetPassword = () => {
    const history = useHistory();
    const emailInputRef = useRef()
    const verifyMailHandler = (e) => {
        e.preventDefault();
        const email =  emailInputRef.current.value;
        console.log(email);
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD7IxQwW78e-6m5zIPTWJFNAzZNUEP7UDo',
        {
            method: 'POST',
            body:JSON.stringify({
                requestType:"PASSWORD_RESET",
                email:email,
            }),
            headers: {
                'Content-Type':'application/json'
            }
        }).then(res=>{
            if(res.ok){
                return res.json();
            }else {
                return res.json().then((data) => {
                    let errorMessage = 'Authentication failed Email is not registered';
                    if(data && data.error && data.error.message){
                        errorMessage = data.error.message;
                    }
                    throw new Error(errorMessage);
                })
            }
        }).then(data=>{
            alert('Password reset link sent');
            console.log(data);
            history.replace('/Login')

        }).catch(error=>{alert(error.message)})
    }
  return (
    <>
      <div className="centered">
      <form className='form' onSubmit={verifyMailHandler}>
            <header>Enter your registered email address</header>

            <div className="fp-div">
              <input
                className="form-control"
                type="text"
                name="email"
                placeholder="Email"
                id="email"
                required
                ref={emailInputRef}
              />




                <button className='btn' >SEND LINK</button>
                </div>
                </form>
      </div>
    </>
  );
};

export default ForgetPassword;
