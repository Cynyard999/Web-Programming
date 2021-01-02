
window.onload = function(){
    // 根据网速请求不同大小的img
    var currentNetSpeed;
    this.getSpeed('test.jpg').then(speed => {
        console.log(speed+" KB/s");
        currentNetSpeed = speed;
        var imgList = $(".blog-pic img[data-src]").each(function () {
            if (currentNetSpeed<200){
                var prevSrc = $(this).attr('data-src');
                prevSrc = prevSrc.replace('mid','min');
                $(this).attr('data-src',prevSrc);
            }
        });

        // 替换完后 实现懒加载
        const observer = new IntersectionObserver(function(changes){
            changes.forEach(function(element, index) {
                if (element.intersectionRatio > 0) {
                    console.log("loading");
                    //console.log(element.intersectionRatio);
                    observer.unobserve(element.target);
                    element.target.src = element.target.dataset.src;
                }
            });
        }
        );
        initObserver();
        function initObserver() {
            imgList.each(function (index,item) {
                observer.observe(item);
            });
        }

    });

    new LightBox({
        animateSpeed: 500,
        maskOpacity: 0.5,
    });
};
function getSpeed(url) {
    return new Promise((resolve, reject) => {
        let start = null;
        let end = null;
        start = new Date().getTime();
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4&&xhr.status === 200) {
                end = new Date().getTime();
                const size = xhr.getResponseHeader('Content-Length') / 1024;// 单位KB
                const speed = size/ ((end - start)/1000);
                console.log(size+" "+(end-start));
                resolve(speed);
            }
        };
        xhr.open('GET', url);
        xhr.send();
    }).catch(err => { throw err });
}