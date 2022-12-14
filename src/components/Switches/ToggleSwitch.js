import React from "react";
import "./ToggleSwitch.css";


const ToggleSwitch = ({ label, label2, value, setValue}) => {
    return (
      <div className="container">
        {label}{" "}
        <div className="toggle-switch">
          <input type="checkbox" className="checkbox" value={value}
            onChange={() => 
                setValue(!value)}
                // onChange={(value) => (!value)}
                    name={label} id={label} />
                    {/* {value ? true : false} */}
          <label className="label" htmlFor={label}>
            <span className="inner" />
            <span className="switch" />
          </label>
        </div>
        {label2}{" "}
      </div>
    );
  };
    
  export default ToggleSwitch;