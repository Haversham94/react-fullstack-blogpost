import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
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
                    </Link>{' '}
                </li>,
                <li key={3}>
                    <a href="/auth/google">Sign In with Google</a>
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
                        <li className="nav-item">
                            <NavLink
                                to="/databasedata"
                                activeClassName="active"
                                className="nav-link btn btn-link">
                                Database
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/grapqldata"
                                activeClassName="active"
                                className="nav-link btn btn-link">
                                GraphQL
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/feature"
                                activeClassName="current"
                                className="nav-link btn btn-link">
                                Amazing Feature
                            </NavLink>
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
