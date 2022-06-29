<template>
    <div class="boxels" style="position: fixed; box-shadow: 0px 0px 15px #00000010">
        <div
            class="left-image"
            style="
                background-image: url('https://upload.cc/i1/2022/06/09/qNH0b6.jpg');
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
            <template v-if="useNormalLogin == true">
                <span style="font-weight: 900; font-size: 25px">登录</span>
                <span style="font-weight: 200; font-size: 25px"> 洛谷讨论保存站</span>
                <div style="padding: 3%"></div>
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
                    <div style="padding: 2px"></div>
                </div>
            </template>
            <template v-if="useNormalLogin == false">
                <span style="font-weight: 900; font-size: 25px">登录</span>
                <span style="font-weight: 200; font-size: 25px"> 洛谷账号登录</span>
                <div style="padding: 3%"></div>
                <div class="ui form">
                    <div class="field">
                        <label>剪切板验证码(请将本项内容复制到剪切版内)</label>
                        <div class="ui right labeled input">
                            <input type="text" readonly placeholder="Pastecode" class="" :value="loginVCode" />
                            <a class="ui tag label" v-clipboard:copy="loginVCode" v-clipboard:success="onsuccess" v-clipboard:error="onerror"> 复制验证码 </a>
						</div>
                    </div>
                    <div class="field">
                        <label>剪切板ID</label>
                        <input type="text" v-model="pasteid" name="last-name" placeholder="应当为8位字符串" />
                    </div>
                    <div class="field">
                        <div class="ui checkbox">
                            <input type="checkbox" tabindex="0" class="" />
                            <label>保持登录</label>
                        </div>
                    </div>
                    <div style="padding: 2px"></div>
                </div>
            </template>
            <div class="ui modal">
                <i class="close icon"></i>
                <div class="header">洛谷登录方式帮助</div>
                <div class="content">
                    <div class="description">
                        <div class="ui header">请您在处理时不要关闭该界面。</div>
                        <p>
                            请使用<strong>您的账号</strong>将验证码复制到<strong>洛谷剪切板</strong>，然后设置为<strong>公开可见</strong>可见后发布。
                            然后将链接中/paste/后的值填入到本页面。
                        </p>
                    </div>
                </div>
                <div class="actions">
                    <div class="ui positive right labeled icon button">
                        OK
                        <i class="checkmark icon"></i>
                    </div>
                </div>
            </div>
            <div>
                <button class="ui button primary" type="submit" @click="logins()">登录&nbsp;<i class="fa-duotone fa-arrow-right-to-bracket"></i></button>
                <template v-if="useNormalLogin == true"
                    ><button class="ui button teal" type="submit">忘记密码</button><button class="ui button black" type="submit">注册账户</button></template
                >
                <template v-if="useNormalLogin == false"><button class="ui button teal" type="submit" @click="openDialog">需要帮助&nbsp;<i class="fa-duotone fa-circle-question"></i></button></template>
                <div style="padding: 2px"></div>
                <button disabled class="ui button blue" type="submit" style="background-color: #5b9ad5" @click="changeLoginMode">
                    {{ LoginModeButtonData }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useCookies } from "vue3-cookies";
export default {
    setup() {
        const useNormalLogin = ref(false);
		const LoginModeButtonData = ref("使用内置账号登录");
		const pasteid = ref("");
        function changeLoginMode() {
            useNormalLogin.value = !useNormalLogin.value;
            if (useNormalLogin.value == true) {
                LoginModeButtonData.value = "使用洛谷账号登录";
            } else {
                LoginModeButtonData.value = "使用内置账号登录";
            }
        }
        function toast(message, classc, dptime) {
            $("body").toast({
                class: classc,
                message: message,
                showProgress: "bottom",
                displayTime: dptime,
            });
		}
		const { cookies } = useCookies();
        function openDialog() {
            $(".ui.modal").modal("show");
        }
		function logins() {
			if (useNormalLogin.value == true) {
				toast("真没写。。。。", "blue", 3000)
				return;
			}
            axios({
                method: "post",
				url: cookies.get("url")+"api/user/luogu/vertify",
				data: {
					"pasteid": pasteid.value
				}
			}).then((res) => {
				if (res.data.user == undefined) {
					toast("<i class='fa-duotone fa-exclamation'></i>&nbsp;" + res.data.msg, "error", 2000)
				} else {
					toast("<i class='fa-duotone fa-check'></i>&nbsp;" + res.data.msg, "success", 2000)
					cookies.set("uid", res.data.user, 1000000)
					cookies.set("token", res.data.token, 1000000)
				}
            });
		}
        const loginVCode = ref("加载中...");
        function getStart() {
            axios({
                method: "get",
                url: cookies.get("url")+"api/user/luogu/start",
            }).then((res) => {
                loginVCode.value = res.data.id;
            });
        }
		getStart();
		function onsuccess() {
			toast('已复制到剪切板', 'success', 1000)
		}
		function onerror() {
			toast('复制失败', 'error', 1000)
		}
        return {
			onsuccess,
			onerror,
			loginVCode,
			pasteid,
            logins,
            getStart,
            useNormalLogin,
            changeLoginMode,
			LoginModeButtonData,
			toast,
            openDialog,
        };
    },
    watch: {
        $route: async function (to, from) {
            this.getStart();
        },
    },
};
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
