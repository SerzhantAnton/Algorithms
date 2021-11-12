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

console.log('before sort');

function mergeSort(arr) {
    if (arr.length > 1) {
		mid = Math.floor(arr.length / 2);

		let L = arr.slice(0, mid);
		let R = arr.slice(mid + 1);

		// insertion_sort(L) if len(L) < k else hybrid_merge_sort(L, k)
		// insertion_sort(R) if len(R) < k else hybrid_merge_sort(R, k)

        if (L.length < k) {
            insertionSort(L);
        } else {
            mergeSort(L);
        }

        if (R.length < k) {
            insertionSort(R);
        } else {
            mergeSort(R);
        }

		let i = j = f = 0

		while (i < L.length && j < R.length) {
			if (L[i] < R[j]) {
				arr[f] = L[i]
				i += 1
            }
                else {
				arr[f] = R[j]
				j += 1
            }
			f += 1	
        }

		while (i < L.length) {
			arr[f] = L[i]
			i += 1
		    f += 1
        }

		while (j < R.length) {
			arr[f] = R[j]
			j += 1
			f += 1
        }
    }
};

function merge(a, l, m, r) {
    
        // Find sizes of two subarrays to be merged
        let n1 = m - l + 1;
        let n2 = r - m;
        let arr = [...a];
        /* Create temp arrays */
        let L = [];
        let R = [];

        /*Copy data to temp arrays*/
        for (let i = 0; i < n1; ++i)
            L[i] = arr[l + i];
        for (let j = 0; j < n2; ++j)
            R[j] = arr[m + 1 + j];

        /* Merge the temp arrays */

        // Initial indexes of first and second subarrays
        let i = 0, j = 0;

        // Initial index of merged subarray array
        let k = l;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            }
            else {
                arr[k] = R[j];
                j++;
            }
            k++;
        }

        /* Copy remaining elements of L[] if any */
        while (i < n1) {
            arr[k] = L[i];
            i++;
            k++;
        }

        /* Copy remaining elements of R[] if any */
        while (j < n2) {
            arr[k] = R[j];
            j++;
            k++;
        }
};

function calculate(arr) {
    const GAP = N/50;
    let bestK = -1;
    let minTime = Number.MAX_VALUE;
    for( ; k < N/2; ) {    
        k += GAP;
        console.log('k', k);
        copy = [...arr].map(item => [...item]);
        // console.log('copy', copy);
        let start = Date.now();
        for (let sub of copy) {
            mergeSort(sub, 0, sub.length - 1);
            // console.log(sub);
        }
        let end = Date.now();
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