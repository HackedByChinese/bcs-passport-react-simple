import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { update } from './withUser';

class LoginPage extends Component {
    state = {
        username: null,
        password: null
    }
    handleInputChanged = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleLogin = (event) => {
        event.preventDefault();

        const { username, password } = this.state;
        const { history } = this.props;

        // post an auth request
        axios.post('/api/auth', {
            username,
            password
        })
            .then(user => {
                // if the response is successful, update the current user and redirect to the home page
                update(user.data);
                history.push('/');
            })
                .catch(err => {
                    // an error occured, so let's record the error in our state so we can display it in render
                    // if the error response status code is 401, it's an invalid username or password.
                    // if it's any other status code, there's some other unhandled error so we'll just show
                    // the generic message.
                    this.setState({
                        error: err.response.status === 401 ? 'Invalid username or password.' : err.message
                    });
                });
    }
    render() {
        const { error } = this.state;

        return (
            <form onSubmit={this.handleLogin}>
                <h1>Log In</h1>
                {error &&
                    <div>
                        {error}
                    </div>
                }
                <div>
                    <input
                        name="username"
                        onChange={this.handleInputChanged}
                    />
                </div>
                <div>
                    <input
                        name="password"
                        type="password"
                        onChange={this.handleInputChanged}
                    />
                </div>
                <div>
                    <button type="submit">
                        Log In
                    </button>
                </div>
                <p>
                    or
              </p>
                <p>
                    <Link to="/create">
                        Register
                    </Link>
                </p>
            </form>
        );
    }
}

export default LoginPage;