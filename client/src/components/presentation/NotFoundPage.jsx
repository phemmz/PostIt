import React from 'react';

/**
 * Home
 * @return {*} div
 */
const PreLoader = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m6 offset-m3 card red-text custom center not-found">
          <h4><i className="fa fa-exclamation-triangle" aria-hidden="true" /> 404</h4>
          <h4>Oops!! Page Not Found</h4>
        </div>
      </div>
    </div>
  );
};

export default PreLoader;
