import React from 'react';
import Board from '../board/Board';
import './style.css';
import Chatbox from '../chat/Chatbox';

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.socket = this.props.socket
        
        this.state = {
            color: "#000000",
            size: "8"
        }
    }

    changeColor(params) {
        this.setState({
            color: params.target.value
        })
    }

    setColor(color) {
        this.setState({
            color: color
        })
    }

    changeSize(pixel) {
        this.setState({
            size: pixel
        })
    }

    clearCanvasAndSendEvent(e) {
        //Avoid unnecessary traffic back to us.
        this.board.clearCanvas();

    }

    render() {

        return (
            <div className="container">
                <div className="board-container">
                    <Board ref={(ref) => this.board = ref} color={this.state.color} size={this.state.size} socket={this.socket} />
                </div>
                <div className="tools-section">
                    <input className="toolbox-group" type="color" id="color-picker" value={this.state.color} onChange={this.changeColor.bind(this)} />
                    <div className="color-picker-container toolbox-group">
                        <div className="color-button-row">
                            <button className="color-button" style={{ backgroundColor: '#ffffff' }}
                                onClick={() => this.setColor('#ffffff')}></button>
                            <button className="color-button" style={{ backgroundColor: '#c1c1c1' }}
                                onClick={() => this.setColor('#c1c1c1')}></button>
                            <button className="color-button" style={{ backgroundColor: '#ef130b' }}
                                onClick={() => this.setColor('#ef130b')}></button>
                            <button className="color-button" style={{ backgroundColor: '#ff7100' }}
                                onClick={() => this.setColor('#ff7100')}></button>
                            <button className="color-button" style={{ backgroundColor: '#ffe400' }}
                                onClick={() => this.setColor('#ffe400')}></button>
                            <button className="color-button" style={{ backgroundColor: '#00cc00' }}
                                onClick={() => this.setColor('#00cc00')}></button>
                            <button className="color-button" style={{ backgroundColor: '#00b2ff' }}
                                onClick={() => this.setColor('#00b2ff')}></button>
                            <button className="color-button" style={{ backgroundColor: '#231fd3' }}
                                onClick={() => this.setColor('#231fd3')}></button>
                            <button className="color-button" style={{ backgroundColor: '#a300ba' }}
                                onClick={() => this.setColor('#a300ba')}></button>
                            <button className="color-button" style={{ backgroundColor: '#d37caa' }}
                                onClick={() => this.setColor('#d37caa')}></button>
                            <button className="color-button" style={{ backgroundColor: '#a0522d' }}
                                onClick={() => this.setColor('#a0522d')}></button>
                        </div>
                        <div className="color-button-row">
                            <button className="color-button" style={{ backgroundColor: '#000000' }}
                                onClick={() => this.setColor('#000000')}></button>
                            <button className="color-button" style={{ backgroundColor: '#4c4c4c' }}
                                onClick={() => this.setColor('#4c4c4c')}></button>
                            <button className="color-button" style={{ backgroundColor: '#740b07' }}
                                onClick={() => this.setColor('#740b07')}></button>
                            <button className="color-button" style={{ backgroundColor: '#c23800' }}
                                onClick={() => this.setColor('#c23800')}></button>
                            <button className="color-button" style={{ backgroundColor: '#e8a200' }}
                                onClick={() => this.setColor('#e8a200')}></button>
                            <button className="color-button" style={{ backgroundColor: '#005510' }}
                                onClick={() => this.setColor('#005510')}></button>
                            <button className="color-button" style={{ backgroundColor: '#00569e' }}
                                onClick={() => this.setColor('#00569e')}></button>
                            <button className="color-button" style={{ backgroundColor: '#0e0865' }}
                                onClick={() => this.setColor('#0e0865')}></button>
                            <button className="color-button" style={{ backgroundColor: '#550069' }}
                                onClick={() => this.setColor('#550069')}></button>
                            <button className="color-button" style={{ backgroundColor: '#a75574' }}
                                onClick={() => this.setColor('#a75574')}></button>
                            <button className="color-button" style={{ backgroundColor: '#63300d' }}
                                onClick={() => this.setColor('#63300d')}></button>
                        </div>
                    </div>
                </div>

                <div className="pencil-sizes-container toolbox-group">
                    <label>
                        <input id="size8" className="custom-check-or-radio line-width-button" onChange={() => this.changeSize(8)} type="radio" name="line-width" />
                        <div className="line-width-button-content">
                            <div style={{ height: '8px', width: '8px' }} className="dot"></div>
                        </div>
                    </label>
                    <label>
                        <input id="size16" className="custom-check-or-radio line-width-button" onChange={() => this.changeSize(16)} type="radio" name="line-width" />
                        <div
                            className="line-width-button-content">
                            <div style={{ height: '16px', width: '16px' }} className="dot"></div>
                        </div>
                    </label>
                    <label>
                        <input id="size24" className="custom-check-or-radio line-width-button" onChange={() => this.changeSize(24)} type="radio" name="line-width" />
                        <div

                            className="line-width-button-content">
                            <div style={{ height: '24px', width: '24px' }} className="dot"></div>
                        </div>
                    </label>
                    <label>
                        <input id="size32" className="custom-check-or-radio line-width-button" onChange={() => this.changeSize(32)} type="radio" name="line-width" />
                        <div

                            className="line-width-button-content">
                            <div style={{ height: '32px', width: '32px' }} className="dot"></div>
                        </div>
                    </label>
                    <button className="canvas-button" style={{ fontSize: '2rem' }}
                        onClick={(e) => this.clearCanvasAndSendEvent(e)}
                        alt="Clear the canvas" title="Clear the canvas">🗑
                    </button>
                </div>
                <Chatbox socket={this.socket}/>
            </div>
        )
    }
}

export default Container