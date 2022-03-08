<!--
 * @Author: Hakuro
 * @Project: BSP组合
 * @Description:
-->
<template>
  <div style="width: 100%; height: 100%">
    <div id="container"></div>
  </div>
</template>
<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
const ThreeBSP = require("three-js-csg")(THREE);
var scene;
export default {
  name: "BasicsThree",
  data() {
    return {
      // scene: null,
      camera: null,
      renderer: null,
      controls: null,
    };
  },
  mounted() {
    this.initRender(); // 渲染器
    this.initScene(); // 场景
    this.initCamera(); // 相机
    this.initLight(); // 灯光
    this.initControls(); // 轨道控制器
    this.initCoord(); // 坐标系
    this.createMesh(); // 创建模型
    this.renderFn(); // 渲染刷新
  },
  methods: {
    /** 初始化场景 */
    initScene() {
      scene = new THREE.Scene();
    },
    /** 初始化相机 */
    initCamera() {
      // 透视投影相机
      this.camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
      // 设置相机位置
      this.camera.position.x = -100;
      this.camera.position.y = 600;
      this.camera.position.z = 400;
      // 设置相机朝向
      this.camera.lookAt(scene.position);
      // 放入场景
      scene.add(this.camera);
    },
    /** 初始化渲染器 */
    initRender() {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true, // 是否开启反锯齿，设置为true开启反锯齿。
        alpha: true, // 是否可以设置背景色透明。
        logarithmicDepthBuffer: true, // 模型的重叠部位便不停的闪烁起来。这便是Z-Fighting问题，为解决这个问题，我们可以采用该种方法
      });
      this.renderer.setSize(window.innerWidth, window.innerHeight); // 渲染器的尺寸与windows的尺寸相同
      this.renderer.setClearColor(0x000000); // 设置渲染的背景颜色
      this.renderer.setPixelRatio(window.devicePixelRatio); // 设置渲染器的分辨率与浏览器电脑本身的分辨率相同
      // 将渲染器添加到我们的网页中，可以将渲染的内容在网页中显示出来
      let container = document.getElementById("container");
      container.appendChild(this.renderer.domElement);
    },
    /** 初始化灯光 */
    initLight() {
      let ambient = new THREE.AmbientLight(0xffffff, 1);
      ambient.position.set(0, 0, 0);
      scene.add(ambient);
    },
    /** 初始化轨道控制器控件 */
    initControls() {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      // controls.addEventListener( 'change', render );
      // 使动画循环使用时阻尼或自转 意思是否有惯性
      this.controls.enableDamping = true;
      // 动态阻尼系数 就是鼠标拖拽旋转灵敏度
      // controls.dampingFactor = 0.25;
      // 是否可以缩放
      this.controls.enableZoom = true;
      // 是否自动旋转
      this.controls.autoRotate = false;
      // 设置相机距离原点的最近距离
      this.controls.minDistance = 200;
      // 设置相机距离原点的最远距离
      this.controls.maxDistance = 1200;
      // 是否开启右键拖拽
      this.controls.enablePan = true;
    },
    /** 初始化坐标系控件 */
    initCoord() {
      var axes = new THREE.AxisHelper(100);
      scene.add(axes);
    },
    /** 创建模型 */
    createMesh() {
      for (let i = 0; i < 4; i++) {
        var meshBox,
          meshCy,
          meshRest,
          boxGeometry = new THREE.BoxGeometry(100, 100, 100), // 创建一个立方体几何对象Geometry
          cyGeometry = new THREE.CylinderGeometry(100, 100, 100), // 创建一个圆柱体几何对象Geometry
          materialBox = new THREE.MeshLambertMaterial({
            color: 0x0000ff,
            wireframe: true, //网格模型以线条的模式渲染
          }), // 材质对象Material
          materialCy = new THREE.MeshLambertMaterial({
            color: 0xfff000,
            wireframe: true, //网格模型以线条的模式渲染
          }); // 材质对象Material
        meshBox = new THREE.Mesh(boxGeometry, materialBox); // 网格模型对象Mesh
        meshBox.position.set(i * 300 - 350, 0, 0);
        meshCy = new THREE.Mesh(cyGeometry, materialCy); // 网格模型对象Mesh
        meshCy.position.set(i * 300 - 450, 0, 0);
        //subtract:差集，union:交集，intersect：并集
        var bspBox = new ThreeBSP(meshBox),
          bspCy = new ThreeBSP(meshCy),
          bspRest;
        switch (i) {
          case 0:
            this.addObj(meshBox); // 网格模型添加到场景中
            this.addObj(meshCy); // 网格模型添加到场景中
            break;
          case 1:
            bspRest = bspCy.subtract(bspBox);
            break;
          case 2:
            bspRest = bspCy.union(bspBox);
            break;
          case 3:
            bspRest = bspCy.intersect(bspBox);

            break;
          default:
            break;
        }
        if (i !== 0) {
          meshRest = bspRest.toMesh();
          meshRest.material = materialBox;
          this.addObj(meshRest); // 网格模型添加到场景中
        }
      }
    },
    /** 添加对象进场景 */
    addObj(obj) {
      scene.add(obj);
    },
    /** 渲染刷新 */
    renderFn: function () {
      requestAnimationFrame(this.renderFn);
      this.controls.update();
      this.renderer.render(scene, this.camera);
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
