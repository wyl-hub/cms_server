function test(grid, k) {
    const m = grid.length
    const n = grid[0].length
    while(k > 0) {
        const end = grid[m - 1][n - 1]
        for (let i = 0; i < m; ++i) {
            if (i === 0) grid[i].unshift(end)
            else grid[i].unshift(grid[i -1][n])
        }

        for (let i = 0; i < m; ++i) {
            grid[i].pop()
        }
        k--
    }
    console.log(grid)
}

const arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

test(arr, 1)