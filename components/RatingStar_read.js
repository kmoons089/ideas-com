import React, { useState, useEffect } from "react";

const RatingStar_read = ({ starcount }) => {
  const [stars, setStars] = useState("0");

  useEffect(() => {
    setStars(starcount);
    console.log(starcount);
  }, []);
  return (
    <div>
      <div className="container d-flex justify-content-center ">
        <div className="row  text-center">
          <div className="col-md-12">
            <div className="stars">
              <div className="rating">
                {stars === "1" && (
                  <>
                    <i className="fa fa-star clicked me-2 "></i>
                    <i className="fa fa-star me-2"></i>
                    <i className="fa fa-star me-2"></i>
                    <i className="fa fa-star me-2"></i>
                    <i className="fa fa-star me-2"></i>
                  </>
                )}
                {stars === "2" && (
                  <>
                    <i className="fa fa-star clicked me-2 "></i>
                    <i className="fa fa-star clicked me-2"></i>
                    <i className="fa fa-star me-2"></i>
                    <i className="fa fa-star me-2"></i>
                    <i className="fa fa-star me-2"></i>
                  </>
                )}
                {stars === "3" && (
                  <>
                    <i className="fa fa-star clicked me-2 "></i>
                    <i className="fa fa-star clicked me-2"></i>
                    <i className="fa fa-star clicked me-2"></i>
                    <i className="fa fa-star me-2"></i>
                    <i className="fa fa-star me-2"></i>
                  </>
                )}
                {stars === "4" && (
                  <>
                    <i className="fa fa-star clicked me-2 "></i>
                    <i className="fa fa-star clicked me-2"></i>
                    <i className="fa fa-star clicked me-2"></i>
                    <i className="fa fa-star clicked me-2"></i>
                    <i className="fa fa-star me-2"></i>
                  </>
                )}
                {stars === "5" && (
                  <>
                    <i className="fa fa-star clicked me-2 glow"></i>
                    <i className="fa fa-star clicked me-2 glow"></i>
                    <i className="fa fa-star clicked me-2 glow"></i>
                    <i className="fa fa-star clicked me-2 glow"></i>
                    <i className="fa fa-star clicked me-2 glow"></i>
                  </>
                )}
                {stars === "0" && (
                  <>
                    <i className="fa fa-star me-2 "></i>
                    <i className="fa fa-star me-2"></i>
                    <i className="fa fa-star me-2"></i>
                    <i className="fa fa-star me-2"></i>
                    <i className="fa fa-star me-2"></i>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingStar_read;
