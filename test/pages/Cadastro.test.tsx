import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { Cadastro } from '../../src/pages/Cadastro'
import { AuthProvider } from '../../src/state/AuthContext'
import { http, HttpResponse } from '../mocks/handlers'
import { server } from '../mocks/server'

describe('Whitelist page', () => {
  test('requires Discord login when the visitor is not authenticated', async () => {
    server.use(http.get('http://localhost:3000/auth/me', () => new HttpResponse(null, { status: 401 })))
    render(<MemoryRouter><AuthProvider><Cadastro /></AuthProvider></MemoryRouter>)
    expect(await screen.findByText(/entre com sua conta discord/i)).toBeInTheDocument()
  })
  test('submits a whitelist application for an authenticated player', async () => {
    server.use(
      http.get('http://localhost:3000/auth/me', () => HttpResponse.json({ player: {
        id: 'p-1', discordId: 'd-1', discordUsername: 'player', displayName: 'player', fivemLicense: null,
      }})),
      http.post('http://localhost:3000/api/whitelist/apply', () => HttpResponse.json({ ok: true }, { status: 201 })),
    )
    render(<MemoryRouter><AuthProvider><Cadastro /></AuthProvider></MemoryRouter>)
    fireEvent.change(await screen.findByLabelText(/nome do personagem/i), { target: { value: 'Gabriel Oliveira' } })
    fireEvent.change(screen.getByLabelText(/sua idade/i), { target: { value: '22' } })
    fireEvent.change(screen.getByLabelText(/experiência com roleplay/i), { target: { value: 'Já participei de comunidades de roleplay e conheço as regras básicas de interpretação.' } })
    fireEvent.change(screen.getByLabelText(/história e conceito do personagem/i), { target: { value: 'Gabriel chegou à cidade procurando recomeçar. Ele pretende trabalhar honestamente, conhecer pessoas e construir uma trajetória própria.' } })
    fireEvent.click(screen.getByRole('checkbox'))
    fireEvent.click(screen.getByRole('button', { name: /enviar solicitação/i }))
    expect(await screen.findByText(/agora é hora da entrevista/i)).toBeInTheDocument()
  })
})
