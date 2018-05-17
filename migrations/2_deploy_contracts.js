const RaiseYourBet = artifacts.require('./RaiseYourBet.sol');

module.exports = (deployer) => {
    //http://www.onlineconversion.com/unix_time.htm
    var owner = "0xffB8602d39dD595070606397A7c61C117c5b956D";
    deployer.deploy(RaiseYourBet, owner);
};
