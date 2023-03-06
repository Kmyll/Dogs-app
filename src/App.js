import React, { useState, useEffect } from "react";
import { DOGS_URL } from "./components/API/DogsApi";
import SelectComponent from "./components/SelectComponent";
import SelectImg from "./components/SelectImg";
import "./App.css";

function App() {
  const [ breeds, setBreeds ] = useState([]);
  const [ subBreeds, setSubBreeds ] = useState([]);
  const [ selectedBreed, setSelectedBreed ] = useState("");
  const [ selectedSubBreed, setSelectedSubBreed ] = useState("");
  const [ data, setData ] = useState(null);
  const [ imageNum, setImageNum ] = useState(1);
  const [ dogImg, setDogImg ] = useState([]);
  const [ selectedOption, setSelectedOption ] = useState("");
  const [ errorMessage, setErrorMessage ] = useState("");
  const [ error, setError ] = useState(false);

  useEffect(() => {
    fetch(DOGS_URL)
      .then((response) => response.json())
      .then((data) => {
        const dogList = Object.keys(data.message);
        setBreeds(dogList);
        setData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleBreedChange = (event) => {
    const breed = event.target.value;
    setSelectedBreed(breed);
    setSelectedSubBreed("");
    if (breeds.includes(breed)) {
      const subBreedsList = data.message[breed];
      setSubBreeds(subBreedsList);
      setSelectedOption("");
      setErrorMessage("");
      setError(false);
    } else {
      setSubBreeds([]);
    }
  };

  const handleSubBreedChange = (event) => {
    const subBreeds = event.target.value;
    setSelectedSubBreed(subBreeds);
    setSelectedOption(subBreeds);
    setErrorMessage("");
    setError(false);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (!selectedOption) {
      setError(true);
      setErrorMessage("Please select an option");
    }

    try {
      let imgURL = `https://dog.ceo/api`;
      if (selectedSubBreed) {
        imgURL += `/breed/${selectedBreed}/${selectedSubBreed}/images`;
      } else if (selectedBreed) {
        imgURL += `/breed/${selectedBreed}/images`;
      } else {
        imgURL += `/breeds/list/all`;
      }

      const response = await fetch(imgURL);
      if (!response.ok) {
        setError(true);
        setErrorMessage("Please select a breed");
        return;
      }

      const data = await response.json();
      const slicedData = data.message.slice(0, imageNum);
      setDogImg(slicedData);
      setError(false);
      setErrorMessage("");
    } catch (error) {
      setError(true);
      setErrorMessage("Please select a breed");
    }
  };

  return (
    <div className='container'>
      <h1>The Dog App</h1>

      <form onSubmit={handleSubmitForm}>
        <SelectComponent
          label='Dog breed'
          options={breeds}
          value={selectedBreed}
          selectedOption={selectedOption}
          errorMessage={errorMessage}
          error={error}
          onChange={handleBreedChange}
        />
        {subBreeds.length > 0 && (
          <SelectComponent
            label='Dog sub-breed'
            options={subBreeds}
            value={selectedSubBreed}
            selectedOption={selectedOption}
            errorMessage={errorMessage}
            error={error}
            onChange={handleSubBreedChange}
          />
        )}
        <SelectImg
          imageNum={imageNum}
          setImageNum={setImageNum}
          error={error}
          selectedOption={selectedOption}
        />
        <button type='submit'>View images</button>
      </form>

      <div className='images__container'>
        {dogImg &&
          dogImg.map((image, index) => <img key={index} src={image} />)}
      </div>
    </div>
  );
}

export default App;
