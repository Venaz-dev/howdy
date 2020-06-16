import React from 'react'
import { auth } from '../services/firebase'
import Header from '../components/Header'
import {Link} from 'react-router-dom'

class Profile extends React.Component{
    state ={
        user: auth().currentUser,
        username: 'null',
        profileUpdate: false,
    }

    componentDidMount(){

        this.setState({
            username: this.state.user.displayName
        })
    }
    update = () =>{
        this.setState({
            profileUpdate: true
        })
    }

    displayProfile =() =>{
        const {user} = this.state
        return (
            <div className="mt-5 py-5 px-5 howdy-signin user-profile">
                <Link className="back-button" to="/chat">chat</Link>
                <h1>User Profile</h1>
                <p className="lead">Username: {user.displayName === null ? "No username has been set" : user.displayName}</p>
                <p className="lead">Email: {user.email}</p>
                <button 
                    onClick={this.update}
                    className="btn btn-primary mr-3 hover-animation"
                >Edit Profile</button>
            </div>
        )
    }
     
    updateForm = () =>{
        return(
            <form 
                className="mt-5 py-5 px-5 howdy-signin user-profile"
                autoComplete="off"
                onSubmit={this.updateUserProfile}>
                        <h1>Update Profile</h1>
                        <div className="form-group">
                        <label className="lead"> Username: <input 
                            className="form-control"
                            type='text'
                            name='username'
                            placeholder="Enter Username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                        </label>
                        </div>
                        <div className="form-group">
                        <label className="lead">
                        Email: {this.state.user.email}
                        </label>
                        </div>
                        <button 
                            className="btn btn-primary mr-3 hover-animation" 
                            type='submit'
                        >Update Profile</button>
                    </form>
        )
    }

    updateUserProfile =(event) => {
        event.preventDefault()
        const {user, username} = this.state

        user.updateProfile({
            displayName: username
        }).then(()=>{
            //update successful
        }).catch(()=>{
            //error message
        })
        this.setState({profileUpdate: false})
        
    }

    handleChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    render(){
        const {user} = this.state
        
        return(
            <div>
                <Header />
                {this.state.profileUpdate === true ?
                    this.updateForm()
                    :
                    this.displayProfile()
                    
                }   
            </div>
        )
    }
}

export default Profile