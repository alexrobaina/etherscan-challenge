/**
 * @jest-environment jsdom
 */

import { describe, it, expect } from 'vitest'

import { BaseAlert } from '../../../../components/common/BaseAlert'
import { render, screen } from '../../../test-utils'

describe('BaseAlert Component', () => {
  it('renders the alert with the provided text', () => {
    const testText = 'Test Alert Message'
    render(<BaseAlert text={testText} />)
    expect(screen.getByText(testText)).toBeInTheDocument()
  })

  it('has the appropriate styling classes', () => {
    const testText = 'Test Alert Message'
    render(<BaseAlert text={testText} />)
    const alertElement = screen.getByText(testText).parentElement
    expect(alertElement).toHaveClass('ml-3 flex-1 md:flex md:justify-between')
  })
})
