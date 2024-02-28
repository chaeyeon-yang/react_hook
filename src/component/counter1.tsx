import { useState } from "react";

function Counter1() {
    const [number, setNumber] = useState<number>(0);

    // useReducer를 써서 함수 두 개를 외부로 내보내려고 한다.
    // increase와 decrease가 백엔드와 통신을 한다면
    // 각 컴포넌트마다 통신을 담당할 코드가 엄청 많다
    // 이걸 한 곳에 몰아서 처리해줄 수 있다.
    const increase = () => {
        setNumber(number + 1);
    };
    const decrease = () => {
        setNumber(number - 1);
    };
    return (
        <div>
            <h1>현재 카운트 : {number}</h1>
            <button type="button" onClick={increase}>
                ++
            </button>
            <button type="button" onClick={decrease}>
                --
            </button>
        </div>
    );
}
export default Counter1;
