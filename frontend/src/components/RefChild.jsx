import React, { forwardRef } from "react";

export const RefChild = forwardRef(({ jamUser }, ref) => {
  return (
    <>
      <div>{jamUser}</div>
      <div>
        <input type="text" name="refText" id="refText" ref={ref} />
      </div>
    </>
  );
});
