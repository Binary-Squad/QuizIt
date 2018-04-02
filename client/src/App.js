import React, {Component} from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
// import isLoggedIn from "./utils/isLoggedIn.js";
import Navbar from "./components/Navbar";

// const auth = {
//   isAuthenticated: false,
//   authenticate:isLoggedIn
// }

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     auth.isAuthenticated === true
//       ? <Component {...props} />
//       : <Redirect to={{
//           pathname: '/login',
//           state: { from: props.location }
//         }} />
//   )} />
// )

// class Dashboard extends Component {
//   render(){
//     return(<div>Dashboard</div>)
//   }
// }

class App extends Component {

  state = {
    loggedIn:false,
    username:""
  }

  // componentDidMount(){
  //   isLoggedIn(()=>{
  //     return true;
  //   })
  // }

  checkIfLoggedIn(){
    if(localStorage.user){
      return true
    }
    else{
      return false
    }
  }

  render(){
    return(
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/login" render={()=>(this.checkIfLoggedIn()?<Redirect to="/dashboard" />:<Login />)}/>
            <Route exact path="/logout" render={()=>(<Logout />)}/>
            <Route exact path="/register" render={()=>(this.checkIfLoggedIn()?<Redirect to="/dashboard" />:<Register />)}/>
            <Route exact path="/dashboard" render={()=>(this.checkIfLoggedIn()?<Dashboard />:<Redirect to="/login" />)}/>
            <Route path="/" render={()=>(<Home />)}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
