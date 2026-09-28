import {
    FaHome,
    FaBoxOpen,
    FaHeart,
    FaMapMarkerAlt,
    FaUser,
    FaCog,
    FaLock,
    FaSignOutAlt
} from "react-icons/fa";

import UserCard from "./UserCard";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {

    return (
        <div className="bg-white rounded-2xl shadow-sm p-5 sticky top-24">

            <UserCard />

            <div className="mt-8 space-y-2">

                <SidebarItem
                    to="/account"
                    icon={<FaHome />}
                    label="Dashboard"
                />

                <SidebarItem
                    to="/account/orders"
                    icon={<FaBoxOpen />}
                    label="My Orders"
                />

                <SidebarItem
                    to="/account/wishlist"
                    icon={<FaHeart />}
                    label="Wishlist"
                />

                <SidebarItem
                    to="/account/addresses"
                    icon={<FaMapMarkerAlt />}
                    label="Saved Addresses"
                />

                <SidebarItem
                    to="/account/profile"
                    icon={<FaUser />}
                    label="Profile"
                />

                <SidebarItem
                    to="/account/settings"
                    icon={<FaCog />}
                    label="Settings"
                />

                <SidebarItem
                    to="/account/change-password"
                    icon={<FaLock />}
                    label="Change Password"
                />

                <SidebarItem
                    to="/logout"
                    icon={<FaSignOutAlt />}
                    label="Logout"
                    danger
                />

            </div>

        </div>
    );
}