const RoyaltyManagement = artifacts.require("RoyaltyManagement");

module.exports = function (deployer) {
  deployer.deploy(RoyaltyManagement);
};