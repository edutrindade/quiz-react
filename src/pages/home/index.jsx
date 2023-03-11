import { useNavigate } from 'react-router-dom'

import LogoQuiz from '../../assets/images/quiz.png'

import './styles.css'

export default function Home() {
    const navigate = useNavigate()

    function start() {
        return navigate('/game');
    }


    return (
        <div className="container">
            <h1 className="title">Bem-vindo ao</h1>
            <img src={LogoQuiz} alt="React Logo" className="logo" />
            <small className="description">Teste seus conhecimentos sobre React</small>

            <button className="button-start" onClick={start}>🚀 Começar</button>

            <footer className="footer">
                <span className="author">Criado por <a href="https://github.com/edutrindade" target="_blank" rel="noreferrer" className="author"> Eduardo Trindade 😉</a></span>
            </footer>
        </div>
    )
}
