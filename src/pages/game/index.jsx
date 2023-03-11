import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { questions, shuffle } from '../../database/questions'
import Spinner from 'reactjs-simple-spinner'

import LogoQuiz from '../../assets/images/quiz.png'

import './styles.css'
import Score from '../score'

export default function Game() {
    const navigate = useNavigate()

    const [questionsSelected, setQuestionsSelected] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [userAnswers, setUserAnswers] = useState([])
    const [loading, setLoading] = useState(true)
    const [finish, setFinish] = useState(false)

    useEffect(() => {
        if (questionsSelected.length > 0) return;

        const shuffledQuestions = shuffle(questions);
        const selectedQuestions = shuffledQuestions.slice(0, 5);
        setQuestionsSelected(selectedQuestions)
        setLoading(false)
    }, [questionsSelected])

    // Função chamada quando o usuário responde uma questão
    function handleAnswer(selectedOptionIndex) {
        const currentQuestionData = questionsSelected[currentQuestion];
        const userAnswer = currentQuestionData.answers[Number(selectedOptionIndex)];
        setUserAnswers([...userAnswers, userAnswer]);

        if (currentQuestion < 4) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setFinish(true);
        }
    }

    const currentQuestionData = questionsSelected[currentQuestion];

    if (finish) {
        const correctAnswers = userAnswers.filter(answer => answer.correct === true).length;
        return <Score score={correctAnswers} />
    }

    return (
        <div className="container">
            <img src={LogoQuiz} alt="React Logo" className="logo" />

            {loading ? (
                <div className="card">
                    <Spinner size={50} message="Carregando..." />
                </div>
            ) : (
                <div className="card">
                    <div className="card-question">
                        <h2 className="card-title">Pergunta {currentQuestion + 1} de 5</h2>
                        <p className="question">{currentQuestionData.question}</p>
                    </div>

                    <div className="card-answer">
                        <div className="card-options">
                            {currentQuestionData.answers.map((option, index) => (
                                <button className="card-option" key={index} onClick={() => handleAnswer(index)}>{option.text}</button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}