import { Role } from "../generated/prisma/enums";
import { auth } from "../lib/auth";
import { prisma } from "../lib/prisma";

export async function seedAdmin() {
  const admin = {
    name: "Admin",
    email: "admin@main.com",
    password: "admin123",
    role: Role.ADMIN,
  };

  const isAdminExists = await prisma.user.findUnique({
    where: {
      email: admin.email,
    },
    select: {
      id: true,
      emailVerified: true,
    },
  });

  if (!isAdminExists) {
    console.log("default admin not found seeding admin...");
    const createAdmin = await auth.api.signUpEmail({
      body: {
        name: admin.name,
        email: admin.email,
        password: admin.password,
        role: admin.role,
      },
    });

    if (!createAdmin.user.id) {
      throw new Error("Failed to create admin");
    }

    await prisma.user.update({
      where: { id: createAdmin.user.id },
      data: {
        emailVerified: true,
      },
    });
    console.log("default admin created successfully");
  }

  if (isAdminExists && !isAdminExists?.emailVerified) {
    console.log("default admin not verified");
    await prisma.user.update({
      where: { id: isAdminExists.id },
      data: {
        emailVerified: true,
      },
    });
    console.log("default admin verified successfully");
  }
}
