import Vue from 'vue'
import Router from 'vue-router'
import main from '@/view/main'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
const modulesFiles = require.context('./module', true, /\.js$/)
console.log('modulesFiles', modulesFiles)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})
// import offsetWidth from '@/view/css/offsetWidth'
// console.log('modules', ...[...Object.values(modules)].flat())
export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main,
      children: [
        ...[...Object.values(modules)].flat()
      ]
    }
  ]
})
