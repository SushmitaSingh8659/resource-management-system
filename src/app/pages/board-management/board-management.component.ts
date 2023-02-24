import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-board-management',
  templateUrl: './board-management.component.html',
  styleUrls: ['./board-management.component.scss']
})
export class BoardManagementComponent implements OnInit {
  userList: any = [];

  addUserForm!: FormGroup
  addTaskForm!: FormGroup
  submitted: boolean = false

  // while adding task to user get that user id 
  userId: any

  // generate randon id for assign in user id and task id
  code: any;

  // hold drag variable data
  dragTaskData: any;

  // delete user id 
  deleteUserId: any;

  constructor() { }

  ngOnInit(): void {
    this.addUserFormInitialization();
    this.addTaskFormInitialization();
  }

  // add user form initialization/validation
  addUserFormInitialization() {
    this.addUserForm = new FormGroup({
      username: new FormControl('', Validators.required)
    })
  }

  // add task form initialization/validation
  addTaskFormInitialization() {
    this.addTaskForm = new FormGroup({
      task: new FormControl('', Validators.required)
    })
  }


  /**
   * open add user modal to add user in board 
   * we will take input from modal and push that input in array list of user with addon of unique id 
   */
  openAddUserModal() {
    $('#addUserModalId').modal('show');
  }

  // add user form submit
  addUserFormSubmit() {
    // when form invalid this will return from hare 
    if (this.addUserForm.invalid) {
      this.submitted = true
      return
    }

    // hide the modal after getting the data 
    $('#addUserModalId').modal('hide');

    // new user required data object for creating new user
    let newUsernameObj = {
      'id': this.gerateRandonIds('UID'), // pass random id here to make user id unique identification
      'username': this.addUserForm.value.username, // will hold the username hare 
      'tasks': [] // will hold this user task in this tasks array
    }

    // push that newly created user object inside userList array
    this.userList.push(newUsernameObj);
    // after success reset the user add form
    this.addUserForm.reset();
  }


  /**
   * remove user from list
   * we will get id of that perticular user on which user clicked 
   * and based on that id we will remove that user
   * */
  openDeleteUserModal(id: any) {
    this.deleteUserId = id // hold this user id of which user hasbeen clicked
    $('#deleteUserModal').modal('show');
  }

  // delete user
  deleteUser() {
    // find that user id index so that we can remove that user form userList array 
    const index = this.userList.findIndex((x: any) => x.id == this.deleteUserId);
    // if user will found then we got that user index and that must be grater then -1
    if (index > -1) {
      // only splice array when item is found 
      this.userList.splice(index, 1);
      // hide the modal after removing the user 
      $('#deleteUserModal').modal('hide');
    }
  }


  /**
   * 
   * @param userId 
   * here we are going to add task to the user
   * 
   */
  // add task to user modal open
  openAddTaskToUserModal(userId: any) {
    this.userId = userId // hold this userid for globaly use
    $('#addTaskToUserModalId').modal('show');
  }

  // add task to user
  addTaskToUser() {
    // when form invalid this will return from hare 
    if (this.addTaskForm.invalid) {
      this.submitted = true
      return
    }
    // hide the modal after getting the data 
    $('#addTaskToUserModalId').modal('hide');
    // find that user by their id on which user hasbeen click and push the task object in that
    const index = this.userList.findIndex((x: any) => x.id == this.userId);
    if (index > -1) {
      // push new task object on that index
      let newTaskObj = {
        'id': this.gerateRandonIds('TID'), // pass random id here to make task id unique identification
        'taskName': this.addTaskForm.value.task // will hold the task hare 
      }
      // push that newly created task object inside respective user tasks array
      this.userList[index].tasks.push(newTaskObj);
      // after success reset the task add form
      this.addTaskForm.reset();
    }
  }


  /**
   * generate randon number for allocation id's in user as wel as task
   */
  gerateRandonIds(code: string) {
    var letters = '45678' // code will generate combination of these numbers only
    this.code = code // will hode code prefix geting from respective function it can be user or task
    // will generate combination of at least 3 digit
    for (var i = 0; i < 3; i++)
      this.code += letters[(Math.floor(Math.random() * 5))];
    return this.code // return that final generated code back to function i.e, UID456
  }



  /**
   * 
   * @param task drag task from one user to another
   * @param userIndex 
   * @param taskIndex 
   */
  dragstart(task: any, userIndex: any, taskIndex: any) {
    this.dragTaskData = {
      task: task,
      userIndex: userIndex,
      taskIndex: taskIndex
    }
  }

  dragover(userIndex: any) {
    if (this.userList[userIndex].tasks.length) {
      if (this.userList[userIndex].tasks.findIndex((x: any) => x.id == this.dragTaskData.task.id) > -1) return
    }
    this.userList[userIndex].tasks.push(this.dragTaskData.task);
    this.userList[this.dragTaskData.userIndex].tasks.splice(this.dragTaskData.taskIndex, 1);
  }

}
