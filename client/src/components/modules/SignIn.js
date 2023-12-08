import React, { Component } from "react";

class SignIn extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }
  
  handleUsernameChange(event){
    this.setState({
      username: event.target.value,
    });
  }
  handlePasswordChange(event){
    this.setState({
      password: event.target.value,
    });
  }
  
  goSignIn(){
    post("/api/login", {
      name: this.state.username,
      password: this.state.password,
    }).then((res) => {
      console.log(res);
    });
  }

  render(){
    return (
      <>
        <div className="sign-in-container">
          <label for="username" className="sign-in-label">Username</label>
          <input type="text" name="username" placeholder="your username"
                 onChange={this.handleUsernameChange.bind(this)} value={this.state.username}
                 className="sign-in-input"
          />
          <label for="password">Password</label>
          <input type="password" name="password"
                 onChange={this.handlePasswordChange.bind(this)} value={this.state.password}
                 className="sign-in-input"
          />
          <button type="submit" value="Submit"
                  className="new-post-input-button sign-in-button"
                  onClick={this.goSignIn.bind(this)}
          >
            Sign in
          </button>
        </div>
        <div className="go-sign-up">
          <a href="/signup">sign up</a>
        </div>
      </>
    );
  }
}

export default SignIn;

