import {
    CalculatorAction,
    CalculatorAction2,
    CalculatorStateType,
} from "../type/commonType";

function CalculatorReducer(
    state: CalculatorStateType,
    action: CalculatorAction2
): CalculatorStateType {
    switch (action.type) {
        case "ADD": {
            let result = parseInt(action.value.x) + parseInt(action.value.y);
            return {
                ...state,
                result: result.toString(),
                operator: "+",
                x: action.value.x,
                y: action.value.y,
            };
        }

        case "SUB": {
            let result = parseInt(action.value.x) - parseInt(action.value.y);
            return {
                ...state,
                result: result.toString(),
                operator: "-",
                x: action.value.x,
                y: action.value.y,
            };
        }
        case "DIV": {
            let result = parseInt(action.value.x) / parseInt(action.value.y);
            return {
                ...state,
                result: result.toString(),
                operator: "/",
                x: action.value.x,
                y: action.value.y,
            };
        }
        case "MUL": {
            let result = parseInt(action.value.x) * parseInt(action.value.y);
            return {
                ...state,
                result: result.toString(),
                operator: "*",
                x: action.value.x,
                y: action.value.y,
            };
        }
        default:
            throw new Error("지원하지 않는 액션입니다.");
    }
}

export { CalculatorReducer };
