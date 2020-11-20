<template>
  <div></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  props: {
    option: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      chart: "",
      chartUrl: "",
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.initChart(this.$el);
      this.setOption(this.option);
      window.addEventListener("resize", this.resize);
    });
  },
  beforeDestroy() {
    this.dispose();
  },
  watch: {
    // 监视传入的 option 参数，如果有变化则重新设置配置项
    option(newOpt) {
      // eslint-disable-next-line no-console
      console.log("update config");
      this.setOption(newOpt);
    },
  },
  methods: {
    /**
     *  初始化图表
     */
    initChart(el) {
      // renderer 用于配置渲染方式 可以是 svg 或者 canvas
      const renderer = "canvas";
      this.chart = echarts.init(el, null, {
        renderer,
        width: "auto",
        height: "auto",
      });
    },
    /**
     * 设置配置项
     */
    setOption(option) {
      if (!this.chart) {
        return;
      }

      this.chart.setOption(option, true);
    },
    /**
     * 销毁
     */
    dispose() {
      if (!this.chart) {
        return;
      }

      this.chart.dispose();
      this.chart = null;
    },
    /**
     * 重新渲染
     */
    resize() {
      this.chart && this.chart.resize();
    },
    getInstance() {
      return this.chart;
    },
  },
};
</script>
