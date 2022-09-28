import { AppContextWrapper } from "./AppContext";
import Main from "./components/Main";

function App() {
  return (
    <AppContextWrapper>
      <Main />
    </AppContextWrapper>
  );
}

export default App;
