'use strict';

// Data will be sent in brazilian standard. Transform here
export function checkNumber(data) {

  data = parseFloat(data.replace(/,/g, '.'));

  if(isNaN(data))
    return null;
  else
    return data;
}
