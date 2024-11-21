import { MockedProvider } from '@apollo/client/testing';
import SignUp from '../../client/src/pages/Authentication/SignUp/SignUp';

describe('<SignUp />', () => {
  beforeEach(() => {
    const mocks: any[] = [];

    cy.mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SignUp />
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
  it('should display SignUp header', () => {
    cy.findByTestId('signup-header').should('exist');
    cy.findByTestId('signup-header').should('be.visible');
    cy.findByTestId('signup-header').should('have.text', 'SIGN UP');
  });
  it('should display SignUp form', () => {
    cy.findByTestId('signup-form').should('exist');
    cy.findByTestId('signup-form').should('be.visible');
  });
  it('should display First Name MUI TextField', () => {
    cy.findByTestId('firstName').should('exist');
    cy.findByTestId('firstName').should('be.visible');
  });
  it('should display firstName label', () => {
    cy.get('#firstName-label').should('exist');
    cy.get('#firstName-label').should('be.visible');
    cy.get('#firstName-label').should('have.text', 'First Name *');
  });
  it('should display firstName input', () => {
    cy.get('#firstName').should('exist');
    cy.get('#firstName').should('be.visible');
  });
  it('should display Last Name MUI TextField', () => {
    cy.findByTestId('lastName').should('exist');
    cy.findByTestId('lastName').should('be.visible');
  });
  it('should display lastName label', () => {
    cy.get('#lastName-label').should('exist');
    cy.get('#lastName-label').should('be.visible');
    cy.get('#lastName-label').should('have.text', 'Last Name *');
  });
  it('should display lastName input', () => {
    cy.get('#lastName').should('exist');
    cy.get('#lastName').should('be.visible');
  });
  it('should display username MUI TextField', () => {
    cy.findByTestId('username').should('exist');
    cy.findByTestId('username').should('be.visible');
  });
  it('should display username label', () => {
    cy.get('#username-label').should('exist');
    cy.get('#username-label').should('be.visible');
    cy.get('#username-label').should('have.text', 'Username *');
  });
  it('should display username input', () => {
    cy.get('#username').should('exist');
    cy.get('#username').should('be.visible');
  });
  it('should display Email MUI TextField', () => {
    cy.findByTestId('email').should('exist');
    cy.findByTestId('email').should('be.visible');
  });
  it('should display email label', () => {
    cy.get('#email-label').should('exist');
    cy.get('#email-label').should('be.visible');
    cy.get('#email-label').should('have.text', 'Email *');
  });
  it('should display email input', () => {
    cy.get('#email').should('exist');
    cy.get('#email').should('be.visible');
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
