"use client";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface AcademicYear {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  registrationStartDate: string;
  numTerms: number;
  status: "active" | "inactive";
  lockMethod: "flexible" | "inflexible";
  pendingMovements: number;
}

// ─── Seed data ────────────────────────────────────────────────────────────────
const seedData: AcademicYear[] = [
  {
    id: "1",
    name: "2024-2025",
    startDate: "2024-09-01",
    endDate: "2025-06-30",
    registrationStartDate: "2024-07-01",
    numTerms: 2,
    status: "active",
    lockMethod: "flexible",
    pendingMovements: 3,
  },
  {
    id: "2",
    name: "2023-2024",
    startDate: "2023-09-01",
    endDate: "2024-06-30",
    registrationStartDate: "2023-07-01",
    numTerms: 2,
    status: "inactive",
    lockMethod: "inflexible",
    pendingMovements: 0,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function buildYearName(yearFrom: string) {
  const n = parseInt(yearFrom, 10);
  if (yearFrom && n >= 1900 && n <= 2200) return `${n}-${n + 1}`;
  return "";
}

// ─── Custom Dropdown ──────────────────────────────────────────────────────────
interface DropdownOption {
  value: string;
  label: string;
}
interface DropdownProps {
  value: string;
  options: DropdownOption[];
  onChange: (v: string) => void;
  placeholder?: string;
  icon?: string;
}
function Dropdown({
  value,
  options,
  onChange,
  placeholder = "Select…",
  icon,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
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
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                    opt.value === value
                      ? "bg-lightprimary text-primary font-semibold"
                      : "text-ld hover:bg-lightgray dark:hover:bg-darkgray/20"
                  }`}
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

const inputClass =
  "w-full rounded-lg border border-border dark:border-darkborder bg-transparent px-4 py-2.5 text-sm text-ld placeholder:text-muted dark:placeholder:text-darklink focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary dark:bg-dark transition-colors";
const labelClass = "block text-sm font-medium text-ld mb-1.5";

// ─── Empty form state ─────────────────────────────────────────────────────────
const emptyForm = {
  yearFrom: "",
  startDate: "",
  endDate: "",
  registrationStartDate: "",
  numTerms: "2",
  status: "active" as "active" | "inactive",
  lockMethod: "flexible" as "flexible" | "inflexible",
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function AcademicYearPage() {
  const [years, setYears] = useState<AcademicYear[]>(seedData);
  const [view, setView] = useState<"list" | "add" | "edit">("list");
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [pendingModalId, setPendingModalId] = useState<string | null>(null);

  const yearName = buildYearName(form.yearFrom);
  const yearTo =
    form.yearFrom && parseInt(form.yearFrom, 10) >= 1900
      ? String(parseInt(form.yearFrom, 10) + 1)
      : "";

  // ── Derived: warn if active + inflexible year exists ────────────────────────
  const blockedByInflexible =
    view === "add" &&
    form.status === "active" &&
    years.some(
      (y) =>
        y.status === "active" &&
        y.lockMethod === "inflexible" &&
        y.pendingMovements > 0,
    );

  // ── Field change helper ──────────────────────────────────────────────────────
  const set = (field: keyof typeof emptyForm, value: string) =>
    setForm((p) => ({ ...p, [field]: value }));

  // ── Open Add ─────────────────────────────────────────────────────────────────
  const openAdd = () => {
    setForm(emptyForm);
    setEditId(null);
    setView("add");
  };

  // ── Open Edit ────────────────────────────────────────────────────────────────
  const openEdit = (year: AcademicYear) => {
    const [y1] = year.name.split("-");
    setForm({
      yearFrom: y1 ?? "",
      startDate: year.startDate,
      endDate: year.endDate,
      registrationStartDate: year.registrationStartDate,
      numTerms: String(year.numTerms),
      status: year.status,
      lockMethod: year.lockMethod,
    });
    setEditId(year.id);
    setView("edit");
  };

  // ── Save ─────────────────────────────────────────────────────────────────────
  const handleSave = () => {
    if (!yearName || !form.startDate || !form.endDate) return;
    if (view === "add") {
      setYears((p) => [
        ...p,
        {
          id: String(Date.now()),
          name: yearName,
          startDate: form.startDate,
          endDate: form.endDate,
          registrationStartDate: form.registrationStartDate,
          numTerms: Number(form.numTerms),
          status: form.status,
          lockMethod: form.lockMethod,
          pendingMovements: 0,
        },
      ]);
    } else if (editId) {
      setYears((p) =>
        p.map((y) =>
          y.id === editId
            ? {
                ...y,
                name: yearName,
                startDate: form.startDate,
                endDate: form.endDate,
                registrationStartDate: form.registrationStartDate,
                numTerms: Number(form.numTerms),
                status: form.status,
                lockMethod: form.lockMethod,
              }
            : y,
        ),
      );
    }
    setView("list");
  };

  // ── Delete ───────────────────────────────────────────────────────────────────
  const confirmDelete = () => {
    if (deleteId) setYears((p) => p.filter((y) => y.id !== deleteId));
    setDeleteId(null);
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // Pending Movements modal target
  const pendingYear = years.find((y) => y.id === pendingModalId);

  return (
    <div>
      {/* ── Page Header ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="h-11 w-11 rounded-xl bg-lightprimary flex items-center justify-center shrink-0">
            <Icon
              icon="tabler:calendar-stats"
              className="text-primary"
              height={24}
            />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-ld">
              Academic Year Settings
            </h1>
            <p className="text-sm text-muted dark:text-darklink mt-0.5">
              Manage academic years, terms, and registration dates
            </p>
          </div>
        </div>

        {view === "list" && (
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Icon icon="tabler:plus" height={17} />
            Add Academic Year
          </button>
        )}

        {(view === "add" || view === "edit") && (
          <button
            onClick={() => setView("list")}
            className="flex items-center gap-2 px-4 py-2.5 border border-border dark:border-darkborder rounded-lg text-sm font-medium text-link dark:text-darklink hover:bg-lightgray dark:hover:bg-darkgray/20 transition-colors"
          >
            <Icon icon="tabler:arrow-left" height={17} />
            Back to List
          </button>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* LIST VIEW                                                             */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {view === "list" && (
        <div className="bg-white dark:bg-dark rounded-xl shadow-sm border border-border dark:border-darkborder overflow-hidden">
          {years.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Icon
                icon="tabler:calendar-off"
                height={48}
                className="text-muted mb-4"
              />
              <p className="text-base font-semibold text-ld">
                No Academic Years Yet
              </p>
              <p className="text-sm text-muted dark:text-darklink mt-1 mb-5">
                Add your first academic year to get started.
              </p>
              <button
                onClick={openAdd}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <Icon icon="tabler:plus" height={16} />
                Add Academic Year
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border dark:border-darkborder bg-lightgray/50 dark:bg-darkgray/10">
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted uppercase tracking-wider whitespace-nowrap">
                      #
                    </th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted uppercase tracking-wider whitespace-nowrap">
                      Academic Year
                    </th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted uppercase tracking-wider whitespace-nowrap">
                      Start Date
                    </th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted uppercase tracking-wider whitespace-nowrap">
                      End Date
                    </th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted uppercase tracking-wider whitespace-nowrap">
                      Reg. Start
                    </th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted uppercase tracking-wider whitespace-nowrap">
                      Terms
                    </th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted uppercase tracking-wider whitespace-nowrap">
                      Status
                    </th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted uppercase tracking-wider whitespace-nowrap">
                      Lock Method
                    </th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted uppercase tracking-wider whitespace-nowrap">
                      Pending
                    </th>
                    <th className="text-right px-5 py-3.5 text-xs font-semibold text-muted uppercase tracking-wider whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border dark:divide-darkborder">
                  {years.map((year, idx) => (
                    <tr
                      key={year.id}
                      className="hover:bg-lightgray/30 dark:hover:bg-darkgray/10 transition-colors"
                    >
                      <td className="px-5 py-4 text-muted">{idx + 1}</td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="h-8 w-8 rounded-lg bg-lightprimary flex items-center justify-center shrink-0">
                            <Icon
                              icon="tabler:calendar"
                              className="text-primary"
                              height={15}
                            />
                          </div>
                          <span className="font-semibold text-ld">
                            {year.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-link dark:text-darklink whitespace-nowrap">
                        {year.startDate}
                      </td>
                      <td className="px-5 py-4 text-link dark:text-darklink whitespace-nowrap">
                        {year.endDate}
                      </td>
                      <td className="px-5 py-4 text-link dark:text-darklink whitespace-nowrap">
                        {year.registrationStartDate || "—"}
                      </td>
                      <td className="px-5 py-4 text-link dark:text-darklink">
                        {year.numTerms}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                            year.status === "active"
                              ? "bg-success/10 text-success"
                              : "bg-error/10 text-error"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${year.status === "active" ? "bg-success" : "bg-error"}`}
                          />
                          {year.status === "active" ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                            year.lockMethod === "flexible"
                              ? "bg-lightprimary text-primary"
                              : "bg-warning/10 text-warning"
                          }`}
                        >
                          <Icon
                            icon={
                              year.lockMethod === "flexible"
                                ? "tabler:lock-open"
                                : "tabler:lock"
                            }
                            height={11}
                          />
                          {year.lockMethod === "flexible"
                            ? "Flexible"
                            : "Inflexible"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <button
                          onClick={() => setPendingModalId(year.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                            year.pendingMovements > 0
                              ? "bg-warning/10 text-warning hover:bg-warning/20"
                              : "bg-lightgray dark:bg-darkgray/20 text-muted cursor-default"
                          }`}
                        >
                          <Icon icon="tabler:clock-pause" height={13} />
                          {year.pendingMovements > 0 ? (
                            <span>{year.pendingMovements} Pending</span>
                          ) : (
                            <span>None</span>
                          )}
                        </button>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openEdit(year)}
                            className="h-8 w-8 rounded-lg flex items-center justify-center text-muted hover:text-primary hover:bg-lightprimary transition-colors"
                            title="Edit"
                          >
                            <Icon icon="tabler:edit" height={16} />
                          </button>
                          <button
                            onClick={() => setDeleteId(year.id)}
                            className="h-8 w-8 rounded-lg flex items-center justify-center text-muted hover:text-error hover:bg-error/10 transition-colors"
                            title="Delete"
                          >
                            <Icon icon="tabler:trash" height={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* ADD / EDIT FORM                                                       */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {(view === "add" || view === "edit") && (
        <div className="bg-white dark:bg-dark rounded-xl shadow-sm border border-border dark:border-darkborder overflow-hidden">
          {/* Form header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-border dark:border-darkborder">
            <div className="h-9 w-9 rounded-lg bg-lightprimary flex items-center justify-center shrink-0">
              <Icon
                icon={
                  view === "add"
                    ? "tabler:calendar-plus"
                    : "tabler:calendar-edit"
                }
                className="text-primary"
                height={18}
              />
            </div>
            <div>
              <h2 className="text-base font-semibold text-ld">
                {view === "add"
                  ? "Add New Academic Year"
                  : `Edit Academic Year — ${years.find((y) => y.id === editId)?.name}`}
              </h2>
              <p className="text-xs text-muted dark:text-darklink">
                {view === "add"
                  ? "Fill in the fields below to create a new academic year."
                  : "Update the academic year details below."}
              </p>
            </div>
          </div>

          <div className="p-6 lg:p-8 space-y-7">
            {/* ── Academic Year Name ─────────────────────────────────────────── */}
            <div>
              <label className={labelClass}>
                Academic Year Name <span className="text-error">*</span>
              </label>
              <p className="text-xs text-muted dark:text-darklink mb-3">
                Select two consecutive years. The name is generated
                automatically.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-muted mb-1">
                    From Year
                  </label>
                  <div className="relative">
                    <Icon
                      icon="tabler:calendar-event"
                      height={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                    />
                    <input
                      type="number"
                      min={1900}
                      max={2200}
                      placeholder="e.g. 2025"
                      value={form.yearFrom}
                      onChange={(e) => set("yearFrom", e.target.value)}
                      className={`${inputClass} pl-9 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-muted mb-1">
                    To Year
                    <span className="ml-1.5 text-[10px] font-normal bg-lightprimary text-primary px-1.5 py-0.5 rounded-full">
                      Auto
                    </span>
                  </label>
                  <div className="relative">
                    <Icon
                      icon="tabler:calendar-event"
                      height={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                    />
                    <input
                      type="text"
                      readOnly
                      value={yearTo}
                      placeholder="Auto-calculated"
                      className={`${inputClass} pl-9 bg-lightgray/50 dark:bg-darkgray/10 cursor-not-allowed text-muted`}
                    />
                  </div>
                </div>
              </div>
              {yearName && (
                <div className="mt-3 flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-lightprimary/20 border border-primary/20">
                  <Icon
                    icon="tabler:check"
                    height={16}
                    className="text-primary shrink-0"
                  />
                  <span className="text-sm font-semibold text-primary">
                    Academic Year Name: {yearName}
                  </span>
                </div>
              )}
            </div>

            {/* ── Dates ──────────────────────────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={labelClass}>
                  Start Date <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <Icon
                    icon="tabler:calendar"
                    height={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                  />
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => set("startDate", e.target.value)}
                    className={`${inputClass} pl-9`}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>
                  End Date <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <Icon
                    icon="tabler:calendar"
                    height={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                  />
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) => set("endDate", e.target.value)}
                    className={`${inputClass} pl-9`}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Registration Start Date</label>
                <div className="relative">
                  <Icon
                    icon="tabler:calendar-check"
                    height={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                  />
                  <input
                    type="date"
                    value={form.registrationStartDate}
                    onChange={(e) =>
                      set("registrationStartDate", e.target.value)
                    }
                    className={`${inputClass} pl-9`}
                  />
                </div>
              </div>
            </div>

            {/* ── Terms & Status ─────────────────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Number of Academic Terms</label>
                <Dropdown
                  value={form.numTerms}
                  onChange={(v) => set("numTerms", v)}
                  icon="tabler:layers-intersect"
                  options={[
                    { value: "1", label: "1 Term" },
                    { value: "2", label: "2 Terms" },
                    { value: "3", label: "3 Terms" },
                    { value: "4", label: "4 Terms" },
                  ]}
                />
              </div>
              <div>
                <label className={labelClass}>Status</label>
                <div className="grid grid-cols-2 gap-3 mt-0.5">
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
                        className={`h-2 w-2 rounded-full shrink-0 ${
                          form.status === s
                            ? s === "active"
                              ? "bg-success"
                              : "bg-error"
                            : "bg-muted"
                        }`}
                      />
                      {s === "active" ? "Active" : "Inactive"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Lock Method ────────────────────────────────────────────────── */}
            <div>
              <label className={labelClass}>Lock Method</label>
              <p className="text-xs text-muted dark:text-darklink mb-3">
                If the current active year is <strong>Inflexible</strong> and
                has pending movements, the system will prevent adding a new
                active academic year.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(
                  [
                    {
                      value: "flexible",
                      label: "Flexible",
                      desc: "A new active year can be added even if movements are pending.",
                      icon: "tabler:lock-open",
                      color: "primary",
                    },
                    {
                      value: "inflexible",
                      label: "Inflexible",
                      desc: "Prevents adding a new active year while pending movements exist.",
                      icon: "tabler:lock",
                      color: "warning",
                    },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => set("lockMethod", opt.value)}
                    className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-colors ${
                      form.lockMethod === opt.value
                        ? opt.color === "primary"
                          ? "border-primary bg-lightprimary/20"
                          : "border-warning bg-warning/10"
                        : "border-border dark:border-darkborder hover:border-primary/40"
                    }`}
                  >
                    <div
                      className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        form.lockMethod === opt.value
                          ? opt.color === "primary"
                            ? "bg-primary text-white"
                            : "bg-warning text-white"
                          : "bg-lightgray dark:bg-darkgray/20 text-muted"
                      }`}
                    >
                      <Icon icon={opt.icon} height={18} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-ld">
                        {opt.label}
                      </p>
                      <p className="text-xs text-muted dark:text-darklink mt-0.5">
                        {opt.desc}
                      </p>
                    </div>
                    {form.lockMethod === opt.value && (
                      <Icon
                        icon="tabler:circle-check-filled"
                        height={18}
                        className={
                          opt.color === "primary"
                            ? "text-primary"
                            : "text-warning"
                        }
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Blocked Warning ────────────────────────────────────────────── */}
            {blockedByInflexible && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-error/10 border border-error/30">
                <Icon
                  icon="tabler:alert-triangle"
                  height={18}
                  className="text-error shrink-0 mt-0.5"
                />
                <p className="text-sm text-error">
                  Cannot add a new <strong>Active</strong> academic year. The
                  current active year uses an <strong>Inflexible</strong> lock
                  and has pending movements. Please resolve pending movements or
                  change the lock method first.
                </p>
              </div>
            )}

            {/* ── Form Actions ───────────────────────────────────────────────── */}
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
                disabled={
                  !yearName ||
                  !form.startDate ||
                  !form.endDate ||
                  blockedByInflexible
                }
                className="px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Icon icon="tabler:device-floppy" height={16} />
                {view === "add" ? "Save Academic Year" : "Update Academic Year"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* DELETE CONFIRM MODAL                                                  */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
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
                Delete Academic Year?
              </h3>
              <p className="text-sm text-muted dark:text-darklink">
                This action cannot be undone. All data related to{" "}
                <strong>{years.find((y) => y.id === deleteId)?.name}</strong>{" "}
                will be permanently removed.
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

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* PENDING MOVEMENTS MODAL                                               */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {pendingModalId && pendingYear && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setPendingModalId(null)}
          />
          <div className="relative bg-white dark:bg-dark rounded-2xl shadow-2xl border border-border dark:border-darkborder w-full max-w-md mx-4 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border dark:border-darkborder">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-warning/10 flex items-center justify-center shrink-0">
                  <Icon
                    icon="tabler:clock-pause"
                    className="text-warning"
                    height={18}
                  />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-ld">
                    Pending Movements
                  </h3>
                  <p className="text-xs text-muted dark:text-darklink">
                    {pendingYear.name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPendingModalId(null)}
                className="h-8 w-8 rounded-lg flex items-center justify-center text-muted hover:text-ld hover:bg-lightgray dark:hover:bg-darkgray/20 transition-colors"
              >
                <Icon icon="tabler:x" height={18} />
              </button>
            </div>
            <div className="px-6 py-5">
              {pendingYear.pendingMovements === 0 ? (
                <div className="flex flex-col items-center py-8 text-center gap-3">
                  <Icon
                    icon="tabler:circle-check"
                    height={40}
                    className="text-success"
                  />
                  <p className="text-sm font-semibold text-ld">
                    No Pending Movements
                  </p>
                  <p className="text-xs text-muted dark:text-darklink">
                    All movements for this academic year have been processed.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-warning/10 border border-warning/20">
                    <div className="flex items-center gap-3">
                      <Icon
                        icon="tabler:clock-pause"
                        height={20}
                        className="text-warning"
                      />
                      <div>
                        <p className="text-sm font-semibold text-ld">
                          Total Pending
                        </p>
                        <p className="text-xs text-muted dark:text-darklink mt-0.5">
                          Awaiting review or approval
                        </p>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-warning">
                      {pendingYear.pendingMovements}
                    </span>
                  </div>
                  <p className="text-xs text-muted dark:text-darklink">
                    Resolve all pending movements before locking or switching to
                    a new active year (if lock method is Inflexible).
                  </p>
                </div>
              )}
            </div>
            <div className="px-6 pb-5 flex justify-end">
              <button
                onClick={() => setPendingModalId(null)}
                className="px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
