#!/usr/bin/env node
import {$, cd} from 'zx'
import * as swarmCid from '@ethersphere/swarm-cid'

export const hello = "world";
console.log({hello});

cd('./dist');

await $`tar -cf ../fdp-tutorial.tar .`

cd('../');

const {stdout}:any = await $`curl -X POST -H "Content-Type: application/x-tar" -H "Swarm-Index-Document: index.html" -H "Swarm-Error-Document: error.html" -H "Swarm-Collection: true" -H "Swarm-Postage-Batch-Id: 0000000000000000000000000000000000000000000000000000000000000000" --data-binary @fdp-tutorial.tar https://gateway.fairdatasociety.org/bzz`

await $`rm ./fdp-tutorial.tar`

let swarmRef = JSON.parse(stdout).reference;
const manifestCid = swarmCid.encodeReference(swarmRef, swarmCid.ReferenceType.MANIFEST);
console.log(`Tutorial uploaded to Swarm ==> https://${manifestCid.toString()}.bzz.link/`);