import React, { Component } from "react";
import { connect } from "react-redux";
import ReactTable from "react-table";
import * as actions from "../actions";

import Loader from "./Loader";

class Parcels extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orgId: ""
    };

    this.columns = [
      {
        Header: "Send",
        accessor: "_id",
        Cell: ({ value }) => <button onClick={() => this.onSendClick(value)}>Send</button>
      },
      { Header: "Ref Number", accessor: "refNumber" },
      { Header: "Parcel ID", accessor: "parcelId" },
      { Header: "Parcel Size", accessor: "parcelSize" },
      { Header: "Legal Description", accessor: "legalDescription" },
      { Header: "Assessed Value", accessor: "assessedValue" },
      { Header: "Taxes Due", accessor: "taxesDue" },
      { Header: "County Name", accessor: "countyName" },
      { Header: "County State", accessor: "countyState" },
      { Header: "Owner Name", accessor: "ownerName" },
      { Header: "Owner Address", accessor: "ownerAddress" },
      { Header: "Owner City", accessor: "ownerCity" },
      { Header: "Owner State", accessor: "ownerState" },
      { Header: "Owner Zip;", accessor: "ownerZip" },
      { Header: "Offer", accessor: "offer" },
      { Header: "Date Created", accessor: "dateCreated" }
    ];
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

    if (orgId) {
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

        {!!orgParcels.length && <ReactTable data={orgParcels} columns={this.columns} />}
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
