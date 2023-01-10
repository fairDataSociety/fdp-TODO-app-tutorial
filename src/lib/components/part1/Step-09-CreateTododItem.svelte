<script lang="ts">
  import { config } from "../../config";
  import { createTodoItemCode } from "../../snippets";
  import { newTodo, steps, fdp, todoText } from "../../store";
  import Code from "../Code.svelte";
  import RunButton from "../RunButton.svelte";
  export let listTodoItems;
  const createTodoItem = async () => {
    $todoText = prompt("Enter a Todo", "Learn Fair Data Protocol!");
    const id = new Date().getTime();
    const uploadedTodoMetadata = await $fdp.file.uploadData(
      config.todoAppNamespace,
      `${config.todoItemsDirectory}/todo_${id}.json`,
      JSON.stringify({ id, createdAt: id, text: $todoText, done: false })
    );
    console.log({ uploadedTodoMetadata });
    $newTodo = uploadedTodoMetadata;
    $steps[6] = true;
    if ($steps[7]) {
      listTodoItems();
    }
  };
</script>

<section>
  <h2 id="f6">6. Create a todo item (as a file):</h2>
  <Code source={createTodoItemCode} />
  {#if $newTodo}
    <ul class="notice">
      <li>New Todo "{$todoText}" has been added!</li>
      <li><code>filePath</code>: {$newTodo.filePath}</li>
      <li><code>filename</code>: {$newTodo.fileName}</li>
    </ul>
  {/if}
  <RunButton step="6" handler={createTodoItem} actionText="Create a Todo Item">
    {#if $steps[6]}
      <RunButton
        step="6.1"
        handler={createTodoItem}
        actionText="Create another Todo Item"
      />
    {/if}
  </RunButton>
</section>
