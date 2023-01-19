const getCoinsAPIData = async () => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(url);
  const jsonObj = await response.json();
  delete jsonObj.USDT;
  return jsonObj;
};

export default getCoinsAPIData;
