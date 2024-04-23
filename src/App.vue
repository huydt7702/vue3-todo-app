<template>
  <div class="wrapper">
    <div class="todo-app">
      <h1 class="heading">Todo App</h1>
      <form class="form-submit" @submit.prevent="handleAdd()">
        <BaseInput v-model="newTodo" ref="inputRef" />
        <BaseButton>Add</BaseButton>
      </form>
      <TodoList>
        <TodoItem
          v-for="(todo, index) in todos"
          :id="index"
          :key="index"
          :todo="todo"
          :handleRemove="handleRemove"
          :handleUpdate="handleUpdate"
          :handleChangeState="handleChangeState"
        />
      </TodoList>
      <h4 v-if="todos.length === 0" class="empty-todos">Empty Todos.</h4>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import BaseButton from "@/components/common/BaseButton.vue";
import BaseInput from "@/components/common/BaseInput.vue";
import TodoList from "@/components/TodoList.vue";
import TodoItem from "@/components/TodoItem.vue";
import useLocalStorage from "@/composables/useLocalStorage";

const newTodo = ref("");
const inputRef = ref(null);
const { data: todos, saveData: saveTodos } = useLocalStorage("todos");

function handleAdd() {
  if (!newTodo.value) return;
  todos.value.push({
    done: false,
    content: newTodo.value,
  });
  newTodo.value = "";
  inputRef.value.focus();
  saveTodos();
}

function handleRemove(index) {
  todos.value.splice(index, 1);
  saveTodos();
}

function handleUpdate(index, newTodo) {
  if (!newTodo) return;
  todos.value.splice(index, 1, newTodo);
  saveTodos();
}

function handleChangeState(toto) {
  toto.done = !toto.done;
  saveTodos();
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background: linear-gradient(to bottom, #68eacc 0%, #497be8 100%);
  height: 100vh;
}

.todo-app {
  width: 420px;
  margin: 60px auto 0;
  background-color: #fff;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.2);

  .heading {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .form-submit {
    display: flex;
    gap: 8px;
  }

  .empty-todos {
    color: red;
  }
}
</style>
