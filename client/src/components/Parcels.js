import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import ParcelTopPageMenu from './ParcelTopPageMenu';
import ParcelTimeline from './ParcelTimeline';
import ParcelTable from './ParcelTable';

import { Circular } from './Loader';

class Parcels extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orgId: ''
    };
  }

  componentDidMount() {
    this.props.fetchUserOrgs();
  }

  onSendClick = id => {
    this.props.sendLetter({ id, orgId: this.state.orgId });
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
      org: { fetchingUserOrgs = true, userOrgs = [] },
      parcel: { orgParcels = [], sendingParcels = {} }
    } = this.props;
    const { orgId } = this.state;

    if (fetchingUserOrgs) {
      return <Circular fullPage />;
    }

    return (
      <Fragment>
        <ParcelTopPageMenu
          onSearchClick={this.onSearchClick}
          orgId={orgId}
          onSelectOrg={this.onSelectOrg}
          userOrgs={userOrgs}
        />

        <ParcelTimeline />

        <ParcelTable
          orgParcels={orgParcels}
          onSendClick={this.onSendClick}
          sendingParcels={sendingParcels}
        />
      </Fragment>
    );
  }
}

function mapStateToProps({ org, parcel }) {
  return { org, parcel };
}

export default connect(
  mapStateToProps,
  actions
)(Parcels);
