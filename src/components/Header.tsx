import { createSignal } from 'solid-js'
import {
	Container, Spacer,
	ElevatedButton,
	FilledButton,
	OutlinedButton,
	TextButton,
} from "@vuuui/solidjs"
import {
	RiFileUploadLine,
	RiFileDownloadLine,
	RiSettingsLine,
	RiAddLine, RiEraserLine,
	RiArrowGoForwardLine, RiArrowGoBackLine,
} from 'solidjs-remixicon'
import { Settings } from "./Settings"
import { CreateModal } from './CreateModal'
import { exportToJsonl, importJsonl } from '../utils'
import { setLineStore } from '../lines-store'

function importJsonlFile() {
	const inputEl = document.createElement('input')
	inputEl.type = 'file'
	inputEl.click()
	inputEl.onchange = async event => {
		const target = event.target as HTMLInputElement
		if (target.files && target.files.length) {
			const file = target.files[0]
			const jsonl = await file.text()
			importJsonl(jsonl)
		}
	}
}

function downloadJsonl() {
	const jsonl = exportToJsonl()
	const data = 'data:text/json;charset=utf-8,' + encodeURIComponent(jsonl)
	const aEl = document.createElement('a')
	aEl.href = data
	aEl.download = "jsonline-data.jsonl"
	aEl.click()
}

function clearLines() {
	if (!confirm('Confirm?')) return

	setLineStore('lines', [])
}

export const Header = () => {
	const [settingsOpen, setSettingsOpen] = createSignal(false)
	const [createModalOpen, setCreateModalOpen] = createSignal(false)

	return <>
		<Container class='app-header'>
			<Spacer justify="center">
				<ElevatedButton
					icon={<RiFileUploadLine />}
					onClick={importJsonlFile}
				>Open</ElevatedButton>

				<ElevatedButton
					icon={<RiFileDownloadLine />}
					onClick={downloadJsonl}
				>Save</ElevatedButton>

				<OutlinedButton
					icon={<RiSettingsLine />}
					onClick={() => setSettingsOpen(true)}
				>Settings</OutlinedButton>

				<OutlinedButton
					icon={<RiEraserLine />}
					onClick={() => clearLines()}
				>Clear</OutlinedButton>

				<FilledButton
					icon={<RiAddLine />}
					onClick={() => setCreateModalOpen(true)}
				>Create</FilledButton>

				<TextButton
					icon={<RiArrowGoForwardLine />}
					disabled
				>Redo</TextButton>

				<TextButton
					icon={<RiArrowGoBackLine />}
					disabled
				>Undo</TextButton>
			</Spacer>
		</Container>

		<Settings
			open={settingsOpen()}
			close={() => setSettingsOpen(false)}
		/>

		<CreateModal
			open={createModalOpen()}
			close={() => setCreateModalOpen(false)}
		/>
	</>
}
