import React from 'react'
import {useHistory } from 'react-router-dom';
import styles from './Welcome.module.css'
import {useDispatch} from 'react-redux'
import { authActions } from '../store/auth-slice'
import Nav from '../Layout/Nav'

const Welcome = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  dispatch(authActions.isLoginAuthenticated());
   const createMailHandler = () => {
        console.log('createMailHandler');
        history.replace('/mail');
        

    }
  return (
    <div>
        
        <Nav/>

         <div className={styles.mail}> 
        <button className={styles['compose-btn']} onClick={createMailHandler}>Compose Mail</button>
        </div> 
    </div>
  )
}

export default Welcome