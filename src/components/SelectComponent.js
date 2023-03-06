import React from "react";

const SelectComponent = ({
  label,
  options,
  value,
  onChange,
  selectedOption,
  errorMessage,
  error,
}) => {
  return (
    <div>
      <label htmlFor='dog-input'>{label}</label>
      <select
        value={value}
        onChange={onChange}
        id='dog-input'
        name='dogs'
        className={

            errorMessage ? "selectInput__red" :
            ""
        }
      >
        <option value='option1'>Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {errorMessage && <div className='error'>{errorMessage}</div>}
    </div>
  );
};

export default SelectComponent;
