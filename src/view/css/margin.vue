<!--
 * @Author: Hakuro
 * @Project: offsetWidth盒模型
 * @Description:
-->
<template>
  <div style="width: 100%; height: 100%">
    <div style="border: 1px solid #f00000">
      <p>
        相邻元素的margin-top和bottom会出现重叠现象，最后展现出来的是最长的那个margin
      </p>
      <div id="one">
        <p>aaaa</p>
        <p>bbbbbbbb</p>
      </div>
    </div>
    <div style="border: 1px solid #f00000">
      <p>空白的行内元素也有重叠现象，因为没有高度</p>
      <div id="two" :class="styleType">
        <p>aaaa</p>
        <p></p>
        <span></span>
        <p><span></span></p>
        <p>bbbbbbbb</p>
      </div>
    </div>
    <div>
      <h3>解决方案</h3>
      <h4>外层元素</h4>
      <a @click="styleChange(1)">1、使用padding来代替</a>
      <a @click="styleChange(2)">2、使用overflow</a>
      <h4>内层元素</h4>
      <a @click="styleChange(3)">1、透明边框</a>
      <a @click="styleChange(4)">2、加个padding:1px</a>
    </div>
    <h4>
      ps：纵向重叠并非没有好处，可以应用在上下图片间距，不会出现除最上面和最下面的间距正常其他是两倍间距的问题
    </h4>
  </div>
</template>

<script>
export default {
  name: "MarginBFC",
  data() {
    return {
      styleOne: {},
      styleTwo: {},
      styleType: "style_type_0",
    };
  },
  computed: {},
  mounted() {},
  methods: {
    styleChange(value) {
      this.styleType = "style_type_" + value;
    },
  },
};
</script>
<style scoped>
p {
  margin: 0;
}
a {
  display: block;
  cursor: pointer;
  text-decoration: underline;
}
#one p {
  display: block;
  margin-top: 15px;
  margin-bottom: 15px;
}
.style_type_0 p,
.style_type_0 span {
  margin-top: 15px;
  margin-bottom: 15px;
}
.style_type_1 p,
.style_type_1 span {
  padding-top: 15px;
  padding-bottom: 15px;
}
.style_type_2 p,
.style_type_2 span {
  margin-top: 15px;
  margin-bottom: 15px;
  overflow: hidden;
}
.style_type_3 p,
.style_type_3 span {
  margin-top: 15px;
  margin-bottom: 15px;
  border: 1px solid transparent;
}
.style_type_4 p,
.style_type_4 span {
  margin-top: 15px;
  margin-bottom: 15px;
  padding: 1px;
}
</style>
