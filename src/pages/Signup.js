import React from 'react'
import { Link } from 'react-router-dom'
import { signup, signInWithGoogle } from '../helpers/auth'
import Header from '../components/Header'

class SignUp extends React.Component{
    state= {
        email: '',
        password: '',
        error: null,
        username: ''
    }

    handleChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) =>{
        event.preventDefault()
        this.setState({ error: '' })
        try {
            signup(this.state.email, this.state.password)
        } catch (error) {
            this.setState({error: error.message})
        }
    }
    googleSignIn = () =>{
        try {
            signInWithGoogle()
        } catch (error) {
            this.setState({ error: error.message})
        }
    }

    render(){
        return(
            <div className="container">
                <Header />
                <form className="mt-5 py-5 px-5 howdy-signin" onSubmit={this.handleSubmit}>
                    <h1>
                        Sign Up to
                    <Link className="title ml-2 hover-animation" to="/">Howdy</Link>
                    </h1>
                    <p className="lead">Fill in the form below to create an account.</p>
                    <div className="form-group">
                        <input className="form-control" placeholder="Username" name="username" type="text" onChange={this.handleChange} value={this.state.username}></input>
                    </div>
                    <div className="form-group">
                        <input className="form-control" placeholder="Email" name="email" type="email" onChange={this.handleChange} value={this.state.email}></input>
                    </div>
                    
                    <div className="form-group">
                        <input className="form-control" placeholder="Password" name="password" onChange={this.handleChange} value={this.state.password} type="password"></input>
                    </div>
                    <div className="form-group">
                        {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
                        <button className="btn btn-primary px-5" type="submit">Sign up</button>
                    </div>
                    <p>You can also sign up with </p>
                    <button className="btn btn-danger mr-2" type="button" onClick={this.googleSignIn}>
                        Sign up with Google
                    </button>
                    <hr></hr>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </form>
            </div>
        )
    }
}


export default SignUp