// 상태 정보 타입 - 마치 json 처럼 사용가능하다.
// interface MyState {
//     count: number;
// }
import { MyState, CounterAction } from "../type/commonType";

// Reducer에 전달할 Action : 함수인데 ㅁ타입을 미리 지정해야 한다.
// type CounterAction =
//     | {
//           type: "increase";
//       }
//     | { type: "decrease" }
//     | { type: "reset" }
//     | { type: "add"; count: 5 };

const initialState: MyState = { count: 0 };

function myStateReducer(state: MyState, action: CounterAction): MyState {
    switch (action.type) {
        case "increase":
            // 새로운 상태 반환 - 디비롭 데이터를 읽어 온다.
            // json의 전개, 앞의 state에 현재 상태 추가하기
            return { ...state, count: state.count + 1 };

        case "decrease":
            return { ...state, count: state.count - 1 };
        case "reset":
            return { ...state, count: 0 };
        case "add":
            return {
                ...state,
                count: state.count + action.count,
            };

        default: //예외처리
            throw new Error("Unknown action");
    }

    // return {count: 0} MyState를 반환한다고 했으니까 반드시 반환해야 한다.
}

export { myStateReducer };
