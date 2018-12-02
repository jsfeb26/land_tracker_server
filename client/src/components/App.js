import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Organization from './Organization';
import BulkParcelUpload from './BulkParcelUpload';
import Parcels from './Parcels';

const Dashboard = () => <h2>Dashboard</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <Fragment>
        <CssBaseline />
        <BrowserRouter>
          <div className="container">
            <Header />
            <div className="page-container">
              <Route exact path="/" component={Landing} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/organization" component={Organization} />
              <Route path="/parcel/upload" component={BulkParcelUpload} />
              <Route path="/parcels" component={Parcels} />
            </div>
          </div>
        </BrowserRouter>
      </Fragment>
    );
  }
}

export default connect(
  null,
  actions
)(App);
