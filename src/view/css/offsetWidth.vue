<!--
 * @Author: Hakuro
 * @Project: offsetWidth盒模型
 * @Description:
-->
<template>
  <div style="width: 100%; height: 100%">
    <h2>正常情况下:offsetWidth：width + padding + border</h2>
    <div id="one" class="public">
      <p>{{ "当前offsetWidth=" + styleOne.offsetWidth }}</p>
      <p>{{ "width=" + styleOne.width }}</p>
      <p>{{ "padding=" + styleOne.padding }}</p>
      <p>{{ "border=" + styleOne.border }}</p>
      <p>{{ "margin=" + styleOne.margin }}</p>
    </div>
    <h2>
      设置box-sizing:border-box时:offsetWidth：width;这会导致与实际的相比缩小了一些，毕竟要强行等于width，意味着实际width的宽度变小了
    </h2>
    <div id="two" class="public">
      <p>{{ "当前offsetWidth=" + styleTwo.offsetWidth }}</p>
      <p>{{ "width=" + styleTwo.width }}</p>
      <p>{{ "padding=" + styleTwo.padding }}</p>
      <p>{{ "border=" + styleTwo.border }}</p>
      <p>{{ "margin=" + styleTwo.margin }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "OffsetWidth",
  data() {
    return {
      styleOne: {},
      styleTwo: {},
    };
  },
  computed: {},
  mounted() {
    let one = document.getElementById("one");
    let styleOne = window.getComputedStyle(one, null);
    let two = document.getElementById("two");
    let styleTwo = window.getComputedStyle(two, null);
    this.styleOne = {
      offsetWidth: one.offsetWidth,
      width: styleOne.width,
      padding: styleOne.padding,
      border: styleOne.border,
      margin: styleOne.margin,
    };
    this.styleTwo = {
      offsetWidth: two.offsetWidth,
      width: styleTwo.width,
      padding: styleTwo.padding,
      border: styleTwo.border,
      margin: styleTwo.margin,
      wid: two.style.width,
    };
  },
  methods: {},
};
</script>
<style scoped>
#two {
  box-sizing: border-box;
}
.public {
  width: 300px;
  height: 300px;
  padding: 20px;
  margin: 20px;
  border: 5px solid #f00000;
  background: #66ccff;
}
</style>
