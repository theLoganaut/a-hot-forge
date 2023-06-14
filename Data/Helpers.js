export function findNearestPoint(grid, start, end) {
  const visited = new Set();
  const queue = [start];
  const distances = new Map();
  distances.set(start, 0);

  const getDistance = (point1, point2) => {
    const dx = point1[0] - point2[0];
    const dy = point1[1] - point2[1];
    return Math.sqrt(dx * dx + dy * dy);
  };

  const nearbyPoints = [];

  while (queue.length > 0) {
    const curr = queue.shift();
    visited.add(curr);

    if (curr[0] === end[0] && curr[1] === end[1]) {
      // Found the end point
      return null;
    }

    for (const dir of [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ]) {
      const neighbor = [curr[0] + dir[0], curr[1] + dir[1]];
      if (isPointInGrid(grid, neighbor) && !visited.has(neighbor)) {
        const distance = getDistance(neighbor, end);
        distances.set(neighbor, distance);
        // i believe insert sorted does the push?
        // nearbyPoints.push(neighbor);
        console.log("made it");
        insertSorted(
          nearbyPoints,
          neighbor,
          (a, b) => distances.get(a) - distances.get(b)
        );
        queue.push(neighbor);
      }
    }
  }

  if (distances.has(end)) {
    // Found a path to the end point
    return nearbyPoints[0];
  } else {
    // Couldn't find a path to the end point
    return null;
  }
}

// Helper function to insert elements into a sorted array
function insertSorted(array, element, comparator) {
  if (array.length === 0) {
    array.push(element);
    return;
  }

  let low = 0;
  let high = array.length - 1;
  let mid = Math.floor((low + high) / 2);

  while (low <= high) {
    if (comparator(element, array[mid]) < 0) {
      high = mid - 1;
    } else if (comparator(element, array[mid]) > 0) {
      low = mid + 1;
    } else {
      break; // element is already in the array
    }

    mid = Math.floor((low + high) / 2);
  }

  // insert element at the correct position
  if (comparator(element, array[mid]) > 0) {
    array.splice(mid + 1, 0, element);
  } else {
    array.splice(mid, 0, element);
  }
}

function isPointInGrid(grid, point) {
  const numRows = grid.length;
  const numCols = grid[0].length;
  const row = point[0];
  const col = point[1];

  if (row >= 0 && row < numRows && col >= 0 && col < numCols) {
    return true;
  } else {
    return false;
  }
}
