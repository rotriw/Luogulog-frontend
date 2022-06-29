<template>
	<div class="container" style="padding-left: 25%;padding-right: 25%;">
		<div style="padding: 70px;"></div>
		<Settings :values="values" :status="status" v-on:changes="Onchange" :v-sudropdown="refreshSemantic()"  />
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
				"html": "<span style='font-weight: 900; font-size: 25px'>系统设置</span>&nbsp;<span style='font-weight: 200; font-size: 25px'>System</span>"
			},
			{
				"type": "input",
				"id": "link",
				"describe": "后台地址",
				"place": "link",
				"submit": "修改",
				"nohr": true
			},
			{
				"type": "describe",
				"html": "<div style='padding: 2px;'></div><span style='color:red;margin-top: -25px;'>提示：若您不知道在干什么，请勿调节此处。</span>&nbsp;"
			},{
				"type": "dropdown",
				"id": "link",
				"describe": "选择预设",
				"preset": {
					"name": "选择...",
				},
				"options": [
					{
						"id": "http://localhost:9000/",
						"name": "本地测试",
					},
					{
						"id": "http://api.rotriw.cn/luogulo/",
						"name": "云服务器 - Rotriw备用",
					},
					{
						"id": "https://luogulog.com.cn/",
						"name": "云服务器 - 默认",
					}
				]
			},
		]);
		const status = ref({
			"link": cookies.get("url"),
		});
		$('.ui.dropdown').dropdown();
		function refreshSemantic() {
			$('.ui.dropdown').dropdown();
		}
		function toast(message, classc, dptime) {
			$('body')
			.toast({
				class: classc,
				message: message,
				showProgress: 'bottom',
				displayTime: dptime,
			})
			;
		}
		function Onchange(item) {
			if (item.id == 'link') {
				cookies.set("url", item.data, -1);
				toast("修改为"+item.data+"成功", "success", "1500")
			}
		}
		return {
			isLogin,
			values,
			Onchange,
			status,
			refreshSemantic,
		}
	},
})
</script>
>