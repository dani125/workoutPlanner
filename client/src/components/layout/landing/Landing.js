import React from 'react';

import SignUp from './SignUp';

const Landing=()=> {
  return (
   <div className='row'>
     <div className='col-md-6 text-center ' >
       <div className="landingpage">
       <h5><ion-icon name="bicycle-outline"/> Create Workouts</h5>
       <h5><ion-icon name="thumbs-up-outline" /> Stay Motivated</h5>
       <h5><ion-icon name="medal-outline"/> Accomplish your goals</h5>
       </div>
     </div>

     <div className='col-md-6'>      
       <SignUp/>
     </div>    
   </div>
  );
}

export default Landing;