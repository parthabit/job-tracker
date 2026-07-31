import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import { Camera, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function Profile() {
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '');
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const profileForm = useForm({
    defaultValues: { name: user?.name || '', email: user?.email || '' },
  });

  const passwordForm = useForm({
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  });

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image must be under 2MB');
      return;
    }
    const dataUrl = await fileToDataUrl(file);
    setAvatarPreview(dataUrl);
  };

  const onSaveProfile = async (data) => {
    setSavingProfile(true);
    try {
      const res = await authService.updateProfile({ ...data, avatar: avatarPreview });
      updateUser(res.user);
      toast.success('Profile updated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const onChangePassword = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      passwordForm.setError('confirmPassword', { message: 'Passwords do not match' });
      return;
    }
    setSavingPassword(true);
    try {
      await authService.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast.success('Password changed successfully');
      passwordForm.reset();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not change password');
    } finally {
      setSavingPassword(false);
    }
  };

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h2 className="text-xl font-display font-semibold text-secondary dark:text-white">Profile</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your account details and security.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6 mb-6"
      >
        <h3 className="font-semibold text-secondary dark:text-white text-sm mb-5">Personal Information</h3>

        <div className="flex items-center gap-4 mb-6">
          <button
            type="button"
            onClick={handleAvatarClick}
            className="group relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 dark:bg-primary-900/25 text-primary font-semibold text-xl overflow-hidden shrink-0"
          >
            {avatarPreview ? (
              <img src={avatarPreview} alt="avatar" className="h-full w-full object-cover" />
            ) : (
              initials || 'U'
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-secondary/50 opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera size={18} className="text-white" />
            </div>
          </button>
          <div>
            <button type="button" onClick={handleAvatarClick} className="btn-outline !py-2 !px-4 text-xs">
              Upload photo
            </button>
            <p className="text-xs text-slate-400 mt-1.5">JPG or PNG, max 2MB</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        <form onSubmit={profileForm.handleSubmit(onSaveProfile)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Full name</label>
              <input
                className="input"
                {...profileForm.register('name', { required: 'Name is required' })}
              />
            </div>
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                {...profileForm.register('email', { required: 'Email is required' })}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" disabled={savingProfile} className="btn-primary">
              {savingProfile ? <Loader2 size={16} className="animate-spin" /> : 'Save Changes'}
            </button>
          </div>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6"
      >
        <h3 className="font-semibold text-secondary dark:text-white text-sm mb-1">Change Password</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
          Use a strong password you're not using elsewhere.
        </p>

        <form onSubmit={passwordForm.handleSubmit(onChangePassword)} className="space-y-4">
          <div>
            <label className="label">Current password</label>
            <input
              type="password"
              className="input"
              {...passwordForm.register('currentPassword', { required: 'Required' })}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">New password</label>
              <input
                type="password"
                className="input"
                {...passwordForm.register('newPassword', {
                  required: 'Required',
                  minLength: { value: 6, message: 'At least 6 characters' },
                })}
              />
              {passwordForm.formState.errors.newPassword && (
                <p className="text-xs text-danger mt-1">
                  {passwordForm.formState.errors.newPassword.message}
                </p>
              )}
            </div>
            <div>
              <label className="label">Confirm new password</label>
              <input
                type="password"
                className="input"
                {...passwordForm.register('confirmPassword', { required: 'Required' })}
              />
              {passwordForm.formState.errors.confirmPassword && (
                <p className="text-xs text-danger mt-1">
                  {passwordForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" disabled={savingPassword} className="btn-primary">
              {savingPassword ? <Loader2 size={16} className="animate-spin" /> : 'Update Password'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
