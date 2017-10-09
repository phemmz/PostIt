import React from 'react';

const Welcome = () => {
  return (
    <div>
      <div className="container row">
        <div className="col s7 offset-s3 welc">
          <h4 className="green-text text-darken-4">Welcome,</h4>
          <p
            className="green-text text-darken-2"
          >POSTIT allows you, your friends and
          colleagues to create groups for notifications.
          </p>
        </div>
      </div>
      <footer className="black footer">
        <div className="ffooter footer-copyright">
          <div className="container">
        &copy; <script
          type="text/javascript"
        >document.write(new Date().getFullYear());</script> Adetunji Femi
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
