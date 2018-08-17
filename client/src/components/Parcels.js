import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

import Loader from "./Loader";

class Parcels extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orgId: ""
    };
  }

  componentDidMount() {
    this.props.fetchUserOrgs();
  }

  onSelectOrg = e => {
    const orgId = e.target.value;
    this.setState({ orgId });

    if (orgId) {
      this.props.fetchOrgParcels(orgId);
    }
  };

  render() {
    const {
      org: { fetchingUserOrgs = true, userOrgs = [], orgParcels = [] }
    } = this.props;
    const { orgId } = this.state;

    console.log(fetchingUserOrgs);
    if (fetchingUserOrgs) {
      return <Loader />;
    }

    return (
      <div className="row">
        <div className="row">
          <select
            name="organizationId"
            className="browser-default"
            onChange={this.onSelectOrg}
            value={orgId}
          >
            <option value="" disabled>
              Choose your company
            </option>
            {userOrgs.map(userOrg => (
              <option key={userOrg._id} value={userOrg._id}>
                {userOrg.companyName}
              </option>
            ))}
          </select>
          <label className="active" htmlFor="organizationId">
            Company
          </label>
        </div>
        <div className="row">
          {orgParcels.map(orgParcel => (
            <div>{orgParcel.parcelId}</div>
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ org }) {
  return { org };
}

export default connect(
  mapStateToProps,
  actions
)(Parcels);
