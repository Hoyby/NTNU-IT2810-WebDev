import { render } from '@testing-library/react'
import Navbar from '../../app/components/Navbar'
import { BrowserRouter as Router } from 'react-router-dom'


describe('Test navbar', () => {

  it('Test rendering', () => {
    const { baseElement } = render(<Router><Navbar /></Router>)

    expect(baseElement).toBeInTheDocument();

  })

})