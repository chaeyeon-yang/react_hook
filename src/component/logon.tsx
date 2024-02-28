import { Dispatch, useReducer, createContext } from "react";
import { LogonAction, StateType } from "./type/commonType";
// 리듀서
// 컨텍스트 프로바이더

// 기본값 전달 - 시작할 때 값
const initialState: StateType = {
    userid: "",
    username: "",
    isLogon: false,
};

// Reducer 따로 생성
function LogonReducer(state: StateType, action: LogonAction): StateType {
    switch (action.type) {
        case "LOGON": {
            // fetch나 axios 써서 데이터 갖고 와서 로그온 작업 제대로
            return {
                ...state,
                userid: action.value.userid,
                username: action.value.username,
                isLogon: action.value.isLogon,
            };
        }
        case "LOGOUT":
            return {
                ...state,
                userid: "",
                username: "",
                isLogon: false,
            };
        case "RESET":
            return initialState;
        default:
            throw new Error("알 수 없는 액션입니다.");
    }
}

// 프로바이더
const AppProvider = ({ children }: { children: any }) => {
    const [state, dispatch] = useReducer(LogonReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

const AppContext = createContext<{
    state: StateType;
    dispatch: Dispatch<LogonAction>;
}>({
    state: initialState,
    dispatch: () => null,
});

export { AppProvider, AppContext }; //컨텍스트랑 컨텍스트 프로바이더 내보내기
