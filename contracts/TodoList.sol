//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract TodoList {

    struct Task {
        uint id;
        string content;
        bool finished;
    }

    mapping(address => uint) private nextIds;

    mapping(address => mapping(uint => Task)) private tasks;

    event TaskCreated(uint taskId, string content);

    modifier taskExist(uint id) {
        uint _nextId = nextIds[msg.sender];
        require(_nextId > id,"Task does not exist");
        _;
    }

    modifier notFinishedYet(uint id) {
        require(tasks[msg.sender][id].finished == false,"Task is already finished");
        _; 
    }

    function createTask(string memory content) external {
        uint _nextId = nextIds[msg.sender];
        tasks[msg.sender][_nextId] = Task(_nextId,content,false);
        emit TaskCreated(_nextId, content);
        nextIds[msg.sender]= _nextId+1;
    }

    function toggleFinished(uint taskId) taskExist(taskId) notFinishedYet(taskId) external {
       tasks[msg.sender][taskId].finished = true;
    }

    function getTaskbyId(uint taskId) taskExist(taskId) public view returns(string memory) {   
        string memory content = tasks[msg.sender][taskId].content;
        return content;
    }

}