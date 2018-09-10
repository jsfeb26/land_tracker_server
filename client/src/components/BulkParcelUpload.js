import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import * as actions from "../actions";

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

// Some resources for doing this
// https://codeburst.io/asynchronous-file-upload-with-node-and-react-ea2ed47306dd
// https://medium.com/ecmastack/uploading-files-with-react-js-and-node-js-e7e6b707f4ef
// https://ashiknesin.com/blog/upload-file-using-axios-and-redux-form/

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
      handleSubmit,
      org: { fetchingUserOrgs = true, userOrgs = [] }
    } = this.props;

    if (fetchingUserOrgs) {
      return <Circular fullPage />;
    }

    return (
      <div className="row">
        <form className="col s12" onSubmit={handleSubmit(this.onSubmit)}>
          <div className="row">
            <div className="input-field col s12">
              <Field name="organizationId" component="select" className="browser-default">
                <option value="" disabled>
                  Choose your company
                </option>
                {userOrgs.map(userOrg => (
                  <option key={userOrg._id} value={userOrg._id}>
                    {userOrg.companyName}
                  </option>
                ))}
              </Field>
              <label className="active" htmlFor="organizationId">
                Company
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <Field
                name="countyName"
                component="input"
                className="validate"
                type="text"
                placeholder="Mohave"
              />
              <label className="active" htmlFor="countyName">
                County Name
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <Field
                name="countyState"
                component="input"
                className="validate"
                type="text"
                placeholder="AZ"
              />
              <label className="active" htmlFor="countyState">
                County State
              </label>
            </div>
          </div>

          <div className="row">
            <div className="col s12">
              <Field name="parcelFile" component={FileInput} />
              <label className="active" htmlFor="parcelFile">
                Parcel Excel File
              </label>
            </div>
          </div>

          <button className="btn-large waves-effect waves-light" type="submit" name="action">
            Upload
            <i className="material-icons right">cloud_upload</i>
          </button>
        </form>
      </div>
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
  )(BulkParcelUpload)
);
