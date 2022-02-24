<!--
 * @Author: Hakuro
 * @Project:
 * @Description:
-->
<template>
    <div>
        <nav class="routes">
            <div v-for="(el,i) in routeType" :key="i" class="route_type">
                <div class="route_title">{{el}}</div>
                <ul class="routes_list">
                    <li v-for="(item,index) in routes[el]" :key="index">
                        <router-link :to="item.path">{{item.meta.title}}</router-link>
                    </li>
                </ul>
            </div>
        </nav>
        <article>
          <router-view></router-view>
        </article>
    </div>
</template>

<script>
// import { log } from 'three'
export default {
  data () {
    return {
      routeType: [],
      routes: []
    }
  },
  mounted () {
    // console.log(this.$router.options.routes)
    // debugger
    let lastType = '111'
    console.log('this.$router.options.routes', this.$router.options.routes)
    this.$router.options.routes[0].children.forEach((item, index) => {
      if (item.meta.type && item.meta.type !== lastType) {
        lastType = item.meta.type
        this.routes[lastType] = []
        this.routeType.push(lastType)
      }
      this.routes[lastType].push(item)
      // this.routes.push(item)
    })
    console.log('this.routes', this.routes)
  }
}
</script>

<style scoped>
.routes {
    background: #1e2c30;
    width: 200px;
    padding: 10px;
}
.route_type {
    /* display: flex; */
    font-size: 16px;
    color: #fafffa;
}
.route_title {
    width: 100px;
    line-height: 40px;
}
.route_type:hover .routes_list {
    display: block;
}
.routes_list {
    display: block;
    margin: 5px 0;
    padding: 0;
}
.routes_list li {
    padding-left: 30px;
    line-height: 30px;
    list-style: none;
}
.routes_list :hover{
    background: #04536D;
}
.routes_list a {
    display: block;
    width: 100%;
    height: 100%;
    font-size: 16px;
    text-decoration: none;
    color: #fafffa;
}
</style>
