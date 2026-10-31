/* ==========================================================================
   CONFERENCING MODULE // ADD, REMOVE, INLINE EDIT & LOCALSTORAGE PERSISTENCE
   ========================================================================== */

const STORAGE_KEY = 'ppp_conferencing_entries_v1';

const DEFAULT_CONFERENCES = [
  {
    id: 'conf-1',
    title: 'Checkpoint 1: Topic Brainstorming & Driving Questions',
    date: 'Oct 2026',
    phase: 'Secondary Research',
    status: 'Completed',
    feedback:
      'Reviewed the 6 candidate questions in Post 2. Stepper motor back-EMF had confounding friction from internal detent cogging, and optical lens distortion leaned too heavily toward software review. The Gyroscopic Precession topic offers the clearest independent variable (radial mass position of machine screws/washers) and directly measurable dependent variable (precession angular velocity).',
    actions:
      '• Finalize driving question: "How does shifting a spinning wheel\'s mass toward its outer rim change how fast it precesses?"\n• Begin literature review on moment of inertia and review ESP32 + SimpleFOCmini hardware specs.'
  },
  {
    id: 'conf-2',
    title: 'Checkpoint 2: Research Plan, BOM & Gantt Schedule Review',
    date: 'Nov 10, 2026',
    phase: 'Secondary Research',
    status: 'In Progress',
    feedback:
      'Verify that reaction wheel mass stays constant across trials when moving machine screws and washers from inner mounting holes to the outer rim so total gravitational torque remains controlled while moment of inertia (I) changes.',
    actions:
      '• Design symmetrical inner and outer screw mounting rings in Onshape CAD.\n• Confirm 220KV 2804 brushless motor and MT6701 magnetic encoder delivery dates.'
  },
  {
    id: 'conf-3',
    title: 'Checkpoint 3: Physical Build, PID Tuning & Experimental Trials',
    date: 'Dec 4, 2026',
    phase: 'Primary Research',
    status: 'Scheduled',
    feedback:
      'Upcoming conference to inspect 3D-printed frame rigidity, closed-loop RPM stability via MT6701 encoder telemetry, and video tracking setup for measuring precession period.',
    actions:
      '• Log motor angular velocity (ω) via serial telemetry during each precession trial.\n• Record multi-angle slow-motion video with reference protractors for accurate angular speed calculation.'
  },
  {
    id: 'conf-4',
    title: 'Checkpoint 4: Telemetry Analysis & Trifold Presentation Review',
    date: 'Dec 22, 2026',
    phase: 'Deliverables',
    status: 'Scheduled',
    feedback:
      'Final review of experimental graphs comparing theoretical vs. measured precession rates and visual layout of the project trifold.',
    actions:
      '• Plot Precession Speed (rad/s) vs. Calculated Moment of Inertia (kg·m²).\n• Finalize presentation script and trifold diagrams.'
  }
];

function getPhaseTagClass(phase) {
  if (phase === 'Secondary Research') return 'phase-sr';
  if (phase === 'Primary Research') return 'phase-pr';
  return 'phase-del';
}

function getStatusTagClass(status) {
  if (status === 'Completed') return 'phase-del';
  if (status === 'In Progress') return 'phase-sr';
  return 'phase-pr';
}

export function initConferencing() {
  const container = document.getElementById('conf-cards-container');
  const newConfForm = document.getElementById('new-conf-form');
  const addConfBtn = document.getElementById('add-conf-btn');
  const cancelConfBtn = document.getElementById('cancel-conf-btn');
  const saveConfBtn = document.getElementById('save-conf-btn');
  const toggleEditBtn = document.getElementById('toggle-edit-conf-btn');
  const editBtnLabel = document.getElementById('edit-btn-label');

  if (!container) return;

  let confEntries = [];
  let isEditingInline = false;

  function loadConferences() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      confEntries = saved ? JSON.parse(saved) : [...DEFAULT_CONFERENCES];
    } catch {
      confEntries = [...DEFAULT_CONFERENCES];
    }
  }

  function saveConferences() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(confEntries));
    } catch (err) {
      console.warn('Could not persist to localStorage:', err);
    }
  }

  function renderConferences() {
    if (confEntries.length === 0) {
      container.innerHTML = `
        <div class="chassis-module" style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--ink-muted);">
          <p>No conference records logged. Press <strong>"+ Add Conference"</strong> above to create a checkpoint entry.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = confEntries
      .map(
        (entry, idx) => `
        <article class="chassis-module" data-idx="${idx}">
          <div class="module-header-strip">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span class="ms-code">REC-0${idx + 1}</span>
              <span class="phase-tag ${getPhaseTagClass(entry.phase)}">${entry.phase}</span>
              <span class="ms-dates" style="display: inline;" contenteditable="${isEditingInline}" data-field="date" data-idx="${idx}">${entry.date}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <span class="phase-tag ${getStatusTagClass(entry.status)}">${entry.status}</span>
              <button type="button" class="btn-remove-conf" data-delete-idx="${idx}" title="Remove this conference entry">
                <span>Remove</span>
              </button>
            </div>
          </div>

          <div class="conf-log-body">
            <h3 class="conf-log-title" contenteditable="${isEditingInline}" data-field="title" data-idx="${idx}">${entry.title}</h3>

            <div class="vfd-window conf-box">
              <div class="conf-box-label">
                <span>TEACHER FEEDBACK &amp; OBSERVATIONS</span>
                ${isEditingInline ? '<span class="glow-cyan">[INLINE EDIT ACTIVE]</span>' : ''}
              </div>
              <div class="conf-box-text" contenteditable="${isEditingInline}" data-field="feedback" data-idx="${idx}">${entry.feedback}</div>
            </div>

            <div class="vfd-window conf-box">
              <div class="conf-box-label">
                <span>STUDENT ACTION ITEMS &amp; NEXT STEPS</span>
                ${isEditingInline ? '<span class="glow-cyan">[INLINE EDIT ACTIVE]</span>' : ''}
              </div>
              <div class="conf-box-text" contenteditable="${isEditingInline}" data-field="actions" data-idx="${idx}">${entry.actions}</div>
            </div>
          </div>
        </article>
      `
      )
      .join('');

    container.querySelectorAll('.btn-remove-conf').forEach(btn => {
      btn.addEventListener('click', () => {
        const removeIdx = Number(btn.dataset.deleteIdx);
        confEntries.splice(removeIdx, 1);
        saveConferences();
        renderConferences();
      });
    });

    container.querySelectorAll('[contenteditable="true"]').forEach(el => {
      el.addEventListener('blur', () => {
        const idx = Number(el.dataset.idx);
        const field = el.dataset.field;
        if (confEntries[idx] && field) {
          confEntries[idx][field] = el.innerText.trim();
          saveConferences();
        }
      });
    });
  }

  if (addConfBtn && newConfForm) {
    addConfBtn.addEventListener('click', () => {
      newConfForm.classList.add('open');
      document.getElementById('conf-title-input')?.focus();
    });
  }

  if (cancelConfBtn && newConfForm) {
    cancelConfBtn.addEventListener('click', () => {
      newConfForm.classList.remove('open');
    });
  }

  if (saveConfBtn && newConfForm) {
    saveConfBtn.addEventListener('click', () => {
      const titleInput = document.getElementById('conf-title-input');
      const dateInput = document.getElementById('conf-date-input');
      const phaseInput = document.getElementById('conf-phase-input');
      const statusInput = document.getElementById('conf-status-input');
      const feedbackInput = document.getElementById('conf-feedback-input');
      const actionsInput = document.getElementById('conf-actions-input');

      const title = titleInput.value.trim() || `Checkpoint ${confEntries.length + 1}: Conference Review`;
      const date = dateInput.value.trim() || 'Nov 2026';
      const phase = phaseInput.value;
      const status = statusInput.value;
      const feedback = feedbackInput.value.trim() || 'No teacher feedback notes entered yet.';
      const actions = actionsInput.value.trim() || '• Review experimental milestones.';

      confEntries.push({
        id: 'conf-' + Date.now(),
        title,
        date,
        phase,
        status,
        feedback,
        actions
      });

      saveConferences();
      renderConferences();

      titleInput.value = '';
      dateInput.value = '';
      feedbackInput.value = '';
      actionsInput.value = '';
      newConfForm.classList.remove('open');
    });
  }

  if (toggleEditBtn && editBtnLabel) {
    toggleEditBtn.addEventListener('click', () => {
      isEditingInline = !isEditingInline;
      editBtnLabel.textContent = isEditingInline ? 'Lock Inline Notes' : 'Edit Inline Notes';
      toggleEditBtn.classList.toggle('is-latched', isEditingInline);
      renderConferences();
    });
  }

  loadConferences();
  renderConferences();
}
