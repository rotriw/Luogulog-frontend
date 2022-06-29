

<template>
    <div>
		<template v-if="useNav == true">
			<nav class="ui secondary menu navbar fw-bo fixed" style="padding-top: 15px; padding-bottom: 15px;">
				<span class="item" style="font-weight: 800;font-size: 16px;">洛谷讨论站</span>
				<router-link to="/" active-class="active"  class="item"> 主页 </router-link>
				<router-link to="/search" active-class="active" class="item"> 搜索 </router-link>
				<router-link to="/about" active-class="active" class="item"> 关于 </router-link>
				<div class="right menu">
					<template v-if="isLogin == false">
						<router-link to="/login" active-class="active" class="item"> 登录 </router-link>
					</template>
					<template v-if="isLogin == true">
						<router-link to="/setting" active-class="active" class="item"> 设置 </router-link>
						<a class="ui item rd" @click="logOut()"> Logout </a>
					</template>
				</div>
			</nav>
		</template>
        <router-view></router-view>
    </div>
</template>

<style>
#app {
    /* font-family: Avenir, Helvetica, Arial, sans-serif; */
    /* -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center; */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* color: #2c3e50; */
    /* background-color: #e9ecef; */
}
.navbar {
    padding-left: 15%;
    padding-right: 15%;
    background-color: white !important;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}
.menu .item {
    font-weight: 700 !important;
}
.menu .link {
    font-weight: 700 !important;
}
.fw-bo {
    font-weight: 700 !important;
}
.rd:hover {
}
html {
    /* background-image: linear-gradient(to bottom, white, #e9ecef); */
    /* background-color: white; */
}
body {
    /* background-image: linear-gradient(to bottom, white, #e9ecef); */
    /* background-color: #e9ecef; */
    font-family: "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol", "Noto Color Emoji" !important; 
	/* font-family: "Lato", "Noto Sans CJK SC", "Source Han Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft Yahei", "WenQuanYi Micro Hei", "Droid Sans Fallback", sans-serif; */
}
</style>

<script>
import { ref } from 'vue';
import { useRoute, RouterLink, useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";
import axios from "axios";
export default ({
	setup() {
		const { cookies } = useCookies();
		const useNav = ref(true);
		let route = useRoute();
		useNav.value = false;
		let logins = cookies.get("loginstatus") || false;
		if (cookies.get("url") == undefined) {
			cookies.set("url", "http://localhost:9000/", -1);
		}
		const isLogin = ref(logins);
		function toast(message, classc, dptime) {
            $("body").toast({
                class: classc,
                message: message,
                showProgress: "bottom",
                displayTime: dptime,
            });
		}
		function refreshLoginStatus() {
			axios({
                method: "post",
				url: cookies.get("url")+"api/user/vertify",
				data: {
					"uid": cookies.get("uid"),
					"token": cookies.get("token")
				}
			}).then((res) => {
				console.log(res.data);
				if (res.data.status == "success") {
					isLogin.value = true;
					cookies.set("loginstatus", true);
				} else {
					isLogin.value = false;
					cookies.set("loginstatus", false);
					if (res.data.status == "error")
						toast(res.data.msg, res.data.status, 2000)
				}
            });
		}
		function logOut() {
			cookies.set("loginstatus", false);
			cookies.set("uid", "");
			cookies.set("token", "");
			toast("退出成功", "success", 2000)
			refreshLoginStatus();
		}
		refreshLoginStatus();
		return {
			isLogin,
			logOut,
			refreshLoginStatus,
			useNav
		}
	},
	watch: {
		$route: async function (to, from) {
			if (to.name == "Login") {
				this.useNav = true;
			} else {
				this.useNav = true;
			}
			this.refreshLoginStatus();
        },
	}
})
</script>
