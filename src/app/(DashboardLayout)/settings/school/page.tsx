"use client";
import { Icon } from "@iconify/react";
import { useState } from "react";

const timezones = [
  "UTC",
  "UTC+1 (West Africa)",
  "UTC+2 (Central Africa)",
  "UTC+3 (Arabia Standard)",
  "UTC+4 (Gulf Standard)",
  "UTC+5 (Pakistan)",
  "UTC+5:30 (India)",
  "UTC+8 (China)",
  "UTC+9 (Japan)",
  "UTC-5 (Eastern)",
  "UTC-8 (Pacific)",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Asia/Dubai",
  "Asia/Riyadh",
  "Asia/Kuwait",
  "Asia/Qatar",
];

const currencies = [
  { code: "USD", label: "USD – US Dollar" },
  { code: "EUR", label: "EUR – Euro" },
  { code: "GBP", label: "GBP – British Pound" },
  { code: "SAR", label: "SAR – Saudi Riyal" },
  { code: "AED", label: "AED – UAE Dirham" },
  { code: "KWD", label: "KWD – Kuwaiti Dinar" },
  { code: "QAR", label: "QAR – Qatari Riyal" },
  { code: "BHD", label: "BHD – Bahraini Dinar" },
  { code: "OMR", label: "OMR – Omani Rial" },
  { code: "EGP", label: "EGP – Egyptian Pound" },
  { code: "JOD", label: "JOD – Jordanian Dinar" },
];

const countries = [
  "Saudi Arabia",
  "United Arab Emirates",
  "Kuwait",
  "Qatar",
  "Bahrain",
  "Oman",
  "Egypt",
  "Jordan",
  "Lebanon",
  "Morocco",
  "Tunisia",
  "Libya",
  "Algeria",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
];

const inputClass =
  "w-full rounded-lg border border-border dark:border-darkborder bg-transparent px-4 py-2.5 text-sm text-ld placeholder:text-muted dark:placeholder:text-darklink focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary dark:bg-dark transition-colors";

const labelClass = "block text-sm font-medium text-ld mb-1.5";

export default function SchoolSettingsPage() {
  const [activeTab, setActiveTab] = useState("basic");
  const [allowBranches, setAllowBranches] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [schoolNameEn, setSchoolNameEn] = useState("");
  const [schoolNameAr, setSchoolNameAr] = useState("");
  const [tempNameEn, setTempNameEn] = useState("");
  const [tempNameAr, setTempNameAr] = useState("");

  const openNameModal = () => {
    setTempNameEn(schoolNameEn);
    setTempNameAr(schoolNameAr);
    setShowNameModal(true);
  };

  const saveNameModal = () => {
    setSchoolNameEn(tempNameEn);
    setSchoolNameAr(tempNameAr);
    setShowNameModal(false);
  };

  const [invoiceOptions, setInvoiceOptions] = useState({
    multiCurrency: false,
    logoOnInvoices: true,
    addressOnInvoices: true,
  });

  const tabs = [
    { id: "basic", label: "Basic Settings", icon: "tabler:settings-2" },
    { id: "contact", label: "Contact Information", icon: "tabler:map-pin" },
    {
      id: "financial",
      label: "Financial Settings",
      icon: "tabler:currency-dollar",
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="h-11 w-11 rounded-xl bg-lightprimary flex items-center justify-center shrink-0">
          <Icon icon="tabler:school" className="text-primary" height={24} />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-ld">School Settings</h1>
          <p className="text-sm text-muted dark:text-darklink mt-0.5">
            Manage your school's basic, contact, and financial information
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-dark rounded-xl shadow-sm border border-border dark:border-darkborder overflow-hidden">
        {/* Tab Navigation */}
        <div className="flex border-b border-border dark:border-darkborder overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab.id
                  ? "text-primary border-primary bg-lightprimary/30"
                  : "text-link dark:text-darklink border-transparent hover:text-primary hover:border-primary/40"
              }`}
            >
              <Icon icon={tab.icon} height={17} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 lg:p-8">
          {/* ──────────────── BASIC SETTINGS ──────────────── */}
          {activeTab === "basic" && (
            <div className="space-y-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* School Name */}
                <div className="md:col-span-2">
                  <label className={labelClass}>
                    School Name <span className="text-error">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={openNameModal}
                    className={`${inputClass} text-left flex items-center justify-between group`}
                  >
                    <span
                      className={
                        schoolNameEn || schoolNameAr
                          ? "text-ld"
                          : "text-muted dark:text-darklink"
                      }
                    >
                      {schoolNameEn && schoolNameAr
                        ? `${schoolNameEn} / ${schoolNameAr}`
                        : schoolNameEn ||
                          schoolNameAr ||
                          "Click to enter school name (EN / AR)"}
                    </span>
                    <Icon
                      icon="tabler:language"
                      height={16}
                      className="text-muted group-hover:text-primary shrink-0 ml-2 transition-colors"
                    />
                  </button>
                </div>

                {/* School Logo */}
                <div>
                  <label className={labelClass}>School Logo</label>
                  <p className="text-xs text-muted dark:text-darklink mb-2">
                    Will appear on invoices and throughout the system.
                  </p>
                  <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-border dark:border-darkborder rounded-xl cursor-pointer hover:border-primary hover:bg-lightprimary/20 transition-colors group">
                    <Icon
                      icon="tabler:upload"
                      height={26}
                      className="text-muted group-hover:text-primary mb-2 transition-colors"
                    />
                    <span className="text-sm text-muted group-hover:text-primary transition-colors font-medium">
                      Click to upload logo
                    </span>
                    <span className="text-xs text-muted mt-1">
                      PNG, JPG — max 2 MB
                    </span>
                    <input type="file" accept="image/*" className="hidden" />
                  </label>
                </div>

                {/* Year Founded */}
                <div>
                  <label className={labelClass}>Year Founded</label>
                  <input
                    type="number"
                    placeholder="e.g. 2005"
                    min="1900"
                    max={new Date().getFullYear()}
                    className={inputClass}
                  />
                </div>

                {/* Commercial License */}
                <div>
                  <label className={labelClass}>Commercial License No.</label>
                  <input
                    type="text"
                    placeholder="Enter commercial license number"
                    className={inputClass}
                  />
                </div>

                {/* Educational License */}
                <div>
                  <label className={labelClass}>Educational License No.</label>
                  <input
                    type="text"
                    placeholder="Enter educational license number"
                    className={inputClass}
                  />
                </div>

                {/* Time Zone */}
                <div>
                  <label className={labelClass}>
                    Time Zone <span className="text-error">*</span>
                  </label>
                  <select className={inputClass}>
                    <option value="">Select time zone</option>
                    {timezones.map((tz) => (
                      <option key={tz} value={tz}>
                        {tz}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Default Language */}
                <div>
                  <label className={labelClass}>
                    Default System Language{" "}
                    <span className="text-error">*</span>
                  </label>
                  <select className={inputClass}>
                    <option value="en">English</option>
                    <option value="ar">Arabic</option>
                  </select>
                </div>
              </div>

              {/* Allow Branches Toggle */}
              <div className="rounded-xl border border-border dark:border-darkborder overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4">
                  <div>
                    <h4 className="text-sm font-semibold text-ld">
                      Allow Branches
                    </h4>
                    <p className="text-xs text-muted dark:text-darklink mt-0.5">
                      If enabled, a scheduling table will be created
                      automatically for managing branches.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAllowBranches(!allowBranches)}
                    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none ${
                      allowBranches
                        ? "bg-primary"
                        : "bg-bordergray dark:bg-darkborder"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
                        allowBranches ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {allowBranches && (
                  <div className="px-5 pb-5 border-t border-border dark:border-darkborder pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm font-semibold text-ld">Branches</p>
                      <button
                        type="button"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors"
                      >
                        <Icon icon="tabler:plus" height={14} />
                        Add Branch
                      </button>
                    </div>

                    {/* Empty State */}
                    <div className="text-center py-8 bg-lightgray dark:bg-darkgray/10 rounded-lg mb-5">
                      <Icon
                        icon="tabler:building-bank"
                        height={32}
                        className="text-muted mx-auto mb-2"
                      />
                      <p className="text-sm text-muted dark:text-darklink">
                        No branches added yet.
                      </p>
                      <p className="text-xs text-muted dark:text-darklink mt-1">
                        Click "Add Branch" to get started.
                      </p>
                    </div>

                    {/* Branch Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>
                          Branch Name <span className="text-error">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Arabic / English"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Branch Code</label>
                        <input
                          type="text"
                          placeholder="e.g. BR-001"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>
                          Branch Type <span className="text-error">*</span>
                        </label>
                        <select className={inputClass}>
                          <option value="main">Main</option>
                          <option value="branch">Branch</option>
                        </select>
                        <p className="text-xs text-muted mt-1">
                          Only one main branch is allowed.
                        </p>
                      </div>
                      <div>
                        <label className={labelClass}>
                          Opening Date <span className="text-error">*</span>
                        </label>
                        <input type="date" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Status</label>
                        <select className={inputClass}>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                        <p className="text-xs text-muted mt-1">
                          Cannot deactivate if branch has related data.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className={labelClass}>School Description</label>
                <p className="text-xs text-muted dark:text-darklink mb-2">
                  Useful for the school website and public-facing pages.
                </p>
                <textarea
                  rows={4}
                  placeholder="Enter a brief description about the school..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Official Documents */}
              <div>
                <label className={labelClass}>Official Documents</label>
                <p className="text-xs text-muted dark:text-darklink mb-2">
                  School's official files and certificates.
                </p>
                <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-border dark:border-darkborder rounded-xl cursor-pointer hover:border-primary hover:bg-lightprimary/20 transition-colors group">
                  <Icon
                    icon="tabler:file-upload"
                    height={24}
                    className="text-muted group-hover:text-primary mb-1.5 transition-colors"
                  />
                  <span className="text-sm text-muted group-hover:text-primary font-medium transition-colors">
                    Click to upload documents
                  </span>
                  <span className="text-xs text-muted mt-0.5">
                    PDF, DOC, PNG — max 10 MB each
                  </span>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}

          {/* ──────────────── CONTACT INFORMATION ──────────────── */}
          {activeTab === "contact" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Country</label>
                <select className={inputClass}>
                  <option value="">Select country</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>City</label>
                <input
                  type="text"
                  placeholder="Enter city name"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>District</label>
                <input
                  type="text"
                  placeholder="Enter district / neighborhood"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Postal Code</label>
                <input
                  type="text"
                  placeholder="e.g. 12345"
                  className={inputClass}
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Detailed Address</label>
                <input
                  type="text"
                  placeholder="Enter full street address"
                  className={inputClass}
                />
              </div>

              {/* Divider */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-border dark:bg-darkborder" />
                  <span className="text-xs font-semibold text-muted uppercase tracking-wider">
                    Phone Numbers
                  </span>
                  <div className="flex-1 h-px bg-border dark:bg-darkborder" />
                </div>
              </div>

              <div>
                <label className={labelClass}>Main Phone</label>
                <div className="relative">
                  <Icon
                    icon="tabler:phone"
                    height={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                  />
                  <input
                    type="tel"
                    placeholder="+1 000 000 0000"
                    className={`${inputClass} pl-9`}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Secondary Phone</label>
                <div className="relative">
                  <Icon
                    icon="tabler:phone"
                    height={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                  />
                  <input
                    type="tel"
                    placeholder="+1 000 000 0000"
                    className={`${inputClass} pl-9`}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>WhatsApp</label>
                <div className="relative">
                  <Icon
                    icon="tabler:brand-whatsapp"
                    height={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                  />
                  <input
                    type="tel"
                    placeholder="+1 000 000 0000"
                    className={`${inputClass} pl-9`}
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-border dark:bg-darkborder" />
                  <span className="text-xs font-semibold text-muted uppercase tracking-wider">
                    Email & Web
                  </span>
                  <div className="flex-1 h-px bg-border dark:bg-darkborder" />
                </div>
              </div>

              <div>
                <label className={labelClass}>Main Email</label>
                <div className="relative">
                  <Icon
                    icon="tabler:mail"
                    height={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                  />
                  <input
                    type="email"
                    placeholder="school@example.com"
                    className={`${inputClass} pl-9`}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Financial Email</label>
                <div className="relative">
                  <Icon
                    icon="tabler:mail-dollar"
                    height={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                  />
                  <input
                    type="email"
                    placeholder="finance@example.com"
                    className={`${inputClass} pl-9`}
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Website</label>
                <div className="relative">
                  <Icon
                    icon="tabler:world"
                    height={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                  />
                  <input
                    type="url"
                    placeholder="https://www.schoolname.com"
                    className={`${inputClass} pl-9`}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ──────────────── FINANCIAL SETTINGS ──────────────── */}
          {activeTab === "financial" && (
            <div className="space-y-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>
                    Base Currency <span className="text-error">*</span>
                  </label>
                  <select className={inputClass}>
                    <option value="">Select currency</option>
                    {currencies.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>
                    Number of Residential Units{" "}
                    <span className="text-error">*</span>
                  </label>
                  <select className={inputClass}>
                    <option value="">Select number</option>
                    {[1, 2, 3, 4, 5, 10, 15, 20, 50, 100].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Invoice Options */}
              <div>
                <h4 className="text-sm font-semibold text-ld mb-3">
                  Invoice Options
                </h4>
                <div className="space-y-3">
                  {[
                    {
                      id: "multiCurrency",
                      label: "Allow Multi-Currency Payments",
                      desc: "Enable students and parents to pay fees in multiple currencies.",
                      icon: "tabler:currency-exchange",
                    },
                    {
                      id: "logoOnInvoices",
                      label: "Show Logo on Invoices",
                      desc: "Display the school logo on all generated invoices and receipts.",
                      icon: "tabler:photo",
                    },
                    {
                      id: "addressOnInvoices",
                      label: "Show School Address & Contact on Invoices",
                      desc: "Include the school's address and contact information on invoices.",
                      icon: "tabler:map-pin",
                    },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      htmlFor={opt.id}
                      className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${
                        invoiceOptions[opt.id as keyof typeof invoiceOptions]
                          ? "border-primary bg-lightprimary/20 dark:bg-lightprimary/10"
                          : "border-border dark:border-darkborder hover:border-primary/40"
                      }`}
                    >
                      <div
                        className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${
                          invoiceOptions[opt.id as keyof typeof invoiceOptions]
                            ? "bg-primary text-white"
                            : "bg-lightgray dark:bg-darkgray/20 text-muted"
                        }`}
                      >
                        <Icon icon={opt.icon} height={18} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-ld">
                          {opt.label}
                        </p>
                        <p className="text-xs text-muted dark:text-darklink mt-0.5">
                          {opt.desc}
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        id={opt.id}
                        checked={
                          invoiceOptions[opt.id as keyof typeof invoiceOptions]
                        }
                        onChange={(e) =>
                          setInvoiceOptions((prev) => ({
                            ...prev,
                            [opt.id]: e.target.checked,
                          }))
                        }
                        className="mt-0.5 h-4 w-4 accent-primary shrink-0"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Save / Cancel */}
          <div className="mt-8 pt-6 border-t border-border dark:border-darkborder flex justify-end gap-3">
            <button
              type="button"
              className="px-5 py-2.5 rounded-lg border border-border dark:border-darkborder text-sm font-medium text-link dark:text-darklink hover:bg-lightgray dark:hover:bg-darkgray/20 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <Icon icon="tabler:device-floppy" height={16} />
              Save Settings
            </button>
          </div>
        </div>
      </div>
      {/* ── School Name Modal ── */}
      {showNameModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowNameModal(false)}
          />

          {/* Dialog */}
          <div className="relative bg-white dark:bg-dark rounded-2xl shadow-2xl border border-border dark:border-darkborder w-full max-w-md mx-4 overflow-hidden">
            {/* Header */}
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
                  <h3 className="text-base font-semibold text-ld">
                    School Name
                  </h3>
                  <p className="text-xs text-muted dark:text-darklink">
                    Enter the name in both languages
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowNameModal(false)}
                className="h-8 w-8 rounded-lg flex items-center justify-center text-muted hover:text-ld hover:bg-lightgray dark:hover:bg-darkgray/20 transition-colors"
              >
                <Icon icon="tabler:x" height={18} />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-5">
              {/* English */}
              <div>
                <label className="block text-sm font-medium text-ld mb-1.5">
                  <span className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center h-5 w-7 rounded text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 tracking-wide">
                      EN
                    </span>
                    Name in English
                  </span>
                </label>
                <input
                  type="text"
                  dir="ltr"
                  placeholder="e.g. Al-Noor International School"
                  value={tempNameEn}
                  onChange={(e) => setTempNameEn(e.target.value)}
                  className={inputClass}
                  autoFocus
                />
              </div>

              {/* Arabic */}
              <div>
                <label className="block text-sm font-medium text-ld mb-1.5">
                  <span className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center h-5 w-7 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 tracking-wide">
                      AR
                    </span>
                    Name in Arabic
                  </span>
                </label>
                <input
                  type="text"
                  dir="rtl"
                  placeholder="مثال: مدرسة النور الدولية"
                  value={tempNameAr}
                  onChange={(e) => setTempNameAr(e.target.value)}
                  className={`${inputClass} text-right`}
                />
              </div>

              {/* Preview */}
              {(tempNameEn || tempNameAr) && (
                <div className="rounded-lg bg-lightprimary/20 dark:bg-lightprimary/10 border border-primary/20 px-4 py-3">
                  <p className="text-xs text-muted mb-1 font-medium">Preview</p>
                  {tempNameEn && (
                    <p className="text-sm text-ld font-medium" dir="ltr">
                      {tempNameEn}
                    </p>
                  )}
                  {tempNameAr && (
                    <p className="text-sm text-ld font-medium mt-0.5" dir="rtl">
                      {tempNameAr}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-border dark:border-darkborder flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowNameModal(false)}
                className="px-4 py-2 rounded-lg border border-border dark:border-darkborder text-sm font-medium text-link dark:text-darklink hover:bg-lightgray dark:hover:bg-darkgray/20 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveNameModal}
                disabled={!tempNameEn && !tempNameAr}
                className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Icon icon="tabler:check" height={15} />
                Save Name
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
