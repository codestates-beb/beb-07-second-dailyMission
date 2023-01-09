/**
 * YYYYMMDDHHmm 형식을 입력하면 YY-MM-DD HH:mm 형식으로 뱉어주는 함수
 * @param {string} date
 * @returns {string}
 */
export const dateFormatter = (date) => {
  const remove20 = date.slice(2);
  const a = remove20.split('');
  return `${a[0]}${a[1]}-${a[2]}${a[3]}-${a[4]}${a[5]} ${a[6]}${a[7]}:${a[8]}${a[9]}`;
};
