import { render, screen } from "@testing-library/react"
import ValidationError from "."

describe('ValidationError',()=>{
    test('given value not changed, then return null',()=>{
        render(<ValidationError
            lastEmail=""
            errorMessage="anyErroMessage"
            hasChagend={false}
            type="email"
            testId="error"
            value="anyValue"
        />)
        expect(screen.queryByTestId('error')).toBeNull();
    })
    test('given valor is mandatory, when value is empty, then return error',()=>{
        render(<ValidationError
            lastEmail=""
            errorMessage="anyErroMessage"
            hasChagend={true}
            testId="error"
            type="required"
            value=""
        />)
        expect(screen.getByTestId('error')).not.toBeNull();
    })
    
    test('given valor is mandatory, when value is not empty, then return null',()=>{
        render(<ValidationError
            lastEmail=""
            errorMessage="anyErroMessage"
            hasChagend={true}
            testId="error"
            type="required"
            value="anyValue"
        />)
        expect(screen.queryByTestId('error')).toBeNull();
    })

    test('given error is email, when value invalid, then return error',()=>{
        render(<ValidationError
            lastEmail=""
            errorMessage="anyErroMessage"
            hasChagend={true}
            testId="error"
            type="email"
            value="invalid"
        />)
        expect(screen.getByTestId('error')).not.toBeNull();
    })
    test('given error is email, when value is valid, then return null',()=>{
        render(<ValidationError
            lastEmail=""
            errorMessage="anyErroMessage"
            hasChagend={true}
            testId="error"
            type="email"
            value="test@email.com"
        />)
        expect(screen.queryByTestId('error')).toBeNull();
    })
    
})