import React,{Fragment} from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../layout/LogIn';
import Alert from '../layout/Alert';
import AddWorkout from '../pages/workouts/AddWorkout';
import DashBoard from '../layout/DashBoard';
import Workouts from '../pages/workouts/Workouts';
import EditWorkout from '../pages/workouts/EditWorkout';
import PrivateRoute from '../routing/PrivateRoute';
import CreateProfile from '../pages/profile/CreateProfile';
import EditProfile from '../pages/profile/EditProfile';
import Landing from '../layout/landing/Landing'
import NotFound from '../layout/NotFound';
const Routes = () => {
  return (
    <Fragment>
      <Alert />    
      <Switch>
        <Route exact path='/SignUp' component={Landing}/>
        <Route exact path='/login' component={Login}/>
       
        <PrivateRoute exact path='/profile' component={DashBoard} />
        <PrivateRoute exact path='/workouts' component={Workouts} />
        <PrivateRoute exact path='/workout' component={AddWorkout} />
        <PrivateRoute exact path='/workout/edit/:id' component={EditWorkout} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <Route component={NotFound} />
      </Switch>
    </Fragment>
  );
};

export default Routes;