import React from 'react';

// staticContext is the context object passed to the staticRouter on the root of the app
// the staticRouter renames it to staticContext, and it will be available to all 
// children components when the app is rendered on the server 
// !!! IT WON'T EXISTS when the app is rendered on the browser => give default value
const NotFoundPage = ({ staticContext = {} }) => {
  staticContext.notFound = true;
  return (
    <div className="center-align" style={{marginTop: '200px'}}>
      <h1>Route not found!</h1>
    </div>
  );
};

export default {
  component: NotFoundPage
};
