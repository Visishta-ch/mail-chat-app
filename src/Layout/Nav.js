import React from 'react'
import styles from '../Pages/Welcome.module.css'
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {authActions} from '../store/auth-slice'

const Nav = () => {
    const mail = localStorage.getItem('userMail');
    const dispatch = useDispatch();
    const history = useHistory();
    const logoutHandler =()=>{
        dispatch(authActions.logout());
        history.push('/Login')
        console.log('user logged out')
    }
  return (
    <>
         <nav className={styles.nav}>
            <header>Welcome to your Mail Box </header>
             <button className={styles['logout-btn']} onClick={logoutHandler}>logout</button>       
        </nav>
        Logged in:  <p styles={{fontSize:'14px'}}>{mail}</p> 
        <hr></hr>
    </>
  )
}

export default Nav