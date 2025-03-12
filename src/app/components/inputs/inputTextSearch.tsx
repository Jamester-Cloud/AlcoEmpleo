import React from "react";

const InputTextSearch = (props: any) => {
  return (
    <div className="input-group mb-3">
      <input {...props} type="text" className="form-control" />
    </div>
  );
};

export default InputTextSearch;
