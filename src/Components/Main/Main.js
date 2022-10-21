import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styles from './Main.module.css';
import { TfiPlus } from 'react-icons/tfi';
import { RiInboxLine } from 'react-icons/ri';
import { RiSendPlaneFill } from 'react-icons/ri';
import { SlArrowDown } from 'react-icons/sl';
import { SlStar } from 'react-icons/sl';
import { SlPhone } from 'react-icons/sl';
import { SlUser } from 'react-icons/sl';
import { MdOutlineDuo } from 'react-icons/md';
import { SlActionRedo } from 'react-icons/sl';
import { SlOptionsVertical } from 'react-icons/sl';

const Main = () => {
//   let receiverMailId = useSelector((state) => state.auth.receiverMail);
//   console.log('sent message to', receiverMailId);
  
  const senderMail = localStorage.getItem('userMail');
  let usermail;
  const regex = /[`@.`]/g;
  if (senderMail != null) {
    usermail = senderMail.replace(regex, '');
  }
console.log(usermail);
  const [items, setItems] = useState([]);
  let responseData;
  useEffect(() => {
    const listOfMails = [];
    axios
      .get(
        `https://mailchat-fd967-default-rtdb.firebaseio.com/mail/${usermail}Inbox.json`
      )
      .then((response) => {
        responseData = response.data;
        console.log(response);
        // dispatch(mailActions.totalMails(responseData));
        if(responseData !== null){
            let keys = Object.entries(responseData);
            console.log(keys);
            Object.entries(responseData).forEach((item) => {
                console.log(item);
              listOfMails.push({
                id: item[0],
                mail: item[1].senderMail,
                subject: item[1].subject,
                message: item[1].message,
              });
            });
            setItems(listOfMails);
        }
       
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <div className={styles['main-container']}>
      <div className={styles.sidebar}>
        <Link to="/mail" className={styles['sidebar-btn']}>
          <span>
            <TfiPlus />
          </span>{' '}
          Compose
        </Link>

        <div className={styles['options-list']}>
          <span className={styles['sidebar-icons']}>
            <RiInboxLine />
          </span>
          <Link className={styles.listbtn}>
            <h3 className={styles.heading3}>Inbox</h3>
          </Link>
        </div>
        <div className={styles['options-list']}>
          <span className={styles['sidebar-icons']}>
            <RiSendPlaneFill />
          </span>
          <Link to="/Inbox" className={styles.listbtn}>
            <h3 className={styles.heading3}>Sent</h3>
          </Link>
        </div>
        <div className={styles['options-list']}>
          <span className={styles['sidebar-icons']}>
            <SlArrowDown />
          </span>
          <button className={styles.listbtn}>
            <h3 className={styles.heading3}>More</h3>
          </button>
        </div>

        <div className={styles.footer}>
          <span className={styles['footer-icons']}>
            <SlUser />
          </span>
          <span className={styles['footer-icons']}>
            <SlPhone />
          </span>
          <span className={styles['footer-icons']}>
            <MdOutlineDuo />
          </span>
        </div>
      </div>

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
          {items.length > 0 && (
            <div className={styles.emailRow}>
              <div className={styles['emailRow-options']}>
                <span>
                  <input type="checkbox" />
                </span>
                <span>
                  <SlStar />
                </span>
              </div>
              {items.map((item) => (
                <li key={item.id} id={item.id}  className={styles.arrayItem}>
                  <h3 className={styles.title}>{item.mail}</h3>

                  <div className={styles.emailMessage}>
                    <h4>{item.subject}</h4>
                    <p>{item.message}</p>
                  </div>
                </li>
              ))}
              {/* <h3 className={styles.title}>Youtube</h3> 

            <div className={styles.emailMessage}>
                <h4>Subject</h4>
                <p>Lorem ipsum dolor sit amet, consectetur</p>
            </div> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
