import React from 'react'
import ReactDOM from 'react-dom'

import 'bulma'

import Options from './components/Options'
import Game from './components/Game'
import Scoreboard from './components/Scoreboard'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      category: 'Any Category',
      difficulty: 'Any Difficulty',
      score: 0,
      route: 'options',
      correctAnswers: 0,
      totalQuestions: 10
    }
  }

  updateGame(state) {
    this.setState(state)
  }

  startGame() {
    this.setState({
      score: 0,
      correctAnswers: 0,
      route: 'game'
    })
  }

  returnHome() {
    this.setState({
      route: 'options'
    })
  }

  render() {
    let view

    switch (this.state.route) {
      case 'options':
        view = (
          <div>
            <Options
              category={this.state.category}
              difficulty={this.state.difficulty}
              updateGame={this.updateGame.bind(this)}
            />
            <div className="form has-text-centered">
              <button className="button is-large is-success"
                onClick={this.startGame.bind(this)}
              >
                Start Game
              </button>
            </div>
          </div>
        )
        break
      case 'game':
        view = (
          <div>
            <Game
              totalQuestions={this.state.totalQuestions}
              correctAnswers={this.state.correctAnswers}
              category={this.state.category}
              difficulty={this.state.difficulty}
              score={this.state.score}
              updateGame={this.updateGame.bind(this)}
            />
          </div>
        )
        break
      case 'scoreboard':
        view = (
          <div className="section has-text-centered">
            <Scoreboard
              score={this.state.score}
              totalQuestions={this.state.totalQuestions}
              correctAnswers={this.state.correctAnswers}
            />
            <div>
              <button className="button is-outlined has-text-centered"
                onClick={this.returnHome.bind(this)}
              >
                Home
              </button>
              <button className="button is-outlined has-text-centered"
                onClick={this.startGame.bind(this)}
              >
                New Game
              </button>
            </div>
          </div>
        )
        break
    }
    return (
      <div>
        {view}
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)