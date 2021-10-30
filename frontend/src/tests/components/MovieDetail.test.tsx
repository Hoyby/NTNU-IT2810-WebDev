import { render } from '@testing-library/react'
import MovieDetail from '../../app/components/MovieDetail'

describe('Test movie detail', () => {

  it.todo('Test rendering', () => {
    const { baseElement } = render(<MovieDetail />)

    expect(baseElement).toBeInTheDocument();

  })

})