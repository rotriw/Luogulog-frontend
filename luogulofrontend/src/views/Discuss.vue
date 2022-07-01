<template>
    <div>
        <div style="padding: 50px"></div>
        <div class="ui container">
            <div class="ui breadcrumb">
                <div class="section">帖子详情</div>
                <i class="divider"><i class="fa-solid fa-angle-right"></i></i>
                <span class="active section">{{ iDs }}</span
                ><br />
                <div style="height: 15px"></div>
                <div>
                    <span style="font-weight: 500; font-size: 25px; margin-right: 10px">{{ titleS }}</span
                    ><span style="font-weight: 350; font-size: 20px">#{{ iDs }}</span>
                </div>
                <div style="height: 15px"></div>
                <div style="font-size: 15px">
                    <div data-tooltip="更新数据" data-variation="basic" data-position="bottom left"><i class="fa-duotone fa-up-from-bracket"></i></div
                    >&nbsp;<div data-variation="basic" data-tooltip="刷新界面" data-position="bottom left"><i class="fa-duotone fa-arrows-rotate"></i></div
                    >&nbsp;<div data-tooltip="返回原帖" data-variation="basic" data-position="bottom left"><i class="fa-duotone fa-send-backward"></i></div
                    >&nbsp;<div data-tooltip="举报" data-variation="basic" data-position="bottom left" @click="report()"><i class="fa-duotone fa-flag"></i></div>
                    <!--display需要改成inline，也许需要在css部分改？-->
                </div>
                <div style="height: 15px"></div>
            </div>

            <div class="ui grid">
                <div class="wide column">
                    <div style="width: 100%; margin-bottom: 5px">
                        <h4 class="ui block top attached header" style="width: 100%; background-color: white; color: black">
                            <div class="content">{{ authorS }} · {{ formatDate(timeS) }} · </div>
							<a v-on:click="changeVis(1)">&nbsp;折叠/展开帖子详情</a>
                        </h4>
                        <div class="ui bottom attached segment" style="width: 100%; padding-top: 20px; padding-bottom: 20px ;">
                            <div v-html="contentS"></div>
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
                        <div style="width: 100%; margin-bottom: 5px">
                            <h4 class="ui block top attached header" style="width: 100%; background-color: white; color: black">
                                <div class="content">
                                    <a :href="'https://www.luogu.com.cn/user/' + item.authorID" style="text-decoration: none"> {{ item.authorName }}</a> ·
                                    {{ formatDate(item.sendTime) }}
                                </div>
                            </h4>
                            <div class="ui bottom attached segment" style="width: 100%; padding-top: 20px; padding-bottom: 20px ;" v-html="item.content"></div>
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
                    <Pagination :total="10" style="width: 100%" :callback="changePage" :curret="actives"></Pagination>
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

img {
    max-width: 100%;
}
</style>

<script>
// import { defineComponent } from '@vue/composition-api'
import Pagination from "../components/page2.vue";
import { ref, nextTick } from "vue";
import { useRoute, RouterLink, useRouter } from "vue-router";
import axios from "axios";
import { useCookies } from "vue3-cookies";
import katex from "katex";
import "katex/dist/katex.css";
// 引入katex下的自动渲染函数
import renderMathInElement from "katex/contrib/auto-render/auto-render";
import { useStorage } from "vue3-storage";

// import {PageIn} from "../components/page.vue";
// import Page from '../components/page.vue';

export default {
    components: {
        Pagination,
    },
    setup(props, ctx) {
		const { cookies } = useCookies();
		const storage = useStorage();
        function toast(message, classc, dptime) {
            $("body").toast({
                class: classc,
                message: message,
                showProgress: "bottom",
                displayTime: dptime,
            });
        }
        let router = useRoute();
        let page = parseInt(router.query.page || 1);
        const actives = ref(page);
        const timeS = ref(0);
        const contentS = ref("discuss.content");
        const titleS = ref("discuss.title");
        const commit = ref({});
        const loadingRef = ref(false);
        const authorS = ref("discuss.author.name");
		const iDs = ref(router.params.id);
		
		let vis = localStorage.getItem("vis" + iDs.value), datas = contentS.value;
		if (vis == null) {
			localStorage.setItem("vis" + iDs.value, true)
			vis = true
		}
		console.log(vis);
		console.log(vis);

		function changeVis(bs) {
			if (bs == 1) {
				console.log("@3333");
				vis = !vis;
			}
			//vis = !vis;
		//	console.log(vis);
			localStorage.setItem("vis" + iDs.value, vis)
		//	console.log(localStorage.getItem("vis" + iDs));
		//	console.log(vis == true)
			if (vis == "true") vis = true
			else if (vis == "false") vis = false;
			if (vis == true) {
				contentS.value = datas;
			} else {
				datas = contentS.value;
				contentS.value = "<span style='color: grey;font-style:italic'>已折叠</span>";
			}
		}
        async function refresh() {
            page = parseInt(router.query.page || 1);
            await axios({
                method: "get",
                url: cookies.get("url") + "api/discuss/data/" + router.params.id + "/" + page,
            }).then((res) => {
                commit.value = res.data.results;
                console.log(commit);
                // 定义自动渲染的配置参数,这些参数根据你的需求进行修改，下面的参数是官网上抄下来的
                const renderOption = {
                    delimiters: [
                        { left: "$$", right: "$$", display: true },
                        { left: "$", right: "$", display: false },
                        { left: "\\(", right: "\\)", display: false },
                        { left: "\\[", right: "\\]", display: true },
                    ],
                    throwOnError: true,
				};
				nextTick().then(() => {
					if (commit.length > 0)
						renderMathInElement(document.body, renderOption);
				})
            });
            axios({
                method: "get",
                url: cookies.get("url") + "api/discuss/title/" + router.params.id,
            }).then((res) => {
                console.log(res.data.title);
                titleS.value = res.data.title;
                timeS.value = res.data.sendTime;
                contentS.value = res.data.content;
                authorS.value = res.data.authorName;
                //	renders();
				datas = contentS.value;
				console.log(vis+"aw");
				changeVis(0);
            });
            //	renders();
        }
        let router2 = useRouter();
        function changePage(i) {
            console.log(i);
            actives.value = i;
            console.log(i);
            let links = "/discuss/" + router.params.id + "?page=" + i;
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
			vis,
            authorS,
			loadingRef,
			changeVis,
            refresh,
            formatDate: function (value) {
                let date = new Date(value);
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? "0" + MM : MM;
                let d = date.getDate();
                d = d < 10 ? "0" + d : d;
                let h = date.getHours();
                h = h < 10 ? "0" + h : h;
                let m = date.getMinutes();
                m = m < 10 ? "0" + m : m;
                let s = date.getSeconds();
                s = s < 10 ? "0" + s : s;
                return y + "-" + MM + "-" + d + " " + h + ":" + m;
            },
        };
    },
    watch: {
        $route: async function (to, from) {
            await this.refresh();
        },
    },
};
</script>
