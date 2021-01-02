# Web前端开发

## WEB1.0 

- ~~一共实现了四个界面~~
- ~~由于没有用js，没有实现从登陆界面或者注册界面跳转到主页的功能，请从`home.html` 进入本次作业~~
- ~~点击主页上的任意一个card就可以进入subpage界面~~

### 网页风格灵感来源

https://www.pexels.com/zh-cn/

https://www.photoblog.com/

## WEB2.0

### 操作说明

- ~~由于没有实现登陆界面到注册界面的跳转，请**从home.html进入本次作业**~~

- ~~点击主页的**上面三个card可以进入水印展示界面**，点击下面四个card可以进入subpage展示界面~~

- 点击主页的**下面右2card可以进入水印展示界面**，点击下面右1card可以进入subpage展示界面

- 在watermark.html中通过修改js的方法的**传入参数**，使页面呈现加密后/解密后的图片

  ```html
  <script>
    // 可见水印
    setVisibleWTM("@cynyard");
    // 不可见水印，如果参数从1变成2，将打印解密后的数据
    setInvisibleWTM("@cynyard",1);
    //setInvisibleWTM("@cynyard",2);
  </script>
  ```
  
## WEB3.0

> 使用了node.js和express框架

### 操作说明

- 请先在terminal中进入web_homework后，输入npm install 安装依赖
- 配置好本地mysql数据库
- 打开项目的db/dbconfig.js文件，将数据库配置修改为本地的数据库名称，端口，数据库密码
- 输入npm start或者npm test运行(后者使用了nodemon部署），然后访问http://localhost:3000
- 进入网站主页后，点击右上角的Login或者Register进入登陆注册页面

### 两次加密

#### 前端

使用md5以及加盐，将用户密码加密，然后传给后端

#### 后端

使用argon2加密，将传来的加密密码进一步加密，传给数据库（argon2自带加盐）

### 验证码

- **滑动验证码**
- 使用开源项目[SliderCaptcha](https://github.com/ArgoZhang/SliderCaptcha)

#### 注册

> /public/lib/longbow.slidercaptcha.js 323行开始

- 在注册界面的验证码为纯前端验证
- 在判断滑块**已经拖动到合适位置**后
- 计算统计用户鼠标在拖动验证码时候的**y轴变化的方差**（**默认人类横移鼠标不可能让方差为0**）
- 从而简单判断是否是人类用户

#### 登陆

> /public/lib/longbow.slidercaptcha.js 56行开始
> /routes/index.js 79行开始

- 添加服务端的验证，使用nodejs作为服务端的环境
- 在前端判定滑块已经拖动到合适位置后
- 通过ajax向服务端传入**滑块判定的结果**加上用户的鼠标移动时的**y轴变化**
- 在服务端简单判断是否是人类用户
- 返回信息给前端



##Web4.0

### 操作说明

- 请先在terminal中进入web_homework后，输入npm install 安装依赖
- 输入npm start或者npm test运行(后者使用了nodemon部署），然后访问http://localhost:3000
- 进入网站主页后，点击上方一排的任意一个card进入图片展示界面

### 根据客户端网速选择加载不同质量的图片

> jpgs.js 第17行开始

### 懒加载

> jpgs.js 第2行开始

### 实现LightBox，即点击网站上的图片以呈现原图

> 使用jquery的Lightbox组件,在jpgs.js中声明lightbox类