import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addWorkout,getCurrentProfile } from '../../../actions/profile';


const AddWorkout = ({profile:{profile,loading },  addWorkout, history,getCurrentProfile }) => {
    const [formData, setFormData] = useState({
        date: '',
        title: '',
        description: ''
     });
     const { date, title, description } = formData;

      const onChange = e =>
          setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {       
        e.preventDefault();       
          addWorkout(formData, history);
     };

    useEffect(() => {
		getCurrentProfile();
		
	}, [getCurrentProfile]);
     
    return loading && profile===null ? (
        <h1>Need to Create a Profile first</h1>
    ): (
        
        <div className="row" style={{marginTop:"40px"}}>
           
            <div className="col-md-12 text-center">
                  <div className="card" >
                      
                    <div className="card-body">
                        <form  onSubmit={e => onSubmit(e)}>
                            <div className="form-group text-center">
                                <label>Date</label>
                                <input type="date" className="form-control text-center " 
                                    placeholder="Enter Date"
                                    name='date'
                                    value={date}                                    
                                    onChange={e => onChange(e)} required/>
                            </div>
                             <div className="form-group text-center">
                                 <label>Title</label>
                                <input type="text" className="form-control text-center"
                                    placeholder="Enter Title" 
                                    name='title'
                                    value={title}
                                    onChange={e => onChange(e)} required/>
                             </div>
                             <div className="form-group text-center">
                                  <label>Enter Workout</label>
                                 <textarea type="text" className="form-control text-center" 
                                    name='description'
                                    value={description}
                                    onChange={e => onChange(e)} required/>
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

  AddWorkout.propTypes = {
     addWorkout: PropTypes.func.isRequired,
     getCurrentProfile: PropTypes.func.isRequired
  };
  const mapStateToProps = state => ({
     profile: state.profile
  });
 
  
  export default connect(
    mapStateToProps,
    { addWorkout, getCurrentProfile}
  )(AddWorkout); 
