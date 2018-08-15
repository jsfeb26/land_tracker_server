import React, { Component } from "react";
import { connect } from "react-redux";

import Loader from "./Loader";
import NewOrganizationForm from "./NewOrganizationForm";
import * as actions from "../actions";

class Organization extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return <Loader />;
      case false:
        return <div>Login</div>;
      default:
        return (
          <NewOrganizationForm
            createNewOrganization={this.props.createNewOrganization}
            org={this.props.org}
          />
        );
    }
  }

  render() {
    return this.renderContent();
  }
}

function mapStateToProps({ auth, org }) {
  return { auth, org };
}

export default connect(
  mapStateToProps,
  actions
)(Organization);
