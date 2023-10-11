 import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import GameCard from './GameCard/GameCard';
import { useState } from 'react';
import { GameService } from '../api/GameService';
 const BannerSlider = () => {
  const [gameList, setGameList] = useState([]);

  const fetchData = async () => {
    try {
      const response = await GameService.getGameList();
      setGameList(response.data.jogos || []); // Certifique-se de usar a chave correta para acessar a lista de jogos
    } catch (error) {
      console.error('Erro ao obter dados da API:', error);
    }
  };


  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="banner-slider">
      <Slider {...sliderSettings}>
      {gameList.map((game) => (
          <div key={game.id}>
            <GameCard game={game} /> {/* Passa o jogo individual como prop para o componente GameCard */}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerSlider;
