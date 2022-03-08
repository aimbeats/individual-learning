<!--
 * @Author: Hakuro
 * @Project:
 * @Description:
-->
<template>
  <div class="main">
    <nav class="routes">
      <div v-for="(el, i) in routeType" :key="i" class="route_type">
        <div class="route_title">{{ el }}</div>
        <ul class="routes_list">
          <li v-for="(item, index) in routes[el]" :key="index">
            <router-link :to="item.path">{{ item.meta.title }}</router-link>
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
  name: "MainN",
  data() {
    return {
      routeType: [],
      routes: [],
    };
  },
  mounted() {
    // console.log(this.$router.options.routes)
    // debugger
    let lastType = "111";
    this.$router.options.routes[0].children.forEach((item) => {
      if (item.meta.type && item.meta.type !== lastType) {
        lastType = item.meta.type;
        this.routes[lastType] = [];
        this.routeType.push(lastType);
      }
      this.routes[lastType].push(item);
      // this.routes.push(item)
    });
  },
};
</script>

<style lang="scss">
.main {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
}
.routes {
  background: #1e2c30;
  min-width: 200px;
  padding: 10px;
  .route_type {
    /* display: flex; */
    font-size: 16px;
    color: #fafffa;
  }
  .route_type:hover .routes_list {
    display: block;
  }
  .route_title {
    width: 100px;
    line-height: 40px;
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
  .routes_list :hover {
    background: #04536d;
  }
  .routes_list a {
    display: block;
    width: 100%;
    height: 100%;
    font-size: 16px;
    text-decoration: none;
    color: #fafffa;
  }
}
article {
  flex: 1;
  padding: 20px;
  overflow: auto;
}
</style>
