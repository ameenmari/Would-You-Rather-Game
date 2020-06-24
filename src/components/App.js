
import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';
import Signin from './Signin';
import NewQuestion from './NewQuestion';
import QuestionDetails from './QuestionDetails';
import Leaderboard from './Leaderboard';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { setAuthedUser } from '../actions/authedUser';





class App extends Component {
  componentDidMount () {
    this.props.dispatch(handleInitialData());
  }


  handleLogout = () => { 

    const { dispatch } = this.props;
    dispatch(setAuthedUser(null));

}


  render() {
    return (

<Router>
        <div>
          <LoadingBar />

          <div className="header">
                  Would You Rather 
              

            
            {this.props.signedIn && 
           

           <nav>
                <ul>
                    <li>
                        <NavLink to='/' exact activeClassName='active'>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/add' exact activeClassName='active'>
                            New Question
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/leaderboard' exact activeClassName='active'>
                            Leaderboard
                        </NavLink>
                    </li>
                </ul>
                <span className="user-details">
                    <Button onClick={this.handleLogout}>
                        Logout
                    </Button>
                </span>
                
            </nav>
            
            
            }
          </div>
          {
            !this.props.signedIn 
            ? <Signin /> 
            : <div>
                <Route path='/' exact component={Dashboard} />
                <Route path='/questions/:id' component={QuestionDetails} />
                <Route path='/add' component={NewQuestion} />
                <Route path='/leaderboard' component={Leaderboard} />
              </div>
          }
        </div>
      </Router>
    );
  }
}


function mapStateToProps ({ authedUser, users }) {

  return {
    signedIn: authedUser !== null,
    authedUserName: authedUser ? users[authedUser].name : '',
    authedUserAvatar: authedUser ? users[authedUser].avatarURL : '',
  }
}

export default connect(mapStateToProps)(App);
