<template>
  <div class="about">
    <div class="photo">
      <Loader 
        v-if="imageLoading"
        absolute />
      <img 
        :src="image" 
        :alt="name" />
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div>{{ email }}</div>
    <div>{{ blog }}</div>
    <div>{{ phone }}</div>
  </div>
</template>

<script>
import Loader from '~/components/Loader'
export default {
  data() {
    return {
      imageLoading: true
    }
  },
  components: {
    Loader
  },
  computed: {
    // 코드 비효율적 => vuex helper 이용
    image() {
      return this.$store.state.about.image;
    },
    name() {
      return this.$store.state.about.name;
    },
    email() {
      return this.$store.state.about.email;
    },
    blog() {
      return this.$store.state.about.blog;
    },
    phone() {
      return this.$store.state.about.phone;
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      await this.$loadImage(this.image)
      // console.log("test", this.$loadImage(this.image));
      this.imageLoading = false;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/scss/main";

.about {
  text-align: center;
  .photo {
    width: 250px;
    height: 250px;
    margin: 40px auto 20px;
    padding: 30px;
    border: 1px solid $gray-300;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    position: relative;
    img {
      border-radius: 70%;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .name {
    font-size: 40px;
    font-family: "Oswald", "sans-serif";
    margin-bottom: 20px;
  }
}

</style>