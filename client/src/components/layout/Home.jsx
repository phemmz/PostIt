import React from 'react';
import Groups from '../containers/Groups.jsx';
import Messages from '../containers/Messages.jsx';

/**
 * Home
 * @return {*} div
 */
const Home = () => {
  return (
    <div className="container-fluid">
      <div className="row dashboard-layout">
        <div className="col s5 m3 group">
          <Groups />
        </div>
        <div className="col s7 m9 messages">
          <Messages />
        </div>
      </div>
    </div>
  );
};

export default Home;
