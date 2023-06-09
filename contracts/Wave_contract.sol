// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract WavePortal{ 

    uint256 public totalWaves;
    uint256 private seed; 
    event NewWave(address indexed from, uint256 timestamp, string message); 

    struct Wave{ 
        address waver;
        string message;
        uint256 timestamp;
    }

    Wave[] waves;

    // mapping(address => uint256) public waveInfo;

    mapping (address => uint256) public lastWavedAt;

    constructor() payable{ 
        console.log("Hey there! I am a contract and I am very smart!");
        
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function wave(string memory _message) public{ 
        require ( 
            lastWavedAt[msg.sender] + 30 seconds < block.timestamp,
            "wait 30 seconds"
        );

        lastWavedAt[msg.sender] = block.timestamp;
        totalWaves += 1;
        // waveInfo[msg.sender] += 1;
        console.log("%s waved w/ message %s", msg.sender, _message);
        waves.push(Wave(msg.sender, _message, block.timestamp));

        seed = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Random num generated %d", seed);

        if (seed < 50){ 
            console.log ("%s won!", msg.sender);
            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <=address(this).balance,
                "Trying to withdraw more money from contract."
            );

            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }
        emit NewWave(msg.sender, block.timestamp, _message);
    }

    function getAllWaves() public view returns (Wave[] memory){ 
        return waves;
    }
    function getTotalWaves() public view returns(uint256){ 
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

    // function getWaverInfo(address waver) public view returns (uint256){ 
    //     console.log("%s send %d wave(s)", waver, waveInfo[waver]);
    //     return waveInfo[waver];
    // }

    // function getAllWaverAddress()
}