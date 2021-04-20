import React from "react";

const InfoGrid = () => {
  return (
    <div className="info">
      <h1>Sign up for free and give us a try!</h1>
      <div className="infoGrid">
        <div className="infoGrid__element">
          <h1>Full training runs on demand</h1>
          <i className="fa fa-play-circle"></i>
        </div>
        <div className="infoGrid__element">
          <h1>Biweekly one-on-one training</h1>
          <i className="fa fa-question-circle"></i>
        </div>
        <div className="infoGrid__element">
          <h1>Personalized Training Plans</h1>
          <i className="fa fa-users"></i>
        </div>
      </div>
    </div>
  );
};

export default InfoGrid;
