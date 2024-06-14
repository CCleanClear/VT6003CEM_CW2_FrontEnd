import React, { useState } from 'react';
import Dog from './DogImage';
import Search from './Search';


const Breed = () => {
  const [dogImages, setDogImages] = useState<string[]>([]); 

  const getDogPics = async (breed: string) => {
    setDogImages([]); 
    try {
      const response = await fetch(
        `https://dog.ceo/api/breed/${breed}/images/random/5`
      );
      const { message } = await response.json();
      setDogImages(message);
    } catch (error) {
      console.error('Error fetching dog images:', error);
      setDogImages([]); 
    }
  };

  return (
    <div>
      <section>
        <Search getDogPics={getDogPics} />
      </section>
      <section>
        <Dog dogImages={dogImages} />
      </section>
    </div>
  );
};

export default Breed;