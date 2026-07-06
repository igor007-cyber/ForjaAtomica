import type { User } from "@/src/types";

/**
 * Usuários mockados para demonstração.
 * O administrador só existe aqui — a tela pública de cadastro cria apenas clientes.
 *
 * Credenciais de demonstração:
 *  - Admin:   admin@forjaatomica.com / admin123
 *  - Cliente: maria@email.com / 123456
 */
export const mockUsers: User[] = [
  {
    id: "u-admin",
    name: "Leonardo Forja",
    email: "admin@forjaatomica.com",
    password: "admin123",
    role: "admin",
    createdAt: "2026-01-01T10:00:00.000Z",
  },
  {
    id: "u-01",
    name: "Maria Silva",
    email: "maria@email.com",
    password: "123456",
    role: "cliente",
    createdAt: "2026-02-11T10:00:00.000Z",
  },
  {
    id: "u-02",
    name: "João Pereira",
    email: "joao@email.com",
    password: "123456",
    role: "cliente",
    createdAt: "2026-03-19T10:00:00.000Z",
  },
  {
    id: "u-03",
    name: "Ana Costa",
    email: "ana@email.com",
    password: "123456",
    role: "cliente",
    createdAt: "2026-04-07T10:00:00.000Z",
  },
];
