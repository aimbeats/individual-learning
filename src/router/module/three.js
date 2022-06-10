/*
 * @Author: Hakuro
 * @Project:
 * @Description:
 */
export default [
  {
    path: "/warehouse",
    name: "warehouse",
    component: () => import("@/view/three/project/MainIndex"),
    meta: {
      title: "仓库项目",
      type: "ThreeJs要点",
    },
  },
  {
    path: "/moveBrick",
    name: "moveBrick",
    component: () => import("@/view/three/moveBrick/index"),
    meta: {
      title: "搬砖头",
      type: "ThreeJs要点",
    },
  },
  {
    path: "/basics",
    name: "basics",
    component: () => import("@/view/three/basics"),
    meta: {
      title: "基础三要素+控件",
    },
  },
  {
    path: "/texture",
    name: "texture",
    component: () => import("@/view/three/texture"),
    meta: {
      title: "各类材质",
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
  {
    path: "/model",
    name: "model",
    component: () => import("@/view/three/model"),
    meta: {
      title: "模型导入",
      type: "ThreeJs要点",
    },
  },
];
