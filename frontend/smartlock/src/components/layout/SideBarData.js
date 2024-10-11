import { LuLayoutDashboard } from "react-icons/lu";
import { VscGraph } from "react-icons/vsc";
import { LiaIdCard } from "react-icons/lia";
import { VscBriefcase } from "react-icons/vsc";

export const SideBarData = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: <LuLayoutDashboard />,
        cName: 'side-text'
    },

    {
        title: "Historico",
        path: "/historico",
        icon: <VscGraph />,
        cName: 'side-text'
    },

    {
        title: "Permissoes",
        path: "/permissoes",
        icon: <LiaIdCard />,
        cName: 'side-text'
    },

    {
        title: "Acesso",
        path: "/acesso",
        icon: <VscBriefcase />,
        cName: 'side-text'
    },
]