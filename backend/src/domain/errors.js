export class DomainError extends Error {}

export class NotFoundError extends Error {
    constructor(recurso, id) {
        super(`${recurso} ${id} no existe`);
    }
}

export class ConflictError extends Error {}

// No hay sesión (401)
export class UnauthorizedError extends Error {}

// Hay sesión pero el rol no alcanza (403)
export class ForbiddenError extends Error {}