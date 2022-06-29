<template>
	<div class="ui" style="width: 100%;box-shadow: 0px 0px 15px #00000010;padding: 25px;padding-top: 30px;">
	<template v-for="items in totals">
			<template v-if="items.type == 'describe'">
				<div v-html="items.html">
				</div>
			</template>
			<template v-if="items.type == 'input'">
				{{items.describe}}&nbsp;&nbsp;&nbsp;<div class="ui action input">
					<input type="text" :placeholder="items.place" v-model="status[items.id]">
					<button class="ui button"  @click="changes(items.id)">{{items.submit}}</button>
				</div>
			</template>
			<template v-if="items.type == 'checkbox'">
				<div class="ui toggle checkbox">
					<input type="checkbox" v-model="status[items.id]" @click="changes(items.id, 'rev')">
					<label>{{items.describe}}</label>
				</div>
			</template>
			<template v-if="items.type == 'dropdown'">
				{{items.describe}}&nbsp;
				<select class="ui selection dropdown" v-model="status[items.id]" @change="changes(items.id)">
					<option value="">{{items.preset.name}}</option>
					<option v-for="option in items.options" :value="option.id" style="font-size: 5px;">{{option.name}}</option>
				</select>
			</template>
			<template v-if="items.nohr == undefined || items.nohr == false">	
				<div style="padding: 7px;"></div>
			</template>
		</template>
		
	</div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'
import { ref, toRefs, watch, nextTick } from 'vue';
// const pages = require("pagination");
// import jqueryMin from '../assets/data/jquery.min';
$('.ui.dropdown')
  .dropdown()
;
export default {
	name: "Settings",
	emits: ['changes'],
	props: [
		'values',
		'status'
	],
	setup(props, ctx) {
		console.log("@3333");
		const totals = ref(props.values);
		const status = ref(props.status);
		nextTick().then(() => {
			$('.ui.dropdown')
			.dropdown()
			;
		})
		watch(
			() => totals,
			(count, prevCount) => {
				console.log("@3333");
				$('.ui.dropdown')
				.dropdown()
				;
			}
		)
		function changes(items, way = '') {
			if (way == "rev") {
				status.value[items] = !status.value[items];
			}
			ctx.emit('changes', {'id': items, 'data': status.value[items]});
		}
		function refreshSemantic() {
			$('.ui.dropdown').dropdown();
		}
		return {
			totals,
			status,
			changes
		}
	},
}
</script>
