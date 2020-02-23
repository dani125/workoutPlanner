import React,{Fragment}  from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';

const NavBar=({ auth: { isAuthenticated, loading }, logout })=> {
   const authLinks = (
        <Fragment>
           <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
           <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav ">
                      <li >
                          <Link className="nav-link" to="/profile"  style={{fontSize: "25px", fontFamily:"Tahoma"}} >Profile  </Link>
                      </li>
                      <li >
                        <Link className="nav-link " to="/workouts"  style={{fontSize: "25px", fontFamily:"Tahoma"}}> Workouts </Link>
                      </li>
                      <li >
                        <Link className="nav-link" to="/workout"  style={{fontSize: "25px", fontFamily:"Tahoma"}} 
                        ><ion-icon name="add-outline" />Workout</Link>
                      </li>
                      <li >
                      <Link onClick={logout}  to='/' className="nav-link "  style={{fontSize: "25px", fontFamily:"Tahoma"}}>Log Out </Link>
                      </li>            
                  </ul>
             </div>
          </Fragment>   
     ); 

    return (       
        <nav className="navbar navbar-expand-lg  navbarcolor  navbar-dark ">
          <Link to="/"className=" navbar-brand " style={{fontSize: "35px",fontFamily:"Tahoma"}}>Workout Planner</Link>        
                <Fragment >
                    {!loading && (
                      <Fragment>{isAuthenticated ? authLinks : null}</Fragment>
                    )}
                </Fragment>
      </nav>
     );
}
NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(NavBar);