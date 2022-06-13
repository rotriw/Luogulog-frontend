<template>
    <div class="boxels" style="position: fixed; box-shadow: 0px 0px 15px #00000010">
        <div
            class="left-image"
            style="
                background-image: url('https://cdn.pixabay.com/photo/2013/11/28/10/03/river-219972_1280.jpg');
                background-repeat: no-repeat;
                position: absolute;
                height: 100%;
                width: 40%;
                background-size: auto 100%;
                overflow-x: hidden;
                overflow-y: hidden;
                color: white;
                padding-top: 26%;
                text-align: center;
            "
        ></div>
        <div class="right-item" style="position: absolute; width: 55%; left: 45%; padding-top: 55px; padding-right: 50px">
			<span style="font-weight: 900; font-size: 25px">关于</span>
			<span style="font-weight: 200; font-size: 25px"> About</span>
			<div style="padding: 15px;"></div>
			<p>LuoguLog(洛谷帖子保存站) 新站使用Vue + node.js + express完成。前端服务器位于香港。后端服务器位于上海。</p>
			<p>主题框架选择了SemanticUI（社区更新版Fomantic）</p>
			<p>前后端已全部开源，欢迎Star✨</p>
			<div style="color: grey">Rotriw Dev Team &copy; 2022</div>
        </div>
    </div>
</template>

<script>


</script>

<style>
.boxels {
    top: 20%;
    left: 25%;
    width: 50%;
    height: 60%;
}

@media (max-width: 600px) {
    /*0~320*/
    .boxels {
        top: 5%;
        left: 5%;
        width: 95%;
        height: 100%;
        box-shadow: 0px 0px 0px 0px white !important;
    }

    .left-image {
        display: none;
    }

    .right-item {
        left: 5% !important;
        width: 100% !important;
    }
}
</style>
