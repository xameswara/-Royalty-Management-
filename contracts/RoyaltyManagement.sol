// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract RoyaltyManagement is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Royalty {
        address creator;
        uint256 percentage;
    }

    mapping(uint256 => Royalty) private _royalties;

    event RoyaltyPaid(uint256 tokenId, address creator, uint256 amount);

    constructor() ERC721("RoyaltyManagement", "RMT") {}

    function mintWithRoyalty(address creator, uint256 royaltyPercentage) public returns (uint256) {
        require(royaltyPercentage <= 100, "Royalty percentage must be between 0 and 100");

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(msg.sender, newTokenId);

        _royalties[newTokenId] = Royalty(creator, royaltyPercentage);

        return newTokenId;
    }

    function payRoyalty(uint256 tokenId) public payable {
        require(_exists(tokenId), "Token does not exist");
        Royalty memory royalty = _royalties[tokenId];
        require(royalty.creator != address(0), "No royalty set for this token");

        uint256 royaltyAmount = (msg.value * royalty.percentage) / 100;
        payable(royalty.creator).transfer(royaltyAmount);

        emit RoyaltyPaid(tokenId, royalty.creator, royaltyAmount);
    }

    function getRoyaltyInfo(uint256 tokenId) public view returns (address, uint256) {
        require(_exists(tokenId), "Token does not exist");
        Royalty memory royalty = _royalties[tokenId];
        return (royalty.creator, royalty.percentage);
    }
}