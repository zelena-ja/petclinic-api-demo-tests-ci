import {strict as assert} from 'assert'
import {PetController} from '../api/controller/pet.controller' 

const pet = new PetController()

describe('User can', function(){
    it('receive pet by id', async function(){
        const response = await pet.getById(21)
        assert(response.id == 21, `expected API to return pet with id=21 but got ${response.id}`)
    })

    it('create, update and delete pet', async function(){
        const newPet = {
            "birthDate": "2021/09/14",
            "id": 0,
            "name": "Mars",
            "owner": {
              "id": 1,
              "firstName": "George",
              "lastName": "Franklin",
              "address": "110 W. Liberty St.",
              "city": "Madison",
              "telephone": "6085551023"
            },
            "type": {
              "id": 720,
              "name": "Crocodile"
            },
            "visits": []
          }
        const addedPet = await pet.addNew(newPet)
        assert.deepEqual(addedPet, {...newPet, id: addedPet.id}, `Expected added pet to match data used during pet creation`)

        const foundPet = await pet.getById(addedPet.id)
        assert.deepEqual(foundPet, {...newPet, id: addedPet.id}, `Expected found pet to match data used during pet creation`)

        const newerPet = {
            "birthDate": "2021/09/14",
            "id": addedPet.id,
            "name": "Mars",
            "owner": {
              "id": 1,
              "firstName": "George",
              "lastName": "Franklin",
              "address": "110 W. Liberty St.",
              "city": "Madison",
              "telephone": "6085551023"
            },
            "type": {
              "id": 730,
              "name": "Cat"
            },
            "visits": []
          }

          await pet.update(newerPet)
          const updatedPet = await pet.getById(addedPet.id)
          assert.deepEqual(updatedPet, newerPet, `Expected updated pet to match data used during pet update`)

          await pet.delete(addedPet.id)
    })
})
