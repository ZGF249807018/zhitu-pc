<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <!--<div class="logo"><img src="../../../../assets/images/logo.png" alt=""></div>-->
    <el-row :span="12" class="menu-head">
      <el-col>
        <span>我的控制台</span>
        <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      </el-col>
    </el-row>

    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#333740"
      text-color="#fff"
      active-text-color="#2961E9"
    >
      <sidebar-item v-for="route in routes" :key="route.name" :item="route" :base-path="route.path"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import Hamburger from '@/components/Hamburger'
export default {
  data() {
    return {
      img: process.env.IMG_API,
      defaultImg: './static/menuHead.png'
    }
  },
  components: { SidebarItem, Hamburger },
  computed: {
    ...mapGetters([
      'sidebar',
      'company',
      'logo'
    ]),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    }
  }
}
</script>

