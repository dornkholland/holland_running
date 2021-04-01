import React from "react";

const InfoGrid = () => {
  return (
    <div className="info">
      <h1>Let us help you with that.</h1>
      <div className="infoGrid">
        <div className="infoGrid__element">
          <h1>Full training runs on demand</h1>
          <i className="fa fa-play-circle"></i>
        </div>
        <div className="infoGrid__element">
          <h1>Live classes with Q&A</h1>
          <i className="fa fa-question-circle"></i>
        </div>
        <div className="infoGrid__element">
          <h1>Private Training Plans</h1>
          <i className="fa fa-users"></i>
        </div>
      </div>
    </div>
  );
};

export default InfoGrid;
