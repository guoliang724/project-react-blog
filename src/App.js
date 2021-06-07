import { ToastContainer } from "react-toastify";
import React, { Component } from "react";
import NavBar from "./component/navBar";
import { Route, Switch, Redirect } from "react-router-dom";
import Blogs from "./component/blogs";
import Login from "./component/login";
import Register from "./component/register";
import Home from "./component/home";
import NotFound from "./component/not-found";
import UpdateForm from "./component/updateblog";
import NewBlog from "./component/newblog";
import Logout from "./component/logout";
import auth from "./services/auth";
import ReadForm from "./component/readform";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";

import "font-awesome/css/font-awesome.css";

class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <div>
        <ToastContainer />
        <NavBar user={user} />
        <main role="main" className="container">
          <Switch>
            <Route
              path="/blog/new"
              render={(props) => {
                if (!user) return <Redirect to="/login"></Redirect>;
                return <NewBlog {...props} user={user} />;
              }}
            ></Route>
            <Route path="/blog/:id" component={ReadForm}></Route>
            <Route
              path="/blogs/:id"
              render={(props) => {
                if (!user) return <Redirect to="/login"></Redirect>;
                return <UpdateForm {...props} />;
              }}
            ></Route>
            <Route
              exact
              path="/blogs"
              render={(props) => <Blogs {...props} user={this.state.user} />}
            ></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/" component={Home}></Route>
            <Route path="/not-found" component={NotFound}></Route>

            <Redirect to="/not-found"></Redirect>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
