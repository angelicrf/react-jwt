import React, { Fragment, useState, useRef } from "react";
import DataItem from "./DataItem";

function Data() {
  const [data, setData] = useState([]);
  const [textName, setTextName] = useState("");
  let userName = useRef();
  const submitData = (e) => {
    e.preventDefault();
    setData((oldArray) => [
      ...oldArray,
      {
        id: data.length,
        name: textName,
      },
    ]);

    //setTextName("");
  };
  const AssignUserName = (thisId) => {
    userName.current = thisId;
  };
  const ReadArrayItem = () => {
    if (data.length > 0) {
      console.log("datais " + JSON.stringify(data));
    }
  };
  ReadArrayItem();
  return (
    <Fragment>
      <div className="heading">
        <div className="form">
          <form onSubmit={submitData}>
            <div className="form-control">
              <input
                type="text"
                name="fData"
                id="fData"
                value={textName}
                onChange={(e) => setTextName(e.target.value)}
              />
            </div>

            <button className="btn btn-block" type="submit">
              Send Data
            </button>
          </form>
        </div>
      </div>
      <DataItem allData={data} usrName={userName.current} />
    </Fragment>
  );
}

export default Data;
