import React, { Component } from 'react';
import Axios from 'axios';
import Loading from '../Loading';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: false,
    };
  }

  getUsers() {
    this.setState({ loading: true });
    Axios('https://api.randomuser.me/?nat=US&results=5').then((response) =>
      //state
      this.setState({
        users: [...this.state.users, ...response.data.results],
        loading: false,
      })
    );
    //bind
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.getUsers();
  }

  componentWillMount() {
    this.getUsers();
  }

  render() {
    const { loading, users } = this.state;
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input
            style={{ borderRadius: '35px' }}
            type="submit"
            value="load users"
          />
        </form>
        {!loading ? (
          users.map((user) => (
            <div key={user.id.value}>
              <h3 style={{ color: 'red' }}> {user.name.first}</h3>
              <p>{user.email}</p>
              <hr />
            </div>
          ))
        ) : (
          <Loading message="Im loading, just wait a sec you shit bastard!" />
        )}
      </div>
    );
  }
}

export default App;
