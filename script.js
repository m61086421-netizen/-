const royalSymbols = ['亗', '𓆩', '𓆪', '꧁', '༺', '༻', '꧂', '👑', '♕', '♔', '⚔️', '༒', '⚜️', '⚡', '✦', '✧', '★', '☆', '✪', '✯', '✵', '✶', '⦅', '⦆', '⊙', '⟁', '☯︎', '†', '‡'];
const combatSymbols = ['☠︎', '☠', '☣︎', '☢︎', '⚔', '🗡️', '🔫', '💣', '🎯', '🩸', '🕷️', '🕸️', '🦂', '🐉', '🦅', '🐺', '🦁', '⚡', '🔥', '💥', '✨', '☄️', '🌙', '⚓', '🎲', '🃏'];

const readyNames = [
    '𓆩 亗 ⚡ 𝙆𝙄𝙉𝙂 ⚡ 亗 𓆪',
    '꧁༺ 𝓓𝓔𝓑𝓘𝓛 ༻꧂',
    '༒ 𝕾𝖍𝖆𝖉𝖔𝖜 ༒',
    '𓆩☠︎ 𝙑𝙄𝙋𝙀𝙍 ☠︎𓆪',
    '꧁⚔️ ℭℌℑ𝔈𝔉 ⚔️꧂',
    '亗 𝕲𝖍𝖔𝖘𝖙 亗',
    '𓆩⚡ 𝙇𝙀𝙂𝙀𝙉𝘿 ⚡𓆪',
    '༒ 𝓣𝓘𝓣𝓐𝓝 ༒'
];

document.addEventListener('DOMContentLoaded', () => {
    renderGrids();
    renderNames();
    genBioCode();
    setupEventListeners();
});

function setupEventListeners() {
    const nameInput = document.getElementById('nameInput');
    nameInput.addEventListener('input', updatePreview);

    document.getElementById('btnClear').addEventListener('click', clearInput);
    document.getElementById('btnCopy').addEventListener('click', copyName);
    document.getElementById('btnAutoDecorate').addEventListener('click', autoDecorate);

    document.querySelectorAll('.frame-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const prefix = btn.getAttribute('data-prefix');
            const suffix = btn.getAttribute('data-suffix');
            injectFrame(prefix, suffix);
        });
    });

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');
            switchTab(tabName);
        });
    });

    document.getElementById('bioColorPicker').addEventListener('input', genBioCode);
    document.getElementById('bioTextInput').addEventListener('input', genBioCode);
    document.getElementById('btnCopyBio').addEventListener('click', copyBioCode);
}

function renderGrids() {
    const royalGrid = document.getElementById('royalGrid');
    royalGrid.innerHTML = royalSymbols.map(s => `
        <button data-symbol="${s}" class="symbol-btn glass-card py-3 px-2 rounded-xl text-xl font-bold text-amber-300 hover:text-white flex justify-center items-center">
            ${s}
        </button>
    `).join('');

    const combatGrid = document.getElementById('combatGrid');
    combatGrid.innerHTML = combatSymbols.map(s => `
        <button data-symbol="${s}" class="symbol-btn glass-card py-3 px-2 rounded-xl text-xl font-bold text-red-400 hover:text-white flex justify-center items-center">
            ${s}
        </button>
    `).join('');

    document.querySelectorAll('.symbol-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const sym = btn.getAttribute('data-symbol');
            appendSymbol(sym);
        });
    });
}

function renderNames() {
    const readyNamesGrid = document.getElementById('readyNamesGrid');
    readyNamesGrid.innerHTML = readyNames.map(name => `
        <div class="glass-panel p-4 rounded-xl flex items-center justify-between">
            <span class="font-bold text-amber-300 font-mono">${name}</span>
            <button data-copy="${name}" class="copy-name-btn bg-amber-500 hover:bg-amber-400 text-black font-bold px-3 py-1.5 rounded-lg text-xs">
                <i class="fa-solid fa-copy"></i> نسخ
            </button>
        </div>
    `).join('');

    document.querySelectorAll('.copy-name-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            copyText(textToCopy);
        });
    });
}

function updatePreview() {
    const input = document.getElementById('nameInput');
    const preview = document.getElementById('livePreview');
    const counter = document.getElementById('charCounter');
    const warning = document.getElementById('limitWarning');

    const val = input.value;
    preview.innerText = val.trim() === '' ? 'ضع اسمك هنا...' : val;
    counter.innerText = `${val.length} / 12 حرف`;

    if (val.length > 12) {
        counter.classList.add('bg-red-900', 'text-red-300');
        warning.classList.remove('hidden');
    } else {
        counter.classList.remove('bg-red-900', 'text-red-300');
        warning.classList.add('hidden');
    }
}

function appendSymbol(sym) {
    const input = document.getElementById('nameInput');
    input.value += sym;
    updatePreview();
    showToast(`تمت إضافة الرمز (${sym})`);
}

function clearInput() {
    document.getElementById('nameInput').value = '';
    updatePreview();
}

function injectFrame(prefix, suffix) {
    const input = document.getElementById('nameInput');
    let val = input.value.trim() || "اسمك";
    input.value = `${prefix}${val}${suffix}`;
    updatePreview();
    showToast('تم تطبيق الإطار!');
}

function autoDecorate() {
    const input = document.getElementById('nameInput');
    let val = input.value.trim() || "اسمك";
    input.value = `𓆩 亗 ${val} 亗 𓆪`;
    updatePreview();
    showToast('تمت الزخرفة الملكية!');
}

function copyName() {
    const val = document.getElementById('nameInput').value;
    if(!val) return showToast('يرجى كتابة اسم أولاً!');
    copyText(val);
}

function copyText(text) {
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    showToast('تم النسخ إلى الحافظة!');
}

function genBioCode() {
    const color = document.getElementById('bioColorPicker').value.toUpperCase().replace('#', '');
    const text = document.getElementById('bioTextInput').value || 'KING';
    document.getElementById('generatedBioCode').innerText = `[${color}]${text}`;
}

function copyBioCode() {
    copyText(document.getElementById('generatedBioCode').innerText);
}

function switchTab(tab) {
    document.getElementById('content-symbols').classList.add('hidden');
    document.getElementById('content-names').classList.add('hidden');
    document.getElementById('content-colors').classList.add('hidden');
    document.getElementById(`content-${tab}`).classList.remove('hidden');

    document.querySelectorAll('.tab-btn').forEach(b => {
        b.className = 'tab-btn px-4 py-2.5 rounded-xl whitespace-nowrap bg-cyber-card text-gray-300 border border-gray-800';
    });
    
    document.getElementById(`tab-${tab}`).className = 'tab-btn px-4 py-2.5 rounded-xl whitespace-nowrap bg-gradient-to-r from-amber-500 to-amber-600 text-black font-extrabold shadow-md';
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMsg').innerText = msg;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 2000);
}
