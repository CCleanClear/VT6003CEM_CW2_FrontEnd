import React from 'react';

interface Props {
  dogImages: string[];
}

const DogImage: React.FC<Props> = ({ dogImages }) => {
  return (
    <div>
      {dogImages ? (
        dogImages.map((dog: string, index: number) => {
          return <img className="dog" src={dog} key={index} width={400} height={300}
            style={{
              padding: 10, border: '1px solid black', borderRadius: '10px', margin: 10
            }}
          />;
        })
      ) : (
        <h1>Waiting...</h1>
      )}
    </div>
  );
};

export default DogImage;