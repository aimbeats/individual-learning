<!--
 * @Author: Hakuro
 * @Project:搬砖头
 * @Description:
-->
<template>
  <div class="main-brick">
    <div class="fix-data">
      <div class="data-box">
        <label>箱子长宽高：</label>
        <el-input-number
          v-model="boxSize1"
          placeholder="箱子长"
          style="margin-top: 10px"
        />
        <el-input-number
          v-model="boxSize2"
          placeholder="箱子宽"
          style="margin-top: 10px"
        />
        <el-input-number
          v-model="boxSize3"
          placeholder="箱子高"
          style="margin-top: 10px"
        />
        <el-button @click="loadBox" style="margin-top: 10px"
          >建立箱子</el-button
        >
      </div>
      <div class="data-brick">
        <label>砖头长宽高：</label>
        <el-input-number
          v-model="brickSize1"
          placeholder="砖头长"
          style="margin-top: 10px"
        />
        <el-input-number
          v-model="brickSize2"
          placeholder="砖头宽"
          style="margin-top: 10px"
        />
        <el-input-number
          v-model="brickSize3"
          placeholder="砖头高"
          style="margin-top: 10px"
        />
        <label>砖头xyz位置：</label>
        <el-input-number
          v-model="posX"
          placeholder="X轴"
          style="margin-top: 10px"
        />
        <el-input-number
          v-model="posY"
          placeholder="Y轴"
          style="margin-top: 10px"
        />
        <el-input-number
          v-model="posZ"
          placeholder="Z轴"
          style="margin-top: 10px"
        />
        <label>砖头旋转：</label>
        <el-input-number
          v-model="rotateX"
          placeholder="X轴"
          style="margin-top: 10px"
        />
        <el-input-number
          v-model="rotateY"
          placeholder="Y轴"
          style="margin-top: 10px"
        />
        <el-input-number
          v-model="rotateZ"
          placeholder="Z轴"
          style="margin-top: 10px"
        />
        <el-button @click="loadBri" style="margin-top: 10px"
          >创建砖头</el-button
        >
        <el-button @click="test" style="margin-top: 10px">删除测试</el-button>
      </div>
    </div>
    <div id="container"></div>
  </div>
</template>
<script>
import * as THREE from "three";
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
      meshList: [],
      boxSize1: 0,
      boxSize2: 0,
      boxSize3: 0,
      brickSize1: 0,
      brickSize2: 0,
      brickSize3: 0,
      posX: 0,
      posY: 0,
      posZ: 0,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
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
    // this.loadBri();
    this.renderFn(); // 渲染刷新
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

    /** 建立箱子 */
    loadBox() {
      let c = this.boxSize1 || 3400,
        k = this.boxSize2 || 1200,
        g = this.boxSize3 || 300,
        textureObj = {
          type: "MeshPhongMaterial",
          color: "#858585",
          opacity: 0.9,
        };
      let mesh1 = {
          meshObj: {
            type: "BoxGeometry",
            c: c,
            k: k,
            g: 1,
          },
          textureObj: textureObj,
          pos: {
            x: 0,
            y: 0,
            z: 0,
          },
        },
        mesh2 = {
          meshObj: {
            type: "BoxGeometry",
            c: c,
            k: 1,
            g: g,
          },
          textureObj: textureObj,
          pos: {
            x: 0,
            y: g / 2,
            z: k / 2,
          },
        },
        mesh3 = {
          meshObj: {
            type: "BoxGeometry",
            c: c,
            k: 1,
            g: g,
          },
          textureObj: textureObj,
          pos: {
            x: 0,
            y: g / 2,
            z: (-1 * k) / 2,
          },
        },
        mesh4 = {
          meshObj: {
            type: "BoxGeometry",
            c: 1,
            k: k,
            g: g,
          },
          textureObj: textureObj,
          pos: {
            x: (-1 * c) / 2,
            y: g / 2,
            z: 0,
          },
        },
        mesh5 = {
          meshObj: {
            type: "BoxGeometry",
            c: 1,
            k: k,
            g: g,
          },
          textureObj: textureObj,
          pos: {
            x: c / 2,
            y: g / 2,
            z: 0,
          },
        };
      this.createMesh(mesh1.meshObj, mesh1.textureObj, mesh1.pos);
      this.createMesh(mesh2.meshObj, mesh2.textureObj, mesh2.pos);
      this.createMesh(mesh3.meshObj, mesh3.textureObj, mesh3.pos);
      this.createMesh(mesh4.meshObj, mesh4.textureObj, mesh4.pos);
      this.createMesh(mesh5.meshObj, mesh5.textureObj, mesh5.pos);
    },

    /** 删除测试 */
    test() {
      // const group = new THREE.Group();
      // group.traverse(function (obj) {
      //   console.log("obj", obj);
      // });
      console.log("list", scene);
      // 删除场景对象的子对象网格模型Mesh
      // scene.remove(group);
      scene.children.forEach((element) => {
        // console.log(element);
        if (element.type == "Mesh" || element.type == "Scene") {
          console.log(element);
          this.removeObj(element);
        }
      });
    },
    /**
     * 创建模型
     * @param meshObj 模型种类
     * @param textureObj 材质对象
     * @param pos 位置信息
     */
    createMesh(
      meshObj,
      textureObj,
      pos,
      rotateX = 0,
      rotateY = 0,
      rotateZ = 0
    ) {
      let geometry = new THREE[meshObj.type](meshObj.c, meshObj.g, meshObj.k);
      let material = new THREE[textureObj.type]({
        ...textureObj,
      }); // 材质对象Material
      let mesh = new THREE.Mesh(geometry, material); // 网格模型对象Mesh
      mesh.position.set(pos.x, pos.y, pos.z);
      mesh.rotation.x = rotateX;
      mesh.rotation.y = rotateY;
      mesh.rotation.z = rotateZ;
      this.addObj(mesh); // 网格模型添加到场景中
    },

    loadBri() {
      let mesh = {
        meshObj: {
          type: "BoxGeometry",
          c: this.brickSize1,
          k: this.brickSize2,
          g: this.brickSize3,
        },
        textureObj: {
          type: "MeshPhongMaterial",
          color: "#858585",
          opacity: 0.9,
        },
        pos: {
          x: this.posX,
          y: this.posY,
          z: this.posZ,
        },
      };
      this.createMesh(
        mesh.meshObj,
        mesh.textureObj,
        mesh.pos,
        this.rotateX,
        this.rotateY,
        this.rotateZ
      ); // 网格模型添加到场景中
      // that.addObj(obj.scene);
    },

    addObj(obj) {
      // this.meshList.push(obj);
      scene.add(obj);
    },
    removeObj(obj) {
      scene.remove(obj);
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
<style lang="scss" scoped>
.main-brick {
  position: relative;
  width: 100%;
  height: 100%;
  #container {
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    overflow: hidden;
  }
  .data-box,
  .data-brick {
    display: flex;
    flex-flow: column;
  }
  .data-brick {
    margin-left: 10px;
  }
  .fix-data {
    position: fixed;
    display: flex;
    // flex-flow: column;
    right: 20px;
    min-width: 150px;
    min-height: 200px;
    padding: 10px;
    background: #000;
    color: #66ccff;
    z-index: 20;
  }
}
</style>
