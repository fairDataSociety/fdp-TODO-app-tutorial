import type { FdpStorage } from "@fairdatasociety/fdp-storage";
import { utils } from "ethers";

export async function topUpAddress(
  fdp: FdpStorage,
  address: string,
  amountInEther = "0.01"
) {
  const ens = fdp.ens;
  const accounts = await ens.provider.listAccounts();
  const balances = [];
  accounts.map(async (addr, i) => {
    const balance = await await ens.provider.getBalance(addr);
    balances[i] = Number(balance._hex);
  });

  console.log({ accounts, balances });
  const account = (await ens.provider.listAccounts())[0];

  const txHash = await ens.provider.send("eth_sendTransaction", [
    {
      from: account,
      to: address,
      value: utils.hexlify(utils.parseEther(amountInEther)),
    },
  ]);

  return ens.provider.waitForTransaction(txHash);
}

export const apiHost = () => {
  return window.location.href.split("/#/")[0] + "/api";
};

export const getBalance = async (address: string, fdp: FdpStorage) => {
  const balance = await fdp.ens.provider.getBalance(address);
  return utils.formatEther(balance);
};

export const getAddressBalances = async (fdp: FdpStorage) => {
  let balances = [];
  console.log({ fdp });
  const accounts = await fdp.ens.provider.listAccounts();
  for (let i = 0; i < accounts.length; i++) {
    const address = accounts[i];
    const balance = await fdp.ens.provider.getBalance(address);
    const formattedBalance = utils.formatEther(balance);
    if (i === 0) {
      console.log({ formattedBalance });
      console.log({ wallet: fdp.account.wallet });
    }
    balances.push({ address, balance: formattedBalance });
  }
  return balances;
};
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const scrollToBottom = () => {
  // setTimeout(() => {
  //   const el = document.getElementById("footer");
  //   el.scrollIntoView({
  //     behavior: "smooth",
  //   });
  // }, 500);
};

export const scrollPageToTop = () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};
