<template>
  <div class="container">
    <h1 class="section-title">Monocular Depth Estimation based on Diffusion Model</h1>
    <div class="carousel-section" v-for="(group, index) in carousels" :key="index">
      <h2 class="section-title">Gallery</h2>
      <div :class="['carousel-wrapper', group.aspectClass]">
        <button class="carousel-btn prev" :disabled="true">&lt;</button>
        <button class="carousel-btn next">&gt;</button>
        <div class="carousel">
          <div class="column" v-for="(pairGroup, colIndex) in group.columns" :key="colIndex">
            <div class="image-box" v-for="(pair, pairIndex) in pairGroup" :key="pairIndex">
              <div class="image-comparison">
                <div class="image-container">
                  <div class="image-before" :style="{ backgroundImage: `url(${pair.before})` }"></div>
                  <div class="image-after" :style="{ backgroundImage: `url(${pair.after})` }"></div>
                  <div class="image-label left">{{ pair.labelLeft }}</div>
                  <div class="image-label right">{{ pair.labelRight }}</div>
                </div>
                <div class="divider"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-nav"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DepthCarousel",
  data() {
    return {
      carousels: [
        {
          aspectClass: "carousel-4-3",
          columns: [
            [
              {
                before: "./image/test-image/inside-01.jpg",
                after: "./image/depth_train/inside-01_pred_colored.png",
                labelLeft: "Input",
                labelRight: "Ours",
              },
              {
                before: "./image/depth_pretrain/inside-01_pred_colored.png",
                after: "./image/depth_train/inside-01_pred_colored.png",
                labelLeft: "Marigold",
                labelRight: "Ours",
              },
            ],
            // ...其他列
          ],
        },
        {
          aspectClass: "carousel-3-4",
          columns: [
            [
              {
                before: "./image/test-image/inside-02.jpg",
                after: "./image/depth_pretrain/inside-02_pred_colored.png",
                labelLeft: "Input",
                labelRight: "Ours",
              },
              {
                before: "./image/depth_pretrain/inside-02_pred_colored.png",
                after: "./image/depth_train/inside-02_pred_colored.png",
                labelLeft: "Marigold",
                labelRight: "Ours",
              },
            ],
            // ...其他列
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
/* 复制你现有 CSS 中的样式，可略 */
</style>
