import React from 'react'

class Options extends React.Component {
  constructor() {
    super()
    this.state = {
      categories: []
    }
  }
  componentDidMount() {
    fetch('https://opentdb.com/api_category.php')
      .then(resp => resp.json()).then(data => {
        this.setState({
          categories: data.trivia_categories
        })
      })
  }

  categoryChange(event) {
    const category = event.target.value
    this.props.updateGame({
      category: category
    })
  }

  difficultyChange(event) {
    const difficulty = event.target.value
    this.props.updateGame({
      difficulty: difficulty
    })
  }

  render() {
    const category = this.props.category
    const difficulty = this.props.difficulty

    return (
      <form className="form has-text-centered">
        <section className="hero is-info is-medium">
          <div className="hero-body">
            <div className="container">
              <p className="title is-1">Ten Questions</p>
              <p className="subtitle">Test your knowledge...</p>
            </div>
          </div>
        </section>
        <div className="field">
          <div className="section">
            <label className="label has-text-centered">Select Category</label>
            <div className="select">
              <select
                value={category}
                onChange={this.categoryChange.bind(this)}
              >
                <option>Any Category</option>
                {
                  this.state.categories.map(category =>
                    <option key={category.id} value={category.id}>{category.name}</option>
                  )
                }
              </select>
            </div>
            <div className="field">
              <label className="label">Select Difficulty</label>
              <div className="select">
                <select
                  value={difficulty}
                  onChange={this.difficultyChange.bind(this)}
                >
                  <option>Any Difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default Options