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
$ git clone https://github.com/fairDataSociety/fdp-storage-TODO-app-tutorial
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
$ npm run dev
```

The application can be viewed at - http://localhost:5173/ 
You can also skip the introduction and start the tutorial directly here - http://localhost:5173/#/building-a-todo-dapp/getting-started

### Roadmap
- [x] Introduction
- [x] Part 1 - Building a Todo App
- [x] Getting started with FairOS
- [x] Resources & Links
- [ ] Make todos editable

### Screenshots

![image](https://user-images.githubusercontent.com/520570/210038808-d84ed496-ec43-4be2-bca3-362c7d49c15f.png)

---

![image](https://user-images.githubusercontent.com/520570/210038865-cb215262-98be-40f4-ac0e-8726dafb1423.png)

---

![image](https://user-images.githubusercontent.com/520570/207890048-6502ab71-3e30-4e85-bbe7-b89444a17a0f.png)
