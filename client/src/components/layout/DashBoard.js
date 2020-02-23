import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Profile from '../pages/profile/Profile';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import {Link} from 'react-router-dom';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <p >Loading</p>
  ) : (
    <Fragment>
     
      {profile !== null ? (
          <Profile profile={profile}/>
     
          ) : (
        <div className="row">
            <div className="col-md-12 text-center">
                <h1>You have not yet setup a profile, please add some info</h1>
                <Link to='/create-profile' className='btn btn-primary'>Create Profile </Link>
            </div>
        </div>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);