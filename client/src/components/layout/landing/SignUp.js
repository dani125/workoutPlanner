import React,{useState} from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../../actions/alert';
import { register } from '../../../actions/auth';
import PropTypes from 'prop-types';

const SignUp=({ setAlert, register, isAuthenticated })=> {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      
    });
    const { name, email, password } = formData;
    const onChange = e =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

      const onSubmit = async e => {
        e.preventDefault();
      
          register({ name, email, password });
        
      };

      if (isAuthenticated) {
        return <Redirect to='/profile' />;
      }

  return (
              
              <div className="form-signin" onSubmit={e => onSubmit(e)}>
                   <form>
                        <h1 className="text-center">Create an Account </h1>
                        <div className="form-group" >
                            <h4 >Name</h4>
                            <input type="text" className="form-control"  placeholder="Enter First Name"   name='name'
                            value={name}
                            onChange={e => onChange(e) } required/>
                        </div>
                          <div className="form-group" >
                            <h4 htmlFor="InputEmail">Email address</h4>
                            <input type="email"   className="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Enter email"  name='email'
                                value={email}
                                onChange={e => onChange(e) } required/>
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                          </div>
                          <div className="form-group">
                            <h4 htmlFor="Password">Password</h4>
                            <input type="password"  name='password'
                                value={password}
                                className="form-control" id="Password" placeholder="Password"
                                onChange={e => onChange(e) } required/>
                          </div>
                          <button type="submit" className="btn btn-success">Sign Up</button>
                  </form>
                  <br/>
                  <h5>Have an Account?</h5> <Link to="/login" >Log In</Link>
              <div>
      
          </div>          
     </div>
  );
}
SignUp.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  { setAlert, register }
) (SignUp);