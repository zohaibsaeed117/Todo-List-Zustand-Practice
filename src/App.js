import Column from "./components/Column";

function App() {
  return (
    <div className="flex py-4 justify-evenly bg-gray-900 h-[100vh]">
      <Column state={"PLANNED"} />
      <Column state={"ONGOING"} />
      <Column state={"DONE"} />
    </div>

  );
}

export default App;
