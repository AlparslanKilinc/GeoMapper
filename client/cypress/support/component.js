// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import '../../src/index.css'
import '../../src/styles/navbar.css'
import '../../src/styles/loginPage.css'
import { mount } from 'cypress/react18'
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

Cypress.Commands.add('mount', mount)
