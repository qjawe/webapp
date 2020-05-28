import React from "react";
import TextLoop from "react-text-loop";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTelegram,
  faDiscord,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import "./Landing.scss";

function Landing() {
  const [selectedUsage, setSelectedUsage] = React.useState(0);
  const usageList = [
    require("../../assets/landing/screenshot1.png"),
    require("../../assets/landing/screenshot2.png"),
    require("../../assets/landing/screenshot3.png"),
  ];
  return (
    <div className="landing">
      <div className="landing-container" id="home">
        <div className="squares square1" />
        <div className="squares square3" />
        <div className="squares square5" />
        <div className="squares square7" />
        <div className="header-section">
          <div className="header-bar">
            <div className="header-app-icon">
              <span className="app-icon-logo-container">
                <img
                  src={require("../../assets/icons/logo.png")}
                  alt="logo"
                  className="app-icon-logo"
                />
              </span>
              flashmint.
            </div>
            <div className="header-action-button-container">
              <div className="header-tabs">
                <Link to="/">Home</Link>
              </div>
              <div className="header-tabs">
                <AnchorLink href="#feature">Features</AnchorLink>
              </div>
              <div className="header-tabs">
                <AnchorLink href="#usage">How to Play</AnchorLink>
              </div>
              <div className="header-tabs">
                <a
                  href="https://flashmint.typeform.com/to/YI2qD6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="header-play-buttons"
                >
                  Play
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="home-section">
          <div className="home-placeholder">
            <div className="home-text-container">
              <div className="home-title-container">
                <h1 className="home-title">
                  No{" "}
                  <TextLoop interval={2000}>
                    <span className="home-title"> Code</span>
                    <span className="home-title"> Risk</span>
                    <span className="home-title"> Investment</span>
                    <span className="home-title"> Sentiments</span>
                    <span className="home-title"> Bullshit</span>
                    <span className="home-title"> Loss</span>
                    <span className="home-title"> Limit</span>
                  </TextLoop>
                </h1>
              </div>
              <div className="home-tagline">
                A No Code DeFi Tool to Mint money, without spending any.
              </div>
              <div className="home-play">
                <a
                  href="https://flashmint.typeform.com/to/YI2qD6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="header-play-buttons"
                >
                  Join
                </a>
              </div>
            </div>
            <div className="home-icon-container">
              <div className="home-icon-inner-container">
                <img
                  src={require("../../assets/background/ethereum-background.png")}
                  alt="eth"
                  className="home-background-icon"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-section">
        <img
          src={require("../../assets/background/path-background.png")}
          alt="path"
          className="path-background"
        />
        <img
          src={require("../../assets/background/path2-background.png")}
          alt="path2"
          className="path2-background"
        />
        <div className="feature-section" id="feature">
          <div className="feature-container">
            <h1 className="feature-title">Our Features</h1>
            <p className="feature-description">
              While presenting a sleek UI, we have provided with the best
              possible UX.
              <br />
              Even a college grad/poker fan without any knowledge of the DeFi
              protocols can play a hit and trial on our Simulator and start
              minting money
            </p>
            <div className="feature-showcase">
              <div className="feature-item">
                <div>
                  <img
                    src={require("../../assets/icons/simulator.png")}
                    alt="demo"
                    className="feature-icons"
                  />
                </div>
                <h3 className="feature-title">Simulator</h3>
                <p className="feature-description">
                  A Drag and drop tool where you can execute flashloans without
                  interacting with the code.
                </p>
              </div>
              <div className="feature-item">
                <div>
                  <img
                    src={require("../../assets/icons/leaderboard.png")}
                    alt="demo"
                    className="feature-icons"
                  />
                </div>
                <h3 className="feature-title">Rankings</h3>
                <p className="feature-description">
                  No time to learn Defi, follow the top scorers to learn how the
                  experts are earning money.
                </p>
              </div>
              <div className="feature-item">
                <div>
                  <img
                    src={require("../../assets/icons/community.png")}
                    alt="demo"
                    className="feature-icons"
                  />
                </div>
                <h3 className="feature-title">Squawk Alley</h3>
                <p className="feature-description">
                  Enabling a rich community of Flashloan experts, to learn and
                  earn together.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="usage-section" id="usage">
          <div className="usage-container">
            <h1>How do I use Flashmint?</h1>
            <p>
              Our <span className="highlight">Product Demo</span> &{" "}
              <span className="highlight">"How to Play" Guide</span> is coming
              soon.
            </p>
            <div className="usage-demo-container">
              <div className="usage-list-container">
                <div
                  className={`usage-list-item ${
                    selectedUsage === 0 ? "selected" : ""
                  }`}
                  onClick={(e) => setSelectedUsage(0)}
                >
                  <div className="usage-number">1</div>
                  <div className="usage-details">
                    <div className="usage-details-title">Connect to wallet</div>
                  </div>
                </div>
                <div
                  className={`usage-list-item ${
                    selectedUsage === 1 ? "selected" : ""
                  }`}
                  onClick={(e) => setSelectedUsage(1)}
                >
                  <div className="usage-number">2</div>
                  <div className="usage-details">
                    <div className="usage-details-title">
                      Drag, and Drop Protocols
                    </div>
                  </div>
                </div>
                <div
                  className={`usage-list-item ${
                    selectedUsage === 2 ? "selected" : ""
                  }`}
                  onClick={(e) => setSelectedUsage(2)}
                >
                  <div className="usage-number">3</div>
                  <div className="usage-details">
                    <div className="usage-details-title">Enter the amount</div>
                  </div>
                </div>
              </div>
              <div className="usage-image-container">
                <img
                  src={usageList[selectedUsage]}
                  alt="demo-icon"
                  className="usage-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-section">
        <div className="footer-container">
          <div className="footer-app-section">
            <h1 className="footer-app-name">flashmint.</h1>
            <div className="footer-social-icons-container">
              <a
                href="https://discord.gg/gxV7jU"
                className="footer-social-icon"
              >
                <FontAwesomeIcon icon={faDiscord} />
              </a>
              <a href="#" className="footer-social-icon">
                <FontAwesomeIcon icon={faTwitterSquare} />
              </a>
              <a href="#" className="footer-social-icon">
                <FontAwesomeIcon icon={faTelegram} />
              </a>
            </div>
          </div>
          <div className="footer-link-section">
            <h3 className="footer-link-header">Quick Links</h3>
            <ul className="footer-link-list">
              <li className="footer-link-item">
                <a
                  href="https://aave.com/"
                  className="footer-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Aave
                </a>
              </li>
              <li className="footer-link-item">
                <a
                  href="https://uniswap.org/"
                  className="footer-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Uniswap
                </a>
              </li>
              <li className="footer-link-item">
                <a
                  href="https://kyberswap.com/"
                  className="footer-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Kyber
                </a>
              </li>
              <li className="footer-link-item">
                <a
                  href="https://docs.makerdao.com/"
                  className="footer-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Maker
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-link-section">
            <h3 className="footer-link-header">Navigations</h3>
            <ul className="footer-link-list">
              <li className="footer-link-item">
                <AnchorLink href="#home" className="footer-link">
                  Home
                </AnchorLink>
              </li>
              <li className="footer-link-item">
                <AnchorLink href="#feature" className="footer-link">
                  Feature
                </AnchorLink>
              </li>
              <li className="footer-link-item">
                <AnchorLink href="#usage" className="footer-link">
                  Demo
                </AnchorLink>
              </li>
              <li className="footer-link-item">
                <Link to="/playground" className="footer-link">
                  Playground
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
