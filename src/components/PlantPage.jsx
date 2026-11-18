import { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then((data) => setPlants(data))
      .catch((err) => console.error("Fetch failed:", err));
  }, []); // empty array = run once on load

  function handleAddPlant(newPlant) {
    setPlants((prev) => [...prev, newPlant]);
  }

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search search={search} onSearchChange={setSearch} />
      <PlantList plants={filteredPlants} />
    </main>
  );
}

export default PlantPage;