import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
	{
		path: "/",
		name: "home",
		component: Home,
	},
	{
		path: "/search",
		name: "Search",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ "../views/Search.vue"),
	},
	{
		path: "/setting",
		name: "Setting",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ "../views/Setting.vue"),
	},
	{
		path: "/discuss/:id",
		name: "discussT",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ "../views/Discuss.vue"),
	},
	{
		path: "/login",
		name: "Login",
		component: () => import(/* webpackChunkName: "about" */ "../views/Login.vue"),

	},
	{
		path: "/register",
		name: "Register",
		component: () => import(/* webpackChunkName: "about" */ "../views/Register.vue"),

	},
	{
		path: "/about",
		name: "About",
		component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),

	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
