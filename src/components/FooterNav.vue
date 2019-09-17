<template>
  <div class="FooterNav">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'FooterNav',
  data () {
    return {
      msg: '页面底部'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.FooterNav h1{ height: 50px;line-height: 50px;}
</style>
