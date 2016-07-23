// 基于准备好的dom，初始化echarts实例
var figure1 = echarts.init(document.getElementById('chart-1'));
var figure2 = echarts.init(document.getElementById("figure-2"));


$.get("/articles/types", (data, status) => {
    option = {
        title: {
            text: "文章类型分布"
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        // legend: {
        //     orient: 'vertical',
        //     x: 'left',
        //     data: data.map((item) => {
        //         return item.type
        //     })
        // },
        series: [{
            name: '文章类型',
            type: 'pie',
            radius: ['70%', '90%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '14',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: data.map((item) => {
                return {
                    value: item.total,
                    name: item.type
                }
            })
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    figure1.setOption(option);
})

$.get("/articles/publishers", (data, status) => {
    console.log(data);
    option = {
        title: {
            text: '文章分布',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['文章数']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: data.map((item) => {
                return item.publisher
            })
        },
        series: [{
            name: "文章数",
            type: 'bar',
            data: data.map((item) => {
                return item.total
            })
        }]
    };

    figure2.setOption(option);

})