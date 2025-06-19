import { Outlet } from "react-router-dom";
import UserNavbar from "../navbars/userNavbar.jsx";

export default function UserLayout() {

    return (
        <>
            <UserNavbar/>
            <main>
                <Outlet/>
            </main>
        </>
    )
}