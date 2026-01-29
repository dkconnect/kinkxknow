class StyleExplorer {
    constructor() {
        this.currentStep = 0;
        this.answers = {};
        this.questions = [
            { id: 'safeword', group: 'Safety', text: 'How important is having a detailed Safeword system established before engaging in any scene?' },
            { id: 'vulnerability', group: 'Safety', text: 'How open are you to discussing and sharing emotional vulnerabilities within the dynamic?' },
            { id: 'checkin', group: 'Safety', text: 'How crucial is it to have a "scene check-in" mechanism during intense play?' },
            { id: 'public_ack', group: 'Safety', text: 'How do you feel about publicly acknowledging the dynamic (e.g., collar or jewelry)?' },
            { id: 'aftercare', group: 'Safety', text: 'What is your stance on "aftercare"?' },
            { id: 'contract', group: 'Structure', text: 'How much do you value having a written contract or set of rules?' },
            { id: 'feedback', group: 'Structure', text: 'How open are you to receiving feedback about your behavior within the dynamic?' },
            { id: 'dynamic_type', group: 'Structure', text: 'Do you prefer a 24/7 dynamic or a scene-based dynamic?' },
            { id: 'autonomy', group: 'Structure', text: 'How much autonomy are you willing to relinquish or demand?' },
            { id: 'tasking', group: 'Control', text: 'How do you feel about Tasking (assigning chores/errands)?' },
            { id: 'humiliation', group: 'Control', text: 'How open are you to being subject to Humiliation/Degradation?' },
            { id: 'collaring', group: 'Control', text: 'How important is the use of collaring to signify commitment?' },
            { id: 'findom', group: 'Control', text: 'How willing are you to engage in Financial Domination?' },
            { id: 'ownership', group: 'Control', text: 'How important is the concept of "ownership" or "property"?' },
            { id: 'impact', group: 'Physical', text: 'How interested are you in Impact Play (paddling, spanking)?' },
            { id: 'bondage', group: 'Physical', text: 'How interested are you in Bondage (rope, cuffs)?' },
            { id: 'sensory_deprivation', group: 'Physical', text: 'How open are you to Sensory Deprivation (blindfolds)?' },
            { id: 'medical', group: 'Physical', text: 'How do you feel about Medical Play/Kink?' },
            { id: 'temp_play', group: 'Physical', text: 'How important is Temperature Play (wax, ice)?' },
            { id: 'knife', group: 'Edge', text: 'How open are you to exploring Knife Play?' },
            { id: 'breath', group: 'Edge', text: 'How open are you to Breath Play/Choking?' },
            { id: 'scat_uro', group: 'Edge', text: 'How comfortable are you with urophilic play?' },
            { id: 'blood', group: 'Edge', text: 'How do you feel about Blood Play?' },
            { id: 'pain_tolerance', group: 'Edge', text: 'How do you feel about Pain Tolerance pushing?' }
        ];
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
                ? "size-12 md:size-14 rounded border-2 border-neon-pink bg-neon-pink/10 text-primary font-bold text-xl shadow-[0_0_20px_rgba(255,20,147,0.3)] transition-all"
                : "size-10 md:size-12 rounded border border-white/10 flex items-center justify-center text-white/40 hover:border-primary transition-all";
            btn.textContent = i;
            btn.onclick = () => { this.answers[q.id] = i; this.renderStep(); };
            container.appendChild(btn);
        }
    }

    nextStep() {
        if (this.currentStep < this.questions.length - 1) {
            this.currentStep++;
            this.renderStep();
        } else {
            confetti({ particleCount: 200, spread: 70, origin: { y: 0.6 } });
            alert("Exploration complete. Results logic being calculated...");
        }
    }

    prevStep() { if (this.currentStep > 0) { this.currentStep--; this.renderStep(); } }

    romanize(num) {
        const map = { X: 10, IX: 9, V: 5, IV: 4, I: 1 };
        let res = '';
        for (let i in map) { while (num >= map[i]) { res += i; num -= map[i]; } }
        return res;
    }
}
const styleExplorer = new StyleExplorer();
