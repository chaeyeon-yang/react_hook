import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext, saveStateToLocalStorage } from "./mycontext";
import { findAllByTestId } from "@testing-library/react";
import axios from "axios";

function Logon() {
    let navigate = useNavigate();
    //SPA(single page application) 을 지향 , a 태그 X, location.href X
    //외부사이트로 나갈때는 a 나 location.href를 사용해야 한다
    //Link 나 NavLink 를 사용해야 한다
    //같은페이지에서 이동하려면(다른컴포넌트로 바꾸려면) useNavigate를
    //사용한다.
    const [userid, setUserid] = useState<string>("");
    const [msg, setMsg] = useState<string>("");

    let context = useContext(AppContext);
    let onChange = (e: any) => {
        setUserid(e.target.value);
    };

    //현재 사용안함, redux사용하면 응용가능
    let callBack = (param: boolean): void => {
        if (param == true) {
            navigate("/home", {}); //다른컴포넌트로 상태전달을 한다
        } else {
            alert("로그온 실패");
        }
    };

    let logon = () => {
        //로그온
        if (parseInt(userid) >= 1 && parseInt(userid) <= 10) {
            //axios로 가져와서 콘텍스트에 저장하기
            let url =
                "https://jsonplaceholder.typicode.com/users?id=" +
                context.state.userid;
            axios.get(url).then((res) => {
                console.log(res.data);
                context.dispatch({
                    type: "LOGON",
                    value: {
                        userid: userid,
                        username: "",
                        isLogon: true,
                        callBack: callBack,
                    },
                });
            });
            //첫번째 매개변수는 라우터에서 정의한 url이다. --비동기라서 타이밍이 안맞음
            //상태변경이 나중에 벌어진다.
            //첫번째 인자 -> 함수를 전달, 두번째인자로 시간 :1000이 1초임
            setTimeout(() => {
                navigate("/home", {});
            }, 1000); //페이지 이동
            setMsg("");
        } else {
            //원래 로그온했던거 지워버린다.
            context.dispatch({
                type: "LOGOUT",
                value: {
                    userid: "",
                    username: "",
                    isLogon: false,
                    callBack: callBack,
                },
            });
            setMsg("로그온 실패");
            //로그온 실패시 문구처리
        }
    };

    let logout = () => {
        context.dispatch({
            type: "LOGOUT",
            value: {
                userid: "",
                username: "",
                isLogon: false,
                callBack: callBack,
            },
        });
    };

    return (
        <div>
            <h1>로그온 여부</h1>

            <p></p>
            <input type="text" id="userid" onChange={onChange} value={userid} />
            <h3 style={{ color: "red" }}>{msg}</h3>

            <button type="button" onClick={logon}>
                로그인
            </button>
            <button type="button" onClick={logout}>
                로그아웃
            </button>
        </div>
    );
}

export default Logon;
