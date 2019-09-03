## vue 框架重构背调前端代码

### 环境准备：
> 1. 电脑先安装 node
> 2. git clone https://gitee.com/hangzhou_digital_pulse/beidiao_frontend.git

### 安装依赖包：
```
cd beidiao_frontend 
npm install
```
### 运行项目：

```
npm run dev
```
### 打包项目：
```
npm run build
```
### 其他说明
项目中如遇到打包过慢，可安装cnpm淘宝镜像再安装
```
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm install
```
项目中的vue包和本地的不一致，有可能报以下错误
```
Module build failed: Error:

Vue packages version mismatch:

vue@2.5.10
vue-template-compiler@2.5.17
```
由于vue包版本不一致，需手动安装vue包,由于网路问题，建议用cnpm安装
```
cnpm install vue@2.5.10 --save
```
