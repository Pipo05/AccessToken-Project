// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title AccessToken
 * @dev ERC20 Token for the AccessToken project, with minting and burning capabilities.
 */
contract AccessToken is ERC20, Ownable {
    uint256 private constant INITIAL_SUPPLY = 1_000_000_000 * (10 ** 18); // 1 billion tokens with 18 decimals

    constructor() ERC20("AccessToken", "ACST") {
        _mint(msg.sender, INITIAL_SUPPLY); // Mint initial supply to contract deployer
    }

    /**
     * @dev Mint new tokens. Can only be called by the owner.
     * @param account The address to receive the minted tokens.
     * @param amount The number of tokens to mint.
     */
    function mint(address account, uint256 amount) external onlyOwner {
        _mint(account, amount);
    }

    /**
     * @dev Burn tokens. Can be called by any token holder.
     * @param amount The number of tokens to burn.
     */
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }

    /**
     * @dev Burn tokens from a specified address. Can only be called by the owner.
     * @param account The address whose tokens will be burned.
     * @param amount The number of tokens to burn.
     */
    function burnFrom(address account, uint256 amount) external onlyOwner {
        _burn(account, amount);
    }
}
