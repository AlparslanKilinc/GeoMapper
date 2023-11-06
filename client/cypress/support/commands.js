

import {mount} from "cypress/react18";
Cypress.Commands.add("mount", (component, options) => {

    return mount(component, options)
})



