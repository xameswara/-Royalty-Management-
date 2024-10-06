const RoyaltyManagement = artifacts.require("RoyaltyManagement");

contract("RoyaltyManagement", (accounts) => {
  let royaltyManagement;
  const creator = accounts[1];
  const buyer = accounts[2];

  beforeEach(async () => {
    royaltyManagement = await RoyaltyManagement.new();
  });

  it("should mint a token with royalty", async () => {
    const result = await royaltyManagement.mintWithRoyalty(creator, 10, { from: buyer });
    assert.equal(result.logs[0].event, "Transfer", "Transfer event should be emitted");

    const tokenId = result.logs[0].args.tokenId.toNumber();
    const royaltyInfo = await royaltyManagement.getRoyaltyInfo(tokenId);

    assert.equal(royaltyInfo[0], creator, "Creator should be set correctly");
    assert.equal(royaltyInfo[1], 10, "Royalty percentage should be set correctly");
  });

  it("should pay royalty", async () => {
    const result = await royaltyManagement.mintWithRoyalty(creator, 10, { from: buyer });
    const tokenId = result.logs[0].args.tokenId.toNumber();

    const initialBalance = web3.utils.toBN(await web3.eth.getBalance(creator));
    const paymentAmount = web3.utils.toWei("1", "ether");

    await royaltyManagement.payRoyalty(tokenId, { from: buyer, value: paymentAmount });

    const finalBalance = web3.utils.toBN(await web3.eth.getBalance(creator));
    const expectedRoyalty = web3.utils.toBN(paymentAmount).div(web3.utils.toBN(10));

    assert.equal(
      finalBalance.sub(initialBalance).toString(),
      expectedRoyalty.toString(),
      "Royalty should be paid correctly"
    );
  });
});