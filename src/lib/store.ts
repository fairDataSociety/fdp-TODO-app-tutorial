import type { FdpStorage } from "@fairdatasociety/fdp-storage";
import type { List } from "@fairdatasociety/fdp-storage/dist/pod/list";
import type { FileMetadata, Pod, SharedPod } from "@fairdatasociety/fdp-storage/dist/pod/types";
import type { Wallet } from "ethers";
import { writable, type Writable } from "svelte/store";
export type Todo = {
    id:number;
    text:string;
    done:boolean;
    createdAt:number;
}
export let steps = writable({});
export let next = writable({});
// export let logs = writable({});
export let fdp: Writable<FdpStorage> = writable(undefined);
export let wallet: Writable<Wallet> = writable(undefined);
export let importedWallet: Writable<Wallet> = writable(undefined);
export let podList: Writable<List> = writable(undefined);
export let pods: Writable<Pod[]> = writable(undefined);
export let sharedPods: Writable<SharedPod[]> = writable(undefined);
export let appPod: Writable<Pod> = writable(undefined);
export let todoItems: Writable<Todo[]> = writable([])
export let todoText = writable("Learn fdp-storage!")
export let newTodo: Writable<FileMetadata> = writable(undefined);
// export let importedWallet = writable(false);
// export let showImportWallet = writable(false);
// export let part = writable(0);
export let isLocalSetup = writable(false);
export let isBeeRunning = writable(false);
export let started = writable(false);
export let batchId: Writable<any> = writable("");