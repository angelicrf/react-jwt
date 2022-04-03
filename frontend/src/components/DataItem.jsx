import React, { Fragment } from "react";

export const DataItem = ({ allData, usrName }) => {
  return (
    <Fragment>
      <div>User Name is : {usrName}</div>
      <ul>
        {allData.map((dt) => (
          <li key={dt.id}>{dt.name}</li>
        ))}
      </ul>
    </Fragment>
  );
};
