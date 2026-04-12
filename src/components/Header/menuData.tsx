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
          title: menu.submenu.casePracticalTeaching,
          path: `/${locale}/case-studies/practical-teaching`,
          newTab: false,
        },
        {
          id: 52,
          title: menu.submenu.caseSciTechInnovation,
          path: `/${locale}/case-studies/sci-tech-innovation`,
          newTab: false,
        },
        {
          id: 53,
          title: menu.submenu.caseInnovationCompetition,
          path: `/${locale}/case-studies/innovation-competition`,
          newTab: false,
        },
        {
          id: 54,
          title: menu.submenu.caseTrainingBase,
          path: `/${locale}/case-studies/training-base`,
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
