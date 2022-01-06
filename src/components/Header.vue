<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div 
        v-for="nav in navigations"
        :key="nav.name"
        class="nav-item">
        <RouterLink 
          :to="nav.href" 
          active-class="active"
          :class="{ active: isMatch(nav.path) }" 
          class="nav-link">
          {{ nav.name }}
        </RouterLink>
      </div>
    </div>
    <div
      class="user"
      @click="toAbout()">
      <img 
        :src="image"
        :alt="name" />
    </div>
  </header> 
</template>

<script>
import { mapState } from 'vuex'
import Logo from '~/components/Logo'
export default {
  components: {
    Logo
  },  
  data() {
    return {
      navigations: [
        {
          name:'Search',
          href: '/'
        },

        {
          name:'Movie',
          href: '/movie/tt4520988',
          path: /^\/movie/  // '/movie'
        },

        {
          name:'About',
          href: '/about'
        },
      ]
    }
  },
  computed: {
   ...mapState('about', [
     'image',
     'name'
   ])
  },
  methods: {
    isMatch(path) {
      if(!path) return false;
      console.log(this.$route);
      // 정규식 test() : 일치 여부 반환 
      // 이동 경로와 실제 경로가 일치 시 버튼 활성화
      return path.test(this.$route.fullPath);  
    },
    toAbout() {
      console.log('!!!');
      this.$router.push('/about');
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  height: 70px;
  padding: 0 40px;
  position: relative;
  display: flex;
  align-items: center;
  .logo {
    margin-right: 40px;
  }
  .user {
    width: 40px;
    height: 40px;
    padding: 6px;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    cursor: pointer;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 40px;
    margin: auto;
    transition: .4s;
    &:hover {
      // 어두운 배경 색상 지정
      background-color: darken($gray-200, 10%);
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 70%;
    }
  }
  @include media-breakpoint-down(sm) {
    .nav {
      display: none;
    }
  }
}
</style>