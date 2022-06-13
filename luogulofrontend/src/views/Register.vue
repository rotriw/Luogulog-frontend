<template>
    <div style="top: 20%; left: 25%; width: 50%; height: 60%; position: fixed; box-shadow: 0px 0px 15px #00000010">
        <div
            style="
                background-image: url('https://gcore.jsdelivr.net/npm/ushio-api-img-moe@5.0.21/img_218_1488x2105_180.009796142578_null_normal.jpg');
                background-repeat: no-repeat;
                position: absolute;
                height: 100%;
                width: 40%;
                background-size: auto 100%;
                overflow-x: hidden;
                overflow-y: hidden;
            "
        ></div>
        <div style="position: absolute; width: 55%; left: 45%; padding-top: 55px; padding-right: 50px;">
            <span style="font-weight: 900; font-size: 25px">登录</span>
            <span style="font-weight: 200; font-size: 25px"> 洛谷讨论保存站</span>
			<div style="padding: 3%;"></div>
            <div class="ui form">
                <div class="field">
                    <label>用户名</label>
                    <input type="text" name="first-name" placeholder="用户名" />
                </div>
                <div class="field">
                    <label>密码</label>
                    <input type="password" name="last-name" placeholder="密码" />
                </div>
                <div class="field">
                    <div class="ui checkbox">
                        <input type="checkbox" tabindex="0" class="" />
                        <label>保持登录</label>
                    </div>
                </div>
                <div>
					<button class="ui button primary" type="submit">登录</button>
					<button class="ui button teal" type="submit">忘记密码</button><button class="ui button black" type="submit">注册账户</button>
				</div>
            </div>
        </div>
    </div>
</template>
