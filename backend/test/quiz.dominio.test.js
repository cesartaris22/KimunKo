import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Quiz } from '../src/domain/entities/Quiz.js';
import { DomainError } from '../src/domain/errors.js';

const quiz = () => new Quiz({
    id: 'q1', moduloId: 'm4', puntajeMinimo: 60, maxIntentos: 3,
    preguntas: [{ id: 'p1', correcta: 'a' }, { id: 'p2', correcta: 'b' }],
});

test('aprueba con todas correctas', () => {
    const r = quiz().calificar({ p1: 'a', p2: 'b' });
    assert.equal(r.puntaje, 100);
    assert.equal(r.aprobado, true);
});

test('reprueba bajo el mínimo', () => {
    const r = quiz().calificar({ p1: 'a', p2: 'c' });
    assert.equal(r.puntaje, 50);
    assert.equal(r.aprobado, false);
});

test('exige responder todas las preguntas', () => {
    assert.throws(() => quiz().calificar({ p1: 'a' }), DomainError);
});