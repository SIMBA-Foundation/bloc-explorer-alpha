/**
 * Codag Chart Component
 */
import echarts from "echarts";

export default {
    props: ["elemtarget", "chartdata", "chartlinks", "codagLevels"],
    data() {
        return {
            drawInit: false,
            chartFn: null
        };
    },
    render() {},
    mounted() {
        const { elemtarget, chartdata, chartlinks, codagLevels } = this;
        this.renderChart(elemtarget, chartdata, chartlinks, codagLevels, true);
    },
    methods: {
        renderChart(elemtarget, chartdata, chartlinks, codagLevels, isInit) {
            var levels = codagLevels;
            var data = chartdata;
            var getXAxisOpts = () => {
                return {
                    type: "category",
                    data: levels,
                    boundaryGap: false,
                    triggerEvent: true,
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: "#999",
                            type: "dashed"
                        }
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        backgroundColor: "#577ceb",
                        borderColor: "#fff",
                        color: "#fff",
                        borderRadius: 2,
                        fontSize: 12,
                        margin: 0,
                        padding: [3, 5, 3, 5]
                    }
                };
            };
            var _options = {
                    title: {
                        text: ""
                    },
                    tooltip: {
                        position: "top",
                        formatter: function(params) {
                            if (params.value && params.value[2]) {
                                return params.value[2];
                            }
                        }
                    },
                    grid: {
                        left: 30,
                        bottom: 20,
                        right: 40,
                        top: 10,
                        containLabel: true
                    },
                    xAxis: [getXAxisOpts(), getXAxisOpts()],
                    yAxis: {
                        type: "value",
                        boundaryGap: false,
                        axisLine: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        max: 11,
                        axisLabel: {
                            show: false
                        }
                    },
                    series: [
                        {
                            type: "graph",
                            edgeSymbol: ["circle", "arrow"],
                            edgeSymbolSize: [2, 3],
                            coordinateSystem: "cartesian2d",
                            symbolSize: 12,
                            links: chartlinks,
                            itemStyle: {
                                normal: {
                                    color: "#be8635",
                                    borderColor: "#fff",
                                    borderWidth: 1,
                                    shadowColor: "rgba(0, 0, 0, 0.3)"
                                }
                            },
                            lineStyle: {
                                normal: {
                                    width: 0.5,
                                    curveness: 0.1,
                                    opacity: 0.5,
                                    color: "#eac736",
                                    shadowBlur: 0.5,
                                    shadowColor: "rgba(0, 0, 0, 0.4)"
                                }
                            },
                            data: data,
                            z: 20
                        },
                        {
                            name: "Punch Card",
                            type: "scatter",
                            symbolSize: 10,
                            data: data
                        }
                    ]
                },
                drawFn = isAnimation => {
                    _options.animation = isAnimation;
                    this.chartFn.setOption(_options);
                };
            if (isInit || this.drawInit) {
                if (this.chartFn == null) {
                    this.chartFn = echarts.init(document.getElementById(elemtarget));
                    this.chartFn.showLoading();
                    this.chartFn.on("click", param => {
                        if (param.dataType == "node") {
                            location.href = "/blockchain/block/" + param.data[2];
                        }
                    });
                }
                drawFn(this.drawInit);
                setTimeout(() => {
                    this.drawInit = true;
                    this.chartFn.hideLoading();
                }, 1000);
            }
        }
    }
};
