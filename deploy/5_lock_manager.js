module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments;
    const namedAccounts = await getNamedAccounts();
    const { deployer, admin } = namedAccounts;
    const votingPower = await deployments.get("VotingPowerPrism")

    log(`5) Lock Manager`)
    // Deploy LockManager contract
    const deployResult = await deploy("LockManager", {
        from: deployer,
        contract: "LockManager",
        gas: 4000000,
        args: [votingPower.address, admin],
        skipIfAlreadyDeployed: true
    });

    if (deployResult.newlyDeployed) {
        log(`- ${deployResult.contractName} deployed at ${deployResult.address} using ${deployResult.receipt.gasUsed} gas`);
    } else {
        log(`- Deployment skipped, using previous deployment at: ${deployResult.address}`)
    }
};

module.exports.tags = ["5", "LockManager"];
module.exports.dependencies = ["4"]