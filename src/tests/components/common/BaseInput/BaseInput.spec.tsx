import { describe, it, expect } from 'vitest'

import { BaseInput } from '../../../../components/common/BaseInput'
import { render, screen, fireEvent } from '../../../test-utils'

describe('BaseInput Component', () => {
  it('renders with a placeholder', () => {
    render(<BaseInput placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('displays label when provided', () => {
    const labelText = 'Test Label'
    render(<BaseInput label={labelText} placeholder="Input" />)
    expect(screen.getByText(labelText)).toBeInTheDocument()
  })

  it('displays error message when provided', () => {
    const errorMessage = 'Error message'
    render(<BaseInput error={errorMessage} placeholder="Input" />)
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  it('handles change event', () => {
    const handleChange = vi.fn()
    render(<BaseInput placeholder="Input" handleChange={handleChange} />)
    const input = screen.getByPlaceholderText('Input')
    fireEvent.change(input, { target: { value: 'New value' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('renders with iconLeft when provided', () => {
    const IconLeft = <span data-testid="icon-left">Icon</span>
    render(<BaseInput iconLeft={IconLeft} placeholder="Input" />)
    expect(screen.getByTestId('icon-left')).toBeInTheDocument()
  })

  it('renders with iconRight when provided', () => {
    const IconRight = <span data-testid="icon-right">Icon</span>
    render(<BaseInput IconRight={IconRight} placeholder="Input" />)
    expect(screen.getByTestId('icon-right')).toBeInTheDocument()
  })

  it('is disabled when isdisabled is true', () => {
    render(<BaseInput placeholder="Input" isdisabled />)
    expect(screen.getByPlaceholderText('Input')).toBeDisabled()
  })
})
