import { Header } from "./components/Header"
import { List } from "./components/List"
import { storeAppState, loadAppState } from "./utils"

const App = () => {
	loadAppState()
	window.onunload = () => storeAppState()

	return <main class="app-main">
		<h3 class="app-title">JSONLine Editor</h3>
		<Header />
		<List />
	</main>
}

export default App
