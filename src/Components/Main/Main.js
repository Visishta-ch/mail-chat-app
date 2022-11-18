import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { mailActions } from '../../store/mailStore-slice';
import styles from './Main.module.css';
import { SlStar } from 'react-icons/sl';
import { FcSms } from 'react-icons/fc';
import SideBar from '../Main/SideBar';
import Icons from './Icons'

import useHttp from '../../hooks/use-http';

const Main = () => {
  const dispatch = useDispatch();

  const storedMails = useSelector((state) => state.mail.mails);
  console.log(storedMails);
  const mail = useSelector((state) => state.auth.userMail);
  console.log("login mail ",mail);
  const unRead = useSelector(state => state.mail.count);
  console.log('unread', unRead)
  const senderMail = localStorage.getItem('userMail');
  let usermail;
  // const count = 0;
  const regex = /[`@.`]/g;
  if (senderMail != null ) {
    usermail = senderMail.replace(regex, '');
  }
console.log(usermail);
  let { sendRequest: fetchMails } = useHttp();

  let { sendRequest: updateMails } = useHttp();

  useEffect(() => {
   
    const transformTasks = (tasksObj) => {
      const loadedTasks = [];
      console.log('task from hook',tasksObj)
     {tasksObj!==null && Object.entries(tasksObj).forEach((item) => {
         console.log(item)
        loadedTasks.push({
          id: item[0],
          mail: item[1].senderMail,
          subject: item[1].subject,
          message: item[1].msg,
          read: item[1].read,
        });
        console.log(loadedTasks)
      });
      dispatch(mailActions.totalMails(loadedTasks));
      let count;
      let len = 0;
      Object.entries(tasksObj).forEach((item) => {
        if (item[1].read === false) {
          // len = len + 1;
          len++;
          count = len;
        }
        // console.log('data read: false count', count);
        dispatch(mailActions.setCount(count));
      });
    }};

    fetchMails(
      {
        url: `https://mailchat-fd967-default-rtdb.firebaseio.com/mail/${usermail}Inbox.json`,
      },
      transformTasks
    );
    
  }, [fetchMails, mail]);

  const ItemSelected = (item) => {
    console.log(item);

    const updatedItem = {
      id: item.id,
      mail: item.mail,
      subject: item.subject,
      message: item.msg,
      read: true,
    };

    console.log(updatedItem);
    const update = (data) => {
      console.log('data updated',data);
    };
    // setView(true);
    updateMails(
      {
        url: `https://mailchat-fd967-default-rtdb.firebaseio.com/mail/${usermail}Inbox/${item.id}.json`,
        method: 'PATCH',
        body: updatedItem,
        headers: {
          'Content-type': 'application/json',
        },
      },
      update
    );
   
  };

  return (
    <div className={styles['main-container']}>
      <SideBar count={unRead} selected={true} />

      <div className={styles['email-section']}>
      <Icons />
      
       <div className={styles['emailList-list']}>
        {console.log('storedmails ',storedMails)}
          { mail && storedMails && storedMails.map((item) => (
          
            
            
            <NavLink
              to={{
                pathname: `/welcome/veiwMail/${item.id}`,
                state: {
                  senderMail: item.mail,
                  subject: item.subject,
                  message: item.message,
                  id: item.id,
                },
              }}
              key={item.id}
              id={item.id}
              className={styles.arrayItem}
              onClick={() => {
                ItemSelected(item);
              }}
            >
              <div className={styles.emailRow}>
                <div className={styles['emailRow-options']}>
                  <span>
                    <input type="checkbox" id={item.id}/>
                  </span>
                  <span>
                    <SlStar />
                  </span>
                  {item.read === false && (
                    <span>
                      <FcSms />
                    </span>
                  )}
                </div>
              </div>
              <h3 className={styles.title}>{item.mail}</h3>

              <div className={styles.emailMessage}>
                <h4>{item.subject}</h4>
                <p>{item.message}</p>
              </div>
            </NavLink> 
          ))} 
        </div>
      </div>
    </div>
  );
};

export default Main;
