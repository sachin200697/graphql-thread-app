import React from 'react';

export default function User({user}) {
  return (
    <div>
      <h3><b>{user.name}</b></h3>
      <h4>{user.age}</h4>
    </div>
  );
}
