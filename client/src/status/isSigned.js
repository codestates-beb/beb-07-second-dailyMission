export default () => {
    const signData = sessionStorage.getItem('signData')
    if (signData) {
        return JSON.parse(signData);
    } else {
        return false;
    }
}