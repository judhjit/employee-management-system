import React from 'react';
import './NewsFeed.css';

const NewsFeed = (isAdmin) => {
  return (
    <div className="newsfeed">
      <h2 style={{color:"white"}}>News Feed</h2>
      {isAdmin ? (
        <div>
          <h3 style={{ color: "white" }}>Post New News</h3>
          {/* You can add the form or button to post new news here */}
        </div>
      ) : null}
    </div>
  );
};

export default NewsFeed;