import { render } from '@testing-library/react'
import Navbar from '../../app/components/Navbar'

describe('Test navbar', () => {

  it('Test rendering', () => {
    const { baseElement } = render(<Navbar />)

    expect(baseElement).toBeInTheDocument();

  })

})