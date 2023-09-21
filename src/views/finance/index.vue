<template>
  <div class="finace">
    <el-form v-model="searchForm" :rules="rules" :inline="true">

      <el-form-item label="核对时间：">
        <el-date-picker v-model="searchForm.createTimeRange" type="daterange" range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getfinList(searchForm)">查询</el-button>
      </el-form-item>

    </el-form>
    <el-table border height="450" :data="finList" style="color:#409EEF;">
      <el-table-column label="订单总量" prop="orderCount" />
      <el-table-column label="总收入（元）" prop="money" />
    </el-table>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card shadow="hover">
          <div id="chart1" class="schart"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card shadow="hover">
          <div id="chart2" class="schart"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getfinList } from '@/api/finance';
import Echarts from './echarts';
export default {
    mounted() {
        this.getfinList();
        this.initEchart();
    },
    data() {
        return {
            searchForm: {
                createTimeRange: '',
                statTime: '',
                endTime: ''
            },
            finList: [],
            rules: {
                createTimeRange: [{ required: true, message: '请输入', trigger: 'blur' }]
            },
            chart1: null,
            chart2: null,
            options1: {
                title: {
                    text: 'Stacked Area Chart'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
                },

                grid: {
                    left: 0,
                    right: 0,
                    bottom: 0,
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'Email',
                        type: 'line',
                        stack: 'Total',
                        areaStyle: {},

                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: 'Union Ads',
                        type: 'line',
                        stack: 'Total',
                        areaStyle: {},

                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: 'Video Ads',
                        type: 'line',
                        stack: 'Total',
                        areaStyle: {},

                        data: [150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name: 'Direct',
                        type: 'line',
                        stack: 'Total',
                        areaStyle: {},

                        data: [320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name: 'Search Engine',
                        type: 'line',
                        stack: 'Total',
                        label: {
                            show: true,
                            position: 'top'
                        },
                        data: [820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ]
            },
            options2: {
                grid: {
                    left: 0,
                    right: 0,
                    bottom: 0,
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: 'bar'
                    }
                ]
            }
        };
    },

    methods: {
        getfinList() {
            getfinList(this.searchForm).then((res) => {
                if (res.data.code === 0) {
                    this.finList = res.data.data;
                }
            });
        },
        initEchart() {
            // 获取容器元素
            const container1 = document.getElementById('chart1');
            const container2 = document.getElementById('chart2');

            // 创建echarts实例
            this.chart1 = Echarts.init(container1);
            this.chart2 = Echarts.init(container2);

            // 使用配置项和数据渲染图表
            this.chart1.setOption(this.options1);
            this.chart2.setOption(this.options2);

            window.addEventListener('resize', this.echartsResize);
        },
        echartsResize() {
            this.chart1.resize();
            this.chart2.resize();
        }
    },
    beforeDestroy() {
        this.chart1 = null;
        this.chart2 = null;
        window.removeEventListener('resize', this.echartsResize);
    }
};
</script>

<style lang="less" scoped>
.finace {
    height: 100%;
    .el-form {
        .el-form-item {
            margin-right: 30px;
        }
    }
}
.schart {
    width: 100%;
    height: 300px;
}
</style>
