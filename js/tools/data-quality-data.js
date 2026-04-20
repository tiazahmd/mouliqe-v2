// tools/data-quality-data.js — sample datasets + pre-built result profiles
export const SAMPLES = {
  hr: {
    label: 'HR Records', sub: '15 employees — duplicates, format issues',
    headers: ['EmployeeID','Name','Department','HireDate','Salary','Email','Status'],
    rows: [
      ['E001','Alice Chen','Engineering','2022-03-15','95000','alice.chen@company.com','Active'],
      ['E002','Bob Martinez','Marketing','03/22/2021','72000','bob.martinez@company.com','Active'],
      ['E003','Carol White','','2023-01-10','88000','carol.white@company.com','Active'],
      ['E004','David Kim','Engineering','2021-11-08','310000','david.kim@company','Active'],
      ['E005','Eva Johnson','Sales','2022-06-20','67000','eva.johnson@company.com','Active'],
      ['E001','Frank Lee','Engineering','2023-04-12','91000','frank.lee@company.com','Active'],
      ['E007','Grace Park','Marketing','Jan 5, 2023','78000','grace.park@company.com',''],
      ['E008','Henry Wilson','HR','2022-09-01','82000','henry.wilson@company.com','Active'],
      ['E009','Irene Davis','','2021-07-14','0','irene.davis@company.com','Inactive'],
      ['E010','James Brown','Sales','2023-02-28','71000','james.brown@company.com','Active'],
      ['E011','Karen Taylor','Engineering','2022-12-03','105000','karen.taylor@company.com','Active'],
      ['E012','Leo Nguyen','Marketing','2023-05-18','','leo.nguyen@company.com','Active'],
      ['E013','Mia Robinson','Sales','2021-08-22','69500','mia.robinson','Active'],
      ['E014','Nathan Scott','HR','2022-04-30','79000','nathan.scott@company.com','Active'],
      ['E015','Olivia Adams','Engineering','2023/07/11','98000','olivia.adams@company.com','Active'],
    ],
  },
  inventory: {
    label: 'Inventory', sub: '15 products — negative stock, category drift',
    headers: ['ProductID','ProductName','SKU','Category','Price','StockQty','Supplier','LastRestocked'],
    rows: [
      ['P001','Wireless Mouse','WM-1001','Electronics','29.99','150','TechSupply Co','2025-01-15'],
      ['P002','USB-C Hub','','Electronics','49.99','82','TechSupply Co','2025-02-01'],
      ['P003','Desk Lamp','DL-3020','Furniture','0','45','HomeGoods Inc','2025-01-20'],
      ['P004','Mechanical Keyboard','MK-4050','Electronics','89.99','-12','TechSupply Co','2025-02-10'],
      ['P005','Monitor Stand','MS-2010','Furniture','34.99','200','HomeGoods Inc','2025-01-28'],
      ['P006','Wireless Mouse','WM-1002','Peripherals','31.99','95','GadgetWorld','2025-02-05'],
      ['P007','Webcam HD','WC-5001','Electronics','59.99','0','TechSupply Co','2024-12-15'],
      ['P008','Cable Organizer','CO-6001','Accessories','12.99','320','HomeGoods Inc','2025-02-12'],
      ['P009','Laptop Stand','LS-7001','Furniture','44.99','67','HomeGoods Inc','2025-01-30'],
      ['P010','Bluetooth Speaker','BS-8001','Audio','0','28','GadgetWorld','2025-02-08'],
      ['P011','USB Flash Drive','','Storage','9.99','-5','TechSupply Co','2025-01-22'],
      ['P012','Desk Lamp','DL-3021','Lighting','39.99','55','HomeGoods Inc','2025-02-14'],
      ['P013','Power Strip','PS-9001','Electronics','19.99','180','TechSupply Co','2025-02-03'],
      ['P014','Mouse Pad XL','MP-1010','Peripherals','15.99','400','GadgetWorld','2025-01-18'],
      ['P015','HDMI Cable','HC-1100','Electronics','8.99','250','TechSupply Co','2025-02-11'],
    ],
  },
  transactions: {
    label: 'Transactions', sub: '15 txns — duplicates, mixed currencies, future dates',
    headers: ['TransactionID','Date','CustomerID','Amount','Currency','Type','Status','Channel'],
    rows: [
      ['TXN-10001','2025-02-01','C-4521','249.99','USD','Purchase','Completed','Web'],
      ['TXN-10002','2025-02-01','C-3892','-45.00','USD','Refund','Completed','Web'],
      ['TXN-10003','2025-02-02','','189.50','USD','Purchase','Pending','Mobile'],
      ['TXN-10004','2025-02-02','C-4521','75.00','EUR','Purchase','Completed','Web'],
      ['TXN-10005','2025-02-03','C-7210','320.00','USD','Purchase','Completed','Store'],
      ['TXN-10001','2025-02-03','C-4521','249.99','USD','Purchase','Completed','Web'],
      ['TXN-10007','2027-06-15','C-5544','150.00','USD','Purchase','Completed','Mobile'],
      ['TXN-10008','2025-02-04','C-3001','-120.00','USD','Refund','Completed','Web'],
      ['TXN-10009','2025-02-04','C-8832','89.99','GBP','Purchase','Failed','Mobile'],
      ['TXN-10010','2025-02-05','C-6643','0','USD','Purchase','Completed','Web'],
      ['TXN-10011','2025-02-05','','445.00','USD','Purchase','Pending','Store'],
      ['TXN-10012','2025-02-06','C-2290','67.50','USD','Purchase','Completed','Web'],
      ['TXN-10013','2025-02-06','C-4411','199.00','USD','Purchase','Completed','Mobile'],
      ['TXN-10014','2025-02-07','C-5544','-30.00','EUR','Refund','Completed','Web'],
      ['TXN-10015','2025-02-07','C-7781','525.00','USD','Purchase','Completed','Store'],
    ],
  },
};

export const SAMPLE_RESULTS = {
  hr: {
    overallScore: 62,
    columns: [
      { name: 'EmployeeID', type: 'ID',       score: 80,  issues: [
        { severity: 'high',   row: 6,  desc: 'Duplicate ID "E001" — also appears in row 1', fix: 'Assign unique employee IDs; add a UNIQUE constraint at the database level' },
      ]},
      { name: 'Name',       type: 'Text',     score: 100, issues: [] },
      { name: 'Department', type: 'Category', score: 80,  issues: [
        { severity: 'medium', row: 3,  desc: 'Null department — employee has no team assignment', fix: 'Require department on employee creation; backfill from manager records' },
        { severity: 'medium', row: 9,  desc: 'Null department — employee has no team assignment', fix: 'Require department on employee creation; backfill from manager records' },
      ]},
      { name: 'HireDate',   type: 'Date',     score: 53,  issues: [
        { severity: 'high',   row: 2,  desc: 'Inconsistent date format "03/22/2021" — expected YYYY-MM-DD', fix: 'Standardize all dates to ISO 8601 (YYYY-MM-DD) at ingestion' },
        { severity: 'high',   row: 7,  desc: 'Inconsistent date format "Jan 5, 2023" — expected YYYY-MM-DD', fix: 'Parse with a date library and store in ISO 8601 format' },
        { severity: 'medium', row: 15, desc: 'Inconsistent date format "2023/07/11" — uses slashes instead of dashes', fix: 'Normalize separators to dashes in ETL pipeline' },
      ]},
      { name: 'Salary',     type: 'Number',   score: 53,  issues: [
        { severity: 'high',   row: 4,  desc: 'Outlier value 310,000 — 3.2x above mean (81,346). Possible data entry error', fix: 'Flag outliers >2 std deviations for manual review; add validation range' },
        { severity: 'high',   row: 9,  desc: 'Zero salary — likely missing data, not actual compensation', fix: 'Replace with NULL and flag for HR review; add min-salary validation' },
        { severity: 'medium', row: 12, desc: 'Null salary — compensation data missing entirely', fix: 'Require salary field; backfill from offer letter records' },
      ]},
      { name: 'Email',      type: 'Email',    score: 73,  issues: [
        { severity: 'high',   row: 4,  desc: 'Invalid email "david.kim@company" — missing top-level domain', fix: 'Validate against email regex pattern; reject entries without valid TLD' },
        { severity: 'high',   row: 13, desc: 'Invalid email "mia.robinson" — missing @ symbol and domain', fix: 'Validate email format at form submission; require @domain.tld pattern' },
      ]},
      { name: 'Status',     type: 'Category', score: 87,  issues: [
        { severity: 'low',    row: 7,  desc: 'Empty status field — should be Active or Inactive', fix: 'Add NOT NULL constraint with default value "Active"' },
      ]},
    ],
  },
  inventory: {
    overallScore: 58,
    columns: [
      { name: 'ProductID',     type: 'ID',       score: 100, issues: [] },
      { name: 'ProductName',   type: 'Text',     score: 80,  issues: [
        { severity: 'medium', row: 1,  desc: 'Duplicate product name "Wireless Mouse" — also in row 6', fix: 'Use ProductID as unique key; add disambiguation to display names' },
        { severity: 'medium', row: 3,  desc: 'Duplicate product name "Desk Lamp" — also in row 12', fix: 'Use ProductID as unique key; add model variant to product names' },
      ]},
      { name: 'SKU',           type: 'ID',       score: 73,  issues: [
        { severity: 'high',   row: 2,  desc: 'Missing SKU — product has no stock-keeping unit identifier', fix: 'Generate SKU from category code + sequence; make field required' },
        { severity: 'high',   row: 11, desc: 'Missing SKU — product has no stock-keeping unit identifier', fix: 'Auto-generate SKUs on product creation; backfill from supplier catalog' },
      ]},
      { name: 'Category',      type: 'Category', score: 67,  issues: [
        { severity: 'medium', row: 6,  desc: '"Peripherals" vs "Electronics" — Wireless Mouse categorized differently than row 1', fix: 'Define canonical category taxonomy; map aliases to standard categories' },
        { severity: 'medium', row: 12, desc: '"Lighting" vs "Furniture" — Desk Lamp categorized differently than row 3', fix: 'Create category validation rules; review and standardize on import' },
      ]},
      { name: 'Price',         type: 'Currency', score: 73,  issues: [
        { severity: 'high',   row: 3,  desc: 'Price is $0 for "Desk Lamp" — likely missing, not free', fix: 'Add min-price validation; flag $0 prices for review before publishing' },
        { severity: 'high',   row: 10, desc: 'Price is $0 for "Bluetooth Speaker" — likely missing, not free', fix: 'Require non-zero price for purchasable items; separate free items explicitly' },
      ]},
      { name: 'StockQty',      type: 'Number',   score: 60,  issues: [
        { severity: 'high',   row: 4,  desc: 'Negative stock quantity (-12) — physically impossible', fix: 'Add CHECK constraint (stock >= 0); investigate inventory sync issues' },
        { severity: 'high',   row: 11, desc: 'Negative stock quantity (-5) — physically impossible', fix: 'Clamp to zero and flag discrepancy; audit warehouse management system' },
        { severity: 'low',    row: 7,  desc: 'Zero stock with last restock 2+ months ago — may need reorder', fix: 'Set up automated reorder alerts when stock hits threshold' },
      ]},
      { name: 'Supplier',      type: 'Text',     score: 100, issues: [] },
      { name: 'LastRestocked', type: 'Date',     score: 100, issues: [] },
    ],
  },
  transactions: {
    overallScore: 55,
    columns: [
      { name: 'TransactionID', type: 'ID',       score: 80,  issues: [
        { severity: 'high',   row: 6,  desc: 'Duplicate ID "TXN-10001" — also appears in row 1', fix: 'Enforce UNIQUE constraint on transaction IDs; use UUID generation' },
      ]},
      { name: 'Date',          type: 'Date',     score: 80,  issues: [
        { severity: 'high',   row: 7,  desc: 'Future date "2027-06-15" — transaction dated 2+ years in the future', fix: 'Add date validation: reject dates beyond today + 1 day; investigate source system clock' },
      ]},
      { name: 'CustomerID',    type: 'ID',       score: 73,  issues: [
        { severity: 'high',   row: 3,  desc: 'Null customer ID — cannot attribute transaction', fix: 'Require customer ID for all purchase transactions; link to guest checkout records' },
        { severity: 'high',   row: 11, desc: 'Null customer ID — cannot attribute transaction', fix: 'Add NOT NULL constraint for non-anonymous channels; create guest customer placeholder' },
      ]},
      { name: 'Amount',        type: 'Currency', score: 60,  issues: [
        { severity: 'medium', row: 2,  desc: 'Negative amount (-$45.00) on Refund — may be intentional but verify sign convention', fix: 'Standardize: store refunds as positive amounts with Type=Refund, not negative values' },
        { severity: 'medium', row: 8,  desc: 'Negative amount (-$120.00) on Refund — inconsistent sign convention', fix: 'Normalize sign convention in ETL; positive amounts + type field determines direction' },
        { severity: 'high',   row: 10, desc: 'Zero-amount purchase — $0 transaction with status "Completed"', fix: 'Flag zero-amount purchases; add minimum transaction amount validation' },
        { severity: 'medium', row: 14, desc: 'Negative amount (-$30.00) on Refund in EUR — mixed currencies with sign issues', fix: 'Separate currency handling; normalize all amounts to positive with type indicator' },
      ]},
      { name: 'Currency',      type: 'Category', score: 60,  issues: [
        { severity: 'medium', row: 4,  desc: 'EUR mixed with predominantly USD transactions — possible data entry error', fix: 'Validate currency against customer country; add currency confirmation step' },
        { severity: 'medium', row: 9,  desc: 'GBP transaction — 3 different currencies in dataset reduces consistency', fix: 'Standardize to base currency with original_currency field; store exchange rate at time of transaction' },
        { severity: 'medium', row: 14, desc: 'EUR refund — currency mismatch tracking adds reconciliation complexity', fix: 'Enforce refund currency must match original purchase currency' },
      ]},
      { name: 'Type',          type: 'Category', score: 100, issues: [] },
      { name: 'Status',        type: 'Category', score: 100, issues: [] },
      { name: 'Channel',       type: 'Category', score: 100, issues: [] },
    ],
  },
};

export const STAGE_CONTEXT = {
  parse:   { title: 'Parsing CSV',                       text: 'Reading your data row by row, detecting delimiters, handling quoted fields, and building a structured table. Every downstream check depends on clean parsing.', isAI: false },
  profile: { title: 'Profiling Columns',                 text: 'Analyzing each column: inferring data types (numeric, date, email, ID, category), counting nulls, measuring cardinality, and computing statistical distributions. This tells us what "normal" looks like.', isAI: false },
  detect:  { title: 'AI: Dispatching Detector Agents',   text: 'An AI coordinator dispatches specialized detector agents based on column types: Null Detector, Format Validator, Outlier Detector, Duplicate Checker, and Pattern Analyzer. Each detector runs independently and reports findings back to the coordinator.', isAI: true },
  score:   { title: 'AI: Computing Quality Scores',      text: 'An AI scoring agent weighs each detected issue by severity, frequency, and downstream impact. It considers cross-column dependencies (e.g., a null email matters more if status is "Active") to produce context-aware quality scores rather than simple counts.', isAI: true },
  report:  { title: 'Building Report',                   text: 'Assembling the quality report: overall score card, column-by-column breakdown with detected types and issues, expandable issue details with suggested fixes, and a data preview with flagged cells highlighted.', isAI: false },
};
