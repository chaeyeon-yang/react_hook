import { useReducer, useState } from "react";
import { CalculatorStateType } from "./type/commonType";
import { CalculatorReducer } from "./reducer/calculatorReducer";

function Calculator() {
    const initialState: CalculatorStateType = {
        x: "",
        y: "",
        result: "",
        operator: "",
    };
    const [state, dispatch] = useReducer(CalculatorReducer, initialState);
    const [x, setX] = useState<string>("");
    const [y, setY] = useState<string>("");

    const xChange = (e: any) => setX(e.target.value);
    const yChange = (e: any) => setY(e.target.value);

    const Add = () => {
        dispatch({
            type: "ADD",
            value: { x: x, y: y, result: "", operator: "" },
        });
    };

    const Sub = () => {
        dispatch({
            type: "SUB",
            value: { x: x, y: y, result: "", operator: "" },
        });
    };

    const Div = () => {
        dispatch({
            type: "DIV",
            value: { x: x, y: y, result: "", operator: "" },
        });
    };

    const Mul = () => {
        dispatch({
            type: "MUL",
            value: { x: x, y: y, result: "", operator: "" },
        });
    };

    return (
        <div>
            x: <input type="text" onChange={xChange} value={x} /> <br />
            y: <input type="text" onChange={yChange} value={y} /> <br />
            <button type="button" onClick={Add}>
                +
            </button>
            <button type="button" onClick={Sub}>
                -
            </button>
            <button type="button" onClick={Div}>
                /
            </button>
            <button type="button" onClick={Mul}>
                *
            </button>
            <h1>
                결과 : {state.x} {state.operator} {state.y} = {state.result}
            </h1>
        </div>
    );
}

export default Calculator;
