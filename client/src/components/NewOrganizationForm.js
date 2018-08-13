import React, { Component } from "react";

export default class NewOrganizationForm extends Component {
  onSubmit(e) {
    e.preventDefault();

    const data = new FormData();
    // data.append("file", this.uploadInput.files[0]);
    // data.append("filename", this.fileName.value);

    this.props.createNewOrganization(data);
  }
  render() {
    return (
      <div className="row">
        <form className="col s12" onSubmit={this.onSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="companyName"
                className="validate"
                type="text"
                placeholder="Amazon"
                ref={ref => {
                  this.companyName = ref;
                }}
              />
              <label className="active" htmlFor="companyName">
                Company Name
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                id="contactName"
                className="validate"
                type="text"
                placeholder="Jeff Bezos"
                ref={ref => {
                  this.contactName = ref;
                }}
              />
              <label className="active" htmlFor="contactName">
                Contact Name
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                id="address"
                className="validate"
                type="text"
                placeholder="410 Terry Ave. N"
                ref={ref => {
                  this.address = ref;
                }}
              />
              <label className="active" htmlFor="address">
                Address
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                id="city"
                className="validate"
                type="text"
                placeholder="Seattle"
                ref={ref => {
                  this.city = ref;
                }}
              />
              <label className="active" htmlFor="city">
                City
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                id="state"
                className="validate"
                type="text"
                placeholder="WA"
                ref={ref => {
                  this.state = ref;
                }}
              />
              <label className="active" htmlFor="state">
                State
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                id="zip"
                className="validate"
                type="text"
                placeholder="98109"
                ref={ref => {
                  this.zip = ref;
                }}
              />
              <label className="active" htmlFor="zip">
                Zip
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                id="phone"
                className="validate"
                type="text"
                placeholder="1-206-266-1000"
                ref={ref => {
                  this.phone = ref;
                }}
              />
              <label className="active" htmlFor="phone">
                Phone
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                id="fax"
                className="validate"
                type="text"
                placeholder="1-206-266-1000"
                ref={ref => {
                  this.fax = ref;
                }}
              />
              <label className="active" htmlFor="fax">
                Fax
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                id="email"
                className="validate"
                type="text"
                placeholder="jeff@amazon.com"
                ref={ref => {
                  this.email = ref;
                }}
              />
              <label className="active" htmlFor="email">
                Email
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                id="deedTitling"
                className="validate"
                type="text"
                placeholder="Warranty"
                ref={ref => {
                  this.deedTitling = ref;
                }}
              />
              <label className="active" htmlFor="deedTitling">
                Deed Titling
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                id="deedType"
                className="validate"
                type="text"
                placeholder="Warranty"
                ref={ref => {
                  this.deedType = ref;
                }}
              />
              <label className="active" htmlFor="deedType">
                Deed Type
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                id="docFee"
                className="validate"
                type="text"
                placeholder="295"
                ref={ref => {
                  this.docFee = ref;
                }}
              />
              <label className="active" htmlFor="docFee">
                Doc Fee ($)
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                id="lateFee"
                className="validate"
                type="text"
                placeholder="10"
                ref={ref => {
                  this.lateFee = ref;
                }}
              />
              <label className="active" htmlFor="lateFee">
                Late Fee ($)
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                id="noteServicingFee"
                className="validate"
                type="text"
                placeholder="10"
                ref={ref => {
                  this.noteServicingFee = ref;
                }}
              />
              <label className="active" htmlFor="noteServicingFee">
                Note Servicing Fee ($)
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                id="gracePeriod"
                className="validate"
                type="text"
                placeholder="5"
                ref={ref => {
                  this.gracePeriod = ref;
                }}
              />
              <label className="active" htmlFor="gracePeriod">
                Grace Period (days)
              </label>
            </div>
          </div>

          <button className="btn waves-effect waves-light" type="submit" name="action">
            Create
            <i className="material-icons right">add_box</i>
          </button>
        </form>
      </div>
    );
  }
}
