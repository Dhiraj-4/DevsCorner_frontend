import { NavbarProfileImage } from "../../profile image/navbarProfileImage.jsx";

export function Owner({ owner }) {

    return (
        <div 
        className="flex justify-around items-center gap-2"
        key={owner._id}
        >
            <NavbarProfileImage profileImage={owner?.profileImage}/>

            <div className="flex flex-col">
                <span className="font-bold">
                    {owner.fullName}
                </span>
                <span>
                    @{owner.userName}
                </span>
            </div>
        </div>
    )
}