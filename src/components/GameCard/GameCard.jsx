
import { Link } from 'react-router-dom';
import { FaRegStar, FaCalendarAlt } from 'react-icons/fa';
import './index.scss';

const GameCard = ({ game }) => {
  

  return (
    <Link to={`/game/${game.id}`} className='btn-details'>
      <div className='GameCard'>
        <div className='GameIMG'>
          <img src={game.background_image} alt={game.name} aria-label='ver detalhes' />
        </div>
        <div className='details-text'>
            <h3>{game.name}</h3>
            <p><FaRegStar size={15} /> {game.rating.toFixed(1)}/5
                 || {(game.genres ? game.genres.map(genre => genre.name).join(', ') : 'N/A')}
            </p>
          </div>
        </div>
     </Link>
  );
};

export default GameCard;
