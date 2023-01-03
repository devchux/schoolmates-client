import {
  faBuilding,
  faBuildingColumns,
  faClipboardUser,
  faCode,
  faFileInvoice,
  faGraduationCap,
  faHome,
  faScaleBalanced,
  faSchool,
  faTape,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";

export const dashboardSideBarLinks = {
  admin: [],
  superAdmin: [
    {
      to: "/app/super-admin",
      title: "Home",
      icon: faHome,
    },
    {
      to: "/",
      title: "Assets",
      icon: faTape,
    },
    {
      to: "/",
      title: "Campus",
      icon: faBuildingColumns,
    },
    {
      to: "/",
      title: "Classes",
      icon: faSchool,
    },
    {
      to: "/",
      title: "Code of Conduct",
      icon: faCode,
    },
    {
      to: "/",
      title: "Department",
      icon: faBuilding,
    },
    {
      to: "/",
      title: "Disciplinary Action",
      icon: faScaleBalanced,
    },
    {
      to: "/",
      title: "Reports",
      icon: faFileInvoice,
    },
    {
      to: "/",
      title: "Staffs",
      icon: faClipboardUser,
    },
    {
      to: "/",
      title: "Students",
      icon: faGraduationCap,
    },
    {
      to: "/",
      title: "Vehicles",
      icon: faTruck,
    },
  ],
};
