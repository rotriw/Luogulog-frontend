<template>
	<div class="ui container">
		<div style="padding: 50px;"></div>
		<div class="card" style=" width: 100%;border: 0px;">
			<div class="card-body">
				<h4 class="ui block top attached header" style="width: 100%; background-color: white; color: black"><div class="content">直达</div></h4>
				<div class="ui bottom attached segment" style="width: 100%; padding-top: 20px; padding-bottom: 20px">
					<div class="ui right labeled input" style="width: 100%;">
						<input type="text" placeholder="Link: such as https://www.luogu.com.cn/discuss/114514" v-model="dataS">
						<button class="ui label primary" @click="jumpS"> Jump! </button>
					</div>
				</div>
			</div>
		</div>
		<div class="card" style=" width: 100%;border: 0px;">
			<div class="card-body">
				<h4 class="ui block top attached header" style="width: 100%; background-color: white; color: black"><div class="content">最新讨论</div></h4>
				<div class="ui bottom attached segment" style="width: 100%; padding-top: 20px; padding-bottom: 20px">
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import { useRoute, RouterLink, useRouter } from "vue-router";
import { ref } from "vue";
export default ({
	setup() {
		const dataS = ref("");
			let router2 = useRouter();
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
				values = vale;
			}
			console.log(values);
			router2.push("/discuss/"+values);
		}
		return {
			dataS,
			jumpS
		}
	},
})
</script>
>