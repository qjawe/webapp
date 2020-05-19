import React from "react";
import TextLoop from "react-text-loop";
import AnchorLink from "react-anchor-link-smooth-scroll";
import "./Landing.scss";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="landing">
      <div className="landing-container" id="home">
        <div className="squares square1" />
        <div className="squares square3" />
        <div className="squares square5" />
        <div className="squares square7" />
        <div className="header-section">
          <div className="header-bar">
            <div className="header-app-icon">flashmint.</div>
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
                <Link to="/playground" className="header-play-buttons">
                  Play
                </Link>
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
                Mint money without spending any
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
              Flashmint is a no-code tool that empowers DeFi users to create,
              simulate, analyse DeFi arbitrage trades
            </p>
            <p className="feature-description">
              As a possible tool for financial inclusion, the platform takes a
              gamified and social approach to the problem, empowering new users
              to learn about DeFi.
            </p>
            <div className="feature-showcase">
              <div className="feature-item">
                <div>
                  <img
                    src="https://pspfqlx3qgd7.arweave.net/Il2bA6IuoancZwMYqH9t3nPOdKRP94WqbGmrQwc_b_0/private.png"
                    alt="demo"
                    className="feature-icons"
                  />
                </div>
                <h3 className="feature-title">Simulation</h3>
                <p className="feature-description">
                  The core of our product is the Simulator. We mirrored it to
                  create a drag and drop tool.
                </p>
              </div>
              <div className="feature-item">
                <div>
                  <img
                    src="https://pspfqlx3qgd7.arweave.net/Il2bA6IuoancZwMYqH9t3nPOdKRP94WqbGmrQwc_b_0/private.png"
                    alt="demo"
                    className="feature-icons"
                  />
                </div>
                <h3 className="feature-title">Rankings</h3>
                <p className="feature-description">
                  Noobs in Defi, can follow the top scorers profiles to learn
                  how the experts are earning money.
                </p>
              </div>
              <div className="feature-item">
                <div>
                  <img
                    src="https://pspfqlx3qgd7.arweave.net/Il2bA6IuoancZwMYqH9t3nPOdKRP94WqbGmrQwc_b_0/private.png"
                    alt="demo"
                    className="feature-icons"
                  />
                </div>
                <h3 className="feature-title">Squawk Alley - Community</h3>
                <p className="feature-description">
                  We intend to enable a rich community of Flashmint performers,
                  who will learn and earn.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="usage-section" id="usage">
          <div className="usage-container">
            <h1>How do I use Flashmint?</h1>
          </div>
        </div>
      </div>
      <div className="footer-section">
        <div className="footer-container">
          <div className="footer-app-section">
            <h1 className="footer-app-name">flashmint.</h1>
          </div>
          <div className="footer-link-section">
            <h3 className="footer-link-header">Quick Links</h3>
            <ul className="footer-link-list">
              <li className="footer-link-item">
                <a href="#" className="footer-link">
                  Aave
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#" className="footer-link">
                  Uniswap
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#" className="footer-link">
                  Kyber
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#" className="footer-link">
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
