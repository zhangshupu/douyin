<template>
  <div class="index">
    <section>
      <router-view></router-view>
    </section>
    <footer>
      <router-link to="/index/home" tag="span">
        首页
      </router-link>
      <router-link to="/index/attention" tag="span">
        关注
      </router-link>
      <router-link to="/index/message" tag="span">
        消息
      </router-link>
      <router-link to="/index/my" tag="span">
        我
      </router-link>
    </footer>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped lang='scss'>
  .index {
    width: 100%;
    height: 100%;
    display: flex;
    background: #e8d5ba;
    flex-direction: column;

    section {
      flex: 1;
    }

    footer {
      width: 100%;
      height: 1rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-top: solid .01rem #eee;
      background: #766e68;
      color: #c5c3c0;
      font-size: .3rem;

      span {
        height: 1rem;
        padding: 0 .2rem;
        box-sizing: border-box;
        line-height: 1rem;
      }

      .router-link-active {
        color: #fff;
        border-bottom: solid .04rem #fff;
      }
    }

  }
</style>