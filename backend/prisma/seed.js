const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('Starting seed...');

    // Shared password for all seeded users
    const hashedPassword = await bcrypt.hash('password123', 10);

    // =========================
    // ADMIN USER
    // =========================
    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@haqms.com' },
        update: {},
        create: {
            email: 'admin@haqms.com',
            password: hashedPassword,
            name: 'System Administrator',
            role: 'ADMIN',
        },
    });

    // =========================
    // DOCTOR USER
    // =========================
    const doctorUser = await prisma.user.upsert({
        where: { email: 'doctor1@haqms.com' },
        update: {},
        create: {
            email: 'doctor1@haqms.com',
            password: hashedPassword,
            name: 'Dr. John Doe',
            role: 'DOCTOR',
        },
    });

    // =========================
    // RECEPTIONIST USER
    // =========================
    const receptionistUser = await prisma.user.upsert({
        where: { email: 'reception1@haqms.com' },
        update: {},
        create: {
            email: 'reception1@haqms.com',
            password: hashedPassword,
            name: 'Jane Receptionist',
            role: 'RECEPTIONIST',
        },
    });

    // =========================
    // DOCTOR PROFILE
    // =========================
    await prisma.doctor.upsert({
        where: { id: 'doctor-profile-1' },
        update: {},
        create: {
            id: 'doctor-profile-1',
            name: 'Dr. John Doe',
            specialization: 'Cardiology',
            department: 'Cardiology',
            consultationFee: 100.0,
            experience: 10,
        },
    });

    // =========================
    // SAMPLE PATIENT
    // =========================
    await prisma.patient.upsert({
        where: { id: 'sample-patient-1' },
        update: {},
        create: {
            id: 'sample-patient-1',
            name: 'John Patient',
            email: 'patient@example.com',
            phoneNumber: '1234567890',
            age: 35,
            gender: 'Male',
            medicalHistory: 'No known allergies',
        },
    });

    console.log('Seed completed successfully.');
}

main()
    .catch((e) => {
        console.error('Seed error:', e);
        process.exit(1);
    })
    .finally(async() => {
        await prisma.$disconnect();
    });