import React from 'react';
import NavBar from './navbar';
import Profile from './profile';
import SignUp from '../components/sign-up';
import { Switch, Route, withRouter } from 'react-router-dom';
import Login from '../components/login';
import TokenManager from '../utils/token-manager';
import ImageDetails from '../components/image-details';
import ImageBrowser from './image-browser';
import ImageUpload from './upload';
import SearchForm from './search';
import axios from 'axios';

const URL = 'http://mcr-codes-image-sharing-api.herokuapp.com';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      images: [],
      userImages: [],
      searchQuery: [],
      error: false,
    };
  }

  componentDidMount() {
    if (TokenManager.isTokenValid()) {
      this.handleLogin();
      this.getUserImages();
    }
    this.getImages();
  }

  getImages = () => {
    axios.get(`${URL}/images`)
      .then(response => {
        this.setState({ images: response.data });
      })
      .catch(() => {
        this.setState({ error: true });
        alert('Error. Please try again');
      });
  };

  getUserImages = () => {
    const config = {
      headers: {
        'authorization': TokenManager.getToken(),
        'content-type': 'application/json',
      },
    };
    axios.get(`${URL}/me`, config)
      .then(response => {
        this.setState({ userImages: response.data.images });
      })
      .catch(() => {
        this.setState({ error: true });
        alert('Error. Please try again');
      });
  };

  handleSearchForm = (searchString) => {
    axios.get(`${URL}/images?tags=${searchString}`)
      .then(response => {
        console.log(response);
        this.setState({
          images: response.data,
        }, () => this.props.history.push('/'));
      })
      .catch((error) => {
        console.log(error);
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
          className="nav-bar"
          isLoggedIn={this.isLoggedIn()}
          user={this.state.user}
          onLogout={this.handleLogout}
        />

        {this.isLoggedIn() ? (
          <Profile id={this.state.user._id} />
        ) : (
          <div>You are not logged in.</div>
        )}

        <SearchForm
          handleSearchForm={this.handleSearchForm}
        />

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
            component={ImageUpload}
          />
          <Route
            exact
            path="/gallery"
            render={props => <ImageBrowser {...props} images={this.state.userImages} />}
          />
          <Route
            exact
            path="/"
            render={props => <ImageBrowser {...props} images={this.state.images} onLogout={this.handleLogout} />}
          />
          <Route
            exact
            path="/image/:id"
            render={(props) => <ImageDetails {...props} />}
          />
          <Route
            exact
            path="/images/"
            render={(props) => <ImageBrowser {...props} searchQuery={this.state.searchQuery} />}
          />
          <Route exact path="/sign-up" component={SignUp} />


        </Switch>
      </React.Fragment>
    );
  }
};

export default withRouter(App);
