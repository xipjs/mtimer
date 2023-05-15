import { ref } from "@xipjs/xip";
import { Mtimer } from "mtimer";

// Create the timer
let timer = new Mtimer(document.body);

export default function Counter() {
  let count = ref(0);
  let active = ref(false);
  function Activate() {
    if (timer.observer) {
      active.Set(false);
      // Disable MutationObserver
      timer.Deactivate();
    } else {
      active.Set(true);
      // Enable MutationObserver
      timer.Activate();
    }
  }
  return (
    <span>
      <button
        react={active.Reg}
        onClick={Activate}
        reStyle={(s) => {
          console.log("hi");
          s.color = active.value ? "red" : "green";
        }}
      >
        {() => (active.value ? "Deactivate " : "Activate ")}
        Tester
      </button>
      <h1 react={count.Reg}>{() => count.value}</h1>
      <button
        onClick={() => {
          // Start the timer right before triggering a rerender.
          // After the timeout duration of no dom activity the results will be passed to the callback function
          timer.Start((e) => console.log(e), 300);

          count.Set(count.value + 1);
        }}
      >
        +
      </button>
      <button onClick={() => count.Set(count.value - 1)}>-</button>
      <hr />
    </span>
  );
}
