import { describe, it, expect } from 'vitest'

import { BaseBadge } from '../../../../components/common/BaseBadge'
import { render, screen } from '../../../test-utils'

describe('BaseBadge Component', () => {
  it('renders the badge with the provided text', () => {
    const testText = 'Test Badge'
    render(<BaseBadge text={testText} backgroundColor="bg-primary-300" />)
    expect(screen.getByText(testText)).toBeInTheDocument()
  })

  it('applies default styles if no props are provided', () => {
    const testText = 'Test Badge'
    render(<BaseBadge text={testText} />)
    const badgeElement = screen.getByText(testText).parentElement
    expect(badgeElement).toHaveClass(
      'bg-primary-300 undefined justify-center flex px-3 gap-2 py-1 items-cente rounded-xl',
    )
  })

  it('applies custom styles when props are provided', () => {
    const testText = 'Test Badge'
    render(
      <BaseBadge
        text={testText}
        color="text-secondary"
        backgroundColor="bg-secondary"
      />,
    )
    const badgeElement = screen.getByText(testText).parentElement
    expect(badgeElement).toHaveClass(
      'bg-secondary undefined justify-center flex px-3 gap-2 py-1 items-cente rounded-xl',
    )
  })

  it('renders with a pointer cursor when pointer prop is true', () => {
    const testText = 'Clickable Badge'
    render(<BaseBadge text={testText} pointer />)
    const badgeElement = screen.getByText(testText).parentElement
    expect(badgeElement).toHaveClass('cursor-pointer hover:bg-primary-200')
  })

  it('renders the left icon when provided', () => {
    const testText = 'Badge with Icon'
    const IconLeft = <span data-testid="icon-left">LeftIcon</span>
    render(<BaseBadge text={testText} iconLeft={IconLeft} />)
    expect(screen.getByTestId('icon-left')).toBeInTheDocument()
  })

  it('renders the right icon when provided', () => {
    const testText = 'Badge with Icon'
    const IconRight = <span data-testid="icon-right">RightIcon</span>
    render(<BaseBadge text={testText} iconRigth={IconRight} />)
    expect(screen.getByTestId('icon-right')).toBeInTheDocument()
  })
})
