import React from 'react'

function shuffle(array) {
  let j, x, i
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = array[i]
    array[i] = array[j]
    array[j] = x
  }
  return array
}

class Game extends React.Component {
  constructor() {
    super()
    this.state = {
      questionNo: 0,
      questions: null
    }
  }
  componentDidMount() {
    const category = this.props.category === 'Any Category' ? '' : this.props.category
    const difficulty = this.props.difficulty === 'Any Difficulty' ? '' : this.props.difficulty
    const apiUrl = `https://opentdb.com/api.php?amount=${this.props.totalQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`
    fetch(apiUrl)
      .then(resp => resp.json()).then(data => {
        this.setState({
          questions: data.results
        })
      })
  }

  answerQuestion(event) {
    const questions = this.state.questions
    const questionNo = this.state.questionNo
    const question = questions[questionNo]
    const possibleAnswer = event.target.textContent

    if (possibleAnswer === question.correct_answer) {
      this.props.updateGame({
        correctAnswers: this.props.correctAnswers + 1,
        score: this.props.score + 10
      })
    }
    if (questionNo === this.props.totalQuestions - 1) {
      this.props.updateGame({
        route: 'scoreboard'
      })
    } else {
      this.setState({
        questionNo: questionNo + 1
      })
    }
  }

  render() {
    const questions = this.state.questions
    if (questions === null) {
      return <div>Loading...</div>
    }
    const questionNo = this.state.questionNo
    const question = questions[questionNo]
    const answers = shuffle([...question.incorrect_answers, question.correct_answer])

    return (
      <div className="section has-text-centered">
        <div className="is-medium">
          Score: {this.props.score}
        </div>
        <h2 className="title is-2">Question {questionNo + 1}</h2>
        <p className="content is-medium" dangerouslySetInnerHTML={{
          __html: question.question
        }} />
        <h3 className="subtitle is-4">Select an answer:</h3>

        <div className="columns">
          {
            answers.map((answer, i) => (
              <div className="column" key={i}>
                <button
                  className="button is-large is-link is-focused"
                  onClick={this.answerQuestion.bind(this)}
                  dangerouslySetInnerHTML={{
                    __html: answer
                  }}
                />
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Game