import React from 'react';
import niceware from 'niceware';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import Container from './components/container/Container';
import io from 'socket.io-client';


class Lobby extends React.Component {

    socket = io.connect("https://realtime-interactive-board.herokuapp.com/", {secure: true});
    // socket = io.connect("http://localhost:5000/", { secure: true });

    constructor(props) {
        super(props);

        this.state = { displayname: '', room: '' , showNew: true};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.socket.on('connect', () => {
        });
    }
    
    static getSocket(){
        return this.socket;
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const key = target.name;
        this.setState({
            [key]: value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let roomID = this.state.room ;
        let name = this.state.displayname;
        if (!roomID) {
            roomID = niceware.generatePassphrase(4).join('-');
        }
        if (!name) {
            name =  niceware.generatePassphrase(2).join('-');
        }

        this.setState({room: roomID,  displayname: name, showNew: false }, ()=>this.socket.emit("join-room", { username: this.state.displayname, roomName: this.state.room }))
    }

    render() {
        return (
            <div className="parent">
                <div id="map">
                    {this.state.showNew ? (
                        <div id="controls" className="card card-body d-flew flex-col align-items-center">
                            <h4>Create / Join a Room</h4>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Display Name</span>
                                </div>
                                <input name="displayname" type="text" className="form-control" value={this.state.displayname} onChange={this.handleChange}
                                     />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Room ID</span>
                                </div>
                                <input name="room" type="text" className="form-control" value={this.state.room} onChange={this.handleChange}
                                    placeholder="Leave empty to create room" />
                            </div>
                            <div className="d-flex flex-row">
                                <button onClick={this.handleSubmit} type="button" className="btn btn-primary btn-lg mx-2">
                                    Create / Join Room</button>
                            </div>
                        </div>)
                        : (<div id="roomInfo"><span className="input-group-text">Room ID: {this.state.room}</span></div>) }
                        <Container ref={(ref) => this.container = ref} socket={this.socket} />
                </div>
            </div>
        )
    }
}

export default Lobby
