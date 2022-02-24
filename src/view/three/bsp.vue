<!--
 * @Author: Hakuro
 * @Project: BSP网格组合
 * @Description:
-->
<template>
    <div style="width:100%;height:100%">
        <div id="container"></div>
    </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// const ThreeBSP = require('tthreebsp')(THREE)
export default {
  name: 'index',
  data () {
    return {
      scene: null,
      camera: null,
      renderer: null,
      controls: null
    }
  },
  mounted () {
    // this.initRender() // 渲染器
    // this.initScene() // 场景
    // this.initCamera() // 相机
    // this.initLight() // 灯光
    // this.initControls() // 轨道控制器
    // this.createMesh() // 创建模型
    // this.renderFn() // 渲染刷新
  },
  methods: {
    /** 初始化场景 */
    initScene () {
      this.scene = new THREE.Scene()
    },
    /** 初始化相机 */
    initCamera () {
      // 透视投影相机
      this.camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        1000
      )
      // 设置相机位置
      this.camera.position.x = 100
      this.camera.position.y = 300
      this.camera.position.z = 200
      // 设置相机朝向
      this.camera.lookAt(this.scene.position)
      // 放入场景
      this.scene.add(this.camera)
    },
    /** 初始化渲染器 */
    initRender () {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true, // 是否开启反锯齿，设置为true开启反锯齿。
        alpha: true, // 是否可以设置背景色透明。
        logarithmicDepthBuffer: true // 模型的重叠部位便不停的闪烁起来。这便是Z-Fighting问题，为解决这个问题，我们可以采用该种方法
      })
      this.renderer.setSize(window.innerWidth, window.innerHeight) // 渲染器的尺寸与windows的尺寸相同
      this.renderer.setClearColor(0xb9d3ff) // 设置渲染的背景颜色
      this.renderer.setPixelRatio(window.devicePixelRatio) // 设置渲染器的分辨率与浏览器电脑本身的分辨率相同
      // 将渲染器添加到我们的网页中，可以将渲染的内容在网页中显示出来
      let container = document.getElementById('container')
      container.appendChild(this.renderer.domElement)
    },
    /** 初始化灯光 */
    initLight () {
      let ambient = new THREE.AmbientLight(0x66ccff, 1)
      ambient.position.set(0, 0, 0)
      this.scene.add(ambient)
    },
    /** 初始化轨道控制器控件 */
    initControls () {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      // controls.addEventListener( 'change', render );
      // 使动画循环使用时阻尼或自转 意思是否有惯性
      this.controls.enableDamping = true
      // 动态阻尼系数 就是鼠标拖拽旋转灵敏度
      // controls.dampingFactor = 0.25;
      // 是否可以缩放
      this.controls.enableZoom = true
      // 是否自动旋转
      this.controls.autoRotate = true
      // 设置相机距离原点的最远距离
      this.controls.minDistance = 200
      // 设置相机距离原点的最远距离
      this.controls.maxDistance = 600
      // 是否开启右键拖拽
      this.controls.enablePan = true
    },
    createMesh () {
      // let cubeGeometry = new THREE.BoxGeometry(100, 100, 100) // 创建一个立方体几何对象Geometry
      // let cubeMaterial = new THREE.MeshLambertMaterial({
      //   color: 0x0000ff,
      //   opacity: 0.8,
      //   transparent: true
      // }) // 材质对象Material
      // let cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial) // 网格模型对象Mesh
      // let cubeBSP = new ThreeBSP(cubeMesh)

      // let barGeometry = new THREE.SphereGeometry(70, 40, 40) // 创建一个球体
      // let barMaterial = new THREE.MeshLambertMaterial({
      //   color: 0x66ccff,
      //   opacity: 1,
      //   transparent: true
      // }) // 材质对象Material
      // let barMesh = new THREE.Mesh(barGeometry, barMaterial) // 网格模型对象Mesh
      // let barBSP = new ThreeBSP(barMesh)

      // let result = cubeBSP.subtract(barBSP).toMesh()
      // let resultMesh = new THREE.Mesh(result, barMaterial)
      // this.addObj(cubeMesh) // 网格模型添加到场景中
      // this.addObj(barMesh) // 网格模型添加到场景中
      // this.addObj(resultMesh) // 网格模型添加到场景中
    },
    /** 添加对象进场景 */
    addObj (obj) {
      this.scene.add(obj)
    },
    /** 渲染刷新 */
    renderFn: function () {
      requestAnimationFrame(this.renderFn)
      this.controls.update()
      this.renderer.render(this.scene, this.camera)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
