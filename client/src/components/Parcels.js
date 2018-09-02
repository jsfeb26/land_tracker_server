import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

import ParcelTable from "./ParcelTable";

import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

import Loader from "./Loader";

const styles = theme => ({
  formControl: {
    minWidth: 120
  },
  select: {
    width: "380px"
  },
  searchButton: {
    marginLeft: "auto"
  }
});

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
      org: { fetchingUserOrgs = true, userOrgs = [], orgParcels = [] },
      classes
    } = this.props;
    const { orgId } = this.state;

    if (fetchingUserOrgs) {
      return <Loader />;
    }

    return (
      <div className="page-container">
        <div className="top-page-menu">
          <div className="top-page-menu-body">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="organization">Organization name</InputLabel>
              <Select
                className={classes.select}
                value={orgId}
                onChange={this.onSelectOrg}
                inputProps={{
                  name: "organization",
                  id: "organization"
                }}
              >
                {userOrgs.map(userOrg => (
                  <MenuItem key={userOrg._id} value={userOrg._id}>
                    {userOrg.companyName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              className={classes.searchButton}
              color="primary"
              disabled={!this.state.orgId}
              onClick={this.onSearchClick}
              size="large"
              variant="contained"
            >
              Search
            </Button>
          </div>
        </div>

        <div className="timeline-container">
          <div className="time-point-container">
            <div className="time-point-icon-container">
              <div className="time-point selected" />
              <div className="time-point-line" />
            </div>
            <div className="time-point-text">New properties</div>
          </div>

          <div className="time-point-container">
            <div className="time-point-icon-container">
              <div className="time-point-line" />
              <div className="time-point" />
              <div className="time-point-line" />
            </div>
            <div className="time-point-text">Due diligence</div>
          </div>

          <div className="time-point-container">
            <div className="time-point-icon-container">
              <div className="time-point-line" />
              <div className="time-point" />
              <div className="time-point-line" />
            </div>
            <div className="time-point-text">Closing</div>
          </div>

          <div className="time-point-container">
            <div className="time-point-icon-container">
              <div className="time-point-line" />
              <div className="time-point" />
              <div className="time-point-line" />
            </div>
            <div className="time-point-text">Marketing</div>
          </div>

          <div className="time-point-container">
            <div className="time-point-icon-container">
              <div className="time-point-line" />
              <div className="time-point" />
            </div>
            <div className="time-point-text">Sales</div>
          </div>
        </div>

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
)(withStyles(styles)(Parcels));
