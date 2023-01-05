var solCode = artifacts.require('ICToken');

module.exports = function (deployer) {
  deployer.deploy(solCode, 'IlsangToken', 'IT');
};
