import { lineStore, setLineStore } from "./lines-store"
import { settingsStore, setSettingsStore } from "./settings-store"
import TurndownService from 'turndown';
import type { AppStateData, JsonlMessage, Message } from "./types"

const turndown = new TurndownService();

const APP_STATE_KEY = "app-state"
let appStateData: AppStateData = {
    defaultSystemMessage: 'Bạn là một trợ lý cute hột me',
    messages: [],
}

export function storeAppState() {
    appStateData.defaultSystemMessage = settingsStore.defaultSystemMessage
    appStateData.messages = lineStore.lines

    const json = JSON.stringify(appStateData)
    localStorage.setItem(APP_STATE_KEY, json)
}

export function loadAppState() {
    const json = localStorage.getItem(APP_STATE_KEY)
    if (!json) return

    appStateData = JSON.parse(json)
    setSettingsStore('defaultSystemMessage', appStateData.defaultSystemMessage)
    setLineStore('lines', appStateData.messages)
}

export function plainTextToHtml(planText: string) {
    planText = planText.replace(/\n/g, '<br />')
    return planText
}

export function htmlToPlainText(html: string) {
    html = html.replace(/<br \/>/g, '\n')
    return html
}

export function htmlToMarkdown(html: string) {
    return turndown.turndown(html);
}

export function exportToJsonl(): string {
    const lines = lineStore.lines.map(message => JSON.stringify({
        messages: [
            {
                role: 'system',
                content: message.systemMessage,
            },
            {
                role: 'user',
                content: message.userMessage,
            },
            {
                role: 'assistant',
                content: htmlToMarkdown(message.assistantMessage),
            },
        ]
    }))

    return lines.join('\n')
}

export function importJsonl(jsonl: string) {
    const lines = jsonl.split('\n')
    const messages: Message[] = [];

    lines.forEach(line => {
        if (!line) return

        try {
            const jsonlMessage: JsonlMessage = JSON.parse(line)

            messages.push({
                systemMessage: jsonlMessage.messages[0].content,
                userMessage: jsonlMessage.messages[1].content,
                assistantMessage: jsonlMessage.messages[2].content,
            })
        } catch(e) {
            console.error(e)
        }
    })

    setLineStore('lines', current => [
        ...current,
        ...messages,
    ])
}