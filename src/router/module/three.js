/*
 * @Author: Hakuro
 * @Project:
 * @Description:
 */
export default [
  {
    path: "/basics",
    name: "basics",
    component: () => import("@/view/three/basics"),
    meta: {
      title: "基础三要素+控件",
      type: "ThreeJs要点",
    },
  },
  {
    path: "/bsp",
    name: "bsp",
    component: () => import("@/view/three/bsp"),
    meta: {
      title: "BSP网格组合",
    },
  },
];
