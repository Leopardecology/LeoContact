import {Outlet} from "react-router-dom";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";

const DashLayout = () => {
    return (
        <div className="app-container">
            <DashHeader/>
            <div className="main-content">
                <Outlet/>
            </div>
            <DashFooter/>
        </div>
    );
};
export default DashLayout;
