/*
 * @Author: Hakuro
 * @Project:
 * @Description:
 */
export default [
  {
    path: "/test",
    name: "test",
    component: () => import("@/view/html/test"),
    meta: {
      title: "测试用",
      type: "测试用",
    },
  },
];
