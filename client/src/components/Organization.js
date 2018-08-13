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
            createOrg={this.props.createOrg}
          />
        );
    }
  }

  render() {
    return this.renderContent();
  }
}

function mapStateToProps({ auth, createOrg }) {
  return { auth, createOrg };
}

export default connect(
  mapStateToProps,
  actions
)(Organization);
