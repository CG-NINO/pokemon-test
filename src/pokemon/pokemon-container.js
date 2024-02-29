import React, { useState, useEffect } from 'react';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';


const PokemonContainer = () => {
    const [pokemons, setPokemons] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const handleGoBackToList = () => {
        setSelectedPokemon(null);
    };

    const handlePokemonClick = (url) => {
        fetchPokemonDetails(url);
    };

    const fetchPokemons = async (offset ) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offset}`);
            const data = await response.json();
            setPokemons(data.results);
        } catch (error) {
            console.error('Error fetching Pokemon data:', error);
        }
    };

    const fetchPokemonDetails = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setSelectedPokemon(data);
        } catch (error) {
            console.error('Error fetching Pokemon details:', error);
        }
    };

    useEffect(() => {
        const offset = (currentPage - 1) * itemsPerPage;
        fetchPokemons(offset);
    }, [currentPage, itemsPerPage]);
    
    return (
        <div>
            {selectedPokemon ? (
                <PokemonDetail details={selectedPokemon} onGoBack={handleGoBackToList} />
            ) : (
                <div>
                    <PokemonList pokemons={pokemons} onPokemonClick={handlePokemonClick} />
                    <br></br>
                    <div className="card-container">
                        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                            Anterior
                        </button>
                        <span>Página {currentPage}</span>
                        <button disabled={pokemons.length < itemsPerPage} onClick={() => setCurrentPage(currentPage + 1)}>
                            Siguiente
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
    
};

export default PokemonContainer;
