import React, { Fragment } from "react";

function DataItem({ allData, usrName }) {
  return (
    <Fragment>
      <ul>
        {allData.map((dt) => (
          <li key={dt.id}>{(usrName = dt.name)}</li>
        ))}
      </ul>
      <div>
        {usrName !== "" ? (
          <div>user name: {usrName}</div>
        ) : (
          <div>No user name</div>
        )}
      </div>
    </Fragment>
  );
}

export default DataItem;
