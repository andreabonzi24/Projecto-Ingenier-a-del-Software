require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Center = require('../models/Center');

// Usuarios iniciales del sistema
const initialUsers = [
  {
    name: 'María López',
    email: 'maria.lopez@example.test',
    password: 'Paciente123!',
    role: 'paciente',
    phone: '+34 612 345 678',
    ID: '12345678A',
    healthCard: 'TSI-123456789'
  },
  {
    name: 'Dr. Carlos Ruiz',
    email: 'carlos.ruiz@med.example.test',
    password: 'Doctor2025!',
    role: 'medico',
    phone: '+34 623 456 789',
    ID: '23456789B',
    specialty: 'Cardiología',
    licenseNumber: 'MED-2025-001',
    centerId: 'centro-principal'
  },
  {
    name: 'Admin Plataforma',
    email: 'admin@platform.example.test',
    password: 'AdminMaster!2025',
    role: 'admin_sistema',
    phone: '+34 634 567 890',
    ID: '34567890C'
  },
  {
    name: 'Laura Martínez',
    email: 'laura.martinez@hospital.example.test',
    password: 'CentroAdmin2025!',
    role: 'admin_centro',
    phone: '+34 645 678 901',
    ID: '45678901D',
    centerId: 'centro-principal'
  }
];

// Centros médicos iniciales
const initialCenters = [
  {
    name: 'Centro Médico Principal',
    address: 'Calle Principal 123, Madrid',
    phone: '+34 911 222 333',
    email: 'contacto@centromedico.test',
    description: 'Centro médico principal con múltiples especialidades',
    specialties: ['Cardiología', 'Pediatría', 'Medicina General', 'Traumatología'],
    workingHours: 'Lunes a Viernes: 8:00 - 20:00, Sábados: 9:00 - 14:00'
  }
];

/**
 * Función principal de seed
 */
const seedDatabase = async () => {
  try {
    console.log('🌱 Iniciando seed de la base de datos...');
    
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Conectado a MongoDB');

    // Limpiar colecciones existentes (opcional - comentar si no quieres borrar datos)
    console.log('🗑️  Limpiando usuarios existentes...');
    await User.deleteMany({});
    console.log('🗑️  Limpiando centros existentes...');
    await Center.deleteMany({});

    // Crear centros médicos
    console.log('🏥 Creando centros médicos...');
    for (const centerData of initialCenters) {
      const center = await Center.create(centerData);
      console.log(`   ✓ Centro creado: ${center.name}`);
    }

    // Crear usuarios con contraseñas hasheadas
    console.log('👥 Creando usuarios iniciales...');
    for (const userData of initialUsers) {
      // Hashear contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      // Crear usuario
      const user = await User.create({
        ...userData,
        password: hashedPassword
      });

      console.log(`   ✓ Usuario creado: ${user.name} (${user.email}) - Role: ${user.role}`);
    }

    console.log('');
    console.log('✅ ═══════════════════════════════════════════════════════');
    console.log('   Seed completado exitosamente');
    console.log('═══════════════════════════════════════════════════════');
    console.log('');
    console.log('📋 Usuarios de prueba creados:');
    console.log('');
    
    initialUsers.forEach(user => {
      console.log(`   👤 ${user.role.toUpperCase()}`);
      console.log(`      Email: ${user.email}`);
      console.log(`      Password: ${user.password}`);
      console.log(`      Nombre: ${user.name}`);
      console.log('');
    });

    console.log('═══════════════════════════════════════════════════════');
    console.log('');

    // Cerrar conexión
    await mongoose.connection.close();
    console.log('🔌 Conexión cerrada');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error en el seed:', error);
    process.exit(1);
  }
};

// Ejecutar seed
seedDatabase();
