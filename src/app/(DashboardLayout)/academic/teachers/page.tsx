"use client";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Teacher {
  id: string;
  nameEn: string;
  nameAr: string;
  employeeId: string;
  dateOfBirth: string;
  gender: "male" | "female";
  subjects: string[];
  phone: string;
  email: string;
  status: "active" | "inactive";
}

// ─── Seed data ────────────────────────────────────────────────────────────────
const seedTeachers: Teacher[] = [
  {
    id: "1",
    nameEn: "Dr. Layla Al-Amin",
    nameAr: "د. ليلى الأمين",
    employeeId: "EMP-0001",
    dateOfBirth: "1985-03-12",
    gender: "female",
    subjects: ["Mathematics", "Physics"],
    phone: "+966 50 100 0001",
    email: "layla@school.edu",
    status: "active",
  },
  {
    id: "2",
    nameEn: "Mr. Omar Khalil",
    nameAr: "أ. عمر خليل",
    employeeId: "EMP-0002",
    dateOfBirth: "1979-11-05",
    gender: "male",
    subjects: ["Arabic Language", "Islamic Studies"],
    phone: "+966 50 100 0002",
    email: "omar@school.edu",
    status: "active",
  },
  {
    id: "3",
    nameEn: "Ms. Rania Saeed",
    nameAr: "أ. رانيا سعيد",
    employeeId: "EMP-0003",
    dateOfBirth: "1990-07-20",
    gender: "female",
    subjects: ["English Language"],
    phone: "+966 50 100 0003",
    email: "rania@school.edu",
    status: "inactive",
  },
];

const allSubjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Arabic Language",
  "English Language",
  "Islamic Studies",
  "History",
  "Geography",
  "Computer Science",
  "Physical Education",
  "Art",
  "Music",
];

// ─── Styles ───────────────────────────────────────────────────────────────────
const inputClass =
  "w-full rounded-lg border border-border dark:border-darkborder bg-transparent px-4 py-2.5 text-sm text-ld placeholder:text-muted dark:placeholder:text-darklink focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary dark:bg-dark transition-colors";
const labelClass = "block text-sm font-medium text-ld mb-1.5";

// ─── Custom Dropdown ──────────────────────────────────────────────────────────
interface DropdownOption {
  value: string;
  label: string;
}
function Dropdown({
  value,
  options,
  onChange,
  placeholder = "Select…",
  icon,
}: {
  value: string;
  options: DropdownOption[];
  onChange: (v: string) => void;
  placeholder?: string;
  icon?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center gap-2 rounded-lg border border-border dark:border-darkborder bg-transparent px-4 py-2.5 text-sm transition-colors hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary dark:bg-dark"
      >
        {icon && (
          <Icon icon={icon} height={16} className="text-muted shrink-0" />
        )}
        <span
          className={`flex-1 text-left ${selected ? "text-ld" : "text-muted dark:text-darklink"}`}
        >
          {selected ? selected.label : placeholder}
        </span>
        <Icon
          icon="tabler:chevron-down"
          height={15}
          className={`text-muted shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white dark:bg-dark rounded-xl border border-border dark:border-darkborder shadow-xl overflow-hidden">
          <ul className="max-h-52 overflow-y-auto py-1">
            {options.map((opt) => (
              <li key={opt.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${opt.value === value ? "bg-lightprimary text-primary font-semibold" : "text-ld hover:bg-lightgray dark:hover:bg-darkgray/20"}`}
                >
                  <span>{opt.label}</span>
                  {opt.value === value && (
                    <Icon
                      icon="tabler:check"
                      height={14}
                      className="text-primary"
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─── Multi-Subject Picker ─────────────────────────────────────────────────────
function SubjectPicker({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (v: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const toggle = (s: string) =>
    onChange(
      selected.includes(s) ? selected.filter((x) => x !== s) : [...selected, s],
    );

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full min-h-[42px] flex flex-wrap items-center gap-1.5 rounded-lg border border-border dark:border-darkborder bg-transparent px-3 py-2 text-sm transition-colors hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary dark:bg-dark"
      >
        {selected.length === 0 ? (
          <span className="text-muted dark:text-darklink flex-1 text-left py-0.5">
            Select subjects…
          </span>
        ) : (
          selected.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-lightprimary text-primary text-xs font-semibold"
            >
              {s}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(s);
                }}
                className="hover:text-primary/60 transition-colors"
              >
                <Icon icon="tabler:x" height={10} />
              </button>
            </span>
          ))
        )}
        <Icon
          icon="tabler:chevron-down"
          height={15}
          className={`ml-auto text-muted shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white dark:bg-dark rounded-xl border border-border dark:border-darkborder shadow-xl overflow-hidden">
          <ul className="max-h-56 overflow-y-auto py-1">
            {allSubjects.map((subj) => {
              const checked = selected.includes(subj);
              return (
                <li key={subj}>
                  <button
                    type="button"
                    onClick={() => toggle(subj)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${checked ? "bg-lightprimary text-primary font-semibold" : "text-ld hover:bg-lightgray dark:hover:bg-darkgray/20"}`}
                  >
                    <span
                      className={`h-4 w-4 rounded border flex items-center justify-center shrink-0 transition-colors ${checked ? "bg-primary border-primary" : "border-border dark:border-darkborder"}`}
                    >
                      {checked && (
                        <Icon
                          icon="tabler:check"
                          height={10}
                          className="text-white"
                        />
                      )}
                    </span>
                    <span>{subj}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─── Name Modal ───────────────────────────────────────────────────────────────
function NameModal({
  onSave,
  onClose,
  initEn = "",
  initAr = "",
}: {
  onSave: (en: string, ar: string) => void;
  onClose: () => void;
  initEn?: string;
  initAr?: string;
}) {
  const [en, setEn] = useState(initEn);
  const [ar, setAr] = useState(initAr);
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white dark:bg-dark rounded-2xl shadow-2xl border border-border dark:border-darkborder w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border dark:border-darkborder">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-lightprimary flex items-center justify-center shrink-0">
              <Icon
                icon="tabler:language"
                className="text-primary"
                height={18}
              />
            </div>
            <div>
              <h3 className="text-base font-semibold text-ld">Teacher Name</h3>
              <p className="text-xs text-muted dark:text-darklink">
                Enter the name in both languages
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-lg flex items-center justify-center text-muted hover:text-ld hover:bg-lightgray dark:hover:bg-darkgray/20 transition-colors"
          >
            <Icon icon="tabler:x" height={18} />
          </button>
        </div>
        <div className="px-6 py-5 space-y-5">
          <div>
            <label className="block text-sm font-medium text-ld mb-1.5">
              <span className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center h-5 w-7 rounded text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                  EN
                </span>
                Name in English
              </span>
            </label>
            <input
              type="text"
              dir="ltr"
              placeholder="e.g. Dr. Layla Al-Amin"
              value={en}
              onChange={(e) => setEn(e.target.value)}
              className={inputClass}
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ld mb-1.5">
              <span className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center h-5 w-7 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                  AR
                </span>
                Name in Arabic
              </span>
            </label>
            <input
              type="text"
              dir="rtl"
              placeholder="مثال: د. ليلى الأمين"
              value={ar}
              onChange={(e) => setAr(e.target.value)}
              className={`${inputClass} text-right`}
            />
          </div>
          {(en || ar) && (
            <div className="rounded-lg bg-lightprimary/20 border border-primary/20 px-4 py-3">
              <p className="text-xs text-muted mb-1 font-medium">Preview</p>
              {en && (
                <p className="text-sm text-ld font-medium" dir="ltr">
                  {en}
                </p>
              )}
              {ar && (
                <p className="text-sm text-ld font-medium mt-0.5" dir="rtl">
                  {ar}
                </p>
              )}
            </div>
          )}
        </div>
        <div className="px-6 py-4 border-t border-border dark:border-darkborder flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-border dark:border-darkborder text-sm font-medium text-link dark:text-darklink hover:bg-lightgray dark:hover:bg-darkgray/20 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(en, ar)}
            disabled={!en && !ar}
            className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Icon icon="tabler:check" height={15} />
            Save Name
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Empty form ───────────────────────────────────────────────────────────────
const emptyForm = {
  nameEn: "",
  nameAr: "",
  employeeId: "",
  dateOfBirth: "",
  gender: "male" as "male" | "female",
  subjects: [] as string[],
  phone: "",
  email: "",
  status: "active" as "active" | "inactive",
};

function getInitials(nameEn: string, nameAr: string) {
  const name = nameEn || nameAr;
  const parts = name.trim().split(" ");
  return parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase();
}

const avatarColors = [
  "bg-violet-100 text-violet-700",
  "bg-teal-100 text-teal-700",
  "bg-orange-100 text-orange-700",
  "bg-sky-100 text-sky-700",
  "bg-rose-100 text-rose-700",
  "bg-lime-100 text-lime-700",
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>(seedTeachers);
  const [view, setView] = useState<"list" | "add" | "edit">("list");
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showNameModal, setShowNameModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const set = (k: keyof Omit<typeof emptyForm, "subjects">, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const filtered = teachers.filter((t) => {
    const q = search.toLowerCase();
    return (
      t.nameEn.toLowerCase().includes(q) ||
      t.nameAr.includes(q) ||
      t.employeeId.toLowerCase().includes(q) ||
      t.subjects.some((s) => s.toLowerCase().includes(q))
    );
  });

  const openAdd = () => {
    setForm(emptyForm);
    setEditId(null);
    setView("add");
  };
  const openEdit = (t: Teacher) => {
    setForm({
      nameEn: t.nameEn,
      nameAr: t.nameAr,
      employeeId: t.employeeId,
      dateOfBirth: t.dateOfBirth,
      gender: t.gender,
      subjects: t.subjects,
      phone: t.phone,
      email: t.email,
      status: t.status,
    });
    setEditId(t.id);
    setView("edit");
  };

  const handleSave = () => {
    if (!form.nameEn && !form.nameAr) return;
    if (view === "add") {
      const nextNum = String(teachers.length + 1).padStart(4, "0");
      setTeachers((p) => [
        ...p,
        {
          id: String(Date.now()),
          ...form,
          employeeId: form.employeeId || `EMP-${nextNum}`,
        },
      ]);
    } else if (editId) {
      setTeachers((p) =>
        p.map((t) => (t.id === editId ? { ...t, ...form } : t)),
      );
    }
    setView("list");
  };

  const confirmDelete = () => {
    if (deleteId) setTeachers((p) => p.filter((t) => t.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="h-11 w-11 rounded-xl bg-lightprimary flex items-center justify-center shrink-0">
            <Icon
              icon="tabler:chalkboard"
              className="text-primary"
              height={24}
            />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-ld">Teachers</h1>
            <p className="text-sm text-muted dark:text-darklink mt-0.5">
              Manage teacher records and subject assignments
            </p>
          </div>
        </div>
        {view === "list" ? (
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Icon icon="tabler:plus" height={17} />
            Add Teacher
          </button>
        ) : (
          <button
            onClick={() => setView("list")}
            className="flex items-center gap-2 px-4 py-2.5 border border-border dark:border-darkborder rounded-lg text-sm font-medium text-link dark:text-darklink hover:bg-lightgray dark:hover:bg-darkgray/20 transition-colors"
          >
            <Icon icon="tabler:arrow-left" height={17} />
            Back to List
          </button>
        )}
      </div>

      {/* ── LIST ── */}
      {view === "list" && (
        <div className="bg-white dark:bg-dark rounded-xl shadow-sm border border-border dark:border-darkborder overflow-hidden">
          <div className="px-5 py-4 border-b border-border dark:border-darkborder flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Icon
                icon="tabler:search"
                height={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search by name, ID or subject…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`${inputClass} pl-9`}
              />
            </div>
            <span className="text-sm text-muted">
              {filtered.length} teacher{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Icon
                icon="tabler:chalkboard-off"
                height={48}
                className="text-muted mb-4"
              />
              <p className="text-base font-semibold text-ld">
                {search ? "No teachers match your search" : "No Teachers Yet"}
              </p>
              <p className="text-sm text-muted dark:text-darklink mt-1 mb-5">
                {search
                  ? "Try a different keyword."
                  : "Add your first teacher to get started."}
              </p>
              {!search && (
                <button
                  onClick={openAdd}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <Icon icon="tabler:plus" height={16} />
                  Add Teacher
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border dark:border-darkborder bg-lightgray/50 dark:bg-darkgray/10">
                    {[
                      "#",
                      "Teacher",
                      "Employee ID",
                      "Subjects",
                      "Phone",
                      "Email",
                      "Status",
                      "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        className={`px-5 py-3.5 text-xs font-semibold text-muted uppercase tracking-wider whitespace-nowrap ${h === "Actions" ? "text-right" : "text-left"}`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border dark:divide-darkborder">
                  {filtered.map((t, idx) => {
                    const color = avatarColors[idx % avatarColors.length];
                    return (
                      <tr
                        key={t.id}
                        className="hover:bg-lightgray/30 dark:hover:bg-darkgray/10 transition-colors"
                      >
                        <td className="px-5 py-4 text-muted">{idx + 1}</td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 text-sm font-bold ${color}`}
                            >
                              {getInitials(t.nameEn, t.nameAr)}
                            </div>
                            <div>
                              <p className="font-semibold text-ld">
                                {t.nameEn || t.nameAr}
                              </p>
                              {t.nameAr && t.nameEn && (
                                <p className="text-xs text-muted" dir="rtl">
                                  {t.nameAr}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-link dark:text-darklink font-mono text-xs">
                          {t.employeeId}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex flex-wrap gap-1">
                            {t.subjects.map((s) => (
                              <span
                                key={s}
                                className="px-2 py-0.5 rounded-full bg-lightprimary text-primary text-xs font-semibold whitespace-nowrap"
                              >
                                {s}
                              </span>
                            ))}
                            {t.subjects.length === 0 && (
                              <span className="text-muted">—</span>
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-4 text-link dark:text-darklink whitespace-nowrap">
                          {t.phone || "—"}
                        </td>
                        <td className="px-5 py-4 text-link dark:text-darklink">
                          {t.email || "—"}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${t.status === "active" ? "bg-success/10 text-success" : "bg-error/10 text-error"}`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${t.status === "active" ? "bg-success" : "bg-error"}`}
                            />
                            {t.status === "active" ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => openEdit(t)}
                              className="h-8 w-8 rounded-lg flex items-center justify-center text-muted hover:text-primary hover:bg-lightprimary transition-colors"
                              title="Edit"
                            >
                              <Icon icon="tabler:edit" height={16} />
                            </button>
                            <button
                              onClick={() => setDeleteId(t.id)}
                              className="h-8 w-8 rounded-lg flex items-center justify-center text-muted hover:text-error hover:bg-error/10 transition-colors"
                              title="Delete"
                            >
                              <Icon icon="tabler:trash" height={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ── ADD / EDIT FORM ── */}
      {(view === "add" || view === "edit") && (
        <div className="bg-white dark:bg-dark rounded-xl shadow-sm border border-border dark:border-darkborder overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-border dark:border-darkborder">
            <div className="h-9 w-9 rounded-lg bg-lightprimary flex items-center justify-center shrink-0">
              <Icon
                icon={view === "add" ? "tabler:user-plus" : "tabler:user-edit"}
                className="text-primary"
                height={18}
              />
            </div>
            <div>
              <h2 className="text-base font-semibold text-ld">
                {view === "add" ? "Add New Teacher" : "Edit Teacher"}
              </h2>
              <p className="text-xs text-muted dark:text-darklink">
                {view === "add"
                  ? "Fill in the details to register a new teacher."
                  : "Update the teacher's information."}
              </p>
            </div>
          </div>

          <div className="p-6 lg:p-8 space-y-6">
            {/* Teacher Name */}
            <div>
              <label className={labelClass}>
                Teacher Name <span className="text-error">*</span>
              </label>
              <button
                type="button"
                onClick={() => setShowNameModal(true)}
                className={`${inputClass} text-left flex items-center justify-between group`}
              >
                <span
                  className={
                    form.nameEn || form.nameAr
                      ? "text-ld"
                      : "text-muted dark:text-darklink"
                  }
                >
                  {form.nameEn && form.nameAr
                    ? `${form.nameEn} / ${form.nameAr}`
                    : form.nameEn ||
                      form.nameAr ||
                      "Click to enter teacher name (EN / AR)"}
                </span>
                <Icon
                  icon="tabler:language"
                  height={16}
                  className="text-muted group-hover:text-primary shrink-0 ml-2 transition-colors"
                />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Employee ID */}
              <div>
                <label className={labelClass}>Employee ID</label>
                <input
                  type="text"
                  placeholder="e.g. EMP-0001 (auto if empty)"
                  value={form.employeeId}
                  onChange={(e) => set("employeeId", e.target.value)}
                  className={inputClass}
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className={labelClass}>Date of Birth</label>
                <div className="relative">
                  <Icon
                    icon="tabler:calendar"
                    height={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                  />
                  <input
                    type="date"
                    value={form.dateOfBirth}
                    onChange={(e) => set("dateOfBirth", e.target.value)}
                    className={`${inputClass} pl-9`}
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className={labelClass}>Gender</label>
                <div className="grid grid-cols-2 gap-3">
                  {(["male", "female"] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => set("gender", g)}
                      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                        form.gender === g
                          ? g === "male"
                            ? "border-blue-400 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                            : "border-pink-400 bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300"
                          : "border-border dark:border-darkborder text-link dark:text-darklink hover:border-primary/40"
                      }`}
                    >
                      <Icon
                        icon={
                          g === "male"
                            ? "tabler:gender-male"
                            : "tabler:gender-female"
                        }
                        height={16}
                      />
                      {g === "male" ? "Male" : "Female"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className={labelClass}>Phone Number</label>
                <div className="relative">
                  <Icon
                    icon="tabler:phone"
                    height={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                  />
                  <input
                    type="tel"
                    placeholder="+1 000 000 0000"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    className={`${inputClass} pl-9`}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className={labelClass}>Email Address</label>
                <div className="relative">
                  <Icon
                    icon="tabler:mail"
                    height={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                  />
                  <input
                    type="email"
                    placeholder="teacher@school.edu"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className={`${inputClass} pl-9`}
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className={labelClass}>Status</label>
                <div className="grid grid-cols-2 gap-3">
                  {(["active", "inactive"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => set("status", s)}
                      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                        form.status === s
                          ? s === "active"
                            ? "border-success bg-success/10 text-success"
                            : "border-error bg-error/10 text-error"
                          : "border-border dark:border-darkborder text-link dark:text-darklink hover:border-primary/40"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full shrink-0 ${form.status === s ? (s === "active" ? "bg-success" : "bg-error") : "bg-muted"}`}
                      />
                      {s === "active" ? "Active" : "Inactive"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Subjects */}
            <div>
              <label className={labelClass}>Subjects Taught</label>
              <p className="text-xs text-muted dark:text-darklink mb-2">
                Select one or more subjects this teacher is qualified to teach.
              </p>
              <SubjectPicker
                selected={form.subjects}
                onChange={(v) => setForm((p) => ({ ...p, subjects: v }))}
              />
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-border dark:border-darkborder flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setView("list")}
                className="px-5 py-2.5 rounded-lg border border-border dark:border-darkborder text-sm font-medium text-link dark:text-darklink hover:bg-lightgray dark:hover:bg-darkgray/20 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={!form.nameEn && !form.nameAr}
                className="px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Icon icon="tabler:device-floppy" height={16} />
                {view === "add" ? "Save Teacher" : "Update Teacher"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Name Modal ── */}
      {showNameModal && (
        <NameModal
          initEn={form.nameEn}
          initAr={form.nameAr}
          onSave={(en, ar) => {
            setForm((p) => ({ ...p, nameEn: en, nameAr: ar }));
            setShowNameModal(false);
          }}
          onClose={() => setShowNameModal(false)}
        />
      )}

      {/* ── Delete Confirm ── */}
      {deleteId && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setDeleteId(null)}
          />
          <div className="relative bg-white dark:bg-dark rounded-2xl shadow-2xl border border-border dark:border-darkborder w-full max-w-sm mx-4 p-6">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="h-14 w-14 rounded-full bg-error/10 flex items-center justify-center">
                <Icon icon="tabler:trash" height={26} className="text-error" />
              </div>
              <h3 className="text-base font-semibold text-ld">
                Delete Teacher?
              </h3>
              <p className="text-sm text-muted dark:text-darklink">
                This will permanently remove{" "}
                <strong>
                  {teachers.find((t) => t.id === deleteId)?.nameEn ||
                    teachers.find((t) => t.id === deleteId)?.nameAr}
                </strong>{" "}
                and all related data.
              </p>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 px-4 py-2.5 rounded-lg border border-border dark:border-darkborder text-sm font-medium text-link dark:text-darklink hover:bg-lightgray dark:hover:bg-darkgray/20 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 rounded-lg bg-error text-white text-sm font-medium hover:bg-error/90 transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
