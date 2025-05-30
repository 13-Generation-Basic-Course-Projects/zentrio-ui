"use client"
import { useLoadingBar } from "react-top-loading-bar";

const App = () => {
  const { start, complete } = useLoadingBar({
    color: "blue",
    height: 2,
  });

  return (
    <div>
      <button onClick={() => start()}>Start</button>
      <button onClick={() => complete()}>Complete</button>
    </div>
  );
};



import { LoadingBarContainer } from "react-top-loading-bar";

const Parent = () => {
  return (
    <LoadingBarContainer>
      <App />
    </LoadingBarContainer>
  );
};
export default Parent;