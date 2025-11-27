/**
 * Example test file for the Medical Appointments Platform
 * This serves as a sanity check that Jest is properly configured.
 */

describe('Example Test Suite', () => {
  test('should pass a simple truth check', () => {
    expect(true).toBe(true);
  });

  test('should perform basic arithmetic correctly', () => {
    expect(2 + 2).toBe(4);
  });

  test('should handle string operations', () => {
    const platform = 'Medical Appointments';
    expect(platform).toContain('Medical');
    expect(platform.length).toBeGreaterThan(0);
  });

  test('should work with arrays', () => {
    const appointments = ['checkup', 'consultation', 'followup'];
    expect(appointments).toHaveLength(3);
    expect(appointments).toContain('checkup');
  });

  test('should work with objects', () => {
    const patient = {
      name: 'Test Patient',
      age: 30,
      active: true
    };
    expect(patient).toHaveProperty('name');
    expect(patient.active).toBeTruthy();
  });
});
