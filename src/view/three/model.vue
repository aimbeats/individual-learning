<!--
 * @Author: Hakuro
 * @Project:工程文件主界面
 * @Description:
-->
<template>
  <div style="width: 100%; height: 100%">
    <div id="container"></div>
  </div>
</template>
<script>
import * as THREE from "three";
// import { OBJLoader, MTLLoader } from "three-obj-mtl-loader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { DDSLoader } from "three/examples/jsm/loaders/DDSLoader";
// import { CSS2DRenderer, CSS2DObject } from "three-css2drender";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import axios from "axios"; // 引⽤axios
// import ./
var scene;
export default {
  name: "mainIndex",
  data() {
    return {
      camera: null,
      render: null,
      controls: null, //轨道控制器
    };
  },
  mounted() {
    this.initScene(); // 场景
    this.initCamera(); // 相机
    this.initRender(); // 渲染器
    this.initLight(); // 灯光
    this.initControls(); //轨道控制器
    this.initCreateMesh();
    this.initCoord(); // 坐标系
    this.loadMTL();
    // this.renderFn(); // 渲染刷新
    // setTimeout(() => {
    //   this.renderFn(); // 渲染刷新
    // }, 1000);
  },
  methods: {
    /** 初始化场景 */
    initScene() {
      scene = new THREE.Scene();
    },

    /** 初始化相机 */
    initCamera() {
      //PerspectiveCamera(fov,aspect,near,far)
      //fov:代表着视角范围，比如人眼范围差不多接近180，一般游戏中是60到90度
      //aspect:长宽比，如果画面只有一个画布全屏，那么它的宽高就是窗口宽高比
      //near和far加起来是代表项目的渲染范围，near是起点,相机开始渲染的位置，太大的话离相机近的内容无法渲染；far是终点。
      this.camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        10000
      );
      this.camera.position.x = 0;
      this.camera.position.y = 1600;
      this.camera.position.z = 1000;
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
      scene.add(this.camera);
    },

    initRender() {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true, // 是否开启反锯齿，设置为true开启反锯齿。
        alpha: true, // 是否可以设置背景色透明。
        logarithmicDepthBuffer: true, // 模型的重叠部位便不停的闪烁起来。这便是Z-Fighting问题，为解决这个问题，我们可以采用该种方法
      });
      this.renderer.setSize(window.innerWidth, window.innerHeight); // 渲染器的尺寸与windows的尺寸相同
      this.renderer.setClearColor(0x000000, 0.5); // 设置渲染的背景颜色
      this.renderer.setPixelRatio(window.devicePixelRatio); // 设置渲染器的分辨率与浏览器电脑本身的分辨率相同
      // 将渲染器添加到我们的网页中，可以将渲染的内容在网页中显示出来
      let container = document.getElementById("container");
      container.appendChild(this.renderer.domElement);
    },

    initLight() {
      let ambient = new THREE.AmbientLight(0x66ccff, 0.5);
      ambient.position.set(0, 0, 0);
      scene.add(ambient);
      //设置平行光
      let directiona = new THREE.DirectionalLight(0xffde8b, 0.6);
      directiona.position.set(5, 50, 5);
      //开启平行光阴影
      directiona.castShadow = true;
      scene.add(directiona);
    },

    /** 初始化坐标系控件 */
    initCoord() {
      var axes = new THREE.AxisHelper(100);
      scene.add(axes);
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
      // this.controls.maxDistance = 1200;
      // 是否开启右键拖拽
      this.controls.enablePan = true;
    },

    /** 初始模型集合 */
    initCreateMesh() {
      //   axios.get("/modelList.json").then((res) => {
      //     // console.log(res.data.model);
      //     let list = res.data.model;
      //     list.forEach((item) => {
      //       console.log(item.meshObj, item.textureObj, item.pos);
      //       this.createMesh(item.meshObj, item.textureObj, item.pos);
      //     });
      //   });
    },

    /**
     * 创建模型
     * @param meshObj 模型种类
     * @param textureObj 材质对象
     * @param pos 位置信息
     */
    createMesh(meshObj, textureObj, pos) {
      let geometry = new THREE[meshObj.type](meshObj.c, meshObj.g, meshObj.k);
      let material = new THREE[textureObj.type]({
        ...textureObj,
      }); // 材质对象Material
      let mesh = new THREE.Mesh(geometry, material); // 网格模型对象Mesh
      mesh.position.set(pos.x, pos.y, pos.z);
      this.addObj(mesh); // 网格模型添加到场景中
    },

    loadMTL() {
      let that = this;
      // let mtlLoader = new MTLLoader();
      // let objloader = new OBJLoader();
      // mtlLoader.load("/model/city.mtl", function (materials) {
      //   materials.preload();
      //   objloader.load("/model/city.obj", function (obj) {
      //     obj.position.set(0, 0, 0); // 平移位置
      //     that.addObj(obj);
      //   });
      // });
      // const loader = new GLTFLoader();
      let textureLoader = new THREE.TextureLoader();
      let loader = new GLTFLoader();
      var textureNormal = textureLoader.load(
        "./static/test1234/tex_SimpleOffice_01.png"
      );
      loader.load("./static/test1234/test1234.gltf", function (obj) {
        console.log(obj);
        obj.scene.scale.set(100, 100, 200);
        obj.scene.position.set(0, 0, 0); // 平移位置
        // obj.scene.roteteY(Math.PI / 4); // 旋转
        obj.scene.rotation.y = Math.PI / 4;
        obj.scene.traverse(function (gltf) {
          if (gltf.type === "Mesh") {
            gltf.material = new THREE.MeshPhongMaterial({
              color: 0xcccccc,
              map: textureNormal,
              normalScale: new THREE.Vector2(3, 3),
            });
          }
        });
        that.addObj(obj.scene);
        // that.renderFn(); // 渲染刷新
        // scene.add(obj.scene);
      });

      var loader2 = new GLTFLoader();
      loader2.load(
        "./static/2.glb",
        function (glb) {
          console.log(glb.scene);
          glb.scene.position.set(0, 0, 0);
          scene.add(glb.scene);
          that.addObj(glb.scene);
          that.renderFn(); // 渲染刷新
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );
    },

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
