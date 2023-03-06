import React from "react";

export default function SelectImg({ imageNum, setImageNum, errorMessage }) {
  const handleNumberChange = (event) => {
    setImageNum(parseInt(event.target.value));
  };

  const numberOptions = [];
  for (let i = 1; i <= 10; i++) {
    numberOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <div className='form__select'>
      <label htmlFor='dogs-images-number'>
        Number of images to be displayed
      </label>
      <select
        value={imageNum}
        onChange={handleNumberChange}
        id='dogs-images-number'
        name='dogs-images'
        className={

            errorMessage ? "selectInput__red" :
            ""
        }
      >
        {numberOptions}
      </select>
    </div>
  );
}
