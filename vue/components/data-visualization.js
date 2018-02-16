

var template =`
<div>
    <h1>Data Visualization</h1>
    <pie-chart :data="{'2017-01-01': 11, '2017-01-02': 6}"></pie-chart>
</div>
`;

Vue.component('data-visualization', {
    template: template,
})
