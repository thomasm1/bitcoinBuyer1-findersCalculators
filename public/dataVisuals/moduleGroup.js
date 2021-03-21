// import { render } from './indexModule';

const Module = function (id) {
  document.getElementById(id).innerHTML = `  
    <svg id='thisSVG'>
    </svg>  
    `;

  const svg = d3.select('#thisSVG');
  svg.style('background', 'red');

  const width = +svg.attr('width', '600px');
  const height = +svg.attr('height');

  const colorScale = d3
    .scaleOrdinal()
    .domain(['BTC', 'ETH', 'HEX'])
    .range(['yellow', 'cyan', 'magenta']);

  const radiusScale = d3
    .scaleOrdinal()
    .domain(['BTC', 'ETH', 'HEX'])
    .range([50, 45, 30]);

  const xPosition = (d, i) => i * 100 + 110;

  const capsule = (selection,  props ) => {
    const { modules, height } = props;

    const groups = selection.selectAll('g')
    .data(modules);//, d => d.id); 

    const groupsEnter = groups.enter().append('g');
    groupsEnter.merge(groups) // enter+updateb
      .attr('transform', (d,i) =>
          `translate(${xPosition},${height/3})`
          )
    groups.exit()
      .transition().duration(1000)
      .attr('fill', 'black')
      .transition().duration(1000)
      .attr('r', 0)
      .remove();

    const circles = selection.selectAll('circle')
      .data(modules);//, d => d.id);  
      
    circles
      .enter().append('circle')
      .attr('cx', xPosition)
      .attr('cy', height / 3)
    .merge(circles) // enter+update
      // circles  // circles object IS the update function!!!!!
      .attr('r', (d) => radiusScale(d.type)) 
      .attr('fill', (d) => colorScale(d.type)); 
    circles.exit()
      .transition().duration(1000)
      .attr('fill', 'black')
      .transition().duration(1000)
      .attr('r', 0)
      .remove()
 
    const text = selection.selectAll('text')
      .data(modules);
    text.style('text-anchor','middle')
      .style('color','darkblue')
      .style('font-size','3rem');
    
    text
      .enter().append('text')
      .attr('x', xPosition)
      .attr('y', height / 3 + 80)
    .merge(text)  
      .text(d => d.type);  
    text.exit().remove()
  };

  const render = () => {
    capsule(svg, {
      modules,
      height: +svg.attr('height'),
    });
  };

  //////////////////////////////////////

  const makeModules = (type) => ({ 
    type,
    id: Math.random()
   }); 

  let modules = d3.range(5).map(() => makeModules('BTC'));

  render();

  setTimeout(() => {
    console.log('hey modules', modules);
    modules.pop();
    render();
  }, 1000);

  setTimeout(() => {
    modules[1].type = 'HEX';
    render();
  }, 2000);

  setTimeout(() => {
    modules[2].type = 'ETH';
    render();
  }, 3000);

  setTimeout(() => {
    modules = modules.filter((d,i) => i != 2);
    render();
  }, 4000);
};

let modInstance = new Module('module');
