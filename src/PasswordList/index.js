import './index.css'

const PasswordList = props => {
  const {passwordDetails, isShowPassword, onDeletePasswordItem} = props
  const {websiteInput, usernameInput, passwordInput, id} = passwordDetails

  const initial = websiteInput[0].toUpperCase()

  const passwordItem = isShowPassword ? (
    <p className="star">{passwordInput}</p>
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
    />
  )

  const onClickDeletePassword = () => {
    onDeletePasswordItem(id)
  }

  return (
    <div className="password-list-items-container">
      <li className="password-list-item">
        <div className="initial-container">{initial}</div>
        <div className="text">
          <p className="heading">{websiteInput}</p>
          <p className="name">{usernameInput}</p>
          {passwordItem}
        </div>
        <div className="button-container">
          <button
            type="button"
            className="delete-button"
            testid="delete"
            onClick={onClickDeletePassword}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
              className="delete-icon"
              alt="delete"
            />
          </button>
        </div>
      </li>
    </div>
  )
}

export default PasswordList
