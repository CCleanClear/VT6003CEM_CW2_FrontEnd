import React, { useState, useEffect } from 'react';

interface Props {
  getDogPics: (breed: string) => void;
}

const Search: React.FC<Props> = ({ getDogPics }) => {
  const [breedList, setBreedList] = useState<string[]>([]);

  useEffect(() => {
    getBreedList();
  }, []);

  async function getBreedList() {
    try {
      const data = await fetch('https://dog.ceo/api/breeds/list/all');
      const { message } = await data.json();
      setBreedList(Object.keys(message));
    } catch (error) {
      console.error('Error fetching breed list:', error);
      setBreedList([]);
    }
  }

  return (
    <div>
       <h2 style={{color:"#CD5C5C",marginLeft:"15px"}}>
        Choose a breed to confirm paired dog breeds
        </h2>
      <select name="breedList" onChange={(e) => getDogPics(e.target.value)}>
        <option value="">Select a breed</option>
        {breedList.map((breed) => (
          <option value={breed} key={breed}>
            {breed}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Search;