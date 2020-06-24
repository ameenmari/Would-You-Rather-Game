import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { handleAddQuestion } from '../actions/questions';

class NewQuestion extends Component {
    state = {
        optionOne: '', 
        optionTwo: '', 
        toHome: false  
    }

    handleChange = (option,e) => { 
        const input = e.target.value;

        this.setState(() => ({ 
            [option]: input
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { optionOne, optionTwo } = this.state;
        const { dispatch } = this.props;

        dispatch(handleAddQuestion(optionOne, optionTwo));

        this.setState(() => ({
            toHome: true 
        }))
        
    }

    render() {
        const { optionOne, optionTwo, toHome } = this.state;

        if(toHome) 
            return <Redirect to='/' />

        return (
            <div className="component-container">
                    Would you rather?
                
                <form onSubmit={this.handleSubmit} >
                    <TextField
                        type="text"
                        label="Option One"
                        defaultValue={optionOne}
                        onChange={(e) => this.handleChange('optionOne',e)}
                        
                    />
                    <TextField
                        type="text"
                        label="Option Two"
                        defaultValue={optionTwo}
                        onChange={(e) => this.handleChange('optionTwo',e)}
                        
                    />
                    <Button variant="contained" color="primary" 
                        type="submit"
                        disabled={!optionOne || !optionTwo}
                    >
                        ADD New Question
                    </Button>
                </form>
            </div>
        )
    }
}

export default connect()(NewQuestion);