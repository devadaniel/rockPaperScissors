import {Component} from 'react'
import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'
import {RiCloseLine} from 'react-icons/ri'
import GameOptions from '../GameOptions'
import './index.css'

const gameStatusConstants = {
  inProgress: 'IN_PROGRESS',
  win: 'WIN',
  lost: 'LOST',
  draw: 'DRAW',
}

class RockPaperScissors extends Component {
  state = {
    score: 0,
    userChoice: '',
    gameChoice: '',
    gameStatus: gameStatusConstants.inProgress,
  }

  onClickSetOptions = id => {
    this.setState(
      {userChoice: id, gameChoice: this.getGameChoice()},
      this.evaluateGame,
    )
  }

  onClickGameView = () => {
    this.setState({gameStatus: gameStatusConstants.inProgress})
  }

  getGameChoice = () => {
    const {choicesList} = this.props
    const gameChoicesList = choicesList.map(choice => choice.id)
    const randomIndex = Math.floor(Math.random() * 3)
    return gameChoicesList[randomIndex]
  }

  evaluateGame = () => {
    const {userChoice, gameChoice} = this.state

    if (userChoice === gameChoice) {
      this.setState({gameStatus: gameStatusConstants.draw})
    } else if (userChoice === 'ROCK') {
      if (gameChoice === 'SCISSORS') {
        this.setState(prevState => ({
          gameStatus: gameStatusConstants.win,
          score: prevState.score + 1,
        }))
      } else {
        this.setState(prevState => ({
          gameStatus: gameStatusConstants.lost,
          score: prevState.score - 1,
        }))
      }
    } else if (userChoice === 'PAPER') {
      if (gameChoice === 'ROCK') {
        this.setState(prevState => ({
          gameStatus: gameStatusConstants.win,
          score: prevState.score + 1,
        }))
      } else {
        this.setState(prevState => ({
          gameStatus: gameStatusConstants.lost,
          score: prevState.score - 1,
        }))
      }
    } else if (userChoice === 'SCISSORS') {
      if (gameChoice === 'PAPER') {
        this.setState(prevState => ({
          gameStatus: gameStatusConstants.win,
          score: prevState.score + 1,
        }))
      } else {
        this.setState(prevState => ({
          gameStatus: gameStatusConstants.lost,
          score: prevState.score - 1,
        }))
      }
    }
  }

  renderGameProcessView = () => {
    const {choicesList} = this.props
    return (
      <ul className="game-options-items">
        {choicesList.map(eachItem => (
          <GameOptions
            key={eachItem.id}
            OptionDetails={eachItem}
            onClickSetOptions={this.onClickSetOptions}
          />
        ))}
      </ul>
    )
  }

  renderGameWinView = () => {
    const {userChoice, gameChoice} = this.state
    const {choicesList} = this.props
    const userChoiceObjectLIST = choicesList.filter(
      choice => choice.id === userChoice,
    )
    const userChoiceObject = userChoiceObjectLIST[0]

    const gameChoiceObjectList = choicesList.filter(
      choice => choice.id === gameChoice,
    )
    const gameChoiceObject = gameChoiceObjectList[0]
    return (
      <div className="game-win-container">
        <div className="win-container">
          <div className="you-container">
            <h1 className="you-text">YOU</h1>
            <img
              src={userChoiceObject.imageUrl}
              alt="your choice"
              className="your-choice-image"
            />
          </div>
          <div>
            <h1 className="opponent-text">OPPONENT</h1>
            <img
              src={gameChoiceObject.imageUrl}
              alt="opponent choice"
              className="game-choice-image"
            />
          </div>
        </div>
        <div className="button-container">
          <p className="you-win-heading">YOU WON</p>
          <button
            className="play-again-button"
            type="button"
            onClick={this.onClickGameView}
          >
            PLAY AGAIN
          </button>
        </div>
      </div>
    )
  }

  renderGameLostView = () => {
    const {userChoice, gameChoice} = this.state
    const {choicesList} = this.props
    const userChoiceObjectLIST = choicesList.filter(
      choice => choice.id === userChoice,
    )
    const userChoiceObject = userChoiceObjectLIST[0]

    const gameChoiceObjectList = choicesList.filter(
      choice => choice.id === gameChoice,
    )
    const gameChoiceObject = gameChoiceObjectList[0]
    return (
      <div className="game-win-container">
        <div className="win-container">
          <div className="you-container">
            <h1 className="you-text">YOU</h1>
            <img
              src={userChoiceObject.imageUrl}
              alt="your choice"
              className="your-choice-image"
            />
          </div>
          <div>
            <h1 className="opponent-text">OPPONENT</h1>
            <img
              src={gameChoiceObject.imageUrl}
              alt="opponent choice"
              className="game-choice-image"
            />
          </div>
        </div>
        <div className="button-container">
          <p className="you-win-heading">YOU LOSE</p>
          <button
            className="play-again-button"
            type="button"
            onClick={this.onClickGameView}
          >
            PLAY AGAIN
          </button>
        </div>
      </div>
    )
  }

  renderGameDrawView = () => {
    const {userChoice, gameChoice} = this.state
    const {choicesList} = this.props
    const userChoiceObjectLIST = choicesList.filter(
      choice => choice.id === userChoice,
    )
    const userChoiceObject = userChoiceObjectLIST[0]

    const gameChoiceObjectList = choicesList.filter(
      choice => choice.id === gameChoice,
    )
    const gameChoiceObject = gameChoiceObjectList[0]
    return (
      <div className="game-win-container">
        <div className="win-container">
          <div className="you-container">
            <h1 className="you-text">YOU</h1>
            <img
              src={userChoiceObject.imageUrl}
              alt="your choice"
              className="your-choice-image"
            />
          </div>
          <div>
            <h1 className="opponent-text">OPPONENT</h1>
            <img
              src={gameChoiceObject.imageUrl}
              alt="opponent choice"
              className="game-choice-image"
            />
          </div>
        </div>
        <div className="button-container">
          <p className="you-win-heading">IT IS DRAW</p>
          <button
            className="play-again-button"
            type="button"
            onClick={this.onClickGameView}
          >
            PLAY AGAIN
          </button>
        </div>
      </div>
    )
  }

  renderGameView = () => {
    const {gameStatus} = this.state
    switch (gameStatus) {
      case gameStatusConstants.inProgress:
        return this.renderGameProcessView()
      case gameStatusConstants.win:
        return this.renderGameWinView()
      case gameStatusConstants.lost:
        return this.renderGameLostView()
      case gameStatusConstants.draw:
        return this.renderGameDrawView()
      default:
        return null
    }
  }

  render() {
    const {score} = this.state
    return (
      <div className="game-app-container">
        <div className="options-score-container">
          <h1 className="options">
            Rock
            <br />
            Paper
            <br />
            Scissors
          </h1>
          <div className="score-container">
            <p className="score-text">Score</p>
            <p className="score-count">{score}</p>
          </div>
        </div>
        {this.renderGameView()}
        <div className="popup-container">
          <Popup
            modal
            trigger={
              <button className="rules-button" type="button">
                Rules
              </button>
            }
            closeOnEscape
            window
          >
            {close => (
              <div className="popup-body-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                  alt="rules"
                  className="rules-image"
                />

                <button
                  className="close-button"
                  type="button"
                  onClick={() => close()}
                >
                  <RiCloseLine size={20} />
                </button>
              </div>
            )}
          </Popup>
        </div>
      </div>
    )
  }
}

export default RockPaperScissors
