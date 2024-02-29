import React, { useState, useEffect } from 'react';

const PokemonDetail = ({ details, onGoBack }) => {
  const [abilities, setAbilities] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    if (details.abilities) {
      setAbilities(details.abilities);
    }

    if (details.types) {
      setTypes(details.types);
    }
  }, [details]);

  return (
    <div className="container">
      <h2>Detalles del Pokémon</h2>
      <p>ID: {details.id}</p>
      <p>Nombre: {details.name}</p>
      <img src={details.sprites.front_default} alt={details.name} className="image" />
      {abilities.length > 0 ? (
        <div>
          <h3>Habilidades:</h3>
          <ul>
            {abilities.map((abilityInfo) => (
              <li key={abilityInfo.ability.name}>
                <>{abilityInfo.ability.name}</>
                {abilityInfo.is_hidden && <span> (Habilidad oculta)</span>}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No se encontraron habilidades.</p>
      )}

      {types.length > 0 ? (
        <div>
          <h3>Tipo:</h3>
          <ul>
            {types.map((typeInfo) => (
              <li key={typeInfo.slot}>
                 {typeInfo.type.name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No se encontraron tipos.</p>
      )}

      <button onClick={onGoBack}>Volver a la lista</button>
    </div>
  );
};

export default PokemonDetail;
