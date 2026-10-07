// tools/right-sized-ai-data.js — scenarios for the right-sized AI demo.
// Every answer here is written by hand to show how each kind of tool behaves; nothing calls a model.
// Jev answers copy the shape of TypeSafe's published API response (docs.typesafe.ai).

export const PRICE = {
  jev:     { input: 0.042 },               // $ per million input tokens, output free (TypeSafe, September 2026)
  chatbot: { input: 3.00, output: 15.00 }, // Claude Sonnet 4.6, the rates the Cost Simulator uses
};

export const STAGE_CTX = {
  read:    { title: 'Reading the Request', text: 'One message comes in. Before any tool runs, we write down the small questions we need answered. Every tool gets the same message and the same questions.', isAI: false },
  rules:   { title: 'Rules: Keyword Matching', text: 'The oldest trick in software: if the message contains a certain word, do a certain thing. Free and instant. Also brittle, because one unexpected word sends it the wrong way.', isAI: false },
  small:   { title: 'AI: Small Model on Your Own Server', text: 'An open model with about 3 billion parameters, small enough to run on one machine you own. The message never leaves your building, and there is no per-call fee.', isAI: true },
  jev:     { title: 'AI: Decision Model (Jev)', text: 'Jev does not write text. It gets the message and the questions, and returns a typed answer for each one, with a confidence your code can act on.', isAI: true },
  chatbot: { title: 'AI: Big Chatbot', text: 'A frontier chat model. It understands almost anything and answers in paragraphs. Your code then has to find the answer inside the prose.', isAI: true },
  route:   { title: 'Right-Sizing the Setup', text: 'Use the smallest tool that answers each question reliably, and send anything it is unsure about to a person. Then see what that costs at your volume.', isAI: false },
};

export const SAMPLES = {
  pothole: {
    label: 'City 311 Report', sub: 'Department, urgency, safety',
    channel: '311 app · resident report',
    message: "There's a pothole the size of a bathtub on 8th Avenue by Lincoln Elementary. Two cars blew tires on it this week. Someone's going to get hurt.",
    questions: [
      { id: 'department', label: 'Which department?', type: 'choice', options: ['Public Works', 'Parks', 'Utilities', 'Schools', 'Police (non-emergency)'] },
      { id: 'urgency',    label: 'How urgent?',       type: 'score',  options: ['Can wait', 'Routine', 'This week', 'Within 48 hours', 'Today'] },
      { id: 'safety',     label: 'Safety risk?',      type: 'noul' },
    ],
    truth: { department: 'Public Works', urgency: 'Within 48 hours', safety: true },
    rules: {
      ms: 1,
      answers: { department: 'Schools', urgency: 'Routine', safety: true },
      hits: [
        { keyword: 'Elementary', rule: '"school" or "elementary" → Schools' },
        { keyword: 'hurt',       rule: '"hurt", "injury" or "danger" → safety risk' },
        { keyword: null,         rule: 'No urgency word matched, so urgency falls back to Routine' },
      ],
      note: 'One word sent it to the wrong department. The two blown tires never counted.',
    },
    small: {
      ms: 310,
      answers: { department: 'Public Works', urgency: 'Within 48 hours', safety: true },
      conf:    { department: 0.71, urgency: 0.58, safety: 0.83 },
      note: 'Right answers, but less sure of itself. Good enough for a first pass on your own server.',
    },
    jev: {
      ms: 140, tokensIn: 412,
      response: {
        model: 'jev-1.13.0',
        answers: {
          department: { type: 'choice', choice: 'Public Works', confidence: 0.93,
            probabilities: { 'Public Works': 0.95, 'Parks': 0.0, 'Utilities': 0.02, 'Schools': 0.03, 'Police (non-emergency)': 0.0 } },
          urgency: { type: 'score', score: 3.1, confidence: 0.81,
            legend: { 0: 'Can wait', 1: 'Routine', 2: 'This week', 3: 'Within 48 hours', 4: 'Today' },
            probabilities: { 0: 0.0, 1: 0.0, 2: 0.06, 3: 0.78, 4: 0.16 } },
          safety: { type: 'noul', noul: 0.97 },
        },
        usage: { input_tokens: 412, output_tokens: 61 },
      },
      note: 'Three typed answers from one call, each with a probability your code can branch on.',
    },
    chatbot: {
      model: 'Claude Sonnet 4.6', ms: 3200, tokensIn: 380, tokensOut: 152,
      text: "Thanks for flagging this! Based on the description, this sounds like it belongs with the Public Works department, since potholes and road surface repairs usually fall under the streets division. Given that two vehicles have already been damaged and the location is near an elementary school, I'd treat this as high priority and aim for a repair within the next 24 to 48 hours. There also appears to be a genuine safety risk to drivers, and possibly to children walking nearby, so it may be worth placing temporary warning signs in the meantime. Let me know if you'd like me to draft a reply to the resident!",
      parsed: { department: 'Public Works', urgency: 'Within 48 hours', safety: true },
      note: 'Right answers, buried in a paragraph. Your code has to dig out "Public Works", and the wording can change next time.',
    },
    route: {
      assign: { department: 'jev', urgency: 'jev', safety: 'jev' }, defaultVol: 20000,
      verdict: { title: 'Right-sized pick: Jev', text: 'Three small questions, one typed answer each, in a fraction of a second. The rules tripped on one word. The chatbot got it right, but cost far more and needed parsing.' },
      curve: [ { t: 0.5, autoShare: 0.98 }, { t: 0.6, autoShare: 0.96 }, { t: 0.7, autoShare: 0.93 }, { t: 0.8, autoShare: 0.88 }, { t: 0.95, autoShare: 0.71 } ],
    },
  },

  email: {
    label: 'Customer Email', sub: 'Team, frustration, refund',
    channel: 'support inbox · online store',
    message: "Order #4471 arrived cracked, and I was charged twice. Fix this before Friday or I'm disputing it with my bank.",
    questions: [
      { id: 'team',        label: 'Which team?',            type: 'choice', options: ['Billing', 'Shipping', 'Product', 'Sales'] },
      { id: 'frustration', label: 'How frustrated?',        type: 'score',  options: ['Calm', 'Frustrated', 'Angry'] },
      { id: 'refund',      label: 'Asking for money back?', type: 'noul' },
    ],
    truth: { team: null, frustration: 'Angry', refund: true },
    rules: {
      ms: 1,
      answers: { team: 'Billing', frustration: 'Calm', refund: false },
      hits: [
        { keyword: 'charged', rule: '"charge" or "invoice" → Billing' },
        { keyword: null,      rule: 'No anger word matched ("furious", "unacceptable"), so frustration falls back to Calm' },
        { keyword: null,      rule: 'The word "refund" never appears, so no refund' },
      ],
      note: 'It saw one problem and missed the other. It also missed the threat of a bank dispute.',
    },
    small: {
      ms: 290,
      answers: { team: 'Shipping', frustration: 'Frustrated', refund: true },
      conf:    { team: 0.52, frustration: 0.6, refund: 0.66 },
      note: 'It noticed the broken item and the money, but it is unsure, and it underplays the anger.',
    },
    jev: {
      ms: 130, tokensIn: 388,
      response: {
        model: 'jev-1.13.0',
        answers: {
          team: { type: 'choice', choice: 'Billing', confidence: 0.58,
            probabilities: { 'Billing': 0.55, 'Shipping': 0.41, 'Product': 0.04, 'Sales': 0.0 } },
          frustration: { type: 'score', score: 1.65, confidence: 0.74,
            legend: { 0: 'Calm', 1: 'Frustrated', 2: 'Angry' },
            probabilities: { 0: 0.02, 1: 0.31, 2: 0.67 } },
          refund: { type: 'noul', noul: 0.91 },
        },
        usage: { input_tokens: 388, output_tokens: 58 },
      },
      note: 'Jev split its vote between Billing and Shipping, and said so. That low confidence is the useful part.',
    },
    chatbot: {
      model: 'Claude Sonnet 4.6', ms: 3600, tokensIn: 356, tokensOut: 168,
      text: "I'm sorry to hear about this experience. It sounds like there are two separate issues here: the item arrived damaged, which would usually go to Shipping or Fulfillment, and the customer was charged twice, which is a Billing matter. Since they mention disputing the charge with their bank, I'd prioritize the billing issue first to avoid a chargeback, while also arranging a replacement for the cracked item. The customer is clearly upset and wants the duplicate charge refunded. Would you like me to draft an apology and a resolution plan?",
      parsed: { team: 'Billing', frustration: 'Angry', refund: true },
      note: 'It spotted both problems, which is good. But your code needs one team, and the paragraph names two.',
    },
    route: {
      assign: { team: 'jev', frustration: 'jev', refund: 'jev' }, defaultVol: 8000,
      verdict: { title: 'Right-sized pick: Jev, plus a person', text: 'Two problems in one email is a judgment call. Jev was unsure and said so, so this request goes to a person instead of the wrong queue. The confident answers still flow through on their own.' },
      curve: [ { t: 0.5, autoShare: 0.95 }, { t: 0.6, autoShare: 0.9 }, { t: 0.7, autoShare: 0.82 }, { t: 0.8, autoShare: 0.74 }, { t: 0.95, autoShare: 0.52 } ],
    },
  },

  invoice: {
    label: 'Vendor Invoice', sub: 'Category, approval, duplicate',
    channel: 'accounts payable · emailed PDF',
    message: 'Invoice #A-2210 from Brightline Plumbing. Emergency pipe repair, Community Center. Amount: $6,480.00. Due November 15.',
    context: 'On file: invoice #A-2209 from Brightline Plumbing, $6,480.00, received 7 days ago.',
    questions: [
      { id: 'category',  label: 'Which budget category?',          type: 'choice', options: ['Facilities', 'IT', 'Professional Services', 'Supplies'] },
      { id: 'approval',  label: 'Over the $5,000 approval limit?', type: 'noul' },
      { id: 'duplicate', label: 'Possible duplicate?',             type: 'noul' },
    ],
    truth: { category: 'Facilities', approval: true, duplicate: true },
    rules: {
      ms: 1,
      answers: { category: 'No match', approval: true, duplicate: true },
      hits: [
        { keyword: null,        rule: 'No category keyword matched "pipe repair", so the category is left blank' },
        { keyword: '$6,480.00', rule: 'Amount above $5,000 → needs approval' },
        { keyword: 'A-2209',    rule: 'Same vendor and same amount within 30 days → possible duplicate' },
      ],
      note: 'Two out of three, exactly right, for free. Approval limits and duplicate checks are arithmetic, and you do not need a model for arithmetic.',
    },
    small: {
      ms: 330,
      answers: { category: 'Facilities', approval: true, duplicate: false },
      conf:    { category: 0.77, approval: 0.88, duplicate: 0.55 },
      note: 'It got the category, then missed the duplicate. A model is a poor way to compare two numbers.',
    },
    jev: {
      ms: 150, tokensIn: 436,
      response: {
        model: 'jev-1.13.0',
        answers: {
          category: { type: 'choice', choice: 'Facilities', confidence: 0.9,
            probabilities: { 'Facilities': 0.93, 'IT': 0.0, 'Professional Services': 0.06, 'Supplies': 0.01 } },
          approval:  { type: 'noul', noul: 0.97 },
          duplicate: { type: 'noul', noul: 0.88 },
        },
        usage: { input_tokens: 436, output_tokens: 49 },
      },
      note: 'All three right. But you are paying a model to compare $6,480 with $5,000.',
    },
    chatbot: {
      model: 'Claude Sonnet 4.6', ms: 3900, tokensIn: 402, tokensOut: 176,
      text: "This invoice from Brightline Plumbing is for emergency pipe repair at the Community Center, so it most likely falls under Facilities. The amount of $6,480.00 exceeds the $5,000 threshold, so it will need manager approval before payment. I'd also flag it as a possible duplicate: there's an invoice on file from the same vendor for exactly the same amount, received just a week ago. It would be worth confirming with Brightline whether this is a second repair or a resubmission before paying it. Let me know if you'd like help drafting that email.",
      parsed: { category: 'Facilities', approval: true, duplicate: true },
      note: 'Right, and helpful. Also slow and expensive for one category and two yes-or-no checks.',
    },
    route: {
      assign: { category: 'jev', approval: 'rules', duplicate: 'rules' }, defaultVol: 3000,
      verdict: { title: 'Right-sized pick: rules first, Jev for the category', text: 'The approval limit and the duplicate check are arithmetic and lookups, so rules get them right every time, for free. Only the category needs judgment, so only the category goes to Jev.' },
      curve: [ { t: 0.5, autoShare: 0.99 }, { t: 0.6, autoShare: 0.98 }, { t: 0.7, autoShare: 0.97 }, { t: 0.8, autoShare: 0.95 }, { t: 0.95, autoShare: 0.86 } ],
    },
  },

  records: {
    label: 'Duplicate Records', sub: 'Same person or not?',
    channel: 'customer database · merge check',
    message: 'Record A: Jon Smith, 12 Oak St, (555) 201-7781\nRecord B: Jonathan Smith, 12 Oak Street Apt 2, 555-201-7781',
    questions: [
      { id: 'same',     label: 'Same person?',           type: 'noul' },
      { id: 'conflict', label: 'Which field conflicts?', type: 'choice', options: ['None', 'Name', 'Address', 'Phone'] },
    ],
    truth: { same: true, conflict: 'Address' },
    rules: {
      ms: 1,
      answers: { same: false, conflict: 'Name' },
      hits: [
        { keyword: 'Jon ≠ Jonathan', rule: 'Every field must match exactly → not the same person' },
        { keyword: null,             rule: 'First field that differs → Name' },
      ],
      note: 'Exact matching treats "Jon" and "Jonathan" as strangers, and "St" and "Street" as different streets.',
    },
    small: {
      ms: 270,
      answers: { same: true, conflict: 'Address' },
      conf:    { same: 0.9, conflict: 0.81 },
      note: 'Right on both, and the records never left your server. For personal data, that matters.',
    },
    jev: {
      ms: 120, tokensIn: 296,
      response: {
        model: 'jev-1.13.0',
        answers: {
          same: { type: 'noul', noul: 0.94 },
          conflict: { type: 'choice', choice: 'Address', confidence: 0.86,
            probabilities: { 'None': 0.05, 'Name': 0.04, 'Address': 0.89, 'Phone': 0.02 } },
        },
        usage: { input_tokens: 296, output_tokens: 37 },
      },
      note: 'Right on both, and cheap. But these are customers’ personal details, sent to a hosted service.',
    },
    chatbot: {
      model: 'Claude Sonnet 4.6', ms: 3100, tokensIn: 284, tokensOut: 141,
      text: "These two records very likely belong to the same person. \"Jon\" is a common short form of \"Jonathan\", the street address matches once you treat \"St\" and \"Street\" as the same, and the phone numbers are identical apart from formatting. The one real difference is the unit number: Record B includes \"Apt 2\", which Record A doesn't have. I'd recommend merging them and keeping the more complete address. Want me to suggest a merge rule for cases like this?",
      parsed: { same: true, conflict: 'Address' },
      note: 'Right, with a good explanation. Now multiply the cost by every record in your database.',
    },
    route: {
      assign: { same: 'small', conflict: 'small' }, defaultVol: 50000,
      verdict: { title: 'Right-sized pick: the small model, on your own server', text: 'Customer records are personal data. A small model on your own machine gets this right without sending anyone’s details out of the building, and it has no per-call fee.' },
      curve: [ { t: 0.5, autoShare: 0.97 }, { t: 0.6, autoShare: 0.95 }, { t: 0.7, autoShare: 0.91 }, { t: 0.8, autoShare: 0.85 }, { t: 0.95, autoShare: 0.68 } ],
    },
  },
};
