pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "./Adminable.sol";

contract RutanNft is Ownable, Adminable, ERC721, ERC2981 {
    using SafeMath for uint;
    using Counters for Counters.Counter;

    Counters.Counter _mintedTokenCount;
    string baseUri = "https://files.rutan.dev/inbox/rutan-nft-test/";

    constructor(address _newOwner) ERC721("RutanNft", "RTNNFT") {
        _transferOwnership(_newOwner);
        _setDefaultRoyalty(_newOwner, 1000);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC2981) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function getMintedTokenCount() public view returns (uint256) {
        return _mintedTokenCount.current();
    }

    function setBaseURI(string memory _uri) external onlyAdmin {
        baseUri = _uri;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseUri;
    }

    function mint(address _to) external onlyAdmin {
        _mintedTokenCount.increment();
        uint256 _tokenId = _mintedTokenCount.current();
        _safeMint(_to, _tokenId);
    }

    function renounceOwnership() public override virtual onlyAdmin {
        _transferOwnership(address(0));
    }

    function transferOwnership(address _newOwner) public override virtual onlyAdmin {
        require(_newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(_newOwner);
        _setDefaultRoyalty(_newOwner, 1000);
    }
}
