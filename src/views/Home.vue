<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import $ from 'jquery'
import _ from 'lodash'
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  created() {
    $.get('/user', function (res) {
      console.log(res)
    })
    _.isArray([])
  }
}
</script>
