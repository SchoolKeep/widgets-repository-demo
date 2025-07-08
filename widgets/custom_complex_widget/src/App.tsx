import "./App.css";
// @ts-expect-error - JSX file without TypeScript declarations
import TopicContent from "./widgets/TopicContent";
// import { Footer } from "./widgets";
// import MoreToDiscover from "./widgets/MoreToDiscover";

// import { StayConnected } from "./widgets";
// import { LearnWithAdobe } from "./widgets";
// import MorePlacesToConnect from "./widgets/MorePlacesToConnect";

function App() {
	return (
		<div className='app'>
			{/* <LearnWithAdobe />
			<MorePlacesToConnect /> */}
			{/* <StayConnected /> */}
			{/* <Footer /> */}
			{/* <MoreToDiscover /> */}
			<TopicContent />
		</div>
	);
}

export default App;
