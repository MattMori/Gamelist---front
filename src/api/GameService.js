import axios from "axios";

const BASE_URL = "https://game-list-back.vercel.app"; // A URL base do seu servidor local

const withBaseUrl = (path) => `${BASE_URL}${path}`;

export class GameService {
  // Obter lista de jogos
  static getGameList() {
    return axios.get(withBaseUrl("/GameList/games"));
  }

  // Obter detalhes de um jogo específico pelo ID
  static getGameDetails(id) {
    return axios.get(withBaseUrl(`/GameList/games/${id}`));
  }

  // Pesquisar jogos por nome
  static searchGames(query) {
    return axios.get(withBaseUrl(`/GameList/games?search=${query}`));
  }
  // Realizar um comentário em determinado jogo
static postCommentGame(id, name,comment) {
  return axios.post(withBaseUrl(`/GameList/games/${id}/comments`), { name,comment });
}

  // obtem os comentario em determinado jogo
  static getCommentGame(id){
    return axios.get(withBaseUrl(`/GameList/games/${id}/comments`))
  }
  static logarUsuario(){
    return axios.post(withBaseUrl(`/usuario/logar`))
  }
  static criarUsuario(){
    return axios.post(withBaseUrl(`//usuario/criar`))
  }
  


}
