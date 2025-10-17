import { User, Pickup, Opportunity } from './admin.model';

export interface DashboardStats {
  totalUsers: number;
  completedPickups: number;
  pendingPickups: number;
  activeOpportunities: number;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const totalUsers = await User.countDocuments({ status: 'active' });
    const completedPickups = await Pickup.countDocuments({ type: 'completed' });
    const pendingPickups = await Pickup.countDocuments({ type: 'pending' });
    const activeOpportunities = await Opportunity.countDocuments({ status: 'active' });

    return { totalUsers, completedPickups, pendingPickups, activeOpportunities };
  } catch (error) {
    throw new Error(`Error fetching dashboard stats: ${error}`);
  }
};

export const getAllUsers = async () => {
  try {
    return await User.find().select('-__v').sort({ createdAt: -1 });
  } catch (error) {
    throw new Error(`Error fetching users: ${error}`);
  }
};

export const searchUsers = async (query: string) => {
  try {
    if (!query || query.trim() === '') {
      return await getAllUsers();
    }
    const searchRegex = new RegExp(query, 'i');
    return await User.find({
      $or: [{ name: searchRegex }, { email: searchRegex }]
    }).select('-__v').sort({ createdAt: -1 });
  } catch (error) {
    throw new Error(`Error searching users: ${error}`);
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await User.findById(id).select('-__v');
    if (!user) throw new Error('User not found');
    return user;
  } catch (error) {
    throw new Error(`Error fetching user: ${error}`);
  }
};

export const createUser = async (data: any) => {
  try {
    const user = new User(data);
    return await user.save();
  } catch (error) {
    throw new Error(`Error creating user: ${error}`);
  }
};

export const updateUser = async (id: string, data: any) => {
  try {
    const user = await User.findByIdAndUpdate(id, data, { new: true, runValidators: true }).select('-__v');
    if (!user) throw new Error('User not found');
    return user;
  } catch (error) {
    throw new Error(`Error updating user: ${error}`);
  }
};

export const deleteUser = async (id: string) => {
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new Error('User not found');
    return { message: 'User deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting user: ${error}`);
  }
};

export const getAdminLogs = async () => {
  try {
    return { logs: [], message: 'Admin logs feature coming soon' };
  } catch (error) {
    throw new Error(`Error fetching admin logs: ${error}`);
  }
};