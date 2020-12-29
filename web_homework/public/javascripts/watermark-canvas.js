function setVisibleWTM(userName) {
    let userOptions = {
        text: userName,
        container: document.getElementById("visible-water-mark"),
        width: "240px",
        height: "120px",
        textAlign: "left",
        textBaseline: "middle",
        font: "14px PingFang SC Regular,Microsoft Yahei",
        color: "rgba(0, 0, 0, 0.25)",
        rotate: "30",
        x: 10,
        y: 100,
    };


    init(userOptions);

    function init(options) {
        let canvas = document.createElement("canvas");
        canvas.setAttribute("width", options.width);
        canvas.setAttribute("height", options.height);
        let ctx = canvas.getContext("2d");
        // 设置元素属性
        ctx.textAlign = options.textAlign;
        ctx.textBaseline = options.textBaseline;
        ctx.font = options.font;
        ctx.fillStyle = options.color;
        ctx.rotate(-(Math.PI / 180) * options.rotate);
        ctx.fillText(options.text, options.x, options.y);
        let dataurl = canvas.toDataURL();


        // 新建div
        let watermarkElem = document.createElement("div");

        const styles = `
            background-image:url('${dataurl}');
            position: absolute;
        width: 100%;
        height: 100%;
        top:0;
        left: 0;
        z-index: 99;
        pointer-events:none;
        background-repeat:repeat;`;

        watermarkElem.setAttribute("style", styles);

        // 添加到指定的container中
        options.container.appendChild(watermarkElem);

        // 添加观察
        observe(watermarkElem);
    }


    // MutationObserver观察
    function observe(element) {
        let MutationObserver = window.MutationObserver ||
            window.WebKitMutationObserver ||
            window.MozMutationObserver;
        if (MutationObserver) {
            let mutationIns = new MutationObserver(function () {
                console.log("MutationObserver Change");
                mutationIns.disconnect();
                mutationIns = null;
                // 删除自己 然后再重新init
                element.parentElement.removeChild(element);
                init(userOptions);
            });
            mutationIns.observe(element, {
                attributes: true,
                subtree: true,
                attributeFilter: ['class', 'style'],
                childList: true,
            });
        }
    }
}


function setInvisibleWTM(userName, i) {
    let ctx = document.getElementById('invisible-water-mark').getContext('2d');
    ctx.font = '30px PingFang SC Regular,Microsoft Yahei';
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillText(userName, 60, 130);
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    // 得到水印的数据
    const wtmData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height).data;

    let pic_wtm_ctx = document.getElementById("pic-with-invisible-water-mark").getContext('2d');
    let img = new Image();
    img.src = '../images/water-mark1.jpg';
    img.onload = function () {
        pic_wtm_ctx.drawImage(img, 0, 0, 940, 717);
        // 加密
        mergeData(pic_wtm_ctx, 'R');
        // 解码
        if (i === 2) {
            processData(pic_wtm_ctx);
        }
    };

    function mergeData(ctx, color) {
        let originalData = ctx.getImageData(0, 0, pic_wtm_ctx.canvas.width, pic_wtm_ctx.canvas.height);
        let oData = originalData.data;
        let bit, offset;
        switch (color) {
            case 'R':
                bit = 0;
                offset = 3;
                break;
            case 'G':
                bit = 1;
                offset = 2;
                break;
            case 'B':
                bit = 2;
                offset = 1;
                break;
        }

        for (let i = 0; i < oData.length; i++) {
            if (i % 4 == bit) {
                // 只处理目标通道
                if (wtmData[i + offset] === 0 && (oData[i] % 2 === 1)) {
                    // 没有信息的像素，该通道最低位置0
                    if (oData[i] === 255) {
                        oData[i]--;
                    } else {
                        oData[i]++;
                    }
                } else if (wtmData[i + offset] !== 0 && (oData[i] % 2 === 0)) {
                    // 有信息的像素，该通道最低位置1
                    if (oData[i] === 255) {
                        oData[i]--;
                    } else {
                        oData[i]++;
                    }
                }
            }
        }
        // 将结果绘制到画布
        ctx.putImageData(originalData, 0, 0);
    }

    // 解密函数
    function processData(ctx) {
        let originalData = ctx.getImageData(0, 0, pic_wtm_ctx.canvas.width, pic_wtm_ctx.canvas.height);
        let data = originalData.data;
        for (let i = 0; i < data.length; i++) {
            if (i % 4 == 0) {
                // R分量
                if (data[i] % 2 == 0) {
                    data[i] = 0;
                } else {
                    data[i] = 255;
                }
            } else if (i % 4 == 3) {
                // alpha通道不做处理
                continue;
            } else {
                data[i] = 0;
            }
        }
        ctx.putImageData(originalData, 0, 0);
    }
}