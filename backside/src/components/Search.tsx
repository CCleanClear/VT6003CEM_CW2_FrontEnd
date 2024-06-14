import React, { useState, useEffect } from 'react';

interface Props {
  getDogPics: (breed: string) => void;
}

const Search: React.FC<Props> = ({ getDogPics }) => {
  const [breedList, setBreedList] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>('');

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

  const handleBreedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedBreed(selectedValue);
    getDogPics(selectedValue);
  };

  return (
    <div>
      <h2 style={{ color: "#CD5C5C", marginLeft: "15px" }}>
      Info of Dog Breed: <strong>{selectedBreed}</strong>
      </h2>
      <select name="breedList" onChange={handleBreedChange}>
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