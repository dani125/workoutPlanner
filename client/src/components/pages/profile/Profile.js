import React from 'react';
import PropTypes from 'prop-types';
import {Link } from "react-router-dom";
import {deleteAccount} from '../../../actions/profile';
import { connect } from 'react-redux';
const Profile = ({
    profile:{
            goals, 
            motivation,  
            user: {name, avatar}},
            deleteAccount
    }) => {
    return (
        <div>
            <div className ="row " style={{paddingTop:"40px"}}>
                <div className="col-md-12 ">
                    <div className="card ">
                        <h1 className="card-title text-center">Welcome {name}</h1>
                        <div className="card-body text-center">
                            <img className="card-img-top" style={{width:"18rem", height:"18rem"}} src={avatar}/>
                        </div>
                    </div>
                </div>
            </div>

                <div className="row" style={{paddingTop:"10px"}}>
                    <div className="col-md-6">
                        <div className="card " >
                            <div className="card-body text-center">
                                <h5 className="card-title">Motivation</h5>
                                <p className="card-text">
                                 {motivation !==null ? motivation : <p>Please add your motivation</p>}  
                                 <Link to="/edit-profile"><ion-icon name="pencil-outline"/></Link>
                                 </p>
                    
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card" >
                            <div className="card-body text-center">
                                <h5 className="card-title">Goal</h5>
                                <p className="card-text">
                                    {goals !==null ? goals : <p>Please add your goal</p>}
                                    <Link to="/edit-profile"><ion-icon name="pencil-outline"/></Link>
                                 </p>                    
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12 text-center">
                        <button className="btn btn-danger" onClick={()=>deleteAccount()} >Delete</button>
                    </div>
                </div> 
         </div>
    );   
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};
export default connect(
    null,
    { deleteAccount }
  )(Profile);


