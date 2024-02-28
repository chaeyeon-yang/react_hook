import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./component/layout";
import Home from "./component/home";
import Counter1 from "./component/counter1";
import Counter2 from "./component/counter2";
import Counter3 from "./component/counter3";
// import Calculator from "./component/calculator";
import { AppProvider } from "./component/mycontext";
import Log from "./component/log";
import AlbumList from "./component/albumList";
import AlbumPhoto from "./component/albumPhoto";

function App() {
    return (
        <div className="App">
            <AppProvider>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route
                            path="/album/list"
                            element={<AlbumList />}
                        ></Route>
                        <Route
                            path="/album/photo/:id"
                            element={<AlbumPhoto />}
                        ></Route>
                        <Route path="/home" element={<Home />}></Route>
                        <Route index element={<Log />}></Route>
                        <Route path="/counter1" element={<Counter1 />}></Route>
                        <Route path="/counter2" element={<Counter2 />}></Route>
                        <Route path="/counter3" element={<Counter3 />}></Route>
                        {/* <Route
                            path="/calculator"
                            element={<Calculator />}
                        ></Route> */}
                    </Route>
                </Routes>
            </AppProvider>
        </div>
    );
}

export default App;
