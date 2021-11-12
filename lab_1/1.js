const arguments = process.argv.slice(2, 5).map(i => +i);

let k = 5;
let N = 5;
let copy = [];

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function generateArr(r, n, m) {
    const arr = [];
    N = n;
    for (let i = 0; i < r; i++) {
        arr.push(Array.from({ length: n }, () => randomInteger(1, m)));
    }
    return arr;
}
console.log('argumetns', arguments);
const arr = generateArr(...arguments);

function insertionSort(array) {
    for (let i = 1; i < array.length; i++) {
		let key = array[i];

		let j = i - 1
		while (j >= 0 && key < array[j]) {
            array[j + 1] = array[j]
			j -= 1
        }
		array[j + 1] = key
    }
};

function swap(items, firstIndex, secondIndex){
    const temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}

function partition(array, left, right) {
    let i = left - 1
	let pivot = array[right]

	for (let j = left; j < right; j++) {
        if (array[j] <= pivot) {
			i += 1
			// array[i], array[j] = array[j], array[i]
            swap(array, i, j);
        }
    }
	// array[i + 1], array[right] = array[right], array[i + 1]
    swap(array, i + 1, right);

	return i + 1
}

function quickSort(array, left, right) {
    if (array.length == 1) {
        return
    }
    if (right - left + 1 < k) {
		// temp = array[left:right + 1]
        let temp = array.slice(left, right + 1);
		insertionSort(temp)
		for(let i = left; i < right + 1; i++) {
			array[i] = temp[i - left]
        }
    }
	else if ( left < right) {
		p = partition(array, left, right)
		quickSort(array, left, p - 1)
		quickSort(array, p + 1, right)
    }
}

function calculate(arr) {
    const GAP = N/50;
    let bestK = -1;
    let minTime = Number.MAX_VALUE;
    for( ; k < N/2; ) {    
        k += GAP;
        console.log('k', k);
        copy = [...arr].map(item => [...item]);
        let start = new Date().getTime();
        for (let sub of copy) {
            quickSort(sub, 0, sub.length - 1);
            // console.log(sub);
        }
        let end = new Date().getTime();
        let currentTime = end - start;
        if (currentTime < minTime) {
            minTime = currentTime;
            bestK = k;
        }
        console.log(`Execution time = ${ currentTime }`);
        console.log("===================================================================================");
        // console.log(copy);
    }
    
    console.log("Minimum execution time: " + minTime + " miliseconds with K = " + bestK);
}

calculate(arr);
