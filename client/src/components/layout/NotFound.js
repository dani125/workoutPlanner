import React, { Fragment } from 'react';

const NotFound = () => {
  return (
    <Fragment>
      <div className='row text-center'>
        <h1 className='col-md-12' > Page Not Found</h1>
      </div>
      <div className='row text-center'>
          <h2 className='col-md-12'>Sorry, this page does not exist</h2>
      </div>
      
    </Fragment>
  );
};

export default NotFound;