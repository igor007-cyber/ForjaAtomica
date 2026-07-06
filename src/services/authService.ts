import { mockUsers } from "@/src/data/users";
import type { SessionUser, User } from "@/src/types";
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
  STORAGE_KEYS,
} from "@/src/utils/storage";

/**
 * Serviço de autenticação mockado.
 * Combina os usuários fixos (incluindo o admin) com os clientes
 * cadastrados pela tela pública (persistidos no localStorage).
 */

function getRegisteredUsers(): User[] {
  return getStorageItem<User[]>(STORAGE_KEYS.users, []);
}

function getAllUsers(): User[] {
  return [...mockUsers, ...getRegisteredUsers()];
}

function toSession(user: User): SessionUser {
  const { password: _password, ...session } = user;
  void _password;
  return session;
}

export function login(email: string, password: string): SessionUser {
  const user = getAllUsers().find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase()
  );
  if (!user || user.password !== password) {
    throw new Error("E-mail ou senha inválidos.");
  }
  const session = toSession(user);
  setStorageItem(STORAGE_KEYS.session, session);
  return session;
}

export function register(
  name: string,
  email: string,
  password: string
): SessionUser {
  const normalizedEmail = email.trim().toLowerCase();
  const exists = getAllUsers().some(
    (u) => u.email.toLowerCase() === normalizedEmail
  );
  if (exists) {
    throw new Error("Já existe uma conta com este e-mail.");
  }

  const newUser: User = {
    id: `u-${Date.now()}`,
    name: name.trim(),
    email: normalizedEmail,
    password,
    role: "cliente", // cadastro público cria somente clientes
    createdAt: new Date().toISOString(),
  };

  setStorageItem(STORAGE_KEYS.users, [...getRegisteredUsers(), newUser]);

  const session = toSession(newUser);
  setStorageItem(STORAGE_KEYS.session, session);
  return session;
}

export function logout(): void {
  removeStorageItem(STORAGE_KEYS.session);
}

export function getSession(): SessionUser | null {
  return getStorageItem<SessionUser | null>(STORAGE_KEYS.session, null);
}
