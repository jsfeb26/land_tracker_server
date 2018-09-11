import React, { Component } from "react";
import ReactTable from "react-table";
import get from "lodash.get";

import { Button } from "@material-ui/core";

import { Linear } from "./Loader";

export default class ParcelTable extends Component {
  constructor(props) {
    super(props);

    this.columns = [
      { Header: "Id", accessor: "_id", show: false },

      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value: status, ...row }) => {
          const data = get(row, "row");
          const id = data._id;
          const stage = data.stage;

          if (stage !== "New" || (stage === "New" && status !== "Open")) {
            return status;
          }

          if (this.props.sendingParcels[id]) {
            return <Linear />;
          }

          return (
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={() => this.props.onSendClick(id)}
            >
              Send
            </Button>
          );
        }
      },
      { Header: "Stage", accessor: "stage" },
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
