import { defineStore } from 'pinia';
import { computed, ref } from 'vue'
import { uid } from 'quasar'

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref({
    'ID1': {
      name: 'Go to shop',
      completed: false,
      dueDate: '2019/05/12',
      dueTime: '18:30'
    },
    'ID2': {
      name: 'Get bananas',
      completed: false,
      dueDate: '2019/05/13',
      dueTime: '14:00'
    },
    'ID3': {
      name: 'Get apples',
      completed: false,
      dueDate: '2019/05/14',
      dueTime: '16:00'
    }
  })

  const tasksTodo = computed(() => {
    let taskArr = {}
    Object.keys(tasks.value).forEach(function (key) {
      let task = tasks.value[key]
      if (!task?.completed) {
        taskArr[key] = task
      }
    })
    return taskArr
  })

  const tasksCompleted = computed(() => {
    let taskArr = {}
    Object.keys(tasks.value).forEach(function (key) {
      let task = tasks.value[key]
      if (task?.completed) {
        taskArr[key] = task
      }
    })
    return taskArr
  })

  function addTask(data) {
    let taskId = uid()
    tasks.value[taskId] = { ...data }
  }

  function updateTask(payload) {
    Object.assign(tasks.value[payload.id], payload.updates)
  }

  function deleteTask(id) {
    delete tasks.value[id];
  }

  return {
    tasks,
    tasksTodo,
    tasksCompleted,
    addTask,
    updateTask,
    deleteTask,
  }
})

