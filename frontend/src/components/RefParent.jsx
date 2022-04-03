import React, { createRef } from "react";
import { RefChild } from "./RefChild";

function RefParent() {
  let ref = createRef();
  let jmUser = "angy";
  return (
    <>
      <RefChild jamUser={jmUser} ref={ref} />
      <button className="btn" onClick={() => ref.current.focus()}>
        clickRef
      </button>
    </>
  );
}

export default RefParent;
