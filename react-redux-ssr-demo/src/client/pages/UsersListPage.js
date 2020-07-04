import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';

class UsersList extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  renderUsers() {
    return this.props.users.map(user => {
      return <li key={user.id}>{user.name}</li>;
    })
  }
  render() {
    return (
      <div>
        here's the list of users:
        <ul>{this.renderUsers()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users };
}

function loadData(store) {
  // manually dispatch action creator for the server side rendering
  // using connect is also not possible, because it can communicate with the Provider only
  // but the app is not existent yet -> no provider either
  return store.dispatch(fetchUsers())
}

export default {
  component: connect(mapStateToProps, { fetchUsers })(UsersList),
  loadData
};

