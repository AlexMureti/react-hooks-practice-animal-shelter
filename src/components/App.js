import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  // Updates the filter type
  const handleChangeType = (type) => {
    setFilters({ ...filters, type });
  };

  // Fetch pets from API
  const handleFindPetsClick = () => {
    let url = "/pets";
    if (filters.type !== "all") {
      url += `?type=${filters.type}`;
    }

    fetch(`http://localhost:3001${url}`)
      .then((res) => res.json())
      .then((data) => setPets(data));
  };

  // Adopt a pet
  const handleAdoptPet = (id) => {
    const updatedPets = pets.map((pet) =>
      pet.id === id ? { ...pet, isAdopted: true } : pet
    );
    setPets(updatedPets);
  };

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters
              filters={filters}
              onChangeType={handleChangeType}
              onFindPetsClick={handleFindPetsClick}
            />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={handleAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
