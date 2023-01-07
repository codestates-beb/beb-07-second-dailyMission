var solCode = artifacts.require('IlsangToken');

module.exports = function (deployer) {
  deployer.deploy(solCode, 'IlsangToken', 'IT');
};
