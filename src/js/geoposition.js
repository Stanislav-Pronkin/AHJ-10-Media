export default function getGeoposition() {
  let location = '';

  if (navigator.geolocation) {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          location = `${latitude}, ${longitude}`;
          resolve(location);
        }, (error) => {
          const msg = 'none';

          console.log(error);
          resolve(msg);
        },
      );
    });
  }
  const msg = 'none';

  return msg;
}

export function validateLocation(coordinates) {
  if (coordinates.search(/^(\[?-?)((\d|[0-8]\d?|90)\.\d{4,}), ?(-|−)?((\d|\d\d|1[0-7][0-9]|180)\.\d{4,})(\]?)$/) !== -1) {
    return true;
  }
  return false;
}
