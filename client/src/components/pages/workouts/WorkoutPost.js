import React from 'react'; 
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import { deleteWorkout } from '../../../actions/profile';

const WorkoutPost=({
 
  deleteWorkout,
   workouts:{_id, title, description, date},

})=>(
    <div className="card text-center">
           <h5 className="card-header"></h5>
             <div className="card-body">
                    <div className="card-title text-right"> 
                      <Link to={`workout/edit/${_id}`} >  <ion-icon name="pencil-outline" /></Link>
                        <ion-icon name="trash-outline" onClick={() => deleteWorkout( _id)}/>                
                    </div>
                    <h5 className="card-subtitle"> Date {' '} <br/> 
                          <Moment format="MM/DD/YYYY">{moment.utc(date)}</Moment>
                    </h5>
                    <br/>
                    <h5 className="card-title">Title {' '} <br/> {title}</h5>
                    <div className="card-text"><h5>Workout</h5> {' '}{description} </div>                
              </div>
      </div>
);
  
WorkoutPost.propTypes = {
  workouts: PropTypes.object.isRequired
};
export default connect(
  null,
  { deleteWorkout}
)(WorkoutPost); 