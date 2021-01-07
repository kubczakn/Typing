import React, {Component, useEffect} from 'react'
import './type.css'

const movieQuotes = require('movie-quotes');


class TypeText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            words_arr: movieQuotes.random().replace(/["]+/g, '').split(''),
            col_arr: [],
            value: "",
            correct: false,
            numSeconds: 0,
            interval: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.incrementSeconds = this.incrementSeconds.bind(this);
    }

    incrementSeconds() {
        this.setState({numSeconds: this.state.numSeconds + 1});
    }

    componentDidMount() {
        this.interval = setInterval(this.incrementSeconds, 1000);
    }

    showBox() {
        if (!this.state.correct) {
            return (
                <textarea type='text' id='type' value={this.state.value}
                onChange={this.handleChange} autoFocus></textarea>
            )
        }
    }

    createText() {
        var text = [];
       
        if (this.state.correct) {
            var keys = this.state.words_arr.length;
            var seconds = this.state.numSeconds;
            var kpm = Math.round(keys / (seconds / 60));
            clearInterval(this.interval);
            text.push( <p>Keys per minute: {kpm}</p>)
        }

        else {
            if (this.state.col_arr.length < 1) {
                for (var i = 0; i < this.state.words_arr.length; ++i) {
                    text.push( <p>{this.state.words_arr[i]}</p>)
                }
            }
    
            else {
                for (var i = 0; i < this.state.col_arr.length; ++i) {
                    text.push( <p style={{color: this.state.col_arr[i]}}>{this.state.words_arr[i]}</p>)
                }
            }
        } 
        

        return text;
    }

    handleChange(event) {

        this.setState({value: event.target.value});
        var arr = event.target.value.split('');
        var col = Array(this.state.words_arr.length).fill('black');
        var correct = true;
        for (var i = 0; i < arr.length; ++i) {
            if (this.state.words_arr[i] !== arr[i]) {
                correct = false;
                col[i] = 'red';
            }
        }
        if (correct && this.state.words_arr.length === arr.length) {
            this.setState({correct: true});
        }
        this.setState({col_arr: col})
    }
    
    render() {
        return (
            <div>
                <div className='box'>
                   {this.createText()}
                  
                </div>
                <div className='textBox'>
                    {this.showBox()}
                </div>
                <br></br>
                <button onClick={() => window.location.reload(true)}>Reset</button>
            </div>
        )
    };
}

class Game extends Component {
    render() {
        return (
            <div>
                <h1>Typing Turtle</h1>
                <TypeText />
            </div>
        )       
    };
}

export default Game