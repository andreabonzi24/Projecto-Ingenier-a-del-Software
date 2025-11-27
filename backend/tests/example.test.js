/**
 * Example test file for the Medical Appointments Platform
 * This demonstrates basic Jest testing patterns
 */

describe('Example Test Suite', () => {
  describe('Basic arithmetic operations', () => {
    test('should correctly add two numbers', () => {
      expect(1 + 1).toBe(2);
    });

    test('should correctly subtract two numbers', () => {
      expect(5 - 3).toBe(2);
    });

    test('should correctly multiply two numbers', () => {
      expect(2 * 3).toBe(6);
    });
  });

  describe('String operations', () => {
    test('should check string contains substring', () => {
      const platformName = 'Plataforma de Citas Médicas';
      expect(platformName).toContain('Citas');
    });

    test('should check string length', () => {
      const message = 'Hello';
      expect(message).toHaveLength(5);
    });
  });

  describe('Array operations', () => {
    test('should check if array contains element', () => {
      const roles = ['paciente', 'medico', 'admin'];
      expect(roles).toContain('paciente');
    });

    test('should check array length', () => {
      const appointments = [1, 2, 3];
      expect(appointments).toHaveLength(3);
    });
  });

  describe('Object operations', () => {
    test('should check object properties', () => {
      const user = {
        email: 'test@example.com',
        role: 'paciente',
        active: true
      };

      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('role', 'paciente');
      expect(user.active).toBe(true);
    });
  });

  describe('Async operations example', () => {
    test('should resolve promise correctly', async () => {
      const mockApiCall = () => Promise.resolve({ success: true });
      const result = await mockApiCall();
      expect(result.success).toBe(true);
    });
  });
});
