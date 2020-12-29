import React, {Component} from 'react'

class TypeText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            words: "Sample",
            value: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
       
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
                <p>{this.state.words}</p>
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