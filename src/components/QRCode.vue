<template>
  <div class="qrcode-wrapper">
    <img class="qrcode" :src="source" v-if="loaded" />
    <div class="qrcode qrcode-loading" v-else>
      <loading-icon />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue';
import loadingIcon from './icons/Loading.vue';

export default defineComponent({
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  components: {
    loadingIcon,
  },
  setup(props) {
    const loaded = ref(false);
    const feed: string = inject('qrcode_feed')!;
    const url = props.url.includes('?')
      ? `${props.url}&wechat_share=1`
      : `${props.url}?wechat_share=1`;
    const source = feed.replace('{url}', url);
    const image = new Image();
    image.src = source;
    image.onload = () => {
      loaded.value = true;
    };

    return {
      source,
      loaded,
    };
  },
});
</script>

<style lang="less">
.qrcode-wrapper {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2.75rem;
  box-sizing: border-box;
  position: relative;
  .qrcode {
    margin: 1.5rem auto;
    width: 12.5rem;
    height: 12.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      width: 2.5rem;
      height: 2.5rem;
    }
  }
}

.dark {
  .qrcode-wrapper {
    padding-top: 1.875rem;
    .qrcode {
      padding: 1.5rem;
      width: 10.5rem;
      height: 10.5rem;
      border-radius: 24px;
      background: var(--off-white);
      box-shadow: 4px 4px 28px rgba(0, 0, 0, 0.25);
    }
  }
}
</style>
