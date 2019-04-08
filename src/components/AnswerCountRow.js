import React, {Component} from 'react';
import '../css/App.css';

export default class AnswerCountRow extends Component {

  componentDidMount() {
    this.props.subscribeToNewAnswerCount()
  }

  render(){
    const { percentCorrect, total } = this.props
    return (
      <>
      <div>
      <h6>
        Answered: { total  }
      </h6>
      </div>

      <div>
      <h6>
        Accuracy: { Math.round(percentCorrect * 100)}%
      </h6>
      </div>
      </>
    )
  }
}
