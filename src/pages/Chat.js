import React from 'react'
import { auth , db } from '../services/firebase'
import Header from '../components/Header'
import {Link} from 'react-router-dom'

const rooms = ['web devs', 'andriod devs', 'designers']

class Chat extends React.Component{
    state={
        user: auth().currentUser,
        chats: [],
        content: '',
        readError: null,
        writeError: null,
        dbRef: 'react',
        rooms: rooms
    }

    

     componentDidMount(){
        this.loadChat()
    }


    loadChat = () =>{
        

        const {dbRef} = this.state
        
        this.setState({ readError: null})
        try {
            db.ref(dbRef).on("value", snapshot => {
                let chats = []
                snapshot.forEach((snap) => {
                    chats.push(snap.val())
                })
                this.setState({ chats })
            })
        } catch (error) {
            this.setState({readError: error.message})
        }
    }

    handleChange = (event) =>{
        this.setState({
            content: event.target.value
        })
    }

    handleSubmit = (event) =>{
        event.preventDefault()
        console.log(this.state.user)
        this.setState({
            writeError: null
        })
        const {dbRef} = this.state
        try {
             db.ref(dbRef).push({
                content: this.state.content,
                timestamp: Date.now(),
                sender: this.state.user.displayName,
                uid: this.state.user.uid
            })
            this.setState({
                content: ''
            })
        } catch (error) {
            this.setState({ writeError: error.message})
        }
    }

    handleClick = (value) =>{
        this.setState({
            dbRef: value
        })
        setTimeout(() => {
            this.loadChat()
        }, 100)
    }

    formatTime(timestamp) {
        const d = new Date(timestamp)
        const time = `${d.getDate()}/${(d.getMonth()+1)}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`
        return time
    }

    render(){
        return(
            <div className="chat-container">
                <Header />
                    <div className="chat-box">
                        <div className="room-area" style={{position:'relative'}}>
                            <h2 style={{marginTop:'20px', borderBottom:'2px solid #575757'}}>Chat Rooms</h2>
                            {this.state.rooms.map((room, index) =>{
                                return( 
                                    <div 
                                        key= {index} 
                                        className={this.state.rooms[index] === this.state.dbRef ? "room-list-active" : "room-list"} 
                                        onClick={() => this.handleClick(this.state.rooms[index])}
                                    >       
                                            <h3 >{this.state.rooms[index]}</h3>
                                        </div>
                                )
                            })}
                            <h3 className="signed-in">Signed in as <Link to="/profile" style={{color:'#fff'}}>{this.state.user.displayName}</Link></h3>
                        </div>
                        <div>
                            <div className="chat-area">
                                {this.state.chats.map(chat => {
                                    return (
                                        <div>
                                            
                                            <p key={chat.timestamp} className={"chat-bubble " + (this.state.user.uid === chat.uid ? "current-user" : "")}>
                                            <span className="chat-time float-left" style={{color:'#fff', fontSize:'14px'}}>{chat.sender}</span>
                                            <br />

                                            {chat.content}
                                            <br />
                                            <span className="chat-time float-right">{this.formatTime(chat.timestamp)}</span>
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>
                            {this.state.user.displayName === null ? 
                                <p className="text-danger">Update your profile userName to chat</p> :
                                <form onSubmit={this.handleSubmit} className="type-area">
                                    <input 
                                        className="form-control" 
                                        name="content"
                                        placeholder='Type a message' 
                                        onChange={this.handleChange} 
                                        value={this.state.content}
                                    />
                                    {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
                                    {this.state.content === '' ? 
                                        null 
                                        :
                                        <button 
                                            type="submit" 
                                            className="send-button" 
                                        ></button>
                                    }
                                    
                                </form>
                            }
                            
                        </div>
                    </div>
                            
            </div>
        
        )
    }
}
export default Chat