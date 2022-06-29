<template>
	<div class="container" style="padding-left: 25%;padding-right: 25%;">
		<div style="padding: 70px;"></div>
		<template v-if="isLogin == false">
			请您先登录wwww
			<router-link to="/login">Link</router-link>
		</template>
		<template v-if="isLogin == true">
			<Settings :values="values" :status="status" v-on:changes="Onchange" :v-sudropdown="refreshSemantic()"  />
		</template>
	</div>
</template>


<script>
import { ref } from 'vue';
import { useRoute, RouterLink, useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";
import Settings  from '../components/tools/main.vue';
import axios from "axios";
export default ({
	components: {
		Settings
	},
	setup() {
		const { cookies } = useCookies();
		let logins = cookies.get("loginstatus") || false;
		const isLogin = ref(logins);
		const values = ref([
			{
				"type": "describe",
				"html": "<span style='font-weight: 900; font-size: 25px'>设置面板</span>&nbsp;<span style='font-weight: 200; font-size: 25px'>Dashboard</span>"
			},
			{
				"type": "describe",
				"html": "<span style='size: 10px;font-weight: 900;color: grey'>主题相关&nbsp;Theme</span>",
			},
			{
				"type": "input",
				"id": "image",
				"describe": "背景壁纸",
				"place": "",
				"submit": "设置",
			},
			{
				"type": "dropdown",
				"id": "images",
				"describe": "选择侧边图片来源",
				"preset": {
					"name": "选择...",
				},
				"options": [
					{
						"id": "1",
						"name": "中学风景",
					},
					{
						"id": "2",
						"name": "二次元推荐",
					}
				]
			},
			{
				"type": "describe",
				"html": "<span style='size: 10px;font-weight: 900;color: grey'>功能相关&nbsp;Mode</span>",
			},
			{
				"type": "checkbox",
				"id": "latexs",
				"describe": "加载latex(关闭防止小天才卡崩)",
			},
			{
				"type": "checkbox",
				"id": "onepage",
				"describe": "一页加载讨论",
				
			}
		]);
		const status = ref({
			"image": "https://abc",
			"latexs": true,
			"onepage": true,
			"images": "1",
		});
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
		function changeTest() {
			values.value.status++;
		}
		function Onchange(values) {
			console.log("2333");
			console.log(values);
		}
		refreshLoginStatus();
		$('.ui.dropdown').dropdown();
		function refreshSemantic() {
			$('.ui.dropdown').dropdown();
		}
		return {
			isLogin,
			refreshLoginStatus,
			values,
			Onchange,
			changeTest,
			status,
			refreshSemantic,
		}
	},
})
</script>
>