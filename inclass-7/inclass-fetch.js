// Inclass Fetch Exercise
// ======================
//
// Navigate to https://webdev-dummy.herokuapp.com/sample
//
// This endpoint returns a list of articles.  Your assignment is to
// write a function countWords that uses fetch() to query the endpoint,
// and return a map from the article id to the number of words in the
// article's text.
//
// Also write two "helper" functions that call this initial function.
//
// If there are any exceptions then fetch() will throw an error.
// Provide a "safe" version of the countWords function that always
// returns a map, which will be empty in the case of errors.
//
// Finally, write a function that returns the article id with the
// most number of words.
//
// Below I have provided you a template, you just need to fill in
// the implementation.
//
// Navigate to mocha-inclass-fetch.html to see if your implementation
// provides the expected results.
//
// Note that during the validation of the tests the browser will be
// directed to download invalid URLs which will result in error messages
// in the console:
//     GET https://webdev-dummy.herokuapp.com/badURL 404 (Not Found)
// this is expected and is not an error with your code.
//
(function(exports) {

    'use strict'
    const count = function (article) {
        return article['text'].split(' ').length;
    }

    function countWords(url) {
        // IMPLEMENT ME
        return fetch(url)
            .then(r => {
                const contentType = r.headers.get('Content-Type')
                if (contentType.indexOf('application/json') >= 0) {
                    return r.json()
                } else {
                    return r.text().then(msg => {
                        throw new Error(msg)
                    })
                }
            })
            .then(r => {
                let res = {};

                r[Object.keys(r)[0]].forEach(function (item) {
                    res[item['_id']] = count(item);
                })
                return res;
            }); 
    }

    function countWordsSafe(url) {
        // IMPLEMENT ME
        return countWords(url)
            .then(res => {
                
                //console.log('this is inside countWordsSafe')
                //throw new Error('There was a problem...')
                return res;
            })
            .catch(err => {
                console.error(`Error inside countWordsSafe: ${err.message}`);
                return { }
            })
    }

    function getLargest(url) {
        // IMPLEMENT ME
        return countWords(url)
            .then(res => {
                const max = Object.keys(res).reduce((a, b) => {
                    if (res[a] > res [b]) {
                        return a
                    } else {
                        return b
                    }
                })
                return max
            })
    }

    exports.inclass = {
        author: 'jw46',
        countWords, countWordsSafe, getLargest
    }

})(this);
