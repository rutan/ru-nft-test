// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (access/Ownable.sol)

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Context.sol";

abstract contract Adminable is Context {
    address private _admin;

    event AdminTransferred(address indexed previousAdmin, address indexed newAdmin);

    constructor() {
        _transferAdmin(_msgSender());
    }

    modifier onlyAdmin() {
        _checkAdmin();
        _;
    }

    function admin() public view virtual returns (address) {
        return _admin;
    }

    function _checkAdmin() internal view virtual {
        require(admin() == _msgSender(), "Adminable: caller is not the admin");
    }

    function renounceAdmin() public virtual onlyAdmin {
        _transferAdmin(address(0));
    }

    function transferAdmin(address newAdmin) public virtual onlyAdmin {
        require(newAdmin != address(0), "Adminable: new admin is the zero address");
        _transferAdmin(newAdmin);
    }

    function _transferAdmin(address newAdmin) internal virtual {
        address oldAdmin = _admin;
        _admin = newAdmin;
        emit AdminTransferred(oldAdmin, newAdmin);
    }
}
