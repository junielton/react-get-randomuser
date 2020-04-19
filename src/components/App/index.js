import React, { Component } from 'react';
import Axios from 'axios';

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
      this.setState({
        users: response.data.results,
        loading: false,
      })
    );
  }

  componentWillMount() {
    this.getUsers();
  }

  render() {
    return (
      <div className="App">
        {!this.state.loading
          ? this.state.users.map((user) => <div>{user.cell}</div>)
          : 'loading'}
      </div>
    );
  }
}

export default App;