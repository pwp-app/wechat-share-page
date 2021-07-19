<template>
  <img :src="source" v-if="loaded" />
  <div class="qrcode-loading" v-else>
    <loading-icon />
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
