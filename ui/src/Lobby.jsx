import React from 'react';

import './style.css';

class Lobby extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {

        return (
            <div className="parent">
    <div className="tab-header">
        <label for="create-lobby-tab-button">
            <input id="create-lobby-tab-button" className="custom-check-or-radio tab-button"
                type="radio" onclick="openTab('create-lobby')" name="tab" checked/>
            <div className="tab-label">Create Lobby</div>
        </label>
        <label for="join-lobby-tab-button">
            <input id="join-lobby-tab-button" className="custom-check-or-radio tab-button"
                type="radio" onclick="openTab('join-lobby')" name="tab"/>
            <div className="tab-label">Join Lobby</div>
        </label>
    </div>

    <div id="create-lobby" className="tab-content">
        <div className="center-container">
            <div className="content-container">
                {/* {{if .Errors}}
                    <div className="error-list">
                        Your input contains invalid data:
                        <ul>
                            {{range .Errors}}
                                <li>{{.}}</li>
                            {{end}}
                        </ul>
                        <br/>
                        Fix the input and try again.
                    </div>

                {{end}} */}
                <form id="lobby-create" className="input-container" action="/ssrCreateLobby" method="POST">
                    <b>Lobby-Language</b>
                    {/* <button type="submit" form="lobby-create" style="grid-column-start: 1; grid-column-end: 3;"> */}
                    <button type="submit" form="lobby-create">
                            Create Lobby
                    </button>
                </form>
            </div>
        </div>
    </div>

    <div id="join-lobby" className="tab-content">
        <div className="join-lobby-data">
            <div className="table-wrapper-wrapper">
                <button id="refresh-button" onclick="loadLobbyTable()">Refresh</button>
                <div className="table-wrapper">
                    <table id="lobby-table">
                        <thead>
                            <tr>
                                <th>Language</th>
                                <th>Rounds</th>
                                <th>Players</th>
                                <th>Drawing Time</th>
                                <th>Custom Words</th>
                            </tr>
                        </thead>
                        <tbody id="lobby-table-body">
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="lobby-details">
                <span className="lobby-detail">Language:</span>
                <span id="wordpack-detail"></span>
                <span className="lobby-detail">Rounds:</span>
                <span id="rounds-detail"></span>
                <span className="lobby-detail">Players:</span>
                <span id="players-detail"></span>
                <span className="lobby-detail">Drawing Time:</span>
                <span id="drawing-time-detail"></span>
                <span className="lobby-detail">Custom Words:</span>
                <span id="custom-words-detail"></span>
                <span className="lobby-detail">Allow Votekicking:</span>
                <span id="votekicking-detail"></span>
                <span className="lobby-detail">Maximum Players per IP:</span>
                <span id="max-clients-ip-detail"></span>
                <button id="join-button" onclick="onJoin()" disabled>Join</button>
            </div>
        </div>
    </div>

    <span className="open-lobby-info">Currently active lobbies: 1 </span>
    </div>
        )
    }
}

export default Lobby