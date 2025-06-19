import { Outlet } from "react-router-dom";
import PublicNavbar from "../navbars/publicNavbar.jsx";

export default function PublicLayout() {


    return (
        <>
        <PublicNavbar/>
        <main>
            <Outlet/>
        </main>
        </>
    )
}