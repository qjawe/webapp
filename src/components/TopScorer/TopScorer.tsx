import React from "react";
import "./TopScorer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

function TopScorer() {
  return (
    <div className="top-scorer">
      <div className="top-scorer-title-container">
        <span className="top-scorer-title">Top Scorer</span>
        <span className="top-scorer-collapse-icon">
          <FontAwesomeIcon icon={faChevronDown} />
        </span>
      </div>
      <div className="top-scorer-body"></div>
    </div>
  );
}

export default TopScorer;
