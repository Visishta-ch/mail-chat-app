import React, { useState, useEffect } from 'react';
import Header from './Header/Header';
import styles from './Inbox.module.css';
import {NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { mailActions } from '../store/mailStore-slice';
import axios from 'axios';
import Nav from '../Layout/Nav';
import SideBar from '../Components/Main/SideBar'
const Inbox = () => {
  const dispatch = useDispatch();
  const count = useSelector(state => state.mail.count);
  console.log('count of unread mails from dispatch', count)
  const storedMails = useSelector(state => state.mail.inmails);
  const mail = useSelector((state) => state.auth.userMail);
  console.log("login mail ",mail);
  // const storedMails = useSelector(state=> state.mail);
 // console.log(storedMails);
  const senderMail = localStorage.getItem('userMail');
  let usermail;
  const regex = /[`@.`]/g;
  if (senderMail != null) {
    usermail = senderMail.replace(regex, '');
  }

  // const [mail, setMail] = useState([]);
  let responseData;
  useEffect(() => {
    const listOfMails = [];
    axios
      .get(
        `https://mailchat-fd967-default-rtdb.firebaseio.com/mail/${usermail}Sentbox.json`
      )
      .then((response) => {
        responseData = response.data;
        console.log(responseData);
        // dispatch(mailActions.totalMails(responseData));
        let keys = Object.entries(responseData);
        console.log(keys);
        // console.log('mail:', keys[0][1].mailDetails)
        // let value = keys[0][1].mailDetails;
        // console.log(value)
        // let d = {
        //   mail: value.senderMail,
        //   subject: value.subject,
        //   receiverMail: value.receiverMail,
        //   message: value.message
        // }
        // console.log(d)
        Object.entries(responseData).forEach((item) => {
          listOfMails.push({
            id: item[0],
            mail: item[1].mailDetails.receiverMail,
            subject: item[1].mailDetails.subject,
            message: item[1].mailDetails.msg,
            senderMail: item[1].mailDetails.senderMail,
          });
        });
        console.log(listOfMails);
        dispatch(mailActions.storeInBox(listOfMails));
      })
      .catch((error) => {
        alert(error);
      });
  }, [mail]);

  return (
    <div>
      <Nav />
      <Header />
      <h1>SentBox</h1>
      <div style={{display: 'flex'}}>
      <SideBar count={count}/>
      <div className={styles.container} >
      
        <div className={styles.sentSectionHeader}>
            <h2>primary</h2>
        </div>
        {storedMails.length != 0 && (
          <div className={styles.itemList}>
        
            {mail && storedMails.map((item) => (
              <NavLink to={{
                 pathname: `/welcome/SentboxVeiw/${item.id}`,
                state: {
                  senderMail: item.mail,
                  subject: item.subject,
                  message: item.message,
                 id: item.id,
                },
              }} key={item.id} id={item.id} className={styles.arrayItem}>
                <span className={styles.mailTo}>
                    To :
                    <h3>{item.mail}</h3></span>
                    <div className={styles.emailMessage}>
                    <span className={styles.mailSubject}>{item.subject}</span>
                    <span className={styles.mailBody}>{item.message}</span>
                    </div>
               
              </NavLink>
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default Inbox;
