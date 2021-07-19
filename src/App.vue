<template>
  <div class="share">
    <div class="share-tip">
      <span>使用微信扫描下方二维码分享</span>
    </div>
    <div class="share-info">
      <div class="share-info-title">
        <span>{{ title }}</span>
      </div>
      <div class="share-info-url">
        <span>{{ url }}</span>
      </div>
    </div>
    <div class="share-qrcode">
      <qrcode :url="url" />
    </div>
    <div class="share-footer">
      <p>此页面非微信官方页面</p>
      <p>Developed by BackRunner.<github-icon /></p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getQuery } from 'queryzz';
import qrcode from './components/QRCode.vue';
import githubIcon from './components/icons/GitHub.vue';

export default defineComponent({
  name: 'App',
  components: {
    qrcode,
    githubIcon,
  },
  setup() {
    const query = getQuery();
    let showError = false;
    let errorMsg = '';
    if (!query || !query.title || !query.url) {
      showError = true;
      errorMsg = '请输入正确的参数';
    }
    const { title, url } = query;
    return {
      showError,
      errorMsg,
      title,
      url,
    };
  },
});
</script>

<style lang="less">
.share {
  margin: 2rem;
}
</style>
