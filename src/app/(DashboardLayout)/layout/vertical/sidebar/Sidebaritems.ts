export interface ChildItem {
  id?: number | string;
  name?: string;
  icon?: any;
  children?: ChildItem[];
  item?: any;
  url?: any;
  color?: string;
  disabled?: boolean;
  subtitle?: string;
  badge?: boolean;
  badgeType?: string;
}

export interface MenuItem {
  heading?: string;
  name?: string;
  icon?: any;
  id?: number;
  to?: string;
  items?: MenuItem[];
  children?: ChildItem[];
  url?: any;
  disabled?: boolean;
  subtitle?: string;
  badgeType?: string;
  badge?: boolean;
}

import { uniqueId } from "lodash";

const SidebarContent: MenuItem[] = [
  {
    heading: "Academic",
    children: [
      {
        name: "Students",
        icon: "tabler:users",
        id: uniqueId(),
        url: "/academic/students",
      },
      {
        name: "Teachers",
        icon: "tabler:chalkboard",
        id: uniqueId(),
        url: "/academic/teachers",
      },
    ],
  },
  {
    heading: "Settings",
    children: [
      {
        name: "School Settings",
        icon: "tabler:school",
        id: uniqueId(),
        url: "/settings/school",
      },
      {
        name: "Academic Year",
        icon: "tabler:calendar-stats",
        id: uniqueId(),
        url: "/settings/academic-year",
      },
    ],
  },
];

export default SidebarContent;
