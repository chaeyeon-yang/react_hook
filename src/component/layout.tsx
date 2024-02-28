import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <div>
            <h1>메뉴를 추가해도 되고 안해도 되고</h1>
            <Outlet />
        </div>
    );
}

export default Layout;
