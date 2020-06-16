import React from 'react'
import { Link } from 'react-router-dom'
import { signin, signInWithGoogle} from "../helpers/auth";
import Header from '../components/Header'

class Login extends React.Component{
    state= {
        email: '',
        password: '',
        error: null
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
            signin(this.state.email, this.state.password)
        } catch (error) {
            this.setState({error: error.message})
        }
    }
    googleSignIn = () =>{
        try{
            signInWithGoogle()
        }catch (error){
            this.setState({ 
                error: error.message
            })
        }
    }

    render(){
        return(
        <div className="container">
            <Header />
            <form
                className="mt-5 py-5 px-5 howdy-signin"
                autoComplete="off"
                onSubmit={this.handleSubmit}
            >
                <h1>
                    Login to
                    <Link className="title ml-2 hover-animation" to="/">
                    Howdy
                    </Link>
                </h1>
                <p className="lead">
                    Fill in the form below to login to your account.
                </p>
                <div className="form-group">
                    <input
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    type="email"
                    onChange={this.handleChange}
                    value={this.state.email}
                    />
                </div>
                <div className="form-group">
                    <input
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                    type="password"
                    />
                </div>
                <div className="form-group">
                    {this.state.error ? (
                    <p className="text-danger">{this.state.error}</p>
                    ) : null}
                    <button className="btn btn-primary px-5 hover-animation" type="submit">Login</button>
                </div>
                <p>You can also log in with </p>
                <button className="btn btn-danger mr-2 hover-animation" type="button" onClick={this.googleSignIn}>
                    Sign in with Google
                </button>
                
                <hr />
                <p>
                    Don't have an account? <Link className='hover-animation' to="/signup">Sign up</Link>
                </p>
            </form>
        </div>
        )
    }
}


export default Login