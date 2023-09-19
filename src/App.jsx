import "./styles/global.css";
import { Layout } from "./components/templates/Layout/Layout";
import { Routes, Route } from "react-router";
import SchedulePage from "./pages/schedule";
// import ErrorPage from "./pages/404";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";
import RegistStorePage from "./pages/registstore";
import AccountDetailsPage from "./pages/accountdetails";

// const [scrollPosition, setScrollPosition] = useState(0);
function App() {
	return (
		<Layout>
			<Routes>
				<Route path="/schedule" element={<SchedulePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignUpPage />} />
				<Route path="/registstore" element={<RegistStorePage />} />
				<Route path="/accountdetails" element={<AccountDetailsPage />} />
				<Route path="/*" element={<LoginPage />} />
			</Routes>
		</Layout>
		
	);
}

export default App;
