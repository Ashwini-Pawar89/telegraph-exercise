'use strict';

const dbComments = [{
            "id": 1,
            "date": "2019-04-23T22:26:43.511Z",
            "name": "Dawud Esparza",
            "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed gravida orci.",
            "likes": 33
            },
            {
            "id": 2,
            "date": "2019-04-23T19:26:41.511Z",
            "name": "Lennie Wainwright",
            "body": "Quisque maximus augue ut ex tincidunt sodales. Nullam interdum consectetur mi at pellentesque.",
            "likes": 4
        }];

function requestComments(url) {
  return new Promise((resolve, reject) => {
    process.nextTick(() =>
      url
        ? resolve(dbComments)
        : reject({
            error: 'Request for fetching Comments has failed.',
          }),
    );
  });
}

module.exports = {
    requestComments: requestComments
}
