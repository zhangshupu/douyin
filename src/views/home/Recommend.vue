<template>
  <div class="recommend" @click="clickDH($event)">
    <div class="top">{{list.name}}</div>
    <div class="img">
      <!-- <img src="../../assets/tp.jpg" alt=""> -->
      <iframe frameborder="0" src="https://v.qq.com/txp/iframe/player.html?autoPlay=true&vid=w0357ptsfjx"
        allowFullScreen="true" allowtransparency class="video"></iframe>
      <p>@一禅经典录语</p>
      <em :class="['danmu',(index%2)?'danmu1':'']" v-for="(item,index) in danmuArr" :key="index">{{item.text}}</em>
    </div>
    <div class="main">
      <p v-html="list.title"></p>
      <p>{{list.name1}}</p>
    </div>
    <div class="right">
      <span>
        <img src="../../assets/images/xhs_02.gif" alt="">
      </span>
      <em @click="changeDianzan">
        <img src="../../assets/images/xing_01.gif" alt="">
        <p>{{list.dianzan}}</p>
      </em>
      <em @click="pinglun">
        <img src="../../assets/images/xx_01.gif" alt="">
        <p>{{list.pinglun}}</p>
      </em>
      <em>
        <img src="../../assets/images/wx_01.gif" alt="">
        <p>{{list.zhuanfa}}</p>
      </em>
      <span class="span">
        <img src="../../assets/images/ren_03.gif" alt="">
      </span>
    </div>
    <div :class="['box',list.isShow?'box1':'']">
      <div class="x" @click="guanbi">X</div>
      <p>815条讨论</p>
      <div class="wrapper" ref="middleWrapper">
        <ul class="content">
          <li v-for="(items,ind) in list.list" :key="ind" v-if="ind<cont">
            <dl>
              <dt>
                <img src="../../assets/images/ren_03.gif" alt="">
              </dt>
              <dd>
                <h2>@{{items.name}}</h2>
                <p>{{items.text}}</p>
                <h3 v-text="changeTime(items.time)"></h3>
              </dd>
              <span @click="changeListDianzan(ind)">
                <img src="../../assets/images/xing_01.gif" alt="">
                <p>{{items.dianzan}}</p>
              </span>
            </dl>
          </li>
        </ul>
      </div>
      <div class="input">
        <input type="text" placeholder="有爱评论，说点好听的~" v-model="value">
        <span @click="fabu(value)">发布</span>
      </div>
    </div>
    <div class="xing" ref="xing" v-if="isxingshow" :style="style">
      <em v-for="(item,index) in imgList" :key="index">
        {{item}}
      </em>
    </div>
  </div>
</template>

<script>
  import {
    mapState,
    mapMutations,
    mapActions
  } from 'vuex'
  import BScroll from 'better-scroll'
  export default {
    data() {
      return {
        value: '',
        cont: 5,
        time: 0,
        imgList: [],
        style: {
          top: '',
          left: ''
        },
        danmuArr: [],
        isxingshow: false
      }
    },
    mounted() {
      this.scrollFn();
      this.getData();
      let a = -2;
      let b = -1;
      setInterval(() => {
        a += 2;
        b += 2;
        this.danmuArr = [];
        if (this.list.list[a] && this.list.list[b]) {
          this.danmuArr.push(this.list.list[a])
          this.danmuArr.push(this.list.list[b])
        } else {
          a = 0;
          b = 1;
          this.danmuArr.push(this.list.list[a])
          this.danmuArr.push(this.list.list[b])
        }
      }, 3000)
    },
    computed: {
      ...mapState({
        list: store => store.index.list
      }),
      changeTime(time) {
        return function (time) {
          let newdata = +new Date
          if ((newdata - time) / 1000 / 60 > 2) {
            if ((newdata - time) / 1000 / 60 / 60 / 24 > 1) {
              return `${Math.floor((newdata - time) / 1000 / 60/60/24)}天前`
            }
            if ((newdata - time) / 1000 / 60 / 60 > 1) {
              return `${Math.floor((newdata - time) / 1000 / 60/60)}小时前`
            } else {
              return `${Math.floor((newdata - time) / 1000 / 60)}分钟前`
            }

          } else {
            return '刚刚'
          }
        }
      }

    },
    methods: {
      ...mapActions({
        getData: 'index/getData'
      }),
      ...mapMutations({
        pinglun: 'index/changePinglun',
        guanbi: 'index/changePinglun',
        changeDianzan: 'index/changeDianzan',
        fabu: 'index/changeList',
        changeListDianzan: 'index/changeListDianzan'
      }),
      scrollFn() {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.middleWrapper, {
              click: true,
              scrollY: true,
              probeType: 3
            });
          } else {
            this.scroll.refresh();
          }
          //touchEnd（手指离开以后触发） 通过这个方法来监听下拉刷新
          this.scroll.on('touchEnd', (pos) => {
            // 下拉动作
            if (pos.y > 50) {

            }
            //上拉加载 总高度>上拉的高度+30 触发加载更多
            if (this.scroll.maxScrollY > pos.y + 30) {
              let sum = this.cont
              this.cont = sum += 5;
              //使用refresh 方法 来更新scroll  解决无法滚动的问题
              this.scroll.refresh()
            }
          })
        });
      },
      clickDH(e) {
        this.isxingshow = true
        let time2 = +new Date()
        if (time2 - this.time < 300) {
          this.style = {
            top: `${e.pageY-50}px`,
            left: `${e.pageX-50}px`,
          }
          this.imgList.push('♥')
          this.time = new Date()
          setTimeout(() => {
            this.isxingshow = false
            this.imgList = []
          }, 2000)
        } else {
          this.isxingshow = false
          this.imgList = []
          this.time = new Date()
        }
      }
    }
  }
</script>

<style scoped lang='scss'>
  .recommend {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .img {
      width: 100%;
      height: auto;
      margin-top: .06rem;
      position: relative;

      >p {
        font-size: .35rem;
        position: absolute;
        bottom: .2rem;
        left: .3rem;
        color: #fff;
      }

      iframe {
        height: 210px;
        width: 100%;
        display: block;
        z-index: 10;
      }
    }

    .danmu {
      padding: .05rem .3rem;
      background: rgba(255, 0, 0, .5);
      position: absolute;
      right: 0;
      top: .2rem;
      color: #fff;
      transform: translateX(100%);
      animation: danmu 3s linear infinite forwards;
    }

    .danmu1 {
      right: 0;
      top: .8rem;
      animation: danmu 3s linear 1s infinite forwards;
    }
  }

  @keyframes danmu {
    0% {
      transform: translateX(100%)
    }

    100% {
      transform: translateX(-400px)
    }
  }

  .top {
    font-size: .5rem;
    font-weight: bold;
    text-align: center;
    margin-top: 2rem;
  }

  .main {
    flex: 1;
    width: 100%;
    background: #a29889;

    p {
      padding-left: .3rem;
      box-sizing: border-box;
      font-size: .3rem;
      color: #fff;
      margin-top: .07rem;
      padding-right: 1.8rem;
    }
  }

  .right {
    position: absolute;
    right: .3rem;
    top: 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 999;

    p {
      color: #fff;
    }

    span {
      width: 1rem;
      display: block;

      >img {
        width: 100%;
      }
    }

    .span {
      margin-top: 1rem;
    }

    em {
      width: .7rem;
      display: block;
      margin-top: .2rem;

      >img {
        width: 100%;
      }
    }
  }

  .box {
    width: 100%;
    height: 70%;
    position: fixed;
    bottom: -100%;
    z-index: 9999;
    left: 0;
    background: rgba(0, 0, 0, .7);
    border-radius: .2rem .2rem 0 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: all .3s;

    >p {
      width: 100%;
      color: #ccc;
      text-align: center;
      font-size: .25rem;
      padding: .2rem 0;
      box-sizing: border-box;
    }

    >div.x {
      position: absolute;
      right: .2rem;
      top: .3rem;
      font-size: .4rem;
      color: #fff;

    }

    .wrapper {
      flex: 1;
      width: 100%;
      height: 100%;
      margin-top: .2rem;
      overflow: hidden;
      overflow: auto;
    }

    ul {
      width: 100%;

      li {
        width: 100%;
        padding: .3rem;
        box-sizing: border-box;
        border-bottom: solid .01rem #ccc;

        dl {
          width: 100%;
          display: flex;
          align-items: center;

          dt {
            width: .8rem;

            >img {
              width: 100%;
              display: block;
            }
          }

          dd {
            flex: 1;
            margin-left: .3rem;
            color: #fff;
          }
        }

        span {
          width: .5rem;
          color: #fff;
          text-align: center;

          >img {
            width: 100%;
            display: block;
          }
        }
      }
    }

    .input {
      width: 100%;
      height: 1rem;
      background: #000;
      align-items: center;
      display: flex;
      justify-content: space-between;

      input {
        width: 70%;
        height: .7rem;
        padding-left: .1rem;
        box-sizing: border-box;
        background: #000;
        outline: none;
        -webkit-appearance: none;
        color: #eee;
      }

      span {
        color: #ccc;
        margin-right: .1rem;
      }
    }
  }

  .box1 {
    bottom: 0;
  }

  .xing {
    width: 2rem;
    height: 2rem;
    position: absolute;
    opacity: 1;

    >em {
      position: absolute;
      font-size: 3rem;
      color: #f00;
      float: left;
      top: -1.6rem;
      left: .04rem;
      animation: xing 1s forwards;
    }
  }

  @keyframes xing {
    0% {
      opacity: 1;
      transform: translateY(0px) scale(1)
    }

    30% {
      opacity: .3;
      transform: translateY(-30px) scale(1.3)
    }

    100% {
      opacity: 0;
      transform: translateY(-50px) scale(1)
    }
  }
</style>