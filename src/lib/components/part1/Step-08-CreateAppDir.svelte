<script lang="ts">
  import { config } from "../../config";
  import { createTodoItemsDirectoryCode } from "../../snippets";
  import { steps, fdp, tutorialMode, TutorialMode } from "../../store";
  import Code from "../Code.svelte";
  import RunButton from "../RunButton.svelte";
  const createTodoItemsDirectory = async () => {
    $fdp.directory
      .create(config.todoAppNamespace, config.todoItemsDirectory)
      .then(() => {
        console.log(
          `Directory "${config.todoItemsDirectory}" created in "${config.todoAppNamespace}" pod`
        );
      });
    $steps[5] = true;
  };
</script>

<section>
  <h2>5. Create a directory:</h2>
  This<code class="in">{config.todoItemsDirectory}</code> directory inside the
  <code class="in">{config.todoAppNamespace}</code>
  pod will hold each of our todo items as individual files.
  <Code source={createTodoItemsDirectoryCode} />
  {#if $steps[5] && $tutorialMode == TutorialMode.FDP_INTERACTIVE}
    <p class="notice">
      The <code class="in">{config.todoItemsDirectory}</code> directory has been
      created in <code class="in">{config.todoAppNamespace}</code> pod!
    </p>
  {/if}
  <RunButton
    step="5"
    handler={createTodoItemsDirectory}
    actionText="Create a '{config.todoItemsDirectory}' directory"
  />
</section>
