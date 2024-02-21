export const responseError = (e) => {
  let data = [];
  if (e.data.statusCode === 401) {
    data.push({ message: e.data.message, color: "warning" });
  } else if (e.data.statusCode === 409) {
    if (e.data.message) {
      data.push({ message: e.data.message, color: "warning" });
    } else {
      e.data.errors.map((val) => {
        data.push({ message: val, color: "warning" });
      });
    }
  } else if (e.data.statusCode === 422 || e.data.statusCode === 405) {
    data.push({ message: e.data.errors, color: "warning" });
  } else if (e.data.statusCode === 400 && e.data.errors) {
    for (let key in e.data.errors) {
      if (e.data.errors.hasOwnProperty(key)) {
        data.push({
          message: e.data.errors[key][0],
          color: "warning",
        });
      }
    }
  } else if (e.data.statusCode === 404) {
    data.push({ message: e.message, color: "info" });
  } else {
    data.push({ message: e.message, color: "danger" });
  }
  return data;
};
