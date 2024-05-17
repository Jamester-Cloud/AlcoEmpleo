
import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';

export default function DropDown(props: any) {
    let { data } = props;
    
    return (
        <CreatableSelect
        defaultValue={[data[0]]}
        isMulti
        name="colors"
        options={data}
        className="basic-multi-select"
        classNamePrefix="select"
      />
    )

}