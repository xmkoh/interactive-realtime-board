import React from 'react';
import niceware from 'niceware';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import Container from './components/container/Container';
import io from 'socket.io-client';


class Lobby extends React.Component {

    socket = io.connect("https://quiet-ridge-74497.herokuapp.com/", {secure: true});
    // socket = io.connect("http://localhost:5000/", { secure: true });

    constructor(props) {
        super(props);

        this.state = { displayname: '', room: '' , showNew: true};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.socket.on('connect', () => {
        });
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
        if (!this.state.room) {
            var roomID = niceware.generatePassphrase(4).join('-');
            this.setState({ room: roomID })
        }
        if (!this.state.displayname) {
            var name =  niceware.generatePassphrase(2).join('-');
            this.setState({ displayname: name })
        }
        // alert('A name was submitted: ' + this.state.displayname);
        this.socket.emit("join-room", { username: this.state.displayname, roomName: this.state.room })
        this.setState({ showNew: false })
    }

    render() {
        return (
            <div className="parent">
                <div id="map">
                    <Container ref={(ref) => this.container = ref} socket={this.socket} />
                    {this.state.showNew ? (
                        <div id="controls" className="card card-body d-flew flex-col align-items-center">
                            <h4>Create / Join a Room</h4>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Display Name</span>
                                </div>
                                <input name="displayname" type="text" className="form-control" value={this.state.displayname} onChange={this.handleChange}
                                    placeholder="your display name - shown to all users in the room" />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Room ID</span>
                                </div>
                                <input name="room" type="text" className="form-control" value={this.state.room} onChange={this.handleChange}
                                    placeholder="leave this empty if creating a room" />
                            </div>
                            <div className="d-flex flex-row">
                                <button onClick={this.handleSubmit} type="button" className="btn btn-primary btn-lg mx-2">
                                    Create/Join Room</button>
                            </div>
                        </div>)
                        : (<div id="roomInfo"><span className="input-group-text">Room ID: {this.state.room}</span></div>) }
                </div>

                <div className="modal fade" id="modal" tabIndex="-1" role="dialog" data-backdrop="static">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body">

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal">Okay</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Lobby