import { render } from '@testing-library/react'
import Dashboard from '../../app/components/Dashboard'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'


describe('Test dashboard', () => {


  it('Test rendering', () => {
    const { baseElement } = render(<Router><Dashboard /></Router>)

    expect(baseElement).toBeInTheDocument()

  })

})