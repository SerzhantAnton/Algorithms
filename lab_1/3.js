const arr = process.argv.slice(2).map(i => +i);

function insertionSort(arr) {
    let num = 2;    
    for (let i = 1, l = arr.length; i < l; i++) { // 2 + 3 *N
        const current = arr[i]; // 2 * N
        let j = i; // N
        num += 6;
        while (j > 0 && arr[j - 1] > current) { // 4
            arr[j] = arr[j - 1]; // 3
            j--; // 2
            num += 9;
        }
        arr[j] = current; // 2 * N
        num += 2;
    }

    return {
        num,
        arr
    };
};

const result = insertionSort(arr);
console.log(result);