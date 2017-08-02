import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { signupUser } from '../../actions';

class Signup extends Component {
    constructor() {
        super();

        this.renderAlert = this.renderAlert.bind(this);
    }
    renderAlert() {
        const { errorMessage } = this.props;
        if (errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>
                        {errorMessage}
                    </strong>
                </div>
            );
        }
    }
    renderField(field) {
        const { meta: { error, touched } } = field;
        return (
            <div className="form-group">
                <label>
                    {field.label}:
                </label>
                <input
                    {...field.input}
                    className="form-control"
                    type={field.type}
                />
                {touched &&
                    error &&
                    <span className="error">
                        {error}
                    </span>}
            </div>
        );
    }
    renderAgeField(field) {
        const ageFieldStyle = {
            width: '100px'
        };
        return (
            <div className="form-group" style={ageFieldStyle}>
                <label>
                    {field.label}:
                </label>
                <input
                    {...field.input}
                    min="1"
                    className="form-control"
                    type={field.type}
                />
            </div>
        );
    }
    onFormSubmit(values) {
        // send values to backend api
        console.log(values);
        // this.props.signupUser(values);
    }
    render() {
        const { renderField, renderAgeField, onFormSubmit, renderAlert } = this;
        const { handleSubmit } = this.props;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <Field
                            label="Email"
                            name="email"
                            type="text"
                            component={renderField}
                        />
                        <Field
                            label="Fistname"
                            name="firstname"
                            type="text"
                            component={renderField}
                        />
                        <Field
                            label="Pseudo"
                            name="pseudo"
                            type="text"
                            component={renderField}
                        />
                        <Field
                            label="Password"
                            name="password"
                            type="password"
                            component={renderField}
                        />
                        <Field
                            label="Confirm password"
                            name="passwordConfirm"
                            type="password"
                            component={renderField}
                        />
                        <Field
                            label="Age"
                            name="age"
                            type="number"
                            component={renderAgeField}
                        />
                        {renderAlert()}
                        <button
                            onClick={handleSubmit(onFormSubmit)}
                            type="submit"
                            className="btn btn-primary"
                        >
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const validate = values => {
    const errors = {};
    const properties = ['email', 'pseudo', 'firstname', 'age', 'password'];
    properties.forEach(item => {
        if (!values[item]) {
            errors[item] = 'you must enter ' + item;
        }
    });

    if (values.password !== values.passwordConfirm) {
        errors.password = 'Password must match';
    }
    return errors;
};
function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}
export default reduxForm({
    form: 'signup',
    validate
})(connect(mapStateToProps, { signupUser })(Signup));
