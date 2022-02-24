<!--
 * @Author: Hakuro
 * @Project: offsetWidth盒模型
 * @Description:
-->
<template>
    <div style="width:100%;height:100%">
        <!-- <h2>正常情况下:offsetWidth：width + padding + border</h2> -->
        <div id="one" class="public">
          <p>aaaa</p>
          <p></p>
          <p></p>
          <p></p>
          <p>bbbbbbbb</p>
        </div>
        <div id="two" class="public">
          <p>aaaa</p>
          <p></p>
          <p></p>
          <p></p>
          <p>bbbbbbbb</p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      styleOne: {},
      styleTwo: {}
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {}
}
</script>
<style scoped>
p{
  margin:0
}
#one p,#two p{
  display: block;
  margin-top:15px;
  margin-bottom:15px;
}
</style>
