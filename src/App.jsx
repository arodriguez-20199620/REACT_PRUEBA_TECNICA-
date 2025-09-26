import { Toaster } from "react-hot-toast";
import Home from "./page/Home";

const App = () => {
  return (
    <>
      <Home />
      <Toaster position="bottom-right" />
    </>
  );
};

export default App;
