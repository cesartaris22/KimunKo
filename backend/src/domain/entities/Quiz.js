import { DomainError } from '../errors.js';

// Capa Dominio: reglas que dependen SOLO del quiz. No importa Express, Supabase ni DynamoDB.
export class Quiz {
    static OPCIONES = ['a', 'b', 'c', 'd'];

    constructor({ id, moduloId, puntajeMinimo, maxIntentos, preguntas }) {
        if (!id) throw new DomainError('id obligatorio');
        if (!(puntajeMinimo >= 0 && puntajeMinimo <= 100)) throw new DomainError('puntajeMinimo debe estar entre 0 y 100');
        if (!Number.isInteger(maxIntentos) || maxIntentos < 1) throw new DomainError('maxIntentos debe ser al menos 1');
        if (!Array.isArray(preguntas) || preguntas.length === 0) throw new DomainError('quiz sin preguntas');
        Object.assign(this, { id, moduloId, puntajeMinimo, maxIntentos, preguntas });
    }

  /** Corrige en el servidor. Nunca se confía en el puntaje que manda el cliente. */
    calificar(respuestas) {
        for (const p of this.preguntas) {
        if (!Quiz.OPCIONES.includes(respuestas?.[p.id])) {
            throw new DomainError('debes responder todas las preguntas');
        }
        }
        const detalle = Object.fromEntries(
        this.preguntas.map((p) => [p.id, respuestas[p.id] === p.correcta]),
        );
        const correctas = Object.values(detalle).filter(Boolean).length;
        const puntaje = Math.round((correctas / this.preguntas.length) * 100);
        return { puntaje, aprobado: puntaje >= this.puntajeMinimo, detalle };
    }
}