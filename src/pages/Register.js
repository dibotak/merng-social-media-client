import React, { useState, useContext } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

function Register (props) {
  const context = useContext(AuthContext);  
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(onRegister, {
    username: '',
    email: '',
    password: '',
    confirmationPassword: ''
  });

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      props.history.push('/');
    },
    onError(error) {
      setErrors(error.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function onRegister(event) {
    registerUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1 className="page-title">Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username"
          name="username"
          type="text"
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password"
          name="confirmationPassword"
          type="password"
          value={values.confirmationPassword}
          onChange={onChange}
        />
        <Button color="blue" type="submit">
          Register
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((error) => (
              <li key={error}>{ error }</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const REGISTER_USER = gql`
  mutation RegisterUser(
    $username: String!
    $email: String!
    $password: String!
    $confirmationPassword: String!
  ) {
    register(registerInput: {
      username: $username
      email: $email
      password: $password
      confirmationPassword: $confirmationPassword
    }) {
      username
      email
      token
    }
  }
`;

export default Register;
