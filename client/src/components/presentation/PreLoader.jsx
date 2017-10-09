import React from 'react';

/**
 * @description PreLoader Component
 * @return {*} div
 */
const PreLoader = () => {
  return (
    <div className="container">
      <div className="col s3 offset-s4 my-preloader">
        <div className="valign-wrapper preloader-wrapper active">
          <div className="spinner-layer spinner-red-only">
            <div className="circle-clipper left">
              <div className="circle" />
            </div>
            <div className="gap-patch">
              <div className="circle" />
            </div>
            <div className="circle-clipper right">
              <div className="circle" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreLoader;
