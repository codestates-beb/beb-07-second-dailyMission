// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MyNFTs is ERC721URIStorage, Ownable, ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("MyNFTs", "MNFT") {}

    struct NftTokenData {
        uint256 nftTokenId;
        string nftTokenURI;
    }

    mapping(uint256 => string) _tokenData;
    mapping(address => uint256) _tokenOwner;

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, 1);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function mintNFT(string memory tokenURI, address receiver)
        public
        onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(receiver, newItemId);
        _setTokenURI(newItemId, tokenURI);

        _tokenData[newItemId] = tokenURI;

        return newItemId;
    }

    function getNftToken(address _NftTokenOwner)
        public
        view
        returns (NftTokenData[] memory)
    {
        uint256 balanceLength = balanceOf(_NftTokenOwner);

        NftTokenData[] memory nftTokenData = new NftTokenData[](balanceLength);

        for (uint256 i = 0; i < balanceLength; i++) {
            uint256 nftTokenId = tokenOfOwnerByIndex(_NftTokenOwner, i);
            string memory nftTokenURI = _tokenData[nftTokenId];
            nftTokenData[i] = NftTokenData(nftTokenId, nftTokenURI);
        }
        return nftTokenData;
    }
}
