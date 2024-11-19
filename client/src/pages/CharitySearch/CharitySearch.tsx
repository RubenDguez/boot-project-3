import React, { useState, useEffect } from "react";
import { searchCharities } from "../../utils/API.js";

interface Charity {
  id: string;
  name: string;
  description: string;
  address: string;
  website: string;
}

const CharitiesPage = () => {
  const [cityName, setCityName] = useState("");
  const [cause, setCause] = useState("");
  const [charities, setCharities] = useState<Charity[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCharities = async () => {
    setLoading(true);
    setError("");
    setCharities([]);

    try {
      const data = await searchCharities(cityName, cause);
      const transformedData = data.map((nonprofit: any) => ({
        id: nonprofit.id,
        name: nonprofit.name,
        description: nonprofit.description || "No description available",
        address: nonprofit.address || "Address not provided",
        website: nonprofit.website || "No website provided",
      }));
      setCharities(transformedData);
    } catch (error: any) {
      setError(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCharities();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Charities Search</h1>
      <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="cityName" style={{ marginRight: "10px" }}>
            City:
          </label>
          <input
            type="text"
            id="cityName"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            placeholder="Enter city name"
            required
            style={{ padding: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="cause" style={{ marginRight: "10px" }}>
            Cause:
          </label>
          <input
            type="text"
            id="cause"
            value={cause}
            onChange={(e) => setCause(e.target.value)}
            placeholder="Enter cause (e.g., education, health)"
            required
            style={{ padding: "5px" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px" }}>
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        {charities.length > 0 ? (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {charities.map((charity) => (
              <li
                key={charity.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "20px",
                  marginBottom: "10px",
                }}
              >
                <h2>{charity.name}</h2>
                <p>{charity.description}</p>
                <p>
                  <strong>Address:</strong> {charity.address}
                </p>

                {charity.website && (
                  <p>
                    <strong>Website:</strong>{" "}
                    <a
                      href={charity.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {charity.website}
                    </a>
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p>No charities found. Try a different search!</p>
        )}
      </div>
    </div>
  );
};

export default CharitiesPage;
