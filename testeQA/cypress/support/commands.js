/// <reference types="cypress" />
 import Ajv from 'ajv'
 const ajv = new Ajv({allErros: true, verbose: true, strict: false})

Cypress.Commands.add('validarContrato', (res, schema, status) =>{
    cy.fixture(`schema/${schema}/${status}.json`).then(schema =>{
        const validate = ajv.compile(schema)
        const valid = validate(res.body)
        if(!valid){
            var errors = ''
            for( let each in validate.errors){
                let err = validate.errors[each]
                errors += `\n${err.instancePath} ${err.message}, but receive ${typeof err.data}`
            }
            throw new Error('Contrato inválido, favor verificar' + errors)
        }
        return 'Contrato validado!'
    })
})

Cypress.Commands.add('serverestGet', () => {
    cy.request({
        method: 'GET',
        url: "http://serverest.dev/usuarios",
        failOnStatusCode: false 
    })
})