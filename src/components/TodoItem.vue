<template>
  <li class="todo-item">
    <div class="todo-content">
      <BaseInput
        type="checkbox"
        class="check-btn"
        :checked="todo.done"
        @click="handleChangeState(todo)"
      />
      <span class="label">{{ todo.content }}</span>
    </div>
    <div class="actions-btn">
      <BaseButton type="update" @click="openModalUpdate">Update</BaseButton>
      <BaseButton type="secondary" @click="handleRemove(id)">Remove</BaseButton>
    </div>
  </li>
  <Teleport to="body">
    <BaseModal
      :show="isShowModal"
      @close="closeModalUpdate"
      @save="handleSave(id, todo)"
    >
      <template #header>
        <h3>Update todo</h3>
      </template>
      <template #body>
        <BaseInput v-model="updateValue" placeholder="Update your todo" />
      </template>
    </BaseModal>
  </Teleport>
</template>

<script setup>
import defineProps, { ref } from "vue";
import BaseButton from "@/components/common/BaseButton.vue";
import BaseModal from "@/components/common/BaseModal.vue";
import BaseInput from "@/components/common/BaseInput.vue";

const props = defineProps({
  id: Number,
  todo: Object,
  handleRemove: Function,
  handleUpdate: Function,
  handleChangeState: Function,
});

const updateValue = ref(props.todo.content);
const isShowModal = ref(false);

const handleSave = (id, todo) => {
  props.handleUpdate(id, { done: todo.done, content: updateValue });
  closeModalUpdate();
};

const openModalUpdate = () => {
  isShowModal.value = true;
};

const closeModalUpdate = () => {
  isShowModal.value = false;
};
</script>

<style lang="scss" scoped>
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: rgba(0, 0, 0, 0.05);
  margin-top: 8px;
  border-radius: 3px;
  cursor: pointer;

  .todo-content {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .check-btn {
    cursor: pointer;
  }

  .label {
    flex-shrink: 0;
  }

  .check-btn:checked ~ .label {
    text-decoration: line-through;
  }

  .actions-btn {
    display: flex;
    gap: 8px;
  }
}
</style>
