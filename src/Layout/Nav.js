import React from 'react'
import styles from '../Pages/Welcome.module.css'
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {authActions} from '../store/auth-slice'

const Nav = () => {
    const mail = localStorage.getItem('userMail');
   
    const dispatch = useDispatch();
    const history = useHistory();
    
    const logoutHandler=()=>{
      window.location.reload(true);
        dispatch(authActions.logout());
        // alert('logging out')
        history.push('/Login')
       
    }
    
    
  return (
    <>  <div>
         <nav className={styles.nav}>
            <header>Welcome to your Mail Box </header>
             <button className={styles['logout-btn']} onClick={logoutHandler}>logout</button>       
        </nav><br/>
        <span> Logged in: </span> <span style={{fontSize:'14px'}}>{mail}</span> <br></br>
        
        </div>
        <hr></hr>
    </>
  )
}

export default Nav