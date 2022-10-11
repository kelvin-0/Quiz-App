import React from "react"

const Question = (props)=>{
    const handleChange = (event)=>{
        const {name, value, id} = event.target
        props.setQuestions(prevQuestions=>{
            return prevQuestions.map(prevQuestion=>{
                if(prevQuestion.id === name){
                    return {...prevQuestion, answers: prevQuestion.answers.map(prevAnswer=>{
                        return {...prevAnswer, isClick: value === prevAnswer.answer ? !prevAnswer.isClick : false}
                    })}
                }
                return {...prevQuestion}
            })
        })
    }
    const answerElement = props.answers.map((answer)=>{
        return (
            <>
                <input className={
                    props.isCheck 
                    ? answer.correctAnswer === answer.answer
                        ? "correct"
                        : answer.isClick && answer.correctAnswer !== answer.answer
                            ? "wrong"
                            : ""
                    :""
                    
                } disabled={props.isCheck} onChange={handleChange} type="radio" id={answer.id} name={props.id} value={answer.answer}/>
                <label disabled={props.isCheck} htmlFor={answer.id}>{answer.answer}</label>
            </>
        )
    })
    return (
        <div className="question-container">
            <h2 className="question">{props.question}</h2>
            <div className ="options">
                {answerElement}
            </div>
            <hr className="line"/>
        </div>
    )
}

export default Question