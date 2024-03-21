import React from "react";

const Scores = ({ scores }) => {
  return (
    <div className="container pt-100">
      <div className="d-grid col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div className="row">
          {scores?.map((item, index) => {
            return (
              <div
                key={`${item}-${index}`}
                className="col-xs-12 col-sm-12 col-md-6 col-lg-3 pb-20"
              >
                <div className="bg-color rounded-3 pt-20 pb-20 text-center">
                  <h1 className="score-size">+{item?.attributes?.number}</h1>
                  <div className="text-dark">{item?.attributes?.title}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Scores;
