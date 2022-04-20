import {Component} from 'react'

import {v4} from 'uuid'

import './App.css'

import PasswordList from './PasswordList'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class App extends Component {
  state = {
    passwordsList: [],
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    isShowPassword: false,
    searchInput: '',
  }

  onChangeWebsiteInput = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsernameInput = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  onSearchPasswordList = event => {
    this.setState({searchInput: event.target.value})
  }

  onChecked = () => {
    this.setState(prev => ({isShowPassword: !prev.isShowPassword}))
  }

  onAddPasswordList = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newPassword = {
      id: v4(),
      websiteInput,
      usernameInput,
      passwordInput,
      initialBackgroundColorClassName,
    }

    this.setState(prev => ({
      passwordsList: [...prev.passwordsList, newPassword],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  onDeletePasswordItem = id => {
    const {passwordsList} = this.state
    const newPasswordList = passwordsList.filter(
      eachPassword => eachPassword.id !== id,
    )
    this.setState({passwordsList: newPasswordList})
  }

  renderShowNoPasswords = () => (
    <div className="no-passwords-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-passwords-image"
      />
      <p className="no-password">No Passwords</p>
    </div>
  )

  render() {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      searchInput,
      passwordsList,
      isShowPassword,
    } = this.state

    const newPasswordList = passwordsList.filter(eachPassword =>
      eachPassword.websiteInput
        .toLowerCase()
        .includes(searchInput.toLowerCase()),
    )
    const passwordCount = newPasswordList.length

    return (
      <div className="bg-container">
        <img
          className="app-logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="app-container">
          <div className="create-password">
            <form
              className="add-password-container"
              onSubmit={this.onAddPasswordList}
            >
              <h1 className="heading">Add New Password</h1>
              <div className="input-list">
                <p className="box-container">
                  <img
                    className="input-logo"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                  />
                </p>
                <input
                  type="text"
                  value={websiteInput}
                  onChange={this.onChangeWebsiteInput}
                  className="input"
                  placeholder="Enter Website"
                />
              </div>
              <div className="input-list">
                <p className="box-container">
                  <img
                    className="input-logo"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                  />
                </p>
                <input
                  type="text"
                  value={usernameInput}
                  onChange={this.onChangeUsernameInput}
                  className="input"
                  placeholder="Enter UserName"
                />
              </div>
              <div className="input-list">
                <p className="box-container">
                  <img
                    className="input-logo"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                  />
                </p>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={this.onChangePasswordInput}
                  className="input"
                  placeholder="Enter Password"
                />
              </div>
              <div className="add-button-container">
                <button type="submit" className="button">
                  Add
                </button>
              </div>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            className="password-manager"
            alt="password manager"
          />
        </div>
        <div className="passwords-container">
          <div className="header-container">
            <h1 className="header">
              Your Passwords <p className="count">{passwordCount}</p>
            </h1>
            <div className="password-list">
              <p className="search-container">
                <img
                  className="search-logo"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                />
              </p>
              <input
                type="search"
                onChange={this.onSearchPasswordList}
                className="search-input"
                placeholder="Search"
              />
            </div>
          </div>
          <hr className="hr" />
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="showPassword"
              onChange={this.onChecked}
              checked={isShowPassword}
            />
            <label htmlFor="showPassword" className="show">
              Show Passwords
            </label>
          </div>
          <div className="password-container">
            {passwordCount === 0 ? (
              this.renderShowNoPasswords()
            ) : (
              <ul className="password-list">
                {newPasswordList.map(eachPassword => (
                  <PasswordList
                    passwordDetails={eachPassword}
                    key={eachPassword.id}
                    isShowPassword={isShowPassword}
                    onDeletePasswordItem={this.onDeletePasswordItem}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}
export default App
