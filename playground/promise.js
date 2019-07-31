// call back pattern

// function doWorkCallBack(callback) {

//     setTimeout(() => {
//         callback(undefined, [1,2,3]);
//         // callback(['sa', 'ds'], undefined);
//     },2000)
// }

// doWorkCallBack ((error, result) => {
//     if(error) {
//         return console.log(error);
//     }
//     console.log(result);
// });

//Promise

// const doWorkPromise = new Promise((resolve, reject) => {
//     setTimeout(()=> {
//         //resolve([4,5,6]);
//         reject('Something went wromg!')
//     }, 2000)
// });

// doWorkPromise.then((result) => {
//     console.log('success!', result);
// }).catch((error) => {
//     console.log('Error!', error);
// })

//
//                                      fullfilled
//                                     /
// Promise         ---- pending   --->
//                                     \
//                                      rejected
//                          


const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}

// add(1,2).then((sum) => {
//     console.log(sum)
//      add(sum, 3).then((sum2) => {
//         console.log(sum2)
//     }).catch(e => console.log(e))
// }).catch(e => console.log(e))

add(1,2).then((sum) => {
    console.log(sum)
    return add(sum, 5)
}).then((sum2) => {
    console.log(sum2)
    return add(sum2, 10)
}).then((sum3) => {
    console.log(sum3)
})
.catch((e) => {
    console.log(e)
})
