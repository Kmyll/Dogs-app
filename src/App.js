import React, { useState, useEffect } from "react";
import "./App.css";

const DOGS_URL = "https://dog.ceo/api/breeds/list/all";

function App() {
  const [ breeds, setBreeds ] = useState([]);
  const [ subBreeds, setSubBreeds ] = useState([]);
  const [ selectedBreed, setSelectedBreed ] = useState("");
  const [ selectedSubBreed, setSelectedSubBreed ] = useState("");
  const [ data, setData ] = useState(null);
  const [ imageNum, setImageNum ] = useState(1);
  const [ dogImg, setDogImg ] = useState([]);

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

  // select breed
  const handleBreedChange = (event) => {
    const breed = event.target.value;
    setSelectedBreed(breed);
    setSelectedSubBreed("");
    if (breeds.includes(breed)) {
      const subBreedsList = data.message[breed]; // use the data state variable
      console.log("subBreedsList", subBreedsList);
      setSubBreeds(subBreedsList);
    } else {
      setSubBreeds([]);
    }
  };

  //select sub-breed
  const handleSubBreedChange = (event) => {
    const subBreeds = event.target.value;
    setSelectedSubBreed(subBreeds);
  };

  // number of selected pictures
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

  const handleSubmitForm = (e) => {
    e.preventDefault();
    let IMG_URL = `https://dog.ceo/api`;
    if (selectedSubBreed) {
      IMG_URL += `/breed/${selectedBreed}/${selectedSubBreed}/images`;
    } else if (selectedBreed) {
      IMG_URL += `/breed/${selectedBreed}/images`;
    } else {
      IMG_URL += `/breeds/list/all`;
    }

    fetch(IMG_URL)
      .then((res) => res.json())
      .then((data) => {
        const sliceData = data.message.slice(0, imageNum);
        setDogImg(sliceData);
      })
      .catch((error) => console.log(error));
  };

  console.log("dogImg", dogImg);
  return (
    <div className='App'>
      <h1>The Dog App</h1>
      <form onSubmit={handleSubmitForm}>
        <label>Dog breed</label>
        <select value={selectedBreed} onChange={handleBreedChange}>
          <option value='option1'>Select an option</option>
          {breeds.map((breed, index) => (
            <option key={index} value={breed}>
              {breed}
            </option>
          ))}
        </select>

        {subBreeds.length > 0 && (
          <div>
            <label>Dog sub-breed</label>
            <select value={selectedSubBreed} onChange={handleSubBreedChange}>
              <option value='option1'>Select an option</option>
              {subBreeds.map((subBreed, index) => (
                <option key={index} value={subBreed}>
                  {subBreed}
                </option>
              ))}
            </select>
          </div>
        )}

        <label>Number of images to be displayed</label>
        <select value={imageNum} onChange={handleNumberChange}>
          {numberOptions}
        </select>

        <button type='submit'>View images</button>
      </form>
      // loop
      {dogImg && dogImg.map((image) => <img src={image} />)}
    </div>
  );
}

export default App;
