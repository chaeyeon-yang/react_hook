//공통타입을 만들자

export interface MyState {
    count: number;
}

//Reducer에 전달할 Action : 함수인데 타입을 미리 지정해야 한다
//type만 지정, 함수타입 2개 더 추가하기
export type CounterAction =
    | { type: "increase" }
    | { type: "decrease" }
    | { type: "reset" }
    | { type: "add"; count: 5 };

//함수의 경우는  export {함수명1, 함수명2 }; ......
//타입의 경우는 type앞에 직접 기술해야 한다

//사칙연산에 필요한 요소들 - 하나로 묶어서 타입을 만들자
export type CalculatorStateType = {
    x: string;
    y: string;
    result: string;
    operator: string;
};

export type CalculatorAction =
    | { type: "ADD"; x: string; y: string }
    | { type: "SUB"; x: string; y: string }
    | { type: "DIV"; x: string; y: string }
    | { type: "MUL"; x: string; y: string }
    | { type: "RESET"; x: string; y: string; result: number; operator: string };

export type CalculatorAction2 =
    | { type: "ADD"; value: CalculatorStateType }
    | { type: "SUB"; value: CalculatorStateType }
    | { type: "DIV"; value: CalculatorStateType }
    | { type: "MUL"; value: CalculatorStateType }
    | { type: "RESET"; value: CalculatorStateType };

//타입마다 반드시 export 시키자
export type StateType = {
    userid: string;
    username: string;
    isLogon: boolean;
    callBack?: (param: boolean) => void; //일의 종료 - useReducer가 안다. 일이 종료하면 호출되길 바라고 함
};

export type LogonAction =
    | { type: "RESET"; value: StateType }
    | { type: "LOGON"; value: StateType }
    | { type: "LOGOUT"; value: StateType };

export type geoType = {
    lat: string;
    lng: string;
};

export type addressType = {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: geoType;
};

export type companyType = {
    name: string;
    catchPhrase: string;
    bs: string;
};

export type PersonInfoType = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: addressType;
    phone: string;
    website: string;
    company: companyType;
};

export type PhotoType = {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
};
