import React from 'react'
import axios from 'axios'
import MyBlob from './images/blobs.png'
import MyBlob2 from './images/blobs2.png'
import Question from './components/Question'
import {nanoid} from 'nanoid'

const baseUrl = "https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=multiple"

const App = ()=>{
    const [questions, setQuestions] = React.useState([])
    const [isStart, setIsStart] = React.useState(false)
    const [isCheck, setIsCheck] = React.useState(false)
    const [correctAnswers, setCorrectAnswers] = React.useState(0)
    const shuffleAnswers = (question)=>{
        const answers = [...question.incorrect_answers, question.correct_answer]
        //shuffle answers
        return answers.sort((a,b)=> 0.5 - Math.random())
    }
    React.useEffect(()=>{
        axios.get(baseUrl).then(res=>{
            const requestedData = res.data.results
            console.log(requestedData)
            setQuestions(requestedData.map((data, index)=>{
                return {question: data.question.replace(/&quot;/g,'"').replace(/&#039;/g,"'").replace(/&rsquo;/, "'"), id:`Question ${index + 1}`,answers: shuffleAnswers(data).map(answer=>{
                    return {answer: answer, isClick: false, correctAnswer: data.correct_answer, id:nanoid()}
                })}
            }))
        })
    }, [isStart])
    const questionElement = questions.map((question)=>{
        return <Question 
        key={question.id} 
        question={question.question} 
        answers = {question.answers}
        id={question.id}
        setQuestions={setQuestions}
        isCheck={isCheck}
        />
    })
    const handleSubmit=(event)=>{
        event.preventDefault()
        setIsCheck(prevValue=>!prevValue)
        for(let i = 0;i < questions.length;i++){
            for(let j = 0;j < questions[i].answers.length;j++){
                if(questions[i].answers[j].isClick && questions[i].answers[j].answer === questions[i].answers[j].correctAnswer){
                    setCorrectAnswers(prevValue => prevValue + 1)
                }
            }
        }
    }
    const playAgain = ()=>{
        setIsCheck(prevState=>!prevState)
        setIsStart(prevState=>!prevState)
        setCorrectAnswers(0)
    }
    return (
        <main>
            <img className="blob1" src={MyBlob} alt="shape"/>
            <img className="blob2" src={MyBlob2} alt="shape"/>
            {isStart ? (
                <form onSubmit={handleSubmit}>
                    {questionElement}
                    {!isCheck && <button className="btn check">Check Answers</button>}
                    {isCheck && (
                        <div className="score-container">
                            <h2 className="score">You Scored {`${correctAnswers}/${questions.length}`} correct {correctAnswers > 1 ? "answers" : "answer"}</h2>
                            <button className="btn" onClick={playAgain}>Play again</button>
                        </div>
                    )}
                </form>
                ): (
                <>
                    <h1 className="title">Quizzical</h1>
                    <p className="description">Test your knowledge</p>
                    <button className="btn" onClick={()=>{
                        setIsStart(prevValue=>!prevValue)
                    }}>Start quiz</button>
                </>
            )}
        </main>
    )

}

export default App