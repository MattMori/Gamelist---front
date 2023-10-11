import { useEffect, useState } from 'react';
import { GameService } from '../../api/GameService';
import GameCard from '../../components/GameCard/GameCard';
import './index.scss';

const Home = ({ searchValueProp }) => {
  const [gameList, setGameList] = useState([]);

  const fetchData = async () => {
    try {
      const response = await GameService.getGameList();
      setGameList(response.data.jogos || []); // Certifique-se de usar a chave correta para acessar a lista de jogos
    } catch (error) {
      console.error('Erro ao obter dados da API:', error);
    }
  };

  const getGamesSearch = async (gameString) => {
    try {
      const response = await GameService.searchGames(gameString);
      setGameList(response.data.jogos || []); // Assumindo que a resposta da API contém uma propriedade 'jogos' com a lista de jogos
    } catch (error) {
      console.error('Erro ao pesquisar jogos:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchValueProp) {
      getGamesSearch(searchValueProp);
    } else {
      fetchData(); // Recarrega a lista completa de jogos se não houver termo de pesquisa
    }
  }, [searchValueProp]);

  return (
    <section className="Home">
      {gameList.map((game) => (
        <div key={game.id}>
          <GameCard game={game} /> {/* Passa o jogo individual como prop para o componente GameCard */}
        </div>
      ))}
    </section>
  );
};

export default Home;
