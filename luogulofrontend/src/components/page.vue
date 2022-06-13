<template>
	<div class="ui pagination menu" style="width: 100%;">
		<template v-for="i in number">
			<template v-if="i + startPage == active">
				<div class="item active">
					{{i + startPage}}
				</div>
			</template>
			<template v-if="i + startPage != active">
				<div class="item" @click="callback(i)">
					{{i + startPage}}
				</div>
			</template>
		</template>
		<div class="item" @click="changePage">...</div>
	</div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'
import { ref, toRefs } from 'vue';
// const pages = require("pagination");
// import jqueryMin from '../assets/data/jquery.min';

export default {
	name: "pagination",
	props: [
		'total',
		'active',
		'number',
		'starteasy',
		'callback'
	],
	setup(props) {
		let totals = props.total;
		const total = ref(totals);
		const { active, number, starteasy } = toRefs(props)
		const callbacks = props.callback
		const startPage = ref(0);
		startPage.value = active.value - Math.min(starteasy.value, active.value + 1) + 1
		let okpage;
		function callback(i) {
			console.log(i+"-");
			i += startPage.value;
			console.log(i+"-");
			active.value = i;
			console.log(active.value+"wow");
			console.log(2333);
			callbacks(i);
			startPage.value = active.value - Math.min(starteasy.value, active.value + 1) + 1
		}
		return {
			total,
			startPage,
			active,
			number,
			callback,
			callbacks
		}
	},
}
</script>
