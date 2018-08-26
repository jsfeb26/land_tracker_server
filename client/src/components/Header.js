import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import Payments from "./Payments";

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
  }
};

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <Button href="/auth/google">Login With Google</Button>;
      default:
        return (
          <Fragment>
            <Button href="/dashboard">Dashboard</Button>
            <Button href="/parcels">Parcels</Button>
            <Button href="/parcel/upload">Upload Parcels</Button>
            <Button href="/api/logout" variant="outlined" color="secondary">
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
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              <Link to={this.props.auth ? "/dashboard" : "/"} className="left brand-logo">
                Land Tracker
              </Link>
            </Typography>
            {this.renderContent()}
          </Toolbar>
        </AppBar>
      </div>

      // <nav>
      //   <div className="nav-wrapper">
      //     <Link to={this.props.auth ? "/dashboard" : "/"} className="left brand-logo">
      //       Land Tracker
      //     </Link>
      //     <ul className="right">{this.renderContent()}</ul>
      //   </div>
      // </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(withStyles(styles)(Header));
