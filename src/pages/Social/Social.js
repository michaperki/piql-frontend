import React from 'react';
import FriendList from '../../components/FriendList';
import FriendRequestList from '../../components/FriendRequestList';

const Settings = () => {
  return (
    <div>
      <h1>Social</h1>
      <FriendList />
      <FriendRequestList />
    </div>
  );
};

export default Settings;
