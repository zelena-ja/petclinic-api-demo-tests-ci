import {strict as assert} from 'assert'
import {OwnerController} from '../api/controller/owner.controller'

const owner = new OwnerController()

describe('User can', function(){
    it('receive owner by lastname',async function(){
        let body = await owner.getByLastname('Franklin')
        assert(body.length>0)

        body = await owner.getByLastname('Davis')
        assert(body.length>0)

        body = await owner.getByLastname('Yasinskaya')
        assert(body.length>0)
    })
})