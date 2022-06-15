import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items) //This wraps the array as a lodash object so we can chain commands for readability
    .slice(startIndex)
    .take(pageSize)
    .value();
  //_.slice(items, startIndex)
  //_.take()
}