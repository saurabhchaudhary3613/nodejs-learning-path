// call back pattern

function doWorkCallBack(callback) {

    setTimeout(() => {
        callback(undefined, [1,2,3]);
        // callback(['sa', 'ds'], undefined);
    },2000)
}

doWorkCallBack ((error, result) => {
    if(error) {
        return console.log(error);
    }
    console.log(result);
});

//Promise

const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(()=> {
        //resolve([4,5,6]);
        reject('Something went wromg!')
    }, 2000)
});

doWorkPromise.then((result) => {
    console.log('success!', result);
}).catch((error) => {
    console.log('Error!', error);
})

//
//                                      fullfilled
//                                     /
// Promise         ---- pending   --->
//                                     \
//                                      rejected
//                          




