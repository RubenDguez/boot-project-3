import { MockedProvider } from '@apollo/client/testing';
import Login from '../../client/src/pages/Authentication/Login/Login';

describe('<Login />', () => {
  beforeEach(() => {
    const mocks: any[] = [];

    cy.mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Login />
      </MockedProvider>,
    );
  });
  it('renders', () => {});
  it('should display back button', () => {
    cy.findByTestId('ArrowBackIcon').should('exist');
    cy.findByTestId('ArrowBackIcon').should('be.visible');

    cy.findByTestId('back-button').should('exist');
    cy.findByTestId('back-button').should('be.visible');
    cy.findByTestId('back-button').should('contain.text', 'Back');
  });
  it('should display login header', () => {
    cy.findByTestId('login-header').should('exist');
    cy.findByTestId('login-header').should('be.visible');
    cy.findByTestId('login-header').should('have.text', 'Login');
  });
  it('should display login form', () => {
    cy.findByTestId('login-form').should('exist');
    cy.findByTestId('login-form').should('be.visible');
  });
  it('should display username MUI TextField', () => {
    cy.findByTestId('username').should('exist');
    cy.findByTestId('username').should('be.visible');
  });
  it('should display username label', () => {
    cy.get('#username-label').should('exist');
    cy.get('#username-label').should('be.visible');
    cy.get('#username-label').should('have.text', 'Username / Email *');
  });
  it('should display username input', () => {
    cy.get('#username').should('exist');
    cy.get('#username').should('be.visible');
  });
  it('should display password MUI TextField', () => {
    cy.findByTestId('password').should('exist');
    cy.findByTestId('password').should('be.visible');
  });
  it('should display password label', () => {
    cy.get('#password-label').should('exist');
    cy.get('#password-label').should('be.visible');
    cy.get('#password-label').should('have.text', 'Password *');
  });
  it('should display password input', () => {
    cy.get('#password').should('exist');
    cy.get('#password').should('be.visible');
  });
  it('should display submit button', () => {
    cy.get('#submit').should('exist');
    cy.get('#submit').should('be.visible');
    cy.get('#submit').should('have.text', 'Submit');
  });
});
