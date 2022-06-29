<template>
    <div>
        <div style="padding: 45px"></div>
        <div class="ui container" style="text-align: center">
            <h4 class="ui block top attached header" style="width: 100%; background-color: white; color: black"><div class="content">搜索</div></h4>
            <div class="ui attached segment" style="width: 100%; padding-top: 20px; padding-bottom: 20px">
                <div class="ui icon input" style="width: 100%">
                    <input type="text" placeholder="Search..." style="width: 100%" v-model="inputValue" @input="inputChange" />
                    <i class="icon" style="padding-top: 1%;"><i class="fa-duotone fa-magnifying-glass icon" style="color: #5E72E4 !important;    opacity: 0.75 !important;"></i></i>
                </div>
            </div>
            <div class="ui bottom attached segment" style="width: 100%; padding: 7px !important">
                <table class="ui celled striped table">
                    <thead>
                            <tr class="collapsing"><th>类型</th>
                            <th>内容标题</th>
                            <th>内容作者</th>
                            <th class="right aligned collapsing">Action</th></tr>
                    </thead>
					<tbody>
						<template v-for="item in searchData">
							<tr>
								<td class="collapsing">
								<i class="page icon"></i>讨论</td>
								<td>{{item.title}}</td>
								<td>{{item.authorName}}</td>
								<td class="right aligned collapsing"><router-link class="ui button primary" :to="'/discuss/'+item.postID">Go&nbsp;<i class="fa-duotone fa-paper-plane-top"></i></router-link></td>
							</tr>
						</template>
					</tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import axios from 'axios';
import { useCookies } from "vue3-cookies";

export default {
    setup() {
		const inputValue = ref("");
		const { cookies } = useCookies();
		const searchData = ref([{
			"title": "请开始搜索",
			"content": "wow",
		}])
        function inputChange() {
			console.log(inputValue.value);
			axios({
                method: "post",
				url: cookies.get("url")+"api/data/find",
				data: {
					"q": inputValue.value,
				}
			}).then((res) => {
				searchData.value = res.data;
            });
		}
        return {
            inputChange,
			inputValue,
			searchData,
        };
    },
};
</script>
>
