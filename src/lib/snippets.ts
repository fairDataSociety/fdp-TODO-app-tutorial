import { TODOS_NS, TODO_ITEMS_DIR } from "./config"


export const getAccountBalancesCode =
`import type { FdpStorage } from "@fairdatasociety/fdp-storage";
import { utils } from "ethers";
import { batchId } from "./store";

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
`fdp.account.createWallet();
console.log({wallet:fdp.account.wallet});
`

export const listPodsCode = 
`const $podList = await $fdp.personalStorage.list();
$pods = $podList.getPods();
$sharedPods = $podList.getSharedPods();
console.log({pods:$pods,sharedPods:$sharedPods});`

export const createAppPodCode = 
`const appPod = await fdp.personalStorage.create("${TODOS_NS}");
console.log({appPod});
`

export const createTodoItemsDirectoryCode = 
`fdp.directory.create("${TODOS_NS}", "${TODO_ITEMS_DIR}").then(()=>{
  console.log('Directory "${TODO_ITEMS_DIR}" has been created in "${TODOS_NS}" pod');
});`

export const createTodoItemCode = 
`const todoId = new Date().getTime();
const uploadedTodoMetadata = await fdp.file.uploadData(
  "${TODOS_NS}", 
  "${TODO_ITEMS_DIR}/todo_" + todoId + ".json", 
  JSON.stringify({id: todoId, text:"Learn Fair Data Protocol!",done:false})
);
console.log({uploadedTodoMetadata});
`

export const listTodoItemsCode =
`const dir =  await fdp.directory.read("${TODOS_NS}", "${TODO_ITEMS_DIR}");
let todoItems = [];
dir.content.map(async (file:ContentItem) => {
  const todo = await fdp.file.downloadData(
    "${TODOS_NS}", 
    "${TODO_ITEMS_DIR}/"+ file.name 
  );
  todoItems.push(todo);
});
console.log({dir, content:dir.content, todoItems});
`

export const updateTodoCode = 
`fdp.file.delete(
  "${TODOS_NS}", 
  "${TODO_ITEMS_DIR}/todo_xxxxx.json"
  ).then(()=>{
    console.log("Todo deleted!")
  })
`
export const importWalletCode = 
`let phrase = prompt("Enter mnemonic phrase:");
if (phrase) {
  // set account from mnemonic
  fdp.account.setAccountFromMnemonic(phrase.trim());
  console.log({ importedWallet:$wallet });
}`