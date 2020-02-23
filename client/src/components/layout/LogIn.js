import React, { Fragment, useState } from 'react';
import {Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const LogIn=({ login, isAuthenticated })=>{

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
      e.preventDefault();
      login(email, password);
    };

    if (isAuthenticated) {return <Redirect to='/profile' />; }

    return(
          <Fragment>
              <div className="form-signin" onSubmit={e => onSubmit(e)}>
                  <form>
                        <div className="form-group">
                          <h1 className="text-center">Log In </h1>
                            <h4 htmlFor="exampleInputEmail1">Email address</h4>
                            <input type="email"
                            className="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp" 
                            placeholder="Enter email"   name='email'
                            value={email}
                            onChange={e => onChange(e)}
                            required
                            />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <h4 htmlFor="exampleInputPassword1">Password</h4>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                            name="password"
                            value={password}
                            onChange={e => onChange(e)}
                            minLength='6' />
                        </div>           
                        <button type="submit" className="btn btn-primary">Log In</button>      
                  </form>
                </div>
          </Fragment>
   );
}
LogIn.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(LogIn); 