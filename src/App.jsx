import "./styles/global.css";
import { Layout } from "./components/templates/Layout/Layout";
import { Routes, Route } from "react-router";
import ScedulePage from "./pages/scedule";
import ErrorPage from "./pages/404";

function App() {
	return (
		<Layout>
			<Routes>
				<Route path="/scedule" element={<ScedulePage />} />
				<Route path="/*" element={<ErrorPage />} />
			</Routes>
		</Layout>
	);
}

export default App;
