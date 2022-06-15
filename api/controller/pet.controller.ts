import { AllureStep } from "../../allureStep"
import { LoggedJsonRequest } from "../../builder"

export class PetController{
    @AllureStep('get pet by id')
    async getById(id: number | string){
        return(
            await new LoggedJsonRequest()
                .url(`https://rest.sana-commerce.dev:443/petclinic/api/pets/${id}`)
                .send()
            ).body
    }

    @AllureStep('add new pet')
    async addNew( pet: {
        birthDate: string,
        id: number,
        name: string,
        owner: {
          address: string,
          city: string,
          firstName: string,
          id: number,
          lastName: string,
          telephone: string
        },
        type: {
          id: number,
          name: string
        },
        visits: {}[]
      }){
        return(
            await new LoggedJsonRequest()
                .url(`https://rest.sana-commerce.dev:443/petclinic/api/pets`)
                .method('POST')
                .body(pet)
                .send()
            ).body
      }

      @AllureStep('update pet by id')
      async update(pet: {
        birthDate: string,
        id: number,
        name: string,
        owner: {
          address: string,
          city: string,
          firstName: string,
          id: number,
          lastName: string,
          telephone: string
        },
        type: {
          id: number,
          name: string
        },
        visits: {}[]
      }){
            await new LoggedJsonRequest()
                .url(`https://rest.sana-commerce.dev:443/petclinic/api/pets/${pet.id}`)
                .method('PUT')
                .body(pet)
                .send()
      }

      @AllureStep('delete pet by id')
      async delete(id: number | string){
            await new LoggedJsonRequest()
                .url(`https://rest.sana-commerce.dev:443/petclinic/api/pets/${id}`)
                .method('DELETE')
                .send()
      }
}