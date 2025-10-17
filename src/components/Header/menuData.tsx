import type { Dictionary, Locale } from "@/i18n/config";
import { withLocalePath } from "@/i18n/utils";
import { Menu } from "@/types/menu";

const buildMenu = (
  locale: Locale,
  menu: Dictionary["header"]["menu"],
): Menu[] => {

  return [
    {
      id: 1,
      title: menu.home,
      path: withLocalePath(locale, "/"),
      newTab: false,
    },
    {
      id: 2,
      title: menu.products,
      path: withLocalePath(locale, "/products"),
      newTab: false,
    },
    {
      id: 3,
      title: menu.developer,
      newTab: false,
      submenu: [
        {
          id: 31,
          title: menu.submenu.knowledgeBase,
          path: withLocalePath(locale, "/developers/knowledge-base"),
          newTab: false,
        },
        {
          id: 32,
          title: menu.submenu.openSource,
          path: withLocalePath(locale, "/developers/open-source"),
          newTab: false,
        },
      ],
    },
    {
      id: 4,
      title: menu.customSolutions,
      path: withLocalePath(locale, "/custom-solutions"),
      newTab: false,
    },
    {
      id: 5,
      title: menu.caseStudies,
      newTab: false,
      submenu: [
        {
          id: 51,
          title: menu.submenu.caseUniversities,
          path: withLocalePath(locale, "/case-studies/universities"),
          newTab: false,
        },
        {
          id: 52,
          title: menu.submenu.caseK12,
          path: withLocalePath(locale, "/case-studies/k12"),
          newTab: false,
        },
        {
          id: 53,
          title: menu.submenu.caseCoResearch,
          path: withLocalePath(locale, "/case-studies/co-research"),
          newTab: false,
        },
      ],
    },
    {
      id: 6,
      title: menu.about,
      path: withLocalePath(locale, "/about"),
      newTab: false,
    },
  ];
};

export default buildMenu;
