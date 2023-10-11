import { useState } from 'react';
import { GameService } from "../../api/GameService";
import './index.scss';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await GameService.logarUsuario(email, senha);

            if (response.status === 200) {
                // A requisição foi bem-sucedida, você pode redirecionar o usuário ou fazer outras ações aqui
                console.log('Login bem-sucedido');
            } else {
                // A requisição falhou, você pode mostrar uma mensagem de erro ao usuário
                console.error('Falha no login', response.data);
                setErro('Credenciais inválidas. Tente novamente.');
            }
        } catch (error) {
            // Handle errors, e.g., show error message to the user
            console.error('Falha no login', error);
            setErro('Ocorreu um erro ao fazer login. Tente novamente mais tarde.');
        }
    };

    return (
        <div className='Login'>
            <h1>Realizar Login</h1>
            {erro && <p>{erro}</p>}
            <form onSubmit={handleSubmit}>
                <div className="login__input-wrapper">
                    <label htmlFor="name">Digite seu email:</label>
                    <input
                        type="text"
                        placeholder="Seu E-Mail aqui"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /> <br />
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        placeholder="Sua Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    /> <br />
                </div>
                <button className="btn" type="submit">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
