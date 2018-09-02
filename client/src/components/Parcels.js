import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

import ParcelTopPageMenu from "./ParcelTopPageMenu";
import ParcelTimeline from "./ParcelTimeline";
import ParcelTable from "./ParcelTable";

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

  onSendClick = parcelId => {
    console.log(`Sending...${parcelId}`);
    this.props.sendLetter({ parcelId, orgId: this.state.orgId });
  };

  onSelectOrg = e => {
    const orgId = e.target.value;
    this.setState({ orgId });
  };

  onSearchClick = () => {
    const orgId = this.state.orgId;

    if (this.state.orgId) {
      this.props.fetchOrgParcels(orgId);
    }
  };

  render() {
    const {
      org: { fetchingUserOrgs = true, userOrgs = [], orgParcels = [] }
    } = this.props;
    const { orgId } = this.state;

    if (fetchingUserOrgs) {
      return <Loader />;
    }

    return (
      <div className="page-container">
        <ParcelTopPageMenu
          onSearchClick={this.onSearchClick}
          orgId={orgId}
          onSelectOrg={this.onSelectOrg}
          userOrgs={userOrgs}
        />

        <ParcelTimeline />

        <ParcelTable orgParcels={orgParcels} onSendClick={this.onSendClick} />
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
