import React, { Component, Fragment } from "react";
import { reduxForm, Field } from "redux-form";

import Loader from "./Loader";

class NewOrganizationForm extends Component {
  onSubmit = formProps => {
    console.log(formProps);

    this.props.createNewOrganization(formProps);
  };

  render() {
    const { handleSubmit, createOrg } = this.props;

    return (
      <div className="row">
        <form className="col s12" onSubmit={handleSubmit(this.onSubmit)}>
          <div className="row">
            <div className="input-field col s12">
              <Field
                name="companyName"
                type="text"
                component="input"
                className="validate"
                placeholder="Amazon"
                autoComplete="none"
                disabled={createOrg.creating}
              />
              <label className="active" htmlFor="companyName">
                Company Name
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <Field
                name="contactName"
                component="input"
                className="validate"
                type="text"
                placeholder="Jeff Bezos"
              />
              <label className="active" htmlFor="contactName">
                Contact Name
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <Field
                name="address"
                component="input"
                className="validate"
                type="text"
                placeholder="410 Terry Ave. N"
              />
              <label className="active" htmlFor="address">
                Address
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <Field
                name="city"
                component="input"
                className="validate"
                type="text"
                placeholder="Seattle"
              />
              <label className="active" htmlFor="city">
                City
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <Field
                name="state"
                component="input"
                className="validate"
                type="text"
                placeholder="WA"
              />
              <label className="active" htmlFor="state">
                State
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <Field
                name="zip"
                component="input"
                className="validate"
                type="text"
                placeholder="98109"
              />
              <label className="active" htmlFor="zip">
                Zip
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <Field
                name="phone"
                component="input"
                className="validate"
                type="text"
                placeholder="1-206-266-1000"
              />
              <label className="active" htmlFor="phone">
                Phone
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <Field
                name="fax"
                component="input"
                className="validate"
                type="text"
                placeholder="1-206-266-1000"
              />
              <label className="active" htmlFor="fax">
                Fax
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <Field
                name="email"
                component="input"
                className="validate"
                type="text"
                placeholder="jeff@amazon.com"
              />
              <label className="active" htmlFor="email">
                Email
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <Field
                name="deedTitling"
                component="input"
                className="validate"
                type="text"
                placeholder="Warranty"
              />
              <label className="active" htmlFor="deedTitling">
                Deed Titling
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <Field name="deedType" component="select">
                <option value="Warranty">Warranty</option>
                <option value="Special Warranty">Special Warranty</option>
                <option value="Quit Claim">Quit Claim</option>
              </Field>
              <label className="active" htmlFor="deedType">
                Deed Type
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <Field
                name="docFee"
                component="input"
                className="validate"
                type="text"
                placeholder="295"
              />
              <label className="active" htmlFor="docFee">
                Doc Fee ($)
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <Field
                name="lateFee"
                component="input"
                className="validate"
                type="text"
                placeholder="10"
              />
              <label className="active" htmlFor="lateFee">
                Late Fee ($)
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <Field
                name="noteServicingFee"
                component="input"
                className="validate"
                type="text"
                placeholder="10"
              />
              <label className="active" htmlFor="noteServicingFee">
                Note Servicing Fee ($)
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <Field
                name="gracePeriod"
                component="input"
                className="validate"
                type="text"
                placeholder="5"
              />
              <label className="active" htmlFor="gracePeriod">
                Grace Period (days)
              </label>
            </div>
          </div>

          <button
            className="btn-large waves-effect waves-light"
            type="submit"
            name="action"
            disabled={createOrg.creating}
          >
            {createOrg.creating ? (
              <Loader small />
            ) : (
              <Fragment>
                Create
                <i className="material-icons right">add_box</i>
              </Fragment>
            )}
          </button>
        </form>
      </div>
    );
  }
}

export default reduxForm({ form: "organization" })(NewOrganizationForm);