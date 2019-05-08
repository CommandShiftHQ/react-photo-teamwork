import React from 'react';
import NavBar from './navbar';
import Profile from './profile';
import SignUp from '../components/sign-up';
import { Switch, Route } from 'react-router-dom';
import Login from '../components/login';
import TokenManager from '../utils/token-manager';
import ImageDetails from '../components/image-details';
import ImageBrowser from './image-browser';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    if (TokenManager.isTokenValid()) this.handleLogin();
  }

  handleLogin = () => {
    this.setState({ user: TokenManager.getTokenPayload() });
  };

  handleLogout = () => {
    TokenManager.removeToken();
    this.setState({ user: null });
  };

  isLoggedIn = () => {
    return Boolean(this.state.user) && TokenManager.isTokenValid();
  };

  render() {
    return (
      <React.Fragment>
        <NavBar
          isLoggedIn={this.isLoggedIn()}
          user={this.state.user}
        />

        {this.isLoggedIn() ? (
          <div>
            <Profile id={this.state.user._id} />
            <button onClick={this.handleLogout}>Logout</button>
          </div>
        ) : (
          <div>You are not in</div>
        )}

        <Switch>
          <Route
            exact
            path="/login"
            render={props => <Login {...props} onLogin={this.handleLogin} />}
          />
          <Route
            exact
            path="/sign-up"
            render={props => <SignUp {...props} onLogin={this.handleLogin} />}
          />
          <Route
            exact
            path="/images"
            component={ImageBrowser}
          />
          <Route
            exact
            path="/image/:id"
            render={(props) => <ImageDetails {...props} />}
          />
          <Route exact path="/sign-up" component={SignUp} />


        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
