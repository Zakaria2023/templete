import { uniqueId } from "lodash";

const Menuitems = [
  {
    id: uniqueId(),
    title: "Academic",
    icon: "tabler:book",
    href: "/academic",
    children: [
      {
        id: uniqueId(),
        title: "Students",
        icon: "tabler:users",
        href: "/academic/students",
      },
      {
        id: uniqueId(),
        title: "Teachers",
        icon: "tabler:chalkboard",
        href: "/academic/teachers",
      },
    ],
  },
  {
    id: uniqueId(),
    title: "Settings",
    icon: "tabler:settings-2",
    href: "/settings",
    children: [
      {
        id: uniqueId(),
        title: "School Settings",
        icon: "tabler:school",
        href: "/settings/school",
      },
      {
        id: uniqueId(),
        title: "Academic Year",
        icon: "tabler:calendar-stats",
        href: "/settings/academic-year",
      },
    ],
  },
];

export default Menuitems;
