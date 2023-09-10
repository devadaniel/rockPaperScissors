import './index.css'

const GameOptions = props => {
  const {OptionDetails, onClickSetOptions} = props
  const {imageUrl, id} = OptionDetails

  const onClickOption = () => {
    onClickSetOptions(id)
  }

  return (
    <li className="options-items">
      <button
        type="button"
        className="each-options-button"
        data-testid={`${id.toLowerCase()}Button`}
        onClick={onClickOption}
      >
        <img src={imageUrl} alt={id} className="options-image" />
      </button>
    </li>
  )
}

export default GameOptions
