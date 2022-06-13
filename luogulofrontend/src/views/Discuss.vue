<template>
    <div>
        <div style="padding: 50px"></div>
        <div class="ui container">
            <div class="ui breadcrumb">
                <div class="section">帖子详情</div>
                <i class="right angle icon divider"></i>
                <span class="active section">{{ iDs }}</span><br />
                <div style="height: 15px"></div>
                <div><span style="font-weight: 500; font-size: 25px;margin-right: 10px;">{{titleS}}</span><span style="font-weight: 350;font-size: 20px;">#{{iDs}}</span></div>
                <div style="height: 15px"></div>
            </div>
			
            <div class="ui grid">
                <div class="wide column">
                    <div style="width: 100%;margin-bottom: 5px;">
                        <h4 class="ui block top attached header" style="width: 100%;background-color: white; color: black; "><div class="content">{{authorS}} · {{ formatDate(timeS) }} </div></h4>
                        <div class="ui bottom attached segment" style="width: 100%;padding-top: 20px;padding-bottom: 20px; ;">
							<div v-html="contentS">

							</div>
						</div>
						
							<!-- <div class="ui bottom attached segment" style="width: 100%;padding: 0px;">
								<div style="margin-bottom: -1px; display: flex; flex-wrap: wrap;height: 100%;">
									<div class="discuss-b discuss-b-first" style="">
										<img class="emoji" draggable="false" alt="👍" src="https://twemoji.maxcdn.com/v/latest/svg/1f44d.svg" style="height: 15px;">&nbsp;&nbsp;<span style="font-weight: 700;">15</span>
									</div>
									<div class="discuss-b" style=" border-color: ">
										<img class="emoji" draggable="false" alt="👎" src="https://twemoji.maxcdn.com/v/latest/svg/1f44e.svg" style="height: 15px;">&nbsp;&nbsp;<span style="font-weight: 700;">15</span>
									</div>
								</div>
							</div> -->
                    </div>
					<template v-for="item in commit">
						<div style="width: 100%;margin-bottom: 5px;">
							<h4 class="ui block top attached header" style="width: 100%;background-color: white; color: black; "><div class="content"><a :href="'https://www.luogu.com.cn/user/' + item.authorID" style="text-decoration: none"> {{ item.authorName }}</a> · {{ formatDate(item.sendTime) }} </div></h4>
							<div class="ui bottom attached segment" style="width: 100%;padding-top: 20px;padding-bottom: 20px; ;" v-html="item.content">
							</div>
							<!-- <div class="ui bottom attached segment" style="width: 100%;padding: 0px;">
								<div style="margin-bottom: -1px; display: flex; flex-wrap: wrap;height: 100%;">
									<div class="discuss-b discuss-b-first" style="">
										<img class="emoji" draggable="false" alt="👍" src="https://twemoji.maxcdn.com/v/latest/svg/1f44d.svg" style="height: 15px;">&nbsp;&nbsp;<span style="font-weight: 700;">15</span>
									</div>
									<div class="discuss-b" style=" border-color: ">
										<img class="emoji" draggable="false" alt="👎" src="https://twemoji.maxcdn.com/v/latest/svg/1f44e.svg" style="height: 15px;">&nbsp;&nbsp;<span style="font-weight: 700;">15</span>
									</div>
								</div>
							</div> -->
						</div>
					</template>
					<Pagination :total="20" style="width: 100%;" :callback="changePage" :curret="actives"></Pagination>
                </div>
            </div>
			
        </div>
    </div>
</template>

<style>
.discuss-b {
    display: flex;
    align-items: center;
	padding: 9px;
	padding-left: 20px;
	padding-right: 20px;
    border-right: 1px solid #e6e6e6;
	/* width: 60px; */
    border-bottom: 0px solid grey;
    cursor: pointer;
}

.discuss-b:hover {
	background-color: #e6e6e6;
}

.discuss-b-first {
	padding-left: 20px;
}
</style>


<script>
// import { defineComponent } from '@vue/composition-api'
import Pagination from '../components/page2.vue'
import { ref } from 'vue';
import { useRoute, RouterLink, useRouter } from "vue-router";
import axios from "axios";
// import {PageIn} from "../components/page.vue";
// import Page from '../components/page.vue';

export default {
	components: {
		Pagination
	},
	setup() {
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
		let router = useRoute();
		let page = parseInt(router.query.page || 1);
		const actives = ref(page)
		const timeS = ref(0);
		const contentS = ref("discuss.content");
		const titleS = ref("discuss.title");
		const commit = ref({});
		const loadingRef = ref(false);
		const authorS = ref("discuss.author.name");
		const iDs = ref(router.params.id);
		async function refresh() {
			page = parseInt(router.query.page || 1);
			await axios({
                method: "get",
                url: "http://localhost:9000/api/discuss/data/" + router.params.id + "/" + page,
            }).then((res) => {
                commit.value = res.data.results;
                console.log(commit);
            });
            axios({
                method: "get",
                url: "http://localhost:9000/api/discuss/title/" + router.params.id,
            }).then((res) => {
                console.log(res.data.title);
                titleS.value = res.data.title;
                timeS.value = res.data.sendTime;
				contentS.value = res.data.content;
				authorS.value = res.data.authorName;
			});
		}
		let router2 = useRouter();
		function changePage(i) {
			console.log(i);
			actives.value = i;
			console.log(i);
			let links = '/discuss/' + router.params.id + '?page=' + i;
			actives.value = i;
			console.log(links);
			router2.push(links);
		}
		refresh();
		return {
			toast,
			changePage,
			actives,
			timeS,
			contentS,
			titleS,
			commit,
			iDs,
			authorS,
			loadingRef,
			refresh,
			formatDate: function (value) {
				let date = new Date(value);
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				let m = date.getMinutes();
				m = m < 10 ? ('0' + m) : m;
				let s = date.getSeconds();
				s = s < 10 ? ('0' + s) : s;
				return y + '-' + MM + '-' + d + ' ' + h + ':' + m;
			}
		}
	},
    watch: {
        $route: async function (to, from) {
            await this.refresh();
        },
	}
}
</script>
