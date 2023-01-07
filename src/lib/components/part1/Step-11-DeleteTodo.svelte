<script lang="ts">
    import { config } from "../../config";
    import { updateTodoCode } from "../../snippets";
    import { steps, todoItems, next, fdp, type Todo } from "../../store";
    import { scrollToBottom } from "../../utils";
    import Code from "../Code.svelte";
    export let listTodoItems;
    const deleteTodoItem = async (todo: Todo) => {
    console.log({ todo });
    return $fdp.file
      .delete(config.todoAppNamespace, `${config.todoItemsDirectory}/todo_${todo.id}.json`)
      .then(async () => {
        return listTodoItems();
      });
  };

</script>

<section>
  <h2 id="f8">8. Deleting a todo:</h2>
  <Code source={updateTodoCode} />
  {#if $steps[7] && $todoItems.length}
    <table class="notice">
      <h4>Todos</h4>
      <tr><th>#</th><th>id</th><th>todo</th><th>done</th><th>actions</th></tr>
      {#each $todoItems as todo, i (todo.id)}
        <tr>
          <td>{i + 1}</td>
          <td>{todo.id}</td>
          <td>{todo.text}</td>
          <td>{todo.done}</td>
          <td>
            <button
              on:click={() => {
                deleteTodoItem(todo);
              }}
            >
              delete
            </button>
          </td>
        </tr>
      {/each}
    </table>

    <button
      on:click={() => {
        $next[8] = true;
        scrollToBottom();
      }}
      disabled={$next[8]}>Next</button
    >
  {/if}
</section>
