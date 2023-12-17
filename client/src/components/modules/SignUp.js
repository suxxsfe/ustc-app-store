import React, { Component } from "react";

import { post } from "../../utilities.js";

class SignUp extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
      passwordRepeat: "",
    };
  }
  
  handleUsernameChange(username){
    this.setState({
      username: username,
    });
  }
  
  handlePasswordChange(password){
    this.setState({
      password: password,
    });
  }
  
  handlePasswordRepeatChange(password){
    this.setState({
      passwordRepeat: password,
    });
  }
  
  goSignUp(){
    if(this.state.username === ""){
      return;
    }
    if(this.state.password === ""){
      return;
    }
    if(this.state.password !== this.state.passwordRepeat){
      return;
    }
    
    post("/api/usercreate", {
      name: this.state.username,
      intro: "",
      password: this.state.password,
      projects: [],
      links: [],
      type: "普通用户",
    })
    .then((res) => {
      console.log("created user successfully");
      this.props.successSignUpHook();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render(){
    return (
      <>
        <div className="sign-container">
          <SignUpUsernameInput name={this.state.username}
                               handleChange={this.handleUsernameChange.bind(this)}
          />
          <SignUpPasswordInput password={this.state.password} passwordRepeat={this.state.passwordRepeat}
                               handleChange={this.handlePasswordChange.bind(this)}
                               handleRepeatChange={this.handlePasswordRepeatChange.bind(this)}
          />
          <button className="sign-up-button"
                  onClick={this.goSignUp.bind(this)}
          >
            sign up
          </button>
          <div className="go-sign-in">
            <a href="/signin">sign in</a>
          </div>
        </div>
      </>
    );
  }
}

class SignUpPasswordInput extends Component{
  constructor(props){
    super(props);
  }

  handleChange(event){
    this.props.handleChange(event.target.value);
  }
  
  handleChangeRepeat(event){
    this.props.handleRepeatChange(event.target.value);
  }
  
  render(){
    return (
      <>
        <label for="password" className="sign-up-label">Password</label>
        <input type="password" name="password"
               value={this.props.password} className="sign-up-input"
               onChange={this.handleChange.bind(this)}
        />
        <label for="password-repeat" className="sign-up-label">Repeat your password</label>
        <input type="password" name="password-repeat"
               vale={this.props.passwordRepeat} className="sign-up-input"
               onChange={this.handleChangeRepeat.bind(this)}
        />
      </>
    );
  }
}

class SignUpUsernameInput extends Component{
  constructor(props){
    super(props);
  }
  
  handleChange(event){
    console.log(event.target.value);
    this.props.handleChange(event.target.value);
  }
  
  render(){
    return (
      <>
        <label for="username" className="sign-up-label">Username</label>
        <input type="text" name="username" placeholder="your username"
               value={this.props.name} className="sign-up-input"
               onChange={this.handleChange.bind(this)}
        />
      </>
    );
  }
}

export default SignUp;
export { SignUpPasswordInput, SignUpUsernameInput };

