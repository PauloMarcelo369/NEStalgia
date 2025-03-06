import bcrypt from "bcryptjs";
import User from "./models/User";
import sequelize from "./config/db";

const createAdmin = async () => {
  await sequelize.sync();

  const adminExists = await User.findOne({ where: { role: "superadmin" } });

  if (adminExists) {
    console.log("Já existe um superadmin cadastrado.");
    return;
  }

  const hashedPassword = await bcrypt.hash("buceta_melada123", 10);

  const admin = await User.create({
    username: "NervyMosquito20",
    email: "NervyMosquito20@king.com",
    passwordHash: hashedPassword,
    role: "admin",
  });

  console.log("Superadmin criado com sucesso:", admin.email);
  process.exit();
};

createAdmin().catch((err) => {
  console.error("Erro ao criar superadmin:", err);
  process.exit(1);
});
