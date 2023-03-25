import { Component } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import "./index.css";

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    showSubmitError: false,
    errorMsg: "",
    activeTab: "sigin",
  };
  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitSuccess = (jwtToken) => {
    const { history } = this.props;

    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
    });
    history.replace("/");
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ showSubmitError: true, errorMsg });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const userDetails = { username, password };
    const url = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token);
    } else {
      this.onSubmitFailure(data.error_msg);
    }
  };
  changeActiveTab = (event) => {
    if (event.target.id === "sigin") {
      let siginupElement = document.getElementById("siginup");
      siginupElement.classList.add("inactive", "underlineHover");
      siginupElement.classList.remove("active");
      event.target.classList.add("active");
    }
    else {
      let siginInElement = document.getElementById("sigin");
      siginInElement.classList.add("inactive", "underlineHover");
      siginInElement.classList.remove("active");
      event.target.classList.add("active");
      event.target.classList.remove("inactive");
    }
    this.setState({ activeTab: event.target.id });
  };
  render() {
    const { showSubmitError, errorMsg, username, password, activeTab } =
      this.state;
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken !== undefined) {
      return <Redirect to="/" />;
    }
    return (
      <div className="wrapper">
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <div className="m-2 p-3">
              <h2
                className="active heading"
                id="sigin"
                onClick={this.changeActiveTab}
              >
                {" "}
                Sign In{" "}
              </h2>
              <h2
                className="inactive underlineHover heading"
                id="siginup"
                onClick={this.changeActiveTab}
              >
                Sign Up{" "}
              </h2>
            </div>
            {activeTab === "sigin" ? (
              <>
                <form onSubmit={this.submitForm}>
                  <input
                    type="text"
                    id="username"
                    className="fadeIn second"
                    name="username"
                    placeholder="username"
                    value={username}
                    onChange={this.onChangeUsername}
                  />
                  <input
                    type="password"
                    id="password"
                    className="fadeIn third"
                    name="login"
                    placeholder="password"
                    value={password}
                    onChange={this.onChangePassword}
                  />

                  <input
                    type="submit"
                    className="fadeIn fourth"
                    value="Log In"
                    style={{ marginTop: "10px" }}
                  />
                  {showSubmitError && (
                    <p className="error-message">*{errorMsg}</p>
                  )}
                </form>
                <div id="formFooter">
                  <a className="underlineHover" href="./">
                    Forgot Password?
                  </a>
                </div>
              </>
            ) : (
              <>
                <form onSubmit={this.submitForm}>
                  <input
                    type="text"
                    id="username"
                    className="fadeIn second"
                    name="username"
                    placeholder="username"
                    value={username}
                    onChange={this.onChangeUsername}
                  />
                  <input
                    type="password"
                    id="password"
                    className="fadeIn third"
                    name="login"
                    placeholder="password"
                    value={password}
                    onChange={this.onChangePassword}
                  />

                  <input
                    type="submit"
                    className="fadeIn fourth"
                    value="Sign Up"
                    style={{ marginTop: "10px" }}
                  />
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
