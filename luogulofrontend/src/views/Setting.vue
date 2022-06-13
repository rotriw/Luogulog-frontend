<template>
	<div class="container" style="padding-left: 25%;padding-right: 25%;">
		<div style="padding: 70px;"></div>
		<template v-if="isLogin == false">
			请您先登录wwww
			<router-link to="/login">Link</router-link>
		</template>
		<template v-if="isLogin == true">
			
		</template>
	</div>
</template>

<script>
import { ref } from 'vue';
import { useRoute, RouterLink, useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";
import axios from "axios";
export default ({
	setup() {
		const { cookies } = useCookies();
		let logins = cookies.get("loginstatus") || false;
		const isLogin = ref(logins);
		function refreshLoginStatus() {
			axios({
                method: "post",
				url: "http://localhost:9000/api/user/vertify",
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
		refreshLoginStatus();
		return {
			isLogin,
			refreshLoginStatus
		}
	},
})
</script>
>