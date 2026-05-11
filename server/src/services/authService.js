import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersPath = path.join(__dirname, '../data/users.json');

const JWT_SECRET = 'emergencypath_secret_key_2026';

// Helper to read data
async function getUsersData() {
  try {
    const data = await fs.readFile(usersPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Helper to write data
async function writeUsersData(data) {
  try {
    await fs.writeFile(usersPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing users data:', error);
  }
}

export const registerUser = async (name, email, password, role) => {
  const users = await getUsersData();

  if (users.find(u => u.email === email)) {
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password: hashedPassword,
    role: role || 'Paramedic',
    phone: '',
    accountStatus: 'Active',
    lastLogin: new Date().toISOString(),
    emergencyId: `EMP-${Math.floor(1000 + Math.random() * 9000)}`
  };

  users.push(newUser);
  await writeUsersData(users);

  const token = jwt.sign({ id: newUser.id, role: newUser.role }, JWT_SECRET, { expiresIn: '1d' });
  
  return {
    token,
    user: { 
      id: newUser.id, 
      name: newUser.name, 
      email: newUser.email, 
      role: newUser.role,
      phone: newUser.phone,
      accountStatus: newUser.accountStatus,
      lastLogin: newUser.lastLogin,
      emergencyId: newUser.emergencyId
    }
  };
};

export const loginUser = async (email, password) => {
  const users = await getUsersData();
  const userIndex = users.findIndex(u => u.email === email);

  if (userIndex === -1) {
    throw new Error('Invalid credentials');
  }

  const user = users[userIndex];
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  // Update last login
  user.lastLogin = new Date().toISOString();
  await writeUsersData(users);

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

  return {
    token,
    user: { 
      id: user.id, 
      name: user.name, 
      email: user.email, 
      role: user.role,
      phone: user.phone || '',
      accountStatus: user.accountStatus || 'Active',
      lastLogin: user.lastLogin,
      emergencyId: user.emergencyId || `EMP-${Math.floor(1000 + Math.random() * 9000)}`
    }
  };
};

export const getUserById = async (id) => {
  const users = await getUsersData();
  const user = users.find(u => u.id === id);
  if (!user) throw new Error('User not found');

  return { 
    id: user.id, 
    name: user.name, 
    email: user.email, 
    role: user.role,
    phone: user.phone || '',
    accountStatus: user.accountStatus || 'Active',
    lastLogin: user.lastLogin || new Date().toISOString(),
    emergencyId: user.emergencyId || `EMP-${Math.floor(1000 + Math.random() * 9000)}`
  };
};

export const updateUserProfile = async (id, updateData) => {
  const users = await getUsersData();
  const index = users.findIndex(u => u.id === id);
  
  if (index === -1) throw new Error('User not found');

  const user = users[index];
  
  // Safe merge (don't allow password or id override here)
  users[index] = {
    ...user,
    name: updateData.name || user.name,
    phone: updateData.phone !== undefined ? updateData.phone : user.phone,
    // Add any other editable fields here
  };

  await writeUsersData(users);
  
  return { 
    id: users[index].id, 
    name: users[index].name, 
    email: users[index].email, 
    role: users[index].role,
    phone: users[index].phone || '',
    accountStatus: users[index].accountStatus || 'Active',
    lastLogin: users[index].lastLogin || new Date().toISOString(),
    emergencyId: users[index].emergencyId || `EMP-${Math.floor(1000 + Math.random() * 9000)}`
  };
};
