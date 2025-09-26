class StyleExplorer {
    constructor() {
        this.quizActive = false;
        this.currentStep = 0;
        this.answers = {};
        this.scores = {};
        this.showDashboard = false;
        this.showBreakdown = false;

        this.styles = {
            submissive: ['Submissive', 'Brat', 'Little', 'Pet', 'Rope Bunny'],
            dominant: ['Dominant', 'Nurturer', 'Master', 'Rigger', 'Caretaker', 'Disciplinarian']
        };
        this.styleDetails = {
            Submissive: { desc: 'You find peace in yielding to guidance and appreciate structure.', match: 'Dominant/Master', tips: ['Set clear boundaries.', 'Communicate openly.'], image: 'images/sub_default.png' },
            Brat: { desc: 'You love playful resistance and teasing—a perfect foil for a firm leader.', match: 'Disciplinarian', tips: ['Keep it fun but respect hard limits.', 'Ensure consent.'], image: 'images/sub_brat.png' },
            Little: { desc: 'You embrace a carefree, nurtured role, craving affection and protection.', match: 'Caretaker/Nurturer', tips: ['Find a nurturing partner.', 'Explore safely.'], image: 'images/sub_little.png' },
            Pet: { desc: 'You thrive on affection, play, and often physical touch and ownership symbols.', match: 'Owner/Master', tips: ['Enjoy your role.', 'Seek a caring dynamic.'], image: 'images/sub_pet.png' },
            'Rope Bunny': { desc: 'You love the art and sensation of being physically bound and restrained.', match: 'Rigger', tips: ['Learn safety and nerve awareness.', 'Pair with a skilled Rigger.'], image: 'images/kink x know (3)_sub.png' },

            Dominant: { desc: 'You shine when leading with confidence, preferring control and clear expectations.', match: 'Submissive', tips: ['Listen to your partner.', 'Balance control with care.'], image: 'images/dom_default.png' },
            Nurturer: { desc: 'You guide with warmth, support, and a focus on safety and emotional connection.', match: 'Little', tips: ['Be patient.', 'Foster deep trust.'], image: 'images/dom_nurturer.png' },
            Master: { desc: 'You lead with authority and responsibility, often valuing commitment and structure.', match: 'Slave/Submissive', tips: ['Negotiate clearly.', 'Build trust and commitment.'], image: 'images/dom_master.png' },
            Rigger: { desc: 'You create art through restraint, valuing technical skill and sensory experience.', match: 'Rope Bunny', tips: ['Study bondage safety meticulously.', 'Practice precision.'], image: 'images/kink x know (3)_dom.png' },
            Caretaker: { desc: 'You nurture with love and structure, focusing on a partner\'s comfort and well-being.', match: 'Little', tips: ['Be consistent.', 'Encourage growth.'], image: 'images/dom_caretaker.png' },
            Disciplinarian: { desc: 'You enjoy enforcing rules and structure, providing firm guidance and consequences.', match: 'Brat/Submissive', tips: ['Ensure clear rules are agreed upon.', 'Focus on growth and trust.'], image: 'images/dom_disciplinarian.png' }
        };

        this.questions = this.getNewQuestions();
        this.styleTraitMap = this.getStyleTraitMap();

        this.init();
    }

    getNewQuestions() { 
        return [
            { id: 'safeword', group: 'safety', text: 'How important is having a detailed Safeword system established before engaging in any scene?', label: '1: Not Important / 10: Absolutely Essential' },
            { id: 'vulnerability', group: 'safety', text: 'On a scale of willingness, how open are you to discussing and sharing emotional vulnerabilities within the dynamic?', label: '1: Very Guarded / 10: Very Open' },
            { id: 'checkin', group: 'safety', text: 'How crucial is it to have a "scene check-in" mechanism (e.g., stopping to ask "Are you okay?") during intense play?', label: '1: Unnecessary / 10: Mandatory' },
            { id: 'public_ack', group: 'safety', text: 'How do you feel about publicly acknowledging the dynamic (e.g., wearing discreet collar or jewelry)?', label: '1: Must Be Private / 10: Welcome Acknowledgment' },
            { id: 'aftercare', group: 'safety', text: 'What is your stance on "aftercare"?', label: '1: Unnecessary / 10: Absolutely Essential' },
            
            { id: 'contract', group: 'structure', text: 'How much do you value having a written contract or set of rules for the dynamic?', label: '1: Prefer Freedom / 10: Mandatory Structure' },
            { id: 'feedback', group: 'structure', text: 'How open are you to receiving feedback and criticism about your performance or behavior within the dynamic?', label: '1: Very Sensitive / 10: Highly Value Guidance' },
            { id: 'dynamic_type', group: 'structure', text: 'Do you prefer a 24/7 dynamic (always "in dynamic") or a scene-based dynamic (only "in dynamic" during planned play)?', label: '1: Scene-Based / 10: 24/7 Dynamic' },
            { id: 'autonomy', group: 'structure', text: 'How much autonomy (control over your own decisions outside of scenes) are you willing to relinquish/demand?', label: '1: Full Autonomy / 10: Willing to Relinquish/Demand Control' },
        
            { id: 'tasking', group: 'control', text: 'How do you feel about Tasking (assigning chores or errands as part of the dynamic)?', label: '1: Dislike Tasks / 10: Love Assigning/Performing Tasks' },
            { id: 'humiliation', group: 'control', text: 'How open are you to being subject to Humiliation/Degradation (verbal or non-verbal)?', label: '1: Hard Limit / 10: Very Open to Exploration' },
            { id: 'collaring', group: 'control', text: 'How important is the use of collaring or a physical symbol to signify the commitment and ownership within the dynamic?', label: '1: Not Important / 10: Essential Symbolism' },
            { id: 'findom', group: 'control', text: 'How willing are you to engage in Financial Domination (Findom), if any?', label: '1: Hard Limit / 10: Very Open' },
            { id: 'ownership', group: 'control', text: 'How important is the concept of "ownership" or "property" in the dynamic?', label: '1: Do Not Like / 10: Core to Dynamic' },
        
            { id: 'impact', group: 'physical', text: 'How interested are you in Impact Play (e.g., paddling, spanking, caning)?', label: '1: Not Interested / 10: Very Interested' },
            { id: 'bondage', group: 'physical', text: 'How interested are you in Bondage (e.g., rope, cuffs, restraints)?', label: '1: Not Interested / 10: Very Interested' },
            { id: 'sensory_deprivation', group: 'physical', text: 'How open are you to Sensory Deprivation (e.g., blindfolds, earplugs)?', label: '1: Dislike / 10: High Interest' },
            { id: 'medical', group: 'physical', text: 'How do you feel about Medical Play/Kink (e.g., roleplaying as a patient/doctor)?', label: '1: Not Interested / 10: High Interest' },
            { id: 'temp_play', group: 'physical', text: 'How important is Temperature Play (e.g., wax, ice)?', label: '1: Not Important / 10: Essential Sensation' },
        
            { id: 'knife', group: 'edge', text: 'How open are you to exploring Knife Play (without contact or with dull knives)?', label: '1: Hard Limit / 10: Very Open' },
            { id: 'breath', group: 'edge', text: 'How open are you to Breath Play/Choking (as a receiver or giver)?', label: '1: Hard Limit / 10: Very Open' },
            { id: 'scat_uro', group: 'edge', text: 'How comfortable are you with scatological or urophilic play (water sports/waste)?', label: '1: Hard Limit / 10: Very Open' },
            { id: 'blood', group: 'edge', text: 'How do you feel about Blood Play (e.g., consensual piercing or cutting)?', label: '1: Hard Limit / 10: Very Open' },
            { id: 'pain_tolerance', group: 'edge', text: 'How do you feel about Pain Tolerance pushing (actively seeking or administering intense, sustained pain)?', label: '1: Dislike / 10: High Interest' },
        ];
    }

    getStyleTraitMap() { 
        return {
            
            Submissive: { safeword: +1, vulnerability: +2, checkin: +1, aftercare: +2, contract: +2, autonomy: +2, ownership: +1, feedback: +1, tasking: +2, humiliation: +1 },
            Brat: { vulnerability: -1, feedback: -1, autonomy: -1, tasking: -1, humiliation: +2, impact: +1, dynamic_type: +1, contract: -1 }, 
            Little: { vulnerability: +2, aftercare: +2, contract: -1, autonomy: +2, ownership: -1, medical: +2, public_ack: -1 }, 
            Pet: { public_ack: +2, collaring: +2, ownership: +2, tasking: +1, impact: +1, bondage: +1, sensory_deprivation: +1, humiliation: +1 }, 
            'Rope Bunny': { bondage: +2, sensory_deprivation: +2, temp_play: +1, breath: +1, pain_tolerance: +1, knife: +1, checkin: -1 }, 

            
            Dominant: { contract: +2, autonomy: -2, ownership: +1, dynamic_type: +1, feedback: +1, tasking: +2, collaring: +1, humiliation: +1 },
            Nurturer: { safeword: +2, vulnerability: +2, checkin: +2, aftercare: +2, contract: -1, autonomy: -2, ownership: -1, medical: +1, humiliation: -1 }, 
            Master: { contract: +2, dynamic_type: +2, autonomy: -2, collaring: +2, ownership: +2, tasking: +2, findom: +1, public_ack: +2 }, 
            Rigger: { bondage: +2, sensory_deprivation: +2, temp_play: +1, knife: +1, pain_tolerance: -1, checkin: +2, safeword: +2 }, 
            Caretaker: { checkin: +2, aftercare: +2, medical: +2, tasking: +1, vulnerability: +2, humiliation: -1 },
            Disciplinarian: { contract: +2, autonomy: -2, tasking: +2, humiliation: +1, impact: +2, dynamic_type: +1, pain_tolerance: +1, feedback: +2 } 
        };
    }

    init() {
        this.elements = {
            // New Panel IDs
            startQuizPanel: document.getElementById('start-quiz-panel'),
            exploreStylesPanel: document.getElementById('explore-styles-panel'),
            historyPanel: document.getElementById('history-panel'),
            aboutPanel: document.getElementById('about-panel'),

            // Existing
            quizModal: document.getElementById('quiz-modal'),
            closeQuiz: document.getElementById('close-quiz'),
            historyModal: document.getElementById('history-modal'),
            closeHistory: document.getElementById('close-history'),
            stylesModal: document.getElementById('styles-modal'),
            closeStyles: document.getElementById('close-styles'),
            
    
            quizTitle: document.getElementById('quiz-title'),
            progressBar: document.getElementById('progress-bar'),
            progressFill: document.getElementById('progress-fill'),
            quizContent: document.getElementById('quiz-content'),
            feedback: document.getElementById('quiz-feedback'),
            historyContent: document.getElementById('history-content'),
            stylesContent: document.getElementById('styles-content'),
            roleFilter: document.getElementById('role-filter'),
            quizIllustration: document.querySelector('.quiz-illustration'),
            modalFooter: document.querySelector('.modal-footer')
        };
        
  
        this.elements.startQuizPanel.addEventListener('click', () => this.startQuiz());
        this.elements.exploreStylesPanel.addEventListener('click', () => this.showStyles());
        this.elements.historyPanel.addEventListener('click', () => this.showHistory());
  
        this.elements.aboutPanel.addEventListener('click', () => this.showFeedback('About page not yet implemented.'));


        this.elements.closeQuiz.addEventListener('click', () => this.closeQuiz());
        this.elements.closeHistory.addEventListener('click', () => this.closeHistory());
        this.elements.closeStyles.addEventListener('click', () => this.closeStyles());
        this.elements.roleFilter.addEventListener('change', () => this.renderStyles());
    }
    
    startQuiz() {
        this.quizActive = true;
        this.currentStep = 0;
        this.answers = {};
        this.scores = {};
        this.showDashboard = false;
        this.showBreakdown = false;
        this.elements.quizModal.style.display = 'flex';
        this.elements.historyModal.style.display = 'none';
        this.elements.stylesModal.style.display = 'none';
        this.elements.quizIllustration.src = 'images/calc.jpg';
        this.elements.quizIllustration.alt = 'Quiz Illustration';
        this.renderStep();
    }

    closeQuiz() {
        this.quizActive = false;
        this.elements.quizModal.style.display = 'none';
    }

    getSteps() {
        const steps = [{ type: 'welcome' }];
        this.questions.forEach(q => steps.push({ type: 'question', id: q.id }));
        steps.push({ type: 'result' });
        return steps;
    }

    renderStep() {
        if (!this.quizActive) return;
        const steps = this.getSteps();
        this.currentStep = Math.min(this.currentStep, steps.length - 1);
        const step = steps[this.currentStep];

       
        if (step.type === 'result') {
            this.elements.progressBar.classList.add('hide-element');
            this.elements.modalFooter.classList.add('hide-element');
        } else {
            this.elements.progressBar.classList.remove('hide-element');
            this.elements.modalFooter.classList.remove('hide-element');
            this.elements.progressFill.style.width = `${((this.currentStep) / this.questions.length) * 100}%`;
        }

        let html = '';

        this.elements.quizTitle.textContent = step.type === 'welcome'
            ? 'FIND YOUR STYLE'
            : step.type === 'result'
            ? 'YOUR RESULT'
            : `FIND YOUR STYLE`;

        switch (step.type) {
            case 'welcome':
                html = `
                    <p>Answer the following questions honestly to reveal your unique Kink Style and Dynamic preference.</p>
                    <div class="quiz-navigation">
                        <button class="btn btn-primary" onclick="styleExplorer.nextStep()">BEGIN QUIZ</button>
                    </div>
                `;
                break;
            case 'question':
                const q = this.questions.find(q => q.id === step.id);
                const value = this.answers[q.id] || 5;

                this.elements.quizIllustration.src = 'images/calc.jpg';
                this.elements.quizIllustration.alt = 'Quiz Illustration';

                html = `
                    <p class="question-group">Question ${this.currentStep} of ${this.questions.length}</p>
                    <strong>CATEGORY: ${q.group.toUpperCase()}</strong>
                    <p>${q.text}</p>
                    <input type="range" min="1" max="10" value="${value}" class="trait-slider"
                            oninput="styleExplorer.setAnswer('${q.id}', this.value)" aria-label="${q.text}">
                    <div class="slider-label">${q.label}</div>
                    <div class="quiz-navigation">
                        <button class="btn btn-primary" onclick="styleExplorer.nextStep()">NEXT</button>
                        <button class="btn" onclick="styleExplorer.prevStep()">BACK</button>
                    </div>
                `;
                break;
            case 'result':
                const { topStyle, finalRole } = this.calculateResult();
                const details = this.styleDetails[topStyle];

                this.role = finalRole;

                const imageUrl = details.image || 'images/calc.jpg';
                this.elements.quizIllustration.src = imageUrl;
                this.elements.quizIllustration.alt = `Illustration for ${topStyle} result.`;

                html = `
                    <div class="result-container">
                        <h2 class="result-affinity">Affinity : ${finalRole.toUpperCase()}</h2>
                        <h3 class="result-core-style">Your Core Style : ${topStyle}</h3>
                        <p class="result-description">${details.desc}</p>

                        <h4 class="result-match-title">Ideal Match :</h4>
                        <p class="result-match-value">${details.match}</p>
                        <p class="result-description">Explore a dynamic where you complement each other perfectly.</p>

                        <h4 class="result-tips-title">Tips for Your Style:</h4>
                        <ul class="result-tips-list">${details.tips.map(tip => `<li>${tip}</li>`).join('')}</ul>

                        <div class="result-actions">
                            <button class="btn btn-primary" onclick="styleExplorer.saveResult()">SAVE</button>
                            <button class="btn btn-primary" onclick="styleExplorer.startQuiz()">RESTART</button>
                            <button class="btn" onclick="styleExplorer.toggleDashboard()">VIEW SCORES</button>
                        </div>
                        <div id="result-dashboard" class="dashboard" style="display: ${this.showDashboard ? 'block' : 'none'};">
                            ${this.renderDashboard()}
                        </div>
                    </div>
                `;
                setTimeout(() => confetti({ particleCount: 150, spread: 80 }), 300);
                break;
        }

        this.elements.quizContent.innerHTML = html;
        if (step.type === 'question') {
            const slider = document.querySelector('.trait-slider');
            if (slider) {
                slider.value = this.answers[step.id] || 5;
            }
        }
    }

    setAnswer(questionId, value) {
        this.answers[questionId] = parseInt(value, 10);
        this.showFeedback(`Set ${questionId.replace(/_/g, ' ')} to ${value}`);
    }

    nextStep() {
        const steps = this.getSteps();
        const currentStepData = steps[this.currentStep];
        
        if (currentStepData.type === 'question' && !this.answers[currentStepData.id]) {
            this.showFeedback('Please set a value before moving on.');
            return;
        }

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
        const allStyles = [...this.styles.submissive, ...this.styles.dominant];
        let totalSubScore = 0;
        let totalDomScore = 0;

        allStyles.forEach(style => scores[style] = 0);
        
        const maxPossibleScore = {};
        const minPossibleScore = {};

        allStyles.forEach(style => {
            let styleScore = 0;
            let currentMax = 0;
            let currentMin = 0;

            this.questions.forEach(q => {
                const answerValue = this.answers[q.id] || 5;
                const weight = this.styleTraitMap[style][q.id] || 0;
                
                styleScore += answerValue * weight;

                if (weight > 0) {
                    currentMax += 10 * weight;
                    currentMin += 1 * weight;
                } else if (weight < 0) {
                    currentMax += 1 * weight;
                    currentMin += 10 * weight;
                }
            });
            scores[style] = styleScore;
            maxPossibleScore[style] = currentMax;
            minPossibleScore[style] = currentMin;
        });

        const normalizedScores = {};
        allStyles.forEach(style => {
            const min = minPossibleScore[style];
            const max = maxPossibleScore[style];
            const range = max - min;
            const score = scores[style];
            
            normalizedScores[style] = range === 0 ? 50 : ((score - min) / range) * 100;
        });

        this.scores = normalizedScores;

    
        this.styles.submissive.forEach(s => totalSubScore += normalizedScores[s]);
        this.styles.dominant.forEach(s => totalDomScore += normalizedScores[s]);
        
        const avgSubScore = totalSubScore / this.styles.submissive.length;
        const avgDomScore = totalDomScore / this.styles.dominant.length;
        
        const finalRole = avgSubScore > avgDomScore ? 'submissive' : 'dominant';


        const sortedStyles = Object.entries(normalizedScores).sort((a, b) => b[1] - a[1]);
        const topStyle = sortedStyles[0][0];

        return { topStyle, finalRole };
    }

    renderDashboard() {
        const sortedScores = Object.entries(this.scores).sort((a, b) => b[1] - a[1]);
        return sortedScores.map(([style, score]) => {
            const isTop = style === sortedScores[0][0];
            return `
                <div class="dashboard-item" style="font-weight: ${isTop ? 'bold' : 'normal'};">
                    <span>${style} ${isTop ? ' (Top Match)' : ''}</span>
                    <div class="score-bar"><div class="score-bar-fill" style="width: ${score}%"></div></div>
                    <span class="score-value">${score.toFixed(1)}%</span>
                </div>
            `;
        }).join('');
    }

    toggleDashboard() {
        this.showDashboard = !this.showDashboard;
        this.renderStep();
    }

    saveResult() {
        const { topStyle, finalRole } = this.calculateResult();
        const result = {
            topStyle,
            scores: this.scores,
            role: finalRole,
            timestamp: new Date().toLocaleString(),
            answers: this.answers
        };
        const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
        history.push(result);
        localStorage.setItem('quizHistory', JSON.stringify(history));
        this.showFeedback('Result saved!');
    }
    
    showHistory() {
        this.elements.historyModal.style.display = 'flex';
        this.elements.quizModal.style.display = 'none';
        this.elements.stylesModal.style.display = 'none';
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
        
        this.answers = result.answers;
        this.scores = result.scores;
        this.role = result.role;
        
        this.currentStep = this.getSteps().length - 1;
        this.quizActive = true;
        this.showDashboard = true;
        
        this.elements.quizModal.style.display = 'flex';
        this.elements.historyModal.style.display = 'none';
        this.elements.stylesModal.style.display = 'none';
        this.renderStep();
    }

    deleteResult(index) {
        const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
        history.splice(index, 1);
        localStorage.setItem('quizHistory', JSON.stringify(history));
        this.showHistory();
        this.showFeedback('Result deleted!');
    }
    
    showStyles() {
        this.elements.stylesModal.style.display = 'flex';
        this.elements.quizModal.style.display = 'none';
        this.elements.historyModal.style.display = 'none';
        this.elements.roleFilter.value = 'all';
        this.renderStyles();
    }

    closeStyles() {
        this.elements.stylesModal.style.display = 'none';
    }

    renderStyles() {
        const filter = this.elements.roleFilter.value;
        let styles = [];
        if (filter === 'all') {
            styles = [...this.styles.submissive, ...this.styles.dominant];
        } else {
            styles = this.styles[filter].filter(s => this.styleDetails[s]);
        }
        let html = styles.length ? '' : '<p>No styles found.</p>';
        styles.forEach(style => {
            const details = this.styleDetails[style];
            html += `
                <div class="style-card">
                    <h3>${style}</h3>
                    <p>${details.desc}</p>
                    <p><strong>Matches With:</strong> ${details.match}</p>
                    <p><strong>Tips:</strong></p>
                    <ul>${details.tips.map(tip => `<li>${tip}</li>`).join('')}</ul>
                </div>
            `;
        });
        this.elements.stylesContent.innerHTML = html;
    }

    showFeedback(message) {
        this.elements.feedback.textContent = message;
        this.elements.feedback.setAttribute('aria-live', 'polite');
        setTimeout(() => this.elements.feedback.textContent = '', 2000);
    }
}

const styleExplorer = new StyleExplorer();
