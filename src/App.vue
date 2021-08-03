<template>
  <div class="share" v-if="!showError">
    <div class="share-tip">
      <span>使用微信扫描下方二维码分享</span>
    </div>
    <div class="share-info">
      <div class="share-info__title">
        <span>{{ title }}</span>
      </div>
      <div class="share-info__url">
        <span @click="jump">{{ url }}</span>
      </div>
    </div>
    <div class="share-qrcode">
      <qrcode :url="url" />
    </div>
  </div>
  <div class="share share-error" v-else>
    <div class="share-error__icon">
      <error-icon></error-icon>
    </div>
    <div class="share-error__msg">
      {{ errorMsg }}
    </div>
  </div>
  <div class="share-footer">
    <p>此页面非微信官方页面</p>
    <p>请您自行确认分享内容的安全性</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getQuery } from 'queryzz';
import qrcode from './components/QRCode.vue';
import errorIcon from './components/icons/Error.vue';

export default defineComponent({
  name: 'App',
  components: {
    qrcode,
    errorIcon,
  },
  setup() {
    const query = getQuery();
    let showError = false;
    let errorMsg = '';
    if (!query || !query.title || !query.url) {
      showError = true;
      errorMsg = '请输入正确的参数';
    }
    const { title, url } = query as { title: string; url: string };
    const jump = () => {
      if (!url) {
        return;
      }
      window.location.href = url;
    };
    return {
      showError,
      errorMsg,
      title,
      url,
      jump,
    };
  },
});
</script>

<style lang="less">
.share {
  margin: 2rem;
  user-select: none;
  &-tip {
    text-align: center;
    font-size: 1.125rem;
    font-weight: 600;
    letter-spacing: 0.05rem;
    padding-top: 2rem;
  }
  &-info {
    text-align: center;
    &__title {
      padding-top: 1rem;
      font-size: 1.125rem;
      span {
        max-width: 17.5rem;
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    &__url {
      padding-top: 0.625rem;
      font-size: 0.75rem;
      span {
        max-width: 19.25rem;
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: var(--text-link);
      }
    }
  }
}
.share-error {
  padding-top: 4.5rem;
  &__icon {
    width: max-content;
    margin: 0 auto;
    svg {
      width: 5rem;
      height: 5rem;
      path {
        fill: var(--error);
      }
    }
  }
  &__msg {
    margin-top: 1.75rem;
    text-align: center;
    font-size: 1.175rem;
    letter-spacing: 0.05rem;
  }
}
.share-footer {
  position: fixed;
  width: 100vw;
  bottom: 2.625rem;
  user-select: none;
  p {
    width: 100vw;
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin: 0 auto;
    line-height: 1.375rem;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    svg {
      width: 1rem;
      height: 1rem;
      margin-left: 0.5rem;
    }
  }
}

@media screen and (max-width: 767px) {
  .share {
    margin: 1.5rem;
    &-tip {
      padding-top: 1rem;
    }
    &-info {
      &__title {
        padding-top: 1.5rem;
      }
      &__url {
        padding-top: 0.75rem;
      }
    }
    &-qrcode {
      .qrcode-wrapper {
        padding-top: 1.125rem;
      }
    }
  }
}
</style>
