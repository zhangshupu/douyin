<template>
  <div class="home">
    <header>
      <router-link to="/index/home/recommend" tag="span">推荐</router-link>
      <router-link to="/index/home/city" tag="span">北京</router-link>
    </header>
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped lang='scss'>
  .home {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  header {
    width: 100%;
    height: .4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: .7rem;
    span {
      box-sizing: border-box;
      margin: 0 .16rem;
      color: #ece8e3;
      font-size: 0.3rem;
    }

    .router-link-active {
      color: #fff;
    }
  }

  section {
    flex: 1;
  }
</style>