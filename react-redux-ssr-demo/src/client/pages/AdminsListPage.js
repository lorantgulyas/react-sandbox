import React from 'react';
import { connect } from 'react-redux';
import { fetchAdmins } from '../actions';
import requireAuth from '../components/hocs/requireAuth';

class AdminsList extends React.Component {
  componentDidMount() {
    this.props.fetchAdmins();
  }

  renderAdmins() {
    return this.props.admins.map(admin => {
      return <li key={admin.id}>{admin.name}</li>;
    })
  }
  render() {
    return (
      <div>
        here's the protected list of admins:
        <ul>{this.renderAdmins()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { admins: state.admins };
}

function loadData(store) {
  // manually dispatch action creator for the server side rendering
  // using connect is also not possible, because it can communicate with the Provider only
  // but the app is not existent yet -> no provider either
  return store.dispatch(fetchAdmins())
}

export default {
  component: connect(mapStateToProps, { fetchAdmins })(requireAuth(AdminsList)),
  loadData
};

