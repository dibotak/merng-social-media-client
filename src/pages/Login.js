import React, { useState, useContext } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

function Login (props) {
  const context = useContext(AuthContext);  
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(onLogin, {
    username: '',
    password: ''
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login } }) {
      context.login(login);
      props.history.push('/');
    },
    onError(error) {
      setErrors(error.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function onLogin() {
    loginUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1 className="page-title">Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username"
          name="username"
          type="text"
          value={values.username}
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
        <Button color="blue" type="submit">
          Login
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

const LOGIN_USER = gql`
  mutation LoginUser(
    $username: String!
    $password: String!
  ) {
    login(
      username: $username
      password: $password
    ) {
      username
      email
      token
    }
  }
`;

export default Login;
