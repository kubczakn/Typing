import React, {Component} from 'react'
import './type.css'

const movieQuotes = require('movie-quotes');

class TypeText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            words_arr: movieQuotes.random().replace(/["]+/g, '').split(''),
            col_arr: [],
            value: "",
            correct: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    createText() {
        var text = [];
        if (this.state.correct) {
            text.push( <p>Words per minute:</p>)
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

    handleSubmit(event) {
        if (this.state.value === this.state.words) {
            this.setState({words: 'correct'})
        }
        else {
            this.setState({words: 'incorrect'})
        }
        this.setState({value: ""});
        event.preventDefault();
    }
    
    render() {
        return (
            <div>
                <div className='box'>
                   {this.createText()}
                </div>
            <form onSubmit={this.handleSubmit}>
                <input type='text' id='type' value={this.state.value}
                onChange={this.handleChange}></input>
                <br></br>
                <input type='submit' value="Submit" ></input>
            </form>
            </div>
        )
    };
}

class Game extends Component {
    render() {
        return (
            <div>
                <h1>Type Battle</h1>
                <TypeText />
            </div>
        )       
    };
}

export default Game