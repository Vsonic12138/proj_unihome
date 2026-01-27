import { Menu } from "@/types/menu";

const buildMenu = (
  locale: string,
  menu: any,
): Menu[] => {

  return [
    {
      id: 1,
      title: menu.home,
      path: `/${locale}`,
      newTab: false,
    },
    {
      id: 2,
      title: menu.products,
      path: `/${locale}/products`,
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
          path: `/${locale}/developers/knowledge-base`,
          newTab: false,
        },
        {
          id: 32,
          title: menu.submenu.openSource,
          path: `/${locale}/developers/open-source`,
          newTab: false,
        },
      ],
    },
    {
      id: 4,
      title: menu.customSolutions,
      path: `/${locale}/custom-solutions`,
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
          path: `/${locale}/case-studies/universities`,
          newTab: false,
        },
        {
          id: 52,
          title: menu.submenu.caseK12,
          path: `/${locale}/case-studies/k12`,
          newTab: false,
        },
        {
          id: 53,
          title: menu.submenu.caseCoResearch,
          path: `/${locale}/case-studies/co-research`,
          newTab: false,
        },
      ],
    },
    {
      id: 6,
      title: menu.about,
      path: `/${locale}/about`,
      newTab: false,
    },
  ];
};

export default buildMenu;
