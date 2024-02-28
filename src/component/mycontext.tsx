//리듀서
//컨텍스트 프로바이더

import { useReducer, useEffect, useState } from "react";
import { StateType, LogonAction } from "./type/commonType";
import { createContext, Dispatch } from "react";
import axios from "axios";

//기본값 전달 - 시작할때 값
const initalState: StateType = {
    userid: "",
    username: "",
    isLogon: false,
    callBack: (param: boolean) => null,
};

//Reducer 따로 생성 -- 상태변경만 사용하고 , 직접 axios나 fetch를 하지말라고 함
//Reducer는 상태 변경외에 사용못함, 미들웨어를 사용해야 한다. Redux같은 라이브러리 이용하기
//중간에 미들웨어를 만들고, 콜백만들어서 전달하는 관점

function LogonReducer(state: StateType, action: LogonAction): StateType {
    switch (action.type) {
        case "LOGON": {
            let newState = {
                ...state,
                userid: action.value.userid,
                username: action.value.username,
                isLogon: true,
            };
            saveStateToLocalStorage("appState", newState);
            return newState;
        }
        case "LOGOUT": {
            let newState = {
                ...state,
                userid: "",
                username: "",
                isLogon: false,
            };
            saveStateToLocalStorage("appState", newState);
            return newState;
        }
        case "RESET":
            return initalState;
        default:
            throw new Error("알수없는 액션입니다.");
    }
}

//프로바이더
const AppProvider = ({ children }: { children: any }) => {
    //F5누르면 Provider가 계속 초기화된다.
    const [state, dispatch] = useReducer(LogonReducer, initalState);
    //**********  주의사항 return 구문 뒤에 괄호열기 붙여야 함  */
    //useEffect(()=>{
    //페이지 이동시마다 호출되면서 이 부분이 호출된다.

    //saveStateToLocalStorage("appState", state);
    //현재상황저장, state의 값이 바뀔때마다 호출된다.
    //배열의 경우에는 직접 배열을 []에 쓰면 안되고
    //일반 값변수 하나를 선언한다음 그 변수를 감시하다가 그 변수값이
    //바뀌었을 경우에 다시 서버로 부터 값을 가져오게 하면 된다.
    //세번호출 : 첫번째 컴포넌트가 마운트가 될때, 컴포넌트가 마운트 해제될때
    //          변수의 값이 바뀔때, loading변수등을 활용해라
    //state의 상태 변환시마다 이 부분이 호출된다.
    // }, [])

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
    state: initalState,
    dispatch: () => null,
});

//useContext의 장점은 부모 컴포넘트 ==> 자손 컴포넌트 사이에 동일한 데잍 공유를
//위해 사용한다.
//문제점 Context의 Provider로 값을 주는데 Provider 만 쓰면 중간에 데이터를 수정이
//안되서 커스터마이징(고객맞춤)을 해줘야 한다   매개변수가 children
//함수로 한번 감싸면서 내부에서 useState를 통해서 데이터 함수들을 json형태로
//외부로 노출시킬 수 있다.
//외부로 함수를 노출할때 바로 해도 되고 아니면 useReducer를 통해서 state와
//함수를 분리해서 사용하기도 한다
//컨텍스트에 부여된 값은 F5 버튼 누르면 지워진다.

//컨텍스트 내용을 로컬스토리지나 세션, 쿠키등에 저장한다
//any :자바로 따지면 Object역할

const saveStateToLocalStorage = (key: string, state: any) => {
    //키와 값 구조 , java의 HashMap, JSON처럼 키와 값
    //json 객체를 => string 구조로 변경한다. JSON.stringfy <=> JSON.parse
    //모던스크립트 라이브러리 : JSON
    //배열은 index로
    //문자열로 정보를 검색할 수 있다. HashMap
    // 컬렉션["loginInfo"] = "값";
    localStorage.setItem(key, JSON.stringify(state));
};

const getStateFromLocalStorage = (key: string) => {
    const savedState = localStorage.getItem(key);
    return savedState ? JSON.parse(savedState) : {};
    //savedState가 null이면 {} 비어있는 JSON객체 반환
    //null이 아니면 읽어온 데이터를 파싱해서 반환한다
};

export {
    AppContext,
    AppProvider,
    saveStateToLocalStorage,
    getStateFromLocalStorage,
}; //컨텍스트랑 컨텍스트 프로바이더 내보내기
