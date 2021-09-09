exports.convertDate = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  return year + '/' + month + '/' + day;
};

exports.dateFormating = (date) => {
  const update = new Date(date);
  return `${update.getFullYear()}.${
    update.getMonth('mm') < 10 ? '0' + update.getMonth('mm') : update.getMonth('mm')
  }.${update.getDate('dd') < 10 ? '0' + update.getDate('dd') : update.getDate('dd')}`;
};

exports.textLimiting = (description, count) => {
  if (description.length > count) {
    return description.substr(0, count);
  } else {
    return description;
  }
};

exports.priceFormating = (price) =>
  new Intl.NumberFormat('ko-KR', { currency: 'KRW' }).format(price);

exports.objectNullChecking = (object) => {
  return object && Object.keys(object).length !== 0;
};

exports.listNullChecking = (list) => {
  return list && list.length > 0;
};

exports.createFormData = (photo, body) => {
  const data = new FormData();

  data.append('image', {
    name: body.name,
    type: photo.type,
    uri: photo.uri.replace('file://', ''),
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });
  return data;
};

exports.createStyleImageForm = (front, side, back, body) => {
  const data = new FormData();
  if (Object.keys(front).length) {
    data.append('front', {
      name: front.fileName,
      type: front.type,
      uri: front.uri.replace('file://', ''),
    });
  }
  if (Object.keys(side).length) {
    data.append('side', {
      name: front.fileName,
      type: front.type,
      uri: front.uri.replace('file://', ''),
    });
  }
  if (Object.keys(back).length) {
    data.append('back', {
      name: front.fileName,
      type: front.type,
      uri: front.uri.replace('file://', ''),
    });
  }

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });
  console.log(data);
  return data;
};
