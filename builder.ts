import { Method } from 'got'
import got from 'got'
import {allure} from 'allure-mocha/dist/MochaAllureReporter'
import { setPriority } from 'os'

export class JsonRequest{
    protected options : any = {
        responseType: 'json'
    }
    public url(url: string | URL): this{
        this.options.url = url
        return this
    }
    public method(method: Method): this{
        this.options.method = method
        return this
    }
    public body(body: any): this{
        this.options.json = body
        return this
    }

    public async send(){
        return await got<any>(this.options)
    }
}

export class LoggedJsonRequest extends JsonRequest{
    constructor(){
        super()
        this.options = {
            ...this.options,
            hooks:{
                afterResponse: [
                    (response: {statusCode: any, body: any}) => {
                        const stepName = `[${response.statusCode}] ${this.options.method ?? 'GET'} ${this.options.url}`
                        const step = allure.createStep(stepName, () =>{
                            if(this.options.json){
                                allure.createAttachment(
                                    `JSON REQUEST BODY`,
                                    JSON.stringify(this.options.json, null, 2),
                                    'application/json' as any)}
                            if(response.body){
                                allure.createAttachment(
                                    `JSON RESPONSE BODY`,
                                    JSON.stringify(response.body, null, 2),
                                    'application/json' as any)}
                        })
                        step()
                        return response
                    }
                ]
            }
        }
    }
}