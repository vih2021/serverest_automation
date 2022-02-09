/// <reference types="cypress" />

describe('teste serverest', () =>{
    it('Deve retornar os usuarios cadastrados', () =>{
        cy.serverestGet().then(res =>{
            expect(res.body).to.have.property('quantidade')
            expect(res.body).to.have.property('usuarios')
            cy.validarContrato(res, 'get_usuarios', 200).then(validacao =>{
                expect(validacao).to.be.equal('Contrato validado!')
            })
        })
    })
})