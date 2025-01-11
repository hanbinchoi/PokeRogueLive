import React from 'react'
import { PokemonStatInput } from './PokemonStatInput'

describe('<PokemonStatInput />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<PokemonStatInput />)
  })
})