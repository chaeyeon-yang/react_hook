import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "./mycontext";
import { PhotoType } from "./type/commonType";
import "./images.css";

function AlbumPhoto() {
    let param = useParams();
    console.log(param.id);
    const [photos, setPhotos] = useState<PhotoType[]>();

    let context = useContext(AppContext);
    useEffect(() => {
        const controller = new AbortController();
        let url =
            "https://jsonplaceholder.typicode.com/photos?albumId=" + param.id;

        axios.get(url, { signal: controller.signal }).then((res) => {
            setPhotos(res.data);
            console.log("photos", res.data);
        });
        let { userid, username } = context.state;

        // return () => {
        //     controller.abort();
        //     // 메모리 누수 해제, 백그라운드에서 작동중인 axios 멈춤
        // };
    }, []);
    return (
        <>
            <h1>선택값: {param.id}</h1>
            {photos?.map((photo: PhotoType, index: number) => {
                return (
                    <img
                        key={index}
                        src={photo.thumbnailUrl}
                        alt="썸네일 이미지"
                    />
                );
            })}
        </>
    );
}

export default AlbumPhoto;
