<script lang="ts">
  import { listTodoItemsCode } from "../../snippets";
  import { steps, todoItems } from "../../store";
  import Code from "../Code.svelte";
  import RunButton from "../RunButton.svelte";
  export let listTodoItems;
</script>

<section>
  <h2>7. List all todo items:</h2>
  <Code source={listTodoItemsCode} />
  {#if $steps[7] && $todoItems.length}
    <table class="notice">
      <tr><td>#</td><th>id</th><th>todo</th><th>done</th></tr>
      {#each $todoItems as todo, i}
        <tr
          ><td>{i + 1}</td><td>{todo.id}</td><td>{todo.text}</td><td
            >{todo.done}</td
          ></tr
        >
      {/each}
    </table>
  {/if}
  <RunButton
    step="7"
    handler={listTodoItems}
    actionText="List all Todo Items"
  />
</section>
