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
  if (photo.fileName) {
    data.append('image', {
      name: photo.fileName,
      type: photo.type,
      uri: photo.uri.replace('file://', ''),
    });
  }

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });
  return data;
};

exports.createStyleForm = (front, side, back, body) => {
  const data = new FormData();

  if (Object.keys(front).length) {
    if (front.fileName) {
      data.append('front', {
        name: front.fileName,
        type: front.type,
        uri: front.uri.replace('file://', ''),
      });
    } else {
      data.append('front_img_src', front);
    }
  }
  if (Object.keys(side).length) {
    if (side.fileName) {
      data.append('side', {
        name: side.fileName,
        type: side.type,
        uri: side.uri.replace('file://', ''),
      });
    } else {
      data.append('side_img_src', side);
    }
  }
  if (Object.keys(back).length) {
    if (back.fileName) {
      data.append('back', {
        name: back.fileName,
        type: back.type,
        uri: back.uri.replace('file://', ''),
      });
    } else {
      data.append('back_img_src', back);
    }
  }

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });
  return data;
};

exports.styleTypeFormatting = (style_type) => {
  if (style_type == 'cut') {
    return '커트';
  } else if (style_type == 'perm') {
    return '펌';
  } else if (style_type == 'color') {
    return '염색';
  }
  return null;
};

exports.lengthTypeFormatting = (length_type) => {
  if (length_type == 'long') {
    return '롱';
  } else if (length_type == 'medium') {
    return '미디엄';
  } else if (length_type == 'short') {
    return '숏';
  }
  return null;
};

exports.genderTypeFormatting = (gender_type) => {
  if (gender_type == 'male') {
    return '남성';
  } else if (gender_type == 'female') {
    return '여성';
  }
  return null;
};
