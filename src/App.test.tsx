import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import Login from './components/login';
import userEvent from '@testing-library/user-event';

describe('Login', ()=>{
  test('given email, when empty, then show required error message',async ()=>{
    render(<Login/>);

    const email = screen.getByTestId('email');

    await userEvent.type(email,"anyValue");
    await userEvent.clear(email);

    const requiredError = screen.queryByTestId('email-required');
    expect(requiredError).not.toBeNull();
  })

  test('given email, when as value, then hide required error message',async ()=>{
    render(<Login/>);

    const email = screen.getByTestId('email');

    await userEvent.type(email,"anyValue");

    const requiredError = screen.queryByTestId('email-required');
    expect(requiredError).toBeNull();
  })

  test('given email, when field not changed, then hide required error message',async ()=>{
    render(<Login/>);
    const requiredError = screen.queryByTestId('email-required');
    expect(requiredError).toBeNull();
  })

  test('given email, when invalid, then show invalid error message',async ()=>{
    render(<Login/>);

    const email = screen.getByTestId('email');

    await userEvent.type(email,"anyValue");

    const requiredError = screen.queryByTestId('email-invalid');
    expect(requiredError).not.toBeNull();
  })

  test('given password, when empty, then show required error message',async ()=>{
    render(<Login/>);

    const password = screen.getByTestId('password');

    await userEvent.type(password,"anyValue");
    await userEvent.clear(password);

    const requiredError = screen.queryByTestId('password-required');
    expect(requiredError).not.toBeNull();
  })

  test('given password, when has value, then hide required error message',async ()=>{
    render(<Login/>);

    const password = screen.getByTestId('password');

    await userEvent.type(password,"anyValue");

    const requiredError = screen.queryByTestId('password-required');
    expect(requiredError).toBeNull();
  })

  test('given email, when empty, then disable login button',async ()=>{
    render(<Login/>);

    const loginButton = screen.getByTestId('btn-login');

    expect(loginButton).toBeDisabled();
  })
  test('given email, when valid, then enable login button',async ()=>{
    render(<Login/>);
    const email= screen.getByTestId('email');
    const loginButton = screen.getByTestId('btn-login');
    userEvent.type(email,'test@gmail.com');

    expect(loginButton).not.toBeDisabled();
  })
})
