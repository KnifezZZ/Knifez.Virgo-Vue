<template>
	<div class="right-menu">
		<a-dropdown>
			<a-avatar shape="square" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"> </a-avatar>
			<template #overlay>
				<a-menu class="user-drop">
					<a-menu-item key="0" @click="password">
						<v-icon icon="lock-password"></v-icon>
						<span>密码修改</span>
					</a-menu-item>
					<a-menu-item key="dev-genpage" @click="password">
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
	</div>
</template>

<script>
import VIcon from '@/components/v-icon'
export default {
	name: 'VHeader',
	components: {
		VIcon,
	},
	methods: {
		password() {},
		logOut() {
			this.$store.dispatch('user/doLogOut')
			this.$router.push(`/login?redirect=${this.$route.path}`)
		},
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
