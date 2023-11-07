=import React from 'react'
import ExplorePage from './ExplorePage'

describe('<ExplorePage />', () => {
  it('renders', () => {

    cy.mount(<ExplorePage />)
  })
})