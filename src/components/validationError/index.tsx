import { isEmailValid } from "../../helpers/emailHelper"
type ValidationErrorProps = {
    errorMessage: string;
    hasChagend: boolean;
    type: 'required' | 'email' | 'emailInUse';
    value: string;
    testId: string;
    lastEmail: string

}
const ValidationError = (props: ValidationErrorProps) => {


    if (!props.hasChagend) {
        return null
    }

    const error = <div className="text-danger my-1" data-testid={props.testId}>{props.errorMessage}</div>
    if (props.type === 'required') {
        return (
            props.value === ''  ?
                error
                : null
        )
    }
    if (props.type === 'emailInUse' && props.value === props.lastEmail) {
       return error
    }
    if(props.value !== props.lastEmail && props.type === 'emailInUse'){
        return null
    }

    return (
        !isEmailValid(props.value) ?
            error
            : null
    )
}
export default ValidationError