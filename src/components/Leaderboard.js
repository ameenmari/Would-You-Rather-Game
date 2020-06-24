import React from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';

const Leaderboard = props => (
    <div className='component-container'>
            Leaderboard
        <br />
        
        <ul>
                {props.leaderboardData ? 
                   
                   props.leaderboardData.map(user => (
                      
                  <li id={user.name}>     {user.name}   <Avatar alt={user.name+' profile picture'} src={user.avatarURL} />
                          
                  answeredQuestions :{user.answeredQuestions} _ 
                  createdQuestions : {user.createdQuestions}
                 
                 </li>

                    ))
                    : <div>No data available</div>
                }
         </ul>
    </div>
)

function mapStateToProps ({ authedUser, users, questions }) {
    const leaderboardData = Object.keys(users).map(user => ({
        id: user,
        name: users[user].name,
        avatarURL: users[user].avatarURL,
        answeredQuestions: Object.keys(users[user].answers).length,
        createdQuestions: Object.keys(questions).filter(q => questions[q].author === user).length
    })).sort((a,b) => (b.answeredQuestions+b.createdQuestions)-(a.answeredQuestions+a.createdQuestions));

    return {
        authedUser,
        leaderboardData
    }
}

export default connect(mapStateToProps)(Leaderboard);