import React, {Suspense} from "react";
const Forecast1 = React.lazy(() => import("app1/App"));
const Forecast2 = React.lazy(() => import("app2/App"));

const App = () => {
  return (
    <div>
      <Suspense fallback={"loading..."}>
        <Forecast2 />
      </Suspense>
      <Suspense fallback={"loading..."}>
        <Forecast1 />
      </Suspense>
    </div>)
}


export default App;
