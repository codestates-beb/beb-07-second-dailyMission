export default () => {
  const sessionSignData = sessionStorage.getItem('signData');
  const localSignData = localStorage.getItem('signData');
  if (sessionSignData) return JSON.parse(sessionSignData);
  else if (localSignData) {
    return JSON.parse(localSignData);
  } else {
    return { isSigned: false };
  }
};
