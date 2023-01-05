import { config } from "./config"


export const getAccountBalancesCode =
`import type { FdpStorage } from "@fairdatasociety/fdp-storage";
import { utils } from "ethers";

...

// to list all accounts
const accounts = await fdp.ens.provider.listAccounts();
console.log({accounts});

// to get ETH balance of first account in the list
const address = accounts[0]
const balance = await fdp.ens.provider.getBalance(address)
const formattedBalance = utils.formatEther(balance);
console.log({formattedBalance});

//to access current fdp account wallet
// this will be undefined - because we havent created one yet
console.log({wallet:fdp.account.wallet})
`

export const createWalletCode = 
`// 1. create wallet
let wallet = fdp.account.createWallet();
// 2. set account from wallet phrase
fdp.account.setAccountFromMnemonic(wallet.mnemonic.phrase);
console.log({wallet:fdp.account.wallet,account:fdp.account});
`

export const listPodsCode = 
`const $podList = await $fdp.personalStorage.list();
$pods = $podList.getPods();
$sharedPods = $podList.getSharedPods();
console.log({pods:$pods,sharedPods:$sharedPods});`

export const createAppPodCode = 
`const appPod = await fdp.personalStorage.create("${config.todoAppNamespace}");
console.log({appPod});
`

export const createTodoItemsDirectoryCode = 
`fdp.directory.create("${config.todoAppNamespace}", "${config.todoItemsDirectory}").then(()=>{
  console.log('Directory "${config.todoItemsDirectory}" has been created in "${config.todoAppNamespace}" pod');
});`

export const createTodoItemCode = 
`const todoId = new Date().getTime();
const uploadedTodoMetadata = await fdp.file.uploadData(
  "${config.todoAppNamespace}", 
  "${config.todoItemsDirectory}/todo_" + todoId + ".json", 
  JSON.stringify({id: todoId, text:"Learn Fair Data Protocol!",done:false})
);
console.log({uploadedTodoMetadata});
`

export const listTodoItemsCode =
`const dir =  await fdp.directory.read("${config.todoAppNamespace}", "${config.todoItemsDirectory}");
let todoItems = [];
dir.content.map(async (file:ContentItem) => {
  const todo = await fdp.file.downloadData(
    "${config.todoAppNamespace}", 
    "${config.todoItemsDirectory}/"+ file.name 
  );
  todoItems.push(todo);
});
console.log({dir, content:dir.content, todoItems});
`

export const updateTodoCode = 
`fdp.file.delete(
  "${config.todoAppNamespace}", 
  "${config.todoItemsDirectory}/todo_xxxxx.json"
  ).then(()=>{
    console.log("Todo deleted!")
  })
`
export const importWalletCode = 
`let phrase = prompt("Enter mnemonic phrase:");
if (phrase) {
  // set account from mnemonic
  fdp.account.setAccountFromMnemonic(phrase.trim());
  let importedWallet = fdp.account.wallet;
  console.log({ importedWallet });
}`