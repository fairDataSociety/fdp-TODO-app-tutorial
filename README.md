# Getting Started with Fair Data Protocol (FDP)

An interactive how-to guide for beginners on getting started with building dApps on Fair Data Protocol using `fdp-storage` and `fdp-play`.

An independent example of a todos application built using the steps described in this tutorial can be found here:
- https://github.com/fairDataSociety/fdp-storage-todos

## Local Development Setup

### Prerequisites:

**Requirements:** Docker must be already installed

#### Install `fdp-play` globally
```shell
$ npm install -g @fairdatasociety/fdp-play
```

#### Spin up a local FDP development environment with fairos
```shell
$ fdp-play start --fairos
```

### Setup & Installation:

#### Clone the repo
```shell
$ git clone https://github.com/rampall/getting-started-with-fdp.git
```

```shell
$ cd getting-started-with-fdp/
```

### Install dependencies
```shell
$ npm i
```

### Run application
**Requirements:** `fdp-play` must be running already! 

```shell
$ npm dev
```

The application can be viewed at - http://localhost:5173/ 
You can also skip the introduction and start the tutorial directly here - http://localhost:5173/#/building-a-todo-dapp/getting-started

### Roadmap
- [x] Introduction
- [x] Part 1 - Building a Todo App
- [ ] Part 1 - Edit todo item 
- [ ] Part 2 - Sharing & Interoperability
- [ ] Getting started with FairOS
- [ ] migrate to [kit-docs](https://github.com/svelteness/kit-docs) or [docusaurus](https://docusaurus.io/)

### Screenshots

![image](https://user-images.githubusercontent.com/520570/207879247-8911b177-1331-42ed-ad9e-e077b9148f2e.png)

---

![image](https://user-images.githubusercontent.com/520570/207879702-e3a5335b-beb8-4c42-b118-a7853fde28b3.png)

---

![image](https://user-images.githubusercontent.com/520570/207890048-6502ab71-3e30-4e85-bbe7-b89444a17a0f.png)
