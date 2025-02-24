import User from "../user/user.model.js";

export const emailExists = async (email = "") => {
  const exists = await User.findOne({ email });
  if (exists) {
    throw new Error(`El correo ${email} ya está registrado`);
  }
  return true;
};

export const blockRole = (value) => {
  if (value) {
    throw new Error("No puedes asignar el rol. Será asignado automáticamente como 'CLIENT'. Contacta a un Administrador.");
  }
  return true;
};

export const userExists = async (uid = "") => {
  const exists = await User.findById(uid);
  if (!exists) {
    throw new Error("No existe un usuario con el ID proporcionado");
  }
  return true;
};
