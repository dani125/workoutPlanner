import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile,createProfile } from '../../../actions/profile';

const EditProfile = ({
   createProfile,
   profile: {profile},
   history,
   getCurrentProfile
})=>{

    const [formData, setFormData] = useState({
          goals:'',
          motivation:'',        
    });

    const{goals, motivation}=formData; 
   
    useEffect(() => {      
      getCurrentProfile();       
      setFormData({
        goals: profile.goals, 
        motivation: profile.motivation
      });
   },[getCurrentProfile,profile ]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit =  e => {      
        e.preventDefault();       
        createProfile( formData, history, true);     
    };
  
        return (
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
                                   value={goals}
                                   onChange={onChange} required/>
                           </div>
                             <div className="form-group text-center">
                                 <label>Motivation</label>
                               <input type="text" className="form-control"
                                   placeholder="Enter Motivation" 
                                   name='motivation'
                                   value={motivation}
                                   onChange={onChange} required/>
                             </div>
                             
                             <button type="submit" className="btn btn-success" style={{margin: "5px"}}>Submit</button> 
                               
                         </form>
                     </div>
               </div>
           </div>
       </div>
    );
};
 
EditProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
   profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
      profile: state.profile
});

export default connect(
    mapStateToProps,
 {getCurrentProfile, createProfile}
)(EditProfile); 