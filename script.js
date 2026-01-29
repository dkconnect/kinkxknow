class StyleExplorer {
    constructor() {
        this.currentStep = 0;
        this.answers = {};
        
        this.styleDetails = {
            Submissive: { desc: 'You find peace in yielding to guidance and appreciate structure.', match: 'Dominant/Master', tips: ['Set clear boundaries.', 'Communicate openly.'] },
            Brat: { desc: 'You love playful resistance and teasing—a perfect foil for a firm leader.', match: 'Disciplinarian', tips: ['Keep it fun but respect hard limits.', 'Ensure consent is active.'] },
            Little: { desc: 'You embrace a carefree, nurtured role, craving affection and protection.', match: 'Caretaker/Nurturer', tips: ['Find a nurturing partner.', 'Explore safely.'] },
            Pet: { desc: 'You thrive on affection, play, and symbols of ownership.', match: 'Owner/Master', tips: ['Enjoy your non-verbal cues.', 'Seek a caring dynamic.'] },
            'Rope Bunny': { desc: 'You love the art and sensation of being physically bound.', match: 'Rigger', tips: ['Learn safety and nerve awareness.', 'Pair with a skilled rigger.'] },
            Dominant: { desc: 'You shine when leading with confidence and clear expectations.', match: 'Submissive', tips: ['Listen to your partner.', 'Balance control with care.'] },
            Nurturer: { desc: 'You guide with warmth, support, and emotional connection.', match: 'Little', tips: ['Be patient.', 'Foster deep trust.'] },
            Master: { desc: 'You lead with authority and responsibility, valuing commitment.', match: 'Submissive/Slave', tips: ['Negotiate clearly.', 'Build long-term structure.'] },
            Rigger: { desc: 'You create art through restraint, valuing technical skill.', match: 'Rope Bunny', tips: ['Study safety meticulously.', 'Practice precision in your ties.'] },
            Caretaker: { desc: 'You nurture with love, focusing on a partner\'s well-being.', match: 'Little', tips: ['Be consistent.', 'Encourage growth through care.'] },
            Disciplinarian: { desc: 'You enjoy enforcing rules and providing firm guidance.', match: 'Brat/Submissive', tips: ['Agree on clear rules.', 'Focus on trust and development.'] }
        };

        this.questions = [
            { id: 'safeword', group: 'Safety', text: 'How important is a Safeword system established before any play?' },
            { id: 'vulnerability', group: 'Safety', text: 'How open are you to sharing emotional vulnerabilities?' },
            { id: 'checkin', group: 'Safety', text: 'How crucial is a "scene check-in" mechanism during intense play?' },
            { id: 'public_ack', group: 'Safety', text: 'How do you feel about publicly acknowledging the dynamic?' },
            { id: 'aftercare', group: 'Safety', text: 'What is your stance on "aftercare" (nurturing after a scene)?' },
            { id: 'contract', group: 'Structure', text: 'How much do you value having a written contract or rules?' },
            { id: 'feedback', group: 'Structure', text: 'How open are you to receiving feedback about your behavior?' },
            { id: 'dynamic_type', group: 'Structure', text: 'Do you prefer a 24/7 dynamic or a scene-based dynamic?' },
            { id: 'autonomy', group: 'Structure', text: 'How much autonomy are you willing to relinquish or demand?' },
            { id: 'tasking', group: 'Control', text: 'How do you feel about Tasking (assigning chores)?' },
            { id: 'humiliation', group: 'Control', text: 'How open are you to Humiliation or Degradation?' },
            { id: 'collaring', group: 'Control', text: 'How important is the use of collaring to signify commitment?' },
            { id: 'findom', group: 'Control', text: 'How willing are you to engage in Financial Domination?' },
            { id: 'ownership', group: 'Control', text: 'How important is the concept of "ownership"?' },
            { id: 'impact', group: 'Physical', text: 'How interested are you in Impact Play (spanking, caning)?' },
            { id: 'bondage', group: 'Physical', text: 'How interested are you in Bondage (rope, restraints)?' },
            { id: 'sensory_deprivation', group: 'Physical', text: 'How open are you to Sensory Deprivation?' },
            { id: 'medical', group: 'Physical', text: 'How do you feel about Medical Play/Kink?' },
            { id: 'temp_play', group: 'Physical', text: 'How important is Temperature Play?' },
            { id: 'knife', group: 'Edge', text: 'How open are you to exploring Knife Play?' },
            { id: 'breath', group: 'Edge', text: 'How open are you to Breath Play/Choking?' },
            { id: 'scat_uro', group: 'Edge', text: 'How comfortable are you with urophilic play?' },
            { id: 'blood', group: 'Edge', text: 'How do you feel about Blood Play?' },
            { id: 'pain_tolerance', group: 'Edge', text: 'How do you feel about pushing Pain Tolerance?' }
        ];

        this.traitWeights = {
            Submissive: { safeword: 1, vulnerability: 2, contract: 1, autonomy: 1 },
            Brat: { autonomy: -1, humiliation: 1, impact: 1, feedback: -1 },
            Little: { vulnerability: 2, aftercare: 2, medical: 1 },
            Pet: { public_ack: 2, collaring: 2, ownership: 2, bondage: 1 },
            'Rope Bunny': { bondage: 2, sensory_deprivation: 2, temp_play: 1 },
            Dominant: { contract: 2, autonomy: -1, tasking: 1 },
            Nurturer: { safeword: 2, vulnerability: 1, checkin: 2, aftercare: 2 },
            Master: { contract: 2, dynamic_type: 2, ownership: 2, collaring: 2 },
            Rigger: { bondage: 2, sensory_deprivation: 1, temp_play: 1 },
            Caretaker: { checkin: 2, aftercare: 2, medical: 1 },
            Disciplinarian: { contract: 2, tasking: 2, impact: 2, feedback: 2 }
        };

        this.init();
    }

    init() { this.renderStep(); }

    renderStep() {
        const q = this.questions[this.currentStep];
        const progress = ((this.currentStep + 1) / this.questions.length) * 100;
        
        document.getElementById('entry-count').textContent = `Entry ${this.romanize(this.currentStep + 1)} of ${this.romanize(this.questions.length)}`;
        document.getElementById('progress-text').textContent = `${Math.round(progress)}% Complete`;
        document.getElementById('progress-bar').style.width = `${progress}%`;
        document.getElementById('q-category').textContent = q.group;
        document.getElementById('q-text').textContent = q.text;

        const container = document.getElementById('scale-container');
        container.innerHTML = '';
        for (let i = 0; i <= 10; i++) {
            const btn = document.createElement('button');
            const active = this.answers[q.id] === i;
            btn.className = active 
                ? "size-12 md:size-14 rounded border-2 border-neon-pink bg-neon-pink/10 text-primary font-bold text-xl shadow-[0_0_20px_rgba(255,20,147,0.3)] scale-110"
                : "size-10 md:size-12 rounded border border-white/10 text-white/40 hover:border-primary transition-all";
            btn.textContent = i;
            btn.onclick = () => { 
                this.answers[q.id] = i; 
                this.renderStep(); 
            };
            container.appendChild(btn);
        }
    }

    nextStep() {
        if (this.answers[this.questions[this.currentStep].id] === undefined) {
            alert("The entry remains incomplete.");
            return;
        }
        if (this.currentStep < this.questions.length - 1) {
            this.currentStep++;
            this.renderStep();
        } else {
            this.showResults();
        }
    }

    prevStep() { if (this.currentStep > 0) { this.currentStep--; this.renderStep(); } }

    showResults() {
        const scores = this.calculateScores();
        const sortedStyles = Object.entries(scores).sort((a, b) => b[1] - a[1]);
        const topStyle = sortedStyles[0][0];
        const details = this.styleDetails[topStyle];

        confetti({ particleCount: 400, spread: 100, origin: { y: 0.6 }, colors: ['#D4AF37', '#FF1493'] });

        const card = document.getElementById('quiz-card');
        card.innerHTML = `
            <div class="flex flex-col items-center text-center gap-6 fade-in">
                <span class="text-neon-pink text-[12px] font-bold tracking-[0.5em] uppercase">The Revelation</span>
                <h1 class="font-serif-base text-4xl md:text-6xl text-primary font-bold tracking-widest uppercase mb-4">
                    ${topStyle}
                </h1>
                <p class="text-white/80 text-lg md:text-xl font-light italic max-w-2xl">"${details.desc}"</p>
                
                <div class="w-full grid md:grid-cols-2 gap-8 my-10 text-left">
                    <div class="p-6 rounded border border-primary/20 bg-primary/5">
                        <h4 class="text-primary font-bold uppercase tracking-widest text-xs mb-3">Ideal Dynamic Match</h4>
                        <p class="text-white font-medium">${details.match}</p>
                    </div>
                    <div class="p-6 rounded border border-neon-pink/20 bg-neon-pink/5">
                        <h4 class="text-neon-pink font-bold uppercase tracking-widest text-xs mb-3">Sacred Guidance</h4>
                        <ul class="text-white/70 text-sm space-y-2">
                            ${details.tips.map(tip => `<li>• ${tip}</li>`).join('')}
                        </ul>
                    </div>
                </div>

                <div class="w-full space-y-4">
                    <h4 class="text-white/30 font-bold uppercase tracking-[0.3em] text-[10px] mb-6">Archetype Resonance</h4>
                    ${sortedStyles.slice(0, 5).map(([style, score]) => `
                        <div class="space-y-2">
                            <div class="flex justify-between text-[10px] uppercase font-bold tracking-widest">
                                <span class="text-white/60">${style}</span>
                                <span class="text-primary">${Math.max(0, Math.round(score))}%</span>
                            </div>
                            <div class="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <div class="h-full bg-gradient-to-r from-primary to-neon-pink" style="width: ${Math.max(5, score)}%"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <button onclick="window.location.href='index.html'" class="mt-12 px-12 py-4 border border-primary text-primary font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-primary hover:text-background-dark transition-all">
                    Return to Sanctuary
                </button>
            </div>
        `;
    }

    calculateScores() {
        const finalScores = {};
        Object.keys(this.traitWeights).forEach(style => {
            let stylePoints = 0;
            let totalPossible = 0;
            Object.entries(this.traitWeights[style]).forEach(([qid, weight]) => {
                const answer = this.answers[qid] || 0;
                stylePoints += (answer * weight);
                totalPossible += Math.abs(weight) * 10;
            });
            finalScores[style] = totalPossible > 0 ? (stylePoints / totalPossible) * 100 : 0;
        });
        return finalScores;
    }

    romanize(num) {
        const map = { X: 10, IX: 9, V: 5, IV: 4, I: 1 };
        let res = '';
        for (let i in map) { while (num >= map[i]) { res += i; num -= map[i]; } }
        return res;
    }
}
const styleExplorer = new StyleExplorer();
