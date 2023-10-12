import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { GameService } from '../../api/GameService';
import { useParams, Link } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';

import './index.scss';

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState({});
  const [commentText, setCommentText] = useState("");
  const [commentName, setCommentName] = useState("");
  const [commentAdded, setCommentAdded] = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getGame() {
    try {
      const response = await GameService.getGameDetails(id);
      setGame(response.data.jogo || {});
    } catch (error) {
      console.error('Erro ao obter detalhes do jogo:', error);
    }
  }

  async function getComments() {
    try {
      const response = await GameService.getCommentGame(id);
      setComments(response.data.comments || []);
    } catch (error) {
      console.error('Erro ao obter comentários:', error);
    }
  }

  async function addCommentToGame() {
    try {
      if (commentText && commentName) {
        const response = await GameService.postCommentGame(id, commentName, commentText);
        console.log("Comentário adicionado com sucesso:", response.data);
        setCommentName("");
        setCommentText("");
        setCommentAdded(false);
      } else {
        console.error("Nome e texto do comentário são obrigatórios.");
      }
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
    }
  }

  const handleCommentNameChange = (e) => {
    setCommentName(e.target.value);
    if (e.target.value) {
      setCommentAdded(true);
    } else {
      setCommentAdded(false);
    }
  };

  const handleCommentTextChange = (e) => {
    setCommentText(e.target.value);
    // Se o texto do comentário for inserido, defina commentAdded como true
    if (e.target.value) {
      setCommentAdded(true);
    } else {
      setCommentAdded(false);
    }
  };

  useEffect(() => {
    getGame();
    getComments();
    console.log(comments)

  }, [id]);

  const sanitizeHTML = (dirtyHTML) => {
    return DOMPurify.sanitize(dirtyHTML);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await GameService.getGameDetails(id);
        setGame(response.data.jogo || {});
      } catch (error) {
        console.error('Erro ao obter detalhes do jogo:', error);
      } finally {
        setLoading(false); // Oculta a tela de carregamento, independentemente do resultado da requisição
      }
    }
  
    fetchData();
  }, [id]);

  return (
    <div className="GameDetail">
      <Link to="/" className="GameDetail__button">
        Back
      </Link>
      <div className="GameDetail__container">
        <h1 className="GameDetail__title">{game.name}</h1>
        <div className="GameDetail__image">
          <img src={game.background_image} alt={game.name} />
        </div>
        <div className="GameDetail__details">
          <p><strong>Description:</strong></p>
          <div className="GameDetail__detail" dangerouslySetInnerHTML={{ __html: sanitizeHTML(game.description) }} />
          <div className="GameDetail__detail">
            <span>Date released:</span> {(game.released)}
          </div>
          <div className="GameDetail__detail">
            <span>Platforms:</span>{''}
            {game.platforms ? game.platforms.map(platform => platform.platform.name).join(', ') : 'N/A'}
          </div>
          <div className="GameDetail__detail">
            <span>Metacritic:</span>{(game.metacritic)}
          </div>
          <div className="GameDetail__detail">
            <span>Site:</span>{game.website ? (<a href={game.website} target="_blank" rel="noopener noreferrer">{game.website}</a>) : ('N/A')}
          </div>
          <div className="GameDetail__detail">
            <span>Reddit:</span>{game.reddit_url ? (<a href={game.reddit_url} target="_blank" rel="noopener noreferrer">{game.reddit_url}</a>) : ('N/A')}
          </div>
          <div className="GameDetail__detail">
            <span>Genres:</span>{(game.genres ? game.genres.map(genre => genre.name).join(', ') : 'N/A')}
          </div>
          <div className="GameDetail__detail">
            <span>Developers:</span>{(game.developers ? game.developers.map(developers => developers.name).join(', ') : 'N/A')}
          </div>
          <div className="GameDetail__detail">
            <span>Tags:</span>{(game.tags ? game.tags.map(tags => tags.name).join(', ') : 'N/A')}
          </div>
          <div className="comments">
            <h2>Comments</h2>
            <ul>
              {comments.map((comment) => (
               
                <p key={comment._id}>{comment.name}: {comment.comment}</p>
              ))}
            </ul>
          </div>
          <div className='inputComments'>
            <label htmlFor="comments">Leave a comment:</label>
            <input
              className='inputComments__name'
              type="text"
              value={commentName}
              placeholder='Your Name here'
              onChange={handleCommentNameChange}
              
            />
            <TextareaAutosize
              className='inputComments__text'
              type="text"
              value={commentText}
              placeholder='Your comment here'
              onChange={handleCommentTextChange}
            />

            <button className='btn' onClick={addCommentToGame}>Add Comment</button>
          </div>
        </div>
      </div>
      {loading && <div className="loader">Carregando...</div>}
    </div>
  );
};

export default GameDetail;
