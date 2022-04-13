import dynamic from "next/dynamic";
import { useState, Suspense } from "react";

// const DynamicComponentWithNoSSR = dynamic(() => import("../components/test"), {
//   ssr: false,
// 	suspense: true,
// });

function Loader() { return (<div>Loading...</div>) }

const DynamicOptions = {
	ssr: false,
	loading: () => <Loader />
}

const DynamicComponentWithCustomLoading = dynamic(() => import('../components/test'), {DynamicOptions})

function Upload() {
  const [count, setCount] = useState(false);

  return (
    <>
      {count &&
				<DynamicComponentWithCustomLoading text={'hello'} />
				// <Suspense>
				// 	<DynamicComponentWithNoSSR text={'hello'} />
				// </Suspense>
			}
      <button onClick={() => setCount(!count)}>Click</button>
    </>
  );
}

export default Upload;
