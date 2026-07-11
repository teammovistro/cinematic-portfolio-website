'use client'

import React, { useEffect, useState } from 'react'
import { UserItem, UserRole } from '@/lib/db'
import { Modal } from '@/components/admin/modal'
import { useToast } from '../layout'
import { 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  ShieldCheck, 
  UserCheck, 
  UserX, 
  Key, 
  Mail,
  Sparkles
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function TeamRBACManagement() {
  const { showToast } = useToast()
  const [users, setUsers] = useState<UserItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<UserItem | null>(null)

  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    role: 'viewer' as UserRole,
    active: true,
  })

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users')
      const data = await res.json()
      setUsers(Array.isArray(data) ? data : [])
    } catch (error) {
      showToast('Error loading team members', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleOpenNew = () => {
    setEditingUser(null)
    setFormData({
      username: '',
      name: '',
      email: '',
      password: '',
      role: 'viewer',
      active: true,
    })
    setIsModalOpen(true)
  }

  const handleOpenEdit = (user: UserItem) => {
    setEditingUser(user)
    setFormData({
      username: user.username,
      name: user.name,
      email: user.email,
      password: user.password || '',
      role: user.role,
      active: user.active !== false,
    })
    setIsModalOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingUser) {
        // Update
        const res = await fetch('/api/users', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingUser.id, ...formData }),
        })
        const data = await res.json()
        if (res.ok) {
          setUsers((prev) => prev.map((u) => (u.id === data.id ? data : u)))
          showToast(`Updated team member "${formData.name}"!`)
          setIsModalOpen(false)
        } else {
          showToast(data.error || 'Failed to update user', 'error')
        }
      } else {
        // Create
        if (!formData.password) {
          showToast('Password is required for new users', 'error')
          return
        }
        const res = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        const data = await res.json()
        if (res.ok) {
          setUsers((prev) => [data, ...prev])
          showToast(`Added "${formData.name}" to studio team!`)
          setIsModalOpen(false)
        } else {
          showToast(data.error || 'Failed to create user', 'error')
        }
      }
    } catch (error) {
      showToast('Error saving user data', 'error')
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to remove "${name}" from the studio team?`)) return
    try {
      const res = await fetch(`/api/users?id=${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u.id !== id))
        showToast(`Removed "${name}" from team`)
      } else {
        showToast(data.error || 'Failed to delete user', 'error')
      }
    } catch (error) {
      showToast('Error deleting team member', 'error')
    }
  }

  const roleBadge = (role: UserRole) => {
    switch (role) {
      case 'super_admin':
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/15 px-2.5 py-0.5 font-mono text-[0.65rem] font-bold uppercase tracking-wider text-gold">
            <ShieldCheck className="h-3 w-3" /> Super Admin
          </span>
        )
      case 'editor':
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-blue/40 bg-blue/15 px-2.5 py-0.5 font-mono text-[0.65rem] font-bold uppercase tracking-wider text-blue">
            Producer / Editor
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-success/40 bg-success/15 px-2.5 py-0.5 font-mono text-[0.65rem] font-bold uppercase tracking-wider text-success">
            CRM Viewer
          </span>
        )
    }
  }

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-border pb-6 md:flex-row md:items-center">
        <div>
          <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-gold">
            <Sparkles className="h-3.5 w-3.5" />
            RBAC & Studio Authorization OS
          </span>
          <h2 className="mt-1 font-display text-2xl uppercase tracking-tight text-foreground md:text-3xl">
            Team Members ({users.length})
          </h2>
        </div>

        <button
          onClick={handleOpenNew}
          className="flex items-center gap-2 rounded-sm bg-gold px-6 py-3 font-mono text-xs uppercase tracking-widest text-background transition-all hover:bg-foreground hover:text-background shadow-[0_0_15px_rgba(212,166,79,0.3)]"
        >
          <Plus className="h-4 w-4" />
          Add Studio Member
        </button>
      </div>

      {/* Roles Explainer Card */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-sm border border-gold/30 bg-surface p-5">
          <span className="font-display text-sm uppercase text-gold block mb-1">1. Super Admin</span>
          <p className="font-mono text-xs text-muted-foreground leading-relaxed">
            Full executive control over studio users, RBAC roles, brand settings, portfolio projects, and Telegram Bot notifications.
          </p>
        </div>

        <div className="rounded-sm border border-blue/30 bg-surface p-5">
          <span className="font-display text-sm uppercase text-blue block mb-1">2. Producer / Editor</span>
          <p className="font-mono text-xs text-muted-foreground leading-relaxed">
            Can add, edit, reorder, and remove portfolio film projects in the 3D world, and manage all client CRM inquiries.
          </p>
        </div>

        <div className="rounded-sm border border-success/30 bg-surface p-5">
          <span className="font-display text-sm uppercase text-success block mb-1">3. CRM Viewer</span>
          <p className="font-mono text-xs text-muted-foreground leading-relaxed">
            Can view and respond to incoming client leads, update pipeline statuses, and add internal producer notes.
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto rounded-sm border border-border bg-surface">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-border bg-section/60 text-muted-foreground">
              <th className="p-4 uppercase tracking-wider">Name</th>
              <th className="p-4 uppercase tracking-wider">Username</th>
              <th className="p-4 uppercase tracking-wider">Email</th>
              <th className="p-4 uppercase tracking-wider">Role</th>
              <th className="p-4 uppercase tracking-wider">Status</th>
              <th className="p-4 uppercase tracking-wider">Created</th>
              <th className="p-4 text-right uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {users.map((u) => (
              <tr key={u.id} className="group transition-colors hover:bg-section/40">
                <td className="p-4 font-display text-sm uppercase tracking-tight text-foreground">
                  {u.name}
                </td>
                <td className="p-4 text-gold font-bold">@{u.username}</td>
                <td className="p-4 text-muted-foreground">{u.email}</td>
                <td className="p-4">{roleBadge(u.role)}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[0.65rem] uppercase font-bold ${u.active !== false ? 'bg-success/15 text-success border border-success/30' : 'bg-red-500/15 text-red-400 border border-red-500/30'}`}>
                    {u.active !== false ? <UserCheck className="h-3 w-3" /> : <UserX className="h-3 w-3" />}
                    {u.active !== false ? 'Active' : 'Deactivated'}
                  </span>
                </td>
                <td className="p-4 text-muted-foreground">
                  {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenEdit(u)}
                      className="inline-flex items-center gap-1 rounded-sm border border-border px-3 py-1 text-[0.7rem] uppercase hover:border-gold hover:text-gold"
                    >
                      <Edit3 className="h-3 w-3" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(u.id, u.name)}
                      className="rounded-sm border border-border p-1.5 text-muted-foreground hover:border-red-500 hover:text-red-400"
                      title="Remove User"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingUser ? `Edit Studio Member: ${editingUser.name}` : 'Add Studio Member'}
      >
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-sm border border-border bg-section px-4 py-2.5 font-mono text-sm text-foreground focus:border-gold focus:outline-none transition-colors"
                placeholder="e.g., Director Denis"
              />
            </div>

            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Username / Login ID *
              </label>
              <input
                type="text"
                required
                disabled={!!editingUser}
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full rounded-sm border border-border bg-section px-4 py-2.5 font-mono text-sm text-foreground focus:border-gold focus:outline-none transition-colors disabled:opacity-50"
                placeholder="e.g., denis"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-sm border border-border bg-section px-4 py-2.5 font-mono text-sm text-foreground focus:border-gold focus:outline-none transition-colors"
                placeholder="director@movistro.com"
              />
            </div>

            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {editingUser ? 'New Password (Leave blank to keep)' : 'Security Passcode *'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required={!editingUser}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full rounded-sm border border-border bg-section px-4 py-2.5 font-mono text-sm text-foreground focus:border-gold focus:outline-none transition-colors"
                  placeholder={editingUser ? '••••••••' : 'Enter login passcode'}
                />
                <Key className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
          </div>

          <div>
            <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Studio RBAC Role *
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
              className="w-full rounded-sm border border-border bg-section px-4 py-2.5 font-mono text-sm text-foreground focus:border-gold focus:outline-none transition-colors cursor-pointer"
            >
              <option value="super_admin">Super Admin (Full Executive Control)</option>
              <option value="editor">Producer / Director (Projects & CRM)</option>
              <option value="viewer">CRM Viewer (Leads & Responses Only)</option>
            </select>
          </div>

          <div className="flex items-center gap-3 border-t border-border pt-4">
            <label className="flex items-center gap-2 cursor-pointer font-mono text-xs">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="h-4 w-4 rounded-sm border-border bg-section text-gold focus:ring-gold"
              />
              <span>Account Active (Can log into Studio OS)</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 border-t border-border pt-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="rounded-sm border border-border px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:border-gold hover:text-foreground"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-sm bg-gold px-8 py-2.5 font-mono text-xs uppercase tracking-widest text-background transition-all hover:bg-foreground hover:text-background shadow-[0_0_15px_rgba(212,166,79,0.3)]"
            >
              {editingUser ? 'Save Member' : 'Create Member'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
