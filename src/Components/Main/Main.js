import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { mailActions } from '../../store/mailStore-slice';

import styles from './Main.module.css';
// import {useSelector, useDispatch} from 'react-redux'
import { SlArrowDown } from 'react-icons/sl';
import { SlStar } from 'react-icons/sl';

import { SlActionRedo } from 'react-icons/sl';
import { FcSms } from 'react-icons/fc';
import { SlOptionsVertical } from 'react-icons/sl';
import SideBar from '../Main/SideBar';

import useHttp from '../../hooks/use-http';

const Main = () => {
  const dispatch = useDispatch();

  const storedMails = useSelector((state) => state.mail.mails);
  console.log(storedMails);

  // storedMails.map((mail) =>{
  //   console.log("mails from map function",mail);
  // })

  const senderMail = localStorage.getItem('userMail');
  let usermail;
  const count = 0;
  const regex = /[`@.`]/g;
  if (senderMail != null) {
    usermail = senderMail.replace(regex, '');
  }

  let { sendRequest: fetchMails } = useHttp();

  let { sendRequest: updateMails } = useHttp();

  useEffect(() => {
    // setInterval(()=>{
    // getData()
    const transformTasks = (tasksObj) => {
      const loadedTasks = [];
      console.log('task from hook',tasksObj)
      Object.entries(tasksObj).forEach((item) => {
         console.log(item)
        loadedTasks.push({
          id: item[0],
          mail: item[1].senderMail,
          subject: item[1].subject,
          message: item[1].message,
          read: item[1].read,
        });
        // console.log(loadedTasks)
      });
      dispatch(mailActions.storeInBox(loadedTasks));
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
    };

    fetchMails(
      {
        url: `https://mailchat-fd967-default-rtdb.firebaseio.com/mail/${usermail}Inbox.json`,
      },
      transformTasks
    );
    // },2000)

    //  getData();
    // sendRequest();
  }, [fetchMails]);

  // function getData(){
  //   let responseData;
  //   const listOfMails = [];
  //   axios
  //   .get(
  //     `https://mailchat-fd967-default-rtdb.firebaseio.com/mail/${usermail}Inbox.json`
  //   )
  //   .then((response) => {
  //     responseData = response.data;
  //     if (responseData !== null) {
  //         Object.entries(responseData).forEach((item) => {
  //         // console.log(item);
  //         listOfMails.push({
  //           id: item[0],
  //           mail: item[1].senderMail,
  //           subject: item[1].subject,
  //           message: item[1].message,
  //           read: item[1].read,
  //         });
  //       });
  //       //  setItems(listOfMails);
  //       // dispatch.mailActions.totalMails(listOfMails);
  //       dispatch(mailActions.storeInBox(listOfMails));
  //       let count;
  //       let len = 0;
  //       Object.entries(responseData).forEach((item) => {
  //         if(item[1].read === false){
  //             // len = len + 1;
  //             len++;
  //             count = len;

  //         }
  //           console.log('data read: false count', count);
  //           dispatch(mailActions.setCount(count));
  //       })
  //     }
  //   })
  //   .catch((error) => {
  //     alert(error);
  //   });
  // }
  const ItemSelected = (item) => {
    console.log(item);

    const updatedItem = {
      id: item.id,
      mail: item.mail,
      subject: item.subject,
      message: item.message,
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
    // fetch(
    //   `https://mailchat-fd967-default-rtdb.firebaseio.com/mail/${usermail}Inbox/${item.id}.json`,
    //   {
    //     method: 'PATCH',
    //     body: JSON.stringify(updatedItem),
    //     headers: {
    //       'Content-type': 'application/json',
    //     },
    //   }
    // )
    //   .then((response) => {
    //     response.json().then((data) => {
    //       console.log('Editing item successful', data);
    //     });
    //   })
    //   .catch((err) => {
    //     alert(err.message);
    //   });

    // viewMail(item);
  };

  return (
    <div className={styles['main-container']}>
      <SideBar count={count} selected={true} />

      <div className={styles['email-section']}>
        <div className={styles['email-section-left']}>
          <span>
            <input type="checkbox" />
          </span>
          <span className={styles['sidebar-icons']}>
            <SlArrowDown />
          </span>
          <span className={styles['sidebar-icons']}>
            <SlActionRedo />
          </span>
          <span className={styles['sidebar-icons']}>
            <SlOptionsVertical />
          </span>
        </div>

        <div className={styles['email-section-right']}></div>
        {/*promotions section start */}
        <div className={styles['email-List']}>
          <div className={styles['list-header']}>
            <span>
              <h4>Primary</h4>
            </span>
          </div>
          <div className={styles['list-header']}>
            <span>
              <h4>Social</h4>
            </span>
          </div>
          <div className={styles['list-header']}>
            <span>
              <h4>Promotions</h4>
            </span>
          </div>
        </div>
        {/*promotions section end */}

        {/**inbox items list */}

        <div className={styles['emailList-list']}>
        {console.log('storedmails ',storedMails)}
          { storedMails && storedMails.map((item) => (
          
            
            
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
                    <input type="checkbox" />
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
