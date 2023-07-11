import React, { Component } from 'react';
// import { plugins } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './Chart.scss';

// class CircularChart extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: {
//         datasets: [
//           {
//             data: [25, 50, 25],
//             backgroundColor: ['#F1F1F1', '#86CD74', '#FFCC6A'],
//             hoverbackgroundColor: ['#F1F1F1', '#86CD74', '#FFCC6A'],
//           },
//         ],
//       },
//     };
//   }

//   render() {
//     return (
//       <div>
//         chart
//         <Doughnut
//           height={100}
//           width={100}
//           options={{
//             cutoutPercentage: 70,
//             rotation: 160,
//             plugins: {
//               doughnutlabel: {
//                 labels: [
//                   {
//                     text: '100',
//                   },
//                   {
//                     text: 'total',
//                   },
//                 ],
//               },
//             },
//           }}
//           data={this.state.data}
//         />
//       </div>
//     );
//   }
// }

// export { CircularChart };

class CircularChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
    };
  }

  componentWillMount() {
    // Chart.pluginService.register({
    //   afterDraw: function (chart, easing) {
    //     var ctx = chart.ctx;
    //     var easingDecimal = easing || 1;
    //     var arcs = chart.data;
    //     Chart.helpers.each(arcs, function (arc, i) {
    //       // console.log(arc, i, "hey")
    //       // arc.transition(easingDecimal).draw();
    //       var pArc = arcs[i === 0 ? arcs.length - 1 : i - 1];
    //       var pColor = pArc._view.backgroundColor;
    //       var vm = arc._view;
    //       var radius = (vm.outerRadius + vm.innerRadius) / 2;
    //       var thickness = (vm.outerRadius - vm.innerRadius) / 2;
    //       var startAngle = Math.PI - vm.startAngle - Math.PI / 2;
    //       var angle = Math.PI - vm.endAngle - Math.PI / 2;
    //       ctx.save();
    //       ctx.translate(vm.x, vm.y);
    //       ctx.fillStyle = i === 0 ? vm.backgroundColor : pColor;
    //       ctx.beginPath();
    //       ctx.arc(radius * Math.sin(startAngle), radius * Math.cos(startAngle), thickness, 0, 2 * Math.PI);
    //       ctx.fill();
    //       ctx.fillStyle = vm.backgroundColor;
    //       ctx.beginPath();
    //       ctx.arc(radius * Math.sin(angle), radius * Math.cos(angle), thickness, 0, 2 * Math.PI);
    //       ctx.fill();
    //       ctx.restore();
    //     });
    //   }
    // });
  }

  render() {
    return (
      <Doughnut
        width="300"
        options={this.props.options}
        data={this.state.data}
      />
    );
  }
}

export { CircularChart };
