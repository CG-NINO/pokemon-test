import React, { useEffect, useState } from 'react';
import './pokemon.css'

const PokemonList = ({ pokemons, onPokemonClick }) => {
  const [pokemonDetails, setPokemonDetails] = useState([]);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      const detailsPromises = pokemons.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const data = await response.json();
        return {
          id: data.id,
          name: data.name,
          url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
        };
      });

      const details = await Promise.all(detailsPromises);
      setPokemonDetails(details);
    };

    fetchPokemonDetails();
  }, [pokemons]);

  return (
    <div>
      <h2 className="card-container">Listado de Pokémon</h2>
      <div className="card-container">
        {pokemonDetails.map((pokemon) => (
          <div key={pokemon.id} className="card" onClick={() => onPokemonClick(pokemon.url)}>
            <img src={pokemon.imageUrl} alt={pokemon.name} />
            <p>Nombre: {pokemon.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
