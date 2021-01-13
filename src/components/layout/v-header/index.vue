<template>
	<div class="right-menu">
		<a-dropdown>
			<a-avatar shape="square" :src="avatar"> </a-avatar>
			<template #overlay>
				<a-menu class="user-drop">
					<a-menu-item key="0" @click="password">
						<v-icon icon="lock-password"></v-icon>
						<span>密码修改</span>
					</a-menu-item>
					<a-menu-item key="dev-genpage" @click="genPage">
						<v-icon icon="vuejs"></v-icon>
						<span>生成代码</span>
					</a-menu-item>
					<a-menu-divider />
					<a-menu-item key="LogOut" @click="logOut">
						<v-icon icon="logout-circle"></v-icon>
						<span>退出登录</span>
					</a-menu-item>
				</a-menu>
			</template>
		</a-dropdown>
		<a-modal width="80%" title="生成代码" v-model:visible="visible" :footer="null">
			<virgo-produce></virgo-produce>
		</a-modal>
		<password :visible="passwordVisible" />
	</div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import VirgoProduce from './produce/index'
import Password from './password/index'
import { readFileApi } from '@/configs'
import { ref } from 'vue'
export default {
	name: 'VHeader',
	components: {
		VirgoProduce,
		Password,
	},
	data() {
		return {
			visible: false,
			passwordVisible: false,
		}
	},
	methods: {
		password() {
			this.passwordVisible = true
		},
		genPage() {
			this.visible = true
		},
		handleGenPageOk(e) {
			this.visible = false
		},
	},
	setup() {
		const router = useRouter()
		const store = useStore()
		let avatar = ref('https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png')
		avatar = readFileApi + store.getters['user/info'].PhotoId

		const logOut = () => {
			store.dispatch('user/doLogOut')
			router.push(`/login?redirect=${router.currentRoute.value.path}`)
		}
		return { logOut, avatar }
	},
}
</script>

<style lang="less">
.right-menu {
	float: right;
	height: 100%;
	line-height: 64px;
	padding-right: 10px;
	.ant-avatar {
		cursor: pointer;
	}
}
.user-drop {
	i {
		margin-right: 3px;
	}
}
</style>
