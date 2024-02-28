//컨텍스트로 부터 사용자 id를 가져와서 화면에 목록을 뿌린다.
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext, getStateFromLocalStorage } from "./mycontext";
//https://jsonplaceholder.typicode.com/albums?userId=2
type ItemType = {
    id: number;
    userId: number;
    title: string;
};
//데이터를 우선 임시로 만든다
const itemData: ItemType[] = [
    { id: 1, userId: 2, title: "제목1" },
    { id: 2, userId: 2, title: "제목2" },
    { id: 3, userId: 2, title: "제목2" },
    { id: 4, userId: 2, title: "제목2" },
    { id: 5, userId: 2, title: "제목2" },
];
function AlbumList() {
    const navigate = useNavigate();
    const [items, setItems] = useState<ItemType[]>([]);
    const [selectItem, setSelectItem] = useState<ItemType>({
        id: -1,
        userId: 0,
        title: "",
    });
    // 선택한 항목이 들어가야 하고 id가 -1인 이유는 데이터가 배열이다.
    // 0~ 데이터 끝까지 -1 값을 넣어놓으면 배열의 인덱스가 유효하지 않다.
    let context = useContext(AppContext);
    useEffect(() => {
        // setItems([...itemData]);
        context.state = getStateFromLocalStorage("appState");
        let id = context.state.userid;
        const controller = new AbortController(); //시스템이 제공하는 클래스다
        //이따가 fetch나 axios사용할때 쓰자
        let url = "https://jsonplaceholder.typicode.com/albums?userId=" + id;

        // 자식 컴포넌트의 경우네는 props로 넘기면 된다.
        // 화면전환 useNavigate

        axios
            .get(url, { signal: controller.signal })
            .then((res) => {
                setItems(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
        return () => {
            controller.abort();
            // 메모리 누수 해제, 백그라운드에서 작동중인 axios 멈춤
        };
    }, []);

    const photoBtnClick = (id: number) => {
        navigate(`/album/photo/${id}`);
    };
    // 항목을 클릭했을 때 선택항목 저장하기
    const itemClick = (item: ItemType) => {
        setSelectItem({ ...item }); // JSON 으로 저장하자
        console.log(item.id, "selected");
    };
    return (
        <div className="container mt-3" style={{ marginTop: "30px" }}>
            <button
                type="button"
                className="button btn-primary"
                disabled={selectItem.id === -1 ? true : false}
                onClick={() => {
                    photoBtnClick(selectItem.id);
                }}
            >
                사진보기
            </button>
            <ul className="list-group list-group-flush">
                {items.map((item: ItemType, key: number) => {
                    return (
                        <li
                            className="list-group-item"
                            style={{
                                textAlign: "left",
                                backgroundColor:
                                    selectItem.id == item.id
                                        ? "lightgray"
                                        : "white",
                            }}
                            key={key}
                            onClick={() => {
                                itemClick(item);
                            }}
                            // parameter가 들어가면 람다로 한 번 둘러싸야함
                        >
                            {item.title}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default AlbumList;
