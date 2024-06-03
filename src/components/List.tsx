import { Container, IconButton } from "@vuuui/solidjs"
import { lineStore, setLineStore } from "../lines-store"
import { For, createSignal } from "solid-js"
import { RiEditLine, RiDeleteBin7Line } from 'solidjs-remixicon'
import { EditModal } from "./EditModal"
import type { Accessor } from 'solid-js'

function deleteLine(index: Accessor<number>) {
	if (!confirm("Confirm?")) return;

	const newLines = lineStore.lines.filter((_, lineIndex) => lineIndex != index())
	setLineStore('lines', () => newLines)
}

export const List = () => {
	return <Container class='table-wrapper'>
		<table>
			<thead>
				<tr>
					<th>Line</th>
					<th>System</th>
					<th>User</th>
					<th>Assistant</th>
					<th>Control</th>
				</tr>
			</thead>

			<tbody>
				<For each={lineStore.lines}>
					{(msg, index) => {
						const [modalOpen, setModalOpen] = createSignal(false)

						return <tr>
							<td>{index()}</td>
							<td innerHTML={msg.systemMessage} />
							<td innerHTML={msg.userMessage} />
							<td innerHTML={msg.assistantMessage} />
							<td>
								<IconButton
									title="Edit"
									onClick={() => setModalOpen(true)}
								><RiEditLine /></IconButton>

								<IconButton
									title="Remove"
									onClick={() => deleteLine(index)}
								><RiDeleteBin7Line /></IconButton>
							</td>

							<EditModal
								open={modalOpen()}
								close={() => setModalOpen(false)}
								index={index}
								systemMessage={msg.systemMessage}
								userMessage={msg.userMessage}
								assistantMessage={msg.assistantMessage}
							/>
						</tr>
					}}
				</For>
			</tbody>
		</table>
	</Container>
}