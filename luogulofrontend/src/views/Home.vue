<template>
	<div class="ui container">
		<div style="padding: 50px;"></div>
		<div v-html="messageS">
		</div>
		<div class="displayt ww" id="tels"><router-link to='/system' class="ui button primary ww">转到系统设置</router-link>
		</div><div class="card" style=" width: 100%;border: 0px;">
			<div class="card-body">
				<h4 class="ui block top attached header" style="width: 100%; background-color: white; color: black"><div class="content">直达&nbsp;<i class="fa-duotone fa-person-ski-jumping"></i></div></h4>
				<div class="ui bottom attached segment" style="width: 100%; padding-top: 20px; padding-bottom: 20px">
					<div class="ui right labeled input" style="width: 100%;">
						<input type="text" placeholder="Link: such as https://www.luogu.com.cn/discuss/114514" v-model="dataS">
						<button class="ui label primary" @click="jumpS"> Go&nbsp;<i class="fa-duotone fa-paper-plane-top"></i> </button>
					</div>
				</div>
			</div>
		</div>
		<div class="card" style=" width: 100%;border: 0px;">
			<div class="card-body">
				<h4 class="ui block top attached header" style="width: 100%; background-color: white; color: black"><div class="content">最新讨论&nbsp;<i class="fa-duotone fa-newspaper" style="color: black;"></i></div></h4>
				<div class="ui bottom attached segment" style="width: 100%; padding-top: 20px; padding-bottom: 20px">
					<div class="ui relaxed divided list">
						<template v-for="items in newList">
							<div class="item">
								<i class="large middle aligned icon"><i class="fa-solid fa-message-arrow-up-right"></i></i>
								<div class="content">
								<router-link class="header" :to="'/discuss/' + items.postID">{{items.title}}</router-link>
								<div class="description">帖子</div>
								</div>
							</div>
						</template>
						</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
.displayt{
	display: none;
	margin: 0px !important;
}
.ww {
	margin-bottom: 15px;
}
</style>

<script>

import { useRoute, RouterLink, useRouter } from "vue-router";
import { ref } from "vue";
import { useCookies } from "vue3-cookies";
import axios from "axios";
export default ({
	setup() {
		const dataS = ref("");
		const { cookies } = useCookies();
		const messageS = ref("");
		let newList = ref([]);
		let router2 = useRouter();
	
		function showErrorConnect() {
			messageS.value = "<div class='ui center negative aligned message'><div class='content'><div class='header'>ERROR</div><p>我们发现无法连接后端...若多次刷新依旧存在该消息..这意味着您可能暂时无法使用相关服务。&nbsp;<i class='fa-duotone fa-link-slash'></i></p></div></div><div style='padding:3px;'></div>";
			document.getElementById("tels").classList.remove("displayt");
		}
		function closeErrorConnect() {
			messageS.value = "";
		}
		function refreshNew() {
			axios({
                method: "get",
                url: cookies.get("url")+"api/discussList",
			}).then((res) => {
				closeErrorConnect();
				newList.value = res.data;
				console.log(newList.value);
			}).catch(function (error) {
				showErrorConnect();
			});
		}
		refreshNew();
		function jumpS() {
			let vale = dataS.value;
			let len = vale.length;
			let values;
			let c = 0;
			let pp = "discuss/";
			
			for (var i = 0; i < len; i++) {
				if (c == pp.length) {
					values = vale.substring(i, len);
					break;
				}
				if (vale[i] == pp[c]) {
					c++;
				}
			}
			if (values == undefined) {
				for (var i = len - 1; i >= 0; i--) {
					if (vale[i] == "/") {
						values = vale.substring(i + 1, len);
						break;
					}
				}
				if (values == undefined) {
					values = vale;
				}
			}
			console.log(values);
			router2.push("/discuss/"+values);
		}
		console.log(messageS.value);
		return {
			dataS,
			jumpS,
			newList,
			messageS,
		}
	},
})
</script>
>