import { useEffect, useState } from "react";

function useNeighbors() {
  // const [neighbors, setNeighbors] = useState([]);

  function getValidNeighors(grid, position) {
    // Array to hold the closest neighbors
    const closest = [];

    // console.log("close", closest);

    //
    closest.push(grid[position[0] - 1][position[1]]);
    closest.push(grid[position[0] + 1][position[1]]);
    closest.push(grid[position[0]][position[1] + 1]);
    closest.push(grid[position[0]][position[1] - 1]);
    // Iterate over the 8 possible neighbor positions
    // for (let i = -1; i <= 1; i++) {
    //   for (let j = -1; j <= 1; j++) {
    //     // Skip the current position
    //     if (i === 0 && j === 0) {
    //       continue;
    //     }
    //     console.log("close", closest);
    //     // Get the neighbor's position
    //     const neighborRow = position.row + i;
    //     const neighborCol = position.col + j;

    //     // Check if the neighbor is within the bounds of the grid
    //     if (
    //       neighborRow >= 0 &&
    //       neighborRow < grid.length &&
    //       neighborCol >= 0 &&
    //       neighborCol < grid[0].length
    //     ) {
    //       // Add the neighbor to the closest array
    //       closest.push({ row: neighborRow, col: neighborCol });
    //     }
    //   }
    // }

    // return closest;
  }

  function getDistance(a, b) {
    // Calculate the distance between two points using the Pythagorean theorem
    const xDist = Math.abs(a.col - b.col);
    const yDist = Math.abs(a.row - b.row);
    const distance = Math.sqrt(xDist * xDist + yDist * yDist);

    return distance;
  }

  const getNeighbors = (grid, start, end) => {
    const distances = [];
    // console.log("args", grid, start, end);

    // Get the closest neighbors to the starting point
    const closestNeighbors = getClosestNeighbors(grid, start);

    // console.log("closest", closestNeighbors);

    // Calculate the distances to the end point for each neighbor
    closestNeighbors.forEach((neighbor) => {
      const distance = getDistance(neighbor, end);
      distances.push({ neighbor, distance });
    });

    // Sort the neighbors by distance to the end point
    distances.sort((a, b) => a.distance - b.distance);

    // console.log("distance", distances);

    // Map the neighbors array to only contain the neighbors' positions
    const neighborPositions = distances.map((distance) => distance.neighbor);

    // Set the state with the sorted array of neighbor positions
    // setNeighbors(neighborPositions);
    return neighborPositions;
  };

  return { getNeighbors };
}

export default useNeighbors;
