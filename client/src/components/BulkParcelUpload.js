// Some resources for doing this
// https://codeburst.io/asynchronous-file-upload-with-node-and-react-ea2ed47306dd
// https://medium.com/ecmastack/uploading-files-with-react-js-and-node-js-e7e6b707f4ef
// https://ashiknesin.com/blog/upload-file-using-axios-and-redux-form/

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import * as actions from "../actions";

import { withStyles } from "@material-ui/core/styles";
import { InputLabel, MenuItem, FormControl, Select, TextField, Button } from "@material-ui/core";

import { Circular } from "./Loader";

// Issue with latest versions of redux-form
// https://github.com/erikras/redux-form/issues/1989#issuecomment-287552919
const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);
const FileInput = ({
  input: { value: omitValue, onChange, onBlur, ...inputProps },
  meta: omitMeta,
  ...props
}) => (
  <input
    onChange={adaptFileEventToValue(onChange)}
    onBlur={adaptFileEventToValue(onBlur)}
    type="file"
    {...inputProps}
    {...props}
  />
);

const styles = theme => ({
  formControl: {
    minWidth: 120,
    marginTop: "8px"
  },
  formElement: {
    width: "380px"
  },
  formButton: {
    marginTop: "16px"
  }
});

const renderSelectField = ({ input, children, ...custom }) => (
  <Select {...input} children={children} {...custom} />
);

const renderTextField = ({ input, label, ...custom }) => (
  <TextField label={label} {...input} {...custom} />
);

class BulkParcelUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadStatus: false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchUserOrgs();
  }

  onSubmit = data => {
    const formData = new FormData();
    formData.append("organizationId", data.organizationId);
    formData.append("parcelFile", data.parcelFile);
    formData.append("countyName", data.countyName);
    formData.append("countyState", data.countyState);

    this.props.onFileUpload(formData);
  };

  render() {
    const {
      classes,
      handleSubmit,
      org: { fetchingUserOrgs = true, userOrgs = [] }
    } = this.props;

    if (fetchingUserOrgs) {
      return <Circular fullPage />;
    }

    return (
      <Fragment>
        <form className="col s12" onSubmit={handleSubmit(this.onSubmit)}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="organization">Organization name</InputLabel>
            <Field
              name="organizationId"
              component={renderSelectField}
              className={classes.formElement}
            >
              {userOrgs.map(userOrg => (
                <MenuItem key={userOrg._id} value={userOrg._id}>
                  {userOrg.companyName}
                </MenuItem>
              ))}
            </Field>
          </FormControl>

          <FormControl className={classes.formControl}>
            <Field
              name="countyName"
              component={renderTextField}
              className={classes.formElement}
              label="County Name"
            />
          </FormControl>

          <FormControl className={classes.formControl}>
            <Field
              name="countyState"
              component={renderTextField}
              className={classes.formElement}
              label="County State"
            />
          </FormControl>

          <FormControl className={classes.formControl}>
            <Field name="parcelFile" component={FileInput} />
          </FormControl>

          <Button
            className={classes.formButton}
            color="primary"
            size="large"
            type="submit"
            variant="contained"
          >
            Upload
          </Button>
        </form>
      </Fragment>
    );
  }
}

function mapStateToProps({ org }) {
  return { org };
}

export default reduxForm({ form: "bulkParcelUpload" })(
  connect(
    mapStateToProps,
    actions
  )(withStyles(styles)(BulkParcelUpload))
);
