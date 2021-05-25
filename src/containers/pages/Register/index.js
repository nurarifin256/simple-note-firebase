import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/atoms/Button';
import { registerUserAPI } from '../../../config/redux/action';
// import firebase from '../../../config/firebase';

import './Register.scss';

class Register extends Component {

    state = {
        email: '',
        password: ''
    }

    handleChangeText = (e) => {
        // console.log(e.target.id);
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleRegisterSubmit = async () => {
        // console.log('email', this.state.email);
        // console.log('password', this.state.password);

        const {email, password} = this.state
        
        const res = await this.props.registerAPI({email, password}).catch(err => err)

        if(res){
            this.setState ({
                email: '',
                password: ''
            })
        } else {
            // alert('gagal');
        }

        // cara 1 sudah dipindah ke folder action
        // firebase.auth().createUserWithEmailAndPassword(email, password).then(res => {
        //     console.log('sukses', res);
        // }).catch(function(error){
        //     var errorCode = error.code;
        //     var errorMessage = error.message;

        //     console.log('gagal', errorCode);
        //     console.log('gagal', errorMessage);
        // })

        // cara 2
        // firebase.auth().createUserWithEmailAndPassword(email, password)
        // .then((userCredential) => {
        //     // Signed in 
        //     var user = userCredential.user;
        //     // ...
        // })
        // .catch((error) => {
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     // ..
        // });
    }
    
    render() {
        return (
        <div className="auth-container">
            <div className="auth-card">
            <p className="auth-title">Register Page</p>
            <input className="input" id="email" placeholder="Email" value={this.state.email} type="text" onChange={this.handleChangeText}/>
            <input className="input" id="password" placeholder="Password" value={this.state.password} type="password" onChange={this.handleChangeText}/>

            {/* sudah di pindah ke component/atoms/button */}
            {/* <button className="btn" onClick={this.handleRegisterSubmit}>Register</button> */}

            <Button onClick={this.handleRegisterSubmit} title="Register" loading={this.props.isLoading} />

            </div>
            {/* <button>Go to Dashboard</button> */}
        </div>
        );
    }
}

const reduxState = (state) => ({
    isLoading: state.isLoading
})

const reduxDispatch = (dispatch) => ({
    registerAPI: (data) => dispatch(registerUserAPI(data))
})

export default connect(reduxState, reduxDispatch)(Register);
