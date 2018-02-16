

var template =`
<div>
    <h1>Data Visualization</h1>
    <column-chart xtitle="Stats" :data="data1" ></column-chart>
</div>
`;

Vue.component('data-visualization', {
    template: template,
    props: {
        data1: {
        type: Object
    }
    }
})
