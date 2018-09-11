import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import { InputLabel, MenuItem, FormControl, Select, Button } from "@material-ui/core";

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

class ParcelTopPageMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orgId: ""
    };
  }

  render() {
    const { userOrgs, orgId, classes, onSelectOrg, onSearchClick } = this.props;

    return (
      <div className="top-page-menu">
        <div className="top-page-menu-body">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="organization">Organization name</InputLabel>
            <Select
              className={classes.select}
              value={orgId}
              onChange={onSelectOrg}
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
            disabled={!orgId}
            onClick={onSearchClick}
            size="large"
            variant="contained"
          >
            Search
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ParcelTopPageMenu);
