import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  appBar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  toolBar: {
    flexGrow: 1,
    padding: 0
  }
};

class Header extends Component {
  HeaderLink = props => {
    return <Link to={this.props.auth ? "/dashboard" : "/"} {...props} />;
  };
  DashboardLink = props => {
    return <Link to={"/dashboard"} {...props} />;
  };
  LogoIcon = props => (
    <img alt="LandTrackr" src="https://image.flaticon.com/icons/svg/888/888568.svg" />
  );
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <Button href="/auth/google">Login With Google</Button>;
      default:
        return (
          <Fragment>
            <Button component={this.DashboardLink}>Dashboard</Button>
            <Button href="/parcels">Parcels</Button>
            <Button href="/parcel/upload">Upload Parcels</Button>
            <Button href="/api/logout" variant="outlined" color="default">
              Logout
            </Button>
          </Fragment>
        );
      // <Fragment>
      //   {/* <li>
      //     <Payments />
      //   </li>
      //   <li style={{ margin: "0 10px" }}>Credits: {this.props.auth.credits}</li> */}
      // </Fragment>
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static">
          <div className="toolbar-body">
            <Toolbar className={classes.toolBar}>
              <Typography variant="title" className={classes.flex} component={this.HeaderLink}>
                LandTrackr
              </Typography>
              {this.renderContent()}
            </Toolbar>
          </div>
        </AppBar>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(withStyles(styles)(Header));
