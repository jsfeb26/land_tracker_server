import React, { Component } from "react";
import ReactTable from "react-table";

import Button from "@material-ui/core/Button";

export default class ParcelTable extends Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        accessor: "_id",
        Cell: ({ value }) => (
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={() => this.props.onSendClick(value)}
          >
            Send
          </Button>
        )
      },
      { Header: "Ref Number", accessor: "refNumber" },
      { Header: "Parcel ID", accessor: "parcelId" },
      { Header: "Parcel Size", accessor: "parcelSize" },
      { Header: "Offer", accessor: "offer" },
      { Header: "Taxes Due", accessor: "taxesDue" }
    ];
  }

  render() {
    const { orgParcels = [] } = this.props;

    return (
      <div className="table-container">
        {!!orgParcels.length && (
          <ReactTable data={orgParcels} columns={this.columns} className="-highlight" />
        )}
      </div>
    );
  }
}
