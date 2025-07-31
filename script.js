class StyleExplorer {
  constructor() {
    this.quizActive = false;
    this.currentStep = 0;
    this.role = null;
    this.answers = { traits: {} };
    this.scores = {};
    this.showDashboard = false;
    this.showBreakdown = false; 
    this.traits = {
      submissive: [
        { name: 'obedience', question: 'How much do you enjoy following guidance?', label: '1: Prefer freedom / 10: Love obeying' },
        { name: 'playfulness', question: 'Do you love playful, lighthearted fun?', label: '1: Serious / 10: Very playful' },
        { name: 'affection', question: 'How much do you crave closeness and cuddles?', label: '1: Distant / 10: Very affectionate' },
        { name: 'exploration', question: 'Are you excited by trying new experiences?', label: '1: Stick to known / 10: Love adventure' },
        { name: 'vulnerability', question: 'Do you enjoy opening up emotionally?', label: '1: Guarded / 10: Very open' }
      ],
      dominant: [
        { name: 'authority', question: 'Do you feel strong taking charge?', label: '1: Gentle / 10: Very commanding' },
        { name: 'care', question: 'Do you love nurturing others?', label: '1: Detached / 10: Very caring' },
        { name: 'control', question: 'Do you thrive on directing situations?', label: '1: Hands-off / 10: Full control' },
        { name: 'confidence', question: 'Are you sure in your decisions?', label: '1: Hesitant / 10: Very confident' },
        { name: 'creativity', question: 'Do you enjoy crafting unique experiences?', label: '1: Routine / 10: Very creative' }
      ]
    };
    this.styles = {
      submissive: ['Submissive', 'Brat', 'Little', 'Pet', 'Rope Bunny'],
      dominant: ['Dominant', 'Nurturer', 'Master', 'Rigger', 'Caretaker']
    };
    this.styleDetails = {
      Submissive: { desc: 'You find peace in yielding to guidance.', match: 'Dominant', tips: ['Set clear boundaries.', 'Communicate openly.'] },
      Brat: { desc: 'You love playful resistance and teasing.', match: 'Disciplinarian', tips: ['Keep it fun.', 'Ensure consent.'] },
      Little: { desc: 'You embrace a carefree, nurtured role.', match: 'Caretaker', tips: ['Find a nurturing partner.', 'Explore safely.'] },
      Pet: { desc: 'You thrive on affection and play.', match: 'Owner', tips: ['Enjoy your role.', 'Seek a caring dynamic.'] },
      'Rope Bunny': { desc: 'You love the art of being bound.', match: 'Rigger', tips: ['Learn safety.', 'Pair with a skilled partner.'] },
      Dominant: { desc: 'You shine when leading with confidence.', match: 'Submissive', tips: ['Listen to your partner.', 'Balance control with care.'] },
      Nurturer: { desc: 'You guide with warmth and support.', match: 'Little', tips: ['Be patient.', 'Foster trust.'] },
      Master: { desc: 'You lead with authority and responsibility.', match: 'Slave', tips: ['Negotiate clearly.', 'Build trust.'] },
      Rigger: { desc: 'You create art through restraint.', match: 'Rope Bunny', tips: ['Study bondage safety.', 'Practice precision.'] },
      Caretaker: { desc: 'You nurture with love and structure.', match: 'Little', tips: ['Be consistent.', 'Encourage growth.'] }
    };
    this.init();
  }

  init() {
    this.elements = {
      startQuiz: document.getElementById('start-quiz'),
      quizModal: document.getElementById('quiz-modal'),
      closeQuiz: document.getElementById('close-quiz'),
      quizTitle: document.getElementById('quiz-title'),
      progressBar: document.getElementById('progress-fill'),
      quizContent: document.getElementById('quiz-content'),
      feedback: document.getElementById('quiz-feedback'),
      themeToggle: document.getElementById('theme-toggle'),
      historyBtn: document.getElementById('history-btn'),
      historyModal: document.getElementById('history-modal'),
      closeHistory: document.getElementById('close-history'),
      historyContent: document.getElementById('history-content')
    };

    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    this.elements.themeToggle.textContent = savedTheme === 'light' ? '🌙' : '☀️';

    this.elements.startQuiz.addEventListener('click', () => this.startQuiz());
    this.elements.closeQuiz.addEventListener('click', () => this.closeQuiz());
    this.elements.themeToggle.addEventListener('click', () => this.toggleTheme());
    this.elements.historyBtn.addEventListener('click', () => this.showHistory());
    this.elements.closeHistory.addEventListener('click', () => this.closeHistory());
  }

  startQuiz() {
    this.quizActive = true;
    this.currentStep = 0;
    this.role = null;
    this.answers = { traits: {} };
    this.scores = {};
    this.showDashboard = false;
    this.showBreakdown = false;
    this.elements.quizModal.style.display = 'flex';
    this.elements.historyModal.style.display = 'none';
    this.renderStep();
  }

  closeQuiz() {
    this.quizActive = false;
    this.elements.quizModal.style.display = 'none';
  }

  toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    this.elements.themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
  }

  getSteps() {
    const steps = [{ type: 'welcome' }, { type: 'role' }];
    if (this.role) {
      this.traits[this.role].forEach(trait => steps.push({ type: 'trait', trait: trait.name }));
    }
    steps.push({ type: 'result' });
    return steps;
  }

  renderStep() {
    if (!this.quizActive) return;
    const steps = this.getSteps();
    this.currentStep = Math.min(this.currentStep, steps.length - 1);
    const step = steps[this.currentStep];
    this.elements.progressBar.style.width = `${((this.currentStep + 1) / steps.length) * 100}%`;

    let html = '';
    this.elements.quizTitle.textContent = step.type === 'welcome' ? 'Welcome!' : step.type === 'role' ? 'Choose Your Role' : step.type === 'trait' ? 'Explore Your Traits' : 'Your Result';

    switch (step.type) {
      case 'welcome':
        html = `
          <p>Embark on a journey to discover your unique style!</p>
          <button class="btn btn-primary" onclick="styleExplorer.nextStep()">Begin</button>
        `;
        break;
      case 'role':
        html = `
          <p>Do you lean toward guiding or being guided?</p>
          <button class="btn" onclick="styleExplorer.setRole('submissive')">I like being guided</button>
          <button class="btn" onclick="styleExplorer.setRole('dominant')">I like guiding</button>
        `;
        break;
      case 'trait':
        const trait = this.traits[this.role].find(t => t.name === step.trait);
        const value = this.answers.traits[trait.name] || 5;
        html = `
          <p>${trait.question}</p>
          <input type="range" min="1" max="10" value="${value}" class="trait-slider" 
                 oninput="styleExplorer.setTrait('${trait.name}', this.value)" aria-label="${trait.question}">
          <div class="slider-label">${trait.label}</div>
          <div>
            <button class="btn btn-primary" onclick="styleExplorer.nextStep()">Next</button>
            <button class="btn" onclick="styleExplorer.prevStep()">Back</button>
          </div>
        `;
        break;
      case 'result':
        const topStyle = this.calculateResult();
        const details = this.styleDetails[topStyle];
        html = `
          <div class="result-section">
            <h3>Your Style: ${topStyle}</h3>
            <p>${details.desc}</p>
            <h3>Matches With: ${details.match}</h3>
            <p>Explore a dynamic where you complement each other perfectly.</p>
            <h3>Tips:</h3>
            <ul>${details.tips.map(tip => `<li>${tip}</li>`).join('')}</ul>
            <div>
              <button class="btn btn-primary" onclick="styleExplorer.saveResult()">Save Result</button>
              <button class="btn btn-primary" onclick="styleExplorer.startQuiz()">Restart</button>
              <button class="btn" onclick="styleExplorer.toggleDashboard()">View Detailed Results</button>
            </div>
            <div id="result-dashboard" class="dashboard" style="display: ${this.showDashboard ? 'block' : 'none'};">
              ${this.renderDashboard()}
              <button class="btn" onclick="styleExplorer.toggleBreakdown()">Trait Breakdown</button>
              <div id="trait-breakdown" class="trait-breakdown" style="display: ${this.showBreakdown ? 'block' : 'none'};">
                ${this.renderBreakdown(topStyle)}
              </div>
            </div>
          </div>
        `;
        setTimeout(() => confetti({ particleCount: 150, spread: 80 }), 300);
        break;
    }

    this.elements.quizContent.innerHTML = html;
  }

  setRole(role) {
    this.role = role;
    this.nextStep();
  }

  setTrait(trait, value) {
    this.answers.traits[trait] = parseInt(value, 10);
    this.showFeedback(`Set ${trait} to ${value}`);
  }

  nextStep() {
    this.currentStep++;
    this.renderStep();
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.renderStep();
    }
  }

  calculateResult() {
    const scores = {};
    const traitContributions = {};
    this.styles[this.role].forEach(style => scores[style] = 0);

    const styleTraits = {
      Submissive: ['obedience', 'vulnerability'],
      Brat: ['playfulness', 'exploration'],
      Little: ['affection', 'vulnerability'],
      Pet: ['affection', 'playfulness'],
      'Rope Bunny': ['exploration', 'vulnerability'],
      Dominant: ['authority', 'control'],
      Nurturer: ['care', 'confidence'],
      Master: ['authority', 'control'],
      Rigger: ['creativity', 'control'],
      Caretaker: ['care', 'confidence']
    };

    Object.entries(this.answers.traits).forEach(([trait, value]) => {
      this.styles[this.role].forEach(style => {
        const weight = styleTraits[style].includes(trait) ? 2 : 1;
        scores[style] += value * weight;
        if (!traitContributions[style]) traitContributions[style] = {};
        traitContributions[style][trait] = (traitContributions[style][trait] || 0) + value * weight;
      });
    });

    const totalQuestions = Object.keys(this.answers.traits).length;
    const maxScore = totalQuestions * 20; 
    Object.keys(scores).forEach(style => {
      scores[style] = (scores[style] / maxScore) * 100;
      Object.keys(traitContributions[style]).forEach(trait => {
        traitContributions[style][trait] = (traitContributions[style][trait] / maxScore) * 100;
      });
    });

    this.scores = scores;
    this.traitContributions = traitContributions;
    return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  }

  renderDashboard() {
    const sortedScores = Object.entries(this.scores).sort((a, b) => b[1] - a[1]);
    return sortedScores.map(([style, score]) => `
      <div class="dashboard-item">
        <span>${style}</span>
        <div class="score-bar"><div class="score-bar-fill" style="width: ${score}%"></div></div>
        <span class="score-value">${score.toFixed(1)}%</span>
      </div>
    `).join('');
  }

  renderBreakdown(topStyle) {
    const contributions = this.traitContributions[topStyle] || {};
    return Object.entries(contributions).map(([trait, contribution]) => `
      <div class="trait-item">
        <span>${trait.charAt(0).toUpperCase() + trait.slice(1)}</span>
        <div class="trait-bar"><div class="trait-bar-fill" style="width: ${contribution}%"></div></div>
        <span class="trait-value">${contribution.toFixed(1)}%</span>
      </div>
    `).join('');
  }

  toggleDashboard() {
    this.showDashboard = !this.showDashboard;
    this.showBreakdown = false; 
    this.renderStep();
  }

  toggleBreakdown() {
    this.showBreakdown = !this.showBreakdown;
    this.renderStep();
  }

  saveResult() {
    const topStyle = Object.entries(this.scores).sort((a, b) => b[1] - a[1])[0][0];
    const result = {
      topStyle,
      scores: this.scores,
      role: this.role,
      timestamp: new Date().toLocaleString(),
      traits: this.answers.traits
    };
    const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    history.push(result);
    localStorage.setItem('quizHistory', JSON.stringify(history));
    this.showFeedback('Result saved!');
  }

  showHistory() {
    this.elements.historyModal.style.display = 'flex';
    const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    let html = history.length ? '' : '<p>No past results found.</p>';
    history.forEach((result, index) => {
      html += `
        <div class="history-item">
          <span>${result.timestamp}: ${result.topStyle} (${result.role})</span>
          <div>
            <button class="btn" onclick="styleExplorer.viewResult(${index})">View</button>
            <button class="btn" onclick="styleExplorer.deleteResult(${index})">Delete</button>
          </div>
        </div>
      `;
    });
    this.elements.historyContent.innerHTML = html;
  }

  closeHistory() {
    this.elements.historyModal.style.display = 'none';
  }

  viewResult(index) {
    const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    const result = history[index];
    if (!result) return;
    this.role = result.role;
    this.scores = result.scores;
    this.answers.traits = result.traits;
    this.currentStep = this.getSteps().length - 1; 
    this.quizActive = true;
    this.showDashboard = true; 
    this.elements.quizModal.style.display = 'flex';
    this.elements.historyModal.style.display = 'none';
    this.renderStep();
  }

  deleteResult(index) {
    const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    history.splice(index, 1);
    localStorage.setItem('quizHistory', JSON.stringify(history));
    this.showHistory();
    this.showFeedback('Result deleted!');
  }

  showFeedback(message) {
    this.elements.feedback.textContent = message;
    this.elements.feedback.classList.add('feedback');
    this.elements.feedback.setAttribute('aria-live', 'polite');
    setTimeout(() => this.elements.feedback.classList.remove('feedback'), 500);
  }
}

const styleExplorer = new StyleExplorer();
