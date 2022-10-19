import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {useSelector} from  'react-redux';
import Login from '../src/Layout/Login'
import SignUp from '../src/Layout/SignUp'
import Welcome from '../src/Pages/Welcome'

function App() {
 const isLogin = useSelector(state=> state.auth.isLogin)
 console.log('user login status',isLogin)
 const token = localStorage.getItem('tokenId')
  return (
    <>
    <Switch>
    <Route path="/" exact>
         <SignUp/>
    </Route>

    <Route path="/Login" >
      <Login/>
    </Route>

    <Route path="/welcome">
       {token && <Welcome/>}
       {!token && <Login/>}
    </Route>
     
    </Switch>
    </>
  );
}

export default App;
