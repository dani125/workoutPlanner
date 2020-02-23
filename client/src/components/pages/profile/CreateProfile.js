import React,{useState, useEffect, Fragment} from 'react';
import {connect} from'react-redux';
import PropTypes from 'prop-types';
import {createProfile, getCurrentProfile } from '../../../actions/profile';
import {Redirect} from 'react-router-dom';

const CreateProfile = ({
  createProfile,
	getCurrentProfile,
	profile: { profile, loading },
  history
}) => {
  const [formData, setFormData] = useState({
    goals: '',
    motivation: '',
  });
 const { goals, motivation } = formData;

  useEffect(() => {
		getCurrentProfile();
		
	}, [getCurrentProfile]);

  const onChange = e =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {   
    e.preventDefault();
      createProfile(formData, history);
  };

return loading && profile === null ? (
  <Redirect to='/dashboard' />) 
  :(
     <Fragment>
              <div className="row" style={{marginTop:"40px"}}>
                 <div className="col-md-12 text-center">
                        <div className="card" >
                            <div className="card-body">
                              <form  onSubmit={e => onSubmit(e)}  >
                                  <div className="form-group text-center">
                                      <label>Goals</label>
                                      <input type="text" className="form-control" 
                                          placeholder="Enter Goals"
                                          name='goals'
                                          vale={goals}
                                          onChange={e => onChange(e)} required/>
                                  </div>
                                    <div className="form-group text-center">
                                        <label>Motivation</label>
                                      <input type="text" className="form-control"
                                          placeholder="Enter Motivation" 
                                          name='motivation'
                                          vale={motivation}
                                          onChange={e => onChange(e)} required/>
                                    </div>
                                    
                                    <button type="submit" className="btn btn-success" style={{margin: "5px"}}>Submit</button> 
                                      
                                </form>
                            </div>
                      </div>
                  </div>
              </div>
      </Fragment>  
    );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile
});

export default connect(
  mapStateToProps,
{ createProfile, getCurrentProfile  }
)(CreateProfile); 
