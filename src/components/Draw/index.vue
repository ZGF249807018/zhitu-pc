<template>
  <div class="inner draw" @mousemove="beginPath($event)">
    <div class="wrap">
      <div class="close" @click="closeBtn">
      </div>
      <canvas
        id="canvas"
        class=""
        width="750"
        height="464"
        @mousedown="canvasDown($event)"
        @mouseup="canvasUp($event)"
        @mousemove="canvasMove($event)"
        @touchstart="canvasDown($event)"
        @touchend="canvasUp($event)"
        @touchmove="canvasMove($event)"
      >
      </canvas>
      <div id="control" class="">
        <div id="canvas-control">
          <span
            v-for="control in controls"
            :title="control.title"
            :class="control.className"
            @click="controlCanvas(control.action)"
          >{{control.innerText}}</span>
        </div>
        <!-- 生成图片-->
        <div id="canvas-drawImage">
          <button class="drawImage" @click="getImage()">保存</button>
        </div>
      </div>
    </div>
    <!--存放图片-->
    <div id="img-box" v-show="imgUrl.length">
      <div class="img-item" v-for="src in imgUrl">
        <img :src="src" name="avatar" alt="签名" id="autograph">
        <span class="fa fa-close" @click="removeImg(src)"></span>
      </div>
    </div>
    <!--上传图片-->

  </div>
</template>

<style>
  @media screen and (max-width: 700px) {
    #img-box,
    #canvas-drawImage h5,
    #canvas-brush {
      display: none;
    }
    #canvas-drawImage button{
      width: auto;
      position: absolute;
      flex: 1;
    }
    .wrap #control {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: row;
      text-align: center;
    }
  }
  .fix-body {
    position: fixed !important;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
  }
  .inner.draw {
    display: flex;
    flex-direction: row;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }
  .draw h5 {
    margin-bottom: 10px;
  }
  #img-box {
    flex: 1;
    padding-left: 10px;
  }
  #img-box .img-item {
    position: relative;
    display: inline-block;
  }
  #img-box .img-item .fa {
    position: absolute;
    cursor: pointer;
    right: 1px;
    top: -1px;
    font-size: 12px;
    font-weight: 1;
    display: none;
    color: #ccc;
  }
  #img-box .img-item:hover .fa {
    display: block;
  }
  #img-box .img-item .fa:hover {
    color: #333;
  }
  #img-box img {
    border: 1px #ccc solid;
    width: 90px;
    height: 60px;
    margin: 5px;
  }
  .wrap{
    width: 750px;
    height: 500px;
    box-shadow: 0px 0px 25px rgba(35, 102, 253, .7);
    background: #fff;
    position: relative;
    margin: 0 auto;
    margin-top: 100px;
  }
  .fl{
    float: left;
    display: block;
  }
  #canvas{
    cursor: crosshair;
  }
  #control{
    width: 750px;
    height: auto;
    margin-left: 4px;
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 0;
  }
  #control div{
    padding: 5px;
  }
  #canvas-color ul{
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
  #canvas-color ul li{
    float: left;
    display: inherit;
    width: 13px;
    height: 13px;
    border: 3px #fff solid;
    margin: 8px;
    cursor: pointer;
  }
  #canvas-color .active {
    border: 1px solid #333;
  }
  #canvas-brush span{
    display: inline-block;
    width: 20px;
    height: 15px;
    margin-left: 10px;
    cursor: pointer;
  }
  #canvas-brush .small {
    font-size: 12px;
  }
  #canvas-brush .middle {
    font-size: 14px;
  }
  #canvas-brush .big {
    font-size: 16px;
  }

  #canvas-control span{
    width: 150px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    display: inline-block;
    font-size: 14px;
    cursor: pointer;
    background: #f56c6c;
    color: #fff;
    border-radius: 20px;
  }
  #canvas-control .active,
  #canvas-brush .active {
    color: #fff;
  }
  .close{
    cursor: pointer;
    background: url("../../assets/images/close.png") no-repeat;
    background-size: contain;
    width: 40px;
    height: 40px;
    position: absolute;
    right: -47px;
    top: -35px;
  }
  .drawImage {
    width: 150px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    display: inline-block;
    font-size: 14px;
    cursor: pointer;
    background: #409eff;
    border-radius: 20px;
    border: none;
    color: #fff;
  }
</style>

<script>
  import axios from 'axios'
  import html2canvas from 'html2canvas'
  import { addLogo } from '@/api/info'
  export default {
    data() {
      return {
        colors: ['#fef4ac', '#0018ba', '#ffc200', '#f32f15', '#cccccc', '#5ab639'],
        brushs: [{
          className: 'small fa fa-paint-brush',
          lineWidth: 3
        }, {
          className: 'middle fa fa-paint-brush',
          lineWidth: 6
        }, {
          className: 'big fa fa-paint-brush',
          lineWidth: 12
        }],
        context: {},
        imgUrl: [],
        avatar: '',
        file: '',
        canvasMoveUse: false,
        preDrawAry: [],
        nextDrawAry: [],
        middleAry: [],
        config: {
          lineWidth: 1,
          lineColor: '#333',
          shadowBlur: 2
        }
      }
    },
    created() {
    },
    mounted() {
      const canvas = document.querySelector('#canvas')
      this.context = canvas.getContext('2d')
      this.initDraw()
      this.setCanvasStyle()
      document.querySelector('#footer').classList.add('hide-footer')
      document.querySelector('body').classList.add('fix-body')
    },
    destroyed() {
      document.querySelector('#footer').classList.remove('hide-footer')
      document.querySelector('body').classList.remove('fix-body')
    },
    computed: {
      controls() {
        return [
          {
            title: '重写',
            action: 'clear',
            className: (this.preDrawAry.length || this.nextDrawAry.length) ? 'active fa fa-trash' : 'fa fa-trash',
            innerText: '重写'
          }]
      }
    },
    methods: {
      closeBtn() {
        this.$store.commit('SET_DRAWSTATUS', false)
      },
      base64ToBlob(urlData) {
        var arr = urlData.split(',')
        var mime = arr[0].match(/:(.*?);/)[1] || 'image/png'
        var bytes = window.atob(arr[1])
        var ab = new ArrayBuffer(bytes.length)
        var ia = new Uint8Array(ab)
        for (var i = 0;i < bytes.length;i++) {
          ia[i] = bytes.charCodeAt(i)
        }
        return new Blob([ab], {
          type: mime
        })
      },
      getImgUrl() {
        let photoBox = document.querySelector('#autograph')
        let newImgWidth = photoBox.style.offsetWidth
        let newImgHeight = photoBox.style.offsetHeight
        let scale = window.devicePixelRatio
        let that = this
        html2canvas(document.querySelector('#autograph'), {
          width: newImgWidth,
          height: newImgHeight,
          scale: scale,
          useCORS: true
        }).then(canvas => {
          console.log(canvas)
          const dataUrl = canvas.toDataURL()
          const fileImg = that.base64ToBlob(dataUrl)
          const fd = new FormData()
          fd.append('file', fileImg, 'image.jpg')
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          axios.post(addLogo, fd, config).then(res => {
            console.log(res)
            this.$store.commit('SET_AUTOGRAPHURL', res.data.data.url)
          }).catch(res => {
            console.log(res)
          })
        })
      },
      isPc() {
        const userAgentInfo = navigator.userAgent
        const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
        let flag = true
        for (let v = 0;v < Agents.length;v++) {
          if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false
            break
          }
        }
        return flag
      },
      removeImg(src) {
        this.imgUrl = this.imgUrl.filter(item => item !== src)
      },
      initDraw() {
        const preData = this.context.getImageData(0, 0, 600, 400)
        this.middleAry.push(preData)
      },
      canvasMove(e) {
        if (this.canvasMoveUse) {
          console.log('canvasMove')
          const t = e.target
          let canvasX
          let canvasY
          if (this.isPc()) {
            canvasX = e.clientX - t.parentNode.offsetLeft
            canvasY = e.clientY - t.parentNode.offsetTop
          } else {
            canvasX = e.changedTouches[0].clientX - t.parentNode.offsetLeft
            canvasY = e.changedTouches[0].clientY - t.parentNode.offsetTop
          }
          this.context.lineTo(canvasX, canvasY)
          this.context.stroke()
        }
      },
      beginPath(e) {
        const canvas = document.querySelector('#canvas')
        if (e.target !== canvas) {
          console.log('beginPath')
          this.context.beginPath()
        }
      },
      canvasUp(e) {
        console.log('canvasUp')
        const preData = this.context.getImageData(0, 0, 600, 400)
        if (!this.nextDrawAry.length) {
          this.middleAry.push(preData)
        } else {
          this.middleAry = []
          this.middleAry = this.middleAry.concat(this.preDrawAry)
          this.middleAry.push(preData)
          this.nextDrawAry = []
        }
        this.canvasMoveUse = false
      },
      canvasDown(e) {
        console.log('canvasDown')
        this.canvasMoveUse = true
        const canvasX = e.clientX - e.target.parentNode.offsetLeft
        const canvasY = e.clientY - e.target.parentNode.offsetTop
        this.setCanvasStyle()
        this.context.beginPath()
        this.context.moveTo(canvasX, canvasY)
        console.log('moveTo', canvasX, canvasY)
        const preData = this.context.getImageData(0, 0, 600, 400)
        this.preDrawAry.push(preData)
      },
      // 设置颜色
      setColor(color) {
        this.config.lineColor = color
      },
      // 设置笔刷大小
      setBrush(type) {
        this.config.lineWidth = type
      },
      // 操作
      controlCanvas(action) {
        switch (action) {
          case 'prev':
            if (this.preDrawAry.length) {
              const popData = this.preDrawAry.pop()
              const midData = this.middleAry[this.preDrawAry.length + 1]
              this.nextDrawAry.push(midData)
              this.context.putImageData(popData, 0, 0)
            }
            break
          case 'next':
            if (this.nextDrawAry.length) {
              const popData = this.nextDrawAry.pop()
              const midData = this.middleAry[this.middleAry.length - this.nextDrawAry.length - 2]
              this.preDrawAry.push(midData)
              this.context.putImageData(popData, 0, 0)
            }
            break
          case 'clear':
            this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
            this.preDrawAry = []
            this.nextDrawAry = []
            this.middleAry = [this.middleAry[0]]
            break
        }
      },
      isCanvasBlank(canvas) {
        var blank = document.createElement('canvas');//系统获取一个空canvas对象
        blank.width = canvas.width;
        blank.height = canvas.height;
        return canvas.toDataURL() == blank.toDataURL();//比较值相等则为空
      },
      // 生成图片
      getImage() {
        const canvas = document.querySelector('#canvas')
        if(this.isCanvasBlank(canvas)){
          this.$message.error('请先输入签名')
          return;
        }
        const src = canvas.toDataURL('image/png')
        this.$store.commit('SET_DRAWSTATUS', false)
        this.$store.commit('SET_DRAWIMG', src)
        this.controlCanvas('clear')
        // this.getImgUrl()
      },
      // 设置绘画配置
      setCanvasStyle() {
        this.context.lineWidth = this.config.lineWidth
        this.context.shadowBlur = this.config.shadowBlur
        this.context.shadowColor = this.config.lineColor
        this.context.strokeStyle = this.config.lineColor
      }
    }
  }
</script>
