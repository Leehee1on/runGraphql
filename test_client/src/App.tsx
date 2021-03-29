import React,{useEffect} from 'react';
import { Redirect, Switch, useLocation, Route } from "react-router-dom";
import SignIn from './pages/Study/SignIn'
import SignUp from './pages/Study/SignUp'
import Header from './pages/Study/Header'
import Main from './pages/Study/Main'
import Create from './pages/Study/Create'
import Detail from './pages/Study/Detail'
import * as Cookies from 'js-cookie'

import {tokenStateApi} from './pages/Study/api'

const App:React.FC = () => {
  let location = useLocation();

  const [state,setState] = React.useState(false)
  
  const token = Cookies.get("x_auth");

  const tokenState = async () => {
    if (token === undefined) {
    }
    const response = await tokenStateApi(token);
    if (response.success === true) {
        setState(true);
        Cookies.set("x_auth",response.token);
      } else {
      // alert("토큰이 만료되어 로그아웃 됩니다");
      setState(false)
      // Cookies.remove("x_auth");
    }
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
    tokenState();
  }, [location]);
  return (
    <div className="App" >
      <Header state={state} Cookies={Cookies}/>
        <div id="wrap">
          {/* <Redirect path="*" to="/main" /> */}
          
        <Switch>
          <Route exact path="/signIn" component={SignIn} />
          <Route exact path="/signUp" component={SignUp} />
          <Route exact path="/main" component={Main} />
          <Route exact path="/create" component={Create} />
          <Route exact path="/detail/:content_no" component={Detail} />
        </Switch>
        </div>
    </div>
  );
}

export default App;
