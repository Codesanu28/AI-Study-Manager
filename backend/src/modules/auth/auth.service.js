const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authRepository = require("./auth.repository");

const registerUser = async (data) => {
const { name, email, password } = data;

const existingUser =
await authRepository.findUserByEmail(email);

if (existingUser) {
throw new Error("User already exists");
}

const hashedPassword =
await bcrypt.hash(password, 10);

return await authRepository.createUser({
name,
email,
password: hashedPassword,
});
};

const loginUser = async (data) => {
const { email, password } = data;

const user =
await authRepository.findUserByEmail(email);

if (!user) {
throw new Error("User not found");
}

const isMatch = await bcrypt.compare(
password,
user.password
);

if (!isMatch) {
throw new Error("Invalid credentials");
}

const token = jwt.sign(
{
id: user._id,
email: user.email,
},
process.env.JWT_SECRET,
{
expiresIn: "7d",
}
);

return {
token,
user: {
id: user._id,
name: user.name,
email: user.email,
avatar: user.avatar || "",
},
};
};

module.exports = {
registerUser,
loginUser,
};
