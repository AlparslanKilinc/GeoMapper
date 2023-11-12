=import React from 'react'
import ExplorePage from './ExplorePage.jsx'

describe('<ExplorePage />', () => {
  it('renders', () => {

    cy.mount(<ExplorePage />)
  })
})