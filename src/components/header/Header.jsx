import { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

const Header = (props) => {
  const [searchValue, setSearchValue] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    props.onSubmit(searchValue);
  }

  function handleInputChange(event) {
    setSearchValue(event.target.value);
  }

  return (
    <header className="Header">
      <Link to={"/"}><h1>Game Land </h1></Link>
       <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Pesquise por jogos" 
          value={searchValue} 
          onChange={handleInputChange}
        />
        <button className="btn-header" type="submit">Pesquisar</button>
      </form>
    </header>
  );
};

export default Header;
