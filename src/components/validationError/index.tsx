import { isEmailValid } from "../../helpers/emailHelper"
type ValidationErrorProps = {
    errorMessage:string;
    hasChagend:boolean;
    type:'required'|'email';
    value:string;
    testId:string;
    
}
const ValidationError = (props:ValidationErrorProps) =>{
    if(!props.hasChagend){
        return null
    }

    const error = <div className="text-danger my-1" data-testid={props.testId}>{props.errorMessage}</div>
    if(props.type === 'required'){
        return(
            props.value === ''?
                error
            :null
        )
    }

    return(
        !isEmailValid(props.value) ?
                error
            : null
    )
}
export default ValidationError