import './App.css';
import PokemonContainer from "./pokemon/pokemon-container";
import { Routes, Route, Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
    <Routes>
      <Route path="/" Component={PokemonContainer} />
    </Routes>
    <Outlet/>
  </div>
  );
}

export default App;
