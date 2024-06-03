import { JSX } from "solid-js"

export interface Message {
	systemMessage: string
	assistantMessage: string
	userMessage: string
}

export interface JsonlMessageData {
	role: 'system' | 'user' | 'assistant'
	content: string
}

export interface JsonlMessage {
	messages: JsonlMessageData[]
}

type InputHandler = JSX.EventHandlerUnion<HTMLTextAreaElement, Event>

interface AppStateData {
	defaultSystemMessage: string
	messages: Message[]
}