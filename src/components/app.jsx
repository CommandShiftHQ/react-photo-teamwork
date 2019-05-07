import React from 'react';
import NavBar from './navbar';
import Profile from './profile';
import SignUp from '../components/sign-up';
import { Switch, Route } from 'react-router-dom';
import Login from '../components/login';
import TokenManager from '../utils/token-manager';
import ImageDetails from '../components/image-details';
import ImageBrowser from './image-browser';
import Upload from './upload';
import axios from 'axios';

const URL = 'http://mcr-codes-image-sharing-api.herokuapp.com/images';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      images: [],
      error: false,
    };
  }

  componentDidMount() {
    if (TokenManager.isTokenValid()) this.handleLogin();
    this.getImages();
  }

  getImages = () => {
    axios.get(URL)
      .then(response => {
        this.setState({ images: response.data });
      })
      .catch(() => {
        this.setState({ error: true });
        alert('Error. Please try again');
      });
  };

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
          onLogout={this.handleLogout}
        />

        {this.isLoggedIn() ? (
          <Profile id={this.state.user._id} />
        ) : (
          <div>You are not logged in.</div>
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
            path="/upload"
            component={Upload}
          />
          <Route
            exact
            path="/images"
            render={props => <ImageBrowser {...props} images={this.state.images} />}
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
