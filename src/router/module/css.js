/*
 * @Author: Hakuro
 * @Project:
 * @Description:
 */
export default [
  {
    path: "/offsetWidth",
    name: "offsetWidth",
    component: () => import("@/view/css/offsetWidth"),
    meta: {
      title: "盒模型宽度",
      type: "CSS部分要点",
    },
  },
  {
    path: "/margin",
    name: "margin",
    component: () => import("@/view/css/margin"),
    meta: {
      title: "Margin纵向重叠",
    },
  },
];
