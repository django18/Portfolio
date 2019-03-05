import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <section className="app-hero">
          <section className="app-hero__overlay" />
          <section className="app-hero__navigation">
            <ul className="app-hero-navigation-list">
              <li className="active app-hero-navigation-list__item">
                <a href="http://" />
                Home
              </li>
              <li className="app-hero-navigation-list__item">
                <a href="http://" />
                Portfolio
              </li>
              <li className="app-hero-navigation-list__item">
                <a href="http://" />
                About
              </li>
              <li className="app-hero-navigation-list__item">
                <a href="http://" />
                Contact
              </li>
            </ul>
          </section>
          <div className="app-hero-content">
            <h1 className="app-hero-content__heading">Avinash Dangi</h1>
            <p className="app-hero-content__gist">
              Full Stack Developer | C-DOT | NSIT | Research Engineer
            </p>
            <p>
              <a href="resources/AvinashDangiResume.pdf" download>
                <button className="app-resume-btn">
                  Download CV <i className="fas fa-download" />
                </button>
              </a>
            </p>
            <ul className="app-personal-links-list">
              <li className="app-personal-links-list__item">
                <a href="http://" />
                <i className="fab fa-github" />
              </li>
              <li className="app-personal-links-list__item">
                <a href="http://" />
                <i className="fab fa-medium-m" />
              </li>
              <li className="app-personal-links-list__item">
                <a href="http://" />
                <i className="fab fa-free-code-camp" />
              </li>
              <li className="app-personal-links-list__item">
                <a href="http://" />
                <i className="fab fa-linkedin-in" />
              </li>
              <li className="app-personal-links-list__item">
                <a href="http://" />
                <i className="fab fa-codepen" />
              </li>
            </ul>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
