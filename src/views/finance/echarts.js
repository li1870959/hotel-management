// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
import 'echarts/lib/component/legend';

// 引入柱状图图表，图表后缀都为 Chart
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import { TitleComponent, TooltipComponent, GridComponent, DatasetComponent, TransformComponent } from 'echarts/components';
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';

// **引入组件 都是以Chart结尾 关键 我这里只用到了折线图, 如果要引入饼状图 PieChart
import { LineChart, BarChart } from 'echarts/charts';

// 注册必须的组件
echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,

    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
    LineChart, //折线图
    BarChart //柱状图
]);

export default echarts;
