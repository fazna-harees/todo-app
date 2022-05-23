import { expect } from "chai";
import { ethers } from "hardhat";

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});

describe("TodoList", () => {
  let todoList: any;

  beforeEach(async () => {
    const TodoList = await ethers.getContractFactory("TodoList");
    todoList = await TodoList.deploy();
    await todoList.deployed();
  });

  it("Should return content if task exist", async () => {
    await todoList.createTask("Clean the room");
    const content = await todoList.getTaskbyId(0);
    expect(content).to.equal("Clean the room");
  });

  it("Return Error message if task does not exist", async () => {
    await expect(todoList.getTaskbyId(1)).to.be.revertedWith(
      "Task does not exist"
    );
  });

  it("Should return error if we try to toggle an already finished task", async () => {
    await todoList.createTask("Clean the room");
    await todoList.toggleFinished(0);
    await expect(todoList.toggleFinished(0)).to.be.revertedWith(
      "Task is already finished"
    );
  });
});
