import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import Calculator from '../src/Calculator'
// Test operations
describe('operations test', () => {
    it('sums two positive numbers', () =>{
        render(<Calculator/>)
        fireEvent.click(screen.getByText('1'))
        fireEvent.click(screen.getByText('+'))
        fireEvent.click(screen.getByText('7'))
        fireEvent.click(screen.getByText('='))
        expect(screen.getByTestId('calculator-display')).toHaveTextContent('8')
    })
    it('multiplies two positive numbers', () => {
        render(<Calculator/>)
        fireEvent.click(screen.getByText('4'))
        fireEvent.click(screen.getByText('*'))
        fireEvent.click(screen.getByText('3'))
        fireEvent.click(screen.getByText('='))
        expect(screen.getByTestId('calculator-display')).toHaveTextContent('12')
    })

    it('multiplies negative with positive', () => {
        render(<Calculator/>)
        fireEvent.click(screen.getByText('-3'))
        fireEvent.click(screen.getByText('*'))
        fireEvent.click(screen.getByText('9'))
        fireEvent.click(screen.getByText('='))
        expect(screen.getByTestId('calculator-display')).toHaveTextContent('-27')
    })
})

// Integration test
describe('integration test', () => {
    it('chain of operations', () => {
        render(<Calculator/>)
        fireEvent.click(screen.getByText('2'))
        fireEvent.click(screen.getByText('*'))
        fireEvent.click(screen.getByText('5'))
        fireEvent.click(screen.getByText('='))
        fireEvent.click(screen.getByText('/'))
        fireEvent.click(screen.getByText('2'))
        fireEvent.click(screen.getByText('='))
        expect(screen.getByTestId('calculator-display')).toHaveTextContent('5')
    })

    it('division by zero', () => {
        render(<Calculator />)
        fireEvent.click(screen.getByText('2'))
        fireEvent.click(screen.getByText('/'))
        fireEvent.click(screen.getByText('0'))
        fireEvent.click(screen.getByText('='))
        expect(screen.getByTestId('calculator-display')).toHaveTextContent('ERROR')
    })
})

// Character limit test
describe('character limit', () => {
    it('no more characters than allowed', () => {
        render(<Calculator />)
        fireEvent.click(screen.getByText('1'))
        fireEvent.click(screen.getByText('2'))
        fireEvent.click(screen.getByText('3'))
        fireEvent.click(screen.getByText('4'))
        fireEvent.click(screen.getByText('5'))
        fireEvent.click(screen.getByText('6'))
        fireEvent.click(screen.getByText('7'))
        fireEvent.click(screen.getByText('8'))
        fireEvent.click(screen.getByText('9'))
        fireEvent.click(screen.getByText('0')) //10
        fireEvent.click(screen.getByText('2')) //Ya n
        expect(screen.getByTestId('calculator-display')).toHaveTextContent('1234567890')
    })
})