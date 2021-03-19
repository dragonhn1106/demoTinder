import React from "react";
import PropTypes from "prop-types";

AvaUser.propTypes = {
    srcDetail: PropTypes.string,
    altDetail : PropTypes.string,
};

function AvaUser(props) {
    const {srcDetail, altDetail} = props
  return (
    <div>
      <img
        src={srcDetail}
        alt={altDetail}
        width={150}
        height={150}
        style={{
          borderRadius: "50%",
          position: "absolute",
          left: 0,
          right: 0,
          margin: "auto",
          bottom: -40,
          border: "1px solid #d9d9d9",
          padding: 5,
          backgroundColor: "#fff",
        }}
      />
    </div>
  );
}

export default AvaUser;
