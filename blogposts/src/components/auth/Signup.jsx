import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

// email, pseudo, password, confirm password, age,firstname,
class Signup extends Component {
    renderField(field) {
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
    }
    render() {
        const { renderField, renderAgeField, onFormSubmit } = this;
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
                            name="password-confirm"
                            type="password"
                            component={renderField}
                        />
                        <Field
                            label="Age"
                            name="age"
                            type="number"
                            component={renderAgeField}
                        />
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

export default reduxForm({
    form: 'signup'
})(Signup);
