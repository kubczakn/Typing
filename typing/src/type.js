import React, {Component} from 'react'

class TypeText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            words: "Sample",
            words_color: 'black',
            value: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        var arr = event.target.value.split('');
        for (var i = 0; i < arr.length; ++i) {
            var index = this.state.words.indexOf(arr[i]);
            if (index !== i) {
                this.setState({words_color: 'red'});
            }
        }
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
                <p style={{ color: this.state.words_color}}>{this.state.words}</p>
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