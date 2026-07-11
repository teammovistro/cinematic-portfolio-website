'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ProjectItem } from '@/lib/db'
import { Modal } from '@/components/admin/modal'
import { useToast } from '../layout'
import { 
  Plus, 
  Edit3, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Search, 
  LayoutGrid, 
  List, 
  Eye, 
  EyeOff,
  Sparkles,
  Image as ImageIcon
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function ProjectsManager() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { showToast } = useToast()
  const [projects, setProjects] = useState<ProjectItem[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    category: 'Short Film',
    year: new Date().getFullYear().toString(),
    img: '/images/reel.png',
    description: '',
    active: true,
    featured: true,
  })

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects')
      const data = await res.json()
      setProjects(data || [])
    } catch (error) {
      showToast('Failed to load portfolio projects', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
    if (searchParams.get('action') === 'new') {
      handleOpenNew()
    }
  }, [searchParams])

  const handleOpenNew = () => {
    setEditingProject(null)
    setFormData({
      title: '',
      category: 'Short Film',
      year: new Date().getFullYear().toString(),
      img: '/images/reel.png',
      description: '',
      active: true,
      featured: true,
    })
    setIsModalOpen(true)
  }

  const handleOpenEdit = (project: ProjectItem) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      category: project.category,
      year: project.year,
      img: project.img,
      description: project.description,
      active: project.active !== undefined ? project.active : true,
      featured: project.featured !== undefined ? project.featured : true,
    })
    setIsModalOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingProject) {
        // Update
        const res = await fetch('/api/projects', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingProject.id, ...formData }),
        })
        if (res.ok) {
          const updated = await res.json()
          setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
          showToast(`Updated "${formData.title}" successfully!`)
        }
      } else {
        // Create
        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        if (res.ok) {
          const created = await res.json()
          setProjects((prev) => [created, ...prev])
          showToast(`Added "${formData.title}" to portfolio!`)
        }
      }
      setIsModalOpen(false)
      if (searchParams.get('action') === 'new') {
        router.replace('/admin/projects')
      }
    } catch (error) {
      showToast('Error saving project', 'error')
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This will remove it from the 3D world experience.`)) return
    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id))
        showToast(`Deleted "${title}" from portfolio`)
      }
    } catch (error) {
      showToast('Failed to delete project', 'error')
    }
  }

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= projects.length) return

    const newProjects = [...projects]
    const [moved] = newProjects.splice(index, 1)
    newProjects.splice(targetIndex, 0, moved)

    setProjects(newProjects)
    try {
      await fetch('/api/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProjects),
      })
      showToast('Project sequence updated')
    } catch (error) {
      showToast('Failed to update sequence', 'error')
    }
  }

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))]

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCat = categoryFilter === 'All' || p.category === categoryFilter
    return matchesSearch && matchesCat
  })

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Top Header Controls */}
      <div className="flex flex-col justify-between gap-4 border-b border-border pb-6 md:flex-row md:items-center">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-gold">
            Portfolio Management
          </span>
          <h2 className="mt-1 font-display text-2xl uppercase tracking-tight text-foreground md:text-3xl">
            3D World Projects ({projects.length})
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex rounded-sm border border-border bg-section p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`rounded-sm p-1.5 transition-colors ${viewMode === 'grid' ? 'bg-gold text-background' : 'text-muted-foreground hover:text-foreground'}`}
              title="Grid View"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`rounded-sm p-1.5 transition-colors ${viewMode === 'table' ? 'bg-gold text-background' : 'text-muted-foreground hover:text-foreground'}`}
              title="List / Table View"
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={handleOpenNew}
            className="flex items-center gap-2 rounded-sm bg-gold px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-background transition-all hover:bg-foreground hover:text-background shadow-[0_0_15px_rgba(212,166,79,0.3)]"
          >
            <Plus className="h-4 w-4" />
            Add Cinematic Project
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`rounded-sm px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-all ${
                categoryFilter === cat
                  ? 'bg-gold/20 border border-gold text-gold font-bold shadow-[inset_0_0_10px_rgba(212,166,79,0.15)]'
                  : 'border border-border bg-surface text-muted-foreground hover:border-gold/50 hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-sm border border-border bg-surface py-2 pl-9 pr-4 font-mono text-xs text-foreground placeholder-muted-foreground focus:border-gold focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-sm border border-border bg-surface transition-all hover:border-gold/60 hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            >
              {/* Image Preview */}
              <div className="relative aspect-video w-full overflow-hidden bg-section">
                {/* Fallback pattern or image */}
                <div className="absolute inset-0 flex items-center justify-center bg-section text-muted-foreground">
                  <ImageIcon className="h-8 w-8 opacity-20" />
                </div>
                {/* Order Badge */}
                <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-sm border border-background/60 bg-background/80 px-2 py-1 font-mono text-[0.65rem] uppercase text-gold backdrop-blur-md">
                  <span>Seq #{idx + 1}</span>
                </div>
                {/* Active / Hidden badge */}
                {!project.active && (
                  <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-sm border border-red-500/50 bg-red-950/80 px-2 py-1 font-mono text-[0.65rem] uppercase text-red-300">
                    <EyeOff className="h-3 w-3" /> Hidden
                  </div>
                )}
                {/* Simulated cinematic gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-widest text-gold mb-1">
                    <span>{project.category}</span>
                    <span className="text-muted-foreground">{project.year}</span>
                  </div>
                  <h3 className="font-display text-lg uppercase tracking-tight text-foreground group-hover:text-gold transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 font-mono text-xs text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Controls */}
                <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-4">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleMove(idx, 'up')}
                      disabled={idx === 0}
                      className="rounded-sm border border-border bg-section p-1.5 text-muted-foreground transition-colors hover:border-gold hover:text-foreground disabled:opacity-30"
                      title="Move Earlier in 3D World"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleMove(idx, 'down')}
                      disabled={idx === projects.length - 1}
                      className="rounded-sm border border-border bg-section p-1.5 text-muted-foreground transition-colors hover:border-gold hover:text-foreground disabled:opacity-30"
                      title="Move Later in 3D World"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(project)}
                      className="flex items-center gap-1 rounded-sm border border-border bg-section px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-wider text-foreground transition-all hover:border-gold hover:text-gold"
                    >
                      <Edit3 className="h-3 w-3" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project.id, project.title)}
                      className="rounded-sm border border-border bg-section p-1.5 text-muted-foreground transition-colors hover:border-red-500 hover:bg-red-500/10 hover:text-red-400"
                      title="Delete Project"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="overflow-x-auto rounded-sm border border-border bg-surface">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-border bg-section/60 text-muted-foreground">
                <th className="p-4 uppercase tracking-wider">Seq</th>
                <th className="p-4 uppercase tracking-wider">Title</th>
                <th className="p-4 uppercase tracking-wider">Category</th>
                <th className="p-4 uppercase tracking-wider">Year</th>
                <th className="p-4 uppercase tracking-wider">Description</th>
                <th className="p-4 uppercase tracking-wider">Status</th>
                <th className="p-4 text-right uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filteredProjects.map((project, idx) => (
                <tr key={project.id} className="group transition-colors hover:bg-section/40">
                  <td className="p-4 font-bold text-gold">#{idx + 1}</td>
                  <td className="p-4 font-display text-sm uppercase tracking-tight text-foreground group-hover:text-gold">
                    {project.title}
                  </td>
                  <td className="p-4 capitalize text-muted-foreground">{project.category}</td>
                  <td className="p-4 text-muted-foreground">{project.year}</td>
                  <td className="p-4 max-w-xs truncate text-muted-foreground">{project.description}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.65rem] uppercase ${project.active !== false ? 'bg-success/15 text-success border border-success/30' : 'bg-red-500/15 text-red-400 border border-red-500/30'}`}>
                      {project.active !== false ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleMove(idx, 'up')}
                        disabled={idx === 0}
                        className="rounded-sm border border-border p-1 text-muted-foreground hover:border-gold hover:text-foreground disabled:opacity-20"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleMove(idx, 'down')}
                        disabled={idx === projects.length - 1}
                        className="rounded-sm border border-border p-1 text-muted-foreground hover:border-gold hover:text-foreground disabled:opacity-20"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(project)}
                        className="rounded-sm border border-border px-2.5 py-1 text-[0.7rem] uppercase hover:border-gold hover:text-gold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project.id, project.title)}
                        className="rounded-sm border border-border p-1 text-muted-foreground hover:border-red-500 hover:text-red-400"
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
      )}

      {/* Add / Edit Project Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? `Edit Project: ${editingProject.title}` : 'Add Cinematic Project'}
      >
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full rounded-sm border border-border bg-section px-4 py-2.5 font-mono text-sm text-foreground focus:border-gold focus:outline-none transition-colors"
                placeholder="e.g., Nocturne"
              />
            </div>

            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full rounded-sm border border-border bg-section px-4 py-2.5 font-mono text-sm text-foreground focus:border-gold focus:outline-none transition-colors cursor-pointer"
              >
                <option value="Short Film">Short Film</option>
                <option value="Automotive">Automotive</option>
                <option value="Fashion Film">Fashion Film</option>
                <option value="Documentary">Documentary</option>
                <option value="Music Video">Music Video</option>
                <option value="Aerial">Aerial</option>
                <option value="Behind The Scenes">Behind The Scenes</option>
                <option value="Editorial">Editorial</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Release Year *
              </label>
              <input
                type="text"
                required
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full rounded-sm border border-border bg-section px-4 py-2.5 font-mono text-sm text-foreground focus:border-gold focus:outline-none transition-colors"
                placeholder="e.g., 2026"
              />
            </div>

            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Image Asset Path *
              </label>
              <input
                type="text"
                required
                value={formData.img}
                onChange={(e) => setFormData({ ...formData, img: e.target.value })}
                className="w-full rounded-sm border border-border bg-section px-4 py-2.5 font-mono text-sm text-foreground focus:border-gold focus:outline-none transition-colors"
                placeholder="e.g., /images/reel.png"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Cinematic Story & Description *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-sm border border-border bg-section px-4 py-3 font-mono text-sm text-foreground placeholder-muted-foreground focus:border-gold focus:outline-none transition-colors"
              placeholder="Describe the lighting, lenses, mood, and narrative..."
            />
          </div>

          <div className="flex items-center gap-6 border-t border-border pt-4">
            <label className="flex items-center gap-2 cursor-pointer font-mono text-xs">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="h-4 w-4 rounded-sm border-border bg-section text-gold focus:ring-gold"
              />
              <span>Active in 3D World</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-mono text-xs">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="h-4 w-4 rounded-sm border-border bg-section text-gold focus:ring-gold"
              />
              <span>Featured Showcase</span>
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
              {editingProject ? 'Save Changes' : 'Create Project'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
