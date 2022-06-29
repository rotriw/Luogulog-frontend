<template>
    <div class="ui pagination menu">
        <a v-if="showPrevious() || currentPage <= 1" :class="{ disabled: currentPage <= 1 }" class="item" @click="changePage(1)">
            <i class="fa-duotone fa-angles-left"></i>
        </a>
        <a v-if="currentPage > 1" @click.prevent="changePage(currentPage - 1)" class="item">
			<i class="fa-duotone fa-angle-left"></i>
        </a>
        <a v-for="num in array" :class="{ active: num === currentPage }" class="item" @click.prevent="changePage(num)" :key="num">
            {{ num }}
        </a>
        <a v-if="showNext() || currentPage === lastPage || lastPage === 1000" :class="{ disabled: currentPage === lastPage || lastPage === 0 }" class="item">
            <i class="fa-duotone fa-angle-right"></i>
        </a>
        <a v-if="currentPage < lastPage" @click.prevent="changePage(currentPage + 1)" class="item">
            <i class="fa-duotone fa-angle-right"></i>
        </a>
		<div class="item">
			<div class="ui input"><input type="text" v-model="currentPage" @keyup.enter="changePage(currentPage)" @change="changePage(currentPage)" placeholder="Goto" /></div>
		</div>
    </div>
</template>

<script>
export default {
    props: {
        total: {
            type: Number,
            required: true,
        },
        pageSize: {
            type: Number,
            required: true,
        },
        callback: {
            type: Function,
            required: true,
        },
        options: {
            type: Object,
		},
		curret: {
			type: Number,
		}
    },
    data() {
        return { currentPage: this.curret };
    },
    computed: {
        _total() {
            return this.total;
        },
        _pageSize() {
            return this.pageSize;
        },
        lastPage() {
            let _total = this._total / this._pageSize;
            if (_total < 1) return 1;

            if (_total % 1 != 0) return parseInt(_total + 1);

            return _total;
        },
        array() {
            let _from = this.currentPage - this.config.offset;
            if (_from < 1) _from = 1;

            let _to = _from + this.config.offset * 2;
            if (_to >= this.lastPage) _to = this.lastPage;

            let _arr = [];
            while (_from <= _to) {
                _arr.push(_from);
                _from++;
            }

            return _arr;
        },
        config() {
            return Object.assign(
                {
                    offset: 2,
                    previousText: "«",
                    nextText: "»",
                    alwaysShowPrevNext: true,
                },
                this.options
            );
        },
    },
    methods: {
        showPrevious() {
            return this.config.alwaysShowPrevNext || this.currentPage > 1;
        },
        showNext() {
            return this.config.alwaysShowPrevNext || this.currentPage < this.lastPage;
        },
        changePage(page) {
            // if (this.currentPage === page) return;
			console.log("23333");
            this.currentPage = page;
            this.callback(page);
        },
    },
};
</script>
