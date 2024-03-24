let statNames = [];
let baseStats = [];

function renderChart(i, canvasField) {
  i--;
  let stats = currentPokemons[i]['stats'].length;

  statNames.splice(i, statNames.length);
  baseStats.splice(i, baseStats.length);

  forLoopstatNames(stats, i);

  statsChart(i, canvasField);
}

function forLoopstatNames(stats, i) {
    for (let j = 0; j < stats; j++) {
      let currentStatNames = currentPokemons[i]['stats'][j]['stat']['name'];
      statNames.push(currentStatNames);
    }
    forLoopbaseStats(stats, i);
}

function forLoopbaseStats(stats, i) {
    for (let j = 0; j < stats; j++) {
      let currentBaseStats = currentPokemons[i]['stats'][j]['base_stat'];
      baseStats.push(currentBaseStats);
    }
}

function statsChart(i, canvasField) {
  let canvas = document.createElement('canvas');
  canvas.id = `myChart${i}`;
  canvasField.appendChild(canvas);

  new Chart(canvas, {
      type: 'polarArea',
      data: {
          labels: statNames,
          datasets: [{
              label: 'Base Stats',
              data: baseStats,
              backgroundColor: [
                  'yellow',
                  'red',
                  'green',
                  'blue',
                  'gray',
                  'white'
              ],
              borderColor: 'gray',
              borderWidth: 0.5,
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
}