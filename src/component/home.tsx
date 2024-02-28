import MyButton from "./mybutton";
import { useState, useEffect, useContext } from "react";
import { AppContext, getStateFromLocalStorage } from "./mycontext";
import axios from "axios";
import { PersonInfoType } from "./type/commonType";
type Status = "idle" | "loading" | "success" | "error";

function Home() {
    let context = useContext(AppContext);

    const [enabled, setEnabled] = useState<boolean>(false);
    const [username, setUserName] = useState<string>("임꺽정");
    const [fruit, setFruit] = useState<string[]>([
        "사과",
        "수박",
        "오렌지",
        "딸기",
        "참외",
    ]);
    const [status, setStatus] = useState<Status>("loading");
    const [userInfo, setUserInfo] = useState<{ name: string; age: number }>({
        name: "홍길동",
        age: 23,
    });
    //타입스크립트를 위한 타입을 만들고
    const [personInfo, setPersonInfo] = useState<PersonInfoType>();

    //axios요청을 해놓고 요청 응답을 안받고 페이지 이동을 하거나 하면
    //unmount 상황이 벌어진다. 컴포넌트가 메모리에서 제거되고 있는데
    //백그라운드에서 아직 작동중인 axios나 fetch구문을 취소시킨다.
    //AbortController - 네트워크 중단을 요청할 수 있는 클래스이다.
    //AbortController 객체를 생성해서  asios.get함수의 매개변수에 전달하거나
    //하면 끝나고 나가버릴때  AbortController 자체적으로 네트워크 신호를 받아가지고 있다
    //내부의 abort를 호출하면 메모리 정리작업을 한다

    useEffect(() => {
        console.log("**************");
        //게시판등의 글 읽어올때나 setInterval 사용했을때
        setStatus("loading");
        context.state = getStateFromLocalStorage("appState"); //로그온한 아이디가져오고 다른 정보 불러온다
        //axios 로 가져와서 콘텍스트에 저장하기
        let id = context.state.userid;
        let url = "https://jsonplaceholder.typicode.com/users?id=" + id;
        console.log(url);
        const controller = new AbortController(); //객체가 여기서 만들어져야 한다
        //************************************* */

        axios
            .get(url, { signal: controller.signal })
            .then((res) => {
                console.log("****************");
                //사용자 정보 입력받아서 화면에 출력하기
                console.log(res.data[0]);
                setPersonInfo(res.data[0]);
            })
            .catch((error) => {
                console.log(error);
            });

        //return 함수를 반환하면 이 함수가 호출된다. 자동으로 호출- unmount될때
        //소멸자 역할- clean up함수라고 한다
        return () => {
            console.log("마지막 정리작업을 하고 나간다 ");
            controller.abort(); //메모리 누스 해제, 백그라운드에서 작동중인
            //axios등을 멈추게 할 수 있다
        };
        //SWR - react 의 캐쉬기능 ->네트워크의 데이터를 가져오고 관리하는데 사용된다.
    }, []);

    return (
        <div>
            <h1>
                Home {context.state.userid} {personInfo?.name}
            </h1>
            {/* <MyButton title="타입스크립트" name="홍길동" disabled={true}/><br/>
        <MyButton title="타입스크립트" name="홍길동" disabled={false}/>
        <br/>
        {userInfo.name} {userInfo.age}<br/>
        {username} {enabled?"true":"falsae"}
        {
            fruit.map( (item:string)=>{
                return(<h3>{item}</h3>)
            })
        } */}
            <br />
            현재상태 : {status}
        </div>
    );
}

export default Home;
