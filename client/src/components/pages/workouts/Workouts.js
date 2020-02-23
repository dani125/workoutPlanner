import React, {Fragment,useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../../actions/profile';
import WorkoutPost from '../workouts/WorkoutPost';


const Workouts=({
    getCurrentProfile,
    profile: { profile, loading }
})=>{
    useEffect(() => {
        getCurrentProfile();      
        
      }, [getCurrentProfile]);
    
      return loading && profile===null ? (
          <h1>Need to Create a Profile first</h1>
      ):(
          <div className="row">        
            <div className="col-md-12 ">          
              {profile.workouts.length > 0 ? (             
                  <Fragment>
                      {profile.workouts.map(workouts => (
                            <WorkoutPost
                                key={workouts._id}
                                workouts={workouts}
                                workoutId={workouts._id}                            
                            />
                      ))}
                  </Fragment>):( <h2>No Workouts</h2>)}            
              </div>
            </div>   
         );
 }

Workouts.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    profile: state.profile
  });

export default connect(
    mapStateToProps,
    { getCurrentProfile}
  )(Workouts); 