import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
    renderLink() {
        const { auth } = this.props;
        if (auth) {
            return (
                <li>
                    <Link to="/signout" className="nav-link">
                        Sign Out
                    </Link>
                </li>
            );
        } else {
            return [
                <li key={1}>
                    <Link to="/signin" className="nav-link">
                        Sign In
                    </Link>
                </li>,
                <li key={2}>
                    <Link to="/signup" className="nav-link">
                        Sign Up
                    </Link>
                </li>
            ];
        }
    }
    render() {
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand btn btn-link">
                            @RES TECH
                        </Link>
                    </div>
                    <ul className="nav navbar-nav">
                        <li className="active">
                            <a className="btn btn-link">Link</a>
                        </li>
                        <li>
                            <a className="btn btn-link">Link</a>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        {this.renderLink()}
                    </ul>
                </div>
            </nav>
        );
    }
}
function mapStateToProps(state) {
    return {
        auth: state.auth.authenticated
    };
}

export default connect(mapStateToProps)(Header);
