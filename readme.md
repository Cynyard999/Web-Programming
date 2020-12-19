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

- 由于没有实现登陆界面到注册界面的跳转，请**从home.html进入本次作业**

- 点击主页的**上面三个card可以进入水印展示界面**，点击下面四个card可以进入subpage展示界面

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