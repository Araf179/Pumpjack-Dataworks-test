import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import StarWarsCharacaterTable from '../components/StarWarsCharacaterTable'

describe('App', () => {
  test('renders App component with search filter', () => {
    render(<App />);
    screen.debug();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });
});


describe('Datagrid', () => {
    test('renders starwarscharactartable component', () => {
        const data = [{
            id: 1,
            name: 'testname',
            birthYear: '1993',
            gender: 'male',
            homeworld: 'testhomeworld',
            species: 'testspecies' ,
            favorite: false}]
      render(<StarWarsCharacaterTable data={data} />);
      screen.debug();
      expect(screen.getByText('Set Favorite')).toBeInTheDocument();
    });
});