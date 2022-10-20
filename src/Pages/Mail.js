import React,{useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { mailActions } from '../store/mailStore-slice';
import { Editor } from 'react-draft-wysiwyg';
import {EditorState } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Nav from '../Layout/Nav';
import './editor.css';

import styles from './Mail.module.css'

const Mail = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const editorState = EditorState.createEmpty();
  let [mailingTo, setMailingTo] = useState('');
  // console.log(props.text);
  const [input, setInput] = useState([]);
  const sendMailToref = useRef();
  const subjectref = useRef();
  // const messageref = useRef();
  const senderMail = localStorage.getItem('userMail');
  let usermail;
  const regex = /[`@.`]/g;
  if (senderMail != null) {
    
    usermail = senderMail.replace(regex, '');

    console.log(usermail);
  }
  let message;
    const onEditorStateChange = (event) => {
      message = event.getCurrentContent().getPlainText();
  };

  const sendMailHandler = (e) => {
    e.preventDefault();
    const receiverMail = sendMailToref.current.value;
    const subject = subjectref.current.value;    
    const mailDetails = {
        senderMail,
        receiverMail,
        subject,
        message,
      }
    setMailingTo(receiverMail)
    console.log('mailing details: ', mailDetails)
    sendMail(mailDetails);
    fetch(`https://mailchat-fd967-default-rtdb.firebaseio.com/mail/${usermail}Sentbox.json`,
    {
      method:'POST',
      body: JSON.stringify({
        mail:receiverMail,
        subject: subject,
        message:message
      }),
      headers :{'Content-Type': 'application/json'}
    }) .then((resp) => {
      if (resp.ok) {
        console.log("resp1", resp);
        return resp.json();
      } else {
        return resp.json().then((data) => {
          console.log(data);
        });
      }
    })
    .then((data) => {
      console.log(data.name);
      // alert("Mail sent successfully...")
      history.replace("/Inbox");
    })
    .catch((err) => {
      alert(err);
    });
  }
  // console.log('mailed to: ', mailingTo)
  let mailTo = mailingTo.replace(regex, '');
   console.log('mailing to: ', mailTo)

  const existingInput = [...input];
  async function sendMail(mailDetails) {
      try{
        const response = await fetch(`https://mailchat-fd967-default-rtdb.firebaseio.com/mail/${mailTo}Inbox.json`,{
          method: 'POST',
          body: JSON.stringify(
            mailDetails
          ),
          headers :{'Content-Type': 'application/json'} 
        });      
        if(response.status === 200){
          console.log('mailing success');
          dispatch(mailActions.storeInBox(mailDetails));
          // existingInput.push(mailDetails);
          // setInput(existingInput);
        }
        else {
          alert('mailing error');
        }
  
        
        
      }catch(error){
          alert('error from catch ')           
      }

  }

//   async function inBox(mailDetails) {
//     try{
//       const response = await fetch(`https://mailchat-fd967-default-rtdb.firebaseio.com/mail/${usermail}Sentbox.json`,{
//         method: 'POST',
//         body: JSON.stringify({
//           mailDetails
//         }),
//         headers :{'Content-Type': 'application/json'} 
//       });
//       if(response.status === 200){
//         console.log('mail sent successfully');
//         // existingInput.push(mailDetails);
//         // setInput(existingInput);
//         history.replace('/Inbox')
//       }
//       else {
//         alert('mailing error');
//       }

//     }catch(error){
//         alert('error from catch ')           
//     }

// }
  return (
    <>
      <Nav />
    <div className={styles.container}>
      <form onSubmit={sendMailHandler}>
        <input type="email" placeholder="To " ref={sendMailToref} /> <br/>
        <input type="text" placeholder="Subject"  ref={subjectref} /> <br/>
        <div className={styles.editor}>
        {/* <TextEditor onEditorStateChange={onEditorStateChange} /> */}
        <Editor
          EditorState={editorState}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            // position: { top: 'auto', bottom: '10px' },
          }}
          onEditorStateChange={onEditorStateChange}
          
        />
        </div>
        <button className={styles.btn}>Send</button>
      </form>
      </div>
    </>
  );
};

export default Mail;