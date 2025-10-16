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
      title: menu.about,
      path: withLocalePath(locale, "/about"),
      newTab: false,
    },
    {
      id: 33,
      title: menu.blog,
      path: withLocalePath(locale, "/blog"),
      newTab: false,
    },
    {
      id: 3,
      title: menu.support,
      path: withLocalePath(locale, "/contact"),
      newTab: false,
    },
    {
      id: 4,
      title: menu.pages,
      newTab: false,
      submenu: [
        {
          id: 44,
          title: menu.submenu.blogSidebar,
          path: withLocalePath(locale, "/blog-sidebar"),
          newTab: false,
        },
        {
          id: 45,
          title: menu.submenu.blogDetails,
          path: withLocalePath(locale, "/blog-details"),
          newTab: false,
        },
        {
          id: 48,
          title: menu.submenu.error,
          path: withLocalePath(locale, "/error"),
          newTab: false,
        },
      ],
    },
  ];
};

export default buildMenu;
