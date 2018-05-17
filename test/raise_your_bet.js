var RaiseYourBet = artifacts.require("./RaiseYourBet.sol");
//import assertRevert from './helpers/assertRevert';

contract('RaiseYourBet', (accounts) => {
    var contract;
    //var owner = "0xffB8602d39dD595070606397A7c61C117c5b956D";
    var owner = accounts[0];
    var maxTotalSupply = 75e25;
    var OneToken = 10**18;

    it('should deployed contract', async ()  => {
        assert.equal(undefined, contract);
        contract = await RaiseYourBet.deployed();
        assert.notEqual(undefined, contract);
    });

    it('get address contract', async ()  => {
        assert.notEqual(undefined, contract.address);
    });

    it('verification balance contract', async ()  => {
        var totalSupplyTest = await contract.totalSupply.call();
        //console.log(JSON.stringify(totalSupplyTest));
        assert.equal(Number(totalSupplyTest), Number(maxTotalSupply));

        var balanceOwner = await contract.balanceOf(owner);
        //console.log("balanceOwner = " + balanceOwner);
        assert.equal(Number(totalSupplyTest), balanceOwner);
    });

    it('verification of transfer Token', async ()  => {
        var balanceAccountTwoBefore = await contract.balanceOf(accounts[2]);
        var balanceAccountOwnerBefore = await contract.balanceOf(accounts[0]);

        await contract.transfer(accounts[2], OneToken, {from:accounts[0]});
        var balanceAccountTwoAfter = await contract.balanceOf(accounts[2]);
        var balanceAccountOwnerAfter = await contract.balanceOf(accounts[0]);

        assert.isTrue(balanceAccountTwoBefore < balanceAccountTwoAfter);
        assert.isTrue(Number(balanceAccountOwnerBefore) > Number(balanceAccountOwnerAfter));
        assert.equal(0, balanceAccountTwoBefore);
        assert.equal(OneToken, balanceAccountTwoAfter);
    });
});



