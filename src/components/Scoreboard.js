import React from 'react'

function Scoreboard(props) {
  const correctAnswers = props.correctAnswers
  const incorrectAnswers = props.totalQuestions - correctAnswers
  return (
    <div className="form has-text-centered">
      <h1 className="title is-1">Quiz Finished</h1>
      <div className="section">
        <h2 className="subtitle is-4">Final Score:</h2>
        <span>{props.score}</span>
      </div>
      <div className="section">
        <h2 className="subtitle is-4">Correct Answers:</h2>
        <span>{correctAnswers}</span>
      </div>
      <div className="section">
        <h2 className="subtitle is-4">Incorrect Answers:</h2>
        <span>{incorrectAnswers}</span>
      </div>
    </div>
  )
}

export default Scoreboard