import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { actionUserName } from '../../../config/redux/action';
import Button from '../../../components/atoms/Button';
import { loginUserAPI } from '../../../config/redux/action';

class Login extends Component {
  // changeUser = () => {
  //   this.props.changeUserName()
  // }

  state = {
    email: '',
    password: ''
  }

  handleChangeText = (e) => {
      this.setState({
          [e.target.id]: e.target.value
      })
  }

  handleLoginSubmit = async () => {
      const {email, password} = this.state
      const {history} = this.props;
      
      const res = await this.props.loginAPI({email, password}).catch(err => err);

      if(res){
        // console.log('login sukses', res);

        localStorage.setItem('userData', JSON.stringify(res))

        this.setState ({
          email: '',
          password: ''
        })
        history.push('/');


      }else {
        // console.log('login failed');
      }
  }



  render() {
    return (
      // <div>
      //   <p>Login Page {this.props.userName}</p>
      //   <button onClick={this.changeUser}>Change User Name</button>
      //   <button>Go to Dashboard</button>
      // </div>

      <div className="auth-container">
            <div className="auth-card">

              <p className="auth-title">Login Page</p>
              <input className="input" id="email" placeholder="Email" value={this.state.email} type="text" onChange={this.handleChangeText}/>
              <input className="input" id="password" placeholder="Password" value={this.state.password} type="password" onChange={this.handleChangeText}/>

              <Button onClick={this.handleLoginSubmit} title="Login" loading={this.props.isLoading} />

            </div>
        </div>
    );
  }
}

// const reduxState = (state) => ({
//   popupProps: state.popup,
//   userName: state.user
// })

// const reduxDispatch = (dispatch) => ({
//   changeUserName: () => dispatch(actionUserName())

// })

// export default connect(reduxState, reduxDispatch)(Login);

const reduxState = (state) => ({
  isLoading: state.isLoading
})

const reduxDispatch = (dispatch) => ({
  loginAPI: (data) => dispatch(loginUserAPI(data))
})

export default connect(reduxState, reduxDispatch)(Login);
