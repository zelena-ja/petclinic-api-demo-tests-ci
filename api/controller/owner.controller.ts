import got from "got/dist/source";

export class OwnerController{
    async getByLastname(lastname: string){
        const response = await got(`https://rest.sana-commerce.dev:443/petclinic/api/owners/*/lastname/${lastname}`)
        return JSON.parse(response.body)
    }
}