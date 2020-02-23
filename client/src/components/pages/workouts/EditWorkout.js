import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile,updateWorkout } from '../../../actions/profile';

const EditWorkout = ({
  updateWorkout,
  getCurrentProfile,
  profile:{profile},
  match,  
  history
})=>{
    const [formData, setFormData] = useState({
              date:'',
             title:'',
             description:''
    });

    const { date, title, description }=formData; 

    useEffect(() => {
          getCurrentProfile(); 
         profile.workouts.map(
           workout => workout._id.toString() === match.params.id? 
           setFormData({
                 date:  " ",
                 title: workout.title, 
                 description: workout.description }): workout);
    },[getCurrentProfile, match.params.id, profile.workouts.length]);
 
    const onChange = e =>
          setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit =  e => {       
        e.preventDefault();       
        updateWorkout(match.params.id, formData, history);
      };
  
        return (
          <div className="row" style={{marginTop:"40px"}}>
               
                <div className="col-md-12 text-center">
                      <div className="card" >
                          
                        <div className="card-body">
                            <form  onSubmit={onSubmit}>
                                <div className="form-group text-center">
                                    <label>Date</label>
                                    <input type="date" className="form-control text-center " 
                                        placeholder="Enter Date"
                                        name='date'
                                        value={date}
                                        onChange={onChange} required/>
                                </div>
                                 <div className="form-group text-center">
                                     <label>Title</label>
                                    <input type="text" className="form-control text-center"
                                        placeholder="Enter Title" 
                                        name='title'
                                        value={title}
                                        onChange={onChange} />
                                 </div>
                                 <div className="form-group text-center">
                                      <label>Enter Workout</label>
                                     <textarea type="text" className="form-control text-center" 
                                        name='description'
                                        value={description}
                                        onChange={onChange} />
                                </div>
                                  <button type="submit" className="btn btn-success" style={{margin: "5px"}}>Submit</button> 
                                  <button type="reset" className="btn btn-danger" style={{margin: "5px"}}>Clear</button>      
                             </form>
                         </div>
                    </div>
                </div>
            </div>
    );
};
 
EditWorkout.propTypes = {
   getCurrentProfile: PropTypes.func.isRequired,
   updateWorkout: PropTypes.func.isRequired,
   profile: PropTypes.object.isRequired 

};

const mapStateToProps = state => ({
     profile: state.profile    
  });

export default connect(
    mapStateToProps,
 {getCurrentProfile, updateWorkout}
)(EditWorkout); 