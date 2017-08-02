import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button
                            type="button"
                            className="navbar-toggle collapsed"
                            data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1"
                            aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                        </button>
                        <span className="navbar-brand">ARES</span>
                    </div>
                    <ul className="nav navbar-nav">
                        <li className="active nav-item">Sign in</li>
                        <li className="active nav-item">Sign in</li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;
