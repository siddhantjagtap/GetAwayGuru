// import { Suspense } from "react";
// import Routing from "./Routes/Routing";
// import Loading from "./components/Loading";
// import Footer from "./components/Footer";

// function App() {
//   return (
//     <>
//     <Suspense fallback={Loading}>
//       <Routing />
//       <Footer />
//       </Suspense>
//     </>
      
//   );
// }

// export default App;


import { Suspense } from "react";
import Routing from "./Routes/Routing";
import Loading from "./components/Loading";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Suspense fallback={<Loading />}>
        <div className="flex-grow">
          <Routing />
        </div>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
