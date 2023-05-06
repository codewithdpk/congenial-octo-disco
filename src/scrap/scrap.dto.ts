import * as JOI from 'joi'

export interface ScrapRequest {
    passage: string
    question: string
}

export type ScrapReturnType = {
    text: string
    author: string
}[]

export const ScrapDto = JOI.object({
    passage: JOI.string().required(),
    question: JOI.string().required(),
})