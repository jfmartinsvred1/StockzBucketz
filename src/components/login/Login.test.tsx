import { render, screen, waitFor } from '@testing-library/react';
import Login from '.';
import userEvent from '@testing-library/user-event';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Register from '../register';
import { Auth } from 'firebase/auth';
import AuthService from '../../services/AuthService';



describe('Login', ()=>{

    let authService:AuthServiceMock;

    beforeEach(()=>{
        authService=new AuthServiceMock()
    })


  test('given email, when empty, then show required error message',async ()=>{
     renderLoginPage()

    const email = screen.getByTestId('email');

    await userEvent.type(email,"anyValue");
    await userEvent.clear(email);

    const requiredError = screen.queryByTestId('email-required');
    expect(requiredError).not.toBeNull();
  })

  test('given email, when as value, then hide required error message',async ()=>{
     renderLoginPage()

    const email = screen.getByTestId('email');

    await userEvent.type(email,"anyValue");

    const requiredError = screen.queryByTestId('email-required');
    expect(requiredError).toBeNull();
  })

  test('given email, when field not changed, then hide required error message',async ()=>{
     renderLoginPage()
    const requiredError = screen.queryByTestId('email-required');
    expect(requiredError).toBeNull();
  })

  test('given email, when invalid, then show invalid error message',async ()=>{
     renderLoginPage()

    const email = screen.getByTestId('email');

    await userEvent.type(email,"anyValue");

    const requiredError = screen.queryByTestId('email-invalid');
    expect(requiredError).not.toBeNull();
  })

  test('given password, when empty, then show required error message',async ()=>{
     renderLoginPage()

    const password = screen.getByTestId('password');

    await userEvent.type(password,"anyValue");
    await userEvent.clear(password);

    const requiredError = screen.queryByTestId('password-required');
    expect(requiredError).not.toBeNull();
  })

  test('given password, when has value, then hide required error message',async ()=>{
     renderLoginPage()

    const password = screen.getByTestId('password');

    await userEvent.type(password,"anyValue");

    const requiredError = screen.queryByTestId('password-required');
    expect(requiredError).toBeNull();
  })

  test('given email, when empty, then disable login button',async ()=>{
     renderLoginPage()

    const loginButton = screen.getByTestId('btn-login');

    expect(loginButton).toBeDisabled();
  })

  test('given email, when valid, then enable login button',async ()=>{
     renderLoginPage()
    const email= screen.getByTestId('email');
    const loginButton = screen.getByTestId('btn-login');
    userEvent.type(email,'test@gmail.com');

    expect(loginButton).not.toBeDisabled();
  })

  test('given user clicks on register button, then go to register page', async () => {
    renderLoginPage()

    const registerButton = screen.getByTestId('btn-register');
    await userEvent.click(registerButton);

      expect(window.location.pathname).toEqual('/register');
  });

  test('given user clicks on login button, then call login',async ()=>{
    authService.response = Promise.resolve({}as any);
    renderLoginPage()

    const email = screen.getByTestId('email');
    userEvent.type(email, "valid@gmail.com");
    const password = screen.getByTestId('password');
    userEvent.type(password,"anyValue")

    const loginButton = screen.getByTestId('btn-login');
    userEvent.click(loginButton);

    await waitFor(()=>expect(authService.isLoggingIn).toBeTruthy());
  })

  test('given user clicks on login button, when success, then go to my stocks page',async ()=>{
    authService.response = Promise.resolve({}as any);
    renderLoginPage()

    const email = screen.getByTestId('email');
    userEvent.type(email, "valid@gmail.com");
    const password = screen.getByTestId('password');
    userEvent.type(password,"anyValue")

    const loginButton = screen.getByTestId('btn-login');
    userEvent.click(loginButton);

    await waitFor(()=>expect(window.location.pathname).toEqual('/myStocks'));
  })

  test('given user clicks on login button, when fail, then show error message',async ()=>{
    authService.response = Promise.reject({message:'error'});
    renderLoginPage()

    const email = screen.getByTestId('email');
    userEvent.type(email, "valid@gmail.com");
    const password = screen.getByTestId('password');
    userEvent.type(password,"anyValue")

    const loginButton = screen.getByTestId('btn-login');
    userEvent.click(loginButton);

    expect(await screen.findByTestId('error')).not.toBeNull();
  })

  function renderLoginPage(){
    render(
        <BrowserRouter>
            <Login authService={authService as AuthService}/>
        </BrowserRouter>
    )
  }

  class AuthServiceMock{
    isLoggingIn = false;
    response: any;
    login(){
        this.isLoggingIn=true;

        return this.response;
    }
  }
})
