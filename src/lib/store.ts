import type { FdpStorage } from "@fairdatasociety/fdp-storage";
import type { List } from "@fairdatasociety/fdp-storage/dist/pod/list";
import type {
  FileMetadata,
  Pod,
  SharedPod,
} from "@fairdatasociety/fdp-storage/dist/pod/types";
import type { Wallet } from "ethers";
import { writable, type Writable } from "svelte/store";
export type Todo = {
  id: number;
  text: string;
  done: boolean;
  createdAt: number;
};
export let topupData: any = writable({});
export let steps = writable({});
export let next = writable({});
export let fdp: Writable<FdpStorage> = writable(undefined);
export let wallet: Writable<Wallet> = writable(undefined);
export let importedWallet: Writable<Wallet> = writable(undefined);
export let podList: Writable<List> = writable(undefined);
export let pods: Writable<Pod[]> = writable(undefined);
export let sharedPods: Writable<SharedPod[]> = writable(undefined);
export let appPod: Writable<Pod> = writable(undefined);
export let todoItems: Writable<Todo[]> = writable([]);
export let todoText = writable("Learn fdp-storage!");
export let newTodo: Writable<FileMetadata> = writable(undefined);
export let isLocalSetup = writable(false);
export let isBeeRunning = writable(false);
export let API_HOST = writable("");
export enum TutorialMode {
  UNDEFINED,
  FDP_INTERACTIVE,
  FDP_NON_INTERACTIVE,
  FAIROS_INTERACTIVE,
  FAIROS_NON_INTERACTIVE,
}
export let tutorialMode: Writable<TutorialMode> = writable(
  TutorialMode.UNDEFINED
);
export let batchId: Writable<any> = writable("");
export let mnemonic = writable("");
export let lastTodoFile = writable("todo_12345678.json");
export let singlePageMode = writable(true)

export let url = writable("");