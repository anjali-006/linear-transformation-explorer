function parseMatrix(input) {
  const rows = input.trim().split('\n');
  const matrix = rows.map(row => row.split(',').map(Number));
  return matrix;
}

function rref(matrix) {
  const m = JSON.parse(JSON.stringify(matrix)); // Deep copy
  const rowCount = m.length;
  const colCount = m[0].length;
  let lead = 0;

  for (let r = 0; r < rowCount; r++) {
    if (colCount <= lead) return m;
    let i = r;
    while (m[i][lead] === 0) {
      i++;
      if (i === rowCount) {
        i = r;
        lead++;
        if (colCount === lead) return m;
      }
    }

    [m[i], m[r]] = [m[r], m[i]];

    let val = m[r][lead];
    for (let j = 0; j < colCount; j++) m[r][j] /= val;

    for (let i = 0; i < rowCount; i++) {
      if (i !== r) {
        val = m[i][lead];
        for (let j = 0; j < colCount; j++) {
          m[i][j] -= val * m[r][j];
        }
      }
    }
    lead++;
  }
  return m;
}

function calculateRank(matrix) {
  const ref = rref(matrix);
  let rank = 0;
  for (let row of ref) {
    if (row.some(val => Math.abs(val) > 1e-10)) {
      rank++;
    }
  }
  return rank;
}

function processMatrix() {
  const input = document.getElementById('matrixInput').value.replace(/\\n/g, '\n');
  const matrix = parseMatrix(input);
  console.log('Matrix:', matrix);

  if (!Array.isArray(matrix) || matrix.length < 2 || matrix.length > 3 || matrix.some(row => row.length !== matrix[0].length)) {
    document.getElementById('vector-plot').innerHTML = 'Matrix must be 2x2 or 3x3 with equal row lengths.';
    return;
  }

  const rank = calculateRank(matrix);
  const nullity = matrix[0].length - rank;
  const colCount = matrix[0].length;
  const theoremHolds = (rank + nullity === colCount);

  document.getElementById('rank').innerText = 'Rank: ' + rank;
  document.getElementById('nullity').innerText = 'Nullity: ' + nullity;
  document.getElementById('theorem').innerText = `Rank + Nullity = ${rank} + ${nullity} = ${rank + nullity} → ${theoremHolds ? '✅ Holds' : '❌ Fails'}`;
  document.getElementById('kernel').innerText = 'Kernel: ' + (nullity === 0 ? 'Only zero vector' : 'Non-trivial');
  document.getElementById('range').innerText = 'Range: ' + (rank === colCount ? 'Full space' : 'Lower-dimensional subspace');

  if ((matrix.length === 2 && matrix[0].length === 2) || (matrix.length === 3 && matrix[0].length === 3)) {
    visualize(matrix);
  } else {
    document.getElementById('vector-plot').innerHTML = 'Visualization only supported for 2×2 or 3×3 matrices.';
  }
}

function matrixMultiply(matrix, vector) {
  return [
    matrix[0][0] * vector[0] + matrix[0][1] * vector[1],
    matrix[1][0] * vector[0] + matrix[1][1] * vector[1]
  ];
}

function mathMultiply3D(matrix, vector) {
  const result = [];
  for (let i = 0; i < 3; i++) {
    let sum = 0;
    for (let j = 0; j < 3; j++) {
      sum += matrix[i][j] * vector[j];
    }
    result.push(sum);
  }
  return result;
}

function visualize(matrix) {
  const dim = matrix.length;

  if (dim === 2 && matrix[0].length === 2) {
    const vector = [1, 1];
    const transformed = matrixMultiply(matrix, vector);

    const data = [
      {
        x: [0, vector[0]],
        y: [0, vector[1]],
        mode: 'lines+markers',
        name: 'Original Vector',
        line: { color: 'blue' }
      },
      {
        x: [0, transformed[0]],
        y: [0, transformed[1]],
        mode: 'lines+markers',
        name: 'Transformed Vector',
        line: { color: 'red' }
      }
    ];

    const layout = {
      title: '2D Matrix Transformation',
      xaxis: { range: [-5, 5], title: 'X' },
      yaxis: { range: [-5, 5], title: 'Y' },
      showlegend: true
    };

    Plotly.newPlot('vector-plot', data, layout);

  } else if (dim === 3 && matrix[0].length === 3) {
    const vectors = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
      [1, 1, 1]
    ];

    const data = [];

    vectors.forEach((vec, i) => {
      const transformed = mathMultiply3D(matrix, vec);

      data.push({
        type: 'scatter3d',
        mode: 'lines+markers',
        name: `v${i + 1} original`,
        x: [0, vec[0]],
        y: [0, vec[1]],
        z: [0, vec[2]],
        line: { color: 'blue', width: 4 }
      });

      data.push({
        type: 'scatter3d',
        mode: 'lines+markers',
        name: `v${i + 1} transformed`,
        x: [0, transformed[0]],
        y: [0, transformed[1]],
        z: [0, transformed[2]],
        line: { color: 'red', width: 4 }
      });
    });

    const layout = {
      title: '3D Matrix Transformation',
      scene: {
        xaxis: { title: 'X', range: [-5, 5] },
        yaxis: { title: 'Y', range: [-5, 5] },
        zaxis: { title: 'Z', range: [-5, 5] }
      },
      showlegend: true
    };

    Plotly.newPlot('vector-plot', data, layout);
  }
}
  